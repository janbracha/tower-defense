'use client';

import { useStore } from 'zustand';
import type { AppFlowState, BattleViewState, SettingsState } from '@gotn/stores';
import { useAppStores } from './providers/stores-provider';

/** Selector is mandatory: whole-store subscriptions cause needless re-renders. */
export function useAppFlow<T>(selector: (state: AppFlowState) => T): T {
  return useStore(useAppStores().appFlow, selector);
}

export function useSettings<T>(selector: (state: SettingsState) => T): T {
  return useStore(useAppStores().settings, selector);
}

export function useBattleView<T>(selector: (state: BattleViewState) => T): T {
  return useStore(useAppStores().battleView, selector);
}
