import { createStore, type StoreApi } from 'zustand/vanilla';

export type QualityTier = 'low' | 'medium' | 'high' | 'ultra';

export interface SettingsValues {
  readonly masterVolume: number;
  readonly musicVolume: number;
  readonly sfxVolume: number;
  readonly quality: QualityTier;
  readonly language: string;
}

export interface SettingsState extends SettingsValues {
  readonly update: (patch: Partial<SettingsValues>) => void;
}

export type SettingsStore = StoreApi<SettingsState>;

export const DEFAULT_SETTINGS: SettingsValues = {
  masterVolume: 0.8,
  musicVolume: 0.7,
  sfxVolume: 0.8,
  quality: 'medium',
  language: 'en',
};

export function createSettingsStore(initial: SettingsValues = DEFAULT_SETTINGS): SettingsStore {
  return createStore<SettingsState>()((set) => ({
    ...initial,
    update: (patch) => set(patch),
  }));
}
