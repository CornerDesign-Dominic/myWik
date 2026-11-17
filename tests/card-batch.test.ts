import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareCardBatch } from '../src/services/cardBatch';
import { emptySnapshot, materialize, type LocalSnapshot } from '../src/services/syncModel';
import { createSnapshotStorage } from '../src/services/snapshotStorage';
import type { CardDraft } from '../src/services/flashcards';

const cards: CardDraft[] = [
  { id: 'proposal-a', subjectId: 'rechnungswesen', articleId: 'deckungsbeitrag', sectionId: 'definition', front: 'Wie berechnet man das Betriebsergebnis?', back: 'Gesamtdeckungsbeitrag minus Fixkosten.' },
  { id: 'proposal-b', subjectId: 'rechnungswesen', articleId: 'deckungsbeitrag', sectionId: 'definition', front: 'Wann entsteht Gewinn?', back: 'Wenn der Gesamtdeckungsbeitrag die Fixkosten übersteigt.' },
];

test('selected cards become one durable snapshot and outbox, retaining subject and context', async () => {
  const disk = new Map<string, string>(); let writes = 0;
  const storage = createSnapshotStorage({ getItem: async key => disk.get(key) ?? null, setItem: async (key, value) => { writes++; disk.set(key, value); } });
  const result = prepareCardBatch(emptySnapshot(), cards, 1000);
  assert.equal(result.count, 2);
  await storage.persist('learner', result.snapshot);
  assert.equal(writes, 1);
  const restored = await storage.load('learner');
  assert.deepEqual(materialize(restored).cards.map(card => card.front).sort(), cards.map(card => card.front).sort());
  assert.equal(Object.keys(restored.outbox).length, 2);
  assert.ok(materialize(restored).cards.every(card => card.subjectId === 'rechnungswesen' && card.articleId === 'deckungsbeitrag' && card.sectionId === 'definition'));
  assert.equal(materialize(await storage.load('another-learner')).cards.length, 0);
});

test('empty selection changes nothing and invalid selected cards never cause partial saves', () => {
  const original = emptySnapshot();
  assert.equal(prepareCardBatch(original, []).snapshot, original);
  assert.throws(() => prepareCardBatch(original, [cards[0], { ...cards[1], back: '' }]));
  assert.equal(Object.keys(original.entries).length, 0);
  assert.throws(() => prepareCardBatch(original, [cards[0], cards[0]]));
});

test('retrying stable proposal IDs after a failed write does not duplicate cards', async () => {
  let failed = true; const disk = new Map<string, string>();
  const storage = createSnapshotStorage({ getItem: async key => disk.get(key) ?? null, setItem: async (key, value) => { if (failed) throw new Error('Disk full'); disk.set(key, value); } });
  let current: LocalSnapshot = prepareCardBatch(emptySnapshot(), cards, 1000).snapshot;
  await assert.rejects(storage.persist('learner', current));
  failed = false;
  current = prepareCardBatch(current, cards, 2000).snapshot;
  await storage.persist('learner', current);
  assert.equal(materialize(await storage.load('learner')).cards.length, 2);
  assert.equal(Object.keys(current.outbox).length, 2);
});

test('later edits preserve review counters when a batch updates an existing card', () => {
  const original = prepareCardBatch(emptySnapshot(), cards, 1000).snapshot;
  const edited = prepareCardBatch(original, [{ ...cards[0], front: 'Wie wird das Betriebsergebnis ermittelt?' }], 2000);
  assert.equal(materialize(edited.snapshot).cards.length, 2);
  const updated = materialize(edited.snapshot).cards.find(card => card.id === 'proposal-a')!;
  assert.equal(updated.front, 'Wie wird das Betriebsergebnis ermittelt?');
  assert.equal(updated.nextReviewAt, 1000);
  assert.equal(updated.reviews, 0);
});
