// @type {import('next').NextConfig} 
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["images.unsplash.com","m.media-amazon.com"],
  },
};

module.exports =nextConfig;
