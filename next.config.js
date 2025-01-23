/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.freetogame.com", // Replace with the image host
        port: "",
        pathname: "/g/**", // Replace with the image path
      },
    ],
  },
};

module.exports = nextConfig;
