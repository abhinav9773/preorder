import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "ibb.co",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  reactStrictMode: true,
};

export default nextConfig;
