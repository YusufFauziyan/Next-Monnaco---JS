/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://onecompiler.com/api/:path*",
      },
    ];
  },
  // reactStrictMode: true,
  env: {
    API_URL: "/api",
  },
};

module.exports = nextConfig;
