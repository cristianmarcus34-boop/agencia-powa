// app/portfolio/page.tsx
import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';
import { PROJECTS_DATA } from './projects-data';

// ============================================
// METADATA
// ============================================
export const metadata: Metadata = {
  title: 'Portfolio | Software de Alto Impacto - Powa Digital',
  description: 'Proyectos propios y demos funcionales de desarrollo web, apps, e-commerce y SaaS. Landing pages, tiendas online, sistemas de gestión y plataformas con Next.js y Supabase.',
  keywords: [
    'portfolio desarrollo web',
    'proyectos next.js',
    'demos agencia digital',
    'casos de éxito',
    'software factory argentina',
    'e-commerce',
    'saas',
    'landing pages',
  ],
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Portfolio | Software de Alto Impacto - Powa Digital',
    description: 'Proyectos propios y demos funcionales de desarrollo web, apps, e-commerce y SaaS.',
    url: 'https://www.agenciadigitalpowa.com.ar/portfolio',
    type: 'website',
    images: [
      {
        url: '/logo-agenciadigitalpowa-redondo.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio de Powa Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Software de Alto Impacto',
    description: 'Proyectos propios y demos funcionales de desarrollo web, apps, e-commerce y SaaS.',
  },
};

// ============================================
// SCHEMA JSON-LD
// ============================================
function buildPortfolioSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Portfolio - Powa Digital',
    description:
      'Proyectos propios y demos funcionales de desarrollo web, apps, e-commerce y SaaS.',
    url: 'https://www.agenciadigitalpowa.com.ar/portfolio',
    hasPart: PROJECTS_DATA.slice(0, 10).map((project) => ({
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      url: project.link,
      creator: {
        '@type': 'Organization',
        name: 'Agencia Digital Powa',
      },
    })),
  };
}

// ============================================
// PAGE
// ============================================
export default function PortfolioPage() {
  const portfolioSchema = buildPortfolioSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <PortfolioClient />
    </>
  );
}