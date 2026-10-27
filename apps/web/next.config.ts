import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  transpilePackages: [
    '@gotn/app',
    '@gotn/content-core',
    '@gotn/content-schema',
    '@gotn/infra',
    '@gotn/kernel',
    '@gotn/meta',
    '@gotn/render',
    '@gotn/sim',
    '@gotn/sim-host',
    '@gotn/stores',
    '@gotn/ui',
  ],
};

export default nextConfig;
