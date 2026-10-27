import type { ContentBundle, EnemyDefinition } from '@gotn/content-schema';
import { describe, expect, it } from 'vitest';
import { createBattle, restoreBattle, type Battle, type BattleEvent } from './index';
import { fixtureContent, gruntDef } from './test-content';

const podDef: EnemyDefinition = {
  id: 'pod',
  name: 'Pod',
  hp: 150,
  speed: 0,
  armor: 0,
  threat: 0,
  bounty: 0,
  flying: false,
  pod: { timerSeconds: 3, hatchEnemyId: 'grunt', hatchCount: 3 },
};

const bossDef: EnemyDefinition = {
  id: 'boss',
  name: 'Boss',
  hp: 100_000,
  speed: 0.5,
  armor: 10,
  threat: 20,
  bounty: 0,
  flying: false,
  maxSlow: 0.4,
  boss: {
    podEnemyId: 'pod',
    podIntervalSeconds: 1,
    phase2PodIntervalSeconds: 0.5,
    phase2HpFraction: 0.5,
    phase2Speed: 1,
    podOffset: 1.2,
    podAheadMin: 1,
    podAheadMax: 4,
  },
};

function bossContent(overrides: { boss?: Partial<EnemyDefinition>; pod?: Partial<EnemyDefinition> } = {}): ContentBundle {
  const content = fixtureContent({
    startLives: 20,
    enemies: [
      gruntDef,
      { ...podDef, ...overrides.pod },
      { ...bossDef, ...overrides.boss },
    ],
    waves: [
      { groups: [{ enemyId: 'grunt', count: 1 }] },
      { groups: [{ enemyId: 'boss', count: 1 }] },
    ],
  });
  return content;
}

/** Starts the boss wave directly by playing wave 1 through with a strong tower. */
function startBossWave(content: ContentBundle, withTower: boolean): Battle {
  const battle = createBattle(content, 1);
  if (withTower) battle.submit({ type: 'placeTower', padId: 'a', towerId: 'arcane' });
  battle.submit({ type: 'startWave' });
  let guard = 0;
  while (battle.state.wave < 2 && guard < 3000) {
    battle.step();
    guard += 1;
  }
  battle.step();
  return battle;
}

function findByDef(battle: Battle, defId: string) {
  return battle.state.enemies.filter((enemy) => enemy.defId === defId);
}

function collect(battle: Battle, ticks: number): BattleEvent[] {
  const events: BattleEvent[] = [];
  for (let i = 0; i < ticks; i += 1) {
    battle.step();
    events.push(...battle.drainEvents());
  }
  return events;
}

describe('boss encounter', () => {
  it('spawns the boss without wave HP scaling', () => {
    const battle = startBossWave(bossContent(), true);
    const [boss] = findByDef(battle, 'boss');
    expect(boss?.maxHp).toBe(100_000);
  });

  it('drops pods beside the path a little ahead of the boss', () => {
    const battle = startBossWave(bossContent(), false);
    collect(battle, 31);
    const [boss] = findByDef(battle, 'boss');
    const [pod] = findByDef(battle, 'pod');
    if (!boss || !pod) throw new Error('expected a boss and a pod');
    expect(Math.abs(pod.y)).toBeCloseTo(1.2, 5);
    expect(pod.x).toBeGreaterThanOrEqual(boss.s + 1 - 1e-6);
    expect(pod.x).toBeLessThanOrEqual(boss.s + 4 + 1e-6);
    expect(pod.timerTicks).toBeGreaterThan(0);
  });

  it('hatches an unharmed pod into enemies without paying anything', () => {
    const battle = startBossWave(bossContent(), false);
    const goldBefore = battle.state.gold;
    battle.drainEvents();
    const events = collect(battle, 140);
    const types = events.map((event) => event.type);
    expect(types).toContain('podSpawned');
    expect(types).toContain('podHatched');
    expect(types).not.toContain('podDestroyed');
    expect(findByDef(battle, 'grunt').length).toBeGreaterThanOrEqual(3);
    expect(battle.state.kills).toBe(0);
    expect(battle.state.gold).toBe(goldBefore);
  });

  it('towers destroy pods before they hatch, preferring them over the boss', () => {
    const battle = startBossWave(bossContent(), true);
    const killsBefore = battle.state.kills;
    const goldBefore = battle.state.gold;
    battle.drainEvents();
    const events = collect(battle, 120);
    const terminal = events.find(
      (event) => event.type === 'podDestroyed' || event.type === 'podHatched',
    );
    expect(terminal?.type).toBe('podDestroyed');
    expect(battle.state.kills).toBe(killsBefore);
    expect(battle.state.gold).toBe(goldBefore);
  });

  it('enters phase 2 once: faster boss and quicker pods', () => {
    const battle = startBossWave(bossContent(), false);
    const [boss] = findByDef(battle, 'boss');
    if (!boss) throw new Error('expected a boss');
    boss.hp = boss.maxHp * 0.4;
    battle.drainEvents();
    const events = collect(battle, 3);
    expect(events.filter((event) => event.type === 'bossPhaseChanged')).toHaveLength(1);
    expect(boss.phase).toBe(2);

    const before = boss.s;
    battle.step();
    expect(boss.s - before).toBeCloseTo(1 / 30, 6);
    expect(collect(battle, 100).filter((event) => event.type === 'bossPhaseChanged')).toHaveLength(0);
  });

  it('caps slows on the boss at its own maximum', () => {
    const battle = startBossWave(bossContent(), false);
    const [boss] = findByDef(battle, 'boss');
    if (!boss) throw new Error('expected a boss');
    boss.slowAmount = 0.9;
    boss.slowTicks = 100;
    const before = boss.s;
    battle.step();
    expect(boss.s - before).toBeCloseTo((0.5 * 0.6) / 30, 6);
  });

  it('ends in victory the moment the boss dies', () => {
    const battle = startBossWave(bossContent(), false);
    const [boss] = findByDef(battle, 'boss');
    if (!boss) throw new Error('expected a boss');
    boss.hp = 0;
    battle.step();
    expect(battle.result()?.outcome).toBe('victory');
    expect(battle.result()?.wavesCleared).toBe(2);
    expect(battle.drainEvents().map((event) => event.type)).toContain('victory');
  });

  it('ends in defeat if the boss reaches the Nexus', () => {
    const battle = startBossWave(bossContent({ boss: { speed: 20 } }), false);
    for (let i = 0; i < 100 && battle.state.status === 'running'; i += 1) battle.step();
    expect(battle.result()?.outcome).toBe('defeat');
    expect(battle.result()?.livesLeft).toBe(0);
  });
});

describe('checkpoints', () => {
  const content = fixtureContent({
    waves: [
      { groups: [{ enemyId: 'grunt', count: 3 }] },
      { groups: [{ enemyId: 'grunt', count: 4 }] },
      { groups: [{ enemyId: 'grunt', count: 5 }] },
    ],
  });

  function playToBreak(): Battle {
    const battle = createBattle(content, 9);
    battle.submit({ type: 'placeTower', padId: 'a', towerId: 'arcane' });
    battle.submit({ type: 'placeTower', padId: 'b', towerId: 'bolt' });
    battle.submit({ type: 'startWave' });
    for (let i = 0; i < 3000 && battle.state.wavesCleared < 1; i += 1) battle.step();
    return battle;
  }

  it('is only available between waves', () => {
    const battle = createBattle(content, 9);
    expect(battle.captureCheckpoint()).not.toBeNull();
    battle.submit({ type: 'startWave' });
    battle.step();
    expect(battle.captureCheckpoint()).toBeNull();
  });

  it('restores to an identical state after a JSON round trip', () => {
    const original = playToBreak();
    const saved = original.captureCheckpoint();
    if (!saved) throw new Error('expected a checkpoint');
    const restored = restoreBattle(content, JSON.parse(JSON.stringify(saved)));
    expect(restored.hash()).toBe(original.hash());
    expect(restored.state.towers).toEqual(original.state.towers);
  });

  it('continues exactly like the uninterrupted battle', () => {
    const original = playToBreak();
    const saved = original.captureCheckpoint();
    if (!saved) throw new Error('expected a checkpoint');
    const restored = restoreBattle(content, saved);

    for (const battle of [original, restored]) {
      battle.submit({ type: 'upgradeTower', padId: 'a' });
      for (let i = 0; i < 6000 && battle.state.status === 'running'; i += 1) battle.step();
    }
    expect(restored.result()).toEqual(original.result());
    expect(restored.hash()).toBe(original.hash());
  });

  it('rejects checkpoints that do not fit the content', () => {
    const saved = playToBreak().captureCheckpoint();
    if (!saved) throw new Error('expected a checkpoint');
    expect(() => restoreBattle(content, { ...saved, mapId: 'other' })).toThrow(/Invalid checkpoint/);
    expect(() => restoreBattle(content, { ...saved, wave: 99 })).toThrow(/Invalid checkpoint/);
    expect(() => restoreBattle(content, { ...saved, gold: -5 })).toThrow(/Invalid checkpoint/);
    expect(() =>
      restoreBattle(content, {
        ...saved,
        towers: [{ id: 1, padId: 'nope', defId: 'arcane', tier: 0, cooldown: 0, spent: 100 }],
      }),
    ).toThrow(/Invalid checkpoint/);
    expect(() =>
      restoreBattle(content, {
        ...saved,
        towers: [{ id: 1, padId: 'a', defId: 'arcane', tier: 7, cooldown: 0, spent: 100 }],
      }),
    ).toThrow(/Invalid checkpoint/);
  });
});
