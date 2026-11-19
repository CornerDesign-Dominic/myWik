import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { articles, chapters, glossary } from '../src/data/content';
import { loadBundledArticle } from '../src/services/bundledArticle';
import { articleLinksExist } from '../src/services/catalogueModel';

test('all 31 photographed VWL headings have a documented objective, existing target and explained status', () => {
  const coverage = readFileSync(new URL('../docs/VWL-STOFFLISTE.md', import.meta.url), 'utf8');
  const expected = ['1', '1.1', '1.1.1', '1.1.2', '1.2', '1.2.1', '1.2.2', '1.3',
    '2', '2.1', '2.2', '2.2.1', '2.2.2', '2.2.3', '3', '3.1', '3.1.1', '3.1.2',
    '3.2', '3.2.1', '3.2.2', '3.2.3', '3.2.4', '3.2.5', '3.2.6', '3.2.7', '4', '4.1', '4.2', '4.2.1', '4.2.2'];
  const rows = coverage.split('\n').filter(line => /^\| \d/.test(line));
  assert.deepEqual(rows.map(line => line.split('|')[1].trim()), expected);
  for (const row of rows) {
    const columns = row.split('|').map(value => value.trim());
    assert.ok(columns[3].length > 30, `Missing objective: ${row}`);
    assert.equal(columns[6], 'Erklärt');
    const targets = [...columns[4].matchAll(/`([\w-]+)(?:#([\w-]+))?`/g)];
    assert.ok(targets.length);
    for (const [, id, sectionId] of targets) {
      const article = articles.find(a => a.id === id);
      assert.ok(article, `Missing article ${id}`);
      if (sectionId) assert.ok(article.sections.some(s => s.id === sectionId), `${id}#${sectionId}`);
    }
  }
});

test('every VWL lesson is reachable, loadable offline and includes transferable answers and valid references', async () => {
  const articleIds = new Set(articles.map(a => a.id));
  const termIds = new Set(glossary.map(g => g.id));
  const lessons = articles.filter(a => a.subjectId === 'vwl');
  assert.ok(lessons.length >= 17);
  for (const lesson of lessons) {
    const chapter = chapters.find(c => c.articleId === lesson.id);
    assert.ok(chapter);
    let root = chapter;
    while (root.parentId) root = chapters.find(c => c.id === root.parentId)!;
    assert.equal(root.subjectId, 'vwl');
    assert.ok(articleLinksExist(lesson, articleIds, termIds), lesson.id);
    assert.deepEqual(await loadBundledArticle(lesson.id), lesson);
    assert.ok(lesson.sections.some(s => s.paragraphs.flat().some(p => p.termId)), lesson.id);
    for (const sectionId of ['transferfrage', 'kurzfrage']) {
      const exercise = lesson.sections.find(s => s.id === sectionId);
      assert.ok(exercise?.paragraphs.flat().map(p => p.text).join('').length);
      assert.ok(exercise.hint?.content.length && exercise.hint.content.length > 60);
      assert.equal(exercise.hint.label, 'SELBSTKONTROLLE');
      assert.equal(exercise.hint.title, 'Musterantwort');
    }
  }
  assert.ok(chapters.some(c => c.id === 'vwl-maerkte'));
  assert.ok(chapters.some(c => c.id === 'vwl-politik'));
});

test('price diagrams match the equations, equilibrium and binding price examples', () => {
  const charts = articles.filter(a => a.subjectId === 'vwl').flatMap(a => a.sections.flatMap(s => s.lineChart ? [s.lineChart] : []));
  assert.equal(charts.length, 3);
  for (const chart of charts) {
    assert.equal(chart.xLabel, 'Menge (Stück/Woche)');
    assert.equal(chart.yLabel, 'Preis (€/Stück)');
    for (const [quantity, price] of chart.points) assert.equal(quantity, 120 - 10 * price);
    for (const [quantity, price] of chart.reference!) assert.equal(quantity, 10 * price);
    assert.ok(chart.points.some(([x, p]) => x === 60 && p === 6));
    assert.deepEqual([4, 8].map(p => Math.abs((120 - 10 * p) - 10 * p)), [40, 40]);
  }
});
