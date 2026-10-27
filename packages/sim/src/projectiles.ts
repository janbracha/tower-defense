import { BOLT_HIT_RADIUS, HOMING_HIT_RADIUS, mitigateDamage } from './damage';
import { enemyDef, type BattleContext } from './context';
import { TICKS_PER_SECOND } from './version';
import type { EnemyState, ProjectileState } from './types';

function applyHit(ctx: BattleContext, enemy: EnemyState, projectile: ProjectileState): void {
  const def = enemyDef(ctx, enemy.defId);
  enemy.hp -= mitigateDamage(projectile.damage, projectile.damageType, def.armor);
  enemy.lastDamagedTick = ctx.state.tick;

  const { slow } = projectile;
  if (!slow || enemy.hp <= 0) return;
  const ticks = Math.round(slow.durationSeconds * TICKS_PER_SECOND);
  if (slow.amount > enemy.slowAmount) {
    enemy.slowAmount = slow.amount;
    enemy.slowTicks = ticks;
  } else if (slow.amount === enemy.slowAmount) {
    enemy.slowTicks = Math.max(enemy.slowTicks, ticks);
  }
}

function findEnemy(ctx: BattleContext, id: number): EnemyState | undefined {
  return ctx.state.enemies.find((enemy) => enemy.id === id);
}

interface SegmentHit {
  readonly t: number;
  readonly enemy: EnemyState;
}

/** Parameter along segment a→b of the point closest to p, and that distance squared. */
function closestOnSegment(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  px: number,
  py: number,
): { t: number; distSq: number } {
  const abx = bx - ax;
  const aby = by - ay;
  const lengthSq = abx * abx + aby * aby;
  const raw = lengthSq === 0 ? 0 : ((px - ax) * abx + (py - ay) * aby) / lengthSq;
  const t = Math.min(1, Math.max(0, raw));
  const cx = ax + abx * t;
  const cy = ay + aby * t;
  const dx = px - cx;
  const dy = py - cy;
  return { t, distSq: dx * dx + dy * dy };
}

function stepHoming(ctx: BattleContext, projectile: ProjectileState): boolean {
  const target = findEnemy(ctx, projectile.targetId);
  if (!target || target.hp <= 0) return false;

  const step = projectile.speed / TICKS_PER_SECOND;
  const dx = target.x - projectile.x;
  const dy = target.y - projectile.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist <= step + HOMING_HIT_RADIUS) {
    applyHit(ctx, target, projectile);
    return false;
  }
  projectile.x += (dx / dist) * step;
  projectile.y += (dy / dist) * step;
  return true;
}

function stepBolt(ctx: BattleContext, projectile: ProjectileState): boolean {
  const step = projectile.speed / TICKS_PER_SECOND;
  const nextX = projectile.x + projectile.dirX * step;
  const nextY = projectile.y + projectile.dirY * step;

  const hits: SegmentHit[] = [];
  for (const enemy of ctx.state.enemies) {
    if (enemy.hp <= 0 || projectile.hitIds.includes(enemy.id)) continue;
    const closest = closestOnSegment(projectile.x, projectile.y, nextX, nextY, enemy.x, enemy.y);
    if (closest.distSq <= BOLT_HIT_RADIUS * BOLT_HIT_RADIUS) {
      hits.push({ t: closest.t, enemy });
    }
  }
  hits.sort((a, b) => a.t - b.t || a.enemy.id - b.enemy.id);

  for (const hit of hits) {
    if (projectile.pierceLeft <= 0) break;
    applyHit(ctx, hit.enemy, projectile);
    projectile.hitIds.push(hit.enemy.id);
    projectile.pierceLeft -= 1;
  }

  projectile.x = nextX;
  projectile.y = nextY;
  projectile.traveled += step;
  return projectile.pierceLeft > 0 && projectile.traveled < projectile.maxDistance;
}

export function updateProjectiles(ctx: BattleContext): void {
  const remaining: ProjectileState[] = [];
  for (const projectile of ctx.state.projectiles) {
    projectile.prevX = projectile.x;
    projectile.prevY = projectile.y;
    const keep =
      projectile.kind === 'homing' ? stepHoming(ctx, projectile) : stepBolt(ctx, projectile);
    if (keep) remaining.push(projectile);
  }
  ctx.state.projectiles = remaining;
}
