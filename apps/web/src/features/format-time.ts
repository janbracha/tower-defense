const TICKS_PER_SECOND = 30;

export function formatTime(ticks: number): string {
  const seconds = Math.round(ticks / TICKS_PER_SECOND);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
