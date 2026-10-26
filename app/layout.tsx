// app/layout.tsx
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

import Providers from './providers';
import LayoutWrapper from '@/components/LayoutWrapper';
import PostHogPageView from '@/components/PostHogPageView';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { GoogleAnalytics } from '@next/third-parties/google';

// ============================================
// 🔤 FUENTES LOCALES (sin dependencia de Google Fonts)
// ============================================

const orbitron = localFont({
  src: [
    {
      path: '../public/fonts/orbitron-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/orbitron-900.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-orbitron',
  display: 'swap',
  fallback: ['system-ui', 'arial', 'sans-serif'],
  preload: true,
});

const geistSans = localFont({
  src: [
    {
      path: '../public/fonts/geist-sans-400.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
  display: 'swap',
  fallback: ['system-ui', 'arial', 'sans-serif'],
  preload: true,
});

const geistMono = localFont({
  src: [
    {
      path: '../public/fonts/geist-mono-400.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  preload: true,
});

// ============================================
// 📋 METADATA
// ============================================
export const metadata: Metadata = {
  // ============================================
  // BÁSICO
  // ============================================
  title: {
    default: 'Powa Digital | Agencia de Desarrollo Web en Quilmes',
    template: '%s | Powa Digital',
  },
  description:
    'Software Factory & Consultoría IT en Quilmes. Desarrollo web, apps móviles, automatización con IA y mantenimiento evolutivo para PYMES y empresas de Latinoamérica.',
  keywords: [
    'agencia digital',
    'desarrollo web',
    'software factory',
    'Quilmes',
    'Buenos Aires',
    'Next.js',
    'React',
    'aplicaciones móviles',
    'automatización',
    'inteligencia artificial',
    'consultoría IT',
  ],
  authors: [{ name: 'Agencia Digital Powa' }],
  creator: 'Powa Digital',
  publisher: 'Powa Digital',

  // ============================================
  // CANONICAL Y ALTERNATES
  // ============================================
  metadataBase: new URL('https://www.agenciadigitalpowa.com.ar'),
  alternates: {
    canonical: '/',
  },

  // ============================================
  // OPEN GRAPH (Facebook, WhatsApp, LinkedIn)
  // ============================================
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://www.agenciadigitalpowa.com.ar',
    siteName: 'Powa Digital',
    title: 'Powa Digital | Agencia de Desarrollo Web en Quilmes',
    description:
      'Software Factory & Consultoría IT. Desarrollo web, apps y automatización con IA para PYMES y empresas.',
    images: [
      {
        url: 'https://www.agenciadigitalpowa.com.ar/logo-agenciadigitalpowa-redondo.png',
        width: 1200,
        height: 630,
        alt: 'Agencia Digital Powa',
      },
    ],
  },

  // ============================================
  // TWITTER / X
  // ============================================
  twitter: {
    card: 'summary_large_image',
    title: 'Powa Digital | Agencia de Desarrollo Web en Quilmes',
    description: 'Software Factory & Consultoría IT en Quilmes.',
    images: ['/logo-agenciadigitalpowa-redondo.png'],
  },

  // ============================================
  // ROBOTS
  // ============================================
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ============================================
  // ICONS
  // ============================================
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

// ============================================
// 🏗️ ROOT LAYOUT
// ============================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={orbitron.variable}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleAnalytics gaId="G-99LM39MSV0" />
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>

        <Toaster
          position="top-right"
          containerStyle={{ zIndex: 99999 }}
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        />

        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>

        {/* 📱 WhatsApp flotante en todas las páginas */}
        <WhatsAppFloat />
      </body>
    </html>
  );
}