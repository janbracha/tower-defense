import type { ContentBundle, DamageType, EnemyDefinition, TowerDefinition } from '@gotn/content-schema';
import { Container, Graphics, Text } from 'pixi.js';
import { mountApplication, type StageOptions } from '../stage/create-stage';
import { computeLayout, pickPad, toPixel, toTile, type Layout } from './layout';
import {
  EMPTY_OVERLAY,
  type RenderEnemy,
  type RenderOverlay,
  type RenderProjectile,
  type RenderState,
} from './render-state';
import { COLORS, DAMAGE_COLORS, enemyStyle } from './styles';

export interface BattleViewHandle {
  /** Draws one frame; `alpha` in [0, 1] interpolates between the previous and current tick. */
  draw(state: RenderState, alpha: number, overlay?: RenderOverlay): void;
  /** Pad under a viewport position (e.g. a pointer event), or null. */
  padAt(clientX: number, clientY: number): string | null;
  destroy(): void;
}

const PICK_RADIUS_TILES = 0.9;
const PAD_RADIUS_TILES = 0.42;
const TOWER_RADIUS_TILES = 0.38;
const BOLT_LENGTH_TILES = 0.6;

const lerp = (from: number, to: number, t: number): number => from + (to - from) * t;

/** Pixi scene for one battle: static map plus per-frame towers, enemies and projectiles. */
export async function createBattleView(
  host: HTMLElement,
  content: ContentBundle,
  options: StageOptions = {},
): Promise<BattleViewHandle> {
  const app = await mountApplication(host, options);
  const towerDefs = new Map(content.towers.map((def) => [def.id, def]));
  const enemyDefs = new Map(content.enemies.map((def) => [def.id, def]));

  const staticLayer = new Container();
  const padLabels = new Container();
  const towerLayer = new Graphics();
  const enemyLayer = new Graphics();
  const projectileLayer = new Graphics();
  const overlayLayer = new Graphics();
  app.stage.addChild(staticLayer, padLabels, towerLayer, enemyLayer, projectileLayer, overlayLayer);

  const ground = new Graphics();
  staticLayer.addChild(ground);

  let layout: Layout | null = null;
  let layoutWidth = 0;
  let layoutHeight = 0;
  let lastDebug: boolean | null = null;

  function rebuildStatic(debug: boolean): void {
    layout = computeLayout(content.map.size, app.screen.width, app.screen.height);
    layoutWidth = app.screen.width;
    layoutHeight = app.screen.height;
    lastDebug = debug;
    drawStatic(ground, content, layout, debug);
    for (const child of padLabels.removeChildren()) child.destroy();
    for (const pad of content.map.pads) {
      const label = new Text({
        text: pad.id,
        style: { fontSize: Math.max(9, layout.tile * 0.22), fill: COLORS.padText },
      });
      const at = toPixel(layout, pad.position);
      label.anchor.set(0.5, 0);
      label.position.set(at.x, at.y + layout.tile * (PAD_RADIUS_TILES + 0.04));
      padLabels.addChild(label);
    }
  }

  function draw(state: RenderState, alpha: number, overlay: RenderOverlay = EMPTY_OVERLAY): void {
    if (
      !layout ||
      app.screen.width !== layoutWidth ||
      app.screen.height !== layoutHeight ||
      overlay.debug !== lastDebug
    ) {
      rebuildStatic(overlay.debug);
    }
    if (!layout) return;
    const view = layout;

    drawTowers(towerLayer, state, view, towerDefs);
    drawEnemies(enemyLayer, state.enemies, alpha, view, enemyDefs);
    drawProjectiles(projectileLayer, state.projectiles, alpha, view);
    drawOverlay(overlayLayer, state, overlay, view, content, towerDefs);
  }

  return {
    draw,
    padAt(clientX, clientY) {
      if (!layout) return null;
      const rect = app.canvas.getBoundingClientRect();
      const point = toTile(layout, clientX - rect.left, clientY - rect.top);
      return pickPad(content.map.pads, point, PICK_RADIUS_TILES)?.id ?? null;
    },
    destroy() {
      app.destroy({ removeView: true }, { children: true });
    },
  };
}

function drawStatic(g: Graphics, content: ContentBundle, layout: Layout, debug: boolean): void {
  const { map } = content;
  const { tile } = layout;
  g.clear();

  const origin = toPixel(layout, { x: 0, y: 0 });
  g.rect(origin.x, origin.y, map.size.x * tile, map.size.y * tile).fill(COLORS.ground);

  if (debug) {
    for (let x = 0; x <= map.size.x; x += 1) {
      const top = toPixel(layout, { x, y: 0 });
      g.moveTo(top.x, top.y).lineTo(top.x, top.y + map.size.y * tile);
    }
    for (let y = 0; y <= map.size.y; y += 1) {
      const left = toPixel(layout, { x: 0, y });
      g.moveTo(left.x, left.y).lineTo(left.x + map.size.x * tile, left.y);
    }
    g.stroke({ width: 1, color: COLORS.grid, alpha: 0.12 });
  }

  const points = map.path.map((point) => toPixel(layout, point));
  const trace = (): void => {
    const [first, ...rest] = points;
    if (!first) return;
    g.moveTo(first.x, first.y);
    for (const point of rest) g.lineTo(point.x, point.y);
  };
  trace();
  g.stroke({ width: tile * 0.95, color: COLORS.pathEdge, join: 'round', cap: 'round' });
  trace();
  g.stroke({ width: tile * 0.8, color: COLORS.pathFill, join: 'round', cap: 'round' });
  trace();
  g.stroke({ width: Math.max(1, tile * 0.06), color: COLORS.pathCenter, alpha: 0.6, join: 'round' });

  const spawn = points[0];
  if (spawn) {
    g.rect(spawn.x - tile * 0.25, spawn.y - tile * 0.45, tile * 0.5, tile * 0.9).fill(COLORS.spawn);
  }

  const nexus = points[points.length - 1];
  if (nexus) {
    const r = tile * 0.6;
    g.poly([nexus.x, nexus.y - r, nexus.x + r, nexus.y, nexus.x, nexus.y + r, nexus.x - r, nexus.y])
      .fill({ color: COLORS.nexus, alpha: 0.85 })
      .stroke({ width: 3, color: 0xffffff });
  }

  for (const pad of map.pads) {
    const at = toPixel(layout, pad.position);
    g.circle(at.x, at.y, tile * PAD_RADIUS_TILES)
      .fill({ color: 0x000000, alpha: 0.25 })
      .stroke({ width: 2, color: COLORS.pad, alpha: 0.8 });
  }
}

function towerShape(g: Graphics, damageType: DamageType, x: number, y: number, r: number): void {
  if (damageType === 'physical') {
    g.rect(x - r, y - r, r * 2, r * 2);
  } else if (damageType === 'arcane') {
    g.poly([x, y - r * 1.25, x + r * 1.25, y, x, y + r * 1.25, x - r * 1.25, y]);
  } else {
    g.poly([x, y - r * 1.2, x + r * 1.1, y + r * 0.9, x - r * 1.1, y + r * 0.9]);
  }
}

function drawTowers(
  g: Graphics,
  state: RenderState,
  layout: Layout,
  defs: ReadonlyMap<string, TowerDefinition>,
): void {
  g.clear();
  const r = layout.tile * TOWER_RADIUS_TILES;
  for (const tower of state.towers) {
    const def = defs.get(tower.defId);
    const at = toPixel(layout, tower);
    towerShape(g, def?.damageType ?? 'physical', at.x, at.y, r);
    g.fill(DAMAGE_COLORS[def?.damageType ?? 'physical']).stroke({ width: 2, color: 0xffffff });

    for (let pip = 0; pip <= tower.tier; pip += 1) {
      const px = at.x + (pip - tower.tier / 2) * r * 0.7;
      g.circle(px, at.y + r * 1.55, r * 0.22).fill(0xffffff);
    }
  }
}

function drawEnemies(
  g: Graphics,
  enemies: readonly RenderEnemy[],
  alpha: number,
  layout: Layout,
  defs: ReadonlyMap<string, EnemyDefinition>,
): void {
  g.clear();
  const { tile } = layout;
  for (const enemy of enemies) {
    const def = defs.get(enemy.defId);
    const style = enemyStyle(enemy.defId);
    const at = toPixel(layout, {
      x: lerp(enemy.prevX, enemy.x, alpha),
      y: lerp(enemy.prevY, enemy.y, alpha),
    });
    const r = style.radius * tile;

    if (def?.flying) {
      g.poly([at.x, at.y - r * 1.3, at.x + r * 1.2, at.y + r, at.x - r * 1.2, at.y + r]).fill(style.color);
    } else {
      g.circle(at.x, at.y, r).fill(style.color);
    }
    if (def?.boss && enemy.phase === 2) {
      g.circle(at.x, at.y, r + 6).stroke({ width: 4, color: COLORS.bossEnraged });
    }
    if (def?.pod && enemy.timerMax > 0) {
      const remaining = Math.max(0, Math.min(1, enemy.timerTicks / enemy.timerMax));
      const start = -Math.PI / 2;
      g.arc(at.x, at.y, r + 5, start, start + Math.PI * 2 * remaining).stroke({
        width: 4,
        color: COLORS.podTimer,
      });
    }
    if ((def?.armor ?? 0) > 0) g.circle(at.x, at.y, r + 2).stroke({ width: 2, color: COLORS.armor });
    if (enemy.slowAmount > 0) {
      g.circle(at.x, at.y, r + 5).stroke({ width: 2, color: COLORS.slow, alpha: 0.9 });
    }

    const barWidth = tile * 0.8;
    const barY = at.y - r - tile * 0.2;
    const fraction = Math.max(0, Math.min(1, enemy.hp / enemy.maxHp));
    g.rect(at.x - barWidth / 2, barY, barWidth, tile * 0.1).fill(COLORS.healthBack);
    g.rect(at.x - barWidth / 2, barY, barWidth * fraction, tile * 0.1).fill(COLORS.healthFill);
  }
}

function drawProjectiles(
  g: Graphics,
  projectiles: readonly RenderProjectile[],
  alpha: number,
  layout: Layout,
): void {
  g.clear();
  const { tile } = layout;
  for (const projectile of projectiles) {
    const color = DAMAGE_COLORS[projectile.damageType];
    const at = toPixel(layout, {
      x: lerp(projectile.prevX, projectile.x, alpha),
      y: lerp(projectile.prevY, projectile.y, alpha),
    });
    if (projectile.kind === 'bolt') {
      const length = BOLT_LENGTH_TILES * tile;
      g.moveTo(at.x - projectile.dirX * length, at.y - projectile.dirY * length)
        .lineTo(at.x, at.y)
        .stroke({ width: Math.max(2, tile * 0.09), color, cap: 'round' });
    } else {
      g.circle(at.x, at.y, Math.max(2.5, tile * 0.1)).fill(color).stroke({ width: 1, color: 0xffffff });
    }
  }
}

function drawOverlay(
  g: Graphics,
  state: RenderState,
  overlay: RenderOverlay,
  layout: Layout,
  content: ContentBundle,
  towerDefs: ReadonlyMap<string, TowerDefinition>,
): void {
  g.clear();
  const { tile } = layout;
  const padPosition = (padId: string) => content.map.pads.find((pad) => pad.id === padId)?.position;

  if (overlay.debug) {
    for (const tower of state.towers) {
      const range = towerDefs.get(tower.defId)?.tiers[tower.tier]?.range ?? 0;
      const at = toPixel(layout, tower);
      g.circle(at.x, at.y, range * tile).stroke({ width: 1, color: 0xffffff, alpha: 0.25 });
    }
  }

  const selectedTower = overlay.selectedPadId
    ? state.towers.find((tower) => tower.padId === overlay.selectedPadId)
    : undefined;
  if (overlay.selectedPadId) {
    const position = padPosition(overlay.selectedPadId);
    if (position) {
      const at = toPixel(layout, position);
      g.circle(at.x, at.y, tile * (PAD_RADIUS_TILES + 0.12)).stroke({ width: 3, color: COLORS.selection });
      const range = selectedTower
        ? (towerDefs.get(selectedTower.defId)?.tiers[selectedTower.tier]?.range ?? 0)
        : 0;
      if (range > 0) {
        g.circle(at.x, at.y, range * tile)
          .fill({ color: COLORS.selection, alpha: 0.06 })
          .stroke({ width: 2, color: COLORS.selection, alpha: 0.6 });
      }
    }
  }

  if (overlay.hoverPadId) {
    const position = padPosition(overlay.hoverPadId);
    const at = position ? toPixel(layout, position) : null;
    if (at) {
      g.circle(at.x, at.y, tile * (PAD_RADIUS_TILES + 0.06)).stroke({ width: 2, color: 0xffffff, alpha: 0.7 });
      const ghost = overlay.ghost;
      const def = ghost ? towerDefs.get(ghost.towerId) : undefined;
      if (ghost && def) {
        const color = ghost.valid ? COLORS.valid : COLORS.invalid;
        const range = def.tiers[0]?.range ?? 0;
        g.circle(at.x, at.y, range * tile)
          .fill({ color, alpha: 0.08 })
          .stroke({ width: 2, color, alpha: 0.7 });
        towerShape(g, def.damageType, at.x, at.y, tile * TOWER_RADIUS_TILES);
        g.fill({ color, alpha: 0.5 });
      }
    }
  }
}
