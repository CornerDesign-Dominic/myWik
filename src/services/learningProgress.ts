import type {ArticleProgress,ArticleStatus,UserData} from '../types';
export function updatedProgress(articleId:string,previous:ArticleProgress|undefined,patch:{status?:ArticleStatus;starred?:boolean},now:number):ArticleProgress {
 const status=patch.status??previous?.status??'open',starred=patch.starred??previous?.starred??false;
 if(previous&&previous.status===status&&previous.starred===starred)return previous;
 const at=Math.max(now,(previous?.updatedAt??-1)+1,...(previous?.history??[]).map(h=>h.at+1));
 return {articleId,status,starred,updatedAt:at,history:[...(previous?.history??[]),...(!previous||previous.status!==status?[{status,at}]:[])].slice(-200)};
}
export function unclearCompletion(progress:ArticleProgress):number|undefined {
 if(progress.status!=='done')return;
 const history=[...progress.history].sort((a,b)=>a.at-b.at);
 let latest=-1;for(let i=history.length-1;i>=0;i--)if(history[i].status==='done'){latest=i;break;}
 if(latest<0)return;
 let previous=-1;for(let i=latest-1;i>=0;i--)if(history[i].status==='done'){previous=i;break;}
 if(history.slice(previous+1,latest).some(h=>h.status==='unclear'))return history[latest].at;
}
export function learningSummary(data:UserData,month:Date) {
 const prefix=`${month.getFullYear()}-${String(month.getMonth()+1).padStart(2,'0')}-`;
 const sessions=data.sessions.filter(s=>s.day.startsWith(prefix));
 const visits=new Set(data.visits.filter(d=>d.startsWith(prefix)));
 const secondsByDay=sessions.reduce<Record<string,number>>((all,s)=>{all[s.day]=(all[s.day]??0)+s.seconds;return all},{});
 const days=new Set([...visits,...Object.keys(secondsByDay)]);
 const reached=(day:string,threshold:number)=>threshold===0?visits.has(day):threshold===-1?visits.has(day)&&(secondsByDay[day]??0)>=3600:(secondsByDay[day]??0)>=threshold;
 return {sessions,visits,secondsByDay,days:[...days],reached,completed:data.recommendations.filter(r=>r.state==='done'&&new Date(r.updatedAt).getFullYear()===month.getFullYear()&&new Date(r.updatedAt).getMonth()===month.getMonth()).length};
}
