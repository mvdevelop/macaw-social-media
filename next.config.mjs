
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cacheComponents: true,
  },
  images: {
    domains: ['images.pexels.com', 'media.gettyimages.com'],
  },
};

export default nextConfig;
