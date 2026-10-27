import type { ContentBundle } from '@gotn/content-schema';
import { createBattle, type Battle, type BattleResult } from '@gotn/sim';
import type { Strategy } from './strategy';

export const DEFAULT_MAX_TICKS = 60_000;

export interface PlayOptions {
  readonly seed?: number;
  readonly maxTicks?: number;
}

export interface PlayOutcome {
  readonly battle: Battle;
  /** Null when the tick budget ran out before the battle ended. */
  readonly result: BattleResult | null;
}

/** Runs a headless battle, letting `strategy` act before every tick. */
export function playBattle(
  content: ContentBundle,
  strategy: Strategy,
  options: PlayOptions = {},
): PlayOutcome {
  const maxTicks = options.maxTicks ?? DEFAULT_MAX_TICKS;
  const battle = createBattle(content, options.seed ?? 1);
  while (battle.state.status === 'running' && battle.state.tick < maxTicks) {
    strategy(battle);
    battle.step();
  }
  return { battle, result: battle.result() };
}
