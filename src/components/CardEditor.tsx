import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, Modal, Platform, Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { useStore } from '../state/Store';
import { similarCards, type CardDraft } from '../services/flashcards';
import { newId } from '../services/syncModel';
import { checkCardDuplicates, generateFlashcards } from '../services/meiwik';
import type { Flashcard } from '../types';
import { Body, Button, Muted, Row, useTheme } from './ui';
import { ModalLayout } from './ModalLayout';

type Proposal = CardDraft & { id: string };
type DuplicateGroup = { proposal: Proposal; matches: Flashcard[] };

export function CardEditor({ initial, source = '', onClose, onSaved, frontLabel = 'Frage / Vorderseite', backLabel = 'Antwort / Rückseite', saveLabel = 'Speichern' }: {
  initial: CardDraft; source?: string; onClose: () => void; onSaved?: (count?: number) => void; frontLabel?: string; backLabel?: string; saveLabel?: string;
}) {
  const store = useStore(); const { colors } = useTheme();
  const [draft, setDraft] = useState(initial); const [sourceText, setSource] = useState(source);
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<Proposal[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [duplicates, setDuplicates] = useState<Flashcard[] | null>(null);
  const [batchDuplicates, setBatchDuplicates] = useState<DuplicateGroup[] | null>(null);
  const [batchUnchecked, setBatchUnchecked] = useState(false);
  const [unchecked, setUnchecked] = useState(false); const [reset, setReset] = useState(false);
  const active = useRef(true); const pending = useRef(false); const latest = useRef(store); latest.current = store;
  const manualDraft = useRef(initial);
  useEffect(() => { active.current = true; return () => { active.current = false; }; }, []);
  const clearBatchCheck = () => { setBatchDuplicates(null); setBatchUnchecked(false); setError(''); };
  const change = (patch: Partial<CardDraft>) => {
    setDraft(current => ({ ...current, ...patch }));
    if (editingId) setSuggestions(current => current.map(proposal => proposal.id === editingId ? { ...proposal, ...patch, id: proposal.id } : proposal));
    setDuplicates(null); setUnchecked(false); clearBatchCheck();
  };
  const run = async (action: () => Promise<void>, selection = false) => {
    if (pending.current) return;
    pending.current = true; setBusy(true); setError(''); Keyboard.dismiss();
    try { await action(); }
    catch (problem) {
      if (active.current) {
        setError(problem instanceof Error ? problem.message : 'Die Prüfung ist fehlgeschlagen. Deine Eingaben bleiben erhalten.');
        if (selection) setBatchUnchecked(true); else setUnchecked(true);
      }
    } finally { pending.current = false; if (active.current) setBusy(false); }
  };
  const discardSuggestions = () => {
    setSuggestions([]); setSelected([]); setEditingId(null); setDraft(manualDraft.current);
    setDuplicates(null); setUnchecked(false); setNotice(''); clearBatchCheck();
  };
  const save = async () => {
    const current = { ...draft, front: draft.front.trim(), back: draft.back.trim(), resetSchedule: reset };
    // Stable IDs keep retries from creating a second copy if local persistence failed once.
    if (!current.id) { current.id = newId('card'); setDraft(value => ({ ...value, id: current.id })); }
    await latest.current.saveCards([current]);
    if (!active.current) return;
    Keyboard.dismiss(); onSaved?.(1);
    if (editingId && suggestions.length > 1) {
      setSuggestions(value => value.filter(proposal => proposal.id !== editingId));
      setSelected(value => value.filter(id => id !== editingId));
      setEditingId(null); setDraft(manualDraft.current); setDuplicates(null); setUnchecked(false);
      setNotice('Karte gespeichert.'); clearBatchCheck();
    } else onClose();
  };
  const check = () => void run(async () => {
    const local = similarCards(draft, latest.current.data.cards);
    const semantic = latest.current.online && latest.current.user ? await checkCardDuplicates(draft, latest.current.data.cards) : [];
    if (!active.current) return;
    const matches = [...new Map([...local, ...semantic, ...similarCards(draft, latest.current.data.cards)].map(card => [card.id, card])).values()];
    if (matches.length) setDuplicates(matches); else await save();
  });
  const generate = (generationMode: 'new' | 'improve' = 'improve') => void run(async () => {
    if (!store.user) throw new Error('MeiWik benötigt eine Anmeldung in den Einstellungen.');
    if (!store.online) throw new Error('MeiWik ist offline. Du kannst die Karte selbst bearbeiten.');
    const owner = store.user.uid;
    const { id: _id, front: _front, back: _back, ...context } = draft;
    const result = await generateFlashcards(draft, sourceText, store.data.cards, generationMode);
    if (!active.current || latest.current.user?.uid !== owner) return;
    manualDraft.current = draft;
    setSuggestions(result.map(card => ({ ...context, ...card, id: newId('card') })));
    setSelected([]); setEditingId(null); setDuplicates(null); setUnchecked(false); clearBatchCheck();
    setNotice('');
    if (!result.length) setError('Keine weiteren Kartenvorschläge.');
  });
  const selectedProposals = suggestions.filter(proposal => selected.includes(proposal.id));
  const toggleSelection = (id: string) => {
    setSelected(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
    clearBatchCheck();
  };
  const saveSelection = async () => {
    if (!selectedProposals.length) return;
    const count = await latest.current.saveCards(selectedProposals);
    if (!active.current) return;
    onSaved?.(count); onClose();
  };
  const checkSelection = (withoutAI = false) => void run(async () => {
    if (!selectedProposals.length) return;
    const owner = latest.current.user?.uid;
    const groups: DuplicateGroup[] = [];
    for (const proposal of selectedProposals) {
      const peers: Flashcard[] = selectedProposals.filter(other => other.id !== proposal.id).map(other => ({ ...other, updatedAt: 0, nextReviewAt: 0, reviews: 0 }));
      const local = similarCards(proposal, [...latest.current.data.cards, ...peers]);
      const semantic = !withoutAI && latest.current.online && latest.current.user ? await checkCardDuplicates(proposal, latest.current.data.cards) : [];
      if (!active.current || latest.current.user?.uid !== owner) return;
      const matches = [...new Map([...local, ...semantic, ...similarCards(proposal, latest.current.data.cards)].map(card => [card.id, card])).values()];
      if (matches.length) groups.push({ proposal, matches });
    }
    if (groups.length) { setBatchDuplicates(groups); setBatchUnchecked(false); }
    else await saveSelection();
  }, true);
  const valid = !!draft.front.trim() && !!draft.back.trim() && draft.front.length <= 1500 && draft.back.length <= 6000;
  const showEditor = !suggestions.length || !!editingId;
  return <Modal visible transparent statusBarTranslucent={Platform.OS === 'android'} navigationBarTranslucent={Platform.OS === 'android'} animationType={Platform.OS === 'web' ? 'none' : 'slide'} onRequestClose={onClose}>
    <ModalLayout backgroundColor="#0009" keyboardAvoiding align="bottom" padding={11}>
      <ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: '90%', width: '100%', maxWidth: 560, backgroundColor: colors.surface, borderRadius: 20 }} contentContainerStyle={{ padding: 15, gap: 10 }}>
        <Row><Text accessibilityRole="header" style={{ flex: 1, color: colors.text, fontSize: 21, fontWeight: '600' }}>{editingId ? 'Vorschlag bearbeiten' : suggestions.length ? 'Kartenvorschläge' : draft.id ? 'Karte bearbeiten' : 'Karteikarte erstellen'}</Text><Button title="Schließen" onPress={onClose} /></Row>
        {!suggestions.length && <><Button title={busy ? 'MeiWik prüft …' : 'Mit MeiWik formulieren'} disabled={busy || !valid} onPress={() => generate('improve')} />{!!sourceText && <Button title="Neue Kartenvorschläge aus Quelle" disabled={busy} onPress={() => generate('new')} />}</>}
        {busy && <ActivityIndicator accessibilityLabel="Karte wird geprüft" color={colors.accent} />}
        {!!notice && <Muted>{notice}</Muted>}
        {!!error && <Text accessibilityRole="alert" style={{ color: colors.danger }}>{error}</Text>}
        {suggestions.length > 0 && <>
          <Row><Button title="Alle auswählen" disabled={busy || selected.length === suggestions.length} onPress={() => { setSelected(suggestions.map(proposal => proposal.id)); clearBatchCheck(); }} /><Button title="Auswahl aufheben" disabled={busy || !selected.length} onPress={() => { setSelected([]); clearBatchCheck(); }} /></Row>
          {suggestions.map((suggestion, index) => {
            const checked = selected.includes(suggestion.id);
            return <View key={suggestion.id} style={{ borderWidth: 1, borderColor: checked ? colors.accent : colors.border, backgroundColor: checked ? colors.accentSoft : colors.surface, borderRadius: 12, overflow: 'hidden' }}>
              <Pressable accessibilityRole="checkbox" accessibilityLabel={`Vorschlag ${index + 1}: ${suggestion.front}`} accessibilityState={{ checked, disabled: busy }} disabled={busy} onPress={() => toggleSelection(suggestion.id)} style={{ padding: 12, gap: 8, minHeight: 44 }}>
                <Row><Text aria-hidden style={{ color: checked ? colors.accent : colors.muted, fontSize: 23 }}>{checked ? '☑' : '☐'}</Text><Text style={{ color: colors.text, fontSize: 16, lineHeight: 23, fontWeight: '600', flex: 1 }}>{suggestion.front}</Text></Row>
                <Body>{suggestion.back}</Body>
              </Pressable>
              <View style={{ paddingHorizontal: 10, paddingBottom: 8 }}><Button title={`Vorschlag ${index + 1} bearbeiten`} disabled={busy} onPress={() => { setEditingId(suggestion.id); setDraft(suggestion); setDuplicates(null); setUnchecked(false); setReset(false); clearBatchCheck(); }} /></View>
            </View>;
          })}
          {batchDuplicates && <View style={{ gap: 8 }}><Body>Ähnliche Karten bestehen bereits:</Body>{batchDuplicates.map(group => <View key={group.proposal.id} style={{ gap: 4 }}><Body>{group.proposal.front}</Body>{group.matches.map(match => <Muted key={match.id}>Ähnlich: {match.front}</Muted>)}</View>)}<Button title={`Auswahl trotzdem übernehmen (${selectedProposals.length})`} disabled={busy || !selectedProposals.length} onPress={() => void run(saveSelection, true)} /></View>}
          {batchUnchecked && <Button title={`Auswahl ohne KI-Prüfung übernehmen (${selectedProposals.length})`} disabled={busy || !selectedProposals.length} onPress={() => checkSelection(true)} />}
          <Button title={`Auswahl übernehmen (${selectedProposals.length})`} variant="primary" disabled={busy || !selectedProposals.length} onPress={() => checkSelection()} />
          <Button title="Vorschläge verwerfen" disabled={busy} onPress={discardSuggestions} />
        </>}
        {showEditor && <>
          <Muted>{frontLabel}</Muted><TextInput accessibilityLabel={frontLabel} multiline editable={!busy} maxLength={1500} value={draft.front} onChangeText={front => change({ front })} style={{ minHeight: 70, padding: 12, color: colors.text, borderColor: colors.border, borderWidth: 1, borderRadius: 12 }} />
          <Muted>{backLabel}</Muted><TextInput accessibilityLabel={backLabel} multiline editable={!busy} maxLength={6000} value={draft.back} onChangeText={back => change({ back })} style={{ minHeight: 140, padding: 12, color: colors.text, borderColor: colors.border, borderWidth: 1, borderRadius: 12 }} />
          {!draft.front.trim().endsWith('?') && !!draft.front.trim() && <Muted>Formuliere vorne eine konkrete Frage mit Fragezeichen.</Muted>}
          {draft.id && !editingId && <Row><Switch accessibilityLabel="Wiederholungsabstand zurücksetzen" value={reset} onValueChange={setReset} disabled={busy} /><Muted>Bei geändertem Lernziel Abstand zurücksetzen. Gesamtzähler bleiben erhalten.</Muted></Row>}
          {(!store.online || !store.user) && <Muted>Ohne KI-Verbindung werden ähnliche Formulierungen lokal geprüft. Eine semantische Prüfung benötigt Anmeldung und Internet.</Muted>}
          {duplicates && <View style={{ gap: 8 }}><Body>Ähnliche Karten bestehen bereits:</Body>{duplicates.map(card => <View key={card.id} style={{ gap: 6 }}><Body>{card.front}</Body><Body>{card.back}</Body><Button title={`Vorhandene Karte bearbeiten: ${card.front}`} disabled={busy || !store.data.cards.some(local => local.id === card.id)} onPress={() => { setDraft({ id: card.id, subjectId: card.subjectId, front: card.front, back: card.back, ...(card.articleId ? { articleId: card.articleId } : {}), ...(card.sectionId ? { sectionId: card.sectionId } : {}) }); setSource(''); setDuplicates(null); setSuggestions([]); setSelected([]); setEditingId(null); setReset(false); clearBatchCheck(); }} /></View>)}<Button title="Bewusst zusätzlich speichern" disabled={busy || !valid} onPress={() => void run(save)} /></View>}
          {unchecked && <Button title="Ohne KI-Prüfung speichern" disabled={busy || !valid} onPress={() => void run(async () => { const matches = similarCards(draft, latest.current.data.cards); if (matches.length) setDuplicates(matches); else await save(); })} />}
          <Button title={saveLabel} variant="primary" disabled={busy || !valid} onPress={check} />
        </>}
      </ScrollView>
    </ModalLayout>
  </Modal>;
}
