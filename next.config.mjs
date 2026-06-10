
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: {
    bodySizeLimit: '20mb',
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
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      // News sources (RSS feeds)
      {
        protocol: 'https',
        hostname: 'static01.nyt.com',
      },
      {
        protocol: 'https',
        hostname: 'ichef.bbci.co.uk',
      },
      {
        protocol: 'https',
        hostname: '*.bbc.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'media.zenfs.com',
      },
      {
        protocol: 'https',
        hostname: 'a57.foxnews.com',
      },
      {
        protocol: 'https',
        hostname: 'i.guim.co.uk',
      },
      // Google Storage (videos)
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
