import {createKeyedQueue} from './keyedQueue';
export interface ReadingPosition {y:number;version?:number;anchorId?:string;anchorOffset?:number}
export function parseReadingPosition(raw:string|null):ReadingPosition|null {
 if(!raw)return null;
 try{const value=JSON.parse(raw);if(typeof value==='number')return Number.isFinite(value)&&value>=0?{y:value}:null;
  if(!value||typeof value!=='object'||!Number.isFinite(value.y)||value.y<0)return null;
  if(value.version!==undefined&&(!Number.isFinite(value.version)||value.version<0))return null;
  if(value.anchorId!==undefined&&typeof value.anchorId!=='string')return null;
  if(value.anchorOffset!==undefined&&(!Number.isFinite(value.anchorOffset)||value.anchorOffset<0))return null;
  return value;
 }catch{return null}
}
export function captureReadingPosition(y:number,positions:Record<string,number>,version:number):ReadingPosition {
 const anchor=Object.entries(positions).filter(([,at])=>at<=y).sort((a,b)=>b[1]-a[1])[0];
 return {y:Math.max(0,y),version,...(anchor?{anchorId:anchor[0],anchorOffset:y-anchor[1]}:{})};
}
export function readingTarget(value:ReadingPosition,positions:Record<string,number>,maximum:number){
 const anchor=value.anchorId===undefined?undefined:positions[value.anchorId];
 return Math.max(0,Math.min(maximum,typeof anchor!=='number'||!Number.isFinite(anchor)?value.y:anchor+(value.anchorOffset??0)));
}
export function createReadingStorage(storage:{getItem(key:string):Promise<string|null>;setItem(key:string,value:string):Promise<unknown>}){
 const queue=createKeyedQueue();
 return {load:(key:string)=>queue(key,async()=>parseReadingPosition(await storage.getItem(key))),save:(key:string,value:ReadingPosition)=>{const payload=JSON.stringify(value);return queue(key,async()=>{await storage.setItem(key,payload)})}};
}
