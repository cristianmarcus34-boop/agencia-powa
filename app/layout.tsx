// app/layout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono } from "next/font/google";
import { Orbitron } from 'next/font/google';

// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

// Componentes
import { ToastContainer } from 'react-toastify';
import ChatPowa from "@/components/ChatPowa";
import NavbarPowa from "@/components/NavbarPowa";
import FooterPowa from "@/components/FooterPowa";
import LoadingScreen from "@/components/LoadingScreen";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 🔥 RUTAS DONDE NO QUEREMOS MOSTRAR EL NAVBAR
  const hideNavbar = pathname?.startsWith('/admin') || pathname?.startsWith('/cliente');

  return (
    <html lang="es" className={`${orbitron.variable}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <LoadingScreen />

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

          {/* 🔥 NAVBAR CONDICIONAL */}
          {!hideNavbar && <NavbarPowa />}

          <main className={hideNavbar ? 'min-h-screen' : 'min-h-[80vh]'}>
            {children}
          </main>

          {/* 🔥 CHAT SOLO EN RUTAS PÚBLICAS */}
          {!hideNavbar && <ChatPowa />}

          {!hideNavbar && <FooterPowa />}

          <ToastContainer
            position="bottom-right"
            theme="dark"
            autoClose={4000}
            hideProgressBar={false}
            closeOnClick
          />
          <Analytics />
          <SpeedInsights />
        </SessionProvider>
      </body>
    </html>
  );
}