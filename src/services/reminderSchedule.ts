import type { ReminderSetting } from '../types';

/** Preserve local calendar time and an existing cadence, including across daylight-saving changes. */
export function reminderDates(setting: ReminderSetting, now = new Date(), occurrences = 18, anchor?: Date): Date[] {
  if (!setting.enabled || occurrences <= 0) return [];
  const everyDays = Math.max(1, Math.min(365, Math.round(setting.everyDays)));
  const first = new Date(anchor ?? now);
  first.setHours(Math.max(0, Math.min(23, setting.hour)), Math.max(0, Math.min(59, setting.minute)), 0, 0);
  if (anchor && first.getTime() <= now.getTime()) {
    const days = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(first.getFullYear(), first.getMonth(), first.getDate())) / 86_400_000);
    first.setDate(first.getDate() + Math.max(0, Math.floor(days / everyDays)) * everyDays);
    while (first.getTime() <= now.getTime()) first.setDate(first.getDate() + everyDays);
  } else if (!anchor && first.getTime() <= now.getTime()) {
    first.setDate(first.getDate() + 1);
  }
  return Array.from({ length: occurrences }, (_, index) => {
    const date = new Date(first);
    date.setDate(date.getDate() + index * everyDays);
    return date;
  });
}
