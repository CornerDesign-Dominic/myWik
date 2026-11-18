import type { Article, Chapter, GlossaryTerm } from '../types';
import { accountingBasics } from './rw-grundlagen';
import { accountingFinance } from './rw-finanzbuchhaltung';
import { accountingCosts } from './rw-kostenrechnung';
import { accountingCalculations } from './rw-kalkulation';
import { accountingDecisions } from './rw-teilkosten';
import { accountingAnalysis } from './rw-auswertung';
import { accountingPlanning } from './rw-planung';

const subjectId = 'rechnungswesen';
const updatedAt = Date.UTC(2026, 10, 18);
const topics = [
  ...accountingBasics, ...accountingFinance, ...accountingCosts, ...accountingCalculations,
  ...accountingDecisions, ...accountingAnalysis, ...accountingPlanning,
];

const groups: [number: string, id: string, title: string][] = [
  ['1', 'rw-rechnungswesen-grundlagen', 'Grundlegende Aspekte des Rechnungswesens'],
  ['2', 'rw-finanzbuchhaltung', 'Finanzbuchhaltung'],
  ['2.2', 'rw-jahresabschluss', 'Jahresabschluss'],
  ['3', 'rw-klr', 'Kosten- und Leistungsrechnung'],
  ['3.1', 'rw-klr-einfuehrung', 'Einführung in die Kosten- und Leistungsrechnung'],
  ['3.3', 'rw-kostenstellen', 'Kostenstellenrechnung'],
  ['3.4', 'rw-kostentraeger', 'Kostenträgerzeit- und Kostenträgerstückrechnung'],
  ['3.5', 'rw-teilkosten', 'Vollkosten- und Teilkostenrechnung'],
  ['4', 'rw-auswertung', 'Auswertung der betriebswirtschaftlichen Zahlen'],
  ['4.1', 'rw-aufbereitung', 'Aufbereitung und Auswertung der Zahlen'],
  ['4.2', 'rw-rentabilitaet', 'Rentabilitätsrechnungen'],
  ['5', 'rw-planungsrechnung', 'Planungsrechnung'],
];

const groupIds = new Map(groups.map(([number, id]) => [number, id]));
const parentId = (number: string) => groupIds.get(number.slice(0, number.lastIndexOf('.')));
export const contributionMarginNumber = '3.5.2';

export const accountingChapters: Chapter[] = [
  ...groups.map(([number, id, title]) => ({ id, subjectId, number, title, parentId: parentId(number) })),
  ...topics.map(({ id, number, title }) => ({ id, subjectId, number, title, parentId: parentId(number), articleId: id })),
  {
    id: 'rw-db', subjectId, number: contributionMarginNumber, title: 'Deckungsbeitrag',
    parentId: 'rw-teilkosten', articleId: 'deckungsbeitrag',
  },
].sort((a, b) => a.number.localeCompare(b.number, 'de', { numeric: true }));

export const accountingArticles: Article[] = topics.map(({ id, number, title, intro, sections }) => ({
  id, subjectId, chapterId: id, number, title, intro, sections, updatedAt, version: 1,
}));

export const accountingGlossary: GlossaryTerm[] = topics.flatMap(topic =>
  (topic.terms ?? []).map(([id, term, definition]) => ({ id, subjectId, term, definition, articleId: topic.id })),
);
