import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cinnavo-lms-project-2.t3.storageapi.dev',
        port: ''
      }
    ]
  }
};

export default nextConfig;
