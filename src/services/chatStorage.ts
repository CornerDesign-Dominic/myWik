import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ArticleChat } from '../types';
import { createArticleChat, isArticleChat, isChatExpired } from './chatLogic';
export { appendChatTurn, createArticleChat, CHAT_TTL_MS, isChatExpired } from './chatLogic';

const PREFIX = '@mywik/chat/v1/';
function key(uid: string, articleId: string): string {
  return `${PREFIX}${encodeURIComponent(uid)}/${encodeURIComponent(articleId)}`;
}
export async function getArticleChat(uid: string, articleId: string): Promise<ArticleChat> {
  const name = key(uid, articleId), raw = await AsyncStorage.getItem(name);
  if (!raw) return createArticleChat(articleId);
  try {
    const parsed: unknown = JSON.parse(raw);
    if (isArticleChat(parsed, articleId) && !isChatExpired(parsed)) return parsed;
  } catch { /* An interrupted or old cache is safe to discard. */ }
  await AsyncStorage.removeItem(name);
  return createArticleChat(articleId);
}
export async function saveArticleChat(uid: string, chat: ArticleChat): Promise<void> {
  if (!isArticleChat(chat, chat.articleId)) throw new Error('Der Chat konnte nicht gespeichert werden.');
  if (isChatExpired(chat)) { await clearArticleChat(uid, chat.articleId); return; }
  await AsyncStorage.setItem(key(uid, chat.articleId), JSON.stringify(chat));
}
export async function clearArticleChat(uid: string, articleId: string): Promise<void> {
  await AsyncStorage.removeItem(key(uid, articleId));
}
export async function clearExpiredChats(now = Date.now()): Promise<void> {
  const names = (await AsyncStorage.getAllKeys()).filter(k => k.startsWith(PREFIX));
  if (!names.length) return;
  const values = await AsyncStorage.multiGet(names);
  const expired = values.filter(([, value]) => {
    try { const c = JSON.parse(value ?? 'null'); return !c || typeof c.expiresAt !== 'number' || now >= c.expiresAt; } catch { return true; }
  }).map(([name]) => name);
  if (expired.length) await AsyncStorage.multiRemove(expired);
}
