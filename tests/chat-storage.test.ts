import test from 'node:test';
import assert from 'node:assert/strict';
import {createArticleChatStorage} from '../src/services/articleChatStorage';
import {appendChatTurn,createArticleChat} from '../src/services/chatLogic';
function memory(){const values=new Map<string,string>();return {values,adapter:{getItem:async(k:string)=>values.get(k)??null,setItem:async(k:string,v:string)=>{values.set(k,v)},removeItem:async(k:string)=>{values.delete(k)},getAllKeys:async()=>[...values.keys()]}}}
test('article chat storage isolates both owners and articles',async()=>{
 const m=memory(),s=createArticleChatStorage(m.adapter);
 await s.save('alice',appendChatTurn(createArticleChat('a'),'Alice','Antwort A'));
 await s.save('bob',appendChatTurn(createArticleChat('a'),'Bob','Antwort B'));
 await s.save('alice',appendChatTurn(createArticleChat('b'),'Anderer Artikel','Antwort C'));
 assert.equal((await s.get('alice','a')).messages[0].content,'Alice');assert.equal((await s.get('bob','a')).messages[0].content,'Bob');
 await s.clear('alice','a');assert.equal((await s.get('alice','a')).messages.length,0);assert.equal((await s.get('bob','a')).messages.length,2);
});
test('reset waits for an in-flight save and cannot be undone by its late completion',async()=>{
 const m=memory();let release!:()=>void;
 const s=createArticleChatStorage({...m.adapter,setItem:async(k,v)=>{await new Promise<void>(r=>{release=r});m.values.set(k,v)}});
 const save=s.save('alice',appendChatTurn(createArticleChat('a'),'Alt','Antwort'));
 await new Promise(r=>setTimeout(r,0));const clear=s.clear('alice','a');release();await Promise.all([save,clear]);
 assert.equal((await s.get('alice','a')).messages.length,0);assert.equal(m.values.size,0);
});
test('expiry cleanup re-reads renewed chats inside the queue instead of deleting stale observations',async()=>{
 const m=memory(),s=createArticleChatStorage(m.adapter),now=Date.now();
 await s.save('alice',appendChatTurn(createArticleChat('a'),'Frisch','Antwort',undefined,now));
 await s.clearExpired(now+1000);assert.equal((await s.get('alice','a')).messages.length,2);
 await s.clearExpired(now+73*3600000);assert.equal((await s.get('alice','a')).messages.length,0);
});
