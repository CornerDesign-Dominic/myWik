import test from 'node:test';
import assert from 'node:assert/strict';
import {initialNavigation,pushRoute,popRoute,resetNavigation,searchGlossary} from '../src/services/navigation';
import {parseReadingPosition,captureReadingPosition,readingTarget,createReadingStorage} from '../src/services/readingPosition';
import {glossary} from '../src/data/content';
test('repeated header actions do not duplicate routes and back retains the glossary context',()=>{
 let state=pushRoute(initialNavigation(),{name:'glossary',context:{query:'Kosten',expanded:'fixkosten',y:400}});
 assert.equal(pushRoute(state,{name:'glossary'}),state);
 state=pushRoute(state,{name:'article',articleId:'deckungsbeitrag'});
 const back=popRoute(state);assert.equal(back.entries.length,2);
 const route=back.entries[1].route;assert.equal(route.name,'glossary');if(route.name==='glossary')assert.deepEqual(route.context,{query:'Kosten',expanded:'fixkosten',y:400});
 assert.equal(resetNavigation(state).entries.length,1);const root=initialNavigation();assert.equal(popRoute(root),root);
});
test('glossary search handles whitespace, German umlauts, word order and examples',()=>{
 assert.deepEqual(searchGlossary(glossary,'  VOLLSTAENDIGE  beruflichen ').map(t=>t.id),['vollstaendige-handlung']);
 assert.deepEqual(searchGlossary(glossary,'Hallenmiete').map(t=>t.id),['fixkosten']);
 assert.equal(searchGlossary(glossary,'zzzz unmöglich').length,0);
 assert.equal(searchGlossary(glossary,'   ').length,glossary.length);
 assert.equal(searchGlossary([{term:'Maßgröße',definition:'Eine Größe'}],'massgroesse').length,1);
});
test('legacy reading pixels migrate to section anchors and clamp safely after layout changes',()=>{
 assert.deepEqual(parseReadingPosition('700'),{y:700});
 const pos=captureReadingPosition(700,{a:100,b:500},1);assert.equal(pos.anchorId,'b');assert.equal(pos.anchorOffset,200);
 assert.equal(readingTarget(pos,{a:100,b:800},1200),1000);assert.equal(readingTarget(pos,{a:100,b:800},900),900);
 assert.equal(readingTarget(pos,{a:100},1200),700);
 assert.equal(readingTarget({y:10,anchorId:'toString'}, {},100),10);
 for(const value of ['-1','Infinity','{"y":null}','{"y":2,"anchorOffset":-1}'])assert.equal(parseReadingPosition(value),null);
});
test('reading writes and subsequent reads are ordered independently per owner/article',async()=>{
 const data=new Map<string,string>();let release!:()=>void;let first=true;
 const storage=createReadingStorage({getItem:async key=>data.get(key)??null,setItem:async(key,value)=>{if(first){first=false;await new Promise<void>(r=>{release=r})}data.set(key,value)}});
 const one=storage.save('alice:a',{y:100});const two=storage.save('alice:a',{y:900});const bob=storage.save('bob:a',{y:200});
 await bob;assert.equal((await storage.load('bob:a'))?.y,200);await new Promise(r=>setTimeout(r,0));release();await Promise.all([one,two]);assert.equal((await storage.load('alice:a'))?.y,900);
});
