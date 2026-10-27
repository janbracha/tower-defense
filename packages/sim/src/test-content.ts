import type { ContentBundle, EnemyDefinition, TowerDefinition } from '@gotn/content-schema';

/** Straight 10-tile path with simple units so expected numbers are easy to reason about. */
export const gruntDef: EnemyDefinition = {
  id: 'grunt',
  name: 'Grunt',
  hp: 100,
  speed: 2,
  armor: 0,
  threat: 1,
  bounty: 10,
  flying: false,
};

export const arcaneDef: TowerDefinition = {
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
};

export const boltDef: TowerDefinition = {
  id: 'bolt',
  name: 'Bolt',
  cost: 100,
  damageType: 'physical',
  projectile: { kind: 'bolt', speed: 30, pierce: 3 },
  tiers: [{ damage: 40, attackSpeed: 1, range: 8 }],
  upgradeCosts: [],
};

export const frostDef: TowerDefinition = {
  id: 'frost',
  name: 'Frost',
  cost: 100,
  damageType: 'frost',
  projectile: { kind: 'homing', speed: 20, pierce: 1 },
  tiers: [{ damage: 1, attackSpeed: 2, range: 6, slow: { amount: 0.4, durationSeconds: 1 } }],
  upgradeCosts: [],
};

export function fixtureContent(
  overrides: {
    enemies?: readonly EnemyDefinition[];
    waves?: ContentBundle['waves'];
    startGold?: number;
    startLives?: number;
  } = {},
): ContentBundle {
  return {
    map: {
      id: 'fixture',
      name: 'Fixture',
      biome: 'test',
      size: { x: 10, y: 4 },
      startGold: overrides.startGold ?? 300,
      startLives: overrides.startLives ?? 5,
      path: [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
      ],
      pads: [
        { id: 'a', position: { x: 5, y: 1 } },
        { id: 'b', position: { x: 2, y: 1 } },
        { id: 'far', position: { x: 5, y: 30 } },
      ],
    },
    towers: [arcaneDef, boltDef, frostDef],
    enemies: overrides.enemies ?? [gruntDef],
    waves: overrides.waves ?? [{ groups: [{ enemyId: 'grunt', count: 2 }] }],
    rules: {
      breakSeconds: 2,
      spawnIntervalSeconds: 0.5,
      hpScalePerWave: 0.5,
      waveBonusBase: 20,
      waveBonusPerWave: 2,
      earlyCallBonusPerSecond: 5,
      earlyCallBonusMax: 8,
      sellRefundRatio: 0.7,
      defaultMaxSlow: 0.5,
    },
  };
}
