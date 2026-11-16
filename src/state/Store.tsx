import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { AppState } from 'react-native';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { loadSnapshot, persistSnapshot } from '../services/persistence';
import { pushEntity, watchRemoteEntities } from '../services/sync';
import { acknowledge, applyEntity, createRecommendations, emptySnapshot, entityKey, isSyncEntity, localDay, makeEntity, materialize, mergeRemote, newId, type EntityKind, type LocalSnapshot } from '../services/syncModel';
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
    persistSnapshot(uid,next).catch(err => {
      if (generation.current === activeGeneration) { setError(readableError(err)); setSyncState('error'); }
    });
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
    // Article subject can also be recovered from recorded learning sessions.
    const data = materialize(snapshotRef.current);
    const subjects: Record<string,string> = Object.fromEntries(articles.map(a => [a.id,a.subjectId]));
    data.sessions.forEach(s => { if (s.articleId) subjects[s.articleId] = s.subjectId; });
    const entities = createRecommendations(snapshotRef.current,subjects);
    if (!entities.length) return;
    let next = snapshotRef.current;
    entities.forEach(e => { next = applyEntity(next,e,true); });
    commit(next);
  },[commit]);

  const syncNow = useCallback(async () => {
    const uid = uidRef.current;
    const epoch = generation.current;
    if (!uid || !readyRef.current || !onlineRef.current || syncingGeneration.current === epoch) return;
    syncingGeneration.current = epoch;
    const current = () => generation.current === epoch && uidRef.current === uid;
    setSyncState('syncing');
    try {
      generateRecommendations();
      const pending = Object.values(snapshotRef.current.outbox);
      for (const entity of pending) {
        if (!current() || !onlineRef.current) return;
        const accepted = await pushEntity(uid,entity);
        if (!current()) return;
        commit(acknowledge(snapshotRef.current,entity,accepted));
      }
      if (!current()) return;
      setError(null);
      const remaining = Object.keys(snapshotRef.current.outbox).length;
      setSyncState(remaining ? 'syncing' : 'synced');
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
      const epoch = ++generation.current;
      remoteUnsubscribe.current?.();
      remoteUnsubscribe.current = null;
      if (syncTimer.current) { clearTimeout(syncTimer.current); syncTimer.current = null; }
      readyRef.current = false;
      setReady(false);
      setError(null);
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
            if (!Object.keys(snapshotRef.current.outbox).length && onlineRef.current) setSyncState('synced');
          }, err => {
            if (mounted && generation.current === epoch) { setError(readableError(err)); setSyncState('error'); }
          });
        }
        void runSyncRef.current();
      } catch (err) {
        if (mounted && epoch === generation.current) { setError(readableError(err)); setSyncState('error'); }
      }
    });
    const netUnsubscribe = NetInfo.addEventListener(state => {
      const available = state.isConnected !== false && state.isInternetReachable !== false;
      onlineRef.current = available;
      setOnline(available);
      if (available) void runSyncRef.current();
      else setSyncState('local');
    });
    const appSubscription = AppState.addEventListener('change',state => {
      if (state === 'active') { addVisit(); generateRecommendations(); void runSyncRef.current(); }
    });
    const timer = setInterval(() => { addVisit(); generateRecommendations(); void runSyncRef.current(); },60000);
    return () => {
      mounted = false; generation.current += 1; remoteUnsubscribe.current?.(); unsubscribe(); netUnsubscribe(); appSubscription.remove(); clearInterval(timer);
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  },[addVisit,generateRecommendations,commit]);

  const authAction = async (action: () => Promise<unknown>) => {
    setError(null);
    try { await action(); }
    catch (err) { const message = readableError(err); setError(message); throw new Error(message); }
  };
  const setProgress: StoreContract['setProgress'] = (articleId,patch) => {
    const now = Date.now();
    const previous = materialize(snapshotRef.current).progress[articleId];
    const status = patch.status ?? previous?.status ?? 'open';
    const progress: ArticleProgress = {
      articleId,status,starred:patch.starred ?? previous?.starred ?? false,updatedAt:now,
      history: [...(previous?.history ?? []),...(!previous || previous.status !== status ? [{status,at:now}] : [])].slice(-200),
    };
    mutate('progress',articleId,progress);
  };
  const saveNote: StoreContract['saveNote'] = note => {
    const id = note.id ?? newId('note');
    const value: Note = { ...note,id,updatedAt:Date.now() };
    mutate('note',id,value);
  };
  const saveCard: StoreContract['saveCard'] = card => {
    const id = card.id ?? newId('card');
    const previous = materialize(snapshotRef.current).cards.find(c => c.id === id);
    const value: Flashcard = {...previous,...card,id,updatedAt:Date.now(),nextReviewAt:previous?.nextReviewAt ?? Date.now(),reviews:previous?.reviews ?? 0};
    mutate('card',id,value);
  };
  const reviewCard: StoreContract['reviewCard'] = (id,known) => {
    const card = materialize(snapshotRef.current).cards.find(c => c.id === id);
    if (!card) return;
    const days = known ? Math.min(30,Math.pow(2,Math.min(card.reviews,5))) : 0;
    mutate('card',id,{...card,reviews:card.reviews + 1,nextReviewAt:Date.now() + (known ? days * 86400000 : 10 * 60000),updatedAt:Date.now()});
  };
  const addLearningTime: StoreContract['addLearningTime'] = (subjectId,kind,seconds,articleId) => {
    if (!Number.isFinite(seconds) || seconds <= 0 || !readyRef.current) return;
    const now = Date.now();
    // Caller flushes regularly; cap one interval to prevent background time inflation.
    const duration = Math.min(300,Math.round(seconds));
    if (duration <= 0) return;
    const id = newId('session');
    mutate('session',id,{id,subjectId,kind,seconds:duration,articleId,day:localDay(now),startedAt:now-duration*1000});
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
  const value: StoreContract = {
    ready,online,user,data,syncState,error,
    signIn:(email,password) => authAction(() => signInWithEmailAndPassword(auth,email.trim(),password)),
    register:(email,password) => authAction(() => createUserWithEmailAndPassword(auth,email.trim(),password)),
    signOut:() => authAction(() => firebaseSignOut(auth)),
    setProgress,saveNote,deleteNote:id => mutate('note',id,null,true),saveCard,deleteCard:id => mutate('card',id,null,true),reviewCard,
    addLearningTime,saveLater,
    updateLater:(id,status) => { const item = materialize(snapshotRef.current).later.find(i=>i.id===id); if(item) mutate('later',id,{...item,status,updatedAt:Date.now()}); },
    updateRecommendation:(id,state) => { const item=materialize(snapshotRef.current).recommendations.find(i=>i.id===id); if(item) mutate('recommendation',id,{...item,state,dueAt:state==='snoozed'?Date.now()+86400000:item.dueAt,updatedAt:Date.now()}); },
    updateSettings,syncNow,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
