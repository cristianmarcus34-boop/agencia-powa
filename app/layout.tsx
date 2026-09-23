import type { Metadata } from 'next';
import { Geist, Geist_Mono, Orbitron } from 'next/font/google';
import { Toaster } from 'react-hot-toast'; // 🔥 Importamos Toaster de react-hot-toast
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Bootstrap DESPUÉS
import './globals.css'; // ✅ Tailwind PRIMERO

import Providers from './providers';
import LayoutWrapper from '@/components/LayoutWrapper';

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