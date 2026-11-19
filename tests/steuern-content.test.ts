import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { articles, chapters, glossary } from '../src/data/content';
import { taxArticles, taxChapters, taxGlossary } from '../src/data/steuern';
import { articleLinksExist, isArticleBody } from '../src/services/catalogueModel';
import { loaders } from '../src/data/generated/articleLoaders';
import { prepareFachpaket } from '../scripts/pack-publication';
import { contentVersion, subjects } from '../src/data/content';
import backendArticles from '../functions/src/catalogue.json';

const stoffliste = readFileSync(new URL('../docs/STEUERN-STOFFLISTE.md', import.meta.url), 'utf8');
const text = (id: string) => {
  const article = taxArticles.find(a => a.id === id)!;
  return article.sections.flatMap(s => [...s.paragraphs.map(p => p.map(t => t.text).join('')), s.hint?.content ?? '']).join('\n');
};

test('every visible IHK heading has an individual learning objective and a valid lesson/section', () => {
  const expected = ['1', ...Array.from({ length: 6 }, (_, i) => `1.${i + 1}`), '2'];
  for (const [chapter, count] of [[1, 6], [2, 7], [3, 7], [4, 0], [5, 9], [6, 7], [7, 7], [8, 7]]) {
    expected.push(`2.${chapter}`, ...Array.from({ length: count }, (_, i) => `2.${chapter}.${i + 1}`));
  }
  expected.push('3', '3.1', '3.2', '3.3', ...Array.from({ length: 5 }, (_, i) => `3.3.${i + 1}`), '3.4', '3.5');
  const rows = stoffliste.split('\n').filter(line => /^\| \d/.test(line));
  assert.deepEqual(rows.map(r => r.split('|')[1].trim()), expected);
  for (const row of rows) {
    const cells = row.split('|').map(x => x.trim());
    assert.ok(cells[3].length > 20, row);
    assert.match(cells[6], /erklärt\/geprüft/);
    const targets = [...cells[4].matchAll(/`([a-z0-9-]+)`/g)].map(m => m[1]);
    assert.ok(targets.length, row);
    for (const id of targets) assert.ok(articles.some(a => a.id === id), id);
    // Each explicitly named section exists in at least one target lesson.
    for (const match of cells[4].matchAll(/\/ ([a-z][a-z0-9-]*(?:, [a-z][a-z0-9-]*)*)/g)) {
      for (const section of match[1].split(', ')) {
        assert.ok(articles.some(a => targets.includes(a.id) && a.sections.some(s => s.id === section)), `${row}: ${section}`);
      }
    }
  }
  assert.equal(rows.length, 77);
});

test('tax catalogue keeps its entry ID and every offline article, answer and reference loads', () => {
  assert.equal(taxArticles.length, 17);
  assert.ok(taxChapters.some(c => c.id === 'steuern-arten' && c.number === '1'));
  const articleIds = new Set(articles.map(a => a.id));
  const termIds = new Set(glossary.map(t => t.id));
  for (const article of taxArticles) {
    assert.ok(isArticleBody(article), article.id);
    assert.ok(articleLinksExist(article, articleIds, termIds), article.id);
    const chapter = chapters.find(c => c.id === article.chapterId)!;
    assert.equal(chapter.articleId, article.id);
    const loaded = loaders[article.id]();
    assert.deepEqual(loaded, article);
    assert.equal(loaded.sections.filter(s => s.hint?.title === 'Musterantwort').length, 2);
    assert.ok(loaded.sections.find(s => s.id === 'transferfrage')?.hint?.content);
    assert.match(text(article.id), /19\. November 2026/);
    assert.match(text(article.id), /gesetze-im-internet\.de/);
  }
  for (const term of taxGlossary) assert.ok(articleIds.has(term.articleId!));
  const used = new Set(taxArticles.flatMap(a => a.sections.flatMap(s => s.paragraphs.flat().map(p => p.termId))));
  for (const term of taxGlossary) assert.ok(used.has(term.id), `unused central glossary term ${term.id}`);
  for (const related of ['rw-buchfuehrungspflicht', 'rw-gob', 'rw-konten', 'logistik-zollwert-versand']) {
    assert.ok(taxArticles.some(a => a.sections.some(s => s.paragraphs.flat().some(p => p.articleId === related))), related);
  }
});

test('tax content is identical in the app, prepared offline pack and backend context', () => {
  const catalogue = { version: contentVersion, articles, chapters, subjects, glossary };
  const { documents } = prepareFachpaket(catalogue, 'steuern', contentVersion);
  const packed = Object.values(documents).flatMap(part => JSON.parse(part.payload).articles);
  const expected = JSON.parse(JSON.stringify(taxArticles));
  assert.deepEqual(packed, expected);
  assert.deepEqual(backendArticles.filter(a => a.subjectId === 'steuern'), expected);
});

test('independent recalculation agrees with the tax examples and transfer answers', () => {
  const z = (60_000 - 17_799) / 10_000;
  assert.equal(Math.floor((173.10 * z + 2397) * z + 1034.87), 14233);
  assert.match(text('st-einkommensteuer'), /14\.233,229838131/);
  assert.equal(Math.floor(0.42 * 80_000 - 11135.63), 22464);
  assert.match(text('st-einkommensteuer'), /22\.464 €/);
  assert.equal((100_000 + 10_000) * .15, 16500);
  assert.equal(16500 * .055, 907.5);
  assert.match(text('st-koerperschaftsteuer'), /17\.407,50/);
  const addition = (240_000 - 200_000) * .25;
  const roundedTradeIncome = Math.floor((100060 + addition - 1000) / 100) * 100;
  assert.equal(Math.round((roundedTradeIncome - 24500) * .035 * 4 * 100), 1183000);
  assert.match(text('st-gewerbesteuer'), /11\.830/);
  assert.equal((3000 - 1000) * .25 * 1.055, 527.5);
  assert.match(text('st-kapitalertragsteuer'), /2\.472,50/);
  assert.equal(9000 * .19 - (4000 + 400) * .19, 874);
  assert.equal((11000 + 11000 * .04 + 560) * .19, 2280);
  assert.match(text('st-vorsteuer'), /2\.280/);
  assert.equal((20000 * 1.03 + 400) * .19, 3990);
  assert.equal(Math.round(600000 * .035 * 100), 2100000);
  assert.match(text('st-grunderwerbsteuer'), /21\.000 €/);
  assert.equal(500000 * .00034 * 4.5, 765);
  assert.match(text('st-grundsteuer'), /765 €/);
  assert.equal(Math.floor((500050 - 400000) / 100) * 100 * .11, 11000);
  assert.match(text('st-erbschaft-schenkung'), /11\.000 €/);
  assert.equal(Math.max((20000 - 12000) * .0025, 25) * 2, 50);
  assert.equal(Math.floor(2232 / 50) * 50 * .01, 22);
  assert.equal(Math.floor(3149 / 50) * 50 * .01 * 2, 62);
  assert.match(text('st-fristfolgen'), /62 €/);
});

test('calendar checks reproduce the published weekend shifts and period boundaries', () => {
  const day = (date: string) => new Date(date + 'T12:00:00Z').getUTCDay();
  assert.equal(day('2026-11-02'), 1);
  assert.equal(day('2026-11-06'), 5);
  assert.equal(day('2026-12-06'), 0);
  assert.equal(day('2026-12-07'), 1);
  assert.equal(day('2026-12-20'), 0);
  assert.equal(day('2026-12-21'), 1);
  assert.equal(day('2026-10-10'), 6);
  assert.equal(day('2026-10-12'), 1);
  assert.equal(day('2026-11-15'), 0);
  assert.equal(day('2026-11-16'), 1);
  assert.equal(day('2027-07-31'), 6);
  assert.equal(day('2027-08-02'), 1);
  assert.equal(day('2028-02-29'), 2);
  assert.match(text('st-fristen'), /7\. Dezember 2026, 24 Uhr/);
  assert.match(text('st-fristen'), /2\. August 2027/);
  assert.match(text('st-fristen'), /29\. Februar 2028/);
  assert.match(text('st-ust-erhebung'), /12\. Oktober 2026/);
  assert.match(text('st-erbschaft-schenkung'), /20\. Januar 2027/);
});
