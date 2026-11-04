// app/layout.tsx
import type { Metadata, Viewport } from 'next';
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
// 🔤 FUENTES LOCALES
// ============================================

const orbitron = localFont({
  src: [
    { path: '../public/fonts/orbitron-700.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/orbitron-900.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-orbitron',
  display: 'swap',
  fallback: ['system-ui', 'arial', 'sans-serif'],
  preload: true,
});

const geistSans = localFont({
  src: [{ path: '../public/fonts/geist-sans-400.woff2', weight: '400', style: 'normal' }],
  variable: '--font-geist-sans',
  display: 'swap',
  fallback: ['system-ui', 'arial', 'sans-serif'],
  preload: true,
});

const geistMono = localFont({
  src: [{ path: '../public/fonts/geist-mono-400.woff2', weight: '400', style: 'normal' }],
  variable: '--font-geist-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  preload: true,
});

// ============================================
// 📋 METADATA
// ============================================
export const metadata: Metadata = {
  metadataBase: new URL('https://www.agenciadigitalpowa.com.ar'),

  title: {
    default: 'Powa Digital | Agencia de Desarrollo Web en Quilmes para PYMES',
    template: '%s | Powa Digital',
  },
  description:
    'Agencia de desarrollo web en Quilmes. Sitios, plataformas, apps y automatización con IA para PYMES y empresas de Zona Sur y Latinoamérica. Presupuesto sin cargo.',
  keywords: [
    'agencia digital Quilmes',
    'desarrollo web Quilmes',
    'software factory',
    'agencia de desarrollo web',
    'Next.js',
    'React',
    'aplicaciones móviles',
    'automatización con IA',
    'consultoría IT',
    'PYMES Zona Sur',
  ],
  authors: [{ name: 'Agencia Digital Powa', url: 'https://www.agenciadigitalpowa.com.ar' }],
  creator: 'Powa Digital',
  publisher: 'Powa Digital',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://www.agenciadigitalpowa.com.ar',
    siteName: 'Powa Digital',
    title: 'Powa Digital | Agencia de Desarrollo Web en Quilmes',
    description:
      'Software Factory & Consultoría IT. Desarrollo web, apps y automatización con IA para PYMES y empresas de Zona Sur.',
    images: [
      {
        url: 'https://www.agenciadigitalpowa.com.ar/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Powa Digital - Agencia de Desarrollo Web en Quilmes',
        type: 'image/jpg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Powa Digital | Agencia de Desarrollo Web en Quilmes',
    description: 'Sitios, plataformas y automatización con IA para PYMES de Zona Sur.',
    images: ['https://www.agenciadigitalpowa.com.ar/og-image.jpg'],
    creator: '@Cristiandepowa',
  },

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

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },

  category: 'technology',
};

// ============================================
// 📱 VIEWPORT
// ============================================
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
  colorScheme: 'dark',
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
    <html lang="es-AR" className={orbitron.variable}>
      <head>
        {/* 🔗 Preconnect */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://api.web3forms.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />

        {/* 🎨 Meta para mobile */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* 🧭 JSON-LD: Organization + LocalBusiness + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://www.agenciadigitalpowa.com.ar/#organization',
                  name: 'Powa Digital',
                  url: 'https://www.agenciadigitalpowa.com.ar',
                  logo: 'https://www.agenciadigitalpowa.com.ar/logo-agenciadigitalpowa-redondo.png',
                  description: 'Agencia de desarrollo web en Quilmes para PYMES y empresas.',
                  email: 'agenciadigitalpowa@gmail.com',
                  telephone: '+54-9-11-3830-5837',
                  sameAs: [
                    'https://www.linkedin.com/in/cristian-marcus2025/',
                    'https://www.instagram.com/agencia.digital.powa',
                    'https://x.com/Cristiandepowa',
                  ],
                },
                {
                  '@type': 'LocalBusiness',
                  '@id': 'https://www.agenciadigitalpowa.com.ar/#localbusiness',
                  name: 'Powa Digital',
                  image: 'https://www.agenciadigitalpowa.com.ar/og-image.jpg',
                  url: 'https://www.agenciadigitalpowa.com.ar',
                  telephone: '+54-9-11-3830-5837',
                  email: 'agenciadigitalpowa@gmail.com',
                  priceRange: '$$',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Quilmes',
                    addressRegion: 'Buenos Aires',
                    addressCountry: 'AR',
                  },
                  areaServed: [
                    'Quilmes',
                    'Bernal',
                    'Avellaneda',
                    'Lanús',
                    'Berazategui',
                    'Zona Sur',
                    'Argentina',
                  ],
                  sameAs: [
                    'https://www.linkedin.com/in/cristian-marcus2025/',
                    'https://www.instagram.com/agencia.digital.powa',
                    'https://x.com/Cristiandepowa',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.agenciadigitalpowa.com.ar/#website',
                  url: 'https://www.agenciadigitalpowa.com.ar',
                  name: 'Powa Digital',
                  publisher: {
                    '@id': 'https://www.agenciadigitalpowa.com.ar/#organization',
                  },
                  inLanguage: 'es-AR',
                },
              ],
            }),
          }}
        />
      </head>
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

        <WhatsAppFloat />
      </body>
    </html>
  );
}