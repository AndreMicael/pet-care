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

  // Configuração para Prisma no Vercel
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client');
    }
    return config;
  },
};

export default nextConfig;
