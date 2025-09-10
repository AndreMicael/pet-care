import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ['@next/font']
  },

  images: {
    domains: ['i.pravatar.cc'],
  },

  eslint: {
    // Desativa o ESLint durante o build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
