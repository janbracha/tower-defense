import { describe, expect, it } from 'vitest';
import { createBattle, mitigateDamage, Path, replayBattle, sellRefund, type Battle } from './index';
import { fixtureContent, gruntDef } from './test-content';

function runTicks(battle: Battle, ticks: number): void {
  for (let i = 0; i < ticks; i += 1) battle.step();
}

function runUntilOver(battle: Battle, maxTicks = 6000): void {
  while (battle.state.status === 'running' && battle.state.tick < maxTicks) battle.step();
}

describe('Path', () => {
  const path = new Path([
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 4, y: 3 },
  ]);

  it('measures its length', () => {
    expect(path.length).toBe(7);
  });

  it('interpolates along segments and clamps', () => {
    expect(path.positionAt(2)).toEqual({ x: 2, y: 0 });
    expect(path.positionAt(5.5)).toEqual({ x: 4, y: 1.5 });
    expect(path.positionAt(-1)).toEqual({ x: 0, y: 0 });
    expect(path.positionAt(99)).toEqual({ x: 4, y: 3 });
  });
});

describe('damage mitigation', () => {
  it('armor reduces physical damage only', () => {
    expect(mitigateDamage(55, 'physical', 20)).toBe(35);
    expect(mitigateDamage(55, 'arcane', 20)).toBe(55);
    expect(mitigateDamage(55, 'frost', 20)).toBe(55);
  });

  it('never drops below 10% of the raw damage', () => {
    expect(mitigateDamage(10, 'physical', 100)).toBe(1);
  });
});

describe('waves and lives', () => {
  it('lets an undefended battle leak and lose', () => {
    const battle = createBattle(fixtureContent({ startLives: 2 }), 1);
    runUntilOver(battle);
    const result = battle.result();
    expect(result?.outcome).toBe('defeat');
    expect(result?.livesLeft).toBe(0);
    expect(result?.wavesCleared).toBe(0);
  });

  it('does not start a wave before the break ends', () => {
    const battle = createBattle(fixtureContent(), 1);
    runTicks(battle, 30);
    expect(battle.state.wave).toBe(0);
    expect(battle.state.enemies).toHaveLength(0);
    runTicks(battle, 40);
    expect(battle.state.wave).toBe(1);
  });

  it('spawns enemies at the configured interval', () => {
    const battle = createBattle(fixtureContent(), 1);
    expect(battle.submit({ type: 'startWave' }).ok).toBe(true);
    battle.step();
    expect(battle.state.enemies).toHaveLength(1);
    runTicks(battle, 14);
    expect(battle.state.enemies).toHaveLength(1);
    runTicks(battle, 2);
    expect(battle.state.enemies).toHaveLength(2);
  });

  it('a leaking enemy costs its threat in lives', () => {
    const heavy = { ...gruntDef, threat: 3 };
    const content = fixtureContent({
      enemies: [heavy],
      waves: [{ groups: [{ enemyId: 'grunt', count: 1 }] }],
    });
    const battle = createBattle(content, 1);
    battle.submit({ type: 'startWave' });
    runUntilOver(battle);
    expect(battle.state.lives).toBe(2);
    expect(battle.result()?.outcome).toBe('victory');
  });

  it('moves enemies at their speed (10 tiles at 2 tiles/s is 5 s)', () => {
    const battle = createBattle(fixtureContent(), 1);
    battle.submit({ type: 'startWave' });
    runTicks(battle, 31);
    const first = battle.state.enemies[0];
    expect(first?.s).toBeCloseTo(2, 5);
    expect(first?.x).toBeCloseTo(2, 5);
  });

  it('flyers take the straight line', () => {
    const wisp = { ...gruntDef, id: 'wisp', flying: true };
    const content = fixtureContent({
      enemies: [wisp],
      waves: [{ groups: [{ enemyId: 'wisp', count: 1 }] }],
    });
    const battle = createBattle(content, 1);
    battle.submit({ type: 'startWave' });
    runTicks(battle, 31);
    expect(battle.state.enemies[0]?.x).toBeCloseTo(2, 5);
  });

  it('rejects unknown enemies in waves', () => {
    const content = fixtureContent({ waves: [{ groups: [{ enemyId: 'nope', count: 1 }] }] });
    expect(() => createBattle(content, 1)).toThrow(/unknown enemy/);
  });

  it('pays the early call bonus, capped, and rejects a second call', () => {
    const battle = createBattle(fixtureContent(), 1);
    const before = battle.state.gold;
    expect(battle.submit({ type: 'startWave' }).ok).toBe(true);
    expect(battle.state.gold).toBe(before + 8);
    const second = battle.submit({ type: 'startWave' });
    expect(second.ok).toBe(false);
    if (!second.ok) expect(second.error).toBe('wave-in-progress');
  });
});

describe('building', () => {
  it('places a tower and spends gold', () => {
    const battle = createBattle(fixtureContent(), 1);
    expect(battle.submit({ type: 'placeTower', padId: 'a', towerId: 'arcane' }).ok).toBe(true);
    expect(battle.state.gold).toBe(200);
    expect(battle.state.towers).toHaveLength(1);
  });

  it('rejects invalid placements', () => {
    const battle = createBattle(fixtureContent({ startGold: 150 }), 1);
    const reason = (padId: string, towerId: string): string | undefined => {
      const result = battle.submit({ type: 'placeTower', padId, towerId });
      return result.ok ? undefined : result.error;
    };
    expect(reason('zzz', 'arcane')).toBe('unknown-pad');
    expect(reason('a', 'zzz')).toBe('unknown-tower');
    expect(reason('a', 'arcane')).toBeUndefined();
    expect(reason('a', 'arcane')).toBe('pad-occupied');
    expect(reason('b', 'arcane')).toBe('insufficient-gold');
  });

  it('sells for 70% of the invested gold, rounded down', () => {
    const battle = createBattle(fixtureContent(), 1);
    battle.submit({ type: 'placeTower', padId: 'a', towerId: 'arcane' });
    battle.submit({ type: 'upgradeTower', padId: 'a' });
    expect(battle.state.gold).toBe(140);
    battle.submit({ type: 'sellTower', padId: 'a' });
    expect(battle.state.gold).toBe(140 + 112);
    expect(battle.state.towers).toHaveLength(0);
    const again = battle.submit({ type: 'sellTower', padId: 'a' });
    expect(again.ok).toBe(false);
  });

  it('does not lose a coin to floating-point error (180 * 0.7)', () => {
    expect(sellRefund(180, 0.7)).toBe(126);
    expect(sellRefund(100, 0.7)).toBe(70);
    expect(sellRefund(1, 0.7)).toBe(0);
  });

  it('upgrades once and then reports max tier', () => {
    const battle = createBattle(fixtureContent(), 1);
    battle.submit({ type: 'placeTower', padId: 'a', towerId: 'arcane' });
    expect(battle.submit({ type: 'upgradeTower', padId: 'a' }).ok).toBe(true);
    expect(battle.state.towers[0]?.tier).toBe(1);
    const result = battle.submit({ type: 'upgradeTower', padId: 'a' });
    expect(result.ok ? null : result.error).toBe('max-tier');
  });

  it('rejects upgrades without enough gold', () => {
    const battle = createBattle(fixtureContent({ startGold: 130 }), 1);
    battle.submit({ type: 'placeTower', padId: 'a', towerId: 'arcane' });
    const result = battle.submit({ type: 'upgradeTower', padId: 'a' });
    expect(result.ok ? null : result.error).toBe('insufficient-gold');
  });

  it('rejects commands after the battle ends', () => {
    const battle = createBattle(fixtureContent({ startLives: 1 }), 1);
    runUntilOver(battle);
    const result = battle.submit({ type: 'placeTower', padId: 'a', towerId: 'arcane' });
    expect(result.ok ? null : result.error).toBe('battle-over');
  });
});

describe('combat', () => {
  it('a tower in range kills enemies, pays bounty and wins the battle', () => {
    const battle = createBattle(fixtureContent(), 1);
    battle.submit({ type: 'placeTower', padId: 'a', towerId: 'arcane' });
    battle.submit({ type: 'startWave' });
    runUntilOver(battle);
    const result = battle.result();
    expect(result?.outcome).toBe('victory');
    expect(result?.kills).toBe(2);
    expect(result?.livesLeft).toBe(5);
    expect(result?.wavesCleared).toBe(1);
  });

  it('ignores enemies out of range', () => {
    const battle = createBattle(fixtureContent(), 1);
    battle.submit({ type: 'placeTower', padId: 'far', towerId: 'arcane' });
    battle.submit({ type: 'startWave' });
    runUntilOver(battle);
    expect(battle.state.kills).toBe(0);
    expect(battle.state.projectiles).toHaveLength(0);
  });

  it('a piercing bolt can hit several enemies in a line', () => {
    const content = fixtureContent({
      waves: [{ groups: [{ enemyId: 'grunt', count: 3 }] }],
    });
    const slowGrunt = { ...gruntDef, speed: 0.2, hp: 30 };
    const battle = createBattle({ ...content, enemies: [slowGrunt] }, 1);
    battle.submit({ type: 'placeTower', padId: 'a', towerId: 'bolt' });
    battle.submit({ type: 'startWave' });
    runUntilOver(battle, 3000);
    expect(battle.state.kills).toBe(3);
  });

  it('frost slows enemies and the slow wears off', () => {
    const content = fixtureContent({
      waves: [{ groups: [{ enemyId: 'grunt', count: 1 }] }],
    });
    const battle = createBattle(content, 1);
    battle.submit({ type: 'placeTower', padId: 'a', towerId: 'frost' });
    battle.submit({ type: 'startWave' });
    let sawSlow = false;
    while (battle.state.status === 'running' && battle.state.tick < 3000) {
      battle.step();
      if ((battle.state.enemies[0]?.slowAmount ?? 0) > 0) sawSlow = true;
    }
    expect(sawSlow).toBe(true);
  });

  it('slow is capped by the battle-wide maximum', () => {
    const content = fixtureContent({
      waves: [{ groups: [{ enemyId: 'grunt', count: 1 }] }],
    });
    const battle = createBattle(content, 1);
    battle.submit({ type: 'startWave' });
    battle.step();
    const enemy = battle.state.enemies[0];
    if (!enemy) throw new Error('expected an enemy');
    enemy.slowAmount = 0.9;
    enemy.slowTicks = 100;
    const before = enemy.s;
    battle.step();
    expect(enemy.s - before).toBeCloseTo((2 * 0.5) / 30, 6);
  });

  it('healing auras restore wounded allies', () => {
    const warden = {
      ...gruntDef,
      id: 'warden',
      speed: 0.5,
      healAura: { radius: 3, fractionPerSecond: 0.2 },
    };
    const content = fixtureContent({
      enemies: [{ ...gruntDef, speed: 0.5 }, warden],
      waves: [
        {
          groups: [
            { enemyId: 'grunt', count: 1 },
            { enemyId: 'warden', count: 1 },
          ],
        },
      ],
    });
    const battle = createBattle(content, 1);
    battle.submit({ type: 'startWave' });
    runTicks(battle, 20);
    const wounded = battle.state.enemies[0];
    if (!wounded || battle.state.enemies.length < 2) throw new Error('expected two enemies');
    wounded.hp = 50;
    runTicks(battle, 15);
    expect(wounded.hp).toBeGreaterThan(50);
  });

  it('regeneration starts only after the idle delay', () => {
    const brute = {
      ...gruntDef,
      id: 'brute',
      speed: 0.2,
      regen: { fractionPerSecond: 0.5, idleSeconds: 1 },
    };
    const content = fixtureContent({
      enemies: [brute],
      waves: [{ groups: [{ enemyId: 'brute', count: 1 }] }],
    });
    const battle = createBattle(content, 1);
    battle.submit({ type: 'startWave' });
    battle.step();
    const enemy = battle.state.enemies[0];
    if (!enemy) throw new Error('expected an enemy');
    enemy.hp = 10;
    enemy.lastDamagedTick = battle.state.tick;
    runTicks(battle, 20);
    expect(enemy.hp).toBe(10);
    runTicks(battle, 20);
    expect(enemy.hp).toBeGreaterThan(10);
  });

  it('scales enemy HP per wave', () => {
    const content = fixtureContent({
      waves: [
        { groups: [{ enemyId: 'grunt', count: 1 }] },
        { groups: [{ enemyId: 'grunt', count: 1 }] },
      ],
    });
    const battle = createBattle(content, 1);
    battle.submit({ type: 'placeTower', padId: 'a', towerId: 'arcane' });
    battle.submit({ type: 'startWave' });
    while (battle.state.wave < 2 && battle.state.tick < 3000) battle.step();
    runTicks(battle, 2);
    expect(battle.state.enemies[0]?.maxHp).toBe(150);
  });
});

describe('determinism', () => {
  const content = fixtureContent({
    waves: [
      { groups: [{ enemyId: 'grunt', count: 4 }] },
      { groups: [{ enemyId: 'grunt', count: 6 }] },
    ],
  });

  function play(seed: number): Battle {
    const battle = createBattle(content, seed);
    battle.submit({ type: 'placeTower', padId: 'a', towerId: 'arcane' });
    battle.submit({ type: 'placeTower', padId: 'b', towerId: 'bolt' });
    battle.submit({ type: 'startWave' });
    runUntilOver(battle);
    return battle;
  }

  it('same seed and commands give the same hash and result', () => {
    const one = play(7);
    const two = play(7);
    expect(one.hash()).toBe(two.hash());
    expect(one.result()).toEqual(two.result());
  });

  it('replaying the command log reproduces the battle', () => {
    const live = play(7);
    const replay = replayBattle(content, 7, live.commandLog, 6000);
    expect(replay.hash()).toBe(live.hash());
  });

  it('hash changes as state changes', () => {
    const battle = createBattle(content, 7);
    const before = battle.hash();
    battle.step();
    expect(battle.hash()).not.toBe(before);
  });

  it('drains events once', () => {
    const battle = createBattle(content, 7);
    battle.submit({ type: 'startWave' });
    battle.step();
    expect(battle.drainEvents().map((event) => event.type)).toContain('waveStarted');
    expect(battle.drainEvents()).toHaveLength(0);
  });
});
