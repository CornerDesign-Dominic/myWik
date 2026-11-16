import assert from 'node:assert/strict';
import test from 'node:test';
import { appendChatTurn, CHAT_TTL_MS, createArticleChat, isArticleChat, isChatExpired } from '../src/services/chatLogic';

test('a chat expires exactly 72 hours after the last complete turn', () => {
  const first = createArticleChat('db', 100);
  const next = appendChatTurn(first, 'Warum?', 'Weil …', undefined, 1000);
  assert.equal(next.expiresAt, 1000 + CHAT_TTL_MS);
  assert.equal(isChatExpired(next, next.expiresAt - 1), false);
  assert.equal(isChatExpired(next, next.expiresAt), true);
});
test('the previous answer and follow-up remain verbatim in recent context', () => {
  const chat = appendChatTurn(createArticleChat('db', 100), 'Was ist DB?', 'Erlös minus variable Kosten.', undefined, 101);
  const next = appendChatTurn(chat, 'Und warum nicht Gewinn?', 'Fixkosten müssen noch gedeckt werden.', undefined, 102);
  assert.equal(next.messages[1].content, 'Erlös minus variable Kosten.');
  assert.equal(next.messages[2].content, 'Und warum nicht Gewinn?');
  assert.equal(next.messages.length, 4);
});
test('compaction drops only summarized old turns and keeps twelve exact recent messages', () => {
  let chat = createArticleChat('db', 100);
  for (let i = 0; i < 10; i++) chat = appendChatTurn(chat, `Frage ${i}`, `Antwort ${i}`, undefined, 101 + i);
  const next = appendChatTurn(chat, 'Nachfrage', 'Antwort', 'Gesicherter älterer Kontext', 200);
  assert.equal(next.summary, 'Gesicherter älterer Kontext');
  assert.equal(next.messages.length, 14);
  assert.equal(next.messages[0].content, 'Frage 4');
  assert.equal(next.messages.at(-2)?.content, 'Nachfrage');
});
test('expired context does not reappear when appending a new turn', () => {
  const first = appendChatTurn(createArticleChat('db', 0), 'Alte Frage', 'Alt', undefined, 1);
  const next = appendChatTurn(first, 'Neu', 'Neue Antwort', undefined, first.expiresAt);
  assert.equal(next.messages.length, 2);
  assert.equal(next.summary, '');
});
test('cached chat must match requested article and valid message structure', () => {
  const chat = createArticleChat('db', 0);
  assert.equal(isArticleChat(chat, 'db'), true);
  assert.equal(isArticleChat(chat, 'other'), false);
  assert.equal(isArticleChat({ ...chat, messages: [{ role: 'system', content: 'x' }] }, 'db'), false);
});
