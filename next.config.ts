import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blsgcaqnozdycxjxdehv.supabase.co',
      },
    ],
  },
};

export default nextConfig;
