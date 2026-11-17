import assert from 'node:assert/strict';
import test from 'node:test';
import { parseChatMarkdown, type MarkdownNode } from '../src/services/chatMarkdown';
const flatten = (nodes: MarkdownNode[]): MarkdownNode[] => nodes.flatMap(n => [n, ...flatten(n.children)]);
test('chat renders emphasis in paragraphs and numbered lists without delimiter text', () => {
  const nodes = flatten(parseChatMarkdown('## Überblick\n\n1. **Aktiv recherchieren:** Suche *selbstständig*.\n2. **Reflexion:** Warum?'));
  assert.equal(nodes.filter(n => n.type === 'strong').length, 2);
  assert.equal(nodes.filter(n => n.type === 'em').length, 1);
  assert.equal(nodes.filter(n => n.type === 'list_item').length, 2);
  assert.equal(nodes.find(n => n.type === 'heading')?.tag, 'h2');
  assert(!nodes.filter(n => n.type === 'text').some(n => n.content.includes('**')));
});
test('chat handles nested lists, custom numbering, tables and quotes', () => {
  const nodes = flatten(parseChatMarkdown('4. vier\n   - Unterpunkt\n\n> Merke\n\n| Preis | Kosten |\n| --- | --- |\n| 80 € | 35 € |'));
  assert.equal(nodes.find(n => n.type === 'ordered_list')?.start, 4);
  for (const type of ['bullet_list', 'blockquote', 'table', 'th', 'td']) assert(nodes.some(n => n.type === type));
});
test('code, escaped asterisks, formulas and incomplete markdown keep their meaning', () => {
  const nodes = flatten(parseChatMarkdown('`**kein Fettdruck**`\n\n\\*\\*wörtlich\\*\\* und 80 * 35 = 2800\n\n**unfertig'));
  assert.equal(nodes.find(n => n.type === 'code_inline')?.content, '**kein Fettdruck**');
  assert(nodes.some(n => n.type === 'text' && n.content.includes('80 * 35 = 2800')));
  assert(nodes.some(n => n.type === 'text' && n.content.includes('**unfertig')));
});
test('HTML stays text and resource URLs cannot enter the render tree', () => {
  const nodes = flatten(parseChatMarkdown('<script>alert(1)</script>\n\n[Link](https://example.com) ![Bild](https://example.com/tracker.png)'));
  assert(!nodes.some(n => n.type.startsWith('html')));
  assert(nodes.some(n => n.type === 'text' && n.content.includes('<script>')));
  assert(!JSON.stringify(nodes).includes('tracker.png'));
});
