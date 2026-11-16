import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bookmark, Check, ChevronDown, ChevronUp, CircleHelp, Pencil, Star, StickyNote, X } from 'lucide-react-native';
import { Body, Button, Heading, Muted, Panel, Row, useTheme } from '../components/ui';
import { useStore } from '../state/Store';
import type { ArticleScreenProps } from '../state/contract';
import type { ArticleSection, ArticleStatus, Note } from '../types';
import { subjects } from '../data/content';
import { generateFlashcard } from '../services/meiwik';

const statusLabels: Record<ArticleStatus, string> = { open: 'Offen', unclear: 'Noch unklar', working: 'Weiterarbeiten', done: 'Abgeschlossen' };

function SectionExtras({ section, onCard, onNote, onChat }: { section: ArticleSection; onCard: () => void; onNote: () => void; onChat: () => void }) {
  const { colors } = useTheme();
  const [tab, setTab] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  return <>
    {section.tabs?.length ? <View style={[styles.example, { backgroundColor: colors.accentSoft }]}>
      <Row style={{ gap: 6 }}>{section.tabs.map((item, index) => <Pressable key={item.title} accessibilityRole="tab" accessibilityState={{ selected: tab === index }} onPress={() => setTab(index)} style={[styles.tab, { backgroundColor: tab === index ? colors.accent : 'transparent' }]}><Text style={{ color: tab === index ? colors.onAccent : colors.accent, fontWeight: '600', fontSize: 13 }}>{item.title}</Text></Pressable>)}</Row>
      <Body>{section.tabs[tab].content}</Body>
    </View> : null}
    {section.hint ? <View style={[styles.hint, { borderColor: colors.border }]}>
      <Pressable accessibilityRole="button" accessibilityState={{ expanded: hintOpen }} onPress={() => setHintOpen(!hintOpen)} style={styles.hintTitle}>
        <View style={{ flex: 1 }}><Muted>HINWEIS</Muted><Text style={[styles.hintText, { color: colors.text }]}>{section.hint.title}</Text></View>
        {hintOpen ? <ChevronUp size={18} color={colors.muted} /> : <ChevronDown size={18} color={colors.muted} />}
      </Pressable>
      {hintOpen && <Body style={{ paddingTop: 12 }}>{section.hint.content}</Body>}
    </View> : null}
    <Row style={{ gap: 4 }}><Button title="Notiz" variant="ghost" onPress={onNote} /><Button title="Karte erstellen" variant="ghost" onPress={onCard} /><Button title="MeiWik fragen" variant="ghost" onPress={onChat} /></Row>
  </>;
}

export function ArticleScreen({ article, onGlossary, onChat, onActivity }: ArticleScreenProps) {
  const { colors } = useTheme();
  const { data, user, online, setProgress, saveNote, deleteNote, saveCard } = useStore();
  const progress = data.progress[article.id];
  const [tocOpen, setTocOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [noteEditor, setNoteEditor] = useState<{ id?: string; sectionId?: string; label: string; text: string; kind: Note['kind'] } | null>(null);
  const [cardEditor, setCardEditor] = useState<{ front: string; back: string; selectedText: string; aiGenerated: boolean } | null>(null);
  const [cardBusy, setCardBusy] = useState(false);
  const [cardError, setCardError] = useState('');
  const generation = useRef(0);
  const [notice, setNotice] = useState('');
  const scroll = useRef<React.ElementRef<typeof ScrollView>>(null);
  const positions = useRef<Record<string, number>>({});
  const offset = useRef(0);
  const hydrated = useRef(false);
  const readKey = `mywik:reading:${user?.uid ?? 'guest'}:${article.id}`;

  useEffect(() => {
    generation.current += 1;
    setCardBusy(false); setCardError(''); setCardEditor(null); setNoteEditor(null); setNotice('');
    return () => { generation.current += 1; };
  }, [article.id, user?.uid]);

  useEffect(() => {
    let active = true;
    hydrated.current = false;
    AsyncStorage.getItem(readKey).then(value => {
      if (!active) return;
      offset.current = Number(value) || 0;
      hydrated.current = true;
      // onContentSizeChange restores only after all article sections have layout.
      setTimeout(() => active && scroll.current?.scrollTo({ y: offset.current, animated: false }), 120);
    }).catch(() => { hydrated.current = true; });
    return () => { active = false; if (hydrated.current) void AsyncStorage.setItem(readKey, String(offset.current)); };
  }, [readKey]);

  const articleNotes = data.notes.filter(note => note.articleId === article.id);
  const startNote = (sectionId?: string, label = 'Zum Artikel', existing?: Note) => setNoteEditor({ sectionId, label, text: existing?.text ?? '', kind: existing?.kind ?? 'personal', id: existing?.id });
  const startCard = (section?: ArticleSection) => {
    generation.current += 1;
    setCardBusy(false);
    setCardError('');
    const selectedText = section ? section.paragraphs.map(paragraph => paragraph.map(part => part.text).join('')).join('\n\n') : '';
    setCardEditor({ front: section ? `${section.title}: Was ist der Kerngedanke?` : `Was bedeutet „${article.title.replace(/^Der |^Die |^Das /, '')}“?`, back: (section ?? article.sections[0]).paragraphs.map(paragraph => paragraph.map(part => part.text).join('')).join('\n\n'), selectedText, aiGenerated: false });
  };
  const closeCard = () => { generation.current += 1; setCardBusy(false); setCardError(''); setCardEditor(null); };
  const generateCard = async () => {
    if (!cardEditor || !user || !online || cardBusy) return;
    const request = ++generation.current;
    const selectedText = cardEditor.selectedText;
    setCardBusy(true); setCardError('');
    try {
      const result = await generateFlashcard(article, selectedText);
      if (request !== generation.current) return;
      if (!result.front.trim() || !result.back.trim()) throw new Error('MeiWik hat keinen vollständigen Kartenvorschlag geliefert.');
      setCardEditor({ ...result, selectedText, aiGenerated: true });
    } catch (error) {
      if (request === generation.current) setCardError(`${error instanceof Error ? error.message : 'MeiWik konnte die Karte nicht erstellen.'} Den Textvorschlag kannst du weiterhin bearbeiten und speichern.`);
    } finally { if (request === generation.current) setCardBusy(false); }
  };
  const renderNotes = (scope?: string) => articleNotes.filter(note => note.sectionId === scope).map(note => <Pressable key={note.id} accessibilityRole="button" accessibilityLabel="Notiz bearbeiten" onPress={() => startNote(scope, scope ? 'Zum Abschnitt' : 'Zum Artikel', note)} style={[styles.savedNote, { backgroundColor: colors.accentSoft }]}><Row><StickyNote size={16} color={colors.accent} /><Muted>{note.kind === 'personal' ? 'Deine Notiz' : 'Inhalt verbessern'}</Muted><Pencil size={13} color={colors.muted} /></Row><Body>{note.text}</Body></Pressable>);

  return <>
    <ScrollView ref={scroll} style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled" scrollEventThrottle={250} onScroll={event => { onActivity?.(); offset.current = event.nativeEvent.contentOffset.y; }} onMomentumScrollEnd={() => { if (hydrated.current) void AsyncStorage.setItem(readKey, String(offset.current)); }}>
      <Muted>{subjects.find(subject => subject.id === article.subjectId)?.title.toLocaleUpperCase('de-DE')} · {article.number}</Muted>
      <Heading>{article.title}</Heading>
      <Body style={{ color: colors.muted }}>{article.intro}</Body>
      <Row>
        <Pressable accessibilityRole="button" onPress={() => setStatusOpen(!statusOpen)} style={[styles.status, { borderColor: colors.border, backgroundColor: colors.surface }]}>
          {progress?.status === 'done' ? <Check size={17} color={colors.accent} /> : progress?.status === 'unclear' ? <CircleHelp size={17} color={colors.accent} /> : <Bookmark size={17} color={colors.muted} />}
          <Text style={{ color: colors.text }}>{statusLabels[progress?.status ?? 'open']}</Text><ChevronDown size={14} color={colors.muted} />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={progress?.starred ? 'Markierung entfernen' : 'Als interessant merken'} accessibilityState={{ selected: !!progress?.starred }} onPress={() => setProgress(article.id, { starred: !progress?.starred })} style={[styles.status, { borderColor: colors.border, backgroundColor: colors.surface }]}><Star size={17} color={progress?.starred ? colors.gold : colors.muted} fill={progress?.starred ? colors.gold : 'transparent'} /><Text style={{ color: colors.text }}>Merken</Text></Pressable>
      </Row>
      {statusOpen && <Panel><Muted>DEIN LERNSTATUS</Muted>{(Object.keys(statusLabels) as ArticleStatus[]).map(status => <Button key={status} title={statusLabels[status]} variant={progress?.status === status ? 'primary' : 'ghost'} onPress={() => { setProgress(article.id, { status }); setStatusOpen(false); }} />)}</Panel>}
      <View style={[styles.toc, { borderColor: colors.border }]}>
        <Pressable accessibilityRole="button" accessibilityState={{ expanded: tocOpen }} onPress={() => setTocOpen(!tocOpen)} style={styles.hintTitle}><Text style={[styles.hintText, { color: colors.text }]}>In diesem Artikel</Text>{tocOpen ? <ChevronUp size={18} color={colors.muted} /> : <ChevronDown size={18} color={colors.muted} />}</Pressable>
        {tocOpen && article.sections.map(section => <Pressable key={section.id} accessibilityRole="button" onPress={() => scroll.current?.scrollTo({ y: positions.current[section.id] ?? 0, animated: true })} style={{ paddingVertical: 12 }}><Text style={{ color: colors.accent, fontSize: 15 }}>{section.title}</Text></Pressable>)}
      </View>
      {article.sections.map(section => <View key={section.id} onLayout={event => { positions.current[section.id] = event.nativeEvent.layout.y; }} style={{ gap: 14, paddingTop: 10 }}>
        <Text accessibilityRole="header" style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
        {section.paragraphs.map((paragraph, index) => <View key={index} style={{ gap: 8 }}>
          <Text selectable accessibilityActions={[{ name: 'longpress', label: 'Notiz zu diesem Absatz hinzufügen' }]} onAccessibilityAction={event => { if (event.nativeEvent.actionName === 'longpress') startNote(`${section.id}:p${index}`, `${section.title} · Absatz ${index + 1}`); }} onLongPress={() => startNote(`${section.id}:p${index}`, `${section.title} · Absatz ${index + 1}`)} style={[styles.paragraph, { color: colors.text }]}>
            {paragraph.map((part, partIndex) => part.termId ? <Text key={partIndex} accessibilityRole="button" onPress={() => onGlossary(part.termId!)} style={{ color: colors.accent, textDecorationLine: 'underline', textDecorationStyle: 'dotted' }}>{part.text}</Text> : <Text key={partIndex}>{part.text}</Text>)}
          </Text>
          {renderNotes(`${section.id}:p${index}`)}
        </View>)}
        <SectionExtras section={section} onCard={() => startCard(section)} onNote={() => startNote(section.id, section.title)} onChat={() => onChat(section.id)} />
        {renderNotes(section.id)}
      </View>)}
      <View style={[styles.toc, { borderColor: colors.border }]}><Row><StickyNote size={18} color={colors.accent} /><Text style={[styles.hintText, { color: colors.text }]}>Deine Notizen zum Artikel</Text></Row><Muted>Lange auf einen Absatz drücken, um direkt dort eine Notiz zu hinterlegen.</Muted>{renderNotes()}<Button title="Notiz zum Artikel hinzufügen" onPress={() => startNote()} /></View>
      {!!notice && <Text accessibilityLiveRegion="polite" style={{ color: colors.accent }}>{notice}</Text>}
      <Button title="Karte zum Thema erstellen" onPress={() => startCard()} />
      <Muted>Beispielinhalt · Version {article.version} · Fachliche Vertiefungen ergänzen wir gemeinsam.</Muted>
      <View style={{ height: 64 }} />
    </ScrollView>
    <Modal visible={!!noteEditor} transparent animationType={Platform.OS === 'web' ? 'none' : 'slide'} onRequestClose={() => setNoteEditor(null)}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalBackdrop}><ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: '90%', width: '100%', maxWidth: 560 }} contentContainerStyle={[styles.modal, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Row style={{ justifyContent: 'space-between' }}><Text style={[styles.sectionTitle, { color: colors.text, flex: 1 }]}>Deine Notiz</Text><Pressable accessibilityRole="button" accessibilityLabel="Schließen" onPress={() => setNoteEditor(null)} style={styles.iconButton}><X size={22} color={colors.text} /></Pressable></Row>
        <Muted>{noteEditor?.label}</Muted>
        <Row><Button title="Persönlich" variant={noteEditor?.kind === 'personal' ? 'primary' : 'secondary'} onPress={() => setNoteEditor(current => current && { ...current, kind: 'personal' })} /><Button title="Inhalt verbessern" variant={noteEditor?.kind === 'improvement' ? 'primary' : 'secondary'} onPress={() => setNoteEditor(current => current && { ...current, kind: 'improvement' })} /></Row>
        <TextInput accessibilityLabel="Notiztext" multiline placeholder="Dein Gedanke …" placeholderTextColor={colors.muted} value={noteEditor?.text ?? ''} onChangeText={text => setNoteEditor(current => current && { ...current, text })} style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]} />
        <Button title="Notiz speichern" variant="primary" disabled={!noteEditor?.text.trim()} onPress={() => { if (!noteEditor?.text.trim()) return; saveNote({ id: noteEditor.id, articleId: article.id, sectionId: noteEditor.sectionId, text: noteEditor.text.trim(), kind: noteEditor.kind }); setNoteEditor(null); }} />
        {!!noteEditor?.id && <Button title="Notiz löschen" variant="ghost" onPress={() => { deleteNote(noteEditor.id!); setNoteEditor(null); }} />}
      </ScrollView></KeyboardAvoidingView>
    </Modal>
    <Modal visible={!!cardEditor} transparent animationType={Platform.OS === 'web' ? 'none' : 'slide'} onRequestClose={closeCard}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalBackdrop}><ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: '90%', width: '100%', maxWidth: 560 }} contentContainerStyle={[styles.modal, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Row style={{ justifyContent: 'space-between' }}><Text style={[styles.sectionTitle, { color: colors.text, flex: 1 }]}>Karteikarte erstellen</Text><Pressable accessibilityRole="button" accessibilityLabel="Schließen" onPress={closeCard} style={styles.iconButton}><X size={22} color={colors.text} /></Pressable></Row>
        <Muted>{cardEditor?.aiGenerated ? 'MeiWik-Vorschlag · Prüfe Frage und Antwort vor dem Speichern.' : 'Textvorlage ohne KI aus dem Artikel. Du kannst sie bearbeiten oder von MeiWik eine Lernfrage formulieren lassen.'}</Muted>
        <Button title={cardBusy ? 'MeiWik erstellt die Karte …' : 'Mit MeiWik formulieren'} onPress={() => { void generateCard(); }} disabled={cardBusy || !online || !user} />
        {cardBusy && <ActivityIndicator accessibilityLabel="Karte wird erstellt" color={colors.accent} />}
        {!user ? <Muted>Für MeiWik bitte anmelden. Die Textvorlage ist auch ohne Anmeldung nutzbar.</Muted> : !online ? <Muted>MeiWik ist offline. Die Textvorlage kannst du weiterhin bearbeiten und speichern.</Muted> : null}
        {!!cardError && <Text accessibilityRole="alert" style={{ color: colors.danger, lineHeight: 22 }}>{cardError}</Text>}
        <Muted>VORDERSEITE</Muted><TextInput accessibilityLabel="Karteikarte Frage" multiline editable={!cardBusy} value={cardEditor?.front ?? ''} onChangeText={front => setCardEditor(current => current && { ...current, front })} style={[styles.input, { minHeight: 70, color: colors.text, borderColor: colors.border }]} />
        <Muted>RÜCKSEITE</Muted><TextInput accessibilityLabel="Karteikarte Antwort" multiline editable={!cardBusy} value={cardEditor?.back ?? ''} onChangeText={back => setCardEditor(current => current && { ...current, back })} style={[styles.input, { color: colors.text, borderColor: colors.border }]} />
        <Button title="Im Lernfach speichern" variant="primary" disabled={cardBusy || !cardEditor?.front.trim() || !cardEditor?.back.trim()} onPress={() => { if (!cardEditor) return; saveCard({ subjectId: article.subjectId, front: cardEditor.front.trim(), back: cardEditor.back.trim() }); closeCard(); setNotice('Karteikarte im Lernfach gespeichert.'); }} />
      </ScrollView></KeyboardAvoidingView>
    </Modal>
  </>;
}

const styles = StyleSheet.create({
  page: { padding: 22, paddingBottom: 35, gap: 16 }, paragraph: { fontSize: 17, lineHeight: 29 }, sectionTitle: { fontSize: 21, lineHeight: 29, fontWeight: '600' },
  status: { minHeight: 44, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 7 },
  toc: { paddingVertical: 17, borderTopWidth: 1, borderBottomWidth: 1, gap: 9 }, hintTitle: { minHeight: 44, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }, hintText: { fontSize: 15, fontWeight: '600', lineHeight: 23 },
  example: { padding: 18, borderRadius: 17, gap: 16 }, tab: { minHeight: 42, paddingHorizontal: 11, paddingVertical: 11, borderRadius: 10, justifyContent: 'center' }, hint: { borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 10 },
  savedNote: { padding: 14, borderRadius: 12, gap: 6 }, modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,.55)', justifyContent: 'flex-end', alignItems: 'center', padding: 14 }, modal: { padding: 20, borderWidth: 1, borderRadius: 22, gap: 14, width: '100%', maxWidth: 560 },
  input: { borderWidth: 1, borderRadius: 12, minHeight: 140, padding: 14, fontSize: 16, lineHeight: 24, textAlignVertical: 'top' }, iconButton: { minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' },
});
