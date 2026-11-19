import type { Article, ArticleSection, Chapter, GlossaryTerm, RichText } from '../types';
// Reuse the catalogue's ordinary text, tab and collapsible-answer components.
export { topic } from './bm-artikel';
export const ufSubject = 'unternehmensfuehrung';
export type UfLesson = { id: string; number: string; title: string; intro: string; sections: ArticleSection[]; checks: [string, string][] };
export const ref = (articleId: string, text: string): RichText => ({ articleId, text });
export const word = (id: string, text: string): RichText => ({ termId: `uf-${id}`, text });
export const sources = (...references: string[]): ArticleSection => ({
  id: 'quellen', title: 'Quellen und Stand',
  paragraphs: ['Fachlicher Quellenabgleich: 19. November 2026. Die Fälle und Zahlen sind eigene Modellannahmen. Abdeckung nach dem fotografierten IHK-Inhaltsverzeichnis; unbekannte Buchtexte und Buchaufgaben wurden nicht abgeglichen.', ...references].map(text => [{ text }]),
});
export const orgSource = 'Helmut Zell, Die Grundlagen der Organisation (2017), Aufgaben und Lösungen: https://ibim.de/Orga-Site/downloads/Orga-Aufgaben-V1-Lsg.pdf';
export const planSource = 'RKW Kompetenzzentrum, Personalbedarfsplanung (Verfahren und Maßnahmen): https://www.rkw-kompetenzzentrum.de/toolbox/personalbedarfsplanung/';
export const peopleSource = 'KOFA, Strategische Personalbedarfsplanung in fünf Schritten: https://www.kofa.de/personalarbeit/analyse/personalbedarfsplanung/';
export function outline(lessons: UfLesson[]) {
  const roots: Record<string, string> = { '1': 'uf-strategie', '2': 'uf-organisation', '3': 'uf-entwicklung' };
  const ids = new Map(lessons.map(l => [l.number, roots[l.number] ?? `uf-${l.id}`]));
  const chapters: Chapter[] = lessons.map(l => {
    const parentNumber = l.number.split('.').slice(0, -1).join('.');
    if (parentNumber && !ids.has(parentNumber)) throw new Error(`UF parent missing: ${l.number}`);
    return { id: ids.get(l.number)!, subjectId: ufSubject, number: l.number, title: l.title, parentId: ids.get(parentNumber), articleId: `uf-artikel-${l.id}` };
  });
  const articles: Article[] = lessons.map(l => ({
    id: `uf-artikel-${l.id}`, subjectId: ufSubject, chapterId: ids.get(l.number)!, title: l.title, number: l.number,
    intro: l.intro, updatedAt: Date.UTC(2026, 10, 19), version: 1,
    sections: [...l.sections, ...l.checks.map(([question, answer], i) => ({
      id: i ? 'transferfrage' : 'kurzfrage', title: i ? 'Transfer' : 'Selbstkontrolle', paragraphs: [[{ text: question }]],
      hint: { label: 'SELBSTKONTROLLE', title: 'Musterantwort', content: answer },
    }))],
  }));
  return { chapters, articles };
}
export const define = (id: string, term: string, definition: string, lesson: string): GlossaryTerm => ({ id: `uf-${id}`, subjectId: ufSubject, term, definition, articleId: `uf-artikel-${lesson}` });
