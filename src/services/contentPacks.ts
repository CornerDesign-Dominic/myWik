import type { Article, Chapter, GlossaryTerm } from '../types';
import type { ContentIndex } from './contentIndex';

export interface PackPointer {
  subjectId: string;
  version: number;
  parts: number;
  articleParts: Record<string, number>;
}
export interface PackPart {
  chapters: Chapter[];
  articles: Article[];
  glossary: GlossaryTerm[];
}
export const packDocument = ({ subjectId, version }: PackPointer, part: number) => `pack-${subjectId}-${version}-${part}`;
export const contentManifestDocument = 'manifest-v1';

const identifier = (value: unknown): value is string => typeof value === 'string' && /^[a-zA-Z0-9_-]{1,250}$/.test(value) && !['__proto__', 'prototype', 'constructor'].includes(value);
const revision = (value: unknown): value is number => typeof value === 'number' && Number.isSafeInteger(value) && value > 0;

export function parseManifest(value: unknown, subjects: ContentIndex['subjects']): PackPointer[] {
  const { schema, packs } = (value ?? {}) as { schema?: unknown; packs?: unknown };
  const allowed = new Set(subjects.map(s => s.id));
  if (schema !== 1 || !Array.isArray(packs) || packs.length > allowed.size) throw new Error('Ungültiges Inhaltsverzeichnis.');
  const seen = new Set<string>();
  const articleIds = new Set<string>();
  for (const pack of packs) {
    if (!pack || !identifier(pack.subjectId) || seen.has(pack.subjectId) || !allowed.has(pack.subjectId)
      || !revision(pack.version) || !revision(pack.parts) || pack.parts > 100
      || !pack.articleParts || typeof pack.articleParts !== 'object' || Array.isArray(pack.articleParts)) throw new Error('Ungültiger Fachstand.');
    seen.add(pack.subjectId);
    for (const [id, part] of Object.entries(pack.articleParts)) {
      if (!identifier(id) || articleIds.has(id) || typeof part !== 'number' || !Number.isInteger(part) || part < 0 || part >= pack.parts) {
        throw new Error('Ungültige Artikelzuordnung.');
      }
      articleIds.add(id);
    }
  }
  return packs as PackPointer[];
}

export function parsePackPart(value: unknown, pointer: PackPointer, part: number): PackPart {
  const { payload } = (value ?? {}) as { payload?: unknown };
  if (typeof payload !== 'string' || payload.length > 450_000) throw new Error('Fehlender oder ungültiger Paketinhalt.');
  const result = JSON.parse(payload) as PackPart;
  if (!result || !Array.isArray(result.chapters) || !Array.isArray(result.articles) || !Array.isArray(result.glossary)
    || ![...result.articles, ...result.chapters, ...result.glossary].every(item => item?.subjectId === pointer.subjectId)) {
    throw new Error('Das Fachpaket enthält ungültige Einträge.');
  }
  const expected = Object.entries(pointer.articleParts).filter(([, position]) => position === part).map(([id]) => id);
  const actual = new Set(result.articles.map(a => a.id));
  if (actual.size !== result.articles.length || actual.size !== expected.length || !expected.every(id => actual.has(id))) {
    throw new Error('Das Fachpaket enthält nicht alle angekündigten Artikel.');
  }
  return result;
}
