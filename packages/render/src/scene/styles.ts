import type { DamageType } from '@gotn/content-schema';

export const COLORS = {
  ground: 0x1d3a26,
  grid: 0xffffff,
  pathEdge: 0x4a3a22,
  pathFill: 0x7a6338,
  pathCenter: 0xb59a5c,
  spawn: 0x4ade80,
  nexus: 0x22d3ee,
  pad: 0xd1d5db,
  padText: '#e5e7eb',
  healthBack: 0x7f1d1d,
  healthFill: 0x22c55e,
  slow: 0x7dd3fc,
  armor: 0xcbd5e1,
  valid: 0x4ade80,
  invalid: 0xf87171,
  selection: 0xfacc15,
  podTimer: 0xfb923c,
  bossEnraged: 0xdc2626,
} as const;

export const DAMAGE_COLORS: Readonly<Record<DamageType, number>> = {
  physical: 0xf59e0b,
  arcane: 0xc084fc,
  frost: 0x38bdf8,
};

export interface EnemyStyle {
  readonly color: number;
  /** Radius in tiles. */
  readonly radius: number;
}

const ENEMY_STYLES: Readonly<Record<string, EnemyStyle>> = {
  thornling_scout: { color: 0x84cc16, radius: 0.28 },
  bark_guard: { color: 0x92400e, radius: 0.34 },
  druid_warden: { color: 0xd946ef, radius: 0.34 },
  mossback_brute: { color: 0x166534, radius: 0.46 },
  pollen_wisp: { color: 0xfde047, radius: 0.28 },
  spore_pod: { color: 0x0f766e, radius: 0.3 },
  sporemother_myra: { color: 0xa21caf, radius: 0.65 },
};

const FALLBACK_STYLE: EnemyStyle = { color: 0xef4444, radius: 0.3 };

export function enemyStyle(defId: string): EnemyStyle {
  return ENEMY_STYLES[defId] ?? FALLBACK_STYLE;
}
