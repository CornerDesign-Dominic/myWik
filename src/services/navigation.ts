import type {Route} from '../types';
export interface NavigationEntry {key:number;route:Route}
export interface NavigationState {entries:NavigationEntry[];nextKey:number}
export const initialNavigation=():NavigationState=>({entries:[{key:0,route:{name:'home'}}],nextKey:1});
function identity(route:Route){return route.name==='article'?`article:${route.articleId}`:route.name==='chapters'?`chapters:${route.subjectId}`:route.name==='glossary'?`glossary:${route.termId??''}`:route.name;}
export function pushRoute(state:NavigationState,route:Route):NavigationState {
 if(identity(state.entries[state.entries.length-1].route)===identity(route))return state;
 return {entries:[...state.entries,{key:state.nextKey,route}],nextKey:state.nextKey+1};
}
export function popRoute(state:NavigationState):NavigationState{return state.entries.length>1?{...state,entries:state.entries.slice(0,-1)}:state;}
export function resetNavigation(state:NavigationState):NavigationState{return {entries:[{key:state.nextKey,route:{name:'home'}}],nextKey:state.nextKey+1};}
export interface GlossaryState {query:string;expanded:string|null;y:number}
export function searchGlossary<T extends {term:string;definition:string;example?:string}>(terms:T[],query:string):T[] {
 const fold=(text:string)=>text.normalize('NFKD').replace(/\p{M}/gu,'').toLocaleLowerCase('de-DE').replace(/ß/g,'ss');
 const words=fold(query.trim()).split(/\s+/).filter(Boolean);
 return [...terms].filter(term=>{
  const raw=`${term.term} ${term.definition} ${term.example??''}`.toLocaleLowerCase('de-DE');
  const variants=[fold(raw),fold(raw.replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue'))];
  return words.every(word=>variants.some(value=>value.includes(word)));
 }).sort((a,b)=>a.term.localeCompare(b.term,'de'));
}
