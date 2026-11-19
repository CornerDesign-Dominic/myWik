import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import { articles, chapters, glossary } from '../src/data/content';
import { loaders } from '../src/data/generated/articleLoaders';

const course = articles.filter(a => a.subjectId === 'unternehmensfuehrung');
const coverage = readFileSync(new URL('../docs/UNTERNEHMENSFUEHRUNG-STOFFLISTE.md', import.meta.url), 'utf8');

test('every visible IHK point has a real article and section in the coverage map', () => {
  const rows = coverage.split('\n').filter(line => /^\| \d+(?:\.\d+)* \|/.test(line));
  assert.equal(rows.length, 42);
  assert.equal(new Set(rows.map(row => row.split('|')[1].trim())).size, 42);
  for (const row of rows) {
    const targets = [...row.matchAll(/`([a-z0-9-]+)(?:#([a-z0-9-]+))?`/g)];
    assert.ok(targets.length, row);
    for (const [, id, section] of targets) {
      const article = articles.find(a => a.id === id);
      assert.ok(article, id);
      if (section) assert.ok(article.sections.some(s => s.id === section), `${id}#${section}`);
    }
    assert.match(row, /erklärt \+ geprüft/);
  }
});

test('UF keeps existing chapter IDs and all lessons reach a subject root', () => {
  assert.ok(chapters.some(c => c.id === 'uf-strategie' && c.subjectId === 'unternehmensfuehrung'));
  assert.ok(chapters.some(c => c.id === 'uf-organisation' && c.subjectId === 'unternehmensfuehrung'));
  for (const article of course) {
    let node = chapters.find(c => c.id === article.chapterId)!;
    assert.equal(node.articleId, article.id);
    const visited = new Set<string>();
    while (node.parentId) {
      assert.ok(!visited.has(node.id));
      visited.add(node.id);
      node = chapters.find(c => c.id === node.parentId)!;
      assert.equal(node.subjectId, 'unternehmensfuehrung');
    }
    assert.ok(['uf-strategie', 'uf-organisation', 'uf-entwicklung'].includes(node.id));
  }
});

test('UF and referenced lessons load from generated web bodies and the native database with answers and valid links', () => {
  const reachable = new Set(course.map(a => a.id));
  for (const article of course) {
    assert.equal(article.sections.filter(s => s.hint?.label === 'SELBSTKONTROLLE').length, 2, article.id);
    assert.ok(article.sections.some(s => s.id === 'transferfrage' && s.hint?.content.trim()), article.id);
    for (const part of article.sections.flatMap(s => s.paragraphs.flat())) {
      if (part.articleId) {
        assert.ok(articles.some(a => a.id === part.articleId), part.articleId);
        reachable.add(part.articleId);
      }
      if (part.termId) {
        const term = glossary.find(t => t.id === part.termId);
        assert.ok(term, part.termId);
        assert.ok(term.definition.trim(), part.termId);
        if (term.articleId) {
          assert.ok(articles.some(a => a.id === term.articleId), term.articleId);
          reachable.add(term.articleId);
        }
      }
    }
  }
  const db = new DatabaseSync('assets/generated/catalogue.db', { readOnly: true });
  try {
    const query = db.prepare('SELECT body FROM articles WHERE id = ?');
    for (const id of reachable) {
      const expected = JSON.parse(JSON.stringify(articles.find(a => a.id === id)!));
      assert.deepEqual(loaders[id](), expected, `Web: ${id}`);
      assert.deepEqual(JSON.parse(String(query.get(id)!.body)), expected, `Native: ${id}`);
    }
  } finally { db.close(); }
});
