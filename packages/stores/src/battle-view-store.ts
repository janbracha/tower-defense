import { createStore, type StoreApi } from 'zustand/vanilla';
import type { BattleViewModel } from '@gotn/app';

export interface BattleViewState {
  readonly model: BattleViewModel | null;
  /** Pad whose tower (or empty pad) is selected. */
  readonly selectedPadId: string | null;
  /** Tower type armed for placement. */
  readonly buildTowerId: string | null;
  /** Latest explanation for a rejected action. */
  readonly notice: string | null;
  /** Draws range rings and the tile grid, and shows the debug panel. */
  readonly debug: boolean;
  readonly setModel: (model: BattleViewModel | null) => void;
  readonly selectPad: (padId: string | null) => void;
  readonly setBuildTower: (towerId: string | null) => void;
  readonly setNotice: (notice: string | null) => void;
  readonly setDebug: (debug: boolean) => void;
}

export type BattleViewStore = StoreApi<BattleViewState>;

export function createBattleViewStore(): BattleViewStore {
  return createStore<BattleViewState>()((set) => ({
    model: null,
    selectedPadId: null,
    buildTowerId: null,
    notice: null,
    debug: false,
    setModel: (model) => set({ model }),
    selectPad: (selectedPadId) => set({ selectedPadId }),
    setBuildTower: (buildTowerId) => set({ buildTowerId }),
    setNotice: (notice) => set({ notice }),
    setDebug: (debug) => set({ debug }),
  }));
}
