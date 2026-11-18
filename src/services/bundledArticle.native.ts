import { Asset } from 'expo-asset';
import { Directory, File } from 'expo-file-system';
import { defaultDatabaseDirectory, openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';
import index from '../data/generated/index.json';
import type { Article } from '../types';

let opening: Promise<SQLiteDatabase> | undefined;

async function openCatalogue() {
  const directory = new Directory(defaultDatabaseDirectory);
  directory.create({ idempotent: true, intermediates: true });
  const name = `mywik-content-${index.hash}.db`;
  const destination = new File(directory, name);
  if (!destination.exists) {
    const asset = await Asset.fromModule(require('../../assets/generated/catalogue.db')).downloadAsync();
    if (!asset.localUri) throw new Error('Der Offline-Katalog konnte nicht geöffnet werden.');
    const temporary = new File(directory, `${name}.partial`);
    if (temporary.exists) temporary.delete();
    new File(asset.localUri).copy(temporary);
    temporary.move(destination);
  }
  return openDatabaseAsync(name);
}

export async function loadBundledArticle(id: string): Promise<Article | undefined> {
  opening ??= openCatalogue().catch(error => { opening = undefined; throw error; });
  const db = await opening;
  const row = await db.getFirstAsync<{ body: string }>('SELECT body FROM articles WHERE id = ?', id);
  return row ? JSON.parse(row.body) as Article : undefined;
}
