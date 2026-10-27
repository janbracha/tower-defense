import { describe, expect, it } from 'vitest';
import { computeLayout, pickPad, toPixel, toTile } from './layout';

describe('layout', () => {
  it('centers the map and keeps a margin', () => {
    const layout = computeLayout({ x: 20, y: 10 }, 1100, 800);
    expect(layout.tile).toBeCloseTo(1100 / 21, 5);
    expect(layout.offsetX).toBeCloseTo((1100 - 20 * layout.tile) / 2, 5);
    expect(layout.offsetY).toBeCloseTo((800 - 10 * layout.tile) / 2, 5);
  });

  it('is limited by the tighter dimension', () => {
    const layout = computeLayout({ x: 20, y: 10 }, 2000, 220);
    expect(layout.tile).toBeCloseTo(20, 5);
  });

  it('round-trips tile and pixel coordinates', () => {
    const layout = computeLayout({ x: 21, y: 12 }, 900, 600);
    const pixel = toPixel(layout, { x: 3.5, y: 7 });
    const tile = toTile(layout, pixel.x, pixel.y);
    expect(tile.x).toBeCloseTo(3.5, 6);
    expect(tile.y).toBeCloseTo(7, 6);
  });
});

describe('pickPad', () => {
  const pads = [
    { id: 'a', position: { x: 1, y: 1 } },
    { id: 'b', position: { x: 2, y: 1 } },
  ];

  it('returns the nearest pad within the radius', () => {
    expect(pickPad(pads, { x: 1.8, y: 1 }, 0.8)?.id).toBe('b');
  });

  it('returns null when nothing is close enough', () => {
    expect(pickPad(pads, { x: 5, y: 5 }, 0.8)).toBeNull();
  });
});
