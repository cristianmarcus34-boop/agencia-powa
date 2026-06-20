import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// 1. Estilos de Librerías (Bootstrap primero)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// 2. Estilos Globales Propios
import "./globals.css";

// 3. Componentes globales y Loading centralizado
import { ToastContainer } from 'react-toastify';
import ChatPowa from "@/components/ChatPowa";
import NavbarPowa from "@/components/NavbarPowa";
import FooterPowa from "@/components/FooterPowa";
import LoadingScreen from "@/components/LoadingScreen";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['700', '900'],
  display: 'swap',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${orbitron.variable}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* El LoadingScreen ahora cubre absolutamente todo desde el root */}
        <LoadingScreen />

        {/* JSON-LD para Branding Inmediato */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Powa Digital",
              "url": "https://agencia-powa.vercel.app"
            })
          }}
        />

        <NavbarPowa />

        <main className="min-h-[80vh]">
          {children}
        </main>

        <ChatPowa />
        <FooterPowa />

        <ToastContainer
          position="bottom-right"
          theme="dark"
          autoClose={4000}
          hideProgressBar={false}
          closeOnClick
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}