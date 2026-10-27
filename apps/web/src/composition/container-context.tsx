'use client';

import { createContext, useContext } from 'react';
import type { AppContainer } from './create-app-container';

const ContainerContext = createContext<AppContainer | null>(null);

export const ContainerProvider = ContainerContext.Provider;

export function useContainer(): AppContainer {
  const container = useContext(ContainerContext);
  if (!container) throw new Error('useContainer must be used inside <AppProviders>');
  return container;
}
