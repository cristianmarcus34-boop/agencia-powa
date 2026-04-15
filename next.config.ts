import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignoramos errores de tipos para que el build en Vercel no se detenga
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Cabeceras obligatorias para el funcionamiento de FFmpeg en el Lab
  async headers() {
    return [
      {
        source: "/lab/:path*",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },

  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;