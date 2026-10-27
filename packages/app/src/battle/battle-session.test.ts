import type { ContentBundle } from '@gotn/content-schema';
import { describe, expect, it } from 'vitest';
import { BattleSession } from './battle-session';

const content: ContentBundle = {
  map: {
    id: 'm',
    name: 'M',
    biome: 'test',
    size: { x: 10, y: 4 },
    startGold: 250,
    startLives: 5,
    path: [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    ],
    pads: [{ id: 'a', position: { x: 5, y: 1 } }],
  },
  towers: [
    {
      id: 'arcane',
      name: 'Arcane',
      cost: 100,
      damageType: 'arcane',
      projectile: { kind: 'homing', speed: 20, pierce: 1 },
      tiers: [
        { damage: 50, attackSpeed: 2, range: 6 },
        { damage: 80, attackSpeed: 2, range: 6 },
      ],
      upgradeCosts: [60],
    },
  ],
  enemies: [
    { id: 'grunt', name: 'Grunt', hp: 100, speed: 2, armor: 0, threat: 1, bounty: 10, flying: false },
  ],
  waves: [{ groups: [{ enemyId: 'grunt', count: 2 }] }, { groups: [{ enemyId: 'grunt', count: 3 }] }],
  rules: {
    breakSeconds: 2,
    spawnIntervalSeconds: 0.5,
    hpScalePerWave: 0,
    waveBonusBase: 20,
    waveBonusPerWave: 2,
    earlyCallBonusPerSecond: 5,
    earlyCallBonusMax: 8,
    sellRefundRatio: 0.7,
    defaultMaxSlow: 0.5,
  },
};

describe('BattleSession', () => {
  it('turns elapsed time into fixed ticks', () => {
    const session = new BattleSession(content, 1);
    expect(session.advance(200)).toBe(6);
    expect(session.state.tick).toBe(6);
  });

  it('carries the remainder and exposes it as alpha', () => {
    const session = new BattleSession(content, 1);
    expect(session.advance(50)).toBe(1);
    expect(session.alpha).toBeCloseTo(0.5, 5);
  });

  it('runs twice as many ticks at 2x', () => {
    const session = new BattleSession(content, 1);
    session.setSpeed(2);
    expect(session.advance(100)).toBe(6);
  });

  it('does not advance while paused', () => {
    const session = new BattleSession(content, 1);
    session.setPaused(true);
    expect(session.advance(1000)).toBe(0);
    session.setPaused(false);
    expect(session.advance(100)).toBe(3);
  });

  it('clamps long frames', () => {
    const session = new BattleSession(content, 1);
    expect(session.advance(60_000)).toBe(7);
  });

  it('stops advancing once the battle is over', () => {
    const session = new BattleSession(content, 1);
    for (let i = 0; i < 400 && session.state.status === 'running'; i += 1) session.advance(250);
    expect(session.state.status).toBe('defeat');
    expect(session.advance(250)).toBe(0);
  });

  it('builds a view model with wave info and a stable preview', () => {
    const session = new BattleSession(content, 1);
    const first = session.view();
    expect(first.wave).toBe(0);
    expect(first.totalWaves).toBe(2);
    expect(first.gold).toBe(250);
    expect(first.breakSecondsLeft).toBeCloseTo(2, 5);
    expect(first.nextWave).toEqual([{ enemyId: 'grunt', name: 'Grunt', count: 2 }]);
    expect(session.view().nextWave).toBe(first.nextWave);
  });

  it('reports tower upgrade cost and sell value', () => {
    const session = new BattleSession(content, 1);
    session.submit({ type: 'placeTower', padId: 'a', towerId: 'arcane' });
    expect(session.view().towers).toEqual([
      { padId: 'a', defId: 'arcane', name: 'Arcane', tier: 0, upgradeCost: 60, sellValue: 70 },
    ]);
  });

  it('shows the spawn backlog during a wave', () => {
    const session = new BattleSession(content, 1);
    session.submit({ type: 'startWave' });
    session.advance(34);
    const view = session.view();
    expect(view.phase).toBe('spawning');
    expect(view.wave).toBe(1);
    expect(view.toSpawn).toBe(1);
    expect(view.enemiesAlive).toBe(1);
    expect(view.nextWave?.[0]?.count).toBe(3);
  });
});
