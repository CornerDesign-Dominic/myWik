import test from 'node:test';
import assert from 'node:assert/strict';
import {createLearningClock,learningDay,calendarDaysAfter,splitLearningInterval,type LearningRecord} from '../src/services/learningClock';
import {updatedProgress,unclearCompletion,learningSummary} from '../src/services/learningProgress';
import {registerLearningFlush,flushLearningClocks} from '../src/services/learningLifecycle';
import {materialize,emptySnapshot,createRecommendations,applyEntity,makeEntity} from '../src/services/syncModel';
function setup(wall=Date.now()) {
 let mono=0;const records:LearningRecord[]=[];const clock=createLearningClock(()=>({mono,wall}),r=>records.push(r));clock.setActive(true);
 return {clock,records,advance:(ms:number)=>{mono+=ms;wall+=ms},jumpWall:(ms:number)=>{wall+=ms},sum:()=>records.reduce((n,r)=>n+r.seconds,0)};
}
test('resuming interaction cannot retroactively count idle time, even with a delayed interval',()=>{
 const s=setup();s.advance(300000);s.clock.touch();assert.equal(s.sum(),120);s.advance(15000);s.clock.flush();assert.equal(s.sum(),135);
});
test('background, repeated lifecycle events and screen changes never double count',()=>{
 const s=setup();s.advance(10000);s.clock.setActive(false);assert.equal(s.sum(),10);s.advance(600000);s.clock.flush();s.clock.touch();s.clock.setActive(false);assert.equal(s.sum(),10);
 s.clock.setActive(true);s.advance(10000);s.clock.stop();s.clock.stop();assert.equal(s.sum(),20);
});
test('manual wall-clock changes do not change elapsed duration',()=>{
 const s=setup();s.advance(15000);s.jumpWall(3600000);s.clock.flush();assert.equal(s.sum(),15);s.advance(15000);s.jumpWall(-7200000);s.clock.stop();assert.equal(s.sum(),30);
});
test('midnight intervals and fractional seconds retain the original local day',()=>{
 const start=new Date(2026,10,17,23,59,59,500).getTime(),s=setup(start);s.advance(1000);s.clock.stop();
 const days=s.records.reduce<Record<string,number>>((out,r)=>{const day=learningDay(r.startedAt);out[day]=(out[day]??0)+r.seconds;return out},{});
 assert.deepEqual(days,{'2026-11-17':0.5,'2026-11-18':0.5});assert.equal(s.sum(),1);
});
test('normal touch events do not cause an expensive write per gesture; checkpoint drains only once',()=>{
 const s=setup();for(let i=0;i<100;i++){s.advance(20);s.clock.touch()}assert.equal(s.records.length,0);
 const unregister=registerLearningFlush(s.clock.checkpoint);flushLearningClocks();assert.equal(s.sum(),2);flushLearningClocks();assert.equal(s.sum(),2);unregister();s.advance(1000);flushLearningClocks();assert.equal(s.sum(),2);s.clock.stop();assert.equal(s.sum(),3);
});
test('calendar splitting handles month/year boundaries and Berlin daylight-saving transitions',()=>{
 const previous=process.env.TZ;process.env.TZ='Europe/Berlin';try{
  const at=new Date(2026,11,31,23,59,50).getTime();assert.deepEqual(splitLearningInterval(at,at+20000).map(p=>[p.day,p.end-p.start]),[['2026-12-31',10000],['2027-01-01',10000]]);
  const d=new Date(2027,2,27,12).getTime();assert.equal(new Date(calendarDaysAfter(d,1)).getHours(),12);assert.equal(calendarDaysAfter(d,1)-d,23*3600000);
  const start=new Date(2027,2,28).getTime(),end=new Date(2027,2,29).getTime();assert.equal(splitLearningInterval(start,end)[0].end-start,23*3600000);
 }finally{if(previous===undefined)delete process.env.TZ;else process.env.TZ=previous}
});
test('progress changes are monotonic and bookmarks do not create completion transitions',()=>{
 let p=updatedProgress('a',undefined,{status:'unclear'},100);p=updatedProgress('a',p,{status:'done'},100);assert.equal(p.history[1].at,101);
 const saved=p;p=updatedProgress('a',p,{starred:true},99);assert.deepEqual(p.history,saved.history);assert.equal(p.status,'done');assert.equal(updatedProgress('a',p,{starred:true},105),p);
});
test('recommendations belong only to the current unclear-to-completed cycle',()=>{
 let p=updatedProgress('a',undefined,{status:'unclear'},0);p=updatedProgress('a',p,{status:'working'},1);p=updatedProgress('a',p,{status:'done'},2);assert.equal(unclearCompletion(p),2);
 p=updatedProgress('a',p,{status:'working'},3);p=updatedProgress('a',p,{status:'done'},4);assert.equal(unclearCompletion(p),undefined);
 const snapshot=applyEntity(emptySnapshot(),makeEntity('progress','a',p,false,4),false);assert.equal(createRecommendations(snapshot,{a:'bwl'},1000000000).length,0);
 p=updatedProgress('a',p,{status:'unclear'},5);p=updatedProgress('a',p,{status:'done'},6);assert.equal(unclearCompletion(p),6);
});
test('monthly milestones, subject totals and completed recommendations use the selected month',()=>{
 const data=materialize(emptySnapshot());data.sessions=[{id:'old',subjectId:'bwl',kind:'article',seconds:3600,day:'2026-10-31',startedAt:0},{id:'new',subjectId:'bwl',kind:'cards',seconds:300,day:'2026-11-01',startedAt:0}];data.visits=['2026-10-31','2026-11-01'];
 data.recommendations=[{id:'r',articleId:'a',subjectId:'bwl',title:'t',reason:'r',state:'done',dueAt:0,updatedAt:new Date(2026,9,31,12).getTime()}];
 const nov=learningSummary(data,new Date(2026,10,1)),oct=learningSummary(data,new Date(2026,9,1));
 assert.equal(nov.sessions.reduce((n,s)=>n+s.seconds,0),300);assert.equal(nov.reached('2026-11-01',300),true);assert.equal(nov.reached('2026-10-31',-1),false);assert.equal(nov.completed,0);
 assert.equal(oct.reached('2026-10-31',-1),true);assert.equal(oct.completed,1);
});
