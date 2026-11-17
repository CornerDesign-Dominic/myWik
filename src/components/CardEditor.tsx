import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { useStore } from '../state/Store';
import { similarCards, type CardDraft } from '../services/flashcards';
import { checkCardDuplicates, generateFlashcards } from '../services/meiwik';
import type { Flashcard } from '../types';
import { Body, Button, Muted, Row, useTheme } from './ui';

export function CardEditor({ initial, source = '', onClose, onSaved, frontLabel = 'Frage / Vorderseite', backLabel = 'Antwort / Rückseite', saveLabel = 'Speichern' }: {
  initial: CardDraft; source?: string; onClose: () => void; onSaved?: () => void; frontLabel?: string; backLabel?: string; saveLabel?: string;
}) {
  const store = useStore(); const { colors } = useTheme();
  const [draft, setDraft] = useState(initial); const [sourceText, setSource] = useState(source);
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{front:string;back:string}>>([]);
  const [proposalIndex,setProposalIndex]=useState<number|null>(null); const [notice,setNotice]=useState('');
  const [duplicates, setDuplicates] = useState<Flashcard[] | null>(null);
  const [unchecked, setUnchecked] = useState(false); const [reset, setReset] = useState(false);
  const active = useRef(true); const pending=useRef(false); const latest = useRef(store); latest.current = store;
  useEffect(() => {active.current=true;return () => { active.current = false; }}, []);
  const change = (patch: Partial<CardDraft>) => { setDraft(d=>({...d,...patch})); setDuplicates(null); setUnchecked(false); setError(''); };
  const run = async (action: () => Promise<void>) => {
    if(pending.current)return;pending.current=true;
    setBusy(true); setError(''); Keyboard.dismiss();
    try { await action(); } catch (e) { if (active.current) {setError(e instanceof Error ? e.message : 'Die Prüfung ist fehlgeschlagen. Deine Eingaben bleiben erhalten.');setUnchecked(true);} }
    finally { pending.current=false;if (active.current) setBusy(false); }
  };
  const save = () => {
    const current = {...draft,front:draft.front.trim(),back:draft.back.trim()};
    latest.current.saveCard({...current,resetSchedule:reset}); Keyboard.dismiss(); onSaved?.();
    if (proposalIndex !== null && suggestions.length > 1) {
      const remaining=suggestions.filter((_,i)=>i!==proposalIndex);
      setSuggestions(remaining);setProposalIndex(0);setDraft(({id,...d})=>({...d,...remaining[0]}));setDuplicates(null);setUnchecked(false);setNotice('Karte gespeichert. Prüfe den nächsten Vorschlag.');
    } else onClose();
  };
  const check = () => void run(async () => {
    const local = similarCards(draft, latest.current.data.cards);
    const semantic = store.online && store.user ? await checkCardDuplicates(draft, latest.current.data.cards) : [];
    if (!active.current) return;
    const matches = [...new Map([...local,...semantic,...similarCards(draft,latest.current.data.cards)].map(c=>[c.id,c])).values()];
    if (matches.length) setDuplicates(matches); else save();
  });
  const generate = (generationMode: 'new'|'improve' = 'improve') => void run(async () => {
    if (!store.user) throw new Error('MeiWik benötigt eine Anmeldung in den Einstellungen.');
    if (!store.online) throw new Error('MeiWik ist offline. Du kannst die Karte selbst bearbeiten.');
    const result = await generateFlashcards(draft,sourceText,store.data.cards,generationMode);
    if (!active.current) return;
    setSuggestions(result);setProposalIndex(result.length?0:null);if(result.length){if(generationMode==='new')setDraft(({id,...d})=>({...d,...result[0]}));else change(result[0]);setNotice('Vorschläge einzeln prüfen und speichern. Nicht benötigte Vorschläge kannst du verwerfen.');}
    if (!result.length) setError('Die Lernpunkte sind möglicherweise bereits abgedeckt. Prüfe die vorhandenen Karten oder bearbeite deine Karte selbst.');
  });
  const valid = !!draft.front.trim() && !!draft.back.trim() && draft.front.length <= 1500 && draft.back.length <= 6000;
  return <Modal visible transparent animationType={Platform.OS==='web'?'none':'slide'} onRequestClose={onClose}>
    <KeyboardAvoidingView behavior={Platform.OS==='web'?undefined:'padding'} style={{flex:1,backgroundColor:'#0009',justifyContent:'flex-end',alignItems:'center',padding:11}}>
      <ScrollView keyboardShouldPersistTaps="handled" style={{maxHeight:'90%',width:'100%',maxWidth:560,backgroundColor:colors.surface,borderRadius:20}} contentContainerStyle={{padding:15,gap:10}}>
        <Row><Text accessibilityRole="header" style={{flex:1,color:colors.text,fontSize:21,fontWeight:'600'}}>{draft.id?'Karte bearbeiten':'Karteikarte erstellen'}</Text><Button title="Schließen" onPress={onClose}/></Row>
        <Button title={busy?'MeiWik prüft …':'Mit MeiWik formulieren'} disabled={busy || !valid} onPress={()=>generate('improve')}/>
        {!!sourceText && <Button title="Neue Kartenvorschläge aus Quelle" disabled={busy} onPress={()=>generate('new')}/>}
        {busy && <ActivityIndicator accessibilityLabel="Karte wird geprüft" color={colors.accent}/>}
        {!!notice && <Muted>{notice}</Muted>}
        {!!error && <Text accessibilityRole="alert" style={{color:colors.danger}}>{error}</Text>}
        {suggestions.map((suggestion,i)=><View key={i} style={{borderWidth:1,borderColor:colors.border,padding:10,gap:6,borderRadius:12}}><Body>{suggestion.front}</Body><Body>{suggestion.back}</Body><Button title={`Vorschlag ${i+1} übernehmen`} disabled={busy} onPress={()=>{change(suggestion);setProposalIndex(i)}}/></View>)}
        {suggestions.length>0 && <Button title="Weitere Vorschläge verwerfen" disabled={busy} onPress={()=>{setSuggestions([]);setProposalIndex(null)}}/>}
        <Muted>{frontLabel}</Muted><TextInput accessibilityLabel={frontLabel} multiline editable={!busy} maxLength={1500} value={draft.front} onChangeText={front=>change({front})} style={{minHeight:70,padding:12,color:colors.text,borderColor:colors.border,borderWidth:1,borderRadius:12}}/>
        <Muted>{backLabel}</Muted><TextInput accessibilityLabel={backLabel} multiline editable={!busy} maxLength={6000} value={draft.back} onChangeText={back=>change({back})} style={{minHeight:140,padding:12,color:colors.text,borderColor:colors.border,borderWidth:1,borderRadius:12}}/>
        {!draft.front.trim().endsWith('?') && !!draft.front.trim() && <Muted>Formuliere vorne eine konkrete Frage mit Fragezeichen.</Muted>}
        {draft.id && <Row><Switch accessibilityLabel="Wiederholungsabstand zurücksetzen" value={reset} onValueChange={setReset} disabled={busy}/><Muted>Bei geändertem Lernziel Abstand zurücksetzen. Gesamtzähler bleiben erhalten.</Muted></Row>}
        {(!store.online || !store.user) && <Muted>Ohne KI-Verbindung werden ähnliche Formulierungen lokal geprüft. Eine semantische Prüfung benötigt Anmeldung und Internet.</Muted>}
        {duplicates && <View style={{gap:8}}><Body>Ähnliche Karten bestehen bereits:</Body>{duplicates.map(c=><View key={c.id} style={{gap:6}}><Body>{c.front}</Body><Body>{c.back}</Body><Button title={`Vorhandene Karte bearbeiten: ${c.front}`} disabled={busy || !store.data.cards.some(local=>local.id===c.id)} onPress={()=>{setDraft({id:c.id,subjectId:c.subjectId,front:c.front,back:c.back,...(c.articleId?{articleId:c.articleId}:{}),...(c.sectionId?{sectionId:c.sectionId}:{})});setSource('');setDuplicates(null);setSuggestions([]);setProposalIndex(null);setReset(false)}}/></View>)}<Button title="Bewusst zusätzlich speichern" disabled={busy || !valid} onPress={save}/></View>}
        {unchecked && <Button title="Ohne KI-Prüfung speichern" disabled={busy || !valid} onPress={()=>{const matches=similarCards(draft,latest.current.data.cards);if(matches.length)setDuplicates(matches);else save()}}/>}
        <Button title={saveLabel} variant="primary" disabled={busy || !valid} onPress={check}/>
      </ScrollView>
    </KeyboardAvoidingView>
  </Modal>;
}
