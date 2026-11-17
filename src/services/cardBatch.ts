import type { Flashcard } from '../types';
import type { CardDraft } from './flashcards';
import { applyEntity, entityKey, isSyncEntity, makeEntity, materialize, newId, type LocalSnapshot } from './syncModel';

export type SaveCardDraft = CardDraft & { resetSchedule?: boolean };

/** Build one complete snapshot before committing it, never one stale React update per card. */
export function prepareCardBatch(snapshot: LocalSnapshot, drafts: SaveCardDraft[], now = Date.now()): { snapshot: LocalSnapshot; count: number } {
  if (!drafts.length) return { snapshot, count: 0 };
  if (drafts.length > 100) throw new Error('Bitte höchstens 100 Karten auf einmal übernehmen.');
  const previousCards = new Map(materialize(snapshot).cards.map(card => [card.id, card]));
  const usedIds = new Set<string>();
  const entities = drafts.map(card => {
    const id = card.id ?? newId('card');
    if (usedIds.has(id)) throw new Error('Die Auswahl enthält dieselbe Karte mehrmals. Bitte erneut auswählen.');
    usedIds.add(id);
    const previous = previousCards.get(id);
    const { resetSchedule, ...draft } = card;
    const front = draft.front.trim(), back = draft.back.trim();
    if (!front || !back || front.length > 1500 || back.length > 6000 || !draft.subjectId.trim()) throw new Error('Jede ausgewählte Karte benötigt eine Frage, eine Antwort und ein Lernfach. Bitte zu lange oder unvollständige Vorschläge bearbeiten.');
    const value: Flashcard = {
      ...previous, ...draft, id, front, back, updatedAt: now,
      nextReviewAt: resetSchedule ? now : previous?.nextReviewAt ?? now,
      reviews: previous?.reviews ?? 0, knownCount: previous?.knownCount ?? 0,
      unknownCount: previous?.unknownCount ?? 0, successStreak: resetSchedule ? 0 : previous?.successStreak ?? 0,
    };
    const at = Math.max(now, (snapshot.entries[entityKey('card', id)]?.updatedAt ?? 0) + 1);
    const entity = makeEntity('card', id, value, false, at);
    if (!isSyncEntity(entity)) throw new Error('Eine ausgewählte Karte konnte nicht gespeichert werden. Bitte ihre Angaben prüfen.');
    return entity;
  });
  return { snapshot: entities.reduce((current, entity) => applyEntity(current, entity, true), snapshot), count: entities.length };
}
