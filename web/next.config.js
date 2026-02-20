/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  // Must match turbopack.root to avoid Vercel warning
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
