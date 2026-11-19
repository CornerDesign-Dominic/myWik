import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { articles, chapters, contentVersion, glossary, subjects } from '../src/data/content';
import { loaders } from '../src/data/generated/articleLoaders';
import { isCatalogue } from '../src/services/catalogueModel';
import { prepareFachpaket } from '../scripts/pack-publication';

const lessons = articles.filter(a => a.subjectId === 'bwl');
// Independent transcription of the photographed outline; multiple nodes may share one complete lesson.
const coverage: Record<string, string> = {
  '1': 'grundlagen', '1.1': 'funktionsziele', '1.1.1': 'produktion', '1.1.2': 'logistik',
  '1.1.3': 'marketing', '1.1.4': 'rechnungswesen', '1.1.5': 'finanzierung-investition',
  '1.1.6': 'controlling', '1.1.7': 'personal', '1.2': 'zusammenwirken',
  'Aufgabe 1': 'fall-funktionen', '2': 'rechtsformen', '2.1': 'gruendungsphasen',
  '2.2': 'gruendungsvoraussetzungen', '2.3': 'rechtsformwahl', '2.3.1': 'rechtsformkombinationen',
  '2.3.2': 'haftung-leitung-vertretung', 'Aufgaben 2': 'fall-gruendung',
  '3': 'verbindungen', '3.1': 'kooperation', '3.1.1': 'kooperation', '3.1.2': 'kooperationsziele',
  '3.2': 'konzentration', '3.2.1': 'konzentration', '3.2.2': 'konzentrationsziele',
  'Aufgabe 3': 'fall-verbindungen',
};

test('BWL covers every photographed node and retains existing catalogue IDs', () => {
  const outline = chapters.filter(c => c.subjectId === 'bwl');
  assert.equal(new Set(outline.map(c => c.number)).size, outline.length);
  assert.equal(outline.find(c => c.number === '1')?.id, 'bwl-grundlagen');
  assert.equal(outline.find(c => c.number === '2')?.id, 'bwl-rechtsformen');
  const list = readFileSync('docs/BWL-STOFFLISTE.md', 'utf8');
  for (const [node, suffix] of Object.entries(coverage)) {
    const id = `bwl-${suffix}`;
    const lesson = lessons.find(a => a.id === id);
    assert.ok(lesson, `No BWL lesson for photo node ${node}`);
    assert.ok(list.includes(id), `Missing mapping for ${node}`);
    assert.ok(outline.some(c => c.articleId === id));
    assert.ok(lesson.sections.some(s => s.id === 'quellen'));
    assert.ok(lesson.sections.find(s => s.id === 'kurzfrage')?.hint?.content);
    assert.ok(lesson.sections.find(s => /transfer/.test(s.id))?.hint?.content);
  }
  assert.equal(lessons.length, new Set(Object.values(coverage)).size);
});

test('BWL offline loaders and content pack retain all paragraphs, links and collapsed answers', () => {
  const catalogue = JSON.parse(JSON.stringify({ version: contentVersion, subjects, chapters, articles, glossary }));
  assert.ok(isCatalogue(catalogue));
  for (const lesson of lessons) {
    assert.deepEqual(loaders[lesson.id](), JSON.parse(JSON.stringify(lesson)));
    assert.equal(lesson.sections.at(-1)?.hint?.title, 'Musterantwort');
    for (const section of lesson.sections) {
      for (const fragment of section.paragraphs.flat()) assert.ok(!fragment.text.includes('[['));
    }
  }
  const pack = prepareFachpaket(catalogue, 'bwl', contentVersion);
  assert.deepEqual(Object.values(pack.documents).flatMap(part => JSON.parse(part.payload).articles), JSON.parse(JSON.stringify(lessons)));
  for (const id of ['bwl-fall-funktionen', 'bwl-fall-gruendung', 'bwl-fall-verbindungen']) {
    assert.ok(loaders[id]().sections.find(s => s.id === 'musterloesung')?.hint?.content);
  }
});
