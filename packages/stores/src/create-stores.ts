import { createAppFlowStore, type AppFlowStore } from './app-flow-store';
import { createBattleViewStore, type BattleViewStore } from './battle-view-store';
import { createSettingsStore, type SettingsStore } from './settings-store';

export interface AppStores {
  readonly appFlow: AppFlowStore;
  readonly settings: SettingsStore;
  readonly battleView: BattleViewStore;
}

export function createStores(): AppStores {
  return {
    appFlow: createAppFlowStore(),
    settings: createSettingsStore(),
    battleView: createBattleViewStore(),
  };
}
