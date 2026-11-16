import test from 'node:test';
import assert from 'node:assert/strict';
import { eligibleLearningMs } from '../src/services/learningClock';
import { reminderDates } from '../src/services/reminderSchedule';

test('learning clock credits actual elapsed time and stops after idle threshold', () => {
  assert.equal(eligibleLearningMs(10_000, 25_000, 10_000), 15_000);
  assert.equal(eligibleLearningMs(100_000, 200_000, 10_000), 30_000);
  assert.equal(eligibleLearningMs(200_000, 300_000, 10_000), 0);
  assert.equal(eligibleLearningMs(100, 50, 0), 0);
});

test('reminders have independent local times and intervals', () => {
  const now = new Date(2026, 10, 16, 18, 0);
  const dates = reminderDates({ enabled: true, hour: 19, minute: 30, everyDays: 3 }, now, 3);
  assert.deepEqual(dates.map(date => date.getDate()), [16, 19, 22]);
  assert.ok(dates.every(date => date.getHours() === 19 && date.getMinutes() === 30));
  assert.deepEqual(reminderDates({ enabled: false, hour: 19, minute: 30, everyDays: 1 }, now), []);
});

test('reopening on the next day preserves every-three-day cadence', () => {
  const setting = { enabled: true, hour: 19, minute: 0, everyDays: 3 };
  const original = reminderDates(setting, new Date(2026, 10, 16, 18), 3);
  const reopened = reminderDates(setting, new Date(2026, 10, 17, 18), 3, original[0]);
  assert.deepEqual(reopened.map(date => date.getDate()), [19, 22, 25]);
  const reopenedAgain = reminderDates(setting, new Date(2026, 10, 20, 18), 3, original[0]);
  assert.deepEqual(reopenedAgain.map(date => date.getDate()), [22, 25, 28]);
});

test('a weekly cadence handles month and year boundaries', () => {
  const dates = reminderDates({ enabled: true, hour: 11, minute: 0, everyDays: 7 }, new Date(2026, 11, 28, 12), 3);
  assert.deepEqual(dates.map(date => [date.getFullYear(), date.getMonth() + 1, date.getDate()]), [[2026, 12, 29], [2027, 1, 5], [2027, 1, 12]]);
});

test('calendar reminders retain local time over daylight-saving changes', () => {
  const previousZone = process.env.TZ;
  process.env.TZ = 'Europe/Berlin';
  try {
    const dates = reminderDates({ enabled: true, hour: 19, minute: 15, everyDays: 3 }, new Date(2027, 9, 29, 18), 3);
    assert.deepEqual(dates.map(date => date.getHours()), [19, 19, 19]);
    assert.deepEqual(dates.map(date => date.getMinutes()), [15, 15, 15]);
    assert.notEqual(dates[0].getTimezoneOffset(), dates[1].getTimezoneOffset());
  } finally {
    if (previousZone === undefined) delete process.env.TZ;
    else process.env.TZ = previousZone;
  }
});
