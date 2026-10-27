'use client';

import type { BattleSession } from '@gotn/app';
import { Button, useAppStores, useBattleView } from '@gotn/ui';

/** Pause, speed, debug toggle and restart. */
export function SpeedControls({
  session,
  onRestart,
  onQuit,
}: {
  session: BattleSession;
  onRestart: () => void;
  onQuit: () => void;
}) {
  const { battleView } = useAppStores();
  const model = useBattleView((state) => state.model);
  const debug = useBattleView((state) => state.debug);
  if (!model) return null;

  const refresh = (): void => battleView.getState().setModel(session.view());

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        aria-pressed={model.paused}
        onClick={() => {
          session.setPaused(!model.paused);
          refresh();
        }}
      >
        {model.paused ? 'Resume (Space)' : 'Pause (Space)'}
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          session.setSpeed(model.speed === 1 ? 2 : 1);
          refresh();
        }}
      >
        Speed {model.speed}×
      </Button>
      <Button variant="ghost" aria-pressed={debug} onClick={() => battleView.getState().setDebug(!debug)}>
        Debug {debug ? 'on' : 'off'} (D)
      </Button>
      <Button variant="ghost" onClick={onRestart}>
        Restart
      </Button>
      <Button variant="ghost" onClick={onQuit}>
        Menu
      </Button>
    </div>
  );
}
