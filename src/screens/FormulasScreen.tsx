import React, { useDeferredValue, useMemo, useRef, useState } from 'react';
import { FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ChevronDown, ChevronUp, Search } from 'lucide-react-native';
import { Body, Button, Muted, Panel, Row, useTheme } from '../components/ui';
import { formulaTopics, formulas, type Formula, type FormulaTopic } from '../data/formulas';
import { useContentIndex } from '../services/contentSync';
import { prepareGlossarySearch } from '../services/navigation';
import type { FormulaViewState } from '../types';

const searchFormulas = prepareGlossarySearch(formulas.map(formula => ({
  term: formula.title,
  definition: [formula.topic, formula.expression, formula.note].filter(Boolean).join(' '),
  example: formula.example,
  formula,
})));

interface Props {
  initialState?: FormulaViewState;
  onArticle: (articleId: string, state: FormulaViewState) => void;
}

export function FormulasScreen({ initialState, onArticle }: Props) {
  const { colors } = useTheme();
  const catalogue = useContentIndex();
  const [query, setQuery] = useState(initialState?.query ?? '');
  const [topic, setTopic] = useState(initialState?.topic);
  const [expanded, setExpanded] = useState(initialState?.expanded);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const list = useRef<FlatList<Formula>>(null);
  const scrollOffset = useRef(initialState?.offset ?? 0);
  const pendingOffset = useRef(scrollOffset.current);
  const deferredQuery = useDeferredValue(query);
  const items = useMemo(() =>
    searchFormulas(deferredQuery)
      .map(result => result.formula)
      .filter(formula => !topic || formula.topic === topic),
    [deferredQuery, topic],
  );

  function resetScroll() {
    pendingOffset.current = 0;
    scrollOffset.current = 0;
    list.current?.scrollToOffset({ offset: 0, animated: false });
  }

  function changeQuery(value: string) {
    setQuery(value);
    resetScroll();
  }

  function chooseTopic(value?: FormulaTopic) {
    setTopic(value);
    setFiltersOpen(false);
    resetScroll();
  }

  function renderFormula({ item }: { item: Formula }) {
    const open = expanded === item.id;
    const article = open && item.articleId ? catalogue.articles.find(article => article.id === item.articleId) : undefined;
    return <Panel>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={item.title}
        accessibilityState={{ expanded: open }}
        aria-expanded={open}
        onPress={() => {
          Keyboard.dismiss();
          setExpanded(open ? undefined : item.id);
        }}
        style={styles.line}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
          <Muted>{item.topic}</Muted>
        </View>
        {open ? <ChevronUp size={18} color={colors.muted} /> : <ChevronDown size={18} color={colors.muted} />}
      </Pressable>
      <View style={[styles.formula, { backgroundColor: colors.highlight }]}>
        <Body style={{ fontWeight: '600', color: colors.accent }}>{item.expression}</Body>
      </View>
      {open && <>
        {!!item.note && <Body>{item.note}</Body>}
        <View>
          <Muted>Rechenbeispiel</Muted>
          <Body>{item.example}</Body>
        </View>
        {article && <Button title="Zum Lernartikel" onPress={() => {
          Keyboard.dismiss();
          onArticle(article.id, { query, topic, expanded, offset: scrollOffset.current });
        }} />}
      </>}
    </Panel>;
  }

  return <View style={{ flex: 1 }}>
    <View style={styles.controls}>
      <View style={[styles.search, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Search color={colors.muted} size={19} />
        <TextInput
          accessibilityLabel="Formeln durchsuchen"
          placeholder="Formel suchen …"
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={changeQuery}
          style={[styles.input, { color: colors.text }]}
        />
        {!!query && <Button title="Leeren" variant="ghost" onPress={() => changeQuery('')} />}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={topic ? `Themenfilter: ${topic}` : 'Themenfilter: Alle Themen'}
        accessibilityState={{ expanded: filtersOpen }}
        aria-expanded={filtersOpen}
        style={[styles.filter, { backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={() => {
          Keyboard.dismiss();
          setFiltersOpen(open => !open);
        }}
      >
        <Body style={{ flex: 1 }}>{topic ?? 'Alle Themen'}</Body>
        {filtersOpen ? <ChevronUp size={18} color={colors.muted} /> : <ChevronDown size={18} color={colors.muted} />}
      </Pressable>
    </View>
    <FlatList
      ref={list}
      data={items}
      renderItem={renderFormula}
      extraData={{ expanded, catalogue }}
      keyExtractor={item => item.id}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.list}
      onContentSizeChange={(_, height) => {
        if (pendingOffset.current > 0 && height > pendingOffset.current) {
          const offset = pendingOffset.current;
          pendingOffset.current = 0;
          list.current?.scrollToOffset({ offset, animated: false });
        }
      }}
      onScrollBeginDrag={() => { pendingOffset.current = 0; }}
      onScroll={event => {
        if (pendingOffset.current === 0) scrollOffset.current = event.nativeEvent.contentOffset.y;
      }}
      scrollEventThrottle={32}
      ListHeaderComponent={<>
        {filtersOpen && <Row style={{ marginBottom: 10 }}>
          <Button title="Alle Themen" variant={topic ? 'secondary' : 'primary'} onPress={() => chooseTopic()} />
          {formulaTopics.map(option =>
            <Button key={option} title={option} variant={option === topic ? 'primary' : 'secondary'} onPress={() => chooseTopic(option)} />,
          )}
        </Row>}
        <Muted style={{ marginBottom: 8 }}>
          {items.length} {items.length === 1 ? 'Formel' : 'Formeln'}
        </Muted>
      </>}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      ListEmptyComponent={<Muted>Keine passende Formel gefunden.</Muted>}
    />
  </View>;
}

const styles = StyleSheet.create({
  controls: { paddingHorizontal: 11, paddingTop: 14, gap: 8 },
  line: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 44 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderRadius: 12, paddingHorizontal: 11 },
  input: { flex: 1, minHeight: 44, minWidth: 0, fontSize: 16 },
  filter: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 44, paddingHorizontal: 11, borderWidth: 1, borderRadius: 12 },
  list: { paddingHorizontal: 11, paddingTop: 8, paddingBottom: 24 },
  title: { fontSize: 17, fontWeight: '600' },
  formula: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 9 },
});
