import type { EnemyDefinition, Vec2 } from '@gotn/content-schema';
import { enemyDef, lerp, type BattleContext } from './context';
import { TICKS_PER_SECOND } from './version';
import type { EnemyState } from './types';

/** Position on the enemy's route after travelling `s` tiles. */
export function routePosition(ctx: BattleContext, flying: boolean, s: number): Vec2 {
  if (!flying) return ctx.path.positionAt(s);
  const t = ctx.flightLength === 0 ? 1 : Math.min(1, Math.max(0, s / ctx.flightLength));
  return lerp(ctx.path.start, ctx.path.end, t);
}

/** Distance still to travel before the Nexus; smaller means further along. */
export function remainingDistance(ctx: BattleContext, enemy: EnemyState): number {
  const flying = enemyDef(ctx, enemy.defId).flying;
  return (flying ? ctx.flightLength : ctx.path.length) - enemy.s;
}

export function slowFactor(ctx: BattleContext, enemy: EnemyState): number {
  const def = enemyDef(ctx, enemy.defId);
  const cap = def.maxSlow ?? ctx.content.rules.defaultMaxSlow;
  return 1 - Math.min(enemy.slowAmount, cap);
}

export function enemySpeed(def: EnemyDefinition, enemy: EnemyState): number {
  return def.boss && enemy.phase === 2 ? def.boss.phase2Speed : def.speed;
}

const toTicks = (seconds: number): number => Math.round(seconds * TICKS_PER_SECOND);

interface SpawnOptions {
  /** Distance along the route to start at; defaults to the spawn point. */
  readonly s?: number;
  /** Overrides the position derived from `s` (pods sit beside the path). */
  readonly position?: Vec2;
}

export function spawnEnemy(
  ctx: BattleContext,
  defId: string,
  options: SpawnOptions = {},
): EnemyState {
  const def = enemyDef(ctx, defId);
  const { state } = ctx;
  const scaled = !def.boss && !def.pod;
  const scale = scaled ? 1 + ctx.content.rules.hpScalePerWave * Math.max(0, state.wave - 1) : 1;
  const hp = Math.round(def.hp * scale);
  const s = options.s ?? 0;
  const position = options.position ?? routePosition(ctx, def.flying, s);
  const timerMax = def.pod ? toTicks(def.pod.timerSeconds) : 0;

  const enemy: EnemyState = {
    id: state.nextId,
    defId,
    hp,
    maxHp: hp,
    s,
    x: position.x,
    y: position.y,
    prevX: position.x,
    prevY: position.y,
    slowAmount: 0,
    slowTicks: 0,
    lastDamagedTick: state.tick,
    phase: 1,
    timerTicks: def.boss ? toTicks(def.boss.podIntervalSeconds) : timerMax,
    timerMax,
  };
  state.nextId += 1;
  state.enemies.push(enemy);

  if (def.pod) ctx.events.push({ type: 'podSpawned', enemyId: enemy.id });
  else if (def.boss) ctx.events.push({ type: 'bossSpawned', enemyId: enemy.id, defId });
  else ctx.events.push({ type: 'enemySpawned', enemyId: enemy.id, defId });
  return enemy;
}

/** Advances every enemy along its route; those reaching the Nexus cost lives and are removed. */
export function moveEnemies(ctx: BattleContext): void {
  const { state } = ctx;
  const survivors: EnemyState[] = [];

  for (const enemy of state.enemies) {
    const def = enemyDef(ctx, enemy.defId);
    enemy.prevX = enemy.x;
    enemy.prevY = enemy.y;

    if (def.pod) {
      survivors.push(enemy);
      continue;
    }

    enemy.s += (enemySpeed(def, enemy) * slowFactor(ctx, enemy)) / TICKS_PER_SECOND;
    if (enemy.slowTicks > 0) {
      enemy.slowTicks -= 1;
      if (enemy.slowTicks === 0) enemy.slowAmount = 0;
    }

    const travelLength = def.flying ? ctx.flightLength : ctx.path.length;
    if (enemy.s >= travelLength) {
      state.lives -= def.threat;
      ctx.events.push({
        type: 'enemyLeaked',
        enemyId: enemy.id,
        defId: enemy.defId,
        threat: def.threat,
      });
      continue;
    }

    const position = routePosition(ctx, def.flying, enemy.s);
    enemy.x = position.x;
    enemy.y = position.y;
    survivors.push(enemy);
  }

  state.enemies = survivors;
}

/** Regeneration (when undamaged for a while) and healing auras. */
export function runEnemyAbilities(ctx: BattleContext): void {
  const { state } = ctx;

  for (const enemy of state.enemies) {
    const def = enemyDef(ctx, enemy.defId);
    if (!def.regen || enemy.hp <= 0 || enemy.hp >= enemy.maxHp) continue;
    const idleTicks = Math.round(def.regen.idleSeconds * TICKS_PER_SECOND);
    if (state.tick - enemy.lastDamagedTick < idleTicks) continue;
    const heal = (enemy.maxHp * def.regen.fractionPerSecond) / TICKS_PER_SECOND;
    enemy.hp = Math.min(enemy.maxHp, enemy.hp + heal);
  }

  for (const healer of state.enemies) {
    const aura = enemyDef(ctx, healer.defId).healAura;
    if (!aura || healer.hp <= 0) continue;
    const radiusSq = aura.radius * aura.radius;
    for (const ally of state.enemies) {
      if (ally === healer || ally.hp <= 0 || ally.hp >= ally.maxHp) continue;
      const dx = ally.x - healer.x;
      const dy = ally.y - healer.y;
      if (dx * dx + dy * dy > radiusSq) continue;
      const heal = (ally.maxHp * aura.fractionPerSecond) / TICKS_PER_SECOND;
      ally.hp = Math.min(ally.maxHp, ally.hp + heal);
    }
  }

  runEncounters(ctx);
}

/** Drops a pod beside the path a little ahead of the boss. */
function spawnPod(ctx: BattleContext, boss: EnemyState, podEnemyId: string): void {
  const behavior = enemyDef(ctx, boss.defId).boss;
  if (!behavior) return;

  const ahead =
    behavior.podAheadMin + ctx.rng.next() * (behavior.podAheadMax - behavior.podAheadMin);
  const s = Math.min(Math.max(0, ctx.path.length - 0.5), boss.s + ahead);
  const base = ctx.path.positionAt(s);
  const forward = ctx.path.positionAt(s + 0.1);
  let dx = forward.x - base.x;
  let dy = forward.y - base.y;
  if (dx === 0 && dy === 0) {
    const back = ctx.path.positionAt(Math.max(0, s - 0.1));
    dx = base.x - back.x;
    dy = base.y - back.y;
  }
  const length = Math.sqrt(dx * dx + dy * dy) || 1;
  const side = ctx.rng.next() < 0.5 ? -1 : 1;
  const position = {
    x: base.x + (-dy / length) * side * behavior.podOffset,
    y: base.y + (dx / length) * side * behavior.podOffset,
  };
  spawnEnemy(ctx, podEnemyId, { s, position });
}

/** Boss pod cadence and phase change, plus pod hatch timers. */
function runEncounters(ctx: BattleContext): void {
  const { state } = ctx;

  // Iterate a copy: hatching and pod spawning append to state.enemies.
  for (const enemy of [...state.enemies]) {
    if (enemy.hp <= 0) continue;
    const def = enemyDef(ctx, enemy.defId);

    if (def.pod) {
      enemy.timerTicks -= 1;
      if (enemy.timerTicks > 0) continue;
      // timerTicks === 0 marks a hatched pod; collectKills reports it.
      enemy.timerTicks = 0;
      enemy.hp = 0;
      for (let i = 0; i < def.pod.hatchCount; i += 1) {
        spawnEnemy(ctx, def.pod.hatchEnemyId, {
          s: Math.min(ctx.path.length - 0.01, enemy.s + i * 0.35),
        });
      }
      continue;
    }

    const boss = def.boss;
    if (!boss) continue;

    if (enemy.phase === 1 && enemy.hp < enemy.maxHp * boss.phase2HpFraction) {
      enemy.phase = 2;
      enemy.timerTicks = Math.min(enemy.timerTicks, toTicks(boss.phase2PodIntervalSeconds));
      ctx.events.push({ type: 'bossPhaseChanged', enemyId: enemy.id, phase: 2 });
    }

    enemy.timerTicks -= 1;
    if (enemy.timerTicks > 0) continue;
    spawnPod(ctx, enemy, boss.podEnemyId);
    enemy.timerTicks = toTicks(
      enemy.phase === 2 ? boss.phase2PodIntervalSeconds : boss.podIntervalSeconds,
    );
  }
}

/** Removes enemies killed this tick and pays their bounty; returns true if a boss died. */
export function collectKills(ctx: BattleContext): boolean {
  const { state } = ctx;
  const alive: EnemyState[] = [];
  let bossKilled = false;

  for (const enemy of state.enemies) {
    if (enemy.hp > 0) {
      alive.push(enemy);
      continue;
    }
    const def = enemyDef(ctx, enemy.defId);
    if (def.pod) {
      ctx.events.push({
        type: enemy.timerTicks === 0 ? 'podHatched' : 'podDestroyed',
        enemyId: enemy.id,
      });
      continue;
    }
    if (def.boss) bossKilled = true;
    state.kills += 1;
    state.gold += def.bounty;
    state.goldEarned += def.bounty;
    ctx.events.push({
      type: 'enemyKilled',
      enemyId: enemy.id,
      defId: enemy.defId,
      bounty: def.bounty,
    });
  }

  state.enemies = alive;
  return bossKilled;
}
