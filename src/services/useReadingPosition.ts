import {useEffect,useRef,useState} from 'react';
import {AppState,Platform,type ScrollView} from 'react-native';
import type React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {captureReadingPosition,createReadingStorage,readingTarget,type ReadingPosition} from './readingPosition';
const storage=createReadingStorage(AsyncStorage);
export function useReadingPosition({owner,articleId,version,sectionIds,scroll,positions,renderThrough,onActivity,onError}:{owner:string;articleId:string;version:number;sectionIds:string[];scroll:React.RefObject<React.ElementRef<typeof ScrollView>|null>;positions:React.RefObject<Record<string,number>>;renderThrough:(count:number)=>void;onActivity?:()=>void;onError:(message:string)=>void}) {
 const key=`mywik:reading:${owner}:${articleId}`;
 const offset=useRef(0),height=useRef(0),viewport=useRef(0);
 const pending=useRef(true),hydrated=useRef(false),acted=useRef(false),mounted=useRef(false),dragging=useRef(false);
 const wanted=useRef<ReadingPosition|null>(null);const timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 const jump=useRef<string|null>(null);
 const frame=useRef<number|null>(null);
 const [visible,setVisible]=useState(false);
 const reveal=()=>requestAnimationFrame(()=>{if(mounted.current)setVisible(true)});
 const attempt=()=>{
  if(!mounted.current||!height.current||!viewport.current)return;
  if(jump.current && positions.current[jump.current]!==undefined){
   const y=positions.current[jump.current];jump.current=null;offset.current=y;scroll.current?.scrollTo({y,animated:true});
  }
  const target=wanted.current;
  if(!pending.current||!target)return;
  const anchor=target.anchorId && sectionIds.includes(target.anchorId) ? target.anchorId : undefined;
  if(anchor ? positions.current[anchor]===undefined : sectionIds.some(id=>positions.current[id]===undefined))return;
  const maximum=Math.max(0,height.current-viewport.current);
  const desired=anchor ? positions.current[anchor]+(target.anchorOffset??0) : target.y;
  if(desired>maximum&&sectionIds.some(id=>positions.current[id]===undefined)){
   renderThrough(sectionIds.length);return;
  }
  const y=readingTarget(target,positions.current,maximum);
  pending.current=false;offset.current=y;scroll.current?.scrollTo({y,animated:false});reveal();
 };
 const scheduleLayout=()=>{
  if ((!pending.current&&!jump.current)||frame.current!==null) return;
  frame.current=requestAnimationFrame(()=>{frame.current=null;attempt()});
 };
 const save=()=>{
  if(!hydrated.current||pending.current)return;
  const currentPositions=Object.fromEntries(sectionIds.filter(id=>positions.current[id]!==undefined).map(id=>[id,positions.current[id]]));
  void storage.save(key,captureReadingPosition(offset.current,currentPositions,version)).catch(()=>{if(mounted.current)onError('Die Leseposition konnte nicht gespeichert werden. Deine Notizen bleiben davon unberührt.');});
 };
 const interact=()=>{acted.current=true;pending.current=false;onActivity?.()};
 useEffect(()=>{
  let active=true;
  mounted.current=true;pending.current=true;hydrated.current=false;acted.current=false;wanted.current=null;setVisible(false);
  void storage.load(key).then(value=>{
   if(!active)return;
   hydrated.current=true;
   if(acted.current||!value||(!value.anchorId&&value.y===0)){pending.current=false;setVisible(true);return}
   wanted.current=value;
   const at=value.anchorId?sectionIds.indexOf(value.anchorId):-1;
   renderThrough(at<0?sectionIds.length:at+3);
   scheduleLayout();
  }).catch(()=>{if(active){pending.current=false;setVisible(true);onError('Die gespeicherte Leseposition konnte nicht geladen werden.')}});
  const app=AppState.addEventListener('change',state=>{if(state!=='active')save()});
  const visibility=()=>{if(document.hidden)save()};
 const node=Platform.OS==='web'?scroll.current?.getScrollableNode() as unknown as HTMLElement|undefined:undefined;
  node?.addEventListener?.('wheel',interact,{passive:true});
  if(typeof document!=='undefined')document.addEventListener('visibilitychange',visibility);
  return()=>{active=false;save();mounted.current=false;clearTimeout(timer.current);if(frame.current!==null){cancelAnimationFrame(frame.current);frame.current=null;}app.remove();node?.removeEventListener?.('wheel',interact);if(typeof document!=='undefined')document.removeEventListener('visibilitychange',visibility)};
 },[key,version]);
 return {
  visible,
  onLayout:(h:number)=>{viewport.current=h;scheduleLayout()},
  onContentSizeChange:(h:number)=>{height.current=h;scheduleLayout()},
  onSectionLayout:(id:string,y:number)=>{positions.current[id]=y;scheduleLayout()},
  onScroll:(y:number)=>{offset.current=Math.max(0,y);if(dragging.current)onActivity?.();if(hydrated.current&&!pending.current){clearTimeout(timer.current);timer.current=setTimeout(save,250)}},
  onTouchStart:interact,
  onScrollBeginDrag:()=>{dragging.current=true;interact()},
  onScrollEndDrag:()=>{dragging.current=false;save()},
  jumpTo:(id:string)=>{interact();jump.current=id;renderThrough(sectionIds.indexOf(id)+3);scheduleLayout()},
 };
}
