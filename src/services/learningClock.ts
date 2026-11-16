export const LEARNING_IDLE_MS = 120_000;
/** Actual foreground elapsed time, clamped at two minutes after the last interaction. */
export function eligibleLearningMs(from: number, to: number, lastInteraction: number): number {
  return Math.max(0, Math.min(to, lastInteraction + LEARNING_IDLE_MS) - from);
}
