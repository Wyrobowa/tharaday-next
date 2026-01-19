import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ['ds-creator'],
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
