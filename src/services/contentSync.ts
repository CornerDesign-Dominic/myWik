import { doc, getDocFromServer } from 'firebase/firestore';
import { useSyncExternalStore } from 'react';
import bundled from '../data/generated/index.json';
import { db } from './firebase';
import { loadBundledArticle } from './bundledArticle';
import { createOfflineCatalogue } from './offlineCatalogue';
import { catalogueStorage } from './catalogueStorage';

export const content = createOfflineCatalogue(bundled, catalogueStorage, loadBundledArticle);
export const useContentIndex = () => useSyncExternalStore(content.subscribe, content.getIndex);
export const loadContentCache = content.loadCache;
export const refreshContent = () => content.refresh(async id => {
  const snapshot = await getDocFromServer(doc(db, 'catalog', id));
  return snapshot.data();
});
