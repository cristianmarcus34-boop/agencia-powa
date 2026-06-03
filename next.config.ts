import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Esto sigue siendo válido si necesitas ignorar errores en el build
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/lab/:path*",
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;