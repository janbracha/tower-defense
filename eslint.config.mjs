import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import tseslint from 'typescript-eslint';
import { layerConfigs, webLayerConfig } from './tooling/eslint/layers.mjs';

const webFiles = ['apps/web/**/*.{js,jsx,mjs,ts,tsx}'];

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/dist/**',
      '**/coverage/**',
      '**/next-env.d.ts',
      'docs/**',
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  ...nextVitals.map((config) => ({
    ...config,
    files: webFiles,
    settings: { ...config.settings, next: { rootDir: 'apps/web' } },
  })),
  ...layerConfigs(),
  webLayerConfig,
);
