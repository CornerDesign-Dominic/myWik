export const LEARNING_IDLE_MS = 120_000;
/** Actual foreground elapsed time, clamped at two minutes after the last interaction. */
export function eligibleLearningMs(from: number, to: number, lastInteraction: number): number {
  if (![from,to,lastInteraction].every(Number.isFinite)) return 0;
  return Math.max(0, Math.min(to, lastInteraction + LEARNING_IDLE_MS) - from);
}

export const learningDay = (at:number) => {const d=new Date(at);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export function calendarDaysAfter(at:number,days:number){const d=new Date(at);d.setDate(d.getDate()+days);return d.getTime();}
export function splitLearningInterval(start:number,end:number):Array<{start:number;end:number;day:string}> {
  if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start)return [];
  const result:Array<{start:number;end:number;day:string}>=[];
  while(start<end){const d=new Date(start);const midnight=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1).getTime();const stop=Math.min(end,midnight);if(stop<=start)break;result.push({start,end:stop,day:learningDay(start)});start=stop;}
  return result;
}
export interface LearningRecord {seconds:number;startedAt:number}
/** Monotonic time measures duration; civil time only assigns the resulting seconds to days. */
export function createLearningClock(now:()=>{mono:number;wall:number},record:(value:LearningRecord)=>void) {
  let point=now(),lastInteraction=point.mono,active=false,stopped=false;
  const fractions=new Map<string,{ms:number;end:number}>();
  const flush=()=>{
    if(stopped)return;
    const current=now();
    const elapsed=active?eligibleLearningMs(point.mono,current.mono,lastInteraction):0;
    if(elapsed>0){
      const creditEnd=Math.min(current.mono,lastInteraction+LEARNING_IDLE_MS);
      // A manual wall-clock change cannot inflate duration. Anchor allocation at the new time.
      const wallEnd=current.wall-(current.mono-creditEnd);
      for(const part of splitLearningInterval(wallEnd-elapsed,wallEnd)){
        const ms=(fractions.get(part.day)?.ms??0)+part.end-part.start;
        const seconds=Math.floor(ms/1000);fractions.set(part.day,{ms:ms-seconds*1000,end:part.end});
        if(seconds){const d=new Date(part.start);const midnight=new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime();record({seconds,startedAt:Math.max(midnight,part.end-seconds*1000)});}
      }
      // Retain only subsecond carry for the current civil day.
      for(const [day,carry] of fractions)if(day!==learningDay(current.wall)){if(carry.ms>0)record({seconds:carry.ms/1000,startedAt:carry.end-carry.ms});fractions.delete(day);}
    }
    point=current;
  };
  const drain=()=>{for(const carry of fractions.values())if(carry.ms>0)record({seconds:carry.ms/1000,startedAt:carry.end-carry.ms});fractions.clear();};
  return {
    flush,
    checkpoint(){flush();drain();},
    touch(){const mono=now().mono;if(mono>lastInteraction+LEARNING_IDLE_MS)flush();lastInteraction=mono;},
    setActive(value:boolean){if(value===active)return;flush();active=value;point=now();if(value)lastInteraction=point.mono;},
    stop(){if(stopped)return;flush();drain();stopped=true;},
  };
}
