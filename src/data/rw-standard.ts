import type { ArticleSection, RichText } from '../types';
import { transferSection } from './logistik-standard';

export interface AccountingTopic {
  id: string;
  number: string;
  title: string;
  intro: string;
  sections: ArticleSection[];
  terms?: [id: string, term: string, definition: string][];
}

function richText(value: string): RichText[] {
  const parts: RichText[] = [];
  let offset = 0;
  for (const hit of value.matchAll(/\[\[([ta]):([a-z0-9-]+)\|([^\]]+)\]\]/g)) {
    const [match, kind, id, label] = hit;
    if (hit.index > offset) parts.push({ text: value.slice(offset, hit.index) });
    parts.push(kind === 't' ? { text: label, termId: id } : { text: label, articleId: id });
    offset = hit.index + match.length;
  }
  if (offset < value.length) parts.push({ text: value.slice(offset) });
  return parts;
}

export const section = (id: string, title: string, ...paragraphs: string[]): ArticleSection => ({
  id, title, paragraphs: paragraphs.map(richText),
});

export const check = (question: string, answer: string, transferQuestion: string, transferAnswer: string): ArticleSection[] => [
  {
    ...section('kurzfrage', 'Kurzfrage', question),
    hint: { label: 'SELBSTKONTROLLE', title: 'Musterantwort', content: answer },
  },
  transferSection(transferQuestion, transferAnswer),
];

export const law = (...references: string[]) => section(
  'quellen', 'Quellen und Rechtsstand',
  'Quellenabgleich am 18. November 2026. Für Prüfungsaufgaben gilt der vorgegebene Rechtsstand.',
  ...references,
);
