import NetInfo from '@react-native-community/netinfo';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app, auth } from './firebase';
import type { Article, ArticleChat, LaterItem } from '../types';
import { isChatExpired, RECENT_CONTEXT_MESSAGES, RETAIN_AFTER_COMPACTION } from './chatLogic';

export interface MeiWikReply {
  reply: string;
  /** Only set when older messages have been compacted; pass to appendChatTurn. */
  summary?: string;
  later?: Pick<LaterItem, 'suspectedGap' | 'suggestion' | 'kind'> | null;
}
type RemoteRequest = { action: 'chat' | 'compact' | 'flashcard'; articleId: string; sectionId?: string; message?: string; selectedText?: string; summary?: string; messages?: Array<{ role: 'user' | 'assistant'; content: string }> };

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
