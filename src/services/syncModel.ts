import { unclearCompletion } from './learningProgress';
import { calendarDaysAfter } from './learningClock';
import type { UserData, UserSettings, ArticleProgress } from '../types';

export type EntityKind = 'progress' | 'note' | 'card' | 'session' | 'visit' | 'later' | 'recommendation' | 'settings';
export interface SyncEntity {
  kind: EntityKind;
  entityId: string;
  value: unknown;
  updatedAt: number;
  revision: string;
  deleted: boolean;
}
export interface LocalSnapshot { schema: 1; entries: Record<string, SyncEntity>; outbox: Record<string, SyncEntity>; conflicts?: Record<string, SyncEntity>; bases?: Record<string,string> }
export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'system',
  reminders: {
    learning: { enabled: false, hour: 19, minute: 0, everyDays: 3 },
    recommendations: { enabled: false, hour: 18, minute: 0, everyDays: 1 },
    news: { enabled: false, hour: 11, minute: 0, everyDays: 7 },
  },
};
export const emptySnapshot = (): LocalSnapshot => ({ schema: 1, entries: {}, outbox: {} });
export const entityKey = (kind: EntityKind, id: string) => `${kind}_${encodeURIComponent(id)}`;
export function newId(prefix = 'entry') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 11)}_${Math.random().toString(36).slice(2, 7)}`;
}
/** Calendar days use the device's civil time, matching the reminders and displayed calendar. */
export function localDay(at = Date.now()): string {
  const d = new Date(at);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
export function makeEntity(kind: EntityKind, entityId: string, value: unknown, deleted = false, updatedAt = Date.now()): SyncEntity {
  return { kind, entityId, value: stripUndefined(value), deleted, updatedAt, revision: newId('rev') };
}
export function stripUndefined(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(v => v === undefined ? null : stripUndefined(v));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).filter(([,v]) => v !== undefined).map(([k,v]) => [k, stripUndefined(v)]));
  return value;
}
const record = (value: unknown): value is Record<string,unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const text = (value: unknown, max = 20000): value is string => typeof value === 'string' && value.length <= max;
const finite = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0;
const optionalText = (value: unknown, max = 250) => value === undefined || text(value,max);
const statusValues = ['open','unclear','working','done'];
function validReminder(value: unknown): boolean {
  return record(value) && typeof value.enabled === 'boolean'
    && Number.isInteger(value.hour) && Number(value.hour) >= 0 && Number(value.hour) <= 23
    && Number.isInteger(value.minute) && Number(value.minute) >= 0 && Number(value.minute) <= 59
    && Number.isInteger(value.everyDays) && Number(value.everyDays) >= 1 && Number(value.everyDays) <= 365;
}
/** Validate body fields before exposing locally persisted or remote JSON to UI code. */
export function isSyncEntity(value: unknown): value is SyncEntity {
  if (!record(value)) return false;
  const e = value;
  if (!text(e.kind,30) || !['progress','note','card','session','visit','later','recommendation','settings'].includes(e.kind)
    || !text(e.entityId,250) || !e.entityId.length || !text(e.revision,150) || !e.revision.length
    || !finite(e.updatedAt) || typeof e.deleted !== 'boolean' || !('value' in e)) return false;
  // Document names are ASCII-encoded and must fit Firestore's 1,500-byte limit.
  try { if (entityKey(e.kind as EntityKind,e.entityId).length > 1500) return false; }
  catch { return false; }
  if (e.deleted) return e.value === null;
  const v = e.value;
  if (e.kind === 'visit') return typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && v === e.entityId;
  if (!record(v)) return false;
  if (e.kind === 'settings') return e.entityId === 'main' && ['system','light','dark'].includes(String(v.theme))
    && record(v.reminders) && ['learning','recommendations','news'].every(k => validReminder((v.reminders as Record<string,unknown>)[k]));
  if (e.kind === 'progress') return v.articleId === e.entityId && statusValues.includes(String(v.status))
    && typeof v.starred === 'boolean' && finite(v.updatedAt) && Array.isArray(v.history) && v.history.length <= 200
    && v.history.every(h => record(h) && statusValues.includes(String(h.status)) && finite(h.at));
  if (v.id !== e.entityId || !text(v.id,250)) return false;
  if (e.kind === 'note') return text(v.articleId,250) && optionalText(v.sectionId) && text(v.text)
    && ['personal','improvement'].includes(String(v.kind)) && finite(v.updatedAt);
  if (e.kind === 'card') return text(v.subjectId,250) && text(v.front,10000) && text(v.back)
    && finite(v.updatedAt) && finite(v.nextReviewAt) && Number.isInteger(v.reviews) && Number(v.reviews) >= 0
    && ['knownCount','unknownCount','successStreak','articleVersion'].every(k => v[k] === undefined || (Number.isSafeInteger(v[k]) && Number(v[k]) >= 0))
    && optionalText(v.articleId) && optionalText(v.sectionId);
  if (e.kind === 'session') return text(v.subjectId,250) && optionalText(v.articleId) && ['article','cards'].includes(String(v.kind))
    && finite(v.seconds) && v.seconds <= 86400 && typeof v.day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v.day) && finite(v.startedAt);
  if (e.kind === 'later') return text(v.subjectId,250) && optionalText(v.articleId) && optionalText(v.sectionId)
    && text(v.sourceText,30000) && text(v.question) && text(v.answer,30000) && text(v.suspectedGap) && text(v.suggestion)
    && ['missing','wording','example','structure','depth'].includes(String(v.kind)) && ['open','done'].includes(String(v.status)) && finite(v.updatedAt);
  if (e.kind === 'recommendation') return text(v.articleId,250) && text(v.subjectId,250) && text(v.title,2000) && text(v.reason)
    && ['open','done','dismissed','snoozed'].includes(String(v.state)) && finite(v.dueAt) && finite(v.updatedAt);
  return false;
}
export function isLocalSnapshot(value: unknown, requireCoherentOutbox = true): value is LocalSnapshot {
  if (!record(value) || value.schema !== 1 || !record(value.entries) || !record(value.outbox)) return false;
  if (value.conflicts !== undefined && (!record(value.conflicts) || !Object.entries(value.conflicts).every(([key,e])=>isSyncEntity(e) && !e.deleted && ['note','card'].includes(e.kind) && key === e.revision))) return false;
  if (value.bases !== undefined && (!record(value.bases) || !Object.values(value.bases).every(v=>typeof v==='string'))) return false;
  const storedEntries = value.entries;
  if (requireCoherentOutbox && !Object.entries(value.outbox).every(([key,e])=>JSON.stringify(e)===JSON.stringify(storedEntries[key]))) return false;
  return [value.entries,value.outbox].every(entries => Object.entries(entries).every(([key,e]) => isSyncEntity(e) && key === entityKey(e.kind,e.entityId)));
}
/** Older versions could persist a remote entry beside an obsolete local outbox revision. */
export function repairSnapshot(snapshot: LocalSnapshot): LocalSnapshot {
  let changed=false;
  const next={...snapshot,entries:{...snapshot.entries},outbox:{...snapshot.outbox},bases:{...snapshot.bases},conflicts:{...snapshot.conflicts}};
  for(const [key,pending] of Object.entries(next.outbox)){
    const current=next.entries[key];
    if(JSON.stringify(current)===JSON.stringify(pending))continue;
    changed=true;
    const chosen=winner(current,pending),loser=chosen.revision===pending.revision?current:pending;
    if(loser&&!loser.deleted&&['note','card'].includes(loser.kind)&&JSON.stringify(loser.value)!==JSON.stringify(chosen.value))Object.defineProperty(next.conflicts,loser.revision,{value:loser,enumerable:true,configurable:true,writable:true});
    next.entries[key]=chosen;
    if(chosen.revision!==pending.revision){delete next.outbox[key];delete next.bases[key];}
  }
  return changed?next:snapshot;
}
export function winner(left: SyncEntity | undefined, right: SyncEntity): SyncEntity {
  if (!left) return right;
  // IDs are never reused after deletion. Explicit restoration creates a new ID.
  if (left.deleted !== right.deleted) return left.deleted ? left : right;
  if (left.updatedAt !== right.updatedAt) return left.updatedAt > right.updatedAt ? left : right;
  return left.revision >= right.revision ? left : right;
}
export function applyEntity(snapshot: LocalSnapshot, entity: SyncEntity, pending: boolean, detectConflict = true): LocalSnapshot {
  const key = entityKey(entity.kind, entity.entityId);
  const previous = snapshot.entries[key];
  const chosen = winner(previous, entity);
  const outbox = {...snapshot.outbox};
  const bases = {...snapshot.bases};
  const conflicts = {...snapshot.conflicts};
  if (!pending && detectConflict && snapshot.outbox[key] && previous && previous.revision !== entity.revision
    && bases[key] !== entity.revision && JSON.stringify(previous.value) !== JSON.stringify(entity.value)) {
    const loser = chosen.revision === previous.revision ? entity : previous;
    if (!loser.deleted && ['note','card'].includes(loser.kind) && isSyncEntity(loser)) Object.defineProperty(conflicts,loser.revision,{value:loser,enumerable:true,configurable:true,writable:true});
  }
  if (pending && chosen.revision === entity.revision) {
    if (!outbox[key]) bases[key] = previous?.revision ?? '';
    outbox[key] = chosen;
  } else if (!pending && chosen.revision === entity.revision) {
    delete outbox[key]; delete bases[key];
  }
  return {...snapshot,entries:{...snapshot.entries,[key]:chosen},outbox,bases,conflicts};
}
/** Does not clear a newer local revision created while a remote write was in flight. */
export function acknowledge(snapshot: LocalSnapshot, sent: SyncEntity, remote: SyncEntity): LocalSnapshot {
  const key = entityKey(sent.kind, sent.entityId);
  const next = applyEntity(snapshot, remote, false, remote.revision !== sent.revision);
  const outbox = { ...next.outbox }, bases = {...next.bases};
  if (outbox[key]?.revision === sent.revision) {delete outbox[key];delete bases[key];}
  else if (outbox[key]) bases[key] = remote.revision;
  return { ...next, outbox, bases };
}
export function mergeRemote(snapshot: LocalSnapshot, remote: SyncEntity[]): LocalSnapshot {
  return remote.filter(isSyncEntity).reduce((s, e) => applyEntity(s, e, false), snapshot);
}
export function materialize(snapshot: LocalSnapshot): UserData {
  const data: UserData = { progress: {}, notes: [], cards: [], sessions: [], visits: [], later: [], recommendations: [], settings: JSON.parse(JSON.stringify(DEFAULT_SETTINGS)) };
  for (const e of Object.values(snapshot.entries)) {
    if (!isSyncEntity(e) || e.deleted) continue;
    switch(e.kind) {
      case 'progress': data.progress[e.entityId] = e.value as ArticleProgress; break;
      case 'note': data.notes.push(e.value as UserData['notes'][number]); break;
      case 'card': data.cards.push(e.value as UserData['cards'][number]); break;
      case 'session': data.sessions.push(e.value as UserData['sessions'][number]); break;
      case 'visit': if (typeof e.value === 'string') data.visits.push(e.value); break;
      case 'later': data.later.push(e.value as UserData['later'][number]); break;
      case 'recommendation': data.recommendations.push(e.value as UserData['recommendations'][number]); break;
      case 'settings': {
        const settings = e.value as Partial<UserSettings>;
        data.settings = { ...data.settings, ...settings, reminders: { ...data.settings.reminders, ...settings.reminders } };
        break;
      }
    }
  }
  data.notes.sort((a,b) => b.updatedAt - a.updatedAt);
  data.cards.sort((a,b) => a.nextReviewAt - b.nextReviewAt);
  data.later.sort((a,b) => b.updatedAt - a.updatedAt);
  data.visits.sort();
  return data;
}
/** One recommendation for an unclear -> done transition, due after seven days. */
export function createRecommendations(snapshot: LocalSnapshot, articleSubjects: Record<string,string>, now = Date.now()): SyncEntity[] {
  const data = materialize(snapshot);
  const result: SyncEntity[] = [];
  for (const p of Object.values(data.progress)) {
    if (p.status !== 'done' || !articleSubjects[p.articleId]) continue;
    const doneAt=unclearCompletion(p);
    if(doneAt===undefined)continue;
    const dueAt=calendarDaysAfter(doneAt,7);
    const id = `repeat_${p.articleId}_${doneAt}`;
    if (dueAt > now || data.recommendations.some(r => r.id === id) || snapshot.entries[entityKey('recommendation',id)]) continue;
    result.push(makeEntity('recommendation',id,{
      id, articleId:p.articleId, subjectId:articleSubjects[p.articleId] ?? '',
      title:'Noch einmal gemeinsam wiederholen?',
      reason:'Dieses Kapitel war zunächst unklar und wurde anschließend abgeschlossen. Nach einer Woche lohnt sich eine kurze Wiederholung.',
      state:'open', dueAt, updatedAt:now,
    },false,now));
  }
  return result;
}
