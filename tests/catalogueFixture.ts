import { articles, chapters, contentVersion, glossary, subjects } from '../src/data/content';
import type { Catalogue } from '../src/services/catalogueModel';
import { articleSummary } from '../src/services/contentIndex';

export const currentCatalogue = { version: contentVersion, articles, chapters, glossary, subjects };
export const catalogueIndex = ({ articles, ...meta }: Catalogue) => ({ ...meta, articles: articles.map(articleSummary) });

export function tenfoldCatalogue(): Catalogue {
  const result: Catalogue = { ...currentCatalogue, version: contentVersion + 1, articles: [...articles], chapters: [...chapters], glossary: [...glossary] };
  for (let n = 1; n < 10; n++) {
    const id = (value: string) => `${value}-sim-${n}`;
    const optional = (value?: string) => value ? id(value) : undefined;
    result.chapters.push(...chapters.map(c => ({ ...c, id: id(c.id), parentId: optional(c.parentId), articleId: optional(c.articleId), number: `${n + 10}.${c.number}` })));
    result.glossary.push(...glossary.map(t => ({ ...t, id: id(t.id), articleId: optional(t.articleId), term: `${t.term} Simulation ${n}` })));
    result.articles.push(...articles.map(a => ({
      ...a, id: id(a.id), chapterId: id(a.chapterId), title: `${a.title} Simulation ${n}`, number: `${n + 10}.${a.number}`,
      sections: a.sections.map(s => ({ ...s, paragraphs: s.paragraphs.map(p => p.map(t => ({ ...t, termId: optional(t.termId), articleId: optional(t.articleId) }))) })),
    })));
  }
  return JSON.parse(JSON.stringify(result));
}
