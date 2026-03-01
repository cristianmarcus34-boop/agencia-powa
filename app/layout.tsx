import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// 1. Estilos Globales
import "./globals.css";

// 2. Estilos de Librerías (Bootstrap primero para permitir sobrescribir con CSS Modules)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// 3. Componentes
import { ToastContainer } from 'react-toastify';
import ChatPowa from "@/components/ChatPowa"; 
import NavbarPowa from "@/components/NavbarPowa";
import FooterPowa from "@/components/FooterPowa";

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

// Configuración de Viewport (Nueva forma en Next.js 14/15)
export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

// METADATA MAESTRA - SOLUCIÓN PARA EL NOMBRE DEL SITIO
export const metadata: Metadata = {
  metadataBase: new URL("https://agencia-powa.vercel.app"),
  title: {
    default: "Powa Digital | Ingeniería de Software & Growth en Quilmes",
    template: "%s | Powa Digital"
  },
  description: "Agencia de software y diseño web en Villa La Florida, San Francisco Solano y Quilmes. Creamos ecosistemas digitales de alto impacto con Next.js e IA.",
  keywords: ["Desarrollo web Quilmes", "Software Villa La Florida", "Agencia Digital San Francisco Solano", "Programación Zona Sur", "Páginas Web Quilmes", "Next.js Argentina"],
  
  // SOLUCIÓN AL "Vercel" en Google: Declaramos explícitamente el nombre de la marca
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
    siteName: "Powa Digital", // Crucial para SEO
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
    <html lang="es" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Marcado JSON-LD para que Google reconozca el Nombre del Sitio de inmediato */}
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
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}