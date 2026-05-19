const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.4",
        port: "2000",
        pathname: "**",
      },
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
