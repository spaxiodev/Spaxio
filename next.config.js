/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  async redirects() {
    return [{ source: "/quote", destination: "/#quote", permanent: true }];
  }
};

module.exports = nextConfig;
