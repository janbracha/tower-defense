import { greenwoodGateContent } from '@gotn/content-core';
import { replayBattle } from '@gotn/sim';
import { describe, expect, it } from 'vitest';
import { buildOrderStrategy, idleStrategy, playBattle, type BuildStep } from './index';

const place = (towerId: string): BuildStep => ({ kind: 'place', towerId });
const upgrade = (towerId: string): BuildStep => ({ kind: 'upgrade', towerId });

const buildOrder: readonly BuildStep[] = [
  place('arcane_tower'),
  place('ballista_post'),
  place('frost_spire'),
  upgrade('ballista_post'),
  upgrade('arcane_tower'),
  place('ballista_post'),
  upgrade('frost_spire'),
  place('arcane_tower'),
  upgrade('ballista_post'),
  place('ballista_post'),
  upgrade('arcane_tower'),
  place('frost_spire'),
  upgrade('ballista_post'),
  place('arcane_tower'),
  upgrade('frost_spire'),
  upgrade('arcane_tower'),
];

const MAX_TICKS = 60_000;

describe('Milestone A: headless play on Greenwood Gate', () => {
  it('a scripted build order beats every wave', () => {
    const { result } = playBattle(greenwoodGateContent, buildOrderStrategy(buildOrder), {
      maxTicks: MAX_TICKS,
    });
    expect(result?.outcome).toBe('victory');
    expect(result?.wavesCleared).toBe(greenwoodGateContent.waves.length);
    expect(result?.livesLeft).toBeGreaterThan(0);
  });

  it('an empty build loses', () => {
    const { result } = playBattle(greenwoodGateContent, idleStrategy, { maxTicks: MAX_TICKS });
    expect(result?.outcome).toBe('defeat');
    expect(result?.livesLeft).toBe(0);
  });

  it('a minimal build (one Arcane Tower) is not enough', () => {
    const { result } = playBattle(
      greenwoodGateContent,
      buildOrderStrategy([place('arcane_tower')]),
      { maxTicks: MAX_TICKS },
    );
    expect(result?.outcome).toBe('defeat');
  });

  it('is deterministic: same seed and strategy give identical results and hashes', () => {
    const first = playBattle(greenwoodGateContent, buildOrderStrategy(buildOrder), { seed: 42 });
    const second = playBattle(greenwoodGateContent, buildOrderStrategy(buildOrder), { seed: 42 });
    expect(second.result).toEqual(first.result);
    expect(second.battle.hash()).toBe(first.battle.hash());
  });

  it('replaying the command log reproduces the final state', () => {
    const live = playBattle(greenwoodGateContent, buildOrderStrategy(buildOrder), { seed: 7 });
    const replay = replayBattle(greenwoodGateContent, 7, live.battle.commandLog, MAX_TICKS);
    expect(replay.hash()).toBe(live.battle.hash());
    expect(replay.result()).toEqual(live.result);
  });

  it('only spends gold it has', () => {
    const { battle } = playBattle(greenwoodGateContent, buildOrderStrategy(buildOrder));
    expect(battle.state.gold).toBeGreaterThanOrEqual(0);
  });
});
