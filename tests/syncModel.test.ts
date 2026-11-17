import test from 'node:test';
import assert from 'node:assert/strict';
import { acknowledge, applyEntity, createRecommendations, emptySnapshot, entityKey, makeEntity, isLocalSnapshot, isSyncEntity, materialize, mergeRemote, winner } from '../src/services/syncModel.ts';

test('offline edits and tombstones survive a stale remote fetch', () => {
  const old = makeEntity('note','a',{id:'a',articleId:'article',text:'old',kind:'personal',updatedAt:1},false,1);
  let snapshot = applyEntity(emptySnapshot(),old,false);
  const deleted = makeEntity('note','a',null,true,3);
  snapshot = applyEntity(snapshot,deleted,true);
  const merged = mergeRemote(snapshot,[old]);
  assert.equal(materialize(merged).notes.length,0);
  assert.equal(merged.outbox[entityKey('note','a')].deleted,true);
});

test('acknowledging an in-flight edit never clears a newer local edit', () => {
  const first = makeEntity('card','a',{id:'a',subjectId:'rw',front:'one',back:'answer',updatedAt:1,nextReviewAt:1,reviews:0},false,1);
  const next = makeEntity('card','a',{id:'a',subjectId:'rw',front:'two',back:'answer',updatedAt:2,nextReviewAt:1,reviews:0},false,2);
  const snapshot = applyEntity(applyEntity(emptySnapshot(),first,true),next,true);
  const merged = acknowledge(snapshot,first,first);
  assert.equal(merged.entries[entityKey('card','a')].revision,next.revision);
  assert.equal(merged.outbox[entityKey('card','a')].revision,next.revision);
});

test('a remotely newer value wins and the sent outbox record is cleared', () => {
  const local = makeEntity('note','a',{id:'a',articleId:'article',text:'offline',kind:'personal',updatedAt:2},false,2);
  const remote = makeEntity('note','a',{id:'a',articleId:'article',text:'newer',kind:'personal',updatedAt:3},false,3);
  const merged = acknowledge(applyEntity(emptySnapshot(),local,true),local,remote);
  assert.equal(merged.entries[entityKey('note','a')].revision,remote.revision);
  assert.equal(Object.keys(merged.outbox).length,0);
});

test('immutable sessions and visits merge without double counting', () => {
  const session = makeEntity('session','one',{id:'one',subjectId:'rw',kind:'article',seconds:30,day:'2026-11-16',startedAt:0},false,1);
  const visit = makeEntity('visit','2026-11-16','2026-11-16',false,1);
  const merged = mergeRemote(applyEntity(emptySnapshot(),session,true),[session,visit,visit]);
  assert.equal(materialize(merged).sessions.reduce((n,s)=>n+s.seconds,0),30);
  assert.deepEqual(materialize(merged).visits,['2026-11-16']);
});

test('same-time conflicts resolve deterministically in both directions', () => {
  const a = {...makeEntity('note','a',{},false,10),revision:'a'};
  const b = {...makeEntity('note','a',{},false,10),revision:'b'};
  assert.equal(winner(a,b).revision,'b');
  assert.equal(winner(b,a).revision,'b');
});

test('unclear to done creates one recommendation after seven days only', () => {
  const day = 86400000;
  const progress = makeEntity('progress','article',{
    articleId:'article',status:'done',starred:false,updatedAt:day,
    history:[{status:'unclear',at:0},{status:'done',at:day}],
  },false,day);
  let snapshot = applyEntity(emptySnapshot(),progress,true);
  assert.equal(createRecommendations(snapshot,{article:'rw'},7*day).length,0);
  const suggestions = createRecommendations(snapshot,{article:'rw'},8*day);
  assert.equal(suggestions.length,1);
  snapshot = applyEntity(snapshot,suggestions[0],true);
  assert.equal(createRecommendations(snapshot,{article:'rw'},9*day).length,0);
  assert.equal(materialize(snapshot).recommendations[0].subjectId,'rw');
});


test('malformed entity bodies are ignored rather than crashing materialization', () => {
  const badProgress = makeEntity('progress','a',null,false,1);
  const badCard = makeEntity('card','a',{id:'a',front:'Missing dates'},false,1);
  const badSettings = makeEntity('settings','main',{theme:'light',reminders:null},false,1);
  assert.equal(isSyncEntity(badProgress),false);
  assert.equal(isSyncEntity(badCard),false);
  assert.equal(isSyncEntity(badSettings),false);
  const state = applyEntity(applyEntity(applyEntity(emptySnapshot(),badProgress,false),badCard,false),badSettings,false);
  assert.deepEqual(materialize(state).progress,{});
  assert.equal(materialize(state).cards.length,0);
  assert.equal(materialize(state).settings.theme,'system');
  assert.equal(isLocalSnapshot(state),false);
});

test('body IDs and persisted map keys must agree with the entity envelope', () => {
  const wrongVisit = makeEntity('visit','2026-11-16','2026-11-17',false,1);
  const visit = makeEntity('visit','2026-11-16','2026-11-16',false,1);
  assert.equal(isSyncEntity(wrongVisit),false);
  assert.equal(isLocalSnapshot({schema:1,entries:{wrong:visit},outbox:{}}),false);
  assert.equal(isLocalSnapshot(applyEntity(emptySnapshot(),visit,true)),true);
});

test('deletion wins over a later offline edit regardless of clock skew', () => {
  const remote = makeEntity('note','a',{id:'a',articleId:'article',text:'new',kind:'personal',updatedAt:5},false,5);
  const staleDeletion = makeEntity('note','a',null,true,3);
  const snapshot = applyEntity(applyEntity(emptySnapshot(),remote,false),staleDeletion,true);
  assert.equal(snapshot.entries[entityKey('note','a')].deleted,true);
  assert.equal(snapshot.outbox[entityKey('note','a')].revision,staleDeletion.revision);
  assert.equal(materialize(snapshot).notes.length,0);
});

test('non-null tombstones and non-finite clocks are rejected', () => {
  assert.equal(isSyncEntity(makeEntity('note','a',{text:'not deleted'},true,1)),false);
  assert.equal(isSyncEntity(makeEntity('note','a',null,true,Infinity)),false);
  assert.equal(isLocalSnapshot({schema:1,entries:[],outbox:{}}),false);
});


test('concurrent pending text is preserved as a private conflict copy when remote wins',()=>{
 const base=makeEntity('note','a',{id:'a',articleId:'article',text:'base',kind:'personal',updatedAt:1},false,1);
 const local=makeEntity('note','a',{...base.value as object,text:'offline local',updatedAt:2},false,2);
 const remote=makeEntity('note','a',{...base.value as object,text:'second device',updatedAt:3},false,3);
 let s=applyEntity(applyEntity(emptySnapshot(),base,false),local,true);
 assert.equal(Object.keys(mergeRemote(s,[base]).conflicts??{}).length,0);
 s=mergeRemote(s,[remote]);
 assert.equal(materialize(s).notes[0].text,'second device');
 assert.equal((s.conflicts![local.revision].value as {text:string}).text,'offline local');
 assert.equal(Object.keys(s.outbox).length,0);assert(isLocalSnapshot(s));
 assert.equal(Object.keys(mergeRemote(s,[remote]).conflicts??{}).length,1);
});
test('remote deletion preserves unsent edited text without reviving the deleted ID',()=>{
 const local=makeEntity('note','a',{id:'a',articleId:'article',text:'pending',kind:'personal',updatedAt:900},false,900);
 const deletion=makeEntity('note','a',null,true,5);
 const s=mergeRemote(applyEntity(emptySnapshot(),local,true),[deletion]);
 assert.equal(materialize(s).notes.length,0);assert.equal(Object.keys(s.outbox).length,0);
 assert.equal(s.conflicts![local.revision].revision,local.revision);
 assert(isLocalSnapshot(s));
});
test('acknowledgment of an older own write is not a conflict and cannot lose the new revision',()=>{
 const old=makeEntity('note','a',{id:'a',articleId:'article',text:'old',kind:'personal',updatedAt:1},false,1);
 const edited=makeEntity('note','a',{...old.value as object,text:'new',updatedAt:2},false,2);
 const s=acknowledge(applyEntity(applyEntity(emptySnapshot(),old,true),edited,true),old,old);
 assert.equal(s.outbox[entityKey('note','a')].revision,edited.revision);
 assert.equal(Object.keys(s.conflicts??{}).length,0);assert(isLocalSnapshot(s));
});
test('local snapshot cannot contain a detached outbox version or invalid conflict copy',()=>{
 const e=makeEntity('note','a',{id:'a',articleId:'article',text:'old',kind:'personal',updatedAt:1},false,1);
 assert(!isLocalSnapshot({schema:1,entries:{},outbox:{[entityKey('note','a')]:e}}));
 assert(!isLocalSnapshot({...emptySnapshot(),conflicts:{bad:e}}));
});
