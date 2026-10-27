import type { Vec2 } from '@gotn/content-schema';

/** Polyline with cumulative lengths so positions can be queried by distance travelled. */
export class Path {
  readonly length: number;
  private readonly points: readonly Vec2[];
  private readonly cumulative: readonly number[];

  constructor(points: readonly Vec2[]) {
    if (points.length < 2) {
      throw new Error('A path needs at least two points');
    }
    const cumulative: number[] = [0];
    let total = 0;
    for (let i = 1; i < points.length; i += 1) {
      const from = points[i - 1] as Vec2;
      const to = points[i] as Vec2;
      total += distance(from, to);
      cumulative.push(total);
    }
    this.points = points;
    this.cumulative = cumulative;
    this.length = total;
  }

  get start(): Vec2 {
    return this.points[0] as Vec2;
  }

  get end(): Vec2 {
    return this.points[this.points.length - 1] as Vec2;
  }

  /** Position after travelling `s` tiles; clamped to the path ends. */
  positionAt(s: number): Vec2 {
    if (s <= 0) return this.start;
    if (s >= this.length) return this.end;

    let index = 1;
    while (index < this.cumulative.length - 1 && (this.cumulative[index] as number) < s) {
      index += 1;
    }
    const from = this.points[index - 1] as Vec2;
    const to = this.points[index] as Vec2;
    const segmentStart = this.cumulative[index - 1] as number;
    const segmentLength = (this.cumulative[index] as number) - segmentStart;
    const t = segmentLength === 0 ? 0 : (s - segmentStart) / segmentLength;
    return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
  }
}

export function distance(a: Vec2, b: Vec2): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}
