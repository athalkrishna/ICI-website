import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.b-cdn.net',
      },
      {
        protocol: 'https',
        hostname: 'internationalcoachinginstitute.org',
      },
      {
        protocol: 'https',
        hostname: 'www.internationalcoachinginstitute.org',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    memoryBasedWorkersCount: true,
    cpus: 1,
    workerThreads: false,
  },
  serverExternalPackages: ['@sanity/client'],
  async redirects() {
    return [
      { source: '/about/rankings', destination: '/about/accreditation', permanent: true },
      { source: '/credentials/iac', destination: '/credentials/catalyst', permanent: true },
      { source: '/credentials/ipc', destination: '/credentials/architect', permanent: true },
      { source: '/credentials/imc', destination: '/credentials/luminary', permanent: true },
      { source: '/programs/health-&-wellness', destination: '/programmes/health-wellness', permanent: true },
      { source: '/programs/certified-life-coach', destination: '/programmes/certified-life-coach', permanent: true },
      { source: '/programs/executive-coaching', destination: '/programmes/executive-coaching', permanent: true },
      { source: '/programs/business-coach', destination: '/programmes/business-coach', permanent: true },
      { source: '/programs', destination: '/programmes', permanent: true },
      { source: '/programs/:path*', destination: '/programmes/:path*', permanent: true },
      { source: '/organizations', destination: '/organisations', permanent: true },
      { source: '/organizations/:path*', destination: '/organisations/:path*', permanent: true },

    ];
  },
};

export default nextConfig;
