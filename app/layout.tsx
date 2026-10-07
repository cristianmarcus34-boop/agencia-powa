// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Orbitron } from 'next/font/google';
import { Suspense } from 'react'; // 🔥 NUEVO: para PostHogPageView
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

import Providers from './providers';
import LayoutWrapper from '@/components/LayoutWrapper';
import PostHogPageView from '@/components/PostHogPageView'; // 🔥 NUEVO

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['700', '900'],
  display: 'swap',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Powa Digital | Agencia Digital',
  description: 'Agencia digital en Quilmes. Desarrollo web, apps y marketing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={orbitron.variable}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* 📊 PostHog: captura pageviews en cada cambio de ruta */}
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>

        {/* 🔥 Componente Toaster global */}
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
      </body>
    </html>
  );
}