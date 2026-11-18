import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {useReadingPosition} from '../services/useReadingPosition';
import { Bookmark, Check, ChevronDown, ChevronUp, CircleHelp, Layers, Pencil, Star, StickyNote, X } from 'lucide-react-native';
import { Body, Button, Heading, Muted, Panel, Row, useTheme } from '../components/ui';
import { useStore } from '../state/Store';
import type { ArticleScreenProps } from '../state/contract';
import type { ArticleSection, ArticleStatus, Note } from '../types';
import { useContentIndex } from '../services/contentSync';
import { CardEditor } from '../components/CardEditor';
import { sectionSource } from '../services/flashcards';
import { MeiWikAvatar } from '../components/MeiWikAvatar';
import { ModalLayout } from '../components/ModalLayout';
import { InventoryDiagram } from '../components/InventoryDiagram';
import { AbcDiagram } from '../components/AbcDiagram';

const statusLabels: Record<ArticleStatus, string> = { open: 'Offen', unclear: 'Noch unklar', working: 'Weiterarbeiten', done: 'Abgeschlossen' };

function SectionExtras({ section, onCard, onNote, onChat }: { section: ArticleSection; onCard: () => void; onNote: () => void; onChat: () => void }) {
  const { colors } = useTheme();
  const [tab, setTab] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const selectedTab=Math.min(tab,Math.max(0,(section.tabs?.length??1)-1));
  return <>
    {section.inventoryChart && <InventoryDiagram chart={section.inventoryChart} />}
    {section.abcChart && <AbcDiagram chart={section.abcChart} />}
    {section.tabs?.length ? <View style={[styles.example, { backgroundColor: colors.highlight, borderColor: colors.border }]}>
      <Row style={{ gap: 6 }}>{section.tabs.map((item, index) => <Pressable key={`${index}:${item.title}`} accessibilityRole="tab" aria-selected={selectedTab===index} accessibilityState={{ selected: selectedTab === index }} onPress={() => setTab(index)} style={[styles.tab, { backgroundColor: selectedTab === index ? colors.accentSoft : 'transparent' }]}><Text style={{ color: selectedTab === index ? colors.accent : colors.muted, fontWeight: '600', fontSize: 13 }}>{item.title}</Text></Pressable>)}</Row>
      <Body>{section.tabs[selectedTab]?.content}</Body>
    </View> : null}
    {section.hint ? <View style={[styles.hint, { borderColor: colors.border }]}>
      <Pressable accessibilityRole="button" aria-expanded={hintOpen} accessibilityState={{ expanded: hintOpen }} onPress={() => setHintOpen(!hintOpen)} style={styles.hintTitle}>
        <View style={{ flex: 1 }}><Muted>{section.hint.label ?? 'HINWEIS'}</Muted><Text style={[styles.hintText, { color: colors.text }]}>{section.hint.title}</Text></View>
        {hintOpen ? <ChevronUp size={18} color={colors.muted} /> : <ChevronDown size={18} color={colors.muted} />}
      </Pressable>
      {hintOpen && <Body style={{ paddingTop: 8 }}>{section.hint.content}</Body>}
    </View> : null}
    <View style={styles.actions}>
      <Pressable accessibilityRole="button" accessibilityLabel="Notiz" onPress={onNote} style={styles.action}><Pencil size={15} color={colors.muted} /><Text style={[styles.actionLabel, { color: colors.muted }]}>Notiz</Text></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Karte erstellen" onPress={onCard} style={styles.action}><Layers size={15} color={colors.muted} /><Text style={[styles.actionLabel, { color: colors.muted }]}>Karte</Text></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="MeiWik fragen" onPress={onChat} style={styles.action}><MeiWikAvatar size={22} /><Text style={[styles.actionLabel, { color: colors.muted }]}>MeiWik</Text></Pressable>
    </View>
  </>;
}

export function ArticleScreen({ article, onGlossary, onArticle, onChat, onActivity }: ArticleScreenProps) {
  const { subjects } = useContentIndex();
  const { colors } = useTheme();
  const { data, user, setProgress, saveNote, deleteNote } = useStore();
  const progress = data.progress[article.id];
  const [tocOpen, setTocOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [noteEditor, setNoteEditor] = useState<{ id?: string; sectionId?: string; label: string; text: string; kind: Note['kind'] } | null>(null);
  const [cardEditor, setCardEditor] = useState<{ front: string; back: string; selectedText: string; sectionId?: string } | null>(null);
  const [notice, setNotice] = useState('');
  const scroll = useRef<React.ElementRef<typeof ScrollView>>(null);
  const positions = useRef<Record<string, number>>({});
  const sectionIds = useMemo(() => article.sections.map(section => section.id), [article.sections]);
  const [rendered, setRendered] = useState(() => Math.min(sectionIds.length, sectionIds.length > 8 ? 4 : 8));
  const renderThrough = useCallback((count: number) => setRendered(current => Math.min(sectionIds.length, Math.max(current, count))), [sectionIds.length]);
  const reading=useReadingPosition({owner:user?.uid??'guest',articleId:article.id,version:article.version,sectionIds,scroll,positions,renderThrough,onActivity,onError:setNotice});
  useEffect(() => {
    if (!reading.visible || rendered >= sectionIds.length) return;
    const timer = setTimeout(() => renderThrough(rendered + 4), 32);
    return () => clearTimeout(timer);
  }, [rendered, reading.visible, renderThrough, sectionIds.length]);
  useEffect(()=>{setCardEditor(null);setNoteEditor(null);setNotice('')},[article.id,user?.uid]);
  const articleNotes = data.notes.filter(note => note.articleId === article.id);
  const startNote = (sectionId?: string, label = 'Zum Artikel', existing?: Note) => setNoteEditor({ sectionId, label, text: existing?.text ?? '', kind: existing?.kind ?? 'personal', id: existing?.id });
  const confirmDeleteNote = () => {
    const id = noteEditor?.id;
    if (!id) return;
    const remove = () => { deleteNote(id); setNoteEditor(null); };
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm('Möchtest du diese Notiz wirklich löschen?')) remove();
      return;
    }
    Alert.alert('Notiz löschen?', 'Möchtest du diese Notiz wirklich löschen?', [
      { text: 'Abbrechen', style: 'cancel' },
      { text: 'Löschen', style: 'destructive', onPress: remove },
    ]);
  };
  const startCard = (section?: ArticleSection) => {
    const selectedText = section ? sectionSource(section) : [article.intro,...article.sections.map(sectionSource)].join('\n\n');
    if (section?.hint?.label === 'SELBSTKONTROLLE' && section.hint.title === 'Musterantwort') {
      const question = section.paragraphs.map(paragraph => paragraph.map(part => part.text).join('')).join('\n\n');
      setCardEditor({ front: question, back: section.hint.content, selectedText, sectionId: section.id });
      return;
    }
    setCardEditor({ front: section ? `${section.title}: Was ist der Kerngedanke?` : `Was bedeutet „${article.title.replace(/^Der |^Die |^Das /, '')}“?`, back: (section ?? article.sections[0]).paragraphs.map(paragraph => paragraph.map(part => part.text).join('')).join('\n\n'), selectedText, ...(section ? {sectionId:section.id} : {}) });
  };
  const closeCard = () => setCardEditor(null);
  const renderNotes = (scope?: string) => articleNotes.filter(note => note.sectionId === scope).map(note => <Pressable key={note.id} accessibilityRole="button" accessibilityLabel="Notiz bearbeiten" onPress={() => startNote(scope, scope ? 'Zum Abschnitt' : 'Zum Artikel', note)} style={[styles.savedNote, { backgroundColor: colors.noteSurface, borderLeftColor: colors.accent }]}><Row style={{ gap: 6 }}><StickyNote size={13} color={colors.muted} /><Muted style={{ fontSize: 12 }}>{note.kind === 'personal' ? 'Deine Notiz' : 'Inhalt verbessern'}</Muted><Pencil size={12} color={colors.muted} /></Row><Body style={{ color: colors.muted, fontStyle: 'italic', fontSize: 15, lineHeight: 24 }}>{note.text}</Body></Pressable>);

  return <>
    <ScrollView ref={scroll} style={{ flex: 1, backgroundColor: colors.background, opacity: reading.visible ? 1 : 0 }} scrollEnabled={reading.visible} pointerEvents={reading.visible ? 'auto' : 'none'} accessibilityElementsHidden={!reading.visible} importantForAccessibility={reading.visible?'auto':'no-hide-descendants'} contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled" scrollEventThrottle={250} onLayout={e=>reading.onLayout(e.nativeEvent.layout.height)} onContentSizeChange={(_,h)=>reading.onContentSizeChange(h)} onScroll={e=>reading.onScroll(e.nativeEvent.contentOffset.y)} onTouchStart={reading.onTouchStart} onScrollBeginDrag={reading.onScrollBeginDrag} onScrollEndDrag={reading.onScrollEndDrag}>
      <Muted>{subjects.find(subject => subject.id === article.subjectId)?.title.toLocaleUpperCase('de-DE')} · {article.number}</Muted>
      <Heading>{article.title}</Heading>
      <Body style={{ color: colors.muted }}>{article.intro}</Body>
      <Row>
        <Pressable accessibilityRole="button" aria-expanded={statusOpen} accessibilityState={{expanded:statusOpen}} onPress={() => setStatusOpen(!statusOpen)} style={[styles.status, { borderColor: colors.border, backgroundColor: colors.surface }]}>
          {progress?.status === 'done' ? <Check size={17} color={colors.accent} /> : progress?.status === 'unclear' ? <CircleHelp size={17} color={colors.accent} /> : <Bookmark size={17} color={colors.muted} />}
          <Text style={{ color: colors.text }}>{statusLabels[progress?.status ?? 'open']}</Text><ChevronDown size={14} color={colors.muted} />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={progress?.starred ? 'Markierung entfernen' : 'Als interessant merken'} accessibilityState={{ selected: !!progress?.starred }} onPress={() => setProgress(article.id, { starred: !progress?.starred })} style={[styles.status, { borderColor: colors.border, backgroundColor: colors.surface }]}><Star size={17} color={progress?.starred ? colors.gold : colors.muted} fill={progress?.starred ? colors.gold : 'transparent'} /><Text style={{ color: colors.text }}>Merken</Text></Pressable>
      </Row>
      {statusOpen && <Panel><Muted>DEIN LERNSTATUS</Muted>{(Object.keys(statusLabels) as ArticleStatus[]).map(status => <Button key={status} title={statusLabels[status]} variant={progress?.status === status ? 'primary' : 'ghost'} onPress={() => { setProgress(article.id, { status }); setStatusOpen(false); }} />)}</Panel>}
      <View style={[styles.toc, { borderColor: colors.border }]}>
        <Pressable accessibilityRole="button" aria-expanded={tocOpen} accessibilityState={{ expanded: tocOpen }} onPress={() => setTocOpen(!tocOpen)} style={styles.hintTitle}><Text style={[styles.hintText, { color: colors.text }]}>In diesem Artikel</Text>{tocOpen ? <ChevronUp size={18} color={colors.muted} /> : <ChevronDown size={18} color={colors.muted} />}</Pressable>
        {tocOpen && article.sections.map(section => <Pressable key={section.id} accessibilityRole="button" onPress={() => reading.jumpTo(section.id)} style={{ paddingVertical: 9 }}><Text style={{ color: colors.accent, fontSize: 15 }}>{section.title}</Text></Pressable>)}
      </View>
      {article.sections.slice(0, rendered).map(section => <View key={section.id} onLayout={event => reading.onSectionLayout(section.id,event.nativeEvent.layout.y)} style={{ gap: 10, paddingTop: 7 }}>
        <Text accessibilityRole="header" style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
        {section.paragraphs.map((paragraph, index) => <View key={index} style={{ gap: 8 }}>
          <Text selectable accessibilityActions={[{ name: 'longpress', label: 'Notiz zu diesem Absatz hinzufügen' }]} onAccessibilityAction={event => { if (event.nativeEvent.actionName === 'longpress') startNote(`${section.id}:p${index}`, `${section.title} · Absatz ${index + 1}`); }} onLongPress={() => startNote(`${section.id}:p${index}`, `${section.title} · Absatz ${index + 1}`)} style={[styles.paragraph, { color: colors.text }]}>
            {paragraph.map((part, partIndex) => {
              const { termId, articleId } = part;
              const open = termId ? () => onGlossary(termId) : articleId && onArticle ? () => onArticle(articleId) : undefined;
              return open
                ? <Text key={partIndex} accessibilityRole="button" onPress={open} style={{ color: colors.accent, textDecorationLine: 'underline', textDecorationStyle: 'dotted' }}>{part.text}</Text>
                : <Text key={partIndex}>{part.text}</Text>;
            })}
          </Text>
          {renderNotes(`${section.id}:p${index}`)}
        </View>)}
        <SectionExtras section={section} onCard={() => startCard(section)} onNote={() => startNote(section.id, section.title)} onChat={() => onChat(section.id)} />
        {renderNotes(section.id)}
      </View>)}
      {rendered>=sectionIds.length&&<View style={[styles.toc, { borderColor: colors.border }]}><Row><StickyNote size={16} color={colors.muted} /><Text style={[styles.hintText, { color: colors.text }]}>Deine Notizen zum Artikel</Text></Row>{renderNotes()}{articleNotes.filter(note=>note.sectionId&&!article.sections.some(section=>note.sectionId===section.id||section.paragraphs.some((_,i)=>note.sectionId===`${section.id}:p${i}`))).map(note=><Pressable key={note.id} accessibilityRole="button" accessibilityLabel="Notiz zu früherem Abschnitt bearbeiten" onPress={()=>startNote(note.sectionId,'Früherer Abschnitt',note)} style={styles.savedNote}><Muted>Früherer Abschnitt</Muted><Body>{note.text}</Body></Pressable>)}<Button title="Notiz zum Artikel hinzufügen" onPress={() => startNote()} /></View>}
      {!!notice && <Text accessibilityLiveRegion="polite" style={{ color: colors.accent }}>{notice}</Text>}
      {rendered>=sectionIds.length&&<Button title="Karte zum Thema erstellen" onPress={() => startCard()} />}
      <View style={{ height: 64 }} />
    </ScrollView>
    <Modal visible={!!noteEditor} transparent statusBarTranslucent={Platform.OS === 'android'} navigationBarTranslucent={Platform.OS === 'android'} animationType={Platform.OS === 'web' ? 'none' : 'slide'} onRequestClose={() => setNoteEditor(null)}>
      <ModalLayout backgroundColor="rgba(0,0,0,.55)" keyboardAvoiding align="bottom" padding={11}><ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: '90%', width: '100%', maxWidth: 560 }} contentContainerStyle={[styles.modal, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Row style={{ justifyContent: 'space-between' }}><Text style={[styles.sectionTitle, { color: colors.text, flex: 1 }]}>Deine Notiz</Text><Pressable accessibilityRole="button" accessibilityLabel="Schließen" onPress={() => setNoteEditor(null)} style={styles.iconButton}><X size={22} color={colors.text} /></Pressable></Row>
        <Muted>{noteEditor?.label}</Muted>
        <Row><Button title="Persönlich" variant={noteEditor?.kind === 'personal' ? 'primary' : 'secondary'} onPress={() => setNoteEditor(current => current && { ...current, kind: 'personal' })} /><Button title="Inhalt verbessern" variant={noteEditor?.kind === 'improvement' ? 'primary' : 'secondary'} onPress={() => setNoteEditor(current => current && { ...current, kind: 'improvement' })} /></Row>
        <TextInput accessibilityLabel="Notiztext" multiline maxLength={20000} placeholder="Dein Gedanke …" placeholderTextColor={colors.muted} value={noteEditor?.text ?? ''} onChangeText={text => setNoteEditor(current => current && { ...current, text })} style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]} />
        <Button title="Notiz speichern" variant="primary" disabled={!noteEditor?.text.trim()} onPress={() => { if (!noteEditor?.text.trim()) return; saveNote({ id: noteEditor.id, articleId: article.id, sectionId: noteEditor.sectionId, text: noteEditor.text.trim(), kind: noteEditor.kind }); setNoteEditor(null); }} />
        {!!noteEditor?.id && <Button title="Notiz löschen" variant="ghost" onPress={confirmDeleteNote} />}
      </ScrollView></ModalLayout>
    </Modal>
    {cardEditor && <CardEditor key={`${user?.uid??'guest'}:${article.id}`} initial={{subjectId:article.subjectId,articleId:article.id,articleVersion:article.version,...(cardEditor.sectionId?{sectionId:cardEditor.sectionId}:{}),front:cardEditor.front,back:cardEditor.back}} source={cardEditor.selectedText} onClose={closeCard} onSaved={(count=1)=>setNotice(count===1?'Karteikarte im Lernfach gespeichert.':`${count} Karteikarten im Lernfach gespeichert.`)} frontLabel="Karteikarte Frage" backLabel="Karteikarte Antwort" saveLabel="Im Lernfach speichern"/>}
  </>;
}

const styles = StyleSheet.create({
  page: { paddingHorizontal: 11, paddingTop: 14, paddingBottom: 25, gap: 10 }, paragraph: { fontSize: 17, lineHeight: 29 }, sectionTitle: { fontSize: 21, lineHeight: 29, fontWeight: '600' },
  status: { minHeight: 44, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 7 },
  toc: { paddingVertical: 11, borderTopWidth: 1, borderBottomWidth: 1, gap: 7 }, hintTitle: { minHeight: 44, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 9 }, hintText: { fontSize: 15, fontWeight: '600', lineHeight: 23 },
  example: { padding: 12, borderRadius: 14, borderWidth: 1, gap: 10 }, tab: { minHeight: 44, paddingHorizontal: 9, paddingVertical: 10, borderRadius: 9, justifyContent: 'center' }, hint: { borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 7 },
  actions: { flexDirection: 'row', gap: 4 }, action: { flex: 1, minWidth: 0, minHeight: 44, paddingHorizontal: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }, actionLabel: { fontSize: 13, fontWeight: '500' },
  savedNote: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 9, borderLeftWidth: 2, gap: 4 }, modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,.55)', justifyContent: 'flex-end', alignItems: 'center', padding: 11 }, modal: { padding: 15, borderWidth: 1, borderRadius: 20, gap: 10, width: '100%', maxWidth: 560 },
  input: { borderWidth: 1, borderRadius: 12, minHeight: 140, padding: 14, fontSize: 16, lineHeight: 24, textAlignVertical: 'top' }, iconButton: { minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' },
});
