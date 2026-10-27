import { err, ok, type Result } from '@gotn/kernel';
import type { Vec2 } from '@gotn/content-schema';
import { BOLT_EXTRA_RANGE, ENEMY_RADIUS } from './damage';
import { enemyDef, towerDef, towerTier, type BattleContext } from './context';
import { enemySpeed, remainingDistance, routePosition, slowFactor } from './enemies';
import { TICKS_PER_SECOND } from './version';
import type { EnemyState, ProjectileState, RejectionReason, TowerState } from './types';

function towerOnPad(ctx: BattleContext, padId: string): TowerState | undefined {
  return ctx.state.towers.find((tower) => tower.padId === padId);
}

/** Gold returned for selling; the epsilon stops 180 * 0.7 = 125.99999999999999 from losing a coin. */
export function sellRefund(spent: number, ratio: number): number {
  return Math.floor(spent * ratio + 1e-9);
}

export function placeTower(
  ctx: BattleContext,
  padId: string,
  towerId: string,
): Result<void, RejectionReason> {
  const pad = ctx.pads.get(padId);
  if (!pad) return err('unknown-pad');
  const def = ctx.towerDefs.get(towerId);
  if (!def) return err('unknown-tower');
  if (towerOnPad(ctx, padId)) return err('pad-occupied');

  const { state } = ctx;
  if (state.gold < def.cost) return err('insufficient-gold');

  state.gold -= def.cost;
  const tower: TowerState = {
    id: state.nextId,
    padId,
    defId: towerId,
    x: pad.position.x,
    y: pad.position.y,
    tier: 0,
    cooldown: 0,
    spent: def.cost,
  };
  state.nextId += 1;
  state.towers.push(tower);
  ctx.events.push({ type: 'towerPlaced', towerId: tower.id, padId, defId: towerId });
  return ok(undefined);
}

export function upgradeTower(ctx: BattleContext, padId: string): Result<void, RejectionReason> {
  if (!ctx.pads.has(padId)) return err('unknown-pad');
  const tower = towerOnPad(ctx, padId);
  if (!tower) return err('no-tower-on-pad');

  const def = towerDef(ctx, tower.defId);
  const cost = def.upgradeCosts[tower.tier];
  if (cost === undefined || tower.tier + 1 >= def.tiers.length) return err('max-tier');
  if (ctx.state.gold < cost) return err('insufficient-gold');

  ctx.state.gold -= cost;
  tower.spent += cost;
  tower.tier += 1;
  ctx.events.push({ type: 'towerUpgraded', towerId: tower.id, tier: tower.tier });
  return ok(undefined);
}

export function sellTower(ctx: BattleContext, padId: string): Result<void, RejectionReason> {
  if (!ctx.pads.has(padId)) return err('unknown-pad');
  const tower = towerOnPad(ctx, padId);
  if (!tower) return err('no-tower-on-pad');

  const refund = sellRefund(tower.spent, ctx.content.rules.sellRefundRatio);
  ctx.state.gold += refund;
  ctx.state.towers = ctx.state.towers.filter((candidate) => candidate !== tower);
  ctx.events.push({ type: 'towerSold', towerId: tower.id, padId, refund });
  return ok(undefined);
}

/** Pods first, soonest to hatch; then the enemy closest to the Nexus. Ties go to the first in list. */
function findTarget(ctx: BattleContext, tower: TowerState, range: number): EnemyState | null {
  const reach = range + ENEMY_RADIUS;
  const reachSq = reach * reach;
  let best: EnemyState | null = null;
  let bestIsPod = false;
  let bestRemaining = Number.POSITIVE_INFINITY;

  for (const enemy of ctx.state.enemies) {
    if (enemy.hp <= 0) continue;
    const dx = enemy.x - tower.x;
    const dy = enemy.y - tower.y;
    if (dx * dx + dy * dy > reachSq) continue;
    const isPod = enemyDef(ctx, enemy.defId).pod !== undefined;
    if (bestIsPod && !isPod) continue;
    const remaining = isPod ? enemy.timerTicks : remainingDistance(ctx, enemy);
    if ((isPod && !bestIsPod) || remaining < bestRemaining) {
      best = enemy;
      bestIsPod = isPod;
      bestRemaining = remaining;
    }
  }
  return best;
}

/** Where a straight bolt should aim so it meets a moving enemy. */
function leadPoint(ctx: BattleContext, enemy: EnemyState, from: Vec2, speed: number): Vec2 {
  const def = enemyDef(ctx, enemy.defId);
  if (def.pod) return { x: enemy.x, y: enemy.y };
  const dx = enemy.x - from.x;
  const dy = enemy.y - from.y;
  const flightTime = Math.sqrt(dx * dx + dy * dy) / speed;
  const futureS = enemy.s + enemySpeed(def, enemy) * slowFactor(ctx, enemy) * flightTime;
  return routePosition(ctx, def.flying, futureS);
}

function fire(ctx: BattleContext, tower: TowerState, target: EnemyState): void {
  const def = towerDef(ctx, tower.defId);
  const tier = towerTier(ctx, tower);
  const { state } = ctx;

  let dirX = 0;
  let dirY = 0;
  if (def.projectile.kind === 'bolt') {
    const aim = leadPoint(ctx, target, tower, def.projectile.speed);
    const dx = aim.x - tower.x;
    const dy = aim.y - tower.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    dirX = length === 0 ? 1 : dx / length;
    dirY = length === 0 ? 0 : dy / length;
  }

  const projectile: ProjectileState = {
    id: state.nextId,
    kind: def.projectile.kind,
    x: tower.x,
    y: tower.y,
    prevX: tower.x,
    prevY: tower.y,
    speed: def.projectile.speed,
    damage: tier.damage,
    damageType: def.damageType,
    slow: tier.slow ?? null,
    targetId: target.id,
    dirX,
    dirY,
    maxDistance: tier.range + BOLT_EXTRA_RANGE,
    traveled: 0,
    pierceLeft: Math.max(1, def.projectile.pierce),
    hitIds: [],
  };
  state.nextId += 1;
  state.projectiles.push(projectile);
}

export function updateTowers(ctx: BattleContext): void {
  for (const tower of ctx.state.towers) {
    const tier = towerTier(ctx, tower);
    tower.cooldown += tier.attackSpeed / TICKS_PER_SECOND;
    if (tower.cooldown < 1) continue;

    const target = findTarget(ctx, tower, tier.range);
    if (!target) {
      tower.cooldown = 1;
      continue;
    }
    fire(ctx, tower, target);
    tower.cooldown -= 1;
  }
}
