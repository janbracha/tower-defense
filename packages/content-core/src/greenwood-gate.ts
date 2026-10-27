import type {
  BattleRules,
  ContentBundle,
  EnemyDefinition,
  MapDefinition,
  TowerDefinition,
  WaveDefinition,
} from '@gotn/content-schema';

export const battleRules: BattleRules = {
  breakSeconds: 20,
  spawnIntervalSeconds: 0.8,
  hpScalePerWave: 0.12,
  waveBonusBase: 20,
  waveBonusPerWave: 2,
  earlyCallBonusPerSecond: 1.5,
  earlyCallBonusMax: 30,
  sellRefundRatio: 0.7,
  defaultMaxSlow: 0.6,
};

/** Starting gold of 250 is a temporary balancing baseline. */
export const greenwoodGateMap: MapDefinition = {
  id: 'greenwood_gate',
  name: 'Greenwood Gate',
  biome: 'forest',
  size: { x: 21, y: 12 },
  startGold: 250,
  startLives: 20,
  path: [
    { x: 0, y: 2 },
    { x: 9, y: 2 },
    { x: 9, y: 6 },
    { x: 3, y: 6 },
    { x: 3, y: 10 },
    { x: 14, y: 10 },
    { x: 14, y: 5 },
    { x: 19, y: 5 },
  ],
  pads: [
    { id: 'p1', position: { x: 3, y: 3.5 } },
    { id: 'p2', position: { x: 6, y: 4 } },
    { id: 'p3', position: { x: 11, y: 4 } },
    { id: 'p4', position: { x: 7.5, y: 0.5 } },
    { id: 'p5', position: { x: 1, y: 8 } },
    { id: 'p6', position: { x: 5, y: 8 } },
    { id: 'p7', position: { x: 8, y: 8 } },
    { id: 'p8', position: { x: 11.5, y: 11.5 } },
    { id: 'p9', position: { x: 16, y: 8 } },
    { id: 'p10', position: { x: 16.5, y: 3 } },
    { id: 'p11', position: { x: 12, y: 6.5 } },
    { id: 'p12', position: { x: 9, y: 11.5 } },
  ],
};

export const towers: readonly TowerDefinition[] = [
  {
    id: 'arcane_tower',
    name: 'Arcane Tower',
    cost: 100,
    damageType: 'arcane',
    projectile: { kind: 'homing', speed: 12, pierce: 1 },
    tiers: [
      { damage: 18, attackSpeed: 1.2, range: 5 },
      { damage: 27, attackSpeed: 1.2, range: 5 },
    ],
    upgradeCosts: [80],
  },
  {
    id: 'ballista_post',
    name: 'Ballista Post',
    cost: 130,
    damageType: 'physical',
    projectile: { kind: 'bolt', speed: 18, pierce: 3 },
    tiers: [
      { damage: 55, attackSpeed: 0.6, range: 7.5 },
      { damage: 82, attackSpeed: 0.6, range: 7.5 },
    ],
    upgradeCosts: [105],
  },
  {
    id: 'frost_spire',
    name: 'Frost Spire',
    cost: 120,
    damageType: 'frost',
    projectile: { kind: 'homing', speed: 10, pierce: 1 },
    tiers: [
      { damage: 10, attackSpeed: 1.0, range: 5, slow: { amount: 0.3, durationSeconds: 2 } },
      { damage: 15, attackSpeed: 1.0, range: 5, slow: { amount: 0.4, durationSeconds: 2 } },
    ],
    upgradeCosts: [95],
  },
];

export const enemies: readonly EnemyDefinition[] = [
  {
    id: 'thornling_scout',
    name: 'Thornling Scout',
    hp: 80,
    speed: 1.6,
    armor: 0,
    threat: 1,
    bounty: 8,
    flying: false,
  },
  {
    id: 'bark_guard',
    name: 'Bark Guard',
    hp: 220,
    speed: 0.8,
    armor: 20,
    threat: 1,
    bounty: 20,
    flying: false,
  },
  {
    id: 'druid_warden',
    name: 'Druid Warden',
    hp: 160,
    speed: 0.9,
    armor: 0,
    threat: 2,
    bounty: 18,
    flying: false,
    healAura: { radius: 2.5, fractionPerSecond: 0.04 },
  },
  {
    id: 'mossback_brute',
    name: 'Mossback Brute',
    hp: 650,
    speed: 0.7,
    armor: 10,
    threat: 3,
    bounty: 55,
    flying: false,
    regen: { fractionPerSecond: 0.03, idleSeconds: 3 },
  },
  {
    id: 'pollen_wisp',
    name: 'Pollen Wisp',
    hp: 100,
    speed: 1.4,
    armor: 0,
    threat: 2,
    bounty: 12,
    flying: true,
  },
  {
    id: 'spore_pod',
    name: 'Spore Pod',
    hp: 150,
    speed: 0,
    armor: 0,
    threat: 0,
    bounty: 0,
    flying: false,
    pod: { timerSeconds: 8, hatchEnemyId: 'thornling_scout', hatchCount: 3 },
  },
  {
    id: 'sporemother_myra',
    name: 'Sporemother Myra',
    hp: 6000,
    speed: 0.5,
    armor: 10,
    threat: 20,
    bounty: 0,
    flying: false,
    maxSlow: 0.4,
    boss: {
      podEnemyId: 'spore_pod',
      podIntervalSeconds: 15,
      phase2PodIntervalSeconds: 10,
      phase2HpFraction: 0.5,
      phase2Speed: 0.65,
      podOffset: 1.2,
      podAheadMin: 1,
      podAheadMax: 4,
    },
  },
];

const T = 'thornling_scout';
const B = 'bark_guard';
const D = 'druid_warden';
const M = 'mossback_brute';
const W = 'pollen_wisp';
const MYRA = 'sporemother_myra';

/** Waves 1-14 are regular; wave 15 is the Sporemother Myra boss encounter. */
export const waves: readonly WaveDefinition[] = [
  { groups: [{ enemyId: T, count: 6 }] },
  { groups: [{ enemyId: T, count: 8 }] },
  {
    groups: [
      { enemyId: T, count: 4 },
      { enemyId: B, count: 4 },
    ],
  },
  { groups: [{ enemyId: W, count: 4 }] },
  {
    groups: [
      { enemyId: B, count: 5 },
      { enemyId: W, count: 4 },
    ],
  },
  {
    groups: [
      { enemyId: T, count: 6 },
      { enemyId: B, count: 3 },
      { enemyId: D, count: 1 },
    ],
  },
  {
    groups: [
      { enemyId: T, count: 10 },
      { enemyId: W, count: 3 },
    ],
  },
  {
    groups: [
      { enemyId: B, count: 6 },
      { enemyId: D, count: 1 },
      { enemyId: W, count: 4 },
    ],
  },
  {
    groups: [
      { enemyId: T, count: 6 },
      { enemyId: M, count: 1 },
    ],
  },
  {
    groups: [
      { enemyId: B, count: 8 },
      { enemyId: D, count: 2 },
    ],
  },
  {
    groups: [
      { enemyId: T, count: 6 },
      { enemyId: W, count: 6 },
      { enemyId: M, count: 1 },
    ],
  },
  {
    groups: [
      { enemyId: B, count: 6 },
      { enemyId: D, count: 1 },
      { enemyId: M, count: 2 },
    ],
  },
  {
    groups: [
      { enemyId: T, count: 14 },
      { enemyId: W, count: 8 },
    ],
  },
  {
    groups: [
      { enemyId: B, count: 8 },
      { enemyId: D, count: 2 },
      { enemyId: W, count: 4 },
      { enemyId: M, count: 2 },
    ],
  },
  {
    groups: [
      { enemyId: MYRA, count: 1 },
      { enemyId: T, count: 6 },
    ],
  },
];

export const greenwoodGateContent: ContentBundle = {
  map: greenwoodGateMap,
  towers,
  enemies,
  waves,
  rules: battleRules,
};
