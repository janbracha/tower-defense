import type {
  ContentBundle,
  EnemyDefinition,
  PadDefinition,
  TowerDefinition,
  TowerTierDefinition,
  Vec2,
} from '@gotn/content-schema';
import type { Path } from './path';
import type { Rng } from './rng';
import type { BattleEvent, BattleState, TowerState } from './types';

/** Everything the battle rules operate on; created once per battle. */
export interface BattleContext {
  readonly content: ContentBundle;
  readonly path: Path;
  /** Length of the straight line flyers travel from spawn to Nexus. */
  readonly flightLength: number;
  readonly towerDefs: ReadonlyMap<string, TowerDefinition>;
  readonly enemyDefs: ReadonlyMap<string, EnemyDefinition>;
  readonly pads: ReadonlyMap<string, PadDefinition>;
  readonly state: BattleState;
  readonly rng: Rng;
  readonly events: BattleEvent[];
}

export function enemyDef(ctx: BattleContext, id: string): EnemyDefinition {
  const def = ctx.enemyDefs.get(id);
  if (!def) throw new Error(`Unknown enemy "${id}"`);
  return def;
}

export function towerDef(ctx: BattleContext, id: string): TowerDefinition {
  const def = ctx.towerDefs.get(id);
  if (!def) throw new Error(`Unknown tower "${id}"`);
  return def;
}

export function towerTier(ctx: BattleContext, tower: TowerState): TowerTierDefinition {
  const tier = towerDef(ctx, tower.defId).tiers[tower.tier];
  if (!tier) throw new Error(`Tower "${tower.defId}" has no tier ${tower.tier}`);
  return tier;
}

export function lerp(from: Vec2, to: Vec2, t: number): Vec2 {
  return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
}
