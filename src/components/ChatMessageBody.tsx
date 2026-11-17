import React, { useMemo } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import { parseChatMarkdown, type MarkdownNode } from '../services/chatMarkdown';
import { useTheme } from './ui';

/** Shared native rendering on Android, iOS and web; no HTML, webviews or remote images. */
export function ChatMessageBody({ content }: { content: string }) {
  const { colors } = useTheme();
  const nodes = useMemo(() => parseChatMarkdown(content), [content]);
  const mono = Platform.OS === 'ios' ? 'Menlo' : 'monospace';
  const inline = (items: MarkdownNode[]): React.ReactNode[] => items.map((n, key) => {
    const children = inline(n.children);
    switch (n.type) {
      case 'text': return n.content;
      case 'softbreak': case 'hardbreak': return '\n';
      case 'strong': return <Text key={key} style={{ fontWeight: '700' }}>{children}</Text>;
      case 'em': return <Text key={key} style={{ fontStyle: 'italic' }}>{children}</Text>;
      case 's': return <Text key={key} style={{ textDecorationLine: 'line-through' }}>{children}</Text>;
      case 'code_inline': return <Text key={key} style={{ fontFamily: mono, backgroundColor: colors.surface }}>{n.content}</Text>;
      // Links remain readable text. Responses cannot launch URLs or load tracking images.
      case 'link': return <Text key={key} style={{ textDecorationLine: 'underline' }}>{children}</Text>;
      case 'image': return `[Bild: ${n.content}]`;
      default: return children.length ? <Text key={key}>{children}</Text> : n.content;
    }
  });
  const blocks = (items: MarkdownNode[]): React.ReactNode[] => items.map((n, key) => {
    switch (n.type) {
      case 'inline': return <Text key={key} selectable style={{ color: colors.text, fontSize: 16, lineHeight: 26 }}>{inline(n.children)}</Text>;
      case 'heading': return <Text key={key} selectable accessibilityRole="header" style={{ color: colors.text, fontWeight: '700', fontSize: n.tag === 'h1' ? 22 : 18, lineHeight: 28 }}>{inline(n.children.flatMap(c => c.type === 'inline' ? c.children : [c]))}</Text>;
      case 'paragraph': return <View key={key}>{blocks(n.children)}</View>;
      case 'bullet_list': case 'ordered_list': return <View key={key} style={{ gap: 8 }}>{n.children.map((item, i) => <View key={i} style={{ flexDirection: 'row', gap: 8 }}><Text style={{ color: colors.text, lineHeight: 26 }}>{n.type === 'ordered_list' ? `${n.start + i}.` : '•'}</Text><View style={{ flex: 1, minWidth: 0, gap: 6 }}>{blocks(item.children)}</View></View>)}</View>;
      case 'blockquote': return <View key={key} style={{ borderLeftWidth: 3, borderLeftColor: colors.accent, paddingLeft: 10, gap: 8 }}>{blocks(n.children)}</View>;
      case 'fence': case 'code_block': return <ScrollView key={key} horizontal style={{ backgroundColor: colors.surface, borderRadius: 6 }}><Text selectable style={{ padding: 8, color: colors.text, fontFamily: mono, lineHeight: 24 }}>{n.content.trimEnd()}</Text></ScrollView>;
      case 'hr': return <View key={key} style={{ height: 1, backgroundColor: colors.border }} />;
      case 'table': return <ScrollView key={key} horizontal><View>{blocks(n.children)}</View></ScrollView>;
      case 'tr': return <View key={key} style={{ flexDirection: 'row' }}>{n.children.map((cell, i) => <View key={i} style={{ width: 160, padding: 8, borderWidth: 0.5, borderColor: colors.border }}>{blocks(cell.children)}</View>)}</View>;
      default: return <View key={key} style={{ gap: 8 }}>{blocks(n.children)}</View>;
    }
  });
  return <View style={{ gap: 10 }}>{blocks(nodes)}</View>;
}
