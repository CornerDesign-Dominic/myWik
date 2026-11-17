import assert from 'node:assert/strict';
import test from 'node:test';
import {cardCounts,reviewedCard,similarCards,sectionSource} from '../src/services/flashcards';
import {isSyncEntity,makeEntity} from '../src/services/syncModel';
import type {Flashcard} from '../src/types';
const base:Flashcard={id:'a',subjectId:'rechnungswesen',front:'Was ist der Deckungsbeitrag?',back:'Erlös minus variable Kosten.',updatedAt:0,nextReviewAt:0,reviews:0};
test('failures never lengthen the next successful review; counters preserve every explicit outcome',()=>{
  let c=base;
  for(let i=0;i<8;i++)c=reviewedCard(c,false,1000);
  assert.equal(c.nextReviewAt,601000);assert.equal(c.unknownCount,8);assert.equal(c.successStreak,0);
  c=reviewedCard(c,true,1000);assert.equal(c.nextReviewAt,86401000);assert.equal(c.knownCount,1);assert.equal(c.reviews,9);
  let last=c.nextReviewAt;
  for(let i=0;i<6;i++){c=reviewedCard(c,true,1000);assert(c.nextReviewAt>last);last=c.nextReviewAt;}
  c=reviewedCard(c,true,1000);assert.equal(c.nextReviewAt,last);
  c=reviewedCard(c,false,1000);assert.equal(c.successStreak,0);assert.equal(c.nextReviewAt,601000);
});
test('legacy reviews stay unknown and cannot create a fictitious success streak',()=>{
  const old={...base,reviews:25};assert.deepEqual(cardCounts(old),{known:0,unknown:0,legacy:25});
  const c=reviewedCard(old,true,0);assert.equal(c.nextReviewAt,86400000);assert.deepEqual(cardCounts(c),{known:1,unknown:0,legacy:25});
  assert(isSyncEntity(makeEntity('card',c.id,c)));
  for(const bad of [-1,1.5,NaN,Infinity])assert(!isSyncEntity(makeEntity('card',c.id,{...c,knownCount:bad})));
});
test('local duplicate checks cover normalization and answers, include other subjects but exclude own and deleted cards',()=>{
  assert.equal(similarCards({...base,id:undefined,front:'WAS ist der Deckungsbeitrag?!'},[base]).length,1);
  assert.equal(similarCards({...base,id:undefined,front:'Andere Formulierung?'},[base]).length,1);
  assert.equal(similarCards(base,[base]).length,0);
  assert.equal(similarCards({...base,id:undefined},[{...base,deleted:true}]).length,0);
  assert.equal(similarCards({...base,id:undefined},[{...base,subjectId:'bwl'}]).length,1);
  assert.equal(similarCards({...base,id:undefined,front:'Wie berechnet man den Gewinn?',back:'Deckungsbeitrag minus Fixkosten.'},[base]).length,0);
});
test('section context includes examples and hints without mixing other sections',()=>{
 const s=sectionSource({title:'Berechnen',paragraphs:[[{text:'Formel'}]],tabs:[{title:'Beispiel',content:'80 − 35 = 45'}],hint:{title:'Achtung',content:'Netto rechnen'}});
 for(const text of ['Berechnen','Formel','80 − 35 = 45','Netto rechnen'])assert(s.includes(text));
});
