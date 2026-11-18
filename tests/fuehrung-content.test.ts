import assert from 'node:assert/strict';
import test from 'node:test';
import { articles, chapters, contentVersion, glossary, subjects } from '../src/data/content';
import { isCatalogue } from '../src/services/catalogueModel';
import { prepareFachpaket } from '../scripts/pack-publication';

const subjectId = 'fuehrung-zusammenarbeit';
const courseArticles = articles.filter(article => article.subjectId === subjectId);
const courseChapters = chapters.filter(chapter => chapter.subjectId === subjectId);
const catalogue = JSON.parse(JSON.stringify({ version: contentVersion, subjects, chapters, articles, glossary }));

test('Führung und Zusammenarbeit covers seven reachable textbook chapters and preserves existing IDs', () => {
  assert.deepEqual(courseChapters.filter(chapter => !chapter.parentId).map(chapter => chapter.id), [
    'fz-fuehrung', 'fz-kommunikation', 'fz-konflikte', 'fz-mitarbeiterfoerderung',
    'fz-ausbildung', 'fz-moderation', 'fz-praesentation',
  ]);
  assert.equal(new Set(courseChapters.map(chapter => chapter.number)).size, courseChapters.length);
  for (const chapter of courseChapters.filter(chapter => !chapter.parentId)) {
    assert.ok(courseArticles.some(article => article.number.startsWith(`${chapter.number}.`)), chapter.id);
  }
  assert.ok(isCatalogue(catalogue));
});

test('the offline leadership pack has self-checks and resolves the existing Leittextmethode', () => {
  const { documents } = prepareFachpaket(catalogue, subjectId, contentVersion);
  const bodies = Object.values(documents).flatMap(part => JSON.parse(part.payload).articles);
  assert.equal(bodies.length, courseArticles.length);
  for (const article of courseArticles) {
    assert.ok(article.sections.some(section => section.hint?.content.trim()), article.id);
  }
  const paragraphs = courseArticles.filter(a => a.number.startsWith('5.')).flatMap(a => a.sections.flatMap(s => s.paragraphs.flat()));
  assert.ok(paragraphs.some(part => part.articleId === 'leittextmethode'));
  assert.equal(articles.filter(article => article.id === 'leittextmethode').length, 1);
});
