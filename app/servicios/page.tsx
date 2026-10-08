// app/servicios/page.tsx
import type { Metadata } from 'next';
import ServiciosClient from './ServiciosClient';

export const metadata: Metadata = {
  title: 'Servicios de Desarrollo Web en Quilmes | Powa Digital',
  description:
    'Desarrollo web, apps móviles, tiendas online, automatización y mantenimiento para empresas de Quilmes, Bernal, Avellaneda, Lanús y Zona Sur. Cotizá tu proyecto sin costo.',
  keywords: [
    'desarrollo web quilmes',
    'servicios de desarrollo web',
    'agencia de desarrollo web en quilmes',
    'diseño web quilmes',
    'tienda online quilmes',
    'aplicaciones móviles quilmes',
    'automatización quilmes',
    'software a medida quilmes',
  ],
  alternates: {
    canonical: '/servicios',
  },
  openGraph: {
    title: 'Servicios de Desarrollo Web en Quilmes | Powa Digital',
    description: 'Desarrollo web, apps móviles, tiendas online y automatización para empresas de Zona Sur.',
    url: 'https://www.agenciadigitalpowa.com.ar/servicios',
    type: 'website',
    images: [
      {
        url: '/logo-agenciadigitalpowa-redondo.png',
        width: 1200,
        height: 630,
        alt: 'Servicios de Powa Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios de Desarrollo Web en Quilmes | Powa Digital',
    description: 'Desarrollo web, apps móviles, tiendas online y automatización para Zona Sur.',
  },
};

function buildServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Servicios de Powa Digital',
    description: 'Servicios de desarrollo web y software a medida en Quilmes',
    itemListElement: [
      {
        '@type': 'Service',
        position: 1,
        name: 'Desarrollo de Plataformas Web',
        description: 'Sistemas web a medida con Next.js, React y TypeScript',
        provider: {
          '@type': 'Organization',
          name: 'Agencia Digital Powa',
        },
        areaServed: 'Quilmes, Buenos Aires, Argentina',
      },
      {
        '@type': 'Service',
        position: 2,
        name: 'Aplicaciones móviles a medida',
        description: 'Apps nativas iOS y Android con React Native y Expo',
        provider: {
          '@type': 'Organization',
          name: 'Agencia Digital Powa',
        },
      },
      {
        '@type': 'Service',
        position: 3,
        name: 'Tienda online e integraciones',
        description: 'E-commerce con MercadoPago, Stripe y gestión de pedidos',
        provider: {
          '@type': 'Organization',
          name: 'Agencia Digital Powa',
        },
      },
      {
        '@type': 'Service',
        position: 4,
        name: 'SEO técnico y mejoras para buscadores',
        description: 'Auditoría técnica SEO y datos estructurados',
        provider: {
          '@type': 'Organization',
          name: 'Agencia Digital Powa',
        },
      },
    ],
  };
}

export default function ServiciosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema()) }}
      />
      <ServiciosClient />
    </>
  );
}