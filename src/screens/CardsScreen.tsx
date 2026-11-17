import React, {useEffect,useRef,useState} from 'react';
import {Alert,Keyboard,KeyboardAvoidingView,Platform,ScrollView,View} from 'react-native';
import {useStore} from '../state/Store';
import {subjects} from '../data/content';
import {Body,Button,Heading,Muted,Panel,Row} from '../components/ui';
import {ChatMessageBody} from '../components/ChatMessageBody';
import {CardEditor} from '../components/CardEditor';
import {CardPractice} from '../components/CardPractice';
import {cardCounts,type CardDraft} from '../services/flashcards';
import {useLearningTimer} from '../services/useLearningTimer';
import type {Flashcard} from '../types';

function Counts({card}:{card:Flashcard}) {
  const c=cardCounts(card);
  return <Muted>{c.known}× gewusst · {c.unknown}× nicht gewusst{c.legacy?` · ${c.legacy} frühere Wiederholungen ohne Einzelbewertung`:''}</Muted>;
}
export function CardsScreen({subjectId,onActiveSubject}:{subjectId?:string;onActiveSubject?:(id:string|null)=>void}) {
  const store=useStore();
  const [subject,setSubject]=useState(subjectId??subjects[0]?.id??'');
  const [filter,setFilter]=useState<'all'|'due'>('all');
  const [activeId,setActiveId]=useState<string|null>(null);
  const [revealed,setRevealed]=useState(false); const [mode,setMode]=useState<'self'|'chat'>('self');
  const [epoch,setEpoch]=useState(0);const [editor,setEditor]=useState<CardDraft|null>(null);
  const rated=useRef(false);
  const all=store.data.cards.filter(c=>!c.deleted&&c.subjectId===subject);
  const due=all.filter(c=>c.nextReviewAt<=Date.now());
  const cards=[...(filter==='due'?due:all)].sort((a,b)=>a.nextReviewAt-b.nextReviewAt);
  const active=cards.find(c=>c.id===activeId)??cards[0];
  const {touch}=useLearningTimer(active?subject:undefined,'cards');
  const reset=()=>{Keyboard.dismiss();setRevealed(false);setMode('self');setEpoch(e=>e+1);rated.current=false;};
  useEffect(()=>{if(subjectId)setSubject(subjectId)},[subjectId]);
  useEffect(()=>{reset();setEditor(null);setActiveId(null)},[store.user?.uid,subject]);
  useEffect(()=>{onActiveSubject?.(active?subject:null);return()=>onActiveSubject?.(null)},[subject,!!active,onActiveSubject]);
  const advance=(known?:boolean)=>{
    if(!active||rated.current)return;
    if(known!==undefined){if(!revealed)return;rated.current=true;store.reviewCard(active.id,known)}
    const i=cards.findIndex(c=>c.id===active.id);
    setActiveId(cards.length>1?cards[(i+1)%cards.length].id:null);
    // Keep the lock until React commits the new exercise, preventing double taps.
    Keyboard.dismiss();setRevealed(false);setMode('self');setEpoch(e=>e+1);
  };
  useEffect(()=>{rated.current=false},[epoch,active?.id]);
  const choose=(id:string)=>{reset();setActiveId(id);setFilter('all')};
  const remove=()=>{
    if(!active)return;
    const act=()=>{store.deleteCard(active.id);reset();setActiveId(null)};
    if(Platform.OS==='web'){if(window.confirm('Diese Karteikarte wirklich löschen?'))act()}
    else Alert.alert('Karte löschen?','Diese Karte wird auf deinen Geräten gelöscht.',[{text:'Abbrechen',style:'cancel'},{text:'Löschen',style:'destructive',onPress:act}]);
  };
  return <KeyboardAvoidingView behavior={Platform.OS==='web'?undefined:'padding'} style={{flex:1}}><ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" onTouchStart={touch} contentContainerStyle={{padding:11,gap:10,paddingBottom:24}}>
    <Heading>Karteikarten</Heading>
    <ScrollView horizontal contentContainerStyle={{gap:8}}>{subjects.map(s=><Button key={s.id} title={s.title} variant={s.id===subject?'primary':'secondary'} onPress={()=>{reset();setSubject(s.id);setActiveId(null)}}/>)}</ScrollView>
    <Row><Button title={`Alle (${all.length})`} variant={filter==='all'?'primary':'secondary'} onPress={()=>{reset();setFilter('all');setActiveId(null)}}/><Button title={`Fällig (${due.length})`} variant={filter==='due'?'primary':'secondary'} onPress={()=>{reset();setFilter('due');setActiveId(null)}}/></Row>
    {active ? <>
      <Panel><Muted>{subjects.find(s=>s.id===subject)?.title} · FRAGE</Muted><ChatMessageBody content={active.front}/>
      {!revealed && <Row><Button title="Für mich beantworten" variant={mode==='self'?'primary':'secondary'} onPress={()=>{setMode('self');setEpoch(e=>e+1)}}/><Button title="Mit MeiWik üben" variant={mode==='chat'?'primary':'secondary'} onPress={()=>setMode('chat')}/></Row>}
      {mode==='chat'&&!editor&&<CardPractice key={`${store.user?.uid??'guest'}:${active.id}:${epoch}`} card={active} online={store.online} onActivity={touch}/>}
      {revealed?<><Muted>ANTWORT</Muted><ChatMessageBody content={active.back}/><Muted>Wusstest du es vor der Erklärung? Du entscheidest selbst.</Muted><Row><Button title="Wusste ich nicht" onPress={()=>advance(false)}/><Button title="Wusste ich" variant="primary" onPress={()=>advance(true)}/></Row></>:<Button title="Antwort zeigen" variant="primary" onPress={()=>{Keyboard.dismiss();setRevealed(true);touch()}}/>}
      <Counts card={active}/><Muted>Nächste Wiederholung: {new Date(active.nextReviewAt).toLocaleDateString('de-DE')}</Muted></Panel>
      <Row><Button title="Nächste Karte (überspringen)" onPress={()=>advance()}/><Button title="Karte bearbeiten" onPress={()=>{reset();setEditor({id:active.id,subjectId:active.subjectId,front:active.front,back:active.back,...(active.articleId?{articleId:active.articleId}:{}),...(active.sectionId?{sectionId:active.sectionId}:{})})}}/><Button title="Löschen" onPress={remove}/></Row>
    </>:<Panel><Body>{filter==='due'?'Keine Karten fällig.':'Keine Karten in diesem Fach.'}</Body></Panel>}
    <Button title="Karte hinzufügen" onPress={()=>{reset();setEditor({subjectId:subject,front:'',back:''})}}/>
    {all.length>1&&<><Heading>Deine Karten</Heading>{all.map(card=><Panel key={card.id}><Button title={card.front} onPress={()=>choose(card.id)}/><Counts card={card}/></Panel>)}</>}
    {editor&&<CardEditor key={store.user?.uid??'guest'} initial={editor} onClose={()=>setEditor(null)}/>}
  </ScrollView></KeyboardAvoidingView>;
}
