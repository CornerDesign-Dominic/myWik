import type { Article, Chapter, GlossaryTerm, Subject } from '../types';

export type ArticleSummary = Pick<Article, 'id' | 'subjectId' | 'chapterId' | 'title' | 'number' | 'version' | 'updatedAt'>;
export type ContentIndex = {
  version: number;
  subjects: Subject[];
  chapters: Chapter[];
  articles: ArticleSummary[];
  glossary: GlossaryTerm[];
};

export function articleSummary({ id, subjectId, chapterId, title, number, version, updatedAt }: Article): ArticleSummary {
  return { id, subjectId, chapterId, title, number, version, updatedAt };
}
