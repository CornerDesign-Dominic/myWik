import * as basics from './recht-grundlagen';
import * as enforcement from './recht-vertrag-durchsetzung';
import * as contracts from './recht-vertragstypen';
import * as obligations from './recht-schuld-sachen-insolvenz';
import * as trade from './recht-handel-wettbewerb';
import * as powers from './recht-handelsvollmachten';
import * as employment from './recht-arbeitsrecht';

const parts = [basics, enforcement, contracts, obligations, trade, powers, employment];
const byNumber = (a: { number: string }, b: { number: string }) =>
  a.number.localeCompare(b.number, 'de', { numeric: true });

export const lawChapters = parts.flatMap(part => part.chapters).sort(byNumber);
export const lawArticles = parts.flatMap(part => part.articles).sort(byNumber);
export const lawGlossary = parts.flatMap(part => part.glossary);
