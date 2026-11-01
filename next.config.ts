import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com"
      }
    ],
  },
  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/terms-of-service#privacy-policy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
