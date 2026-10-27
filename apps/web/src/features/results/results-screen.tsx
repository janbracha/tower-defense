'use client';

import type { BattleResult } from '@gotn/app';
import { Button } from '@gotn/ui';
import { formatTime } from '@/features/format-time';

export function ResultsScreen({
  result,
  totalWaves,
  warning,
  onRetry,
  onMenu,
}: {
  result: BattleResult;
  totalWaves: number;
  warning: string | null;
  onRetry: () => void;
  onMenu: () => void;
}) {
  const won = result.outcome === 'victory';
  const rows: readonly [string, string][] = [
    ['Waves cleared', `${result.wavesCleared} / ${totalWaves}`],
    ['Enemies defeated', String(result.kills)],
    ['Gold earned', String(result.goldEarned)],
    ['Nexus lives left', String(result.livesLeft)],
    ['Time', formatTime(result.ticks)],
  ];

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-6 bg-nexus-950 text-nexus-50" data-testid="results">
      <h1 className={`text-5xl font-bold ${won ? 'text-green-300' : 'text-red-300'}`}>
        {won ? 'Victory' : 'Defeat'}
      </h1>
      <p className="text-nexus-200">
        {won ? 'Sporemother Myra has fallen. The Nexus holds.' : 'The Nexus has fallen.'}
      </p>
      <dl className="grid grid-cols-[auto_auto] gap-x-8 gap-y-1">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-nexus-400">{label}</dt>
            <dd className="text-right tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex gap-3">
        <Button onClick={onRetry}>Retry</Button>
        <Button variant="ghost" onClick={onMenu}>
          Back to menu
        </Button>
      </div>
      {warning ? (
        <p role="status" className="text-sm text-yellow-300">
          {warning}
        </p>
      ) : null}
    </div>
  );
}
