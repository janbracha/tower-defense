'use client';

import { useEffect } from 'react';
import type { BattleSession } from '@gotn/app';
import { useAppStores } from '@gotn/ui';
import { runCommand } from '@/features/battle-hud/commands';

/** Keys: 1-3 pick a tower, Space pause, N next wave, U upgrade, S sell, D debug, Esc cancel. */
export function useBattleHotkeys(session: BattleSession): void {
  const { battleView } = useAppStores();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const state = battleView.getState();
      const refresh = (): void => state.setModel(session.view());

      const towerIndex = Number(event.key) - 1;
      const tower = Number.isInteger(towerIndex) ? session.content.towers[towerIndex] : undefined;
      if (tower) {
        state.setBuildTower(state.buildTowerId === tower.id ? null : tower.id);
        return;
      }

      switch (event.key.toLowerCase()) {
        case ' ':
          event.preventDefault();
          session.setPaused(!session.paused);
          refresh();
          break;
        case 'n':
          runCommand(session, battleView, { type: 'startWave' });
          break;
        case 'u':
          if (state.selectedPadId) {
            runCommand(session, battleView, { type: 'upgradeTower', padId: state.selectedPadId });
          }
          break;
        case 's':
          if (state.selectedPadId) {
            runCommand(session, battleView, { type: 'sellTower', padId: state.selectedPadId });
          }
          break;
        case 'd':
          state.setDebug(!state.debug);
          break;
        case 'escape':
          state.setBuildTower(null);
          state.selectPad(null);
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [session, battleView]);
}
