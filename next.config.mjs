
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cacheComponents: true,
  },
  images: {
    domains: ['images.pexels.com'],
  },
};

export default nextConfig;
