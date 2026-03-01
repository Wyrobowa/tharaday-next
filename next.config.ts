import type { NextConfig } from 'next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || basePath;

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tharaday-vercel.vercel.app/api/:path*',
      },
    ];
  },
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  transpilePackages: ['@wyrobowa/ds-creator'],
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
