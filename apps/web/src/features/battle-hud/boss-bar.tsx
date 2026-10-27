'use client';

import { useBattleView } from '@gotn/ui';

/** Boss health bar; hidden when no boss is on the field. */
export function BossBar() {
  const boss = useBattleView((state) => state.model?.boss ?? null);
  if (!boss) return null;

  const fraction = boss.maxHp === 0 ? 0 : Math.max(0, Math.min(1, boss.hp / boss.maxHp));
  return (
    <div className="pointer-events-none absolute left-1/2 top-3 w-[min(32rem,70%)] -translate-x-1/2" data-testid="boss-bar">
      <div className="mb-1 flex justify-between text-sm font-semibold">
        <span>{boss.name}</span>
        <span className={boss.phase === 2 ? 'text-red-300' : 'text-nexus-200'}>
          {boss.phase === 2 ? 'Enraged · ' : ''}
          {Math.ceil(boss.hp)} / {boss.maxHp}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded bg-black/60 ring-1 ring-white/30">
        <div
          className={`h-full ${boss.phase === 2 ? 'bg-red-500' : 'bg-fuchsia-500'}`}
          style={{ width: `${fraction * 100}%` }}
        />
      </div>
    </div>
  );
}
