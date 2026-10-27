import { err, type Result } from '@gotn/kernel';
import type { ContentBundle } from '@gotn/content-schema';
import type { BattleContext } from './context';
import { collectKills, moveEnemies, runEnemyAbilities } from './enemies';
import { StateHasher } from './hash';
import { Path, distance } from './path';
import { updateProjectiles } from './projectiles';
import { Rng } from './rng';
import { placeTower, sellTower, updateTowers, upgradeTower } from './towers';
import type {
  BattleCheckpoint,
  BattleEvent,
  BattleResult,
  BattleState,
  Command,
  CommandLogEntry,
  RejectionReason,
  TowerState,
} from './types';
import { TICKS_PER_SECOND } from './version';
import { callNextWave, updateWaves, winByBoss } from './waves';

function validateContent(content: ContentBundle): void {
  const enemyIds = new Set(content.enemies.map((enemy) => enemy.id));
  for (const [index, wave] of content.waves.entries()) {
    for (const group of wave.groups) {
      if (!enemyIds.has(group.enemyId)) {
        throw new Error(`Wave ${index + 1} references unknown enemy "${group.enemyId}"`);
      }
    }
  }
  if (content.waves.length === 0) throw new Error('A battle needs at least one wave');
}

function createContext(content: ContentBundle, seed: number): BattleContext {
  validateContent(content);
  const path = new Path(content.map.path);
  const state: BattleState = {
    tick: 0,
    status: 'running',
    gold: content.map.startGold,
    lives: content.map.startLives,
    wave: 0,
    wavesCleared: 0,
    phase: 'break',
    breakTicksLeft: Math.round(content.rules.breakSeconds * TICKS_PER_SECOND),
    spawnCooldown: 0,
    spawnQueue: [],
    spawnIndex: 0,
    nextId: 1,
    kills: 0,
    goldEarned: 0,
    enemies: [],
    towers: [],
    projectiles: [],
  };

  return {
    content,
    path,
    flightLength: distance(path.start, path.end),
    towerDefs: new Map(content.towers.map((def) => [def.id, def])),
    enemyDefs: new Map(content.enemies.map((def) => [def.id, def])),
    pads: new Map(content.map.pads.map((pad) => [pad.id, pad])),
    state,
    rng: new Rng(seed),
    events: [],
  };
}

const STATUS_CODES = { running: 0, victory: 1, defeat: 2 } as const;
const PHASE_CODES = { break: 0, spawning: 1, clearing: 2 } as const;

/** One battle: deterministic for a given content bundle, seed and command sequence. */
export class Battle {
  private readonly ctx: BattleContext;
  private readonly log: CommandLogEntry[] = [];

  constructor(
    content: ContentBundle,
    readonly seed: number,
  ) {
    this.ctx = createContext(content, seed);
  }

  /** Live state for reading (rendering, HUD). Do not mutate. */
  get state(): Readonly<BattleState> {
    return this.ctx.state;
  }

  get content(): ContentBundle {
    return this.ctx.content;
  }

  /** Accepted commands with the tick they were applied at, enough to replay the battle. */
  get commandLog(): readonly CommandLogEntry[] {
    return this.log;
  }

  /** Applies a command immediately, i.e. at the start of the next tick. */
  submit(command: Command): Result<void, RejectionReason> {
    if (this.ctx.state.status !== 'running') return err('battle-over');

    let result: Result<void, RejectionReason>;
    switch (command.type) {
      case 'placeTower':
        result = placeTower(this.ctx, command.padId, command.towerId);
        break;
      case 'upgradeTower':
        result = upgradeTower(this.ctx, command.padId);
        break;
      case 'sellTower':
        result = sellTower(this.ctx, command.padId);
        break;
      case 'startWave':
        result = callNextWave(this.ctx);
        break;
    }
    if (result.ok) this.log.push({ tick: this.ctx.state.tick, command });
    return result;
  }

  step(): void {
    const { ctx } = this;
    const { state } = ctx;
    if (state.status !== 'running') return;

    moveEnemies(ctx);
    runEnemyAbilities(ctx);
    updateTowers(ctx);
    updateProjectiles(ctx);
    const bossKilled = collectKills(ctx);

    if (state.lives <= 0) {
      state.lives = 0;
      state.status = 'defeat';
      ctx.events.push({ type: 'defeat' });
    } else if (bossKilled) {
      winByBoss(ctx);
    } else {
      updateWaves(ctx);
    }
    state.tick += 1;
  }

  /** Snapshot for saving; only available while waiting between waves. */
  captureCheckpoint(): BattleCheckpoint | null {
    const { state } = this.ctx;
    if (state.status !== 'running' || state.phase !== 'break' || state.enemies.length > 0) {
      return null;
    }
    return {
      mapId: this.ctx.content.map.id,
      seed: this.seed,
      tick: state.tick,
      wave: state.wave,
      wavesCleared: state.wavesCleared,
      gold: state.gold,
      lives: state.lives,
      kills: state.kills,
      goldEarned: state.goldEarned,
      nextId: state.nextId,
      breakTicksLeft: state.breakTicksLeft,
      rngState: this.ctx.rng.getState(),
      towers: state.towers.map((tower) => ({
        id: tower.id,
        padId: tower.padId,
        defId: tower.defId,
        tier: tower.tier,
        cooldown: tower.cooldown,
        spent: tower.spent,
      })),
    };
  }

  /** Loads a checkpoint into a fresh battle; throws if it does not fit the content. */
  applyCheckpoint(checkpoint: BattleCheckpoint): void {
    const { ctx } = this;
    const { content, state } = ctx;
    const fail = (reason: string): never => {
      throw new Error(`Invalid checkpoint: ${reason}`);
    };

    if (checkpoint.mapId !== content.map.id) fail(`map "${checkpoint.mapId}"`);
    if (checkpoint.wave < 0 || checkpoint.wave >= content.waves.length) fail('wave out of range');
    const numbers = [
      checkpoint.tick,
      checkpoint.wavesCleared,
      checkpoint.gold,
      checkpoint.lives,
      checkpoint.kills,
      checkpoint.goldEarned,
      checkpoint.nextId,
      checkpoint.breakTicksLeft,
      checkpoint.rngState,
    ];
    if (numbers.some((value) => !Number.isFinite(value) || value < 0)) fail('negative number');
    if (checkpoint.lives <= 0) fail('no lives left');

    const towers: TowerState[] = [];
    const usedPads = new Set<string>();
    for (const saved of checkpoint.towers) {
      const pad = ctx.pads.get(saved.padId);
      const def = ctx.towerDefs.get(saved.defId);
      if (!pad || !def) fail(`tower on "${saved.padId}"`);
      if (usedPads.has(saved.padId)) fail(`pad "${saved.padId}" used twice`);
      if (!Number.isInteger(saved.tier) || saved.tier < 0 || saved.tier >= (def?.tiers.length ?? 0)) {
        fail(`tier ${saved.tier}`);
      }
      usedPads.add(saved.padId);
      towers.push({
        id: saved.id,
        padId: saved.padId,
        defId: saved.defId,
        x: pad?.position.x ?? 0,
        y: pad?.position.y ?? 0,
        tier: saved.tier,
        cooldown: saved.cooldown,
        spent: saved.spent,
      });
    }

    state.tick = checkpoint.tick;
    state.wave = checkpoint.wave;
    state.wavesCleared = checkpoint.wavesCleared;
    state.gold = checkpoint.gold;
    state.lives = checkpoint.lives;
    state.kills = checkpoint.kills;
    state.goldEarned = checkpoint.goldEarned;
    state.nextId = checkpoint.nextId;
    state.breakTicksLeft = checkpoint.breakTicksLeft;
    state.phase = 'break';
    state.towers = towers;
    ctx.rng.setState(checkpoint.rngState);
  }

  /** Returns and clears the events produced since the last call. */
  drainEvents(): BattleEvent[] {
    return this.ctx.events.splice(0, this.ctx.events.length);
  }

  result(): BattleResult | null {
    const { state } = this.ctx;
    if (state.status === 'running') return null;
    return {
      outcome: state.status,
      wavesCleared: state.wavesCleared,
      kills: state.kills,
      goldEarned: state.goldEarned,
      livesLeft: state.lives,
      ticks: state.tick,
    };
  }

  /** 64-bit fingerprint of the full simulation state. */
  hash(): string {
    const { state, rng } = this.ctx;
    const hasher = new StateHasher();
    hasher
      .add(state.tick)
      .add(STATUS_CODES[state.status])
      .add(state.gold)
      .add(state.lives)
      .add(state.wave)
      .add(PHASE_CODES[state.phase])
      .add(state.breakTicksLeft)
      .add(state.spawnCooldown)
      .add(state.spawnIndex)
      .add(state.nextId)
      .add(state.kills)
      .add(state.goldEarned)
      .add(rng.getState());

    for (const enemy of state.enemies) {
      hasher
        .add(enemy.id)
        .add(enemy.hp)
        .add(enemy.s)
        .add(enemy.slowAmount)
        .add(enemy.slowTicks)
        .add(enemy.lastDamagedTick)
        .add(enemy.phase)
        .add(enemy.timerTicks);
    }
    for (const tower of state.towers) {
      hasher.add(tower.id).add(tower.tier).add(tower.cooldown).add(tower.spent);
    }
    for (const projectile of state.projectiles) {
      hasher
        .add(projectile.id)
        .add(projectile.x)
        .add(projectile.y)
        .add(projectile.pierceLeft)
        .add(projectile.targetId);
    }
    return hasher.digest();
  }
}

export function createBattle(content: ContentBundle, seed: number): Battle {
  return new Battle(content, seed);
}

/** Rebuilds a battle at the wave break captured by `captureCheckpoint`. */
export function restoreBattle(content: ContentBundle, checkpoint: BattleCheckpoint): Battle {
  const battle = new Battle(content, checkpoint.seed);
  battle.applyCheckpoint(checkpoint);
  return battle;
}

/** Re-runs a battle from its command log until it ends or `maxTicks` is reached. */
export function replayBattle(
  content: ContentBundle,
  seed: number,
  log: readonly CommandLogEntry[],
  maxTicks: number,
): Battle {
  const battle = createBattle(content, seed);
  let next = 0;
  while (battle.state.status === 'running' && battle.state.tick < maxTicks) {
    for (;;) {
      const entry = log[next];
      if (!entry || entry.tick !== battle.state.tick) break;
      battle.submit(entry.command);
      next += 1;
    }
    battle.step();
  }
  return battle;
}
