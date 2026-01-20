
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cacheComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'media.gettyimages.com',
      },
    ],
  },
};

export default nextConfig;
