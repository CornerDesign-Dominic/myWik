import assert from 'node:assert/strict';
import test from 'node:test';
import { articles, chapters, contentVersion, glossary, subjects } from '../src/data/content';
import { isCatalogue } from '../src/services/catalogueModel';
import { prepareFachpaket } from '../scripts/pack-publication';

const subjectId = 'recht';
const lessons = articles.filter(article => article.subjectId === subjectId);
const outline = chapters.filter(chapter => chapter.subjectId === subjectId);
const catalogue = JSON.parse(JSON.stringify({ version: contentVersion, subjects, chapters, articles, glossary }));

test('the law curriculum keeps the original chapter ID and exposes all seven learning areas', () => {
  assert.deepEqual(outline.filter(chapter => !chapter.parentId).map(chapter => chapter.id), [
    'recht-vertraege', 'recht-vertrag-durchsetzung', 'recht-vertragstypen',
    'recht-schuld-sachen-insolvenz', 'recht-handelsrecht', 'recht-arbeitsrecht',
    'recht-wettbewerb-gewerbe',
  ]);
  assert.equal(new Set(outline.map(chapter => chapter.number)).size, outline.length);
  assert.ok(isCatalogue(catalogue));
});

test('the offline law pack contains every article including the registered-power cases', () => {
  const { documents } = prepareFachpaket(catalogue, subjectId, contentVersion);
  const packed = Object.values(documents).flatMap(part => JSON.parse(part.payload).articles);
  assert.deepEqual(packed.map(article => article.id), lessons.map(article => article.id));
  assert.ok(lessons.every(article => article.sections.some(section => section.hint?.content.trim())));
  const caseArticle = packed.find(article => article.id === 'recht-fall-handelsvollmachten');
  assert.ok(caseArticle.sections.some((section: { hint?: { content: string } }) => section.hint?.content.includes('§ 15 Abs. 1 HGB')));
});

test('the offline law lessons cover the IHK additions and preserve the existing article links', () => {
  const outlineById = new Map(outline.map(chapter => [chapter.id, chapter]));
  const expectedParents = {
    'recht-ratenkauf': 'recht-leasing',
    'recht-fernabsatz': 'recht-umtausch-widerruf',
    'recht-elektronischer-geschaeftsverkehr': 'recht-umtausch-widerruf',
    'recht-faustpfand': 'recht-kreditsicherheiten',
    'recht-sicherungsuebereignung': 'recht-kreditsicherheiten',
    'recht-sicherungsabtretung': 'recht-kreditsicherheiten',
    'recht-grundpfandrechte': 'recht-kreditsicherheiten',
    'recht-scheinkaufmann': 'recht-kaufmannseigenschaft',
    'recht-vermittlergewerbe': 'recht-handelsrecht',
    'recht-arbeitsvertragsarten': 'recht-arbeitsvertrag',
    'recht-arbeitsvertrag-pflichten': 'recht-arbeitsvertrag',
    'recht-schwerbehindertenschutz': 'recht-besonderer-kuendigungsschutz',
  };
  for (const [id, parentId] of Object.entries(expectedParents)) {
    assert.equal(outlineById.get(id)?.parentId, parentId, id);
    assert.equal(outlineById.get(id)?.articleId, id, id);
    assert.ok(lessons.find(article => article.id === id)?.sections.some(section => section.hint?.content), id);
  }
});
