import type { DamageType, SlowEffect } from '@gotn/content-schema';

export type BattleStatus = 'running' | 'victory' | 'defeat';
export type WavePhase = 'break' | 'spawning' | 'clearing';

export interface EnemyState {
  readonly id: number;
  readonly defId: string;
  hp: number;
  readonly maxHp: number;
  /** Distance travelled along the path (ground) or the straight flight line (flyers). */
  s: number;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  slowAmount: number;
  slowTicks: number;
  lastDamagedTick: number;
  /** Boss: 1 or 2. Always 1 for everything else. */
  phase: number;
  /** Boss: ticks until the next pod. Pod: ticks until it hatches. Otherwise 0. */
  timerTicks: number;
  /** Pod: full timer length, for drawing the countdown. */
  timerMax: number;
}

export interface TowerState {
  readonly id: number;
  readonly padId: string;
  readonly defId: string;
  readonly x: number;
  readonly y: number;
  /** Index into the definition's tiers; 0 is Tier I. */
  tier: number;
  cooldown: number;
  /** Total gold invested, used for the sell refund. */
  spent: number;
}

export interface ProjectileState {
  readonly id: number;
  readonly kind: 'homing' | 'bolt';
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  readonly speed: number;
  readonly damage: number;
  readonly damageType: DamageType;
  readonly slow: SlowEffect | null;
  /** Homing only. */
  readonly targetId: number;
  /** Bolt only. */
  readonly dirX: number;
  readonly dirY: number;
  readonly maxDistance: number;
  traveled: number;
  pierceLeft: number;
  readonly hitIds: number[];
}

export interface BattleState {
  tick: number;
  status: BattleStatus;
  gold: number;
  lives: number;
  /** 1-based number of the wave in progress or last started; 0 before the first. */
  wave: number;
  wavesCleared: number;
  phase: WavePhase;
  breakTicksLeft: number;
  spawnCooldown: number;
  spawnQueue: string[];
  spawnIndex: number;
  nextId: number;
  kills: number;
  goldEarned: number;
  enemies: EnemyState[];
  towers: TowerState[];
  projectiles: ProjectileState[];
}

export type Command =
  | { readonly type: 'placeTower'; readonly padId: string; readonly towerId: string }
  | { readonly type: 'upgradeTower'; readonly padId: string }
  | { readonly type: 'sellTower'; readonly padId: string }
  | { readonly type: 'startWave' };

export type RejectionReason =
  | 'battle-over'
  | 'unknown-pad'
  | 'unknown-tower'
  | 'pad-occupied'
  | 'no-tower-on-pad'
  | 'max-tier'
  | 'insufficient-gold'
  | 'wave-in-progress';

export type BattleEvent =
  | { readonly type: 'waveStarted'; readonly wave: number }
  | { readonly type: 'waveCleared'; readonly wave: number; readonly bonus: number }
  | { readonly type: 'enemySpawned'; readonly enemyId: number; readonly defId: string }
  | {
      readonly type: 'enemyKilled';
      readonly enemyId: number;
      readonly defId: string;
      readonly bounty: number;
    }
  | {
      readonly type: 'enemyLeaked';
      readonly enemyId: number;
      readonly defId: string;
      readonly threat: number;
    }
  | {
      readonly type: 'towerPlaced';
      readonly towerId: number;
      readonly padId: string;
      readonly defId: string;
    }
  | { readonly type: 'towerUpgraded'; readonly towerId: number; readonly tier: number }
  | {
      readonly type: 'towerSold';
      readonly towerId: number;
      readonly padId: string;
      readonly refund: number;
    }
  | { readonly type: 'victory' }
  | { readonly type: 'defeat' }
  | { readonly type: 'bossSpawned'; readonly enemyId: number; readonly defId: string }
  | { readonly type: 'bossPhaseChanged'; readonly enemyId: number; readonly phase: number }
  | { readonly type: 'podSpawned'; readonly enemyId: number }
  | { readonly type: 'podDestroyed'; readonly enemyId: number }
  | { readonly type: 'podHatched'; readonly enemyId: number };

export interface BattleResult {
  readonly outcome: 'victory' | 'defeat';
  readonly wavesCleared: number;
  readonly kills: number;
  readonly goldEarned: number;
  readonly livesLeft: number;
  readonly ticks: number;
}

export interface CommandLogEntry {
  readonly tick: number;
  readonly command: Command;
}

export interface TowerCheckpoint {
  readonly id: number;
  readonly padId: string;
  readonly defId: string;
  readonly tier: number;
  readonly cooldown: number;
  readonly spent: number;
}

/** Enough to rebuild a battle at a wave break (no enemies or projectiles are alive then). */
export interface BattleCheckpoint {
  readonly mapId: string;
  readonly seed: number;
  readonly tick: number;
  readonly wave: number;
  readonly wavesCleared: number;
  readonly gold: number;
  readonly lives: number;
  readonly kills: number;
  readonly goldEarned: number;
  readonly nextId: number;
  readonly breakTicksLeft: number;
  readonly rngState: number;
  readonly towers: readonly TowerCheckpoint[];
}
