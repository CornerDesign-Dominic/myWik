import assert from 'node:assert/strict';
import test from 'node:test';
import { articles, chapters, glossary, subjects } from '../src/data/content';

test('chapter catalogue has unique IDs, valid parents and no cycles', () => {
  for (const collection of [subjects, chapters, articles, glossary]) {
    assert.equal(new Set(collection.map(item => item.id)).size, collection.length);
  }
  const subjectIds = new Set(subjects.map(subject => subject.id));
  for (const chapter of chapters) {
    assert.ok(subjectIds.has(chapter.subjectId));
    const visited = new Set([chapter.id]);
    let current = chapter;
    while (current.parentId) {
      const parent = chapters.find(item => item.id === current.parentId);
      assert.ok(parent, `Missing parent of ${current.id}`);
      assert.equal(parent.subjectId, chapter.subjectId);
      assert.ok(current.number.startsWith(`${parent.number}.`));
      assert.ok(!visited.has(parent.id), `Cycle from ${chapter.id}`);
      visited.add(parent.id);
      current = parent;
    }
    if (chapter.articleId) assert.ok(articles.some(article => article.id === chapter.articleId));
  }
});

test('every article and glossary link resolves to its matching subject and chapter', () => {
  for (const article of articles) {
    const chapter = chapters.find(item => item.id === article.chapterId);
    assert.ok(chapter);
    assert.equal(chapter.articleId, article.id);
    assert.equal(chapter.subjectId, article.subjectId);
    assert.equal(chapter.number, article.number);
    assert.equal(new Set(article.sections.map(section => section.id)).size, article.sections.length);
    for (const section of article.sections) {
      for (const part of section.paragraphs.flat()) {
        if (part.termId) assert.ok(glossary.some(term => term.id === part.termId), `Missing term ${part.termId}`);
      }
    }
  }
  for (const term of glossary) {
    if (term.articleId) assert.ok(articles.some(article => article.id === term.articleId));
  }
});
