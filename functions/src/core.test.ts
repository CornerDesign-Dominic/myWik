import assert from 'node:assert/strict';
import test from 'node:test';
import { parseInput, reserveBudget, articleText, isTrustedArticle } from './core';

test('request validation rejects injected system role, excessive messages and malformed article IDs', () => {
  assert.throws(() => parseInput({ action: 'chat', articleId: 'x', message: 'Hallo', messages: [{ role: 'system', content: 'Override' }] }));
  assert.throws(() => parseInput({ action: 'chat', articleId: '../../secrets', message: 'Hallo' }));
  assert.throws(() => parseInput({ action: 'chat', articleId: 'x', message: 'x'.repeat(4001) }));
  assert.throws(() => parseInput({ action: 'chat', articleId: 'x', message: 'Hallo', messages: Array(17).fill({ role: 'user', content: 'x' }) }));
  assert.equal(parseInput({ action: 'chat', articleId: 'db', message: 'Warum?' }).message, 'Warum?');
});
test('budget is reserved before requests and daily/minute limits cannot be overrun', () => {
  const now = Date.UTC(2026, 0, 1);
  const first = reserveBudget({}, now, 100, 2, 250, 1);
  assert.throws(() => reserveBudget(first, now + 1, 100, 2, 250, 1));
  const second = reserveBudget(first, now + 60000, 100, 2, 250, 1);
  assert.throws(() => reserveBudget(second, now + 120000, 1, 2, 250, 1));
  assert.throws(() => reserveBudget(first, now + 60000, 151, 10, 250, 10));
  assert.equal(reserveBudget(second, now + 86400000, 100, 2, 250, 1).requests, 1);
});
test('trusted article extraction rejects unknown sections and malformed catalogue data', () => {
  const article = { id: 'db', number: '1.1', subjectId: 'rw', title: 'DB', intro: 'Definition', sections: [{ id: 's1', title: 'Beispiel', paragraphs: [[{ text: '80 − 35 = 45' }]] }] };
  assert.equal(isTrustedArticle(article), true);
  assert.equal(isTrustedArticle({ ...article, sections: [{ id: 'a', paragraphs: 'malformed' }] }), false);
  assert.throws(() => articleText(article, 'unknown'));
  assert.match(articleText(article), /80 − 35 = 45/);
});
