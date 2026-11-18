import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, BookOpen, House, Layers, Search, Settings } from 'lucide-react-native';
import { useTheme } from './ui';

const shortcuts = [
  { id: 'home', label: 'Start', icon: House },
  { id: 'subjects', label: 'Fächer', icon: BookOpen },
  { id: 'glossary', label: 'Suche', icon: Search },
  { id: 'cards', label: 'Karteikarten', icon: Layers },
  { id: 'meiwik', label: 'MeiWik', icon: null },
] as const;
export type Shortcut = (typeof shortcuts)[number]['id'];
const appIcon = require('../../assets/app-icon-tortoise-a.png');

export function AppHeader({ title, onBack }: { title: string; onBack?: () => void }) {
  const { colors } = useTheme();
  return <View style={[styles.header, { borderColor: colors.border }]} testID="page-header">
    {onBack && <Pressable accessibilityRole="button" accessibilityLabel="Zurück" onPress={onBack} style={styles.back}>
      <ArrowLeft size={24} color={colors.text} />
    </Pressable>}
    <Text accessibilityRole="header" numberOfLines={2} style={[styles.title, { color: colors.text }]}>{title}</Text>
  </View>;
}

export function BottomNavigation({ active, onSelect, onSettings }: {
  active?: Shortcut;
  onSelect: (shortcut: Shortcut) => void;
  onSettings?: () => void;
}) {
  const { colors } = useTheme();
  return <SafeAreaView edges={['bottom']} testID="bottom-safe-area" style={{ backgroundColor: colors.surface }}>
    {onSettings && <View style={[styles.settingsFrame, { borderColor: colors.border }]}>
      <Pressable accessibilityRole="button" accessibilityLabel="Einstellungen" onPress={onSettings} style={({ pressed }) => [styles.settings, { opacity: pressed ? 0.7 : 1 }]}>
        <Settings size={18} color={colors.muted} />
        <Text style={{ color: colors.text, fontSize: 14, fontWeight: '600' }}>Einstellungen</Text>
      </Pressable>
    </View>}
    <View style={{ borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.border }}>
      <View accessibilityRole="tablist" accessibilityLabel="Schnellmenü" style={styles.tabs}>
        {shortcuts.map(({ id, label, icon: Icon }) => {
          const selected = active === id;
          const color = selected ? colors.accent : colors.muted;
          return <Pressable key={id} accessibilityRole="tab" accessibilityLabel={label} aria-selected={selected} accessibilityState={{ selected }}
            onPress={() => onSelect(id)} style={({ pressed }) => [styles.tab, { opacity: pressed ? 0.7 : 1 }]}>
            <View style={[styles.icon, selected && { backgroundColor: colors.accentSoft }]}>
              {Icon ? <Icon size={22} color={color} strokeWidth={selected ? 2.2 : 1.8} /> :
                <Image testID="meiwik-app-icon" source={appIcon} accessible={false} style={styles.appIcon} />}
            </View>
            <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8} maxFontSizeMultiplier={1.2}
              style={[styles.label, { color, fontWeight: selected ? '700' : '500' }]}>{label}</Text>
          </Pressable>;
        })}
      </View>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  header: { minHeight: 55, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 11, paddingVertical: 5, borderBottomWidth: StyleSheet.hairlineWidth },
  back: { width: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, fontSize: 21, lineHeight: 26, fontWeight: '700', letterSpacing: -0.4 },
  settingsFrame: { borderTopWidth: StyleSheet.hairlineWidth },
  settings: { minHeight: 44, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingHorizontal: 20 },
  tabs: { alignSelf: 'center', width: '100%', maxWidth: 620, flexDirection: 'row', paddingHorizontal: 3, paddingBottom: 3 },
  tab: { flex: 1, minWidth: 0, minHeight: 57, alignItems: 'center', justifyContent: 'center', gap: 1, paddingHorizontal: 1, paddingVertical: 4 },
  icon: { width: 44, height: 29, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  appIcon: { width: 24, height: 24, borderRadius: 6 },
  label: { fontSize: 11, lineHeight: 15, textAlign: 'center' },
});
