import assert from 'node:assert/strict';
import test from 'node:test';
import backendArticles from '../functions/src/catalogue.json';
import { prepareFachpaket } from '../scripts/pack-publication';
import { articles, chapters, contentVersion, glossary, subjects } from '../src/data/content';

const subjectId = 'betriebliches-management';
const outline = chapters.filter(chapter => chapter.subjectId === subjectId);
const lessons = articles.filter(article => article.subjectId === subjectId);

test('every photographed management topic is reachable with a lesson and two self-checks', () => {
  const photographedTopics = [
    '1', '1.1', '1.2', '1.3', '1.4', '1.5',
    '2', '2.1', '2.2', '2.2.1', '2.2.2', '2.2.3', '2.3', '2.3.1', '2.3.2', '2.3.3', '2.3.4', '2.3.5',
    '3', '3.1', '3.1.1', '3.1.2', '3.1.3', '3.1.4', '3.1.5', '3.2', '3.2.1', '3.2.2',
    '4', '4.1', '4.2', '4.2.1', '4.2.2', '4.2.3', '4.3', '4.3.1', '4.3.2', '4.3.3', '4.3.4',
    '4.4', '4.4.1', '4.4.2', '4.4.3', '4.4.4', '4.4.5', '4.4.6', '4.4.7', '4.4.8',
  ];
  const byNumber = new Map(outline.map(chapter => [chapter.number, chapter]));
  assert.equal(byNumber.size, outline.length);
  assert.equal(byNumber.get('1')?.id, 'bm-planung');
  assert.equal(byNumber.get('4.3')?.id, 'bm-projekt');
  const byId = new Map(lessons.map(article => [article.id, article]));
  for (const number of photographedTopics) {
    const chapter = byNumber.get(number);
    assert.ok(chapter?.articleId, `missing lesson for ${number}`);
    const article = byId.get(chapter.articleId);
    assert.equal(article?.chapterId, chapter.id);
    assert.equal(article?.sections.filter(section => section.hint?.content.trim()).length, 2);
  }
});

test('management lessons match in the app, offline content pack and backend catalogue', () => {
  const catalogue = JSON.parse(JSON.stringify({ version: contentVersion, subjects, chapters, articles, glossary }));
  const { documents } = prepareFachpaket(catalogue, subjectId, contentVersion);
  const expected = JSON.parse(JSON.stringify(lessons));
  assert.deepEqual(Object.values(documents).flatMap(part => JSON.parse(part.payload).articles), expected);
  assert.deepEqual(backendArticles.filter(article => article.subjectId === subjectId), expected);
});
