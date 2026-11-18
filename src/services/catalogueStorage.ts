import AsyncStorage from '@react-native-async-storage/async-storage';
import { legacyContentKey } from './offlineCatalogue';

let opening: Promise<IDBDatabase> | undefined;
function database() {
  opening ??= new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('mywik-downloaded-content-v2', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('catalogue');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  }).catch(error => { opening = undefined; throw error; });
  return opening;
}

async function write(apply: (store: IDBObjectStore) => void) {
  const db = await database();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction('catalogue', 'readwrite');
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(transaction.error);
    apply(transaction.objectStore('catalogue'));
  });
}

export const catalogueStorage = {
  async getItem(key: string) {
    if (key === legacyContentKey) return AsyncStorage.getItem(key);
    const db = await database();
    return new Promise<string | null>((resolve, reject) => {
      const request = db.transaction('catalogue').objectStore('catalogue').get(key);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  },
  setItem(key: string, value: string) { return write(store => { store.put(value, key); }); },
  multiSet(entries: [string, string][]) { return write(store => { for (const [key, value] of entries) store.put(value, key); }); },
};
