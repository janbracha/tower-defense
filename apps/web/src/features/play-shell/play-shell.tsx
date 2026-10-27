'use client';

import { useCallback, useEffect, useState } from 'react';
import { BattleSession, type BattleResult, type GameSave } from '@gotn/app';
import { greenwoodGateContent } from '@gotn/content-core';
import { useAppFlow, useAppStores } from '@gotn/ui';
import { useContainer } from '@/composition/container-context';
import { MainMenu } from '@/features/menu/main-menu';
import { ResultsScreen } from '@/features/results/results-screen';
import { BattleScreen } from './battle-screen';

/** Screen router for /play, driven by the `appFlow` store. */
export function PlayShell() {
  const { saves, services } = useContainer();
  const { battleView } = useAppStores();
  const screen = useAppFlow((state) => state.screen);
  const navigate = useAppFlow((state) => state.navigate);

  const [save, setSave] = useState<GameSave | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [session, setSession] = useState<BattleSession | null>(null);
  const [result, setResult] = useState<BattleResult | null>(null);

  useEffect(() => {
    if (screen !== 'boot') return;
    let cancelled = false;
    void saves.load().then((loaded) => {
      if (cancelled) return;
      setSave(loaded.save);
      setWarning(loaded.warning);
      navigate('main-menu');
    });
    return () => {
      cancelled = true;
    };
  }, [screen, saves, navigate]);

  const start = useCallback(
    (next: BattleSession) => {
      battleView.getState().setModel(null);
      setResult(null);
      setSession(next);
      navigate('battle');
    },
    [battleView, navigate],
  );

  const newGame = useCallback(() => {
    // A fresh run replaces any saved one, so Continue never offers a stale run.
    void saves.clearCheckpoint().then((message) => {
      if (message) setWarning(message);
    });
    start(new BattleSession(greenwoodGateContent, Math.floor(services.clock.nowMs()) % 2 ** 31));
  }, [saves, services, start]);

  const continueGame = useCallback(() => {
    const checkpoint = saves.save.checkpoint;
    if (!checkpoint) return;
    try {
      start(BattleSession.fromCheckpoint(greenwoodGateContent, checkpoint));
    } catch (error) {
      services.logger.warn('Saved run could not be restored', {
        error: error instanceof Error ? error.message : String(error),
      });
      setWarning('The saved run could not be restored and was discarded.');
      void saves.clearCheckpoint().then(() => setSave(saves.save));
    }
  }, [saves, services, start]);

  const backToMenu = useCallback(() => {
    setSave(saves.save);
    navigate('main-menu');
  }, [saves, navigate]);

  const finished = useCallback(
    (outcome: BattleResult) => {
      setResult(outcome);
      void saves.recordResult(outcome).then((message) => {
        setSave(saves.save);
        if (message) setWarning(message);
      });
      navigate('results');
    },
    [saves, navigate],
  );

  if (screen === 'battle' && session) {
    return (
      <BattleScreen
        key={session.seed}
        session={session}
        onRestart={newGame}
        onQuit={backToMenu}
        onFinished={finished}
        onWarning={setWarning}
      />
    );
  }

  if (screen === 'results' && result) {
    return (
      <ResultsScreen
        result={result}
        totalWaves={greenwoodGateContent.waves.length}
        warning={warning}
        onRetry={newGame}
        onMenu={backToMenu}
      />
    );
  }

  return <MainMenu save={save} warning={warning} onNewGame={newGame} onContinue={continueGame} />;
}
