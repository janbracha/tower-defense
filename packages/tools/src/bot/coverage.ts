import type { ContentBundle, PadDefinition, TowerDefinition } from '@gotn/content-schema';
import { distance, Path } from '@gotn/sim';

const SAMPLE_STEP = 0.25;

/** How much of the enemy route (in tiles) a tower with this range would cover from the pad. */
export function padCoverage(content: ContentBundle, pad: PadDefinition, range: number): number {
  const path = new Path(content.map.path);
  let covered = 0;
  for (let s = 0; s <= path.length; s += SAMPLE_STEP) {
    if (distance(pad.position, path.positionAt(s)) <= range) covered += SAMPLE_STEP;
  }
  return covered;
}

/** Free pads best first for the given tower: most route coverage, ties broken by pad order. */
export function rankPads(
  content: ContentBundle,
  tower: TowerDefinition,
  freePadIds: ReadonlySet<string>,
): PadDefinition[] {
  const range = tower.tiers[0]?.range ?? 0;
  return content.map.pads
    .filter((pad) => freePadIds.has(pad.id))
    .map((pad, index) => ({ pad, index, coverage: padCoverage(content, pad, range) }))
    .sort((a, b) => b.coverage - a.coverage || a.index - b.index)
    .map((entry) => entry.pad);
}
