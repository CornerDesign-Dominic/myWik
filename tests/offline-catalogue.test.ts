import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import { writeArticleDatabase } from '../scripts/article-database';
import { prepareFachpaket } from '../scripts/pack-publication';
import { isCatalogue } from '../src/services/catalogueModel';
import { contentManifestDocument, packDocument } from '../src/services/contentPacks';
import { contentIndexKey, createOfflineCatalogue, legacyContentKey } from '../src/services/offlineCatalogue';
import { catalogueCopies, catalogueIndex, currentCatalogue, scaledCatalogue } from './catalogueFixture';

function device() {
  const data = new Map<string, string>();
  const reads: string[] = [];
  const writes: string[] = [];
  return { data, reads, writes, storage: {
    async getItem(key: string) { reads.push(key); return data.get(key) ?? null; },
    async setItem(key: string, value: string) { writes.push(key); data.set(key, value); },
    async multiSet(entries: [string, string][]) { for (const [key, value] of entries) { writes.push(key); data.set(key, value); } },
  } };
}

test('a large catalogue remains offline with indexed single-article retrieval and no bodies read at boot', async () => {
  const fixture = scaledCatalogue();
  assert.ok(isCatalogue(fixture));
  assert.equal(fixture.articles.length, currentCatalogue.articles.length * catalogueCopies);
  assert.ok(fixture.articles.length >= 1000);
  const db = new DatabaseSync(':memory:');
  try {
    writeArticleDatabase(db, fixture.articles);
    const { detail } = db.prepare('EXPLAIN QUERY PLAN SELECT body FROM articles WHERE id = ?').get(fixture.articles[0].id)!;
    assert.match(String(detail), /SEARCH articles USING PRIMARY KEY/);
    const query = db.prepare('SELECT body FROM articles WHERE id = ?');
    const reads: string[] = [];
    const repo = createOfflineCatalogue(catalogueIndex(fixture), device().storage, async id => {
      reads.push(id);
      return JSON.parse(String(query.get(id)!.body));
    });
    await repo.loadCache();
    assert.equal(repo.getIndex().articles.length, fixture.articles.length);
    assert.ok(repo.getIndex().articles.every(article => !('sections' in article)));
    assert.deepEqual(reads, []);
    const ids = [fixture.articles[0].id, fixture.articles.at(-1)!.id];
    for (const id of [...ids, ids[0]]) assert.deepEqual(await repo.loadArticle(id), fixture.articles.find(a => a.id === id));
    assert.deepEqual(reads, ids);
    for (const article of fixture.articles) assert.deepEqual(JSON.parse(String(query.get(article.id)!.body)), article);
  } finally { db.close(); }
});

test('only changed subjects download, partial updates never replace the offline version, and account data stays untouched', async () => {
  const fixture = scaledCatalogue();
  const logistik = prepareFachpaket(fixture, 'logistik', fixture.version);
  const personal = prepareFachpaket(fixture, 'personal', fixture.version);
  assert.ok(logistik.pointer.parts > 1);
  const { data, storage, reads, writes } = device();
  const personalDataKey = 'mywik.user.v1.alice';
  const personalData = JSON.stringify({ notes: [{ id: 'note', articleId: 'logistik-abc-analyse', sectionId: 'kurzfrage' }], cards: [{ id: 'card', articleId: 'logistik-abc-analyse', sectionId: 'kurzfrage' }] });
  data.set(personalDataKey, personalData);
  const create = () => createOfflineCatalogue(catalogueIndex(currentCatalogue), storage, async id => currentCatalogue.articles.find(a => a.id === id));
  const repo = create();
  const requests: string[] = [];
  let pointers = [logistik.pointer, personal.pointer];
  let documents = { ...logistik.documents, ...personal.documents };
  const read = async (id: string) => {
    requests.push(id);
    return id === contentManifestDocument ? { schema: 1, packs: pointers } : documents[id];
  };
  assert.equal(await repo.refresh(read), true);
  const target = fixture.articles.find(a => a.id === `logistik-abc-analyse-sim-${catalogueCopies - 1}`)!;
  assert.deepEqual(await repo.loadArticle(target.id), target);
  const saved = data.get(contentIndexKey);
  const broken = { ...logistik.pointer, version: fixture.version + 1 };
  pointers = [broken, personal.pointer];
  requests.length = 0;
  await assert.rejects(repo.refresh(read), /Paketinhalt/);
  assert.deepEqual(requests, [contentManifestDocument, packDocument(broken, 0)]);
  assert.equal(data.get(contentIndexKey), saved);
  assert.deepEqual(await repo.loadArticle(target.id), target);

  const next = prepareFachpaket(fixture, 'logistik', fixture.version + 1);
  pointers = [next.pointer, personal.pointer];
  documents = next.documents;
  requests.length = 0;
  assert.equal(await repo.refresh(read), true);
  assert.deepEqual(requests, [contentManifestDocument, ...Object.keys(next.documents)]);
  requests.length = 0;
  assert.equal(await repo.refresh(read), false);
  assert.deepEqual(requests, [contentManifestDocument]);

  const restored = create();
  reads.length = 0;
  await restored.loadCache();
  assert.ok(!reads.some(key => key.includes('/article/')));
  assert.deepEqual(await restored.loadArticle(target.id), target);
  assert.equal(data.get(personalDataKey), personalData);
  assert.ok(!writes.includes(personalDataKey));
});

test('legacy content moves to individual reads and survives a failed pointer write', async () => {
  const { data, storage, reads } = device();
  const legacy = { ...currentCatalogue, version: currentCatalogue.version + 1 };
  data.set(legacyContentKey, JSON.stringify(legacy));
  const bundled = async (id: string) => currentCatalogue.articles.find(a => a.id === id);
  const failed = createOfflineCatalogue(catalogueIndex(currentCatalogue), { ...storage, async setItem() { throw Error('storage full'); } }, bundled);
  await assert.rejects(failed.loadCache(), /storage full/);
  assert.ok(data.has(legacyContentKey));
  assert.equal(failed.getIndex().version, currentCatalogue.version);
  const repo = createOfflineCatalogue(catalogueIndex(currentCatalogue), storage, bundled);
  await repo.loadCache();
  assert.equal(repo.getIndex().version, legacy.version);
  reads.length = 0;
  const restart = createOfflineCatalogue(catalogueIndex(currentCatalogue), storage, bundled);
  await restart.loadCache();
  assert.deepEqual(reads, [contentIndexKey]);
  const lesson = await restart.loadArticle('logistik-abc-analyse');
  assert.ok(lesson?.sections.some(s => s.id === 'kurzfrage'));
  const remoteReads: string[] = [];
  const olderServer = async (id: string) => { remoteReads.push(id); return id === 'current' ? legacy : undefined; };
  assert.equal(await restart.refresh(olderServer), false);
  assert.deepEqual(remoteReads, [contentManifestDocument, 'current']);
  remoteReads.length = 0;
  assert.equal(await restart.refresh(olderServer), false);
  assert.deepEqual(remoteReads, [contentManifestDocument]);
});
