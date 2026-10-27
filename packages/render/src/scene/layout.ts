import type { PadDefinition, Vec2 } from '@gotn/content-schema';

export interface Layout {
  /** Pixels per tile. */
  readonly tile: number;
  readonly offsetX: number;
  readonly offsetY: number;
}

const MARGIN_TILES = 0.5;

/** Fits the map into the viewport, centered, with a half-tile margin. */
export function computeLayout(mapSize: Vec2, width: number, height: number): Layout {
  const tile = Math.max(
    1,
    Math.min(width / (mapSize.x + 2 * MARGIN_TILES), height / (mapSize.y + 2 * MARGIN_TILES)),
  );
  return {
    tile,
    offsetX: (width - mapSize.x * tile) / 2,
    offsetY: (height - mapSize.y * tile) / 2,
  };
}

export function toPixel(layout: Layout, point: Vec2): Vec2 {
  return { x: layout.offsetX + point.x * layout.tile, y: layout.offsetY + point.y * layout.tile };
}

export function toTile(layout: Layout, px: number, py: number): Vec2 {
  return { x: (px - layout.offsetX) / layout.tile, y: (py - layout.offsetY) / layout.tile };
}

/** Nearest pad within `radius` tiles of the point, or null. */
export function pickPad(
  pads: readonly PadDefinition[],
  point: Vec2,
  radius: number,
): PadDefinition | null {
  let best: PadDefinition | null = null;
  let bestDistance = radius;
  for (const pad of pads) {
    const distance = Math.hypot(pad.position.x - point.x, pad.position.y - point.y);
    if (distance <= bestDistance) {
      best = pad;
      bestDistance = distance;
    }
  }
  return best;
}
