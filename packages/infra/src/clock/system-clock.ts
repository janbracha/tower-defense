import type { Clock } from '@gotn/app';

export class SystemClock implements Clock {
  nowMs(): number {
    return Date.now();
  }
}
