import AsyncStorage from '@react-native-async-storage/async-storage';
import { emptySnapshot, isLocalSnapshot, type LocalSnapshot } from './syncModel';

const keyFor = (uid: string | null) => `mywik.user.v1.${uid ?? 'guest'}`;
const chains = new Map<string, Promise<void>>();
export async function loadSnapshot(uid: string | null): Promise<LocalSnapshot> {
  const key = keyFor(uid);
  await chains.get(key);
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return emptySnapshot();
  let parsed: LocalSnapshot;
  try { parsed = JSON.parse(raw) as LocalSnapshot; }
  catch { throw new Error('Die lokalen Lerndaten konnten nicht gelesen werden. Sie wurden nicht überschrieben.'); }
  if (!isLocalSnapshot(parsed)) {
    throw new Error('Das lokale Datenformat wird nicht unterstützt. Die gespeicherten Daten bleiben erhalten.');
  }
  return parsed;
}
/** Serialize writes so a slow earlier save cannot overwrite a later one. */
export function persistSnapshot(uid: string | null, snapshot: LocalSnapshot): Promise<void> {
  const key = keyFor(uid);
  const payload = JSON.stringify(snapshot);
  const next = (chains.get(key) ?? Promise.resolve()).catch(() => {}).then(() => AsyncStorage.setItem(key,payload));
  chains.set(key,next);
  return next;
}
