import { createStore, type StoreApi } from 'zustand/vanilla';

export type Screen =
  | 'boot'
  | 'profile-select'
  | 'main-menu'
  | 'citadel'
  | 'map-select'
  | 'rift-hub'
  | 'loadout'
  | 'battle-loading'
  | 'battle'
  | 'paused'
  | 'results'
  | 'settings'
  | 'suspended';

export interface AppFlowState {
  readonly screen: Screen;
  readonly navigate: (screen: Screen) => void;
}

export type AppFlowStore = StoreApi<AppFlowState>;

export function createAppFlowStore(initial: Screen = 'boot'): AppFlowStore {
  return createStore<AppFlowState>()((set) => ({
    screen: initial,
    navigate: (screen) => set({ screen }),
  }));
}
