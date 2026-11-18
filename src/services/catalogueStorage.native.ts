import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';
import { legacyContentKey } from './offlineCatalogue';

let opening: Promise<SQLiteDatabase> | undefined;
function database() {
  opening ??= openDatabaseAsync('mywik-downloaded-content-v2.db').then(async db => {
    await db.execAsync('CREATE TABLE IF NOT EXISTS catalogue (key TEXT PRIMARY KEY, value TEXT NOT NULL) WITHOUT ROWID');
    return db;
  }).catch(error => { opening = undefined; throw error; });
  return opening;
}

export const catalogueStorage = {
  async getItem(key: string) {
    if (key === legacyContentKey) return AsyncStorage.getItem(key);
    const db = await database();
    const row = await db.getFirstAsync<{ value: string }>('SELECT value FROM catalogue WHERE key = ?', key);
    return row?.value ?? null;
  },
  async setItem(key: string, value: string) {
    const db = await database();
    await db.runAsync('INSERT OR REPLACE INTO catalogue VALUES (?, ?)', key, value);
  },
  async multiSet(entries: [string, string][]) {
    const db = await database();
    await db.withExclusiveTransactionAsync(async transaction => {
      const statement = await transaction.prepareAsync('INSERT OR REPLACE INTO catalogue VALUES (?, ?)');
      try {
        for (const [key, value] of entries) await statement.executeAsync(key, value);
      } finally { await statement.finalizeAsync(); }
    });
  },
  async multiRemove(keys: string[]) {
    const db = await database();
    await db.withExclusiveTransactionAsync(async transaction => {
      const statement = await transaction.prepareAsync('DELETE FROM catalogue WHERE key = ?');
      try {
        for (const key of keys) await statement.executeAsync(key);
      } finally { await statement.finalizeAsync(); }
    });
  },
};
