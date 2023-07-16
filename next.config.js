/** @type {import('next').NextConfig} */
require("dotenv").config;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/my-bucket/**",
      },
    ],
  },
};

module.exports = nextConfig;
