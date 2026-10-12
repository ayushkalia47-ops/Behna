import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 4:5 product photography is served in these widths
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    qualities: [75, 85],
    // When Shopify is connected, product images come from its CDN:
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
