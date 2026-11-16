import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ReminderCategory, UserSettings } from '../types';
import { reminderDates } from './reminderSchedule';
export { reminderDates } from './reminderSchedule';

export type ReminderResult = { state: 'scheduled' | 'denied' | 'web' | 'error'; message: string; count: number };
export type ReminderAvailability = { recommendations: number; news: number };
const namespace = 'mywik-reminder-v1';
let operation: Promise<unknown> = Promise.resolve();
function serialize<T>(task: () => Promise<T>): Promise<T> {
  const next = operation.catch(() => undefined).then(task);
  operation = next;
  return next;
}
const categories: ReminderCategory[] = ['learning', 'recommendations', 'news'];
const copy: Record<ReminderCategory, { title: string; body: string; route: string }> = {
  learning: { title: 'Ein wenig Zeit für dein Wissen?', body: 'Du entscheidest, welches Thema heute zu dir passt.', route: 'subjects' },
  recommendations: { title: 'MeiWik hat etwas für dich', body: 'Deine Lernempfehlungen warten auf dich. Schau hinein, wenn es gerade passt.', route: 'recommendations' },
  news: { title: 'Neues in myWik', body: 'Es gibt neue Inhalte in deiner Wissenssammlung.', route: 'subjects' },
};

export async function clearReminders(): Promise<void> {
  if (Platform.OS === 'web') return;
  await serialize(async () => {
    const notifications = await import('expo-notifications');
    const scheduled = await notifications.getAllScheduledNotificationsAsync();
    await Promise.all(scheduled.filter(item => item.content.data?.namespace === namespace)
      .map(item => notifications.cancelScheduledNotificationAsync(item.identifier)));
  });
}

/** Rebuild on foreground/settings changes. 18 occurrences per category keeps iOS below its 64-request limit. */
export async function syncReminders(
  settings: UserSettings,
  availability: ReminderAvailability,
  ownerKey: string,
  requestPermission = false,
): Promise<ReminderResult> {
  if (Platform.OS === 'web') return { state: 'web', message: 'Erinnerungen funktionieren in der installierten Android-/iOS-App.', count: 0 };
  return serialize(async () => {
  try {
    const notifications = await import('expo-notifications');
    const enabled = categories.filter(category => settings.reminders[category].enabled &&
      (category === 'learning' || availability[category] > 0));
    let permissions = await notifications.getPermissionsAsync();
    if (enabled.length && !permissions.granted && requestPermission) permissions = await notifications.requestPermissionsAsync();
    const scheduled = (await notifications.getAllScheduledNotificationsAsync()).filter(item => item.content.data?.namespace === namespace);
    if (enabled.length && !permissions.granted) {
      await Promise.all(scheduled.map(item => notifications.cancelScheduledNotificationAsync(item.identifier)));
      return { state: 'denied', message: 'Benachrichtigungen sind nicht erlaubt. Du kannst sie in den Handy-Einstellungen für myWik freigeben.', count: 0 };
    }
    if (Platform.OS === 'android') {
      await notifications.setNotificationChannelAsync('learning', { name: 'Lernen mit myWik', importance: notifications.AndroidImportance.DEFAULT });
    }
    const wanted: { category: ReminderCategory; date: Date }[] = [];
    for (const category of enabled) {
      const setting = settings.reminders[category];
      const signature = JSON.stringify(setting);
      const storageKey = `${namespace}:cadence:${ownerKey}:${category}`;
      let cadence: { signature: string; anchor: string } | null = null;
      try { cadence = JSON.parse(await AsyncStorage.getItem(storageKey) ?? 'null'); } catch { /* Rebuild an invalid local schedule. */ }
      const oldAnchor = cadence?.signature === signature ? new Date(cadence.anchor) : undefined;
      const dates = reminderDates(setting, new Date(), 18, oldAnchor && Number.isFinite(oldAnchor.getTime()) ? oldAnchor : undefined);
      if (!oldAnchor || cadence?.signature !== signature) await AsyncStorage.setItem(storageKey, JSON.stringify({ signature, anchor: dates[0].toISOString() }));
      wanted.push(...dates.map(date => ({ category, date })));
    }
    const scheduleKey = (category: unknown, at: unknown) => `${category}:${at}`;
    const wantedKeys = new Set(wanted.map(item => scheduleKey(item.category, item.date.getTime())));
    const retained = new Set<string>();
    for (const item of scheduled) {
      const data = item.content.data;
      const key = scheduleKey(data?.category, data?.scheduledForMs);
      if (data?.ownerKey !== ownerKey || !wantedKeys.has(key) || retained.has(key)) await notifications.cancelScheduledNotificationAsync(item.identifier);
      else retained.add(key);
    }
    for (const { category, date } of wanted) {
        if (retained.has(scheduleKey(category, date.getTime()))) continue;
        await notifications.scheduleNotificationAsync({
          content: {
            title: copy[category].title,
            body: copy[category].body,
            data: { namespace, category, ownerKey, scheduledForMs: date.getTime(), route: copy[category].route },
          },
          trigger: { type: notifications.SchedulableTriggerInputTypes.DATE, date, channelId: 'learning' },
        });
    }
    const count = wanted.length;
    return { state: 'scheduled', message: count ? 'Erinnerungen sind auf diesem Gerät eingeplant.' : 'Aktuell sind keine Erinnerungen eingeplant.', count };
  } catch {
    return { state: 'error', message: 'Erinnerungen konnten auf diesem Gerät nicht eingerichtet werden. Bitte in der installierten App erneut versuchen.', count: 0 };
  }
  });
}
