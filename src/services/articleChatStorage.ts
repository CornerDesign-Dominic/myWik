import type {ArticleChat} from '../types';
import {createArticleChat,isArticleChat,isChatExpired} from './chatLogic';
import {createKeyedQueue} from './keyedQueue';
interface ChatStorageAdapter {getItem(key:string):Promise<string|null>;setItem(key:string,value:string):Promise<unknown>;removeItem(key:string):Promise<unknown>;getAllKeys():Promise<readonly string[]>}
const PREFIX='@mywik/chat/v1/';
const key=(uid:string,article:string)=>`${PREFIX}${encodeURIComponent(uid)}/${encodeURIComponent(article)}`;
export function createArticleChatStorage(storage:ChatStorageAdapter) {
 const queue=createKeyedQueue();
 const get=(uid:string,articleId:string)=>queue(key(uid,articleId),async()=>{
  const name=key(uid,articleId),raw=await storage.getItem(name);if(!raw)return createArticleChat(articleId);
  try{const value:unknown=JSON.parse(raw);if(isArticleChat(value,articleId)&&!isChatExpired(value))return value}catch{/* Discard invalid chat cache only. */}
  await storage.removeItem(name);return createArticleChat(articleId);
 });
 const save=(uid:string,chat:ArticleChat):Promise<void>=>{
  if(!isArticleChat(chat,chat.articleId))return Promise.reject(new Error('Der Chat konnte nicht gespeichert werden.'));
  const payload=JSON.stringify(chat),name=key(uid,chat.articleId);
  return queue(name,async()=>{if(isChatExpired(chat))await storage.removeItem(name);else await storage.setItem(name,payload)});
 };
 const clear=(uid:string,articleId:string)=>queue(key(uid,articleId),async()=>{await storage.removeItem(key(uid,articleId))});
 const clearExpired=async(now=Date.now())=>{
  const names=(await storage.getAllKeys()).filter(k=>k.startsWith(PREFIX));
  await Promise.all(names.map(name=>queue(name,async()=>{
   // Read inside the queue: never delete a chat renewed during cleanup.
   const raw=await storage.getItem(name);if(!raw)return;
   let expired=true;try{const c=JSON.parse(raw);expired=!c||typeof c.expiresAt!=='number'||now>=c.expiresAt}catch{}
   if(expired)await storage.removeItem(name);
  })));
 };
 return {get,save,clear,clearExpired};
}
