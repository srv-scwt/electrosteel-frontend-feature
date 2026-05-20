const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    unoptimized:true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.3",
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
