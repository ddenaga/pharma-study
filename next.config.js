/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'this-person-does-not-exist.com',
        port: '',
        pathname: '/gen/**',
      },
    ],
  },
};

module.exports = nextConfig;
