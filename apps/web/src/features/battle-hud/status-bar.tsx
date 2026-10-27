'use client';

import { useBattleView } from '@gotn/ui';

function Stat({ label, value, tone = '' }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex flex-col leading-tight">
      <span className="text-[10px] uppercase tracking-wide text-nexus-400">{label}</span>
      <span className={`text-lg font-semibold tabular-nums ${tone}`}>{value}</span>
    </div>
  );
}

const PHASE_LABEL = {
  break: 'Break',
  spawning: 'Spawning',
  clearing: 'Clear the field',
} as const;

/** Gold, Nexus lives and wave progress. */
export function StatusBar() {
  const model = useBattleView((state) => state.model);
  if (!model) return null;

  const lowLives = model.lives <= model.startLives / 4;
  const phaseText =
    model.phase === 'break'
      ? `${PHASE_LABEL.break} ${model.breakSecondsLeft.toFixed(1)}s`
      : `${PHASE_LABEL[model.phase]} (${model.enemiesAlive + model.toSpawn} left)`;

  return (
    <div className="flex items-center gap-8" data-testid="status-bar">
      <Stat label="Gold" value={String(model.gold)} tone="text-yellow-300" />
      <Stat
        label="Nexus lives"
        value={`${model.lives} / ${model.startLives}`}
        tone={lowLives ? 'text-red-400' : 'text-cyan-300'}
      />
      <Stat label="Wave" value={`${model.wave} / ${model.totalWaves}`} />
      <Stat label="Phase" value={phaseText} />
    </div>
  );
}
