import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ==========================================
  // 🔧 BUILD
  // ==========================================
  typescript: {
    ignoreBuildErrors: true,   // Ya lo tenías, evita frenar el build por errores TS
  },
  reactStrictMode: true,       // Buenas prácticas de React
  poweredByHeader: false,      // Oculta "X-Powered-By: Next.js"

  // Necesario para que Three.js y React Bootstrap funcionen sin errores de ESM
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
    qualities: [75, 85, 90, 100],          // Soluciona el warning de quality=85
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7,    // 1 semana de caché
    dangerouslyAllowSVG: true,             // Por si usás SVG en <Image>
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ==========================================
  // ⚙️ HEADERS DE SEGURIDAD
  // ==========================================
  async headers() {
    return [
      // Tus headers originales para /lab
      {
        source: "/lab/:path*",
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
      // Headers generales para todo el sitio
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
    // optimizeCss lo dejo comentado por si en el futuro usás CSS tradicional
    // Con Tailwind 4 no es necesario
  },

  // ==========================================
  // 🌪️ TURBOPACK (Next.js 16)
  // ==========================================
  turbopack: {
    // Configuración vacía para silenciar el error de "webpack config without turbopack"
    // Si no tuvieras ninguna sección webpack, podrías omitirlo
  },

  // ==========================================
  // 🌍 ENTORNO
  // ==========================================
  trailingSlash: false,   // URLs limpias sin barra final
};

export default nextConfig;