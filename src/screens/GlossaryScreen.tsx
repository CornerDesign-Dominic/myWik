import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react-native';
import { Body, Button, Heading, Muted, Page, Panel, Row, useTheme } from '../components/ui';
import { articles, glossary, subjects } from '../data/content';
import { useStore } from '../state/Store';
import { generateFlashcard } from '../services/meiwik';
import type { GlossaryTerm } from '../types';

export function GlossaryScreen({ initialTermId, onArticle }: { initialTermId?: string; onArticle: (articleId: string) => void }) {
  const { colors } = useTheme();
  const { saveCard, user, online } = useStore();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(initialTermId ?? null);
  const [card, setCard] = useState<{ term: GlossaryTerm; front: string; back: string; aiGenerated?: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const generation = useRef(0);
  const [notice, setNotice] = useState('');
  useEffect(() => { generation.current += 1; setCard(null); setBusy(false); setError(''); setNotice(''); return () => { generation.current += 1; }; }, [user?.uid]);
  const closeCard = () => { generation.current += 1; setCard(null); setBusy(false); setError(''); };
  const generate = async () => {
    if (!card || !user || !online || busy) return;
    const article = articles.find(item => item.id === card.term.articleId);
    if (!article) return;
    const request = ++generation.current;
    const term = card.term;
    setBusy(true); setError('');
    try {
      const result = await generateFlashcard(article, `${term.term}\n${term.definition}${term.example ? `\nBeispiel: ${term.example}` : ''}`);
      if (request !== generation.current) return;
      if (!result.front.trim() || !result.back.trim()) throw new Error('MeiWik hat keinen vollständigen Kartenvorschlag geliefert.');
      setCard({ term, ...result, aiGenerated: true });
    } catch (problem) {
      if (request === generation.current) setError(`${problem instanceof Error ? problem.message : 'MeiWik konnte die Karte nicht erstellen.'} Die Textvorlage bleibt nutzbar.`);
    } finally { if (request === generation.current) setBusy(false); }
  };
  const items = [...glossary].sort((a, b) => a.term.localeCompare(b.term, 'de')).filter(term => `${term.term} ${term.definition}`.toLocaleLowerCase('de-DE').includes(search.toLocaleLowerCase('de-DE')));
  return <><Page><Muted>NACHSCHLAGEN</Muted><Heading>Begriffsglossar</Heading><Body style={{ color: colors.muted }}>Fachbegriffe präzise erklärt – mit Beispielen zum Einordnen.</Body>
    <View style={[styles.search, { backgroundColor: colors.surface, borderColor: colors.border }]}><Search size={19} color={colors.muted} /><TextInput accessibilityLabel="Glossar durchsuchen" value={search} onChangeText={setSearch} placeholder="Begriff suchen …" placeholderTextColor={colors.muted} style={{ flex: 1, color: colors.text, fontSize: 16, minHeight: 44 }} /></View>
    {!!notice && <Text accessibilityLiveRegion="polite" style={{ color: colors.accent }}>{notice}</Text>}
    {!items.length && <Muted>Kein passender Begriff gefunden.</Muted>}
    {items.map(term => <Panel key={term.id}><Pressable accessibilityRole="button" accessibilityState={{ expanded: expanded === term.id }} onPress={() => setExpanded(expanded === term.id ? null : term.id)} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', minHeight: 44 }}><View style={{ flex: 1, gap: 4 }}><Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>{term.term}</Text><Muted>{subjects.find(subject => subject.id === term.subjectId)?.title}</Muted></View>{expanded === term.id ? <ChevronUp size={18} color={colors.muted} /> : <ChevronDown size={18} color={colors.muted} />}</Pressable>
      {expanded === term.id && <><Body>{term.definition}</Body>{term.example && <View style={{ backgroundColor: colors.accentSoft, padding: 15, borderRadius: 12, gap: 6 }}><Muted>BEISPIEL</Muted><Body>{term.example}</Body></View>}<Row>{term.articleId && <Button title="Zum Artikel" onPress={() => onArticle(term.articleId!)} />}<Button title="Karte erstellen" onPress={() => setCard({ term, front: `Was bedeutet „${term.term}“?`, back: term.definition + (term.example ? `\n\nBeispiel: ${term.example}` : '') })} /></Row></>}
    </Panel>)}
  </Page>
    <Modal visible={!!card} animationType={Platform.OS === 'web' ? 'none' : 'slide'} transparent onRequestClose={closeCard}><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.backdrop}><ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: '90%', width: '100%', maxWidth: 560 }} contentContainerStyle={[styles.editor, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Row style={{ justifyContent: 'space-between' }}><Text style={{ color: colors.text, fontSize: 21, fontWeight: '600', flex: 1 }}>Karteikarte erstellen</Text><Pressable accessibilityRole="button" accessibilityLabel="Schließen" onPress={closeCard} style={styles.close}><X size={22} color={colors.text} /></Pressable></Row>
      <Muted>{card?.aiGenerated ? 'MeiWik-Vorschlag · Prüfe Frage und Antwort vor dem Speichern.' : 'Textvorlage ohne KI aus dem Glossar · frei bearbeitbar'}</Muted>
      {!!card?.term.articleId && <Button title={busy ? 'MeiWik erstellt die Karte …' : 'Mit MeiWik formulieren'} onPress={() => { void generate(); }} disabled={busy || !user || !online} />}
      {busy && <ActivityIndicator accessibilityLabel="Karte wird erstellt" color={colors.accent} />}
      {!user ? <Muted>Für MeiWik bitte anmelden. Die Textvorlage ist auch ohne Anmeldung nutzbar.</Muted> : !online ? <Muted>MeiWik ist offline. Die Textvorlage bleibt nutzbar.</Muted> : null}
      {!!error && <Text accessibilityRole="alert" style={{ color: colors.danger, lineHeight: 22 }}>{error}</Text>}
      <Muted>FRAGE</Muted><TextInput accessibilityLabel="Frage der Karteikarte" multiline editable={!busy} value={card?.front ?? ''} onChangeText={front => setCard(current => current && { ...current, front })} style={[styles.input, { color: colors.text, borderColor: colors.border }]} />
      <Muted>ANTWORT</Muted><TextInput accessibilityLabel="Antwort der Karteikarte" multiline editable={!busy} value={card?.back ?? ''} onChangeText={back => setCard(current => current && { ...current, back })} style={[styles.input, { minHeight: 180, color: colors.text, borderColor: colors.border }]} />
      <Button title="Karte speichern" variant="primary" disabled={busy || !card?.front.trim() || !card?.back.trim()} onPress={() => { if (!card) return; saveCard({ subjectId: card.term.subjectId, front: card.front.trim(), back: card.back.trim() }); setNotice(`Karte im Lernfach ${subjects.find(subject => subject.id === card.term.subjectId)?.title} gespeichert.`); closeCard(); }} />
    </ScrollView></KeyboardAvoidingView></Modal>
  </>;
}

const styles = StyleSheet.create({ search: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderRadius: 14, paddingHorizontal: 14 }, backdrop: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 14, backgroundColor: 'rgba(0,0,0,.55)' }, editor: { padding: 20, borderRadius: 22, borderWidth: 1, gap: 13 }, close: { minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' }, input: { borderWidth: 1, padding: 14, borderRadius: 12, fontSize: 16, lineHeight: 24, minHeight: 75, textAlignVertical: 'top' } });
