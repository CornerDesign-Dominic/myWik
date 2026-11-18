import type { DatabaseSync } from 'node:sqlite';
import type { Article } from '../src/types';

export function writeArticleDatabase(db: DatabaseSync, articles: readonly Article[]) {
  db.exec('CREATE TABLE articles (id TEXT PRIMARY KEY, body TEXT NOT NULL) WITHOUT ROWID; BEGIN');
  const insert = db.prepare('INSERT INTO articles VALUES (?, ?)');
  for (const article of articles) insert.run(article.id, JSON.stringify(article));
  db.exec('COMMIT');
}
