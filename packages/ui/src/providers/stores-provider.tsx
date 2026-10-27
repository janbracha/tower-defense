'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { AppStores } from '@gotn/stores';

const StoresContext = createContext<AppStores | null>(null);

export interface StoresProviderProps {
  readonly stores: AppStores;
  readonly children: ReactNode;
}

export function StoresProvider({ stores, children }: StoresProviderProps) {
  return <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>;
}

export function useAppStores(): AppStores {
  const stores = useContext(StoresContext);
  if (!stores) {
    throw new Error('useAppStores must be used inside <StoresProvider>');
  }
  return stores;
}
