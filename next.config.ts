import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ['@next/font']
  }
};

export default nextConfig;
