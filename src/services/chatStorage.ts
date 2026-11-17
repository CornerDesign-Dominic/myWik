import AsyncStorage from '@react-native-async-storage/async-storage';
import {createArticleChatStorage} from './articleChatStorage';
export { appendChatTurn, createArticleChat, CHAT_TTL_MS, isChatExpired } from './chatLogic';
const storage=createArticleChatStorage(AsyncStorage);
export const getArticleChat=storage.get;
export const saveArticleChat=storage.save;
export const clearArticleChat=storage.clear;
export const clearExpiredChats=storage.clearExpired;
