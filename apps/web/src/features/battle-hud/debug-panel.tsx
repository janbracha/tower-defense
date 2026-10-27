'use client';

import { useBattleView } from '@gotn/ui';

/** Simulation internals for debugging; the hash changes whenever any state changes. */
export function DebugPanel() {
  const debug = useBattleView((state) => state.debug);
  const model = useBattleView((state) => state.model);
  if (!debug || !model) return null;

  const rows: readonly [string, string | number][] = [
    ['seed', model.seed],
    ['tick', model.tick],
    ['status', model.status],
    ['phase', model.phase],
    ['enemies', model.enemiesAlive],
    ['to spawn', model.toSpawn],
    ['projectiles', model.projectiles],
    ['towers', model.towers.length],
    ['hash', model.hash],
  ];

  return (
    <dl
      className="pointer-events-none absolute left-2 top-2 grid grid-cols-[auto_auto] gap-x-3 rounded bg-black/60 p-2 font-mono text-xs text-nexus-50"
      data-testid="debug-panel"
    >
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-nexus-400">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
