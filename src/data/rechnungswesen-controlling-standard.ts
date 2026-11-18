import type { Article, ArticleSection, Chapter, GlossaryTerm } from '../types';
import { linkGlossary, transferSection } from './logistik-standard';

export interface LearningArticle {
  chapter: string;
  id: string;
  title: string;
  intro: string;
  principle: string[];
  example: string[];
  interpretation: string[];
  diagram?: Pick<ArticleSection, 'lineChart' | 'matrix'>;
  check: [question: string, answer: string];
  transfer: [question: string, answer: string];
  terms?: [term: string, definition: string, aliases?: string[]][];
  related?: [articleId: string, title: string][];
}

export function buildLearningArticles(chapters: Chapter[], entries: LearningArticle[]) {
  const chapterById = new Map(chapters.map(chapter => [chapter.id, chapter]));
  const getChapter = (chapterId: string) => {
    const chapter = chapterById.get(chapterId);
    if (!chapter) throw new Error(`Kapitel fehlt: ${chapterId}`);
    return chapter;
  };
  const aliases = [
    { text: 'Deckungsbeitrag', termId: 'deckungsbeitrag' },
    { text: 'variable Kosten', termId: 'variable-kosten' },
    { text: 'Fixkosten', termId: 'fixkosten' },
    { text: 'Preisuntergrenze', termId: 'marketing-t-preisuntergrenze' },
    { text: 'Opportunitätskosten', termId: 'rw-opportunitaetskosten' },
    { text: 'Target Costing', termId: 'marketing-t-target-costing' },
    { text: 'Zielkostenrechnung', termId: 'marketing-t-target-costing' },
    { text: 'SWOT', termId: 'marketing-begriff-swot' },
    { text: 'SWOT-Analyse', termId: 'marketing-begriff-swot' },
    { text: 'Benchmarking', termId: 'marketing-vertriebs-benchmarking' },
    { text: 'BCG-Matrix', termId: 'marketing-begriff-bcg' },
    { text: 'Relativer Marktanteil', termId: 'marketing-begriff-relativer-marktanteil' },
    { text: 'Marktwachstum', termId: 'marketing-begriff-marktwachstum' },
    { text: 'Balanced Scorecard', termId: 'marketing-vertriebs-bsc' },
    { text: 'BSC', termId: 'marketing-vertriebs-bsc' },
    { text: 'Budget', termId: 'rw-budget' },
    { text: 'Kapitalumschlag', termId: 'rw-kapitalumschlag' },
    { text: 'Forecast', termId: 'logistik-forecast' },
  ];
  const glossary: GlossaryTerm[] = entries.flatMap(entry =>
    (entry.terms ?? []).map(([term, definition, alternatives = []], index) => {
      const id = `${entry.id}-begriff-${index + 1}`;
      for (const text of [term, ...alternatives]) aliases.push({ text, termId: id });
      return { id, term, definition, articleId: entry.id, subjectId: getChapter(entry.chapter).subjectId };
    }),
  );
  const section = (id: string, title: string, paragraphs: string[]): ArticleSection =>
    ({ id, title, paragraphs: paragraphs.map(text => [{ text }]) });
  const articles: Article[] = entries.map(entry => {
    const chapter = getChapter(entry.chapter);
    const sections = [
      section('prinzip', 'Prinzip und Voraussetzungen', entry.principle),
      { ...section('anwendung', 'Anwendung am Beispiel', entry.example), ...entry.diagram },
      section('auswertung', 'Auswertung und Grenzen', entry.interpretation),
      {
        ...section('selbstkontrolle', 'Selbstkontrolle', [entry.check[0]]),
        hint: { label: 'SELBSTKONTROLLE', title: 'Musterantwort', content: entry.check[1] },
      },
      transferSection(...entry.transfer),
    ];
    if (entry.related?.length) {
      sections.push({
        id: 'weiterlernen',
        title: 'Weiterlernen',
        paragraphs: entry.related.map(([articleId, text]) => [{ text, articleId }]),
      });
    }
    return {
      id: entry.id, chapterId: chapter.id, title: entry.title, intro: entry.intro,
      number: chapter.number, subjectId: chapter.subjectId, version: 1,
      updatedAt: Date.UTC(2026, 10, 18), sections: linkGlossary(sections, aliases),
    };
  });
  return { articles, glossary };
}
