import type { CardDraft } from './flashcards';
import NetInfo from '@react-native-community/netinfo';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app, auth } from './firebase';
import type { Article, ArticleChat, LaterItem, Flashcard } from '../types';
import { isChatExpired, RECENT_CONTEXT_MESSAGES, RETAIN_AFTER_COMPACTION } from './chatLogic';

export interface MeiWikReply {
  reply: string;
  /** Only set when older messages have been compacted; pass to appendChatTurn. */
  summary?: string;
  later?: Pick<LaterItem, 'suspectedGap' | 'suggestion' | 'kind'> | null;
}
type RemoteRequest = { action: 'chat' | 'compact' | 'flashcard' | 'flashcards' | 'check_card' | 'practice'; articleId: string; sectionId?: string; message?: string; selectedText?: string; generationMode?: 'new'|'improve'; subjectId?: string; card?: {id?:string;front:string;back:string}; existingCards?: Array<{id:string;front:string;back:string}>; summary?: string; messages?: Array<{ role: 'user' | 'assistant'; content: string }> };

function describeError(error: unknown): Error {
  const e = error as { code?: string; message?: string };
  if (e.code?.includes('not-found')) return new Error('MeiWik ist für diesen Artikel noch nicht verfügbar.');
  if (e.code?.includes('unauthenticated')) return new Error('Bitte melde dich an, um MeiWik zu nutzen.');
  if (e.code?.includes('permission-denied')) return new Error('MeiWik ist für dieses Konto noch nicht freigeschaltet.');
  if (e.code?.includes('resource-exhausted')) return new Error('Das MeiWik-Verbrauchslimit ist erreicht. Bitte später erneut versuchen.');
  if (e.code?.includes('invalid-argument')) return new Error(e.message ?? 'Die Frage oder der Gesprächsverlauf ist zu lang.');
  return new Error('MeiWik ist gerade nicht erreichbar. Bitte versuche es später erneut. Dein Verlauf bleibt erhalten.');
}
async function call<T>(data: RemoteRequest): Promise<T> {
  const network = await NetInfo.fetch();
  if (network.isConnected === false || network.isInternetReachable === false) throw new Error('MeiWik ist offline. Artikel, Notizen und Karteikarten kannst du weiterhin nutzen.');
  if (!auth.currentUser) throw new Error('Bitte melde dich an, um MeiWik zu nutzen.');
  try {
    const remote = httpsCallable<RemoteRequest, T>(getFunctions(app, 'europe-west1'), 'meiwik', { timeout: 85000 });
    return (await remote(data)).data;
  } catch (error) { throw describeError(error); }
}
export async function sendArticleMessage(article: Article, chat: ArticleChat, userMessage: string, sectionId?: string): Promise<MeiWikReply> {
  if (!userMessage.trim()) throw new Error('Bitte gib eine Frage ein.');
  if (userMessage.length > 4000) throw new Error('Bitte beschränke deine Frage auf 4000 Zeichen.');
  if (article.id !== chat.articleId) throw new Error('Dieser Chat gehört zu einem anderen Artikel.');
  const expired = isChatExpired(chat);
  let summary = expired ? '' : chat.summary;
  let messages = expired ? [] : chat.messages;
  let compacted = false;
  if (messages.length > RECENT_CONTEXT_MESSAGES) {
    const old = messages.slice(0, -RETAIN_AFTER_COMPACTION);
    // Chunking preserves every older turn before removing any local messages.
    for (let offset = 0; offset < old.length; offset += RECENT_CONTEXT_MESSAGES) {
      const result = await call<{ summary: string }>({ action: 'compact', articleId: article.id, summary, messages: old.slice(offset, offset + RECENT_CONTEXT_MESSAGES).map(({ role, content }) => ({ role, content })) });
      if (typeof result.summary !== 'string' || !result.summary.trim() || result.summary.length > 6000) throw new Error('Der Gesprächskontext konnte nicht gesichert werden. Bitte erneut versuchen.');
      summary = result.summary;
    }
    messages = messages.slice(-RETAIN_AFTER_COMPACTION);
    compacted = true;
  }
  const result = await call<MeiWikReply>({ action: 'chat', articleId: article.id, ...(sectionId ? { sectionId } : {}), message: userMessage, summary, messages: messages.map(({ role, content }) => ({ role, content })) });
  if (typeof result.reply !== 'string' || !result.reply.trim()) throw new Error('MeiWik hat keine Antwort geliefert. Bitte erneut versuchen.');
  return { reply: result.reply, later: result.later, ...(compacted ? { summary } : {}) };
}
export async function generateFlashcard(article: Article, selectedText = ''): Promise<{ front: string; back: string }> {
  if (selectedText.length > 8000) throw new Error('Bitte wähle einen kürzeren Abschnitt aus.');
  const result = await call<{ front: string; back: string }>({ action: 'flashcard', articleId: article.id, selectedText });
  if (typeof result.front !== 'string' || typeof result.back !== 'string') throw new Error('Die Karteikarte konnte nicht erstellt werden.');
  return result;
}


function cardRequest(draft: CardDraft) {
  return {articleId: draft.articleId ?? 'card', subjectId:draft.subjectId, ...(draft.sectionId ? {sectionId:draft.sectionId} : {}), card:{...(draft.id ? {id:draft.id} : {}),front:draft.front,back:draft.back}};
}
function candidates(cards: Flashcard[], draft: CardDraft, source = '') {
  const words = new Set(`${draft.front} ${source}`.toLowerCase().split(/\W+/).filter(w=>w.length>3));
  const score = (c: Flashcard) => `${c.front} ${c.back}`.toLowerCase().split(/\W+/).filter(w=>words.has(w)).length;
  return cards.filter(c=>!c.deleted && c.id!==draft.id).sort((a,b)=>score(b)-score(a)).slice(0,40).map(c=>({id:c.id,front:c.front.slice(0,500),back:c.back.slice(0,400)}));
}
export async function generateFlashcards(draft: CardDraft, source: string, cards: Flashcard[], generationMode: 'new'|'improve' = 'improve') {
  const result = await call<{cards:Array<{front:string;back:string}>}>({...cardRequest(draft),action:'flashcards',generationMode,selectedText:source.slice(0,8000),existingCards:candidates(cards,draft,source)});
  if (!Array.isArray(result.cards) || result.cards.length>5 || result.cards.some(c=>typeof c.front!=='string'||!c.front.trim().endsWith('?')||typeof c.back!=='string'||!c.back.trim())) throw new Error('Keine vollständigen Kartenvorschläge erhalten.');
  return result.cards;
}
export async function checkCardDuplicates(draft: CardDraft, cards: Flashcard[]) {
  const pool = candidates(cards,draft);
  const result = await call<{duplicateIds:string[];matches?:Flashcard[]}>({...cardRequest(draft),action:'check_card',existingCards:pool});
  if (!Array.isArray(result.duplicateIds) || result.duplicateIds.some(id=>typeof id!=='string')) throw new Error('Dublettenprüfung fehlgeschlagen.');
  const remote=(result.matches??[]).filter(c=>typeof c.id==='string'&&typeof c.front==='string'&&typeof c.back==='string'&&typeof c.reviews==='number'&&typeof c.nextReviewAt==='number');
  return [...new Map([...remote,...cards].filter(c=>result.duplicateIds.includes(c.id)&&c.id!==draft.id&&!c.deleted).map(c=>[c.id,c])).values()];
}
export async function practiceFlashcard(card: Flashcard, answer: string, history: Array<{role:'user'|'assistant';content:string}>) {
  if (!answer.trim() || answer.length>4000) throw new Error('Bitte antworte mit 1 bis 4000 Zeichen.');
  const result = await call<{reply:string}>({...cardRequest(card),action:'practice',message:answer,messages:history.slice(-12)});
  if (typeof result.reply!=='string' || !result.reply.trim()) throw new Error('Keine Rückmeldung erhalten.');
  return result.reply;
}
