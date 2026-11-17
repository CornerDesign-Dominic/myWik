import {useEffect,useRef} from 'react';
import {AppState,Platform,type ScrollView} from 'react-native';
import type React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {captureReadingPosition,createReadingStorage,readingTarget,type ReadingPosition} from './readingPosition';
const storage=createReadingStorage(AsyncStorage);
export function useReadingPosition({owner,articleId,version,sectionIds,scroll,positions,onActivity,onError}:{owner:string;articleId:string;version:number;sectionIds:string[];scroll:React.RefObject<React.ElementRef<typeof ScrollView>|null>;positions:React.RefObject<Record<string,number>>;onActivity?:()=>void;onError:(message:string)=>void}) {
 const key=`mywik:reading:${owner}:${articleId}`;
 const offset=useRef(0),height=useRef(0),viewport=useRef(0);
 const pending=useRef(true),hydrated=useRef(false),acted=useRef(false),mounted=useRef(false),dragging=useRef(false);
 const wanted=useRef<ReadingPosition|null>(null);const timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 const attempt=()=>{
  if(!mounted.current||!pending.current||!wanted.current||!height.current||!viewport.current||sectionIds.some(id=>positions.current[id]===undefined))return;
  const y=readingTarget(wanted.current,positions.current,Math.max(0,height.current-viewport.current));
  pending.current=false;offset.current=y;scroll.current?.scrollTo({y,animated:false});
 };
 const save=()=>{
  if(!hydrated.current||pending.current)return;
  const currentPositions=Object.fromEntries(sectionIds.filter(id=>positions.current[id]!==undefined).map(id=>[id,positions.current[id]]));
  void storage.save(key,captureReadingPosition(offset.current,currentPositions,version)).catch(()=>{if(mounted.current)onError('Die Leseposition konnte nicht gespeichert werden. Deine Notizen bleiben davon unberührt.');});
 };
 const interact=()=>{acted.current=true;pending.current=false;onActivity?.()};
 useEffect(()=>{
  let active=true;
  mounted.current=true;pending.current=true;hydrated.current=false;acted.current=false;wanted.current=null;
  void storage.load(key).then(value=>{if(!active)return;hydrated.current=true;if(acted.current||!value){pending.current=false;return}wanted.current=value;requestAnimationFrame(attempt)}).catch(()=>{if(active){pending.current=false;onError('Die gespeicherte Leseposition konnte nicht geladen werden.')}});
  const app=AppState.addEventListener('change',state=>{if(state!=='active')save()});
  const visibility=()=>{if(document.hidden)save()};
  const node=Platform.OS==='web'?scroll.current?.getScrollableNode() as unknown as HTMLElement|undefined:undefined;
  node?.addEventListener?.('wheel',interact,{passive:true});
  if(typeof document!=='undefined')document.addEventListener('visibilitychange',visibility);
  return()=>{active=false;save();mounted.current=false;clearTimeout(timer.current);app.remove();node?.removeEventListener?.('wheel',interact);if(typeof document!=='undefined')document.removeEventListener('visibilitychange',visibility)};
 },[key,version]);
 return {
  onLayout:(h:number)=>{viewport.current=h;requestAnimationFrame(attempt)},
  onContentSizeChange:(h:number)=>{height.current=h;requestAnimationFrame(attempt)},
  onSectionLayout:(id:string,y:number)=>{positions.current[id]=y;requestAnimationFrame(attempt)},
  onScroll:(y:number)=>{offset.current=Math.max(0,y);if(dragging.current)onActivity?.();if(hydrated.current&&!pending.current){clearTimeout(timer.current);timer.current=setTimeout(save,250)}},
  onTouchStart:interact,
  onScrollBeginDrag:()=>{dragging.current=true;interact()},
  onScrollEndDrag:()=>{dragging.current=false;save()},
  jumpTo:(id:string)=>{interact();requestAnimationFrame(()=>{const y=positions.current[id];if(y!==undefined){offset.current=y;scroll.current?.scrollTo({y,animated:true})}})},
 };
}
