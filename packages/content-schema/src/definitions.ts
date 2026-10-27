export interface Vec2 {
  readonly x: number;
  readonly y: number;
}

export type DamageType = 'physical' | 'arcane' | 'frost';

export interface PadDefinition {
  readonly id: string;
  readonly position: Vec2;
}

/** All distances are in tiles. */
export interface MapDefinition {
  readonly id: string;
  readonly name: string;
  readonly biome: string;
  readonly size: Vec2;
  readonly startGold: number;
  readonly startLives: number;
  /** Polyline from spawn to Nexus (the last point). */
  readonly path: readonly Vec2[];
  readonly pads: readonly PadDefinition[];
}

export interface SlowEffect {
  /** Fraction of speed removed, 0.3 means 30% slower. */
  readonly amount: number;
  readonly durationSeconds: number;
}

export interface TowerTierDefinition {
  readonly damage: number;
  readonly attackSpeed: number;
  readonly range: number;
  readonly slow?: SlowEffect;
}

export interface ProjectileDefinition {
  /** Homing bolts chase a target; straight bolts fly a line and may pierce. */
  readonly kind: 'homing' | 'bolt';
  readonly speed: number;
  readonly pierce: number;
}

export interface TowerDefinition {
  readonly id: string;
  readonly name: string;
  readonly cost: number;
  readonly damageType: DamageType;
  readonly projectile: ProjectileDefinition;
  /** Index 0 is Tier I. */
  readonly tiers: readonly TowerTierDefinition[];
  /** `upgradeCosts[i]` buys tier `i + 1`. */
  readonly upgradeCosts: readonly number[];
}

export interface RegenBehavior {
  readonly fractionPerSecond: number;
  readonly idleSeconds: number;
}

export interface HealAuraBehavior {
  readonly radius: number;
  readonly fractionPerSecond: number;
}

/** Stationary, targetable object that hatches into enemies unless destroyed first. */
export interface PodBehavior {
  readonly timerSeconds: number;
  readonly hatchEnemyId: string;
  readonly hatchCount: number;
}

export interface BossBehavior {
  readonly podEnemyId: string;
  readonly podIntervalSeconds: number;
  /** Pod spacing in phase 2. */
  readonly phase2PodIntervalSeconds: number;
  /** Phase 2 starts when HP drops below this fraction. */
  readonly phase2HpFraction: number;
  readonly phase2Speed: number;
  /** Pods appear this far (tiles) beside the path. */
  readonly podOffset: number;
  /** Pods appear this many tiles (min, max) of path ahead of the boss. */
  readonly podAheadMin: number;
  readonly podAheadMax: number;
}

export interface EnemyDefinition {
  readonly id: string;
  readonly name: string;
  readonly hp: number;
  /** Tiles per second. */
  readonly speed: number;
  readonly armor: number;
  /** Lives lost when it reaches the Nexus. */
  readonly threat: number;
  readonly bounty: number;
  readonly flying: boolean;
  /** Overrides the battle-wide slow cap. */
  readonly maxSlow?: number;
  readonly regen?: RegenBehavior;
  readonly healAura?: HealAuraBehavior;
  readonly pod?: PodBehavior;
  /** Bosses are exempt from per-wave HP scaling. */
  readonly boss?: BossBehavior;
}

export interface WaveGroup {
  readonly enemyId: string;
  readonly count: number;
}

export interface WaveDefinition {
  readonly groups: readonly WaveGroup[];
}

export interface BattleRules {
  readonly breakSeconds: number;
  readonly spawnIntervalSeconds: number;
  /** HP multiplier grows by this amount per wave after the first. */
  readonly hpScalePerWave: number;
  readonly waveBonusBase: number;
  readonly waveBonusPerWave: number;
  readonly earlyCallBonusPerSecond: number;
  readonly earlyCallBonusMax: number;
  readonly sellRefundRatio: number;
  readonly defaultMaxSlow: number;
}

/** Everything a battle needs; injected by the composition root. */
export interface ContentBundle {
  readonly map: MapDefinition;
  readonly towers: readonly TowerDefinition[];
  readonly enemies: readonly EnemyDefinition[];
  readonly waves: readonly WaveDefinition[];
  readonly rules: BattleRules;
}
