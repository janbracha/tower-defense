'use client';

import type { BattleSession } from '@gotn/app';
import { Button, useAppStores, useBattleView } from '@gotn/ui';
import { runCommand } from './commands';

/** Next wave composition, plus the start / early-call button. */
export function WavePanel({ session }: { session: BattleSession }) {
  const { battleView } = useAppStores();
  const model = useBattleView((state) => state.model);
  if (!model) return null;

  const canCall = model.status === 'running' && model.phase === 'break' && model.wave < model.totalWaves;

  return (
    <div className="flex items-center gap-3 text-sm" data-testid="wave-panel">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wide text-nexus-400">
          {model.nextWave ? `Next: wave ${model.wave + 1}` : 'Final wave underway'}
        </span>
        <span className="text-nexus-50">
          {model.nextWave
            ? model.nextWave.map((entry) => `${entry.count}× ${entry.name}`).join(', ')
            : '—'}
        </span>
      </div>
      <Button disabled={!canCall} onClick={() => runCommand(session, battleView, { type: 'startWave' })}>
        {model.wave === 0 ? 'Start wave' : 'Call next wave'}
      </Button>
    </div>
  );
}
