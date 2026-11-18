import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'node:path';
import { articles, chapters, contentVersion, glossary, subjects } from '../src/data/content';
import { isCatalogue } from '../src/services/catalogueModel';
import { articleSummary } from '../src/services/contentIndex';
import { writeArticleDatabase } from './article-database';

const indexDir = resolve('src/data/generated');
const assetDir = resolve('assets/generated');
const bodies = resolve(indexDir, 'articles');
const catalogue: unknown = JSON.parse(JSON.stringify({ version: contentVersion, subjects, chapters, articles, glossary }));
if (!isCatalogue(catalogue)) throw new Error('Ungültiger Offline-Katalog');
const hash = createHash('sha256').update(JSON.stringify(catalogue)).digest('hex').slice(0, 16);
const stamp = resolve(indexDir, 'build-stamp');
const buildId = `v1-${hash}`;
const database = resolve(assetDir, 'catalogue.db');
if (existsSync(stamp) && existsSync(database) && readFileSync(stamp, 'utf8') === buildId) process.exit(0);

rmSync(stamp, { force: true });
mkdirSync(bodies, { recursive: true });
mkdirSync(assetDir, { recursive: true });
const expected = new Set(catalogue.articles.map(article => `${article.id}.json`));
for (const file of readdirSync(bodies, { withFileTypes: true })) {
  if (file.isFile() && /^[a-zA-Z0-9_-]+\.json$/.test(file.name) && !expected.has(file.name)) rmSync(resolve(bodies, file.name));
}
rmSync(database, { force: true });
const db = new DatabaseSync(database);
writeArticleDatabase(db, catalogue.articles);
db.close();
for (const article of catalogue.articles) {
  writeFileSync(resolve(bodies, `${article.id}.json`), JSON.stringify(article));
}

writeFileSync(resolve(indexDir, 'index.json'), JSON.stringify({
  version: catalogue.version, hash, subjects: catalogue.subjects, chapters: catalogue.chapters,
  articles: catalogue.articles.map(articleSummary), glossary: catalogue.glossary,
}));
// Web has the same offline content. Lazy requires defer evaluation until a single article opens.
writeFileSync(resolve(indexDir, 'articleLoaders.ts'), `import type { Article } from '../../types';\nexport const loaders: Record<string, () => Article> = {\n${catalogue.articles.map(a => `  ${JSON.stringify(a.id)}: () => require('./articles/${a.id}.json'),`).join('\n')}\n};\n`);
writeFileSync(stamp, buildId);
console.log(`Offline catalogue: ${articles.length} articles, ${glossary.length} terms`);
