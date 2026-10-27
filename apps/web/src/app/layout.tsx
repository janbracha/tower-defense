import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Guardians of the Nexus',
  description: 'A premium tower defense with heroes, research and rogue-lite depth.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-nexus-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
