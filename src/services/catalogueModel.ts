import type { Article, Chapter, GlossaryTerm, Subject } from '../types';
import type { ContentIndex } from './contentIndex';
export interface Catalogue { version:number; subjects:Subject[]; chapters:Chapter[]; articles:Article[]; glossary:GlossaryTerm[] }
const object=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const str=(v:unknown)=>typeof v==='string'&&v.trim().length>0;
const id=(v:unknown)=>typeof v==='string'&&/^[a-zA-Z0-9_-]+$/.test(v)&&!['__proto__','prototype','constructor'].includes(v);
const optionalId=(v:unknown)=>v===undefined||id(v);
const number=(v:unknown)=>typeof v==='number'&&Number.isFinite(v)&&v>=0;
export function isCatalogueIndex(value: unknown): value is ContentIndex {
 if(!object(value)||!number(value.version))return false;
 const{subjects,chapters,articles,glossary}=value;
 if(!Array.isArray(subjects)||!subjects.length||subjects.length>200||!Array.isArray(chapters)||chapters.length>10000||!Array.isArray(articles)||articles.length>5000||!Array.isArray(glossary)||glossary.length>10000)return false;
 if(!subjects.every(s=>object(s)&&id(s.id)&&str(s.title)&&typeof s.subtitle==='string'&&str(s.icon)))return false;
 const subjectIds=new Set(subjects.map(s=>s.id));if(subjectIds.size!==subjects.length)return false;
 if(!chapters.every(c=>object(c)&&id(c.id)&&subjectIds.has(c.subjectId)&&str(c.title)&&typeof c.number==='string'&&/^\d+(\.\d+)*$/.test(c.number)&&optionalId(c.parentId)&&optionalId(c.articleId)))return false;
 const chapterIds=new Map(chapters.map(c=>[c.id,c]));if(chapterIds.size!==chapters.length)return false;
 for(const chapter of chapters){let cursor=chapter;const seen=new Set<string>();while(cursor.parentId){if(seen.has(cursor.id))return false;seen.add(cursor.id);const parent=chapterIds.get(cursor.parentId);if(!parent||parent.subjectId!==chapter.subjectId)return false;cursor=parent}}
 if(!articles.every(a=>object(a)&&id(a.id)&&subjectIds.has(a.subjectId)&&chapterIds.has(a.chapterId)&&str(a.title)&&str(a.number)&&number(a.updatedAt)&&number(a.version)))return false;
 const articleIds=new Map(articles.map(a=>[a.id,a]));if(articleIds.size!==articles.length)return false;
 if(!articles.every(a=>chapterIds.get(a.chapterId)?.subjectId===a.subjectId&&chapterIds.get(a.chapterId)?.articleId===a.id))return false;
 if(!chapters.every(c=>!c.articleId||(articleIds.get(c.articleId)?.chapterId===c.id)))return false;
 if(!glossary.every(t=>object(t)&&id(t.id)&&subjectIds.has(t.subjectId)&&str(t.term)&&str(t.definition)&&(t.example===undefined||typeof t.example==='string')&&(t.articleId===undefined||(id(t.articleId)&&articleIds.has(t.articleId)))))return false;
 return new Set(glossary.map(t=>t.id)).size===glossary.length;
}

const validSection=(s:unknown):boolean=>{
  if(!object(s)||!id(s.id)||!str(s.title)||!Array.isArray(s.paragraphs))return false;
  if(!s.paragraphs.every(p=>Array.isArray(p)&&p.every(t=>object(t)&&typeof t.text==='string'&&optionalId(t.termId)&&optionalId(t.articleId)&&!(t.termId&&t.articleId))))return false;
  if(s.tabs!==undefined&&(!Array.isArray(s.tabs)||!s.tabs.every(t=>object(t)&&str(t.title)&&typeof t.content==='string')))return false;
  if(s.hint!==undefined&&(!object(s.hint)||!str(s.hint.title)||typeof s.hint.content!=='string'||(s.hint.label!==undefined&&!str(s.hint.label))))return false;
  if(s.inventoryChart!==undefined){
   const chart=s.inventoryChart;
   if(!object(chart)||!str(chart.description)||!Array.isArray(chart.points)||chart.points.length<2||chart.points.length>40)return false;
   if(!chart.points.every(point=>Array.isArray(point)&&point.length===2&&point.every(number)))return false;
   const validTicks=(ticks:unknown)=>Array.isArray(ticks)&&ticks.length<=8&&ticks.every(number);
   if(!validTicks(chart.days)||!validTicks(chart.levels))return false;
  }
  if (s.abcChart !== undefined) {
   const chart = s.abcChart;
   if (!object(chart) || !str(chart.description)) return false;
   const { positions, thresholds } = chart;
   if (!Array.isArray(thresholds) || thresholds.length !== 2 || !thresholds.every(number) ||
    thresholds[0] <= 0 || thresholds[0] >= thresholds[1] || thresholds[1] >= 100 ||
    !Array.isArray(positions) || positions.length < 2 || positions.length > 6 ||
    !positions.every(p => object(p) && typeof p.label === 'string' && str(p.label) && p.label.length <= 14 && number(p.share) &&
     Number(p.share) <= 100 && ['A', 'B', 'C'].includes(String(p.category)))) return false;
   const total = positions.reduce((sum, p) => sum + p.share, 0);
   if (Math.abs(total - 100) > 0.001 ||
    positions.some((p, i) => i > 0 && positions[i - 1].share < p.share)) return false;
  }
  return true;
};

export function isArticleBody(value: unknown): value is Pick<Article, 'intro' | 'sections'> & Record<string, unknown> {
 if (!object(value) || typeof value.intro !== 'string' || !Array.isArray(value.sections)) return false;
 return value.sections.length > 0 && value.sections.length <= 200 && value.sections.every(validSection)
  && new Set(value.sections.map(s => s.id)).size === value.sections.length;
}

export function articleLinksExist(article: Article, articleIds: ReadonlySet<string>, termIds: ReadonlySet<string>) {
 return article.sections.every(s => s.paragraphs.every(p => p.every(t =>
  (!t.termId || termIds.has(t.termId)) && (!t.articleId || articleIds.has(t.articleId)))));
}

/** Remote content is data, never executable markup. Reject incomplete trees atomically. */
export function isCatalogue(value: unknown): value is Catalogue {
 if (!isCatalogueIndex(value)) return false;
 const articleIds = new Set(value.articles.map(a => a.id));
 const termIds = new Set(value.glossary.map(t => t.id));
 return value.articles.every(a => isArticleBody(a) && articleLinksExist(a, articleIds, termIds));
}
