import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { AppState, Platform } from 'react-native';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { loadSnapshot, persistSnapshot, flushSnapshots } from '../services/persistence';
import { pushEntity, watchRemoteEntities, fetchRemoteEntities } from '../services/sync';
import { acknowledge, applyEntity, createRecommendations, emptySnapshot, entityKey, isSyncEntity, localDay, makeEntity, materialize, mergeRemote, newId, type EntityKind, type LocalSnapshot } from '../services/syncModel';
import { flushLearningClocks } from '../services/learningLifecycle';
import { updatedProgress, unclearCompletion } from '../services/learningProgress';
import { calendarDaysAfter, learningDay } from '../services/learningClock';
import { reviewedCard } from '../services/flashcards';
import type { StoreContract } from './contract';
import { articles } from '../data/content';
import type { ArticleProgress, Flashcard, LaterItem, Note, UserSettings } from '../types';

const StoreContext = createContext<StoreContract | null>(null);
export function useStore(): StoreContract {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore benötigt einen StoreProvider.');
  return value;
}
function readableError(error: unknown): string {
  const code = (error as {code?:string})?.code ?? '';
  if (code.includes('permission-denied')) return 'Cloud-Zugriff verweigert. Bitte Firestore-Regeln und Anmeldung prüfen. Deine Änderungen bleiben lokal erhalten.';
  if (code.includes('operation-not-allowed')) return 'Bitte in Firebase Authentication die Anmeldung mit E-Mail/Passwort aktivieren.';
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) return 'E-Mail oder Passwort stimmen nicht.';
  if (code.includes('email-already-in-use')) return 'Diese E-Mail-Adresse ist bereits registriert. Bitte anmelden.';
  if (code.includes('weak-password')) return 'Bitte ein Passwort mit mindestens sechs Zeichen verwenden.';
  if (code.includes('invalid-email')) return 'Bitte eine gültige E-Mail-Adresse eingeben.';
  if (code.includes('network-request-failed') || code.includes('unavailable')) return 'Die Cloud ist gerade nicht erreichbar. Lokale Änderungen bleiben gespeichert.';
  return error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten. Deine lokalen Daten bleiben erhalten.';
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [reloadKey,setReloadKey] = useState(0);
  const [snapshot,setSnapshot] = useState<LocalSnapshot>(emptySnapshot);
  const snapshotRef = useRef(snapshot);
  const [ready,setReady] = useState(false);
  const readyRef = useRef(false);
  const [online,setOnline] = useState(true);
  const onlineRef = useRef(true);
  const [user,setUser] = useState<StoreContract['user']>(null);
  const uidRef = useRef<string | null>(null);
  const generation = useRef(0);
  const [syncState,setSyncState] = useState<StoreContract['syncState']>('local');
  const [storageError,setStorageError] = useState<string|null>(null);
  const authBusy = useRef(false);
  const [error,setError] = useState<string | null>(null);
  const syncingGeneration = useRef<number | null>(null);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runSyncRef = useRef<() => Promise<void>>(async () => {});
  const remoteUnsubscribe = useRef<(() => void) | null>(null);

  const commit = useCallback((next: LocalSnapshot) => {
    if (!readyRef.current) return;
    snapshotRef.current = next;
    setSnapshot(next);
    const uid = uidRef.current;
    const activeGeneration = generation.current;
    const write = persistSnapshot(uid,next);
    write.then(() => {
      if (generation.current === activeGeneration && snapshotRef.current === next) setStorageError(null);
    }, () => {
      if (generation.current === activeGeneration) {setStorageError('Änderungen konnten noch nicht sicher auf diesem Gerät gespeichert werden. Bitte erneut versuchen und die App bis dahin geöffnet lassen.');setSyncState('error');}
    });
    return write;
  },[]);
  const scheduleSync = useCallback(() => {
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => { void runSyncRef.current(); },1000);
  },[]);
  const mutate = useCallback((kind: EntityKind,id: string,value: unknown,deleted = false) => {
    if (!readyRef.current) return;
    const previous = snapshotRef.current.entries[entityKey(kind,id)];
    // Monotonic local timestamps also handle two edits within the same millisecond.
    const at = Math.max(Date.now(),(previous?.updatedAt ?? 0) + 1);
    const entity = makeEntity(kind,id,value,deleted,at);
    if (!isSyncEntity(entity)) {
      setError('Die Eingabe konnte nicht gespeichert werden. Bitte Länge und Vollständigkeit der Angaben prüfen.');
      return;
    }
    commit(applyEntity(snapshotRef.current,entity,true));
    setSyncState(uidRef.current ? 'syncing' : 'local');
    scheduleSync();
  },[commit,scheduleSync]);

  const addVisit = useCallback(() => {
    if (!readyRef.current || (AppState.currentState !== 'active' && AppState.currentState !== null)
      || (typeof document !== 'undefined' && document.hidden)) return;
    const today = localDay();
    if (!snapshotRef.current.entries[entityKey('visit',today)]) mutate('visit',today,today);
  },[mutate]);

  const generateRecommendations = useCallback(() => {
    if (!readyRef.current) return;
    // Only recommend articles that are still available in the current catalogue.
    const data = materialize(snapshotRef.current);
    const subjects: Record<string,string> = Object.fromEntries(articles.map(a => [a.id,a.subjectId]));

    const entities = createRecommendations(snapshotRef.current,subjects);
    if (!entities.length) return;
    let next = snapshotRef.current;
    entities.forEach(e => { next = applyEntity(next,e,true); });
    commit(next);
  },[commit]);

  const syncNow = useCallback(async () => {
    const uid = uidRef.current, epoch = generation.current;
    if (!readyRef.current || syncingGeneration.current === epoch) return;
    syncingGeneration.current = epoch;
    const current = () => generation.current === epoch && uidRef.current === uid;
    try {
      try {await flushSnapshots(uid);} catch {
        if(current()){setStorageError('Änderungen konnten noch nicht sicher auf diesem Gerät gespeichert werden. Bitte erneut versuchen und die App geöffnet lassen.');setSyncState('error');}
        return;
      }
      if(!current())return;
      setStorageError(null);
      if(!uid || !onlineRef.current){setSyncState('local');return;}
      setSyncState('syncing');
      generateRecommendations();
      await flushSnapshots(uid);
      // Require a server response, not a cache-only listener event, before declaring success.
      const remote = await fetchRemoteEntities(uid);
      if(!current())return;
      await commit(mergeRemote(snapshotRef.current,remote));
      const pending = Object.values(snapshotRef.current.outbox);
      for (const entity of pending) {
        if (!current() || !onlineRef.current) return;
        // A listener can supersede or acknowledge this queued revision while we await I/O.
        if(snapshotRef.current.outbox[entityKey(entity.kind,entity.entityId)]?.revision !== entity.revision)continue;
        const {accepted,conflict} = await pushEntity(uid,entity,snapshotRef.current.bases?.[entityKey(entity.kind,entity.entityId)]);
        if (!current()) return;
        const acknowledged=acknowledge(snapshotRef.current,entity,accepted);
        await commit(conflict?{...acknowledged,conflicts:{...acknowledged.conflicts,[conflict.revision]:conflict}}:acknowledged);
      }
      await flushSnapshots(uid);
      if (!current()) return;
      setError(null);
      const remaining = Object.keys(snapshotRef.current.outbox).length;
      setSyncState(onlineRef.current ? remaining ? 'syncing' : 'synced' : 'local');
      if (remaining) scheduleSync();
    } catch (err) {
      if (current()) { setError(readableError(err)); setSyncState('error'); }
    } finally {
      if (syncingGeneration.current === epoch) syncingGeneration.current = null;
    }
  },[commit,generateRecommendations,scheduleSync]);
  runSyncRef.current = syncNow;

  useEffect(() => {
    let mounted = true;
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      flushLearningClocks();
      const epoch = ++generation.current;
      remoteUnsubscribe.current?.();
      remoteUnsubscribe.current = null;
      if (syncTimer.current) { clearTimeout(syncTimer.current); syncTimer.current = null; }
      readyRef.current = false;
      setReady(false);
      setError(null);setStorageError(null);
      const uid = firebaseUser?.uid ?? null;
      uidRef.current = uid;
      setUser(firebaseUser ? {uid:firebaseUser.uid,email:firebaseUser.email} : null);
      setSyncState('local');
      // Blank immediately: never show data belonging to a previous account.
      snapshotRef.current = emptySnapshot();
      setSnapshot(snapshotRef.current);
      try {
        const loaded = await loadSnapshot(uid);
        if (!mounted || epoch !== generation.current) return;
        snapshotRef.current = loaded;
        setSnapshot(loaded);
        readyRef.current = true;
        setReady(true);
        addVisit();
        generateRecommendations();
        if (uid) {
          remoteUnsubscribe.current = watchRemoteEntities(uid, entities => {
            if (!mounted || generation.current !== epoch) return;
            commit(mergeRemote(snapshotRef.current,entities));
            generateRecommendations();
            // Listener data is merged, but syncNow verifies durability and uploads before success.
            scheduleSync();
          }, err => {
            if (mounted && generation.current === epoch) { setError(readableError(err)); setSyncState('error'); }
          });
        }
        void runSyncRef.current();
      } catch (err) {
        if (mounted && epoch === generation.current) { setError(readableError(err)); setSyncState('error'); }
      }
    });
    const updateOnline = (available: boolean) => {
      onlineRef.current = available;
      setOnline(available);
      if (available) void runSyncRef.current();
      else setSyncState('local');
    };
    const netUnsubscribe = NetInfo.addEventListener(state => updateOnline(state.isConnected !== false && state.isInternetReachable !== false && (Platform.OS !== 'web' || navigator.onLine)));
    // Some browsers report connection changes separately from online/offline events.
    const browserNetwork = () => updateOnline(navigator.onLine);
    if(Platform.OS === 'web'){window.addEventListener('online',browserNetwork);window.addEventListener('offline',browserNetwork);}
    const appSubscription = AppState.addEventListener('change',state => {
      if (state === 'active') { addVisit(); generateRecommendations(); void runSyncRef.current(); }
    });
    const timer = setInterval(() => { addVisit(); generateRecommendations(); void runSyncRef.current(); },60000);
    return () => {
      mounted = false; generation.current += 1; remoteUnsubscribe.current?.(); unsubscribe(); netUnsubscribe(); if(Platform.OS==='web'){window.removeEventListener('online',browserNetwork);window.removeEventListener('offline',browserNetwork);} appSubscription.remove(); clearInterval(timer);
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  },[addVisit,generateRecommendations,commit,scheduleSync,reloadKey]);

  const authAction = async (action: () => Promise<unknown>) => {
    if(authBusy.current)throw new Error('Ein Kontowechsel läuft bereits.');
    const epoch=generation.current, uid=uidRef.current;
    authBusy.current=true;setError(null);
    flushLearningClocks();
    const wasReady=readyRef.current;readyRef.current=false;setReady(false);
    try {
      // Refuse an explicit account switch if the outgoing account cannot be saved.
      await flushSnapshots(uid);
      if(generation.current!==epoch || uidRef.current!==uid)throw new Error('Das Konto wurde inzwischen gewechselt. Bitte erneut versuchen.');
      await action();
    } catch (err) {
      const message = readableError(err);
      if(generation.current===epoch)setError(message);
      throw new Error(message);
    } finally {authBusy.current=false;if(generation.current===epoch){readyRef.current=wasReady;setReady(wasReady);if(wasReady)scheduleSync();}}
  };
  const setProgress: StoreContract['setProgress'] = (articleId,patch) => {
    const now = Date.now();
    const previous = materialize(snapshotRef.current).progress[articleId];
    const progress=updatedProgress(articleId,previous,patch,now);
    if(progress===previous)return;
    mutate('progress',articleId,progress);
    const doneAt=unclearCompletion(progress),expected=doneAt===undefined?undefined:`repeat_${articleId}_${doneAt}`;
    for(const item of materialize(snapshotRef.current).recommendations){
      if(item.articleId===articleId && item.id.startsWith(`repeat_${articleId}_`) && item.id!==expected && ['open','snoozed'].includes(item.state))mutate('recommendation',item.id,{...item,state:'dismissed',updatedAt:now});
    }
  };
  const saveNote: StoreContract['saveNote'] = note => {
    const id = note.id ?? newId('note');
    const value: Note = { ...note,id,updatedAt:Date.now() };
    mutate('note',id,value);
  };
  const saveCard: StoreContract['saveCard'] = card => {
    const id = card.id ?? newId('card');
    const previous = materialize(snapshotRef.current).cards.find(c => c.id === id);
    const {resetSchedule, ...draft} = card;
    const value: Flashcard = {...previous,...draft,id,updatedAt:Date.now(),nextReviewAt:resetSchedule ? Date.now() : previous?.nextReviewAt ?? Date.now(),reviews:previous?.reviews ?? 0,knownCount:previous?.knownCount ?? 0,unknownCount:previous?.unknownCount ?? 0,successStreak:resetSchedule ? 0 : previous?.successStreak ?? 0};
    mutate('card',id,value);
  };
  const reviewCard: StoreContract['reviewCard'] = (id,known) => {
    const card = materialize(snapshotRef.current).cards.find(c => c.id === id);
    if (!card) return;
    mutate('card',id,reviewedCard(card,known));
  };
  const addLearningTime: StoreContract['addLearningTime'] = (subjectId,kind,seconds,articleId,startedAt) => {
    if (!Number.isFinite(seconds) || seconds <= 0 || !readyRef.current) return;
    const now = Date.now();
    // Caller flushes regularly; cap one interval to prevent background time inflation.
    const duration = Math.min(300,Math.round(seconds*1000)/1000);
    if (duration <= 0) return;
    const start=Number.isFinite(startedAt)?startedAt!:now-duration*1000;
    const day=learningDay(start);
    if(!snapshotRef.current.entries[entityKey('visit',day)])mutate('visit',day,day);
    const id = newId('session');
    mutate('session',id,{id,subjectId,kind,seconds:duration,articleId,day,startedAt:start});
  };
  const saveLater: StoreContract['saveLater'] = item => {
    const id = newId('later');
    const value: LaterItem = {...item,id,status:'open',updatedAt:Date.now()};
    mutate('later',id,value);
  };
  const updateSettings = (patch: Partial<UserSettings>) => {
    const settings = materialize(snapshotRef.current).settings;
    mutate('settings','main',{...settings,...patch,reminders:{...settings.reminders,...patch.reminders}});
  };
  const data = materialize(snapshot);
  const actionEpoch=generation.current, actionUid=uidRef.current;
  const guard = <A extends unknown[]>(action:(...args:A)=>void) => (...args:A) => {
    if(readyRef.current && generation.current===actionEpoch && uidRef.current===actionUid)action(...args);
  };
  const restoreConflict=(revision:string)=>{
    const conflict=snapshotRef.current.conflicts?.[revision];
    if(!conflict || !conflict.value || typeof conflict.value!=='object')return;
    const id=newId(conflict.kind);
    const value={...(conflict.value as Record<string,unknown>),id,updatedAt:Date.now()};
    mutate(conflict.kind,id,value);
    const conflicts={...snapshotRef.current.conflicts};delete conflicts[revision];
    commit({...snapshotRef.current,conflicts});scheduleSync();
  };
  const dismissConflict=(revision:string)=>{const conflicts={...snapshotRef.current.conflicts};delete conflicts[revision];commit({...snapshotRef.current,conflicts});};
  const scopedAuth=(action:()=>Promise<void>) => generation.current===actionEpoch && uidRef.current===actionUid ? action() : Promise.reject(new Error('Das Konto wurde inzwischen gewechselt.'));
  const value: StoreContract = {
    ready,online,user,data,syncState,retryLoad:()=>setReloadKey(k=>k+1),error:storageError??error,storageError,conflicts:Object.values(snapshot.conflicts??{}),restoreConflict:guard(restoreConflict),dismissConflict:guard(dismissConflict),
    signIn:(email,password) => scopedAuth(()=>authAction(() => signInWithEmailAndPassword(auth,email.trim(),password))),
    register:(email,password) => scopedAuth(()=>authAction(() => createUserWithEmailAndPassword(auth,email.trim(),password))),
    signOut:() => scopedAuth(()=>authAction(() => firebaseSignOut(auth))),
    setProgress:guard(setProgress),saveNote:guard(saveNote),deleteNote:guard((id:string)=>mutate('note',id,null,true)),saveCard:guard(saveCard),deleteCard:guard((id:string)=>mutate('card',id,null,true)),reviewCard:guard(reviewCard),
    addLearningTime:guard(addLearningTime),saveLater:guard(saveLater),
    updateLater:guard((id:string,status:LaterItem['status']) => { const item = materialize(snapshotRef.current).later.find(i=>i.id===id); if(item) mutate('later',id,{...item,status,updatedAt:Date.now()}); }),
    updateRecommendation:guard((id:string,state:'open'|'done'|'dismissed'|'snoozed') => { const item=materialize(snapshotRef.current).recommendations.find(i=>i.id===id); if(item) mutate('recommendation',id,{...item,state,dueAt:state==='snoozed'?calendarDaysAfter(Date.now(),1):item.dueAt,updatedAt:Date.now()}); }),
    updateSettings:guard(updateSettings),syncNow,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
