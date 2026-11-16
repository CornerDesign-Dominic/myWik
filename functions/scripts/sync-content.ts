import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { articles } from '../../src/data/content';
writeFileSync(resolve(__dirname, '../src/catalogue.json'), JSON.stringify(articles, null, 2) + '\n');
console.log(`Server catalogue: ${articles.length} articles`);
