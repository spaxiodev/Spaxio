/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**"
      }
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/Macbook/index.html" }
      ],
      afterFiles: [
        { source: "/Macbook", destination: "/Macbook/index.html" },
        { source: "/Macbook/", destination: "/Macbook/index.html" }
      ],
      fallback: []
    };
  }
};

module.exports = nextConfig;
