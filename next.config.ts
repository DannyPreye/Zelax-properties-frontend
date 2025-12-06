import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zelax-properties-23443.fly.dev",
      },
      {
        protocol: "http",
        hostname: "zelax-properties-23443.fly.dev",
      },
    ],
  },
};

export default nextConfig;
