import { useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useStore } from '../state/Store';
import { eligibleLearningMs } from './learningClock';
export { eligibleLearningMs } from './learningClock';

export function useLearningTimer(subjectId: string | undefined, kind: 'article' | 'cards', articleId?: string, enabled = true) {
  const store = useStore();
  const recordRef = useRef(store.addLearningTime);
  recordRef.current = store.addLearningTime;
  const ownerRef = useRef(store.user?.uid ?? 'guest');
  ownerRef.current = store.user?.uid ?? 'guest';
  const readyRef = useRef(store.ready);
  readyRef.current = store.ready;
  const interactionRef = useRef(Date.now());
  const tickRef = useRef(Date.now());
  const remainderRef = useRef(0);
  const foregroundRef = useRef((AppState.currentState === 'active' || AppState.currentState === null) && (typeof document === 'undefined' || !document.hidden));
  const touch = useCallback(() => { interactionRef.current = Date.now(); }, []);

  useEffect(() => {
    if (!subjectId || !enabled || !store.ready) return;
    interactionRef.current = Date.now();
    tickRef.current = Date.now();
    remainderRef.current = 0;
    foregroundRef.current = (AppState.currentState === 'active' || AppState.currentState === null) && (typeof document === 'undefined' || !document.hidden);
    const owner = ownerRef.current;
    const flush = () => {
      const now = Date.now();
      if (ownerRef.current !== owner || !readyRef.current) { tickRef.current = now; remainderRef.current = 0; return; }
      const elapsed = foregroundRef.current ? eligibleLearningMs(tickRef.current, now, interactionRef.current) : 0;
      tickRef.current = now;
      remainderRef.current += elapsed;
      const seconds = Math.floor(remainderRef.current / 1000);
      if (seconds > 0) {
        recordRef.current(subjectId, kind, seconds, articleId);
        remainderRef.current -= seconds * 1000;
      }
    };
    const interval = setInterval(flush, 15_000);
    const listener = AppState.addEventListener('change', state => {
      flush();
      foregroundRef.current = state === 'active';
      tickRef.current = Date.now();
      if (state === 'active') touch();
    });
    const onVisibility = () => {
      flush();
      foregroundRef.current = !document.hidden;
      tickRef.current = Date.now();
      if (!document.hidden) touch();
    };
    if (typeof document !== 'undefined') document.addEventListener('visibilitychange', onVisibility);
    return () => { clearInterval(interval); listener.remove(); if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', onVisibility); flush(); };
  }, [subjectId, kind, articleId, enabled, store.ready, store.user?.uid, touch]);
  return { touch };
}
