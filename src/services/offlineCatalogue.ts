import type { Article } from '../types';
import { articleLinksExist, isArticleBody, isCatalogue, isCatalogueIndex } from './catalogueModel';
import { articleSummary, type ArticleSummary, type ContentIndex } from './contentIndex';
import { contentManifestDocument, packDocument, parseManifest, parsePackPart, type PackPart } from './contentPacks';

export const legacyContentKey = '@mywik/catalogue/v1';
export const contentIndexKey = '@mywik/catalogue/index/v2';
const articleKey = (source: string, id: string) => `@mywik/catalogue/article/v2/${source}/${id}`;
const sourceVersion = (source: string) => Number(source.slice(source.lastIndexOf('/') + 1));

interface ContentCache {
  schema: 2;
  legacyVersion: number;
  legacyServerChecked?: boolean;
  packVersions: Record<string, number>;
  index: ContentIndex;
  sources: Record<string, string>;
}
interface Storage {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<unknown>;
  multiSet: (entries: [string, string][]) => Promise<unknown>;
  multiRemove?: (keys: string[]) => Promise<unknown>;
}
type RemoteRead = (document: string) => Promise<unknown>;

function mergeById<T extends { id: string }>(base: T[], incoming: T[]) {
  return [...new Map([...base, ...incoming].map(item => [item.id, item])).values()];
}

function mergeIndex(base: ContentIndex, incoming: Partial<ContentIndex>): ContentIndex {
  return {
    version: Math.max(base.version, incoming.version ?? 0),
    subjects: mergeById(base.subjects, incoming.subjects ?? []),
    chapters: mergeById(base.chapters, incoming.chapters ?? []),
    articles: mergeById(base.articles, incoming.articles ?? []),
    glossary: mergeById(base.glossary, incoming.glossary ?? []),
  };
}

export function createOfflineCatalogue(bundled: ContentIndex, storage: Storage, readBundled: (id: string) => Promise<Article | undefined>) {
  const emptyIndex: ContentIndex = { version: 0, subjects: [], chapters: [], articles: [], glossary: [] };
  let cache: ContentCache = { schema: 2, legacyVersion: 0, packVersions: {}, index: emptyIndex, sources: {} };
  let index = bundled;
  const bundledSummaries = new Map(bundled.articles.map(a => [a.id, a]));
  let summaries = bundledSummaries;
  let glossary = new Map(bundled.glossary.map(t => [t.id, t]));
  let articleCache = new Map<string, Promise<Article | undefined>>();
  const listeners = new Set<() => void>();
  let initializing: Promise<void> | undefined;
  let refreshing: Promise<boolean> | undefined;

  function apply(next: ContentCache, merged: ContentIndex) {
    cache = next;
    index = merged;
    summaries = new Map(index.articles.map(a => [a.id, a]));
    glossary = new Map(index.glossary.map(t => [t.id, t]));
    articleCache = new Map();
    for (const listener of listeners) listener();
  }

  function useCachedBody(summary: ArticleSummary, source: string) {
    const bundledVersion = bundledSummaries.get(summary.id)?.version;
    if (bundledVersion === undefined || summary.version > bundledVersion) return true;
    return summary.version === bundledVersion && sourceVersion(source) >= bundled.version;
  }

  function combined(next: ContentCache) {
    const installed = next.index;
    // A newer app bundle wins ties against older downloaded metadata. Extra offline articles stay accessible.
    const merged = installed.version < bundled.version ? mergeIndex(installed, bundled) : mergeIndex(bundled, installed);
    const cached = new Map(installed.articles.map(a => [a.id, a]));
    merged.articles = merged.articles.map(summary => {
      const candidate = cached.get(summary.id);
      const source = next.sources[summary.id];
      return candidate && source && useCachedBody(candidate, source)
        ? candidate : bundledSummaries.get(summary.id) ?? summary;
    });
    if (!isCatalogueIndex(merged)) throw new Error('Ungültiger Offline-Katalog.');
    return merged;
  }

  async function save(next: ContentCache, publications: { source: string; articles: Article[] }[]) {
    const merged = combined(next);
    const articleIds = new Set(merged.articles.map(a => a.id));
    const termIds = new Set(merged.glossary.map(t => t.id));
    const writes: [string, string][] = [];
    for (const { source, articles } of publications) {
      for (const article of articles) {
        if (!isArticleBody(article) || !articleLinksExist(article, articleIds, termIds)) throw new Error('Ein Artikel enthält ungültige Abschnitte oder Links.');
        if (next.sources[article.id] === source) writes.push([articleKey(source, article.id), JSON.stringify(article)]);
      }
    }
    // Import alongside the active data. Only the final pointer write makes the new version visible.
    for (let i = 0; i < writes.length; i += 32) await storage.multiSet(writes.slice(i, i + 32));
    await storage.setItem(contentIndexKey, JSON.stringify(next));
    const obsolete = Object.entries(cache.sources).flatMap(([id, source]) => next.sources[id] !== source ? [articleKey(source, id)] : []);
    apply(next, merged);
    if (obsolete.length) await storage.multiRemove?.(obsolete).catch(() => {});
  }

  async function importLegacy(value: unknown, fromServer = false) {
    const next = { ...cache, legacyServerChecked: fromServer || cache.legacyServerChecked };
    if (!isCatalogue(value) || !Number.isSafeInteger(value.version) || value.version <= cache.legacyVersion) {
      if (fromServer) {
        await storage.setItem(contentIndexKey, JSON.stringify(next));
        cache = next;
      }
      return false;
    }
    const source = `legacy/${value.version}`;
    const articles = value.articles.filter(article => !cache.sources[article.id] || (
      cache.sources[article.id].startsWith('legacy/') && article.version >= (summaries.get(article.id)?.version ?? 0)
    ));
    const incoming = { ...value, articles: articles.map(articleSummary) };
    const index = mergeIndex(incoming, cache.index);
    const updatedLegacy = articles.map(articleSummary);
    index.articles = mergeById(index.articles, updatedLegacy);
    const sources = { ...cache.sources, ...Object.fromEntries(articles.map(a => [a.id, source])) };
    await save({ ...next, index, sources, legacyVersion: value.version }, [{ source, articles }]);
    return true;
  }

  async function initialize() {
    const saved = await storage.getItem(contentIndexKey);
    if (saved) {
      try {
        const next = JSON.parse(saved) as ContentCache;
        if (next.schema === 2 && next.index && next.sources && next.packVersions && Number.isSafeInteger(next.legacyVersion)) apply(next, combined(next));
      } catch { /* Keep the bundled catalogue accessible if downloaded metadata is damaged. */ }
    }
    if (cache.legacyVersion) return;
    const legacy = await storage.getItem(legacyContentKey);
    if (!legacy) return;
    let value: unknown;
    try { value = JSON.parse(legacy); } catch { return; }
    await importLegacy(value);
  }

  function loadCache() {
    initializing ??= initialize().catch(error => { initializing = undefined; throw error; });
    return initializing;
  }

  async function download(read: RemoteRead) {
    await loadCache();
    const manifest = await read(contentManifestDocument);
    if (manifest === undefined) return cache.legacyServerChecked ? false : importLegacy(await read('current'), true);
    const changed = parseManifest(manifest, index.subjects).filter(p => p.version >= bundled.version && p.version > (cache.packVersions[p.subjectId] ?? 0));
    if (!changed.length) return false;
    const next: ContentCache = { ...cache, sources: { ...cache.sources }, packVersions: { ...cache.packVersions } };
    const publications: { source: string; articles: Article[] }[] = [];
    for (const pointer of changed) {
      const pack: PackPart = { chapters: [], articles: [], glossary: [] };
      for (let part = 0; part < pointer.parts; part++) {
        const data = parsePackPart(await read(packDocument(pointer, part)), pointer, part);
        pack.chapters.push(...data.chapters);
        pack.articles.push(...data.articles);
        pack.glossary.push(...data.glossary);
      }
      if (new Set(pack.chapters.map(c => c.id)).size !== pack.chapters.length || new Set(pack.glossary.map(t => t.id)).size !== pack.glossary.length) throw new Error('Das Fachpaket enthält doppelte Einträge.');
      const source = `${pointer.subjectId}/${pointer.version}`;
      const articles = pack.articles.filter(article => {
        const currentVersion = summaries.get(article.id)?.version ?? 0;
        const previous = cache.sources[article.id];
        return article.version > currentVersion || (article.version === currentVersion && (!previous || sourceVersion(previous) <= pointer.version));
      });
      // IDs belong to a single subject. Overlays must not replace another subject's data.
      for (const [old, incoming] of [[index.articles, pack.articles], [index.chapters, pack.chapters], [index.glossary, pack.glossary]] as const) {
        const owners = new Map(old.map(entry => [entry.id, entry.subjectId]));
        if (incoming.some(entry => owners.has(entry.id) && owners.get(entry.id) !== pointer.subjectId)) throw new Error('Ein Inhaltsbezeichner gehört zu einem anderen Fach.');
      }
      for (const article of articles) next.sources[article.id] = source;
      next.index = mergeIndex(next.index, { ...pack, articles: articles.map(articleSummary), version: pointer.version });
      next.packVersions[pointer.subjectId] = pointer.version;
      publications.push({ source, articles });
    }
    await save(next, publications);
    return true;
  }

  function refresh(read: RemoteRead) {
    refreshing ??= download(read).finally(() => { refreshing = undefined; });
    return refreshing;
  }

  function loadArticle(id: string) {
    const previous = articleCache.get(id);
    if (previous) {
      articleCache.delete(id);
      articleCache.set(id, previous);
      return previous;
    }
    const summary = summaries.get(id);
    if (!summary) return Promise.resolve(undefined);
    const source = cache.sources[id];
    const load = async () => {
      if (source && useCachedBody(summary, source)) {
        try {
          const value: unknown = JSON.parse((await storage.getItem(articleKey(source, id))) ?? 'null');
          if (isArticleBody(value) && value.id === id && value.version === summary.version) return { ...summary, intro: value.intro, sections: value.sections };
        } catch { /* A damaged downloaded row must not hide the bundled copy. */ }
      }
      return readBundled(id);
    };
    const articles = articleCache;
    const result = load().then(article => { if (!article) articles.delete(id); return article; }, error => { articles.delete(id); throw error; });
    if (articles.size >= 12) articles.delete(articles.keys().next().value!);
    articles.set(id, result);
    return result;
  }

  return {
    getIndex: () => index,
    article: (id: string | undefined) => id === undefined ? undefined : summaries.get(id),
    term: (id: string | null) => id === null ? undefined : glossary.get(id),
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    loadCache, refresh, loadArticle,
  };
}
