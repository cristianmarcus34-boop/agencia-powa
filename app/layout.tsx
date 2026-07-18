'use client';

import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono } from "next/font/google";
import { Orbitron } from 'next/font/google';
import { useState, useEffect, useRef } from 'react';

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
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [isMounted, setIsMounted] = useState(false);

  // 🔥 RUTAS DONDE SE OCULTA EL NAVBAR Y FOOTER
  const hideNavbar = pathname?.startsWith('/login') ||
    pathname?.startsWith('/logout') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/cliente');

  const showNavbar = !hideNavbar;

  // 🔥 Medir la altura del navbar correctamente
  useEffect(() => {
    setIsMounted(true);

    if (showNavbar) {
      const updateHeight = () => {
        // Buscar el navbar de React-Bootstrap
        const navbar = document.querySelector('.navbar-fixed-top') ||
          document.querySelector('nav.navbar');
        if (navbar) {
          const height = navbar.getBoundingClientRect().height;
          console.log('📏 Altura del navbar medida:', height);
          setNavbarHeight(height);
        } else {
          // Fallback si no encuentra el navbar
          console.warn('⚠️ No se encontró el navbar, usando fallback de 80px');
          setNavbarHeight(80);
        }
      };

      // Medir después de que el DOM esté listo
      const timeoutId = setTimeout(updateHeight, 100);

      // Re-medir cuando cambie el tamaño
      window.addEventListener('resize', updateHeight);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', updateHeight);
      };
    }
  }, [showNavbar]);

  // 🔥 También medir cuando cambie la ruta
  useEffect(() => {
    if (showNavbar && isMounted) {
      const navbar = document.querySelector('.navbar-fixed-top') ||
        document.querySelector('nav.navbar');
      if (navbar) {
        const height = navbar.getBoundingClientRect().height;
        setNavbarHeight(height);
      }
    }
  }, [pathname, showNavbar, isMounted]);

  return (
    <html lang="es" className={`${orbitron.variable}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
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

          {/* 🔥 NAVBAR - OCULTO EN LOGIN, LOGOUT, ADMIN Y CLIENTE */}
          {showNavbar && <NavbarPowa />}

          <main
            className={showNavbar ? 'min-h-[80vh]' : 'min-h-screen'}
            style={showNavbar ? { paddingTop: `${navbarHeight}px` } : {}}
          >
            {children}
          </main>

          {/* 🔥 FOOTER Y CHAT - OCULTOS EN ADMIN Y CLIENTE */}
          {showNavbar && <ChatPowa />}
          {showNavbar && <FooterPowa />}

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