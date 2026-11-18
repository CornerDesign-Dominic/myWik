import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { articles, chapters, contentVersion, glossary, subjects } from '../src/data/content';
import { isCatalogue } from '../src/services/catalogueModel';
import { contentManifestDocument, parseManifest } from '../src/services/contentPacks';
import { prepareFachpaket } from './pack-publication';

const { values } = parseArgs({ options: {
  subject: { type: 'string', multiple: true }, version: { type: 'string' },
  previous: { type: 'string' }, output: { type: 'string', default: 'dist-content-packs' },
} });
if (!values.subject?.length || !values.version) throw new Error('Bitte --subject <Fach-ID> und --version <Katalogstand> angeben.');
const catalogue = JSON.parse(JSON.stringify({ version: contentVersion, subjects, chapters, articles, glossary }));
if (!isCatalogue(catalogue)) throw new Error('Ungültiger Offline-Katalog.');
const packs = new Map((values.previous ? parseManifest(JSON.parse(readFileSync(values.previous, 'utf8')), subjects) : []).map(p => [p.subjectId, p]));
const documents = new Map<string, object>();
for (const id of new Set(values.subject)) {
  const version = Number(values.version);
  if (version <= (packs.get(id)?.version ?? 0)) throw new Error(`Die Version für ${id} muss steigen.`);
  const pack = prepareFachpaket(catalogue, id, version);
  packs.set(id, pack.pointer);
  for (const [key, value] of Object.entries(pack.documents)) documents.set(key, value);
}
const manifest = { schema: 1, packs: [...packs.values()] };
parseManifest(manifest, subjects);
if (Buffer.byteLength(JSON.stringify(manifest)) > 500_000) throw new Error('Inhaltsverzeichnis zu groß.');
documents.set(contentManifestDocument, manifest);
const output = resolve(values.output);
mkdirSync(output, { recursive: true });
for (const [key, value] of documents) writeFileSync(resolve(output, `${key}.json`), JSON.stringify(value, null, 2) + '\n');
console.log(`${documents.size} Firestore-Dokumente vorbereitet in ${output}. Das Manifest wird zuletzt bereitgestellt.`);
