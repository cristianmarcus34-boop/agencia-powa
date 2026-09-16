import type { Metadata } from 'next';
import { Geist, Geist_Mono, Orbitron } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Bootstrap DESPUÉS
import 'react-toastify/dist/ReactToastify.css';
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
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}