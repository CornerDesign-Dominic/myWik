import type { Catalogue } from '../src/services/catalogueModel';
import { packDocument, type PackPart, type PackPointer } from '../src/services/contentPacks';

const partLimit = 320_000;
const emptyPart = (): PackPart => ({ chapters: [], articles: [], glossary: [] });

export function prepareFachpaket(catalogue: Catalogue, subjectId: string, version: number) {
  if (!catalogue.subjects.some(s => s.id === subjectId) || !Number.isSafeInteger(version) || version < catalogue.version) {
    throw new Error('Fach oder Versionsnummer ungültig.');
  }
  const pointer: PackPointer = { subjectId, version, parts: 0, articleParts: Object.create(null) };
  const documents: Record<string, { payload: string }> = {};
  let part = emptyPart();
  const overhead = Buffer.byteLength(JSON.stringify(part));
  let bytes = overhead;
  function flush() {
    if (pointer.parts >= 100) throw new Error('Zu viele Teile für ein Fachpaket.');
    documents[packDocument(pointer, pointer.parts++)] = { payload: JSON.stringify(part) };
    part = emptyPart();
    bytes = overhead;
  }
  function append<K extends keyof PackPart>(kind: K, values: PackPart[K]) {
    for (const item of values) {
      if (item.subjectId !== subjectId) continue;
      const size = Buffer.byteLength(JSON.stringify(item)) + 1;
      if (size + overhead > partLimit) throw new Error(`Inhalt zu groß für ein Paket: ${item.id}`);
      if (size + bytes > partLimit) flush();
      (part[kind] as (typeof item)[]).push(item);
      if (kind === 'articles') pointer.articleParts[item.id] = pointer.parts;
      bytes += size;
    }
  }
  append('chapters', catalogue.chapters);
  append('glossary', catalogue.glossary);
  append('articles', catalogue.articles);
  flush();
  return { pointer, documents };
}
