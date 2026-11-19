import type { Article, Chapter, GlossaryTerm } from '../types';
import { taxBasics } from './steuern-grundlagen';
import { taxIncome } from './steuern-ertrag';
import { taxSales } from './steuern-umsatz';
import { taxProperty } from './steuern-besitz';
import { taxProcedure } from './steuern-verfahren';
import { linkGlossary } from './logistik-standard';
import { accountingGlossary } from './rechnungswesen';
import { logisticsGlossary } from './logistik';
import { lawGlossary } from './recht';

export const taxTopics = [...taxBasics, ...taxIncome, ...taxSales, ...taxProperty, ...taxProcedure];
const subjectId = 'steuern';
const groups: Chapter[] = [
  // Preserve the existing entry point for saved navigation.
  { id: 'steuern-arten', subjectId, number: '1', title: 'Grundbegriffe des Steuerrechts' },
  { id: 'st-unternehmen', subjectId, number: '2', title: 'Unternehmensbezogene Steuern' },
  { id: 'st-abgabenordnung', subjectId, number: '3', title: 'Abgabenordnung und Besteuerungsverfahren' },
];
const parents = new Map([...groups, ...taxTopics].map(t => [t.number, t.id]));
export const taxChapters: Chapter[] = [
  ...groups,
  ...taxTopics.map(({ id, number, title }) => ({
    id, subjectId, number, title, articleId: id,
    parentId: parents.get(number.slice(0, number.lastIndexOf('.'))),
  })),
].sort((a, b) => a.number.localeCompare(b.number, 'de', { numeric: true }));
export const taxGlossary: GlossaryTerm[] = taxTopics.flatMap(t =>
  (t.terms ?? []).map(([id, term, definition]) => ({ id, subjectId, term, definition, articleId: t.id })),
);
export const taxArticles: Article[] = taxTopics.map(({ id, number, title, intro, sections }) => ({
  id, subjectId, chapterId: id, number, title, intro,
  sections: linkGlossary(sections, [...taxGlossary, ...accountingGlossary, ...logisticsGlossary, ...lawGlossary].map(t => ({ text: t.term, termId: t.id }))),
  updatedAt: Date.UTC(2026, 10, 19), version: 1,
}));
