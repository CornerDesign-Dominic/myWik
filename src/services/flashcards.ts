import type { Flashcard } from '../types';

export type CardDraft = Pick<Flashcard, 'front' | 'back' | 'subjectId'> & Partial<Pick<Flashcard, 'id' | 'articleId' | 'sectionId' | 'articleVersion'>>;
export function cardCounts(card: Flashcard) {
  // Older cards have no outcome history. Never invent a split of old reviews.
  return { known: card.knownCount ?? 0, unknown: card.unknownCount ?? 0, legacy: Math.max(0, card.reviews - (card.knownCount ?? 0) - (card.unknownCount ?? 0)) };
}
export function reviewedCard(card: Flashcard, known: boolean, now = Date.now()): Flashcard {
  const counts = cardCounts(card);
  const streak = known ? (card.successStreak ?? 0) + 1 : 0;
  const intervals = [1, 3, 7, 14, 30, 60, 90];
  return { ...card, reviews: card.reviews + 1, knownCount: counts.known + Number(known), unknownCount: counts.unknown + Number(!known), successStreak: streak,
    nextReviewAt: now + (known ? intervals[Math.min(streak - 1, intervals.length - 1)] * 86400000 : 600000), updatedAt: now };
}
export const normalizeCardText = (text: string) => text.normalize('NFKC').toLocaleLowerCase('de-DE').replace(/[\p{P}\p{S}]/gu, ' ').replace(/\s+/g, ' ').trim();
export function similarCards(draft: CardDraft, cards: Flashcard[]): Flashcard[] {
  const question = normalizeCardText(draft.front), answer = normalizeCardText(draft.back);
  const tokens = (s: string) => new Set(s.split(' ').filter(w => w.length > 3));
  const a = tokens(question);
  return cards.filter(card => {
    if (card.deleted || card.id === draft.id) return false;
    const q = normalizeCardText(card.front), b = tokens(q);
    const overlap = [...a].filter(w => b.has(w)).length / Math.max(1, new Set([...a, ...b]).size);
    return !!question && (q === question || (!!answer && normalizeCardText(card.back) === answer) || (a.size >= 3 && overlap >= 0.75));
  });
}
export function sectionSource(section: { title: string; paragraphs: {text: string}[][]; tabs?: {title: string; content: string}[]; hint?: {title: string; content: string} }) {
  return [section.title, ...section.paragraphs.map(p => p.map(t => t.text).join('')), ...(section.tabs ?? []).map(t => `${t.title}: ${t.content}`), ...(section.hint ? [`${section.hint.title}: ${section.hint.content}`] : [])].join('\n\n');
}
