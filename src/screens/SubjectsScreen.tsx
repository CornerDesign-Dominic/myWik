import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { BookOpen, Building2, Calculator, Check, ChevronDown, ChevronRight, CircleHelp, Compass, Flag, Globe2, Receipt, Scale, Star, Target, Truck, Users, Workflow } from 'lucide-react-native';
import { Heading, Muted, Page, useTheme } from '../components/ui';
import { useContentIndex } from '../services/contentSync';
import { useStore } from '../state/Store';
import type { Chapter } from '../types';

const subjectIcons: Record<string, typeof BookOpen> = { target: Target, truck: Truck, building: Building2, globe: Globe2, scale: Scale, receipt: Receipt, calculator: Calculator, compass: Compass, workflow: Workflow, users: Users };

export function SubjectsScreen({ onSubject }: { onSubject: (subjectId: string) => void }) {
  const { chapters, subjects } = useContentIndex();
  const { colors } = useTheme();
  const { data } = useStore();
  return <Page><Heading>Themen</Heading>
    {subjects.map(subject => {
      const Icon = subjectIcons[subject.icon] ?? BookOpen;
      const subjectChapters = chapters.filter(chapter => chapter.subjectId === subject.id);
      const existingArticles = subjectChapters.filter(chapter => chapter.articleId);
      const completed = existingArticles.filter(chapter => data.progress[chapter.articleId!]?.status === 'done').length;
      return <Pressable key={subject.id} accessibilityRole="button" accessibilityLabel={`${subject.title}, ${existingArticles.length} Artikel verfügbar`} onPress={() => onSubject(subject.id)} style={({ pressed }) => [styles.subject, { borderColor: colors.border, backgroundColor: colors.surface, opacity: pressed ? .75 : 1 }]}>
        <View style={[styles.icon, { backgroundColor: colors.accentSoft }]}><Icon size={23} color={colors.accent} /></View>
        <View style={{ flex: 1, gap: 4 }}><Text style={[styles.subjectName, { color: colors.text }]}>{subject.title}</Text><Muted>{subject.subtitle}</Muted>{<Text style={{ color: colors.muted, fontSize: 12 }}>{existingArticles.length ? `${existingArticles.length} Artikel · ${completed} abgeschlossen` : 'Noch keine Artikel verfügbar'}</Text>}</View>
        <ChevronRight size={18} color={colors.muted} />
      </Pressable>;
    })}
  </Page>;
}

export function ChaptersScreen({ subjectId, onArticle, initialCollapsed, onCollapsedChange }: { subjectId: string; onArticle: (articleId: string) => void; initialCollapsed?:Record<string,boolean>; onCollapsedChange?:(value:Record<string,boolean>)=>void }) {
  const { chapters, subjects } = useContentIndex();
  const { colors } = useTheme();
  const { data } = useStore();
  const subject = subjects.find(item => item.id === subjectId);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(initialCollapsed??{});
  const toggle = (id:string)=>{const value={...collapsed,[id]:!collapsed[id]};setCollapsed(value);onCollapsedChange?.(value)};
  const childrenByParent = useMemo(() => {
    const tree = new Map<string | undefined, Chapter[]>();
    for (const chapter of chapters) {
      if (chapter.subjectId !== subjectId) continue;
      const siblings = tree.get(chapter.parentId) ?? [];
      siblings.push(chapter);
      tree.set(chapter.parentId, siblings);
    }
    return tree;
  }, [chapters, subjectId]);
  const visible = useMemo(() => {
    const rows: { chapter: Chapter; depth: number; hasChildren: boolean }[] = [];
    const append = (parent?: string, depth = 0) => {
      for (const chapter of childrenByParent.get(parent) ?? []) {
        const hasChildren = childrenByParent.has(chapter.id);
        rows.push({ chapter, depth, hasChildren });
        if (hasChildren && !collapsed[chapter.id]) append(chapter.id, depth + 1);
      }
    };
    append();
    return rows;
  }, [childrenByParent, collapsed]);
  const renderChapter = ({ item: { chapter, depth, hasChildren } }: { item: typeof visible[number] }) => {
    const progress = chapter.articleId ? data.progress[chapter.articleId] : undefined;
    const StatusIcon = progress?.status === 'done' ? Check : progress?.status === 'unclear' ? CircleHelp : progress?.status === 'working' ? Flag : null;
    return <Pressable accessibilityRole={chapter.articleId || hasChildren ? 'button' : 'text'} disabled={!chapter.articleId && !hasChildren} aria-expanded={hasChildren ? !collapsed[chapter.id] : undefined} accessibilityState={hasChildren ? { expanded: !collapsed[chapter.id] } : { disabled: !chapter.articleId }} onPress={() => chapter.articleId ? onArticle(chapter.articleId) : hasChildren ? toggle(chapter.id) : undefined} style={({ pressed }) => [styles.chapter, { paddingLeft: Math.min(depth, 4) * 15, borderColor: colors.border, opacity: pressed ? .65 : 1 }]}>
        <View style={{ width: 20, alignItems: 'center' }}>{StatusIcon ? <StatusIcon size={17} color={colors.accent} /> : progress?.starred ? <Star size={16} color={colors.gold} fill={colors.gold} /> : null}</View>
        <View style={{ flex: 1 }}><Text style={{ color: chapter.articleId || hasChildren ? colors.text : colors.muted, fontSize: depth ? 15 : 17, fontWeight: depth ? '500' : '600', lineHeight: 23 }}><Text style={{ color: colors.muted }}>{chapter.number} </Text>{chapter.title}</Text>{!chapter.articleId&&!hasChildren&&<Muted>Inhalt folgt</Muted>}</View>
        {progress?.starred && StatusIcon && <Star size={14} color={colors.gold} fill={colors.gold} />}
        {hasChildren ? collapsed[chapter.id] ? <ChevronRight size={17} color={colors.muted} /> : <ChevronDown size={17} color={colors.muted} /> : chapter.articleId ? <ChevronRight size={17} color={colors.muted} /> : null}
      </Pressable>;
  };
  return <FlatList data={visible} keyExtractor={row => row.chapter.id} renderItem={renderChapter}
    testID="chapter-list"
    ListHeaderComponent={<Heading>{subject?.title ?? 'Fach'}</Heading>}
    contentContainerStyle={{ paddingHorizontal: 11, paddingTop: 14, paddingBottom: 24 }}
    initialNumToRender={18} windowSize={7} />;
}

const styles = StyleSheet.create({ subject: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 13, borderWidth: 1, borderRadius: 16, minHeight: 88 }, icon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }, subjectName: { fontSize: 18, fontWeight: '600', lineHeight: 24 }, chapter: { flexDirection: 'row', alignItems: 'center', gap: 7, minHeight: 52, paddingVertical: 10, borderBottomWidth: 1 } });
