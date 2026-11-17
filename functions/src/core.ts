export const MAX_RECENT_MESSAGES = 16;
export const MAX_USER_TEXT = 4000;
export const MAX_SUMMARY = 6000;
export const MAX_OUTPUT_TOKENS = 2200;
export type Action = 'chat' | 'compact' | 'flashcard' | 'flashcards' | 'check_card' | 'practice';
export interface Turn { role: 'user' | 'assistant'; content: string }
export interface Input { action: Action; articleId: string; sectionId?: string; message: string; summary: string; messages: Turn[]; selectedText: string; generationMode?: 'new'|'improve'; subjectId?: string; card?: {id?: string; front: string; back: string}; existingCards?: Array<{id: string; front: string; back: string}> }
export interface TrustedArticle { id: string; title: string; subjectId: string; intro: string; number: string; sections: Array<{ id: string; title: string; paragraphs: Array<Array<{ text: string }>>; tabs?: Array<{ title: string; content: string }>; hint?: { title: string; content: string } }> }
export function parseInput(raw: unknown): Input {
  if (!raw || typeof raw !== 'object') throw new Error('Ungültige Anfrage.');
  const r = raw as Record<string, unknown>;
  if (!['chat', 'compact', 'flashcard', 'flashcards', 'check_card', 'practice'].includes(String(r.action))) throw new Error('Ungültige Aktion.');
  const text = (key: string, max: number, required = false) => {
    const value = r[key] ?? '';
    if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new Error(`Ungültiges Feld: ${key}`);
    return value.trim();
  };
  const articleId = text('articleId', 160, true);
  if (!/^[a-zA-Z0-9_-]+$/.test(articleId)) throw new Error('Ungültiger Artikel.');
  const messages = r.messages ?? [];
  if (!Array.isArray(messages) || messages.length > MAX_RECENT_MESSAGES) throw new Error('Zu viele Nachrichten.');
  const parsed = messages.map((m): Turn => {
    if (!m || typeof m !== 'object' || !['user', 'assistant'].includes(m.role) || typeof m.content !== 'string' || m.content.length > 12000) throw new Error('Ungültiger Gesprächsverlauf.');
    return { role: m.role, content: m.content };
  });
  const input: Input = { action: r.action as Action, articleId, sectionId: text('sectionId', 160) || undefined, message: text('message', MAX_USER_TEXT, r.action === 'chat'), summary: text('summary', MAX_SUMMARY), messages: parsed, selectedText: text('selectedText', 8000) };
  if (r.generationMode !== undefined && !['new','improve'].includes(String(r.generationMode))) throw new Error('Ungültiger Erstellungsmodus.');
  input.generationMode = r.generationMode as 'new'|'improve'|undefined;
  input.subjectId = text('subjectId', 160) || undefined;
  const card = r.card;
  if (card !== undefined) {
    if (!card || typeof card !== 'object') throw new Error('Ungültige Karte.');
    const c = card as Record<string, unknown>;
    if (typeof c.front !== 'string' || !c.front.trim() || c.front.length > 1500 || typeof c.back !== 'string' || !c.back.trim() || c.back.length > 6000 || (c.id !== undefined && (typeof c.id !== 'string' || c.id.length > 250))) throw new Error('Ungültige Karte.');
    input.card = {front:c.front,back:c.back,...(typeof c.id === 'string' ? {id:c.id} : {})};
  }
  if (['practice','check_card'].includes(input.action) && (!input.card || !input.subjectId || (input.action === 'practice' && !input.message))) throw new Error('Karte, Fach oder Antwort fehlt.');
  if (r.existingCards !== undefined) {
    if (!Array.isArray(r.existingCards) || r.existingCards.length > 40) throw new Error('Zu viele Vergleichskarten.');
    input.existingCards = r.existingCards.map(c => {
      if (!c || typeof c.id !== 'string' || c.id.length > 250 || typeof c.front !== 'string' || c.front.length > 1500 || typeof c.back !== 'string' || c.back.length > 1000) throw new Error('Ungültige Vergleichskarte.');
      return {id:c.id,front:c.front,back:c.back};
    });
  }
  if (JSON.stringify(input).length > 80000) throw new Error('Die Anfrage ist zu groß.');
  return input;
}
export function isTrustedArticle(value: unknown): value is TrustedArticle {
  if (!value || typeof value !== 'object') return false;
  const a = value as TrustedArticle;
  return typeof a.id === 'string' && typeof a.title === 'string' && typeof a.subjectId === 'string' && typeof a.intro === 'string' && typeof a.number === 'string' && Array.isArray(a.sections) && a.sections.every(s => typeof s.id === 'string' && typeof s.title === 'string' && Array.isArray(s.paragraphs) && s.paragraphs.every(p => Array.isArray(p) && p.every(t => typeof t.text === 'string')) && (!s.tabs || (Array.isArray(s.tabs) && s.tabs.every(t => typeof t.title === 'string' && typeof t.content === 'string'))) && (!s.hint || (typeof s.hint.title === 'string' && typeof s.hint.content === 'string')));
}
export function articleText(article: TrustedArticle, sectionId?: string): string {
  const sections = sectionId ? article.sections.filter(s => s.id === sectionId) : article.sections;
  if (sectionId && !sections.length) throw new Error('Dieser Abschnitt ist nicht vorhanden.');
  const body = [article.title, article.intro, ...sections.map(s => `${s.title}\n${s.paragraphs.map(p => p.map(t => t.text).join('')).join('\n')}\n${s.tabs?.map(t => `${t.title}: ${t.content}`).join('\n') ?? ''}\n${s.hint ? `${s.hint.title}: ${s.hint.content}` : ''}`)].join('\n\n');
  if (body.length > 35000) throw new Error('Dieser Artikel ist für MeiWik zu groß; bitte einen Abschnitt auswählen.');
  return body;
}
export function utcDay(now: number): string { return new Date(now).toISOString().slice(0, 10); }
export function reserveBudget(previous: { day?: string; requests?: number; reservedTokens?: number; minute?: number; minuteRequests?: number }, now: number, tokens: number, requestLimit: number, tokenLimit: number, minuteLimit: number) {
  const day = utcDay(now), minute = Math.floor(now / 60000);
  const requests = previous.day === day ? Number(previous.requests ?? 0) : 0;
  const reservedTokens = previous.day === day ? Number(previous.reservedTokens ?? 0) : 0;
  const minuteRequests = previous.minute === minute ? Number(previous.minuteRequests ?? 0) : 0;
  if (requests >= requestLimit || reservedTokens + tokens > tokenLimit || minuteRequests >= minuteLimit) throw new Error('Das MeiWik-Verbrauchslimit ist erreicht. Bitte später erneut versuchen.');
  return { day, requests: requests + 1, reservedTokens: reservedTokens + tokens, minute, minuteRequests: minuteRequests + 1, updatedAt: now };
}
