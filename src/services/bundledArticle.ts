import { loaders } from '../data/generated/articleLoaders';

export async function loadBundledArticle(id: string) {
  return Object.hasOwn(loaders, id) ? loaders[id]() : undefined;
}
