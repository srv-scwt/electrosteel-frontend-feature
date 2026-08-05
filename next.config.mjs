const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "electrosteel.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
