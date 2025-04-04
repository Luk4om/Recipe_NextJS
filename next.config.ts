import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
      },
      {
        protocol: 'https',
        hostname: 'www.foodandwine.com',
      }
    ],
    domains: ['lh3.googleusercontent.com', 'www.themealdb.com'],
  },
}
export default nextConfig;
