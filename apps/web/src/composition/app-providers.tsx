'use client';

import { useState, type ReactNode } from 'react';
import { StoresProvider } from '@gotn/ui';
import { ContainerProvider } from './container-context';
import { createAppContainer } from './create-app-container';

export function AppProviders({ children }: { children: ReactNode }) {
  const [container] = useState(createAppContainer);

  return (
    <ContainerProvider value={container}>
      <StoresProvider stores={container.stores}>{children}</StoresProvider>
    </ContainerProvider>
  );
}
