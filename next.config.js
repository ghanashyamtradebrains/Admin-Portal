/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_APP_BASE_URL: "https://portal.tradebrains.in/api/",
  },
  async headers() {
    return [];
  },
  images: {
    domains: [],
  },
};
