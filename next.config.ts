import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.pollinations.ai'], // ✅ Allow images from this domain
  },
};

module.exports = nextConfig;
