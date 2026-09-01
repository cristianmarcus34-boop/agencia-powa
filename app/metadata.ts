import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agenciadigitalpowa.com.ar"), // ✅ CAMBIADO
  title: {
    default: "Agencia Powa | Desarrollo Web y Marketing Digital",
    template: "%s | Agencia Powa"
  },
  description: "Agencia de software y diseño web en Villa La Florida, San Francisco Solano y Quilmes. Creamos ecosistemas digitales de alto impacto con Next.js e IA.",
  keywords: [
    "Desarrollo web Quilmes",
    "Software Villa La Florida",
    "Agencia Digital San Francisco Solano",
    "Programación Zona Sur",
    "Páginas Web Quilmes",
    "Next.js Argentina",
    "agenciadigitalpowa"
  ],
  applicationName: "Agencia Powa",
  appleWebApp: {
    title: "Agencia Powa",
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
    title: "Agencia Powa | Desarrollo Web y Marketing Digital",
    description: "Desarrollo de ecosistemas digitales en Quilmes, Solano y Florida.",
    url: "https://www.agenciadigitalpowa.com.ar",
    siteName: "Agencia Powa",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/desarrollo-de-sitios-web.webp",
        width: 1200,
        height: 630,
        alt: "Agencia Powa - Desarrollo Web",
      },
    ],
  },
};