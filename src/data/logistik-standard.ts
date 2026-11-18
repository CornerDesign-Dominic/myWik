import type { ArticleSection, RichText } from '../types';

export interface LogisticsSupplement {
  intro?: string;
  sections?: [id: string, title: string, ...paragraphs: string[]][];
  glossary?: [id: string, term: string, definition: string, aliases?: string[]][];
  transfer?: [question: string, answer: string];
  sources?: string[];
}

export type GlossaryAlias = { text: string; termId: string };
export const normalizeTerm = (text: string) => text.normalize('NFC').toLocaleLowerCase('de');
const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function linkGlossary(sections: ArticleSection[], aliases: GlossaryAlias[]): ArticleSection[] {
  let matches: RegExp | undefined;
  const idsByText = new Map<string, string>();
  for (const { text, termId } of aliases) {
    const key = normalizeTerm(text);
    if (key.length >= 2 && !idsByText.has(key)) idsByText.set(key, termId);
  }
  if (idsByText.size) {
    const alternatives = [...idsByText.keys()].sort((a, b) => b.length - a.length).map(escapeRegExp);
    matches = new RegExp(`(^|[^\\p{L}\\p{N}])(${alternatives.join('|')})(?![\\p{L}\\p{N}])`, 'giu');
  }
  if (!matches) return sections;
  const alreadyLinked = new Set<string>();
  const expression = matches;
  const link = (part: RichText): RichText[] => {
    if (part.termId || part.articleId) {
      if (part.termId) alreadyLinked.add(part.termId);
      return [part];
    }
    let cursor = 0;
    const linked: RichText[] = [];
    for (const hit of part.text.matchAll(expression)) {
      const termId = idsByText.get(normalizeTerm(hit[2]));
      if (!termId || alreadyLinked.has(termId)) continue;
      const start = hit.index + hit[1].length;
      if (start > cursor) linked.push({ text: part.text.slice(cursor, start) });
      linked.push({ text: hit[2], termId });
      alreadyLinked.add(termId);
      cursor = start + hit[2].length;
    }
    if (cursor < part.text.length) linked.push({ text: part.text.slice(cursor) });
    return linked.length ? linked : [part];
  };
  return sections.map(section => ({
    ...section,
    paragraphs: section.paragraphs.map(paragraph => paragraph.flatMap(link)),
  }));
}

export function transferSection(question: string, answer: string): ArticleSection {
  return {
    id: 'transferfrage',
    title: 'Transferfrage',
    paragraphs: [[{ text: question }]],
    hint: { label: 'SELBSTKONTROLLE', title: 'Musterantwort', content: answer },
  };
}
