'use client';

import type { GameSave } from '@gotn/app';
import { Button } from '@gotn/ui';
import { formatTime } from '@/features/format-time';

export function MainMenu({
  save,
  warning,
  onNewGame,
  onContinue,
}: {
  save: GameSave | null;
  warning: string | null;
  onNewGame: () => void;
  onContinue: () => void;
}) {
  const checkpoint = save?.checkpoint ?? null;
  const profile = save?.profile;

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-6 bg-nexus-950 text-nexus-50">
      <h1 className="text-4xl font-bold">Guardians of the Nexus</h1>
      <p className="text-nexus-200">Greenwood Gate · 15 waves · defeat Sporemother Myra</p>

      <div className="flex flex-col gap-3">
        <Button onClick={onNewGame} disabled={!save}>
          New Game
        </Button>
        <Button onClick={onContinue} disabled={!checkpoint} variant={checkpoint ? 'primary' : 'ghost'}>
          {checkpoint
            ? `Continue (wave ${checkpoint.wave + 1} of 15, ${checkpoint.lives} lives)`
            : 'Continue (no saved run)'}
        </Button>
      </div>

      {profile && profile.runs > 0 ? (
        <p className="text-sm text-nexus-200" data-testid="profile-summary">
          Runs: {profile.runs} · Victories: {profile.clears}
          {profile.bestLivesLeft !== null && profile.bestTicks !== null
            ? ` · Best: ${profile.bestLivesLeft} lives left in ${formatTime(profile.bestTicks)}`
            : ''}
        </p>
      ) : null}

      {warning ? (
        <p role="status" className="max-w-md text-center text-sm text-yellow-300">
          {warning}
        </p>
      ) : null}
    </div>
  );
}
