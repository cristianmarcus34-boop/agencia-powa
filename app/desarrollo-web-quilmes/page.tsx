// app/desarrollo-web-quilmes/page.tsx
import type { Metadata } from 'next'
import { HeroQuilmes } from './_components/HeroQuilmes'
import { ServiciosLocal } from './_components/ServiciosLocal'
import { Diferenciales } from './_components/Diferenciales'
import { CoberturaZonas } from './_components/CoberturaZonas'
import { BarriosQuilmes } from './_components/BarriosQuilmes'
import { ProcesoLocal } from './_components/ProcesoLocal'
import { CasosLocal } from './_components/CasosLocal'
import { TestimoniosLocal } from './_components/TestimoniosLocal'
import { FAQQuilmes } from './_components/FAQQuilmes'
import { CTAFinal } from './_components/CTAFinal'
import {
    buildLocalBusinessSchema,
    buildBreadcrumbSchema,
    buildServiceSchema,
    buildFAQSchema,
} from '@/lib/schemas'

export const metadata: Metadata = {
    title: 'Agencia de Desarrollo Web en Quilmes | Powa Digital',
    description:
        'Agencia de desarrollo web en Quilmes especializada en landing pages, tiendas online, sistemas a medida y apps. Trabajamos con PYMES y empresas de Quilmes, Zona Sur y todo el mundo de forma remota. Consultá sin costo.',
    keywords: [
        'agencia de desarrollo web en quilmes',
        'desarrollo web quilmes',
        'diseño web quilmes',
        'agencia web quilmes',
        'programador web quilmes',
        'empresa desarrollo web quilmes',
        'paginas web quilmes',
        'sistemas web quilmes',
    ],
    alternates: {
        canonical: '/desarrollo-web-quilmes',
    },
    openGraph: {
        title: 'Agencia de Desarrollo Web en Quilmes | Powa Digital',
        description:
            'Agencia de desarrollo web en Quilmes especializada en landing pages, tiendas online, sistemas y apps. Trabajo remoto con clientes de todo el mundo.',
        url: 'https://www.agenciadigitalpowa.com.ar/desarrollo-web-quilmes',
        type: 'website',
        images: [
            {
                url: '/logo-agenciadigitalpowa-redondo.png',
                width: 1200,
                height: 630,
                alt: 'Agencia de Desarrollo Web en Quilmes - Powa Digital',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Agencia de Desarrollo Web en Quilmes | Powa Digital',
        description:
            'Desarrollo web, apps y sistemas a medida en Quilmes, Zona Sur y todo el mundo de forma remota.',
    },
    other: {
        'geo.region': 'AR-B',
        'geo.placename': 'Quilmes',
        'geo.position': '-34.7206;-58.2543',
        ICBM: '-34.7206, -58.2543',
    },
}

export default function DesarrolloWebQuilmesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(buildLocalBusinessSchema()),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(buildBreadcrumbSchema()),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(buildServiceSchema()),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(buildFAQSchema()),
                }}
            />

            <main className="pt-20 min-h-screen bg-[#0a0f1a] text-slate-300">
                <div className="container mx-auto px-4 max-w-7xl">
                    <HeroQuilmes />
                    <ServiciosLocal />
                    <Diferenciales />
                    <CoberturaZonas />
                    <BarriosQuilmes />
                    <ProcesoLocal />
                    <CasosLocal />
                    <TestimoniosLocal />
                    <FAQQuilmes />
                    <CTAFinal />
                </div>
            </main>
        </>
    )
}