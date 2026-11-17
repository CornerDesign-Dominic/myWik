import assert from 'node:assert/strict';
import { after, before, beforeEach, test } from 'node:test';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertFails, assertSucceeds, type RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// This suite must never connect to a real Firebase project.
const emulator = process.env.FIRESTORE_EMULATOR_HOST;
if (!emulator || !/^(127\.0\.0\.1|localhost):\d+$/.test(emulator)) {
  throw new Error('Rules tests require a local Firestore emulator. Run npm run test:rules.');
}
const [host, port] = emulator.split(':');
let env: RulesTestEnvironment;
const noteValue = { id: 'note1', articleId: 'deckungsbeitrag', text: 'Meine Notiz', kind: 'personal', updatedAt: 100 };
const envelope = (overrides: Record<string, unknown> = {}) => ({
  kind: 'note', entityId: 'note1', value: noteValue, updatedAt: 100, revision: 'r1', deleted: false, ...overrides,
});
before(async () => {
  env = await initializeTestEnvironment({ projectId: 'demo-mywik', firestore: { host, port: Number(port), rules: readFileSync('../firestore.rules', 'utf8') } });
});
beforeEach(async () => { await env.clearFirestore(); });
after(async () => { await env?.cleanup(); });

test('owner can create, read, and update their valid personal entity', async () => {
  const db = env.authenticatedContext('alice').firestore();
  const reference = doc(db, 'users/alice/entities/note_note1');
  await assertSucceeds(setDoc(reference, envelope()));
  assert.equal((await assertSucceeds(getDoc(reference))).data()?.value.text, 'Meine Notiz');
  await assertSucceeds(updateDoc(reference, { value: { ...noteValue, text: 'Überarbeitet' }, revision: 'r2', updatedAt: 101 }));
});

test('foreign users cannot read or write another user’s entities', async () => {
  await env.withSecurityRulesDisabled(async context => { await setDoc(doc(context.firestore(), 'users/alice/entities/note_note1'), envelope()); });
  const db = env.authenticatedContext('bob').firestore();
  await assertFails(getDoc(doc(db, 'users/alice/entities/note_note1')));
  await assertFails(setDoc(doc(db, 'users/alice/entities/note_note2'), envelope({ entityId: 'note2' })));
  await assertFails(updateDoc(doc(db, 'users/alice/entities/note_note1'), { revision: 'hijack' }));
});

test('unauthenticated users cannot read or write personal entities', async () => {
  const db = env.unauthenticatedContext().firestore();
  await assertFails(getDoc(doc(db, 'users/alice/entities/note_note1')));
  await assertFails(setDoc(doc(db, 'users/alice/entities/note_note1'), envelope()));
});

test('catalog is public read-only and usage accounting is entirely server-only', async () => {
  await env.withSecurityRulesDisabled(async context => {
    await setDoc(doc(context.firestore(), 'catalog/current'), { version: 1, articles: [] });
    await setDoc(doc(context.firestore(), 'meiwikUsage/alice'), { requests: 20 });
  });
  for (const db of [env.unauthenticatedContext().firestore(), env.authenticatedContext('alice').firestore()]) {
    await assertSucceeds(getDoc(doc(db, 'catalog/current')));
    await assertFails(setDoc(doc(db, 'catalog/current'), { version: 2, articles: [] }));
    await assertFails(getDoc(doc(db, 'meiwikUsage/alice')));
    await assertFails(setDoc(doc(db, 'meiwikUsage/alice'), { requests: 0 }));
    await assertFails(setDoc(doc(db, 'meiwikUsage/_global'), { requests: 0 }));
  }
});

test('owner can write a tombstone but physical deletion remains forbidden', async () => {
  const db = env.authenticatedContext('alice').firestore();
  const reference = doc(db, 'users/alice/entities/note_note1');
  await assertSucceeds(setDoc(reference, envelope()));
  await assertFails(deleteDoc(reference));
  await assertSucceeds(setDoc(reference, envelope({ value: null, deleted: true, updatedAt: 200, revision: 'deleted-r2' })));
  assert.equal((await getDoc(reference)).data()?.deleted, true);
  await assertFails(setDoc(reference, envelope({ value: noteValue, deleted: true })));
  await assertFails(setDoc(reference, envelope({value:{...noteValue,text:'Offline edit after delete'},updatedAt:9999999999999,revision:'resurrection'})));
});

test('malformed entities, unknown kinds and attempts to change identity are rejected', async () => {
  const db = env.authenticatedContext('alice').firestore();
  const reference = doc(db, 'users/alice/entities/note_note1');
  await assertFails(setDoc(reference, envelope({ admin: true })));
  await assertFails(setDoc(reference, envelope({ kind: 'usage' })));
  await assertFails(setDoc(reference, envelope({ value: { ...noteValue, text: 'x'.repeat(20001) } })));
  await assertFails(setDoc(reference, envelope({ value: { ...noteValue, kind: 'system' } })));
  await assertSucceeds(setDoc(reference, envelope()));
  await assertFails(updateDoc(reference, { entityId: 'changed' }));
  await assertFails(updateDoc(reference, { kind: 'later' }));
  await assertFails(setDoc(doc(db, 'users/alice/entities/session_invalid'), envelope({ kind: 'session', entityId: 'invalid', value: { id: 'invalid', subjectId: 'rw', kind: 'article', seconds: -1, day: '2026-11-16' } })));
});


test('new card counters and source fields synchronize, while invalid counters are rejected', async()=>{
  const db=env.authenticatedContext('alice').firestore();
  const ref=doc(db,'users/alice/entities/card_a');
  const card={id:'a',subjectId:'rechnungswesen',front:'Was ist DB?',back:'Erlös minus variable Kosten.',reviews:3,nextReviewAt:100,updatedAt:100};
  const entity=(value:object)=>envelope({kind:'card',entityId:'a',value});
  await assertSucceeds(setDoc(ref,entity(card)));
  await assertSucceeds(setDoc(ref,entity({...card,knownCount:1,unknownCount:2,successStreak:0,articleId:'deckungsbeitrag',sectionId:'definition',articleVersion:1})));
  for(const value of [-1,1.5,'2'])await assertFails(setDoc(ref,entity({...card,knownCount:value})));
  await assertFails(setDoc(ref,entity({...card,articleId:123})));
  await assertFails(getDoc(doc(env.authenticatedContext('bob').firestore(),'users/alice/entities/card_a')));
});
