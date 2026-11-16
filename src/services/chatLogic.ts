import type { ArticleChat, ChatMessage } from '../types';

export const CHAT_TTL_MS = 72 * 60 * 60 * 1000;
export const RECENT_CONTEXT_MESSAGES = 16;
export const RETAIN_AFTER_COMPACTION = 12;

export function createArticleChat(articleId: string, now = Date.now()): ArticleChat {
  return { articleId, messages: [], summary: '', updatedAt: now, expiresAt: now + CHAT_TTL_MS };
}
export function isChatExpired(chat: ArticleChat, now = Date.now()): boolean {
  return !Number.isFinite(chat.expiresAt) || now >= chat.expiresAt;
}
export function isArticleChat(value: unknown, articleId: string): value is ArticleChat {
  if (!value || typeof value !== 'object') return false;
  const c = value as ArticleChat;
  return c.articleId === articleId && typeof c.summary === 'string' && c.summary.length <= 6000
    && typeof c.updatedAt === 'number' && typeof c.expiresAt === 'number'
    && Array.isArray(c.messages) && c.messages.length <= 1000
    && c.messages.every(m => typeof m.id === 'string' && ['user', 'assistant'].includes(m.role) && typeof m.content === 'string' && m.content.length <= 12000 && typeof m.createdAt === 'number');
}
export function appendChatTurn(chat: ArticleChat, userMessage: string, reply: string, compactedSummary?: string, now = Date.now()): ArticleChat {
  const current = isChatExpired(chat, now) ? createArticleChat(chat.articleId, now) : chat;
  const messages = compactedSummary === undefined ? current.messages : current.messages.slice(-RETAIN_AFTER_COMPACTION);
  const id = `${now}-${Math.random().toString(36).slice(2, 9)}`;
  const turns: ChatMessage[] = [
    { id: `${id}-u`, role: 'user', content: userMessage, createdAt: now },
    { id: `${id}-a`, role: 'assistant', content: reply, createdAt: now },
  ];
  return { articleId: chat.articleId, messages: [...messages, ...turns], summary: compactedSummary ?? current.summary, updatedAt: now, expiresAt: now + CHAT_TTL_MS };
}
