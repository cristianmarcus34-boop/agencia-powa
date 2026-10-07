// app/lab/page.tsx
import type { Metadata } from 'next';
import { Suspense } from 'react';
import LabClient from './LabClient';

export const metadata: Metadata = {
  title: 'Powa Lab | Herramientas Experimentales de Ingeniería',
  description: 'Herramientas gratuitas: optimizador de imágenes, compresor de video, calculadora de ROI, analizador de Core Web Vitals, generador de Schema y más. Procesamiento 100% local.',
  keywords: [
    'herramientas desarrollo web',
    'optimizador imágenes',
    'compresor video',
    'calculadora ROI',
    'core web vitals',
    'schema markup',
    'optimizador fuentes',
  ],
  alternates: {
    canonical: '/lab',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Powa Lab | Herramientas Experimentales',
    description: 'Herramientas gratuitas de ingeniería digital con procesamiento 100% local.',
    url: 'https://www.agenciadigitalpowa.com.ar/lab',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Powa Lab | Herramientas Experimentales',
    description: 'Herramientas gratuitas de ingeniería digital con procesamiento 100% local.',
  },
};

export default function LabPage() {
  return (
    <Suspense fallback={null}>
      <LabClient />
    </Suspense>
  );
}