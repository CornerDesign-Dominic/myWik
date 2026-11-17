import assert from 'node:assert/strict';
import {before,beforeEach,after,test} from 'node:test';
import {readFileSync} from 'node:fs';
import {initializeTestEnvironment,type RulesTestEnvironment} from '@firebase/rules-unit-testing';
import {initializeApp,deleteApp,type FirebaseApp} from 'firebase/app';
import {getFirestore,connectFirestoreEmulator,terminate} from 'firebase/firestore';
import {createEntitySync} from '../src/services/syncTransport';
import {makeEntity,applyEntity,emptySnapshot,mergeRemote,materialize,acknowledge,isLocalSnapshot} from '../src/services/syncModel';

const address=process.env.FIRESTORE_EMULATOR_HOST;
if(!address||!/^(127\.0\.0\.1|localhost):\d+$/.test(address))throw new Error('Only the local Firestore emulator may be used.');
const [host,port]=address.split(':');let env:RulesTestEnvironment;const apps:FirebaseApp[]=[];
before(async()=>{env=await initializeTestEnvironment({projectId:'demo-mywik',firestore:{host,port:Number(port),rules:readFileSync('../firestore.rules','utf8')}})});
beforeEach(async()=>env.clearFirestore());
after(async()=>{await Promise.all(apps.map(async app=>{await terminate(getFirestore(app));await deleteApp(app)}));await env?.cleanup()});
function device(uid:string){
 const app=initializeApp({projectId:'demo-mywik',apiKey:'test-only',appId:'test-only'},`sync-test-${apps.length}`);apps.push(app);
 const db=getFirestore(app);connectFirestoreEmulator(db,host,Number(port),{mockUserToken:{sub:uid,user_id:uid}});
 return createEntitySync(db);
}
const note=(text:string,at:number)=>makeEntity('note','a',{id:'a',articleId:'deckungsbeitrag',kind:'personal',text,updatedAt:at},false,at);
test('two devices retain concurrent note text and a transaction reports the displaced version',async()=>{
 const a=device('alice'),b=device('alice');const original=note('base',1);await a.push('alice',original);
 const left=note('device A',2),right=note('device B',3);
 await a.push('alice',left,original.revision);
 // B still has the original baseline: its transaction must not silently discard A.
 const result=await b.push('alice',right,original.revision);
 assert.equal(result.accepted.revision,right.revision);assert.equal(result.conflict?.revision,left.revision);
 const cloud=await a.fetch('alice');assert.equal((cloud[0].value as {text:string}).text,'device B');
 let local=applyEntity(applyEntity(emptySnapshot(),original,false),left,true);
 local=mergeRemote(local,cloud);assert.equal(materialize(local).notes[0].text,'device B');assert(local.conflicts?.[left.revision]);assert(isLocalSnapshot(local));
});
test('deleted notes cannot be resurrected by an offline edit with a far-future timestamp',async()=>{
 const a=device('alice'),b=device('alice');const original=note('old',1);await a.push('alice',original);
 const deletion=makeEntity('note','a',null,true,2);await a.push('alice',deletion,original.revision);
 const pending=note('offline with wrong clock',9000000000000);
 const result=await b.push('alice',pending,original.revision);
 assert(result.accepted.deleted);assert.equal(result.conflict?.revision,pending.revision);
 const local=acknowledge(applyEntity(emptySnapshot(),pending,true),pending,result.accepted);
 assert.equal(materialize(local).notes.length,0);assert(local.conflicts?.[pending.revision]);
 assert((await a.fetch('alice'))[0].deleted);
});
test('different owners cannot read or push each other’s records',async()=>{
 const alice=device('alice'),bob=device('bob');await alice.push('alice',note('private',1));
 assert.equal((await bob.fetch('bob')).length,0);
 await assert.rejects(bob.fetch('alice'));await assert.rejects(bob.push('alice',note('attack',99)));
 assert.equal(((await alice.fetch('alice'))[0].value as {text:string}).text,'private');
});
test('the watch transport receives initial server data and subsequent confirmed edits',async()=>{
 const a=device('alice'),b=device('alice');const initial=note('one',1);await a.push('alice',initial);
 const seen:string[]=[];let failed:unknown;
 const stop=b.watch('alice',entities=>seen.push(...entities.map(e=>e.revision)),e=>{failed=e});
 const wait=async(revision:string)=>{for(let i=0;i<100&&!seen.includes(revision);i++)await new Promise(r=>setTimeout(r,20));assert.ifError(failed);assert(seen.includes(revision));};
 try{await wait(initial.revision);const next=note('two',2);await a.push('alice',next,initial.revision);await wait(next.revision)}finally{stop()}
});
