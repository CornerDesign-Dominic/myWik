import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { articles, subjects } from '../../src/data/content';
writeFileSync(resolve(__dirname, '../src/catalogue.json'), JSON.stringify(articles, null, 2) + '\n');
console.log(`Server catalogue: ${articles.length} articles`);

writeFileSync(resolve(__dirname, '../src/subjects.json'), JSON.stringify(subjects.map(s => ({id: s.id, title: s.title, subtitle: s.subtitle})), null, 2) + '\n');
