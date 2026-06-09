import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
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
      { source: '/find-a-coach', destination: '/admissions/contact', permanent: false }, // temporary redirect until built
    ];
  },
};

export default nextConfig;
