import type { ContentBundle } from '@gotn/content-schema';
import {
  createBattle,
  restoreBattle,
  sellRefund,
  TICKS_PER_SECOND,
  type Battle,
  type BattleCheckpoint,
  type BattleEvent,
  type BattleResult,
  type Command,
  type RejectionReason,
} from '@gotn/sim';
import type { Result } from '@gotn/kernel';
import type {
  BattleViewModel,
  BossView,
  GameSpeed,
  TowerViewInfo,
  WavePreviewEntry,
} from './battle-view-model';

const STEP_MS = 1000 / TICKS_PER_SECOND;
/** A long frame (background tab, breakpoint) must not trigger a catch-up spiral. */
const MAX_FRAME_MS = 250;
/** Absorbs floating-point drift so 100 ms reliably yields exactly 3 ticks. */
const EPSILON_MS = 1e-6;

/**
 * Owns one battle and turns wall-clock time into fixed simulation steps.
 * Time is injected through `advance`, so tests and the rAF driver share the same path.
 */
export class BattleSession {
  readonly seed: number;
  private readonly sim: Battle;
  private readonly previews = new Map<number, readonly WavePreviewEntry[] | null>();
  private accumulatorMs = 0;
  private gameSpeed: GameSpeed = 1;
  private isPaused = false;

  constructor(
    readonly content: ContentBundle,
    seed: number,
    checkpoint?: BattleCheckpoint,
  ) {
    this.seed = checkpoint?.seed ?? seed;
    this.sim = checkpoint ? restoreBattle(content, checkpoint) : createBattle(content, seed);
  }

  /** Resumes a saved run at its wave break; throws if the checkpoint does not fit the content. */
  static fromCheckpoint(content: ContentBundle, checkpoint: BattleCheckpoint): BattleSession {
    return new BattleSession(content, checkpoint.seed, checkpoint);
  }

  /** Snapshot for saving; null unless the battle is waiting between waves. */
  checkpoint(): BattleCheckpoint | null {
    return this.sim.captureCheckpoint();
  }

  /** Final tallies once the battle has ended. */
  result(): BattleResult | null {
    return this.sim.result();
  }

  /** Live simulation state for rendering. Read-only by convention. */
  get state(): Battle['state'] {
    return this.sim.state;
  }

  get paused(): boolean {
    return this.isPaused;
  }

  get speed(): GameSpeed {
    return this.gameSpeed;
  }

  /** Fraction of the next tick already elapsed, for interpolating positions. */
  get alpha(): number {
    return Math.min(1, this.accumulatorMs / STEP_MS);
  }

  setPaused(paused: boolean): void {
    this.isPaused = paused;
  }

  setSpeed(speed: GameSpeed): void {
    this.gameSpeed = speed;
  }

  /** Advances by `elapsedMs` of real time; returns the number of ticks simulated. */
  advance(elapsedMs: number): number {
    if (this.isPaused || this.sim.state.status !== 'running') return 0;

    this.accumulatorMs += Math.min(Math.max(elapsedMs, 0), MAX_FRAME_MS) * this.gameSpeed;
    let steps = 0;
    while (this.accumulatorMs + EPSILON_MS >= STEP_MS && this.sim.state.status === 'running') {
      this.sim.step();
      this.accumulatorMs -= STEP_MS;
      steps += 1;
    }
    if (this.sim.state.status !== 'running') this.accumulatorMs = 0;
    return steps;
  }

  submit(command: Command): Result<void, RejectionReason> {
    return this.sim.submit(command);
  }

  drainEvents(): BattleEvent[] {
    return this.sim.drainEvents();
  }

  view(): BattleViewModel {
    const { state, content } = this;
    const { rules } = content;
    const toSpawn = state.phase === 'spawning' ? state.spawnQueue.length - state.spawnIndex : 0;

    return {
      status: state.status,
      tick: state.tick,
      seed: this.seed,
      gold: state.gold,
      lives: state.lives,
      startLives: content.map.startLives,
      wave: state.wave,
      totalWaves: content.waves.length,
      wavesCleared: state.wavesCleared,
      phase: state.phase,
      breakSecondsLeft: state.phase === 'break' ? state.breakTicksLeft / TICKS_PER_SECOND : 0,
      toSpawn,
      enemiesAlive: state.enemies.filter((enemy) => !this.isPod(enemy.defId)).length,
      boss: this.bossView(),
      projectiles: state.projectiles.length,
      nextWave: this.preview(state.wave),
      towers: state.towers.map((tower): TowerViewInfo => {
        const def = content.towers.find((candidate) => candidate.id === tower.defId);
        return {
          padId: tower.padId,
          defId: tower.defId,
          name: def?.name ?? tower.defId,
          tier: tower.tier,
          upgradeCost: def?.upgradeCosts[tower.tier] ?? null,
          sellValue: sellRefund(tower.spent, rules.sellRefundRatio),
        };
      }),
      speed: this.gameSpeed,
      paused: this.isPaused,
      hash: this.sim.hash(),
    };
  }

  private isPod(defId: string): boolean {
    return this.content.enemies.find((enemy) => enemy.id === defId)?.pod !== undefined;
  }

  private bossView(): BossView | null {
    for (const enemy of this.state.enemies) {
      const def = this.content.enemies.find((candidate) => candidate.id === enemy.defId);
      if (def?.boss) {
        return { name: def.name, hp: Math.max(0, enemy.hp), maxHp: enemy.maxHp, phase: enemy.phase };
      }
    }
    return null;
  }

  /** Composition of the wave that starts next (index = waves already started). */
  private preview(waveIndex: number): readonly WavePreviewEntry[] | null {
    if (this.previews.has(waveIndex)) return this.previews.get(waveIndex) ?? null;

    const wave = this.content.waves[waveIndex];
    const entries = wave
      ? wave.groups.map((group) => ({
          enemyId: group.enemyId,
          name: this.content.enemies.find((enemy) => enemy.id === group.enemyId)?.name ?? group.enemyId,
          count: group.count,
        }))
      : null;
    this.previews.set(waveIndex, entries);
    return entries;
  }
}
