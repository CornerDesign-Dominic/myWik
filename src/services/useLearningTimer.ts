import {useCallback,useEffect,useRef} from 'react';
import {AppState,Platform} from 'react-native';
import {useStore} from '../state/Store';
import {registerLearningFlush} from './learningLifecycle';
import {createLearningClock} from './learningClock';
export {eligibleLearningMs} from './learningClock';

export function useLearningTimer(subjectId:string|undefined,kind:'article'|'cards',articleId?:string,enabled=true){
 const store=useStore();
 const clockRef=useRef<ReturnType<typeof createLearningClock>|null>(null);
 const touch=useCallback(()=>clockRef.current?.touch(),[]);
 useEffect(()=>{
  if(!subjectId||!enabled||!store.ready)return;
  // Capture this owner's guarded writer. Cleanup can never record time in a later account.
  const record=store.addLearningTime;
  const clock=createLearningClock(()=>({mono:performance.now(),wall:Date.now()}),value=>record(subjectId,kind,value.seconds,articleId,value.startedAt));
  clockRef.current=clock;
  let appActive=AppState.currentState==='active'||AppState.currentState===null;
  let focused=true;
  const activate=()=>clock.setActive(appActive&&focused&&(typeof document==='undefined'||!document.hidden));
  activate();
  const unregister=registerLearningFlush(clock.checkpoint);
  const interval=setInterval(clock.flush,15000);
  const app=AppState.addEventListener('change',state=>{appActive=state==='active';activate()});
  const blur=Platform.OS==='android'?AppState.addEventListener('blur',()=>{focused=false;activate()}):undefined;
  const focus=Platform.OS==='android'?AppState.addEventListener('focus',()=>{focused=true;activate()}):undefined;
  const browserBlur=()=>{focused=false;activate()},browserFocus=()=>{focused=true;activate()};
  if(Platform.OS==='web'){window.addEventListener('blur',browserBlur);window.addEventListener('focus',browserFocus)}
  if(typeof document!=='undefined')document.addEventListener('visibilitychange',activate);
  return()=>{unregister();if(Platform.OS==='web'){window.removeEventListener('blur',browserBlur);window.removeEventListener('focus',browserFocus)}clearInterval(interval);app.remove();blur?.remove();focus?.remove();if(typeof document!=='undefined')document.removeEventListener('visibilitychange',activate);clock.stop();if(clockRef.current===clock)clockRef.current=null};
 },[subjectId,kind,articleId,enabled,store.ready,store.user?.uid]);
 return {touch};
}
