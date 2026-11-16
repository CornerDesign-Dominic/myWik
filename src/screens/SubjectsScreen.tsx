import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BookOpen, Building2, Calculator, Check, ChevronDown, ChevronRight, CircleHelp, Compass, Flag, Globe2, Receipt, Scale, Star, Target, Truck, Users, Workflow } from 'lucide-react-native';
import { Body, Heading, Muted, Page, Panel, Row, useTheme } from '../components/ui';
import { chapters, subjects } from '../data/content';
import { useStore } from '../state/Store';
import type { Chapter } from '../types';

const subjectIcons: Record<string, typeof BookOpen> = { target: Target, truck: Truck, building: Building2, globe: Globe2, scale: Scale, receipt: Receipt, calculator: Calculator, compass: Compass, workflow: Workflow, users: Users };

export function SubjectsScreen({ onSubject }: { onSubject: (subjectId: string) => void }) {
  const { colors } = useTheme();
  const { data } = useStore();
  return <Page><Muted>DEINE WISSENSWELT</Muted><Heading>Fächer</Heading><Body style={{ color: colors.muted }}>Entdecke ein Thema oder knüpfe dort an, wo du aufgehört hast.</Body>
    {subjects.map(subject => {
      const Icon = subjectIcons[subject.icon] ?? BookOpen;
      const subjectChapters = chapters.filter(chapter => chapter.subjectId === subject.id);
      const existingArticles = subjectChapters.filter(chapter => chapter.articleId);
      const completed = existingArticles.filter(chapter => data.progress[chapter.articleId!]?.status === 'done').length;
      return <Pressable key={subject.id} accessibilityRole="button" accessibilityLabel={`${subject.title}, ${existingArticles.length} Artikel verfügbar`} onPress={() => onSubject(subject.id)} style={({ pressed }) => [styles.subject, { borderColor: colors.border, backgroundColor: colors.surface, opacity: pressed ? .75 : 1 }]}>
        <View style={[styles.icon, { backgroundColor: colors.accentSoft }]}><Icon size={23} color={colors.accent} /></View>
        <View style={{ flex: 1, gap: 5 }}><Text style={[styles.subjectName, { color: colors.text }]}>{subject.title}</Text><Muted>{subject.subtitle}</Muted><Text style={{ color: colors.muted, fontSize: 12 }}>{existingArticles.length ? `${existingArticles.length} Artikel · ${completed} abgeschlossen` : 'Kapitel vorbereitet · Inhalte folgen'}</Text></View>
        <ChevronRight size={18} color={colors.muted} />
      </Pressable>;
    })}
  </Page>;
}

export function ChaptersScreen({ subjectId, onArticle }: { subjectId: string; onArticle: (articleId: string) => void }) {
  const { colors } = useTheme();
  const { data } = useStore();
  const subject = subjects.find(item => item.id === subjectId);
  const nodes = chapters.filter(chapter => chapter.subjectId === subjectId);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [planned, setPlanned] = useState<string | null>(null);
  const toggle = (id: string) => setCollapsed(current => ({ ...current, [id]: !current[id] }));
  const renderChapter = (chapter: Chapter, depth = 0): React.ReactNode => {
    const children = nodes.filter(node => node.parentId === chapter.id);
    const progress = chapter.articleId ? data.progress[chapter.articleId] : undefined;
    const StatusIcon = progress?.status === 'done' ? Check : progress?.status === 'unclear' ? CircleHelp : progress?.status === 'working' ? Flag : null;
    return <View key={chapter.id}>
      <Pressable accessibilityRole="button" accessibilityState={children.length ? { expanded: !collapsed[chapter.id] } : undefined} onPress={() => chapter.articleId ? onArticle(chapter.articleId) : children.length ? toggle(chapter.id) : setPlanned(planned === chapter.id ? null : chapter.id)} style={({ pressed }) => [styles.chapter, { paddingLeft: Math.min(depth, 4) * 17, borderColor: colors.border, opacity: pressed ? .65 : 1 }]}>
        <View style={{ width: 20, alignItems: 'center' }}>{StatusIcon ? <StatusIcon size={17} color={colors.accent} /> : progress?.starred ? <Star size={16} color={colors.gold} fill={colors.gold} /> : null}</View>
        <View style={{ flex: 1, gap: 4 }}><Text style={{ color: colors.text, fontSize: depth ? 15 : 17, fontWeight: depth ? '500' : '600', lineHeight: 23 }}><Text style={{ color: colors.muted }}>{chapter.number} </Text>{chapter.title}</Text>{!chapter.articleId && !children.length && <Muted>In Vorbereitung</Muted>}</View>
        {progress?.starred && StatusIcon && <Star size={14} color={colors.gold} fill={colors.gold} />}
        {children.length ? collapsed[chapter.id] ? <ChevronRight size={17} color={colors.muted} /> : <ChevronDown size={17} color={colors.muted} /> : chapter.articleId ? <ChevronRight size={17} color={colors.muted} /> : null}
      </Pressable>
      {planned === chapter.id && <View style={{ paddingVertical: 12, paddingLeft: Math.min(depth, 4) * 17 + 24 }}><Muted>Dieses Kapitel ist für den Ausbau vorgemerkt. Der Inhalt wird gemeinsam erarbeitet.</Muted></View>}
      {!collapsed[chapter.id] && children.map(child => renderChapter(child, depth + 1))}
    </View>;
  };
  return <Page><Muted>FACH</Muted><Heading>{subject?.title ?? 'Fach'}</Heading><Body style={{ color: colors.muted }}>{subject?.subtitle}</Body>
    <Panel><Row><BookOpen size={18} color={colors.accent} /><Muted>Inhaltsverzeichnis</Muted></Row><Muted>Die Kapitelstruktur wächst mit deinem Wissen. Markierungen stehen direkt vor dem Thema.</Muted></Panel>
    <View>{nodes.filter(node => !node.parentId).map(chapter => renderChapter(chapter))}</View>
    <Muted>Vorläufige Themenstruktur · Die vollständige Fachgliederung arbeiten wir gemeinsam aus.</Muted>
  </Page>;
}

const styles = StyleSheet.create({ subject: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18, borderWidth: 1, borderRadius: 18, minHeight: 110 }, icon: { width: 45, height: 45, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, subjectName: { fontSize: 18, fontWeight: '600', lineHeight: 24 }, chapter: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 64, paddingVertical: 14, borderBottomWidth: 1 } });
