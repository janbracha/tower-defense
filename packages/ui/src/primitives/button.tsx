import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly variant?: 'primary' | 'ghost';
};

const BASE =
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nexus-400 disabled:opacity-50';

const VARIANTS = {
  primary: 'bg-nexus-500 text-white hover:bg-nexus-400',
  ghost: 'bg-transparent text-nexus-200 hover:bg-nexus-800',
} as const;

export function Button({ variant = 'primary', className = '', ...rest }: ButtonProps) {
  return <button type="button" className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest} />;
}
