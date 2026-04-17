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
        { source: "/", destination: "/car/index.html" }
      ],
      afterFiles: [
        { source: "/car", destination: "/car/index.html" },
        { source: "/car/", destination: "/car/index.html" }
      ],
      fallback: []
    };
  }
};

module.exports = nextConfig;
