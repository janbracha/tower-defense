export type GameSpeed = 1 | 2;

export interface BossView {
  readonly name: string;
  readonly hp: number;
  readonly maxHp: number;
  readonly phase: number;
}

export interface WavePreviewEntry {
  readonly enemyId: string;
  readonly name: string;
  readonly count: number;
}

export interface TowerViewInfo {
  readonly padId: string;
  readonly defId: string;
  readonly name: string;
  readonly tier: number;
  /** Cost of the next tier, or null at max tier. */
  readonly upgradeCost: number | null;
  readonly sellValue: number;
}

/** Everything the HUD shows; plain data so UI layers never touch the simulation. */
export interface BattleViewModel {
  readonly status: 'running' | 'victory' | 'defeat';
  readonly tick: number;
  readonly seed: number;
  readonly gold: number;
  readonly lives: number;
  readonly startLives: number;
  /** 1-based wave in progress or last started; 0 before the first. */
  readonly wave: number;
  readonly totalWaves: number;
  readonly wavesCleared: number;
  readonly phase: 'break' | 'spawning' | 'clearing';
  readonly breakSecondsLeft: number;
  /** Enemies still to spawn in the current wave. */
  readonly toSpawn: number;
  readonly enemiesAlive: number;
  readonly boss: BossView | null;
  readonly projectiles: number;
  readonly nextWave: readonly WavePreviewEntry[] | null;
  readonly towers: readonly TowerViewInfo[];
  readonly speed: GameSpeed;
  readonly paused: boolean;
  readonly hash: string;
}
