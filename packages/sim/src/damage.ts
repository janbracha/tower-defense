import type { DamageType } from '@gotn/content-schema';

export const ENEMY_RADIUS = 0.3;
export const HOMING_HIT_RADIUS = 0.15;
export const BOLT_HIT_RADIUS = 0.5;
export const BOLT_EXTRA_RANGE = 1.5;
export const MIN_DAMAGE_FRACTION = 0.1;

/** Armor only reduces physical damage, never below 10% of the raw hit. */
export function mitigateDamage(raw: number, type: DamageType, armor: number): number {
  if (type !== 'physical') return raw;
  return Math.max(raw * MIN_DAMAGE_FRACTION, raw - armor);
}
