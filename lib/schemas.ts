// lib/schemas.ts

export function buildLocalBusinessSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://www.agenciadigitalpowa.com.ar/desarrollo-web-quilmes',
        name: 'Powa Digital - Agencia de Desarrollo Web en Quilmes',
        description:
            'Agencia de desarrollo web en Quilmes especializada en landing pages, tiendas online, sistemas a medida y apps. Trabajo remoto con clientes de todo el mundo.',
        url: 'https://www.agenciadigitalpowa.com.ar/desarrollo-web-quilmes',
        telephone: '+5491138305837',
        priceRange: '$$',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Quilmes',
            addressRegion: 'Buenos Aires',
            addressCountry: 'AR',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: -34.7206,
            longitude: -58.2543,
        },
        areaServed: [
            { '@type': 'City', name: 'Quilmes' },
            { '@type': 'City', name: 'Bernal' },
            { '@type': 'City', name: 'Avellaneda' },
            { '@type': 'City', name: 'Lanús' },
            { '@type': 'City', name: 'Berazategui' },
            { '@type': 'AdministrativeArea', name: 'Zona Sur' },
            { '@type': 'Country', name: 'Argentina' },
            { '@type': 'Place', name: 'Latinoamérica' },
            { '@type': 'Place', name: 'Mundo' },
        ],
        openingHours: 'Mo-Fr 09:00-18:00',
    }
}

export function buildBreadcrumbSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Inicio',
                item: 'https://www.agenciadigitalpowa.com.ar',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Desarrollo Web en Quilmes',
                item: 'https://www.agenciadigitalpowa.com.ar/desarrollo-web-quilmes',
            },
        ],
    }
}

export function buildServiceSchema() {
    const services = [
        {
            name: 'Desarrollo Web',
            description:
                'Landing pages, sitios institucionales y sistemas web con Next.js, React y TypeScript.',
        },
        {
            name: 'Tiendas Online',
            description:
                'E-commerce con MercadoPago, Stripe, gestión de productos, pedidos y envíos.',
        },
        {
            name: 'Apps Móviles',
            description:
                'Aplicaciones iOS y Android con React Native y Expo, con funcionamiento offline.',
        },
        {
            name: 'Automatización con IA',
            description:
                'Integración de IA, automatización de procesos y conexión de herramientas existentes.',
        },
    ]

    return {
        '@context': 'https://schema.org',
        '@graph': services.map((s) => ({
            '@type': 'Service',
            name: s.name,
            description: s.description,
            provider: {
                '@type': 'LocalBusiness',
                name: 'Powa Digital',
                url: 'https://www.agenciadigitalpowa.com.ar',
            },
            areaServed: [
                { '@type': 'City', name: 'Quilmes' },
                { '@type': 'AdministrativeArea', name: 'Zona Sur' },
                { '@type': 'Country', name: 'Argentina' },
            ],
        })),
    }
}

export function buildFAQSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: '¿Cuánto cuesta una página web en Quilmes?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'El costo depende del tipo de proyecto. Una landing page profesional arranca desde un valor base accesible para PYMES, mientras que un e-commerce o sistema a medida requiere una inversión mayor. Te damos un presupuesto sin cargo en 24 horas.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Trabajan con comercios de Quilmes centro?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sí. Trabajamos con comercios, PYMES y empresas de Quilmes centro, Quilmes Oeste, Bernal, Don Bosco, Wilde, Ezpeleta y toda la Zona Sur. También atendemos clientes de forma 100% remota en Argentina y el exterior.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Hacen visitas presenciales en Zona Sur?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sí, coordinamos reuniones presenciales en Quilmes y alrededores cuando el proyecto lo requiere. La mayoría del trabajo se hace de forma remota por videollamada, con entregas cada 2 semanas para que veas el avance.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Cuánto tarda una landing page?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Una landing page profesional tarda entre 2 y 3 semanas. Un sitio institucional o e-commerce entre 4 y 8 semanas, según la complejidad. Antes de arrancar te damos un cronograma con fechas de entrega.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Se puede pagar en cuotas?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sí. Trabajamos con un esquema de anticipo y pagos por etapas. Aceptamos transferencia, MercadoPago y otros medios. Consultanos por tu caso particular.',
                },
            },
            {
                '@type': 'Question',
                name: '¿El código y los accesos quedan a mi nombre?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sí. Al finalizar el proyecto te entregamos el 100% del código fuente, los accesos a hosting, dominio y todas las herramientas. No hay dependencia tecnológica ni contratos de permanencia.',
                },
            },
        ],
    }
}