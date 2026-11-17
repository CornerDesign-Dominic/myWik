import test from 'node:test';
import assert from 'node:assert/strict';
import {createSnapshotStorage,snapshotKey,type StorageAdapter} from '../src/services/snapshotStorage';
import {applyEntity,emptySnapshot,makeEntity,materialize} from '../src/services/syncModel';
const snapshot=(text:string)=>applyEntity(emptySnapshot(),makeEntity('note','a',{id:'a',articleId:'article',text,kind:'personal',updatedAt:1},false,1),true);
function adapter(){
 const data=new Map<string,string>();let fail=false;
 const storage:StorageAdapter={getItem:async key=>data.get(key)??null,setItem:async(key,value)=>{if(fail)throw new Error('QuotaExceededError');data.set(key,value)}};
 return {data,storage,setFailure:(v:boolean)=>{fail=v}};
}
test('writes, reads and retries are strictly separated between guest and two accounts',async()=>{
 const a=adapter(),p=createSnapshotStorage(a.storage);
 await Promise.all([p.persist(null,snapshot('guest')),p.persist('alice',snapshot('alice')),p.persist('bob',snapshot('bob'))]);
 for(const [uid,text] of [[null,'guest'],['alice','alice'],['bob','bob']] as const)assert.equal(materialize(await p.load(uid)).notes[0].text,text);
});
test('failed writes are retained and reads cannot fall back to stale disk data',async()=>{
 const a=adapter(),p=createSnapshotStorage(a.storage);await p.persist('a',snapshot('old'));
 a.setFailure(true);await assert.rejects(p.persist('a',snapshot('new')));await assert.rejects(p.load('a'));
 assert.equal(materialize(JSON.parse(a.data.get(snapshotKey('a'))!)).notes[0].text,'old');
 a.setFailure(false);await p.flush('a');assert.equal(materialize(await p.load('a')).notes[0].text,'new');
});
test('a failed account cannot poison another account, and later writes supersede failed revisions',async()=>{
 const a=adapter(),p=createSnapshotStorage(a.storage);a.setFailure(true);await assert.rejects(p.persist('a',snapshot('failed')));
 a.setFailure(false);await p.persist('b',snapshot('bob'));await p.persist('a',snapshot('latest'));
 assert.equal(materialize(await p.load('a')).notes[0].text,'latest');assert.equal(materialize(await p.load('b')).notes[0].text,'bob');
});
test('slow writes cannot overwrite the latest edit and a load waits for queued persistence',async()=>{
 const data=new Map<string,string>();let release!:()=>void;let first=true;
 const p=createSnapshotStorage({getItem:async k=>data.get(k)??null,setItem:async(k,v)=>{if(first){first=false;await new Promise<void>(r=>{release=r})}data.set(k,v)}});
 const one=p.persist('a',snapshot('one'));const two=p.persist('a',snapshot('two'));const read=p.load('a');
 await new Promise(r=>setTimeout(r,0));release();await Promise.all([one,two]);assert.equal(materialize(await read).notes[0].text,'two');
});
test('corrupt and unsupported data remain untouched instead of being overwritten by an empty account',async()=>{
 const a=adapter(),p=createSnapshotStorage(a.storage);
 for(const raw of ['not-json',JSON.stringify({schema:99,entries:{},outbox:{}})]){a.data.set(snapshotKey('a'),raw);await assert.rejects(p.load('a'));assert.equal(a.data.get(snapshotKey('a')),raw)}
 await assert.rejects(p.persist('a',{schema:99} as never));assert.equal(a.data.get(snapshotKey('a')),JSON.stringify({schema:99,entries:{},outbox:{}}));
});


test('valid legacy outbox inconsistencies are repaired with a conflict copy instead of blocking old accounts',async()=>{
 const a=adapter(),p=createSnapshotStorage(a.storage);
 const local=snapshot('offline edit'),remote=snapshot('newer remote');
 const key=Object.keys(local.entries)[0];remote.entries[key].updatedAt=100;
 const old={...remote,outbox:local.outbox};
 a.data.set(snapshotKey('old-user'),JSON.stringify(old));
 const loaded=await p.load('old-user');
 assert.equal(materialize(loaded).notes[0].text,'newer remote');
 assert.equal(Object.keys(loaded.outbox).length,0);
 assert.equal(Object.values(loaded.conflicts??{}).length,1);
 assert.equal((Object.values(loaded.conflicts??{})[0].value as {text:string}).text,'offline edit');
});
