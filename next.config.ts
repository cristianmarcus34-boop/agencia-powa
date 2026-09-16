import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ==========================================
  // 🔧 BUILD
  // ==========================================
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,

  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    '@react-three/postprocessing',
    'react-bootstrap',
    'react-icons',
  ],

  // ==========================================
  // 🖼️ IMÁGENES
  // ==========================================
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 90, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // ✅ AGREGAR ESTO: Dominios permitidos para next/image
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ojhpjnxazpfpwcllerut.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // ==========================================
  // ⚙️ HEADERS DE SEGURIDAD
  // ==========================================
  async headers() {
    return [
      {
        source: "/lab/:path*",
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // ==========================================
  // 🧪 EXPERIMENTAL
  // ==========================================
  experimental: {
    optimizePackageImports: [
      'react-icons',
      'react-bootstrap',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },

  // ==========================================
  // 🌪️ TURBOPACK
  // ==========================================
  turbopack: {},

  // ==========================================
  // 🌍 ENTORNO
  // ==========================================
  trailingSlash: false,
};

export default nextConfig;