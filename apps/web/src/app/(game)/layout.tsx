import type { ReactNode } from 'react';
import { AppProviders } from '@/composition/app-providers';

export default function GameLayout({ children }: { children: ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
