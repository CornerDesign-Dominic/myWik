import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Linking, Modal, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { expo as appConfig } from '../../app.json';
import { useStore } from '../state/Store';
import { useTheme } from '../components/ui';
import { content, useContentIndex } from '../services/contentSync';
import { syncReminders } from '../services/reminders';
import { learningSummary } from '../services/learningProgress';
import { useCurrentTime } from '../services/useCurrentTime';
import { androidReleasesUrl, checkAndroidUpdate, type AndroidUpdate } from '../services/androidUpdates';
import type { ReminderCategory, ReminderSetting, ThemeMode } from '../types';

function confirmDelete(message: string, remove: () => void) {
  if (Platform.OS === 'web') { if (window.confirm(message)) remove(); }
  else Alert.alert('Wirklich löschen?', message, [{ text: 'Abbrechen', style: 'cancel' }, { text: 'Löschen', style: 'destructive', onPress: remove }]);
}

function usePalette() {
  const { colors } = useTheme();
  return colors;
}

function Copy({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  const c = usePalette();
  return <Text style={[styles.copy, { color: muted ? c.muted : c.text }]}>{children}</Text>;
}
function Box({ children }: { children: React.ReactNode }) {
  const c = usePalette();
  return <View style={[styles.box, { backgroundColor: c.surface, borderColor: c.border }]}>{children}</View>;
}
function Action({ title, onPress, primary = false, disabled = false }: { title: string; onPress: () => void; primary?: boolean; disabled?: boolean }) {
  const c = usePalette();
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.action, { backgroundColor: primary ? c.accent : c.surface, borderColor: primary ? c.accent : c.border, opacity: disabled ? 0.45 : pressed ? 0.7 : 1 }]}><Text style={{ color: primary ? c.onAccent : c.text, fontSize: 14, fontWeight: '600' }}>{title}</Text></Pressable>;
}
function Input({ value, onChangeText, placeholder, multiline = false, secureTextEntry = false, keyboardType, label }: { value: string; onChangeText: (text: string) => void; placeholder?: string; multiline?: boolean; secureTextEntry?: boolean; keyboardType?: 'default' | 'email-address' | 'numeric'; label: string }) {
  const c = usePalette();
  return <View style={{ gap: 6 }}><Text style={[styles.label, { color: c.muted }]}>{label}</Text><TextInput accessibilityLabel={label} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={c.muted} multiline={multiline} secureTextEntry={secureTextEntry} keyboardType={keyboardType} autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'} style={[styles.input, { color: c.text, borderColor: c.border, backgroundColor: c.background }, multiline && styles.multiline]} /></View>;
}
const subjectName = (id: string) => content.getIndex().subjects.find(subject => subject.id === id)?.title ?? id;
const articleName = (id?: string) => content.article(id)?.title ?? 'Artikel';
const formatTime = (seconds: number) => seconds >= 3600 ? `${(seconds / 3600).toLocaleString('de-DE', { maximumFractionDigits: 1 })} h` : `${Math.floor(seconds / 60)} Min.`;
const dayKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export { CardsScreen } from './CardsScreen';

export function SuccessScreen() {
  const { subjects } = useContentIndex();
  const { data } = useStore();
  const c = usePalette();
  const now=useCurrentTime();const [followCurrent,setFollowCurrent]=useState(true);
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  useEffect(()=>{if(followCurrent)setMonth(new Date(new Date(now).getFullYear(),new Date(now).getMonth(),1))},[followCurrent,new Date(now).getFullYear(),new Date(now).getMonth()]);
  const summary=useMemo(()=>learningSummary(data,month),[data,month]);
  const {sessions:monthSessions,days:allDays,reached,completed}=summary;
  const days = Array.from({ length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() }, (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1));
  const rows = [{ label: 'App besucht', threshold: 0 }, { label: '5 Minuten', threshold: 300 }, { label: '15 Minuten', threshold: 900 }, { label: '30 Minuten', threshold: 1800 }, { label: '60 Minuten', threshold: 3600 }, { label: 'Tagesstern', threshold: -1 }];
  return <ScrollView contentContainerStyle={styles.page}>
    <View style={[styles.row, { justifyContent: 'space-between' }]}><Action title="‹" onPress={() => {setFollowCurrent(false);setMonth(value => new Date(value.getFullYear(), value.getMonth() - 1, 1))}} /><Text style={[styles.sectionTitle, { color: c.text }]}>{month.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}</Text><Action title="›" onPress={() => {setFollowCurrent(false);setMonth(value => new Date(value.getFullYear(), value.getMonth() + 1, 1))}} /></View>
    <Action title="Aktueller Monat" onPress={()=>{setFollowCurrent(true);setMonth(new Date(new Date(now).getFullYear(),new Date(now).getMonth(),1))}}/><Copy muted>Alle folgenden Summen beziehen sich auf den ausgewählten Monat.</Copy>
    <Box><View style={{ flexDirection: 'row' }}><View style={{ width: 96 }}><View style={styles.dayCell} />{rows.map(row => <View key={row.label} style={styles.dayCell}><Text style={{ color: c.muted, fontSize: 12 }}>{row.label}</Text></View>)}</View><ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={{ paddingBottom: 8 }}>{days.map(date => { const key = dayKey(date); const today = key === dayKey(new Date(now)); return <View key={key} style={{ width: 32 }}><View style={styles.dayCell}><Text style={{ color: today ? c.accent : c.muted, fontWeight: today ? '700' : '400' }}>{date.getDate()}</Text></View>{rows.map(row => <View key={row.label} style={styles.dayCell}><Text accessibilityLabel={`${date.getDate()}. ${row.label}: ${reached(key, row.threshold) ? 'erreicht' : 'nicht erreicht'}`} style={{ color: reached(key, row.threshold) ? row.threshold === -1 ? c.gold : c.accent : c.border, fontSize: 18 }}>{reached(key, row.threshold) ? row.threshold === -1 ? '★' : '☑' : '□'}</Text></View>)}</View>; })}</ScrollView></View></Box>
    <Box><Text style={[styles.sectionTitle, { color: c.gold }]}>★ {allDays.filter(key => reached(key, -1)).length} Tagessterne</Text>{[300, 900, 1800, 3600].map(seconds => <Copy key={seconds}>{allDays.filter(key => reached(key, seconds)).length}× mindestens {seconds / 60} Minuten gelernt</Copy>)}<Copy>{completed} MeiWik Empfehlungen abgeschlossen</Copy></Box>
    <Text style={[styles.sectionTitle, { color: c.text }]}>Lernzeit nach Fach</Text>
    {subjects.map(subject => { const sessions = monthSessions.filter(item => item.subjectId === subject.id); const reading = sessions.filter(item => item.kind === 'article').reduce((sum, item) => sum + item.seconds, 0); const cards = sessions.filter(item => item.kind === 'cards').reduce((sum, item) => sum + item.seconds, 0); if (!reading && !cards) return null; return <Box key={subject.id}><View style={[styles.row, { justifyContent: 'space-between' }]}><Text style={[styles.sectionTitle, { color: c.text }]}>{subject.title}</Text><Text style={{ color: c.accent, fontSize: 18, fontWeight: '600' }}>{formatTime(reading + cards)}</Text></View><Copy muted>Artikel & MeiWik: {formatTime(reading)} · Karten: {formatTime(cards)}</Copy></Box>; })}
    {!monthSessions.length && <Copy muted>In diesem Monat wurde noch keine Lernzeit erfasst.</Copy>}
  </ScrollView>;
}

export function LaterScreen({ onArticle }: { onArticle: (id: string) => void }) {
  const store = useStore();
  const c = usePalette();
  const [includeDone, setIncludeDone] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const items = store.data.later.filter(item => includeDone || item.status === 'open').sort((a, b) => b.updatedAt - a.updatedAt);
  const kindLabels = { missing: 'Wissen ergänzen', wording: 'Formulierung verbessern', example: 'Beispiel ergänzen', structure: 'Aufbau verbessern', depth: 'Vertiefen' };
  return <ScrollView contentContainerStyle={styles.page}>
    <View style={styles.row}><Switch accessibilityLabel="Erledigte Einträge anzeigen" value={includeDone} onValueChange={setIncludeDone} /><Copy>Erledigte anzeigen</Copy></View>
    {!items.length && <Box><Copy>Keine offenen Einträge.</Copy></Box>}
    {items.map(item => <Box key={item.id}><Text style={[styles.eyebrow, { color: c.accent }]}>{subjectName(item.subjectId)} · {kindLabels[item.kind]}</Text><Text style={[styles.sectionTitle, { color: c.text }]}>{item.question}</Text><Copy muted>{articleName(item.articleId)}{item.sectionId ? ` · Abschnitt ${item.sectionId}` : ''}</Copy><Action title={expanded === item.id ? 'Details schließen' : 'Kontext & Verbesserungsidee'} onPress={() => setExpanded(expanded === item.id ? null : item.id)} />{expanded === item.id && <><Copy>Textstelle: {item.sourceText || 'Gesamter Artikel'}</Copy><Copy>MeiWiks Antwort: {item.answer}</Copy><Copy>Vermutete Wissenslücke: {item.suspectedGap}</Copy><Copy>Vorschlag: {item.suggestion}</Copy></>}<View style={styles.row}>{item.articleId && <Action title="Zum Artikel" onPress={() => onArticle(item.articleId!)} />}<Action title={item.status === 'done' ? 'Wieder öffnen' : 'Als erledigt markieren'} onPress={() => store.updateLater(item.id, item.status === 'done' ? 'open' : 'done')} /></View></Box>)}
  </ScrollView>;
}

export function RecommendationsScreen({ onArticle, onSubjects }: { onArticle: (id: string) => void; onSubjects: () => void }) {
  const now=useCurrentTime();
  const store = useStore();
  const c = usePalette();
  const items = store.data.recommendations.filter(item => item.state === 'open' || item.state === 'snoozed' && item.dueAt <= now);
  return <ScrollView contentContainerStyle={styles.page}>
    <Box>
      <Copy>Öffne einen Artikel und tippe unten auf MeiWik, um eine Frage zum Artikel zu stellen.</Copy>
      <Action title="Artikel auswählen" primary onPress={onSubjects} />
    </Box>
    <Text accessibilityRole="header" style={[styles.sectionTitle, { color: c.text }]}>Empfehlungen</Text>
    {!items.length && <Box><Copy>Keine Empfehlungen fällig.</Copy></Box>}
    {items.map(item => <Box key={item.id}><Text style={[styles.eyebrow, { color: c.accent }]}>{subjectName(item.subjectId)}</Text><Text style={[styles.sectionTitle, { color: c.text }]}>{item.title}</Text><Copy>{item.reason}</Copy><View style={styles.row}><Action title="Artikel wiederholen" primary onPress={() => onArticle(item.articleId)} /><Action title="Geschafft" onPress={() => store.updateRecommendation(item.id, 'done')} /><Action title="Morgen" onPress={() => store.updateRecommendation(item.id, 'snoozed')} /><Action title="Verwerfen" onPress={() => store.updateRecommendation(item.id, 'dismissed')} /></View></Box>)}
  </ScrollView>;
}

function AndroidUpdateSettings({ installedVersion }: { installedVersion: string }) {
  const colors = usePalette();
  const request = useRef<AbortController | null>(null);
  const [checking, setChecking] = useState(false);
  const [update, setUpdate] = useState<AndroidUpdate | null>(null);
  const [status, setStatus] = useState<'current' | 'unavailable' | null>(null);
  const [downloadError, setDownloadError] = useState(false);
  useEffect(() => () => {
    request.current?.abort();
    request.current = null;
  }, []);

  async function check() {
    if (request.current) return;
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 12_000);
    setChecking(true);
    setUpdate(null);
    setStatus(null);
    setDownloadError(false);
    try {
      const next = await checkAndroidUpdate(installedVersion, controller.signal);
      if (request.current !== controller) return;
      setUpdate(next);
      if (!next) setStatus('current');
    } catch {
      if (request.current === controller) setStatus('unavailable');
    } finally {
      clearTimeout(timeout);
      if (request.current === controller) {
        request.current = null;
        setChecking(false);
      }
    }
  }

  async function open(url: string) {
    setDownloadError(false);
    try { await Linking.openURL(url); }
    catch { setDownloadError(true); }
  }

  return <Box>
    <Text style={[styles.sectionTitle, { color: colors.text }]}>App-Updates</Text>
    <Copy muted>Installierte Version {installedVersion}</Copy>
    <Action title={checking ? 'Suche nach Updates …' : 'Nach Updates schauen'} disabled={checking} onPress={() => void check()} />
    {status === 'current' && <Text accessibilityLiveRegion="polite" style={[styles.copy, { color: colors.text }]}>Deine App ist auf dem neuesten Stand.</Text>}
    {status === 'unavailable' && <>
      <Text accessibilityRole="alert" style={[styles.copy, { color: colors.text }]}>Die Suche nach Updates ist gerade nicht möglich.</Text>
      <Action title="Veröffentlichungen öffnen" onPress={() => void open(androidReleasesUrl)} />
    </>}
    {update && <>
      <Text accessibilityLiveRegion="polite" style={[styles.copy, { color: colors.text }]}>Version {update.version} ist verfügbar.</Text>
      <Action title="APK herunterladen" primary onPress={() => void open(update.downloadUrl)} />
      <Copy muted>Öffne die heruntergeladene APK und wähle „Aktualisieren“. Lass myWik dabei installiert, damit deine Lerndaten erhalten bleiben.</Copy>
    </>}
    {downloadError && <Text accessibilityRole="alert" style={[styles.copy, { color: colors.text }]}>Der Link konnte nicht geöffnet werden.</Text>}
  </Box>;
}

export function SettingsScreen() {
  const { articles, version } = useContentIndex();
  const store = useStore();
  const c = usePalette();
  // The APK workflow sets this package in app.json before embedding the JS bundle.
  const canCheckAndroidUpdates = Platform.OS === 'web'
    || (Platform.OS === 'android' && appConfig.android.package === 'de.mywik.app.preview');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [informationOpen, setInformationOpen] = useState(false);
  const [articleHistoryLimit, setArticleHistoryLimit] = useState(0);
  const [reminderDraft, setReminderDraft] = useState(store.data.settings.reminders);
  const [timeDraft, setTimeDraft] = useState<Record<ReminderCategory, string>>(() => Object.fromEntries(Object.entries(store.data.settings.reminders).map(([key, value]) => [key, `${String(value.hour).padStart(2, '0')}:${String(value.minute).padStart(2, '0')}`])) as Record<ReminderCategory, string>);
  useEffect(() => { setReminderDraft(store.data.settings.reminders); setTimeDraft(Object.fromEntries(Object.entries(store.data.settings.reminders).map(([key, value]) => [key, `${String(value.hour).padStart(2, '0')}:${String(value.minute).padStart(2, '0')}`])) as Record<ReminderCategory, string>); }, [store.user?.uid]);
  const run = async (action: () => Promise<void>) => { setBusy(true); setNotice(null); try { await action(); setPassword(''); } catch (error) { setNotice(error instanceof Error ? error.message : 'Die Aktion konnte nicht abgeschlossen werden.'); } finally { setBusy(false); } };
  const setReminder = (key: ReminderCategory, patch: Partial<ReminderSetting>) => setReminderDraft(current => ({ ...current, [key]: { ...current[key], ...patch } }));
  const saveReminders = async () => {
    const reminders = { ...reminderDraft };
    for (const key of ['learning', 'recommendations', 'news'] as ReminderCategory[]) {
      if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(timeDraft[key])) { setNotice('Bitte Uhrzeiten im Format HH:MM eingeben, zum Beispiel 19:00.'); return; }
      const [hour, minute] = timeDraft[key].split(':').map(Number);
      reminders[key] = { ...reminders[key], hour, minute };
    }
    const settings = { ...store.data.settings, reminders };
    store.updateSettings({ reminders });
    setBusy(true);
    const result = await syncReminders(settings, { recommendations: store.data.recommendations.filter(item => item.state === 'open').length, news: 0 }, store.user?.uid ?? 'guest', true);
    setNotice(result.message);
    setBusy(false);
  };
  const labels: Record<ReminderCategory, string> = { learning: 'Lernerinnerung', recommendations: 'MeiWik Empfehlungen', news: 'Neues in der App' };
  const syncLabels = { local: 'Nur auf diesem Gerät', syncing: 'Wird synchronisiert …', synced: 'Mit der Cloud synchronisiert', error: 'Synchronisierung benötigt Aufmerksamkeit' };
  return <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
    {canCheckAndroidUpdates && <AndroidUpdateSettings installedVersion={appConfig.version} />}
    <Box><Text style={[styles.sectionTitle, { color: c.text }]}>Darstellung</Text><View style={styles.row}>{([['system', 'Wie Gerät'], ['light', 'Hell'], ['dark', 'Dunkel']] as [ThemeMode, string][]).map(([mode, label]) => <Action key={mode} title={label} primary={store.data.settings.theme === mode} onPress={() => store.updateSettings({ theme: mode })} />)}</View></Box>
    <Box><Text style={[styles.sectionTitle, { color: c.text }]}>Dein Konto</Text>{store.user ? <><Copy>{store.user.email ?? 'Angemeldet'}</Copy><Copy muted>{syncLabels[store.syncState]}</Copy><View style={styles.row}><Action title="Jetzt synchronisieren" disabled={busy || !store.online} onPress={() => run(store.syncNow)} /><Action title="Abmelden" disabled={busy} onPress={() => run(store.signOut)} /></View></> : <><Input label="E-Mail" keyboardType="email-address" value={email} onChangeText={setEmail} /><Input label="Passwort" value={password} onChangeText={setPassword} secureTextEntry /><View style={styles.row}><Action title="Anmelden" primary disabled={busy || !email.trim() || !password || !store.online} onPress={() => run(() => store.signIn(email.trim(), password))} /><Action title="Konto erstellen" disabled={busy || !email.trim() || password.length < 6 || !store.online} onPress={() => run(() => store.register(email.trim(), password))} /></View><Copy muted>Für ein neues Konto mindestens 6 Zeichen verwenden.</Copy></>}</Box>
    {!!store.conflicts.length && <Box><Text style={[styles.sectionTitle,{color:c.text}]}>Gesicherte Konfliktversionen</Text><Copy muted>Bei gleichzeitiger Bearbeitung wurden diese Fassungen auf diesem Gerät gesichert. Wiederherstellen legt eine neue Notiz oder Karte an.</Copy>{store.conflicts.map(item=>{const v=item.value as Record<string,unknown>;return <Box key={item.revision}><Copy>{item.kind==='card'?String(v.front):String(v.text)}</Copy>{item.kind==='card'&&<Copy>{String(v.back)}</Copy>}<View style={styles.row}><Action title="Als neue Kopie wiederherstellen" onPress={()=>store.restoreConflict(item.revision)}/><Action title="Konfliktkopie verwerfen" onPress={()=>confirmDelete('Diese lokale Konfliktkopie verwerfen?',()=>store.dismissConflict(item.revision))}/></View></Box>})}</Box>}
    <Text style={[styles.sectionTitle, { color: c.text }]}>Deine Erinnerungen</Text><Copy muted>Drei unabhängige Rhythmen. Uhrzeit und Häufigkeit gelten jeweils für diese Kategorie.</Copy>
    {(['learning', 'recommendations', 'news'] as ReminderCategory[]).map(key => <Box key={key}><View style={[styles.row, { justifyContent: 'space-between' }]}><Text style={[styles.sectionTitle, { color: c.text, flex: 1 }]}>{labels[key]}</Text><Switch accessibilityLabel={`${labels[key]} aktivieren`} value={reminderDraft[key].enabled} onValueChange={enabled => setReminder(key, { enabled })} trackColor={{ true: c.accent }} /></View><Input label="Uhrzeit (HH:MM)" value={timeDraft[key]} onChangeText={text => setTimeDraft(value => ({ ...value, [key]: text }))} /><Copy muted>Alle {reminderDraft[key].everyDays} {reminderDraft[key].everyDays === 1 ? 'Tag' : 'Tage'}</Copy><View style={styles.row}>{[1, 3, 7].map(days => <Action key={days} title={days === 1 ? 'Täglich' : days === 7 ? 'Wöchentlich' : 'Alle 3 Tage'} primary={reminderDraft[key].everyDays === days} onPress={() => setReminder(key, { everyDays: days })} />)}</View>{key === 'news' && <Copy muted>Wird nur eingeplant, wenn neue Inhalte bekannt sind. Automatische Nachrichten über neue Veröffentlichungen folgen mit der Inhaltsverwaltung.</Copy>}{key === 'recommendations' && <Copy muted>Wird nur eingeplant, wenn Empfehlungen vorliegen.</Copy>}</Box>)}
    <Action title={busy ? 'Bitte warten …' : 'Erinnerungen speichern'} primary disabled={busy} onPress={saveReminders} />
    <Copy muted>Erinnerungen werden für die nächsten 18 Termine je Kategorie auf diesem Gerät vorgemerkt und beim Öffnen erneuert. Offline-Lernerinnerungen funktionieren nach der Einrichtung weiter.</Copy>
    {(notice || store.error) && <Box><Text accessibilityRole="alert" style={[styles.copy, { color: c.text }]}>{notice ?? store.error}</Text></Box>}
    <Box><Action title={informationOpen ? 'Bedienung & App-Informationen schließen' : 'Bedienung & App-Informationen'} onPress={() => setInformationOpen(value => !value)} />{informationOpen && <>
      <Text style={[styles.sectionTitle, { color: c.text }]}>Bedienung</Text>
      <Copy>Lange auf einen Artikelabsatz drücken, um dort eine Notiz zu hinterlegen. Gespeicherte Notizen kannst du antippen und bearbeiten.</Copy>
      <Copy>Karteikarten entstehen aus Artikeln und Begriffen oder direkt im Lernfach. Frage und Antwort bleiben bearbeitbar.</Copy>
      <Text style={[styles.sectionTitle, { color: c.text }]}>Konto & Offline-Nutzung</Text>
      <Copy>Ohne Anmeldung bleiben deine Daten auf diesem Gerät. Mit Konto werden Status, Notizen, Karten und Lernzeiten mit deinen anderen Geräten synchronisiert. Gastdaten und Kontodaten bleiben getrennt.</Copy>
      <Copy>Heruntergeladene Artikel, Notizen, Status und Karteikarten funktionieren offline. MeiWik benötigt Internet. Chats werden auf diesem Gerät gespeichert und verfallen 72 Stunden nach der letzten Nachricht. „Für später“ bleibt unabhängig davon erhalten.</Copy>
      <Text style={[styles.sectionTitle, { color: c.text }]}>Lernzeit & Erfolge</Text>
      <Copy>Artikelzeit enthält das Lesen und MeiWik-Gespräche zum Artikel. Karteikartenzeit wird getrennt erfasst; beide zählen für dein Tagesziel. Die Erfassung pausiert bei Appwechsel, gesperrtem Bildschirm und längerer Inaktivität.</Copy>
      <Copy>Die Tagesstufen liegen bei 5, 15, 30 und 60 Minuten. Wenn du die App besucht und mindestens 60 Minuten gelernt hast, erhältst du einen Tagesstern. Lernzeit zeigt deine Beschäftigung mit einem Thema und ist keine Wissensbewertung.</Copy>
      <Text style={[styles.sectionTitle, { color: c.text }]}>Artikelstände</Text>
      <Copy>{articles.length} Artikel · Katalogstand {version}</Copy>
      {articles.slice(0, articleHistoryLimit).map(article => <Copy key={article.id}>{article.title} · Version {article.version} · {new Date(article.updatedAt).toLocaleDateString('de-DE')}</Copy>)}
      {articleHistoryLimit < articles.length && <Action title={articleHistoryLimit ? 'Weitere Artikelstände' : 'Artikelstände anzeigen'} onPress={() => setArticleHistoryLimit(limit => limit + 30)} />}
      <Text style={[styles.sectionTitle, { color: c.text }]}>Verbindung & Speicherung</Text>
      <Copy>{store.online ? 'Online' : 'Offline'} · {syncLabels[store.syncState]}</Copy>
      <Copy>{store.user ? 'Kontodaten werden lokal gespeichert und mit Firebase abgeglichen.' : 'Aktuell lokale Gastdaten auf diesem Gerät.'}</Copy>
    </>}</Box>
  </ScrollView>;
}

const styles = StyleSheet.create({
  page: { paddingHorizontal: 11, paddingTop: 12, paddingBottom: 24, gap: 10 }, title: { paddingBottom: 2 }, eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.4, textTransform: 'uppercase' }, heading: { fontSize: 26, lineHeight: 32, fontWeight: '600', letterSpacing: -0.8 }, sectionTitle: { fontSize: 17, lineHeight: 24, fontWeight: '600' }, copy: { fontSize: 15, lineHeight: 24 }, label: { fontSize: 12, fontWeight: '500' }, box: { padding: 12, borderRadius: 16, borderWidth: 1, gap: 8 }, row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }, action: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center' }, input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 12, fontSize: 16, minHeight: 46 }, multiline: { minHeight: 112, textAlignVertical: 'top' }, cardQuestion: { fontSize: 22, fontWeight: '600', lineHeight: 30, paddingVertical: 10 }, divider: { height: 1 }, backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,.65)', justifyContent: 'flex-end', padding: 11 }, sheet: { padding: 14, borderRadius: 24, maxHeight: '90%' }, dayCell: { height: 34, alignItems: 'center', justifyContent: 'center' },
});
