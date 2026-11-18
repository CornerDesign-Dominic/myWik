import type { Article, ArticleSection, Chapter, GlossaryTerm, RichText } from '../types';

export const managementSubjectId = 'betriebliches-management';
const updatedAt = Date.UTC(2026, 10, 18);
const articleId = (slug: string) => `bm-artikel-${slug}`;
const termId = (slug: string) => `bm-begriff-${slug}`;

type Paragraph = string | (string | RichText)[];
type Check = [prompt: string, answer: string];

export interface ManagementLesson {
  slug: string;
  number: string;
  title: string;
  intro: string;
  sections: ArticleSection[];
  checks: [Check, Check];
}

export function topic(id: string, title: string, ...paragraphs: Paragraph[]): ArticleSection {
  return {
    id,
    title,
    paragraphs: paragraphs.map(paragraph => (typeof paragraph === 'string' ? [paragraph] : paragraph)
      .map(part => typeof part === 'string' ? { text: part } : part)),
  };
}

export const term = (slug: string, text: string): RichText => ({ termId: termId(slug), text });
export const related = (id: string, text: string): RichText => ({ articleId: id, text });
export const lesson = (slug: string, text: string): RichText => related(articleId(slug), text);

export function glossaryTerm(slug: string, term: string, definition: string, lessonSlug: string): GlossaryTerm {
  return { id: termId(slug), subjectId: managementSubjectId, term, definition, articleId: articleId(lessonSlug) };
}

export function buildManagementOutline(lessons: ManagementLesson[]): { chapters: Chapter[]; articles: Article[] } {
  const chaptersByNumber = new Map(lessons.map(({ slug, number }) => [number, `bm-${slug}`]));
  const chapters = lessons.map(({ slug, title, number }): Chapter => {
    const parentNumber = number.split('.').slice(0, -1).join('.');
    const parentId = chaptersByNumber.get(parentNumber);
    if (parentNumber && !parentId) throw new Error(`Oberkapitel ${parentNumber} fehlt für ${number}`);
    return { id: `bm-${slug}`, subjectId: managementSubjectId, title, number, parentId, articleId: articleId(slug) };
  });
  const articles = lessons.map(({ slug, number, title, intro, sections, checks }): Article => ({
    id: articleId(slug), subjectId: managementSubjectId, chapterId: `bm-${slug}`,
    number, title, intro, updatedAt, version: 1,
    sections: [
      ...sections,
      ...checks.map(([prompt, answer], index) => ({
        ...topic(index === 0 ? 'kurzfrage' : 'transferfrage', index === 0 ? 'Selbstkontrolle' : 'Transfer', prompt),
        hint: { title: 'Musterantwort', label: 'SELBSTKONTROLLE', content: answer },
      })),
    ],
  }));
  return { chapters, articles };
}
