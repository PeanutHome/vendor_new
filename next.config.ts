import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nakshtra-ecommerce.s3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '/products/images/**',
      },
    ],
  },
};

export default nextConfig;
