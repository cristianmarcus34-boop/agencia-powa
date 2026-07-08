// app/metadata.ts
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://agencia-powa.vercel.app"),
  title: {
    default: "Powa Digital | Ingeniería de Software & Growth en Quilmes",
    template: "%s | Powa Digital"
  },
  description: "Agencia de software y diseño web en Villa La Florida, San Francisco Solano y Quilmes. Creamos ecosistemas digitales de alto impacto con Next.js e IA.",
  keywords: [
    "Desarrollo web Quilmes",
    "Software Villa La Florida",
    "Agencia Digital San Francisco Solano",
    "Programación Zona Sur",
    "Páginas Web Quilmes",
    "Next.js Argentina"
  ],
  applicationName: "Powa Digital",
  appleWebApp: {
    title: "Powa Digital",
    statusBarStyle: "default",
    capable: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.ico",
  },
  verification: {
    google: "VvJGBIv8ZsOakwktbJC0PxehMBx4ZfTAxxZf_rSEreI",
  },
  openGraph: {
    title: "Powa Digital | Ingeniería de Software en Zona Sur",
    description: "Desarrollo de ecosistemas digitales en Quilmes, Solano y Florida.",
    url: "https://agencia-powa.vercel.app",
    siteName: "Powa Digital",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/desarrollo-de-sitios-web.webp",
        width: 1200,
        height: 630,
        alt: "Powa Digital - Agencia de Software",
      },
    ],
  },
};