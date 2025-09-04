import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ['@next/font']
  },

  images: {
    domains: ['i.pravatar.cc'],
  },
};

export default nextConfig;
