import { err, ok, type Result } from '@gotn/kernel';
import type { BattleContext } from './context';
import { spawnEnemy } from './enemies';
import { TICKS_PER_SECOND } from './version';
import type { RejectionReason } from './types';

function startWave(ctx: BattleContext): void {
  const { state } = ctx;
  state.wave += 1;
  const definition = ctx.content.waves[state.wave - 1];
  if (!definition) throw new Error(`No wave ${state.wave} defined`);

  state.spawnQueue = [];
  for (const group of definition.groups) {
    for (let i = 0; i < group.count; i += 1) {
      state.spawnQueue.push(group.enemyId);
    }
  }
  state.spawnIndex = 0;
  state.spawnCooldown = 0;
  state.phase = 'spawning';
  ctx.events.push({ type: 'waveStarted', wave: state.wave });
}

function clearWave(ctx: BattleContext): void {
  const { state } = ctx;
  const { rules } = ctx.content;
  const bonus = rules.waveBonusBase + rules.waveBonusPerWave * state.wave;

  state.gold += bonus;
  state.goldEarned += bonus;
  state.wavesCleared = state.wave;
  state.projectiles = [];
  state.spawnQueue = [];
  state.spawnIndex = 0;
  state.spawnCooldown = 0;
  ctx.events.push({ type: 'waveCleared', wave: state.wave, bonus });

  if (state.wave >= ctx.content.waves.length) {
    state.status = 'victory';
    ctx.events.push({ type: 'victory' });
    return;
  }
  state.phase = 'break';
  state.breakTicksLeft = Math.round(rules.breakSeconds * TICKS_PER_SECOND);
}

/** Killing a boss ends the battle at once, whatever else is still alive. */
export function winByBoss(ctx: BattleContext): void {
  const { state } = ctx;
  state.wavesCleared = state.wave;
  state.status = 'victory';
  ctx.events.push({ type: 'victory' });
}

/** Early call: skips the rest of the break and pays a bonus for the time saved. */
export function callNextWave(ctx: BattleContext): Result<void, RejectionReason> {
  const { state } = ctx;
  if (state.phase !== 'break') return err('wave-in-progress');

  const { rules } = ctx.content;
  const secondsLeft = state.breakTicksLeft / TICKS_PER_SECOND;
  const bonus = Math.min(
    rules.earlyCallBonusMax,
    Math.round(rules.earlyCallBonusPerSecond * secondsLeft),
  );
  state.gold += bonus;
  state.goldEarned += bonus;
  startWave(ctx);
  return ok(undefined);
}

export function updateWaves(ctx: BattleContext): void {
  const { state } = ctx;

  if (state.phase === 'break') {
    state.breakTicksLeft -= 1;
    if (state.breakTicksLeft <= 0) startWave(ctx);
    return;
  }

  if (state.phase === 'spawning') {
    state.spawnCooldown -= 1;
    if (state.spawnCooldown > 0) return;

    const defId = state.spawnQueue[state.spawnIndex];
    if (defId !== undefined) {
      spawnEnemy(ctx, defId);
      state.spawnIndex += 1;
    }
    state.spawnCooldown = Math.round(ctx.content.rules.spawnIntervalSeconds * TICKS_PER_SECOND);
    if (state.spawnIndex >= state.spawnQueue.length) state.phase = 'clearing';
    return;
  }

  if (state.enemies.length === 0) clearWave(ctx);
}
