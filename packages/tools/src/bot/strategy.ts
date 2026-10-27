import type { Battle } from '@gotn/sim';
import { rankPads } from './coverage';

export type BuildStep =
  | { readonly kind: 'place'; readonly towerId: string }
  | { readonly kind: 'upgrade'; readonly towerId: string };

/** Called once per tick before the battle advances; submits whatever commands it wants. */
export type Strategy = (battle: Battle) => void;

/** A strategy that never does anything. */
export const idleStrategy: Strategy = () => {};

/**
 * Follows a fixed build order. Each step waits until it is affordable; towers go on
 * the free pad that covers the most route. Never calls waves early.
 */
export function buildOrderStrategy(steps: readonly BuildStep[]): Strategy {
  let next = 0;

  return (battle) => {
    const step = steps[next];
    if (!step || battle.state.status !== 'running') return;

    const { content, state } = battle;
    const tower = content.towers.find((def) => def.id === step.towerId);
    if (!tower) throw new Error(`Build order references unknown tower "${step.towerId}"`);

    if (step.kind === 'place') {
      if (state.gold < tower.cost) return;
      const taken = new Set(state.towers.map((built) => built.padId));
      const free = new Set(content.map.pads.map((pad) => pad.id).filter((id) => !taken.has(id)));
      const target = rankPads(content, tower, free)[0];
      if (!target) throw new Error('Build order ran out of pads');
      const result = battle.submit({ type: 'placeTower', padId: target.id, towerId: tower.id });
      if (result.ok) next += 1;
      return;
    }

    const candidate = state.towers.find(
      (built) => built.defId === tower.id && built.tier < tower.tiers.length - 1,
    );
    if (!candidate) throw new Error(`Build order has nothing to upgrade for "${tower.id}"`);
    const cost = tower.upgradeCosts[candidate.tier] ?? Number.POSITIVE_INFINITY;
    if (state.gold < cost) return;
    const result = battle.submit({ type: 'upgradeTower', padId: candidate.padId });
    if (result.ok) next += 1;
  };
}
