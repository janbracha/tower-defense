'use client';

import { useCallback, useEffect, useState } from 'react';
import type { BattleEvent, BattleResult, BattleSession } from '@gotn/app';
import { useAppStores } from '@gotn/ui';
import { useContainer } from '@/composition/container-context';
import { BattleCanvas } from '@/features/battle-canvas/battle-canvas';
import { useBattleHotkeys } from '@/features/battle-canvas/use-battle-hotkeys';
import { BossBar } from '@/features/battle-hud/boss-bar';
import { BuildBar } from '@/features/battle-hud/build-bar';
import { DebugPanel } from '@/features/battle-hud/debug-panel';
import { SpeedControls } from '@/features/battle-hud/speed-controls';
import { StatusBar } from '@/features/battle-hud/status-bar';
import { WavePanel } from '@/features/battle-hud/wave-panel';

const BANNER_MS = 4000;

export function BattleScreen({
  session,
  onRestart,
  onQuit,
  onFinished,
  onWarning,
}: {
  session: BattleSession;
  onRestart: () => void;
  onQuit: () => void;
  onFinished: (result: BattleResult) => void;
  onWarning: (message: string) => void;
}) {
  const { saves } = useContainer();
  const { battleView } = useAppStores();
  const [banner, setBanner] = useState<string | null>(null);

  useBattleHotkeys(session);

  const saveCheckpoint = useCallback(() => {
    const checkpoint = session.checkpoint();
    if (!checkpoint) return;
    void saves.saveCheckpoint(checkpoint).then((warning) => {
      if (warning) onWarning(warning);
    });
  }, [session, saves, onWarning]);

  const handleEvents = useCallback(
    (events: readonly BattleEvent[]) => {
      for (const event of events) {
        switch (event.type) {
          case 'waveCleared':
            saveCheckpoint();
            break;
          case 'bossSpawned':
            setBanner('Sporemother Myra approaches! Destroy her Spore Pods before they hatch.');
            break;
          case 'bossPhaseChanged':
            setBanner('Myra is enraged: faster, with more pods!');
            break;
          case 'victory':
          case 'defeat': {
            const result = session.result();
            if (result) onFinished(result);
            break;
          }
          default:
            break;
        }
      }
    },
    [session, saveCheckpoint, onFinished],
  );

  useEffect(() => {
    if (!banner) return;
    const timer = setTimeout(() => setBanner(null), BANNER_MS);
    return () => clearTimeout(timer);
  }, [banner]);

  // Leaving the tab at a wave break is the one moment a checkpoint is both valid and likely the last chance.
  useEffect(() => {
    const onVisibility = (): void => {
      if (document.visibilityState === 'hidden') saveCheckpoint();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [saveCheckpoint]);

  useEffect(() => {
    const state = battleView.getState();
    state.selectPad(null);
    state.setBuildTower(null);
    state.setNotice(null);
  }, [battleView, session]);

  return (
    <div className="flex h-dvh flex-col bg-nexus-950 text-nexus-50">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-nexus-900 px-4 py-2">
        <StatusBar />
        <WavePanel session={session} />
        <SpeedControls session={session} onRestart={onRestart} onQuit={onQuit} />
      </header>
      <main className="relative min-h-0 flex-1">
        <BattleCanvas session={session} onEvents={handleEvents} />
        <BossBar />
        <DebugPanel />
        {banner ? (
          <div
            role="status"
            className="pointer-events-none absolute inset-x-0 top-16 mx-auto w-fit rounded bg-black/70 px-4 py-2 text-lg font-semibold text-yellow-200"
            data-testid="banner"
          >
            {banner}
          </div>
        ) : null}
      </main>
      <footer className="border-t border-nexus-900 px-4 py-2">
        <BuildBar session={session} />
      </footer>
    </div>
  );
}
