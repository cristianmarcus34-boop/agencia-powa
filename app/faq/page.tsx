// app/faq/page.tsx
import type { Metadata } from 'next';
import FaqClient from './FaqClient';
import { FAQS } from './faqs-data';

// ============================================
// METADATA
// ============================================
export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Powa Digital',
  description: 'Resolvemos tus dudas sobre desarrollo web, precios, tiempos, propiedad intelectual, seguridad y post-lanzamiento. Respuestas claras para que elijas con confianza.',
  keywords: [
    'preguntas frecuentes desarrollo web',
    'cuánto cuesta una web',
    'tiempos de desarrollo',
    'propiedad intelectual software',
    'mantenimiento web',
    'SLA soporte',
    'agencia digital quilmes',
  ],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Preguntas Frecuentes | Powa Digital',
    description: 'Resolvemos tus dudas sobre desarrollo web, precios, tiempos, seguridad y post-lanzamiento.',
    url: 'https://www.agenciadigitalpowa.com.ar/faq',
    type: 'website',
    images: [
      {
        url: '/logo-agenciadigitalpowa-redondo.png',
        width: 1200,
        height: 630,
        alt: 'Preguntas Frecuentes - Powa Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preguntas Frecuentes | Powa Digital',
    description: 'Resolvemos tus dudas sobre desarrollo web, precios, tiempos, seguridad y post-lanzamiento.',
  },
};

// ============================================
// SCHEMA JSON-LD (FAQPage)
// ============================================
function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ============================================
// PAGE
// ============================================
export default function FaqPage() {
  const faqSchema = buildFaqSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient />
    </>
  );
}