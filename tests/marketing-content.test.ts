import assert from 'node:assert/strict';
import test from 'node:test';
import { articles, chapters, contentVersion, glossary, subjects } from '../src/data/content';
import { isArticleBody, isCatalogue } from '../src/services/catalogueModel';
import { prepareFachpaket } from '../scripts/pack-publication';

const marketing = articles.filter(article => article.subjectId === 'marketing');
const subjectChapters = chapters.filter(chapter => chapter.subjectId === 'marketing');
const catalogue = JSON.parse(JSON.stringify({ version: contentVersion, subjects, chapters, articles, glossary }));

test('Marketing und Vertrieb keeps the existing chapter IDs and adds all five book chapters', () => {
  assert.deepEqual(subjectChapters.filter(chapter => !chapter.parentId).map(chapter => chapter.id), [
    'marketing-planung', 'marketing-mix', 'marketing-vertrieb', 'marketing-international', 'marketing-recht',
  ]);
  assert.equal(new Set(subjectChapters.map(chapter => chapter.number)).size, subjectChapters.length);
  for (const id of ['marketing-analyse', 'marketing-ziele']) {
    assert.ok(marketing.some(article => article.id === id));
  }
  assert.ok(isCatalogue(catalogue));
});

test('marketing visuals are stored intact in the offline content pack', () => {
  const ansoff = marketing.find(article => article.id === 'marketing-ansoff')!;
  const customerAbc = marketing.find(article => article.id === 'marketing-kunden-abc')!;
  assert.deepEqual(ansoff.sections.find(section => section.matrix)?.matrix?.cells, [
    ['Marktdurchdringung', 'Marktentwicklung'], ['Produktentwicklung', 'Diversifikation'],
  ]);
  assert.deepEqual(customerAbc.sections.find(section => section.lineChart)?.lineChart?.points, [
    [0, 0], [20, 60], [40, 75], [100, 100],
  ]);
  const { documents } = prepareFachpaket(catalogue, 'marketing', contentVersion);
  const packaged = Object.values(documents).flatMap(part => JSON.parse(part.payload).articles);
  assert.deepEqual(packaged.find(article => article.id === ansoff.id), JSON.parse(JSON.stringify(ansoff)));
  assert.deepEqual(packaged.find(article => article.id === customerAbc.id), JSON.parse(JSON.stringify(customerAbc)));
  const invalid = structuredClone(customerAbc);
  invalid.sections.find(section => section.lineChart)!.lineChart!.points[0] = [0, 101];
  assert.equal(isArticleBody(invalid), false);
});
