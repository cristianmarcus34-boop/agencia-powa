// app/desarrollo-web-quilmes/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import {
    FaMapMarkerAlt,
    FaCheckCircle,
    FaWhatsapp,
    FaRocket,
    FaCode,
    FaMobileAlt,
    FaShoppingCart,
    FaBrain,
    FaGlobe,
} from 'react-icons/fa';

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
};

function buildLocalBusinessSchema() {
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
    };
}

const servicios = [
    {
        icon: <FaCode />,
        title: 'Desarrollo Web',
        desc: 'Landing pages, sitios institucionales y sistemas web con Next.js, React y TypeScript.',
    },
    {
        icon: <FaShoppingCart />,
        title: 'Tiendas Online',
        desc: 'E-commerce con MercadoPago, Stripe, gestión de productos, pedidos y envíos.',
    },
    {
        icon: <FaMobileAlt />,
        title: 'Apps Móviles',
        desc: 'Aplicaciones iOS y Android con React Native y Expo, con funcionamiento offline.',
    },
    {
        icon: <FaBrain />,
        title: 'Automatización con IA',
        desc: 'Integración de IA, automatización de procesos y conexión de herramientas existentes.',
    },
];

const diferenciales = [
    'Trabajás directamente con el fundador, sin intermediarios',
    'Código y accesos 100% tuyos al finalizar el proyecto',
    'Entregas cada 2 semanas para que veas el avance',
    'Sin contratos de permanencia ni dependencia tecnológica',
    'Especialistas en Next.js, React y tecnologías modernas',
    'Consultoría inicial sin costo y sin compromiso',
];

const zonas = [
    'Quilmes',
    'Bernal',
    'Avellaneda',
    'Lanús',
    'Berazategui',
    'Wilde',
    'Don Bosco',
    'Ezpeleta',
];

const paises = [
    'Argentina',
    'Latinoamérica',
    'España',
    'Estados Unidos',
    'Europa',
];

export default function DesarrolloWebQuilmesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema()) }}
            />

            <main
                style={{
                    paddingTop: '80px',
                    minHeight: '100vh',
                    background: '#0a0f1a',
                    color: '#cbd5e1',
                }}
            >
                <Container>
                    {/* HERO */}
                    <header
                        style={{
                            textAlign: 'center',
                            marginBottom: '60px',
                            paddingTop: '40px',
                        }}
                    >
                        <span
                            style={{
                                display: 'inline-block',
                                padding: '8px 20px',
                                background: 'rgba(34, 211, 238, 0.08)',
                                color: '#22d3ee',
                                borderRadius: '50px',
                                fontSize: '13px',
                                fontWeight: 700,
                                border: '1px solid rgba(34, 211, 238, 0.2)',
                                marginBottom: '1.5rem',
                            }}
                        >
                            <FaMapMarkerAlt style={{ marginRight: '8px' }} /> QUILMES · ZONA SUR · REMOTO EN TODO EL MUNDO
                        </span>

                        <h1
                            style={{
                                fontSize: 'clamp(2rem, 5vw, 4rem)',
                                fontWeight: 900,
                                lineHeight: 1.1,
                                color: '#fff',
                                marginBottom: '1.5rem',
                                letterSpacing: '-1px',
                            }}
                        >
                            Agencia de{' '}
                            <span
                                style={{
                                    background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}
                            >
                                Desarrollo Web en Quilmes
                            </span>
                        </h1>

                        <p
                            style={{
                                fontSize: '1.2rem',
                                maxWidth: '780px',
                                margin: '0 auto 2rem',
                                lineHeight: 1.7,
                            }}
                        >
                            Somos Powa Digital, tu agencia de desarrollo web en Quilmes. Creamos
                            landing pages que convierten, tiendas online que venden, sistemas a
                            medida y apps móviles para PYMES y empresas de{' '}
                            <strong>Argentina, Latinoamérica y el mundo</strong>. Base en
                            Quilmes, trabajo remoto con clientes de cualquier país.
                        </p>

                        <div
                            style={{
                                display: 'flex',
                                gap: '16px',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Link
                                href="/contact"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '16px 32px',
                                    background: 'linear-gradient(135deg, #22d3ee, #0891b2)',
                                    color: '#0a0f1a',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    boxShadow: '0 8px 30px rgba(34, 211, 238, 0.3)',
                                }}
                            >
                                Consultá tu proyecto <FaRocket />
                            </Link>

                            <a
                                href="https://wa.me/5491138305837"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '16px 32px',
                                    background: 'rgba(255,255,255,0.03)',
                                    color: '#fff',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                }}
                            >
                                WhatsApp <FaWhatsapp />
                            </a>
                        </div>
                    </header>

                    {/* SERVICIOS LOCALES */}
                    <section style={{ marginBottom: '60px' }}>
                        <h2
                            style={{
                                fontSize: '2rem',
                                fontWeight: 800,
                                color: '#fff',
                                textAlign: 'center',
                                marginBottom: '1rem',
                            }}
                        >
                            Servicios de desarrollo web en Quilmes
                        </h2>
                        <p
                            style={{
                                textAlign: 'center',
                                maxWidth: '700px',
                                margin: '0 auto 3rem',
                                fontSize: '1.05rem',
                                lineHeight: 1.7,
                            }}
                        >
                            Trabajamos con empresas de Quilmes, Bernal, Avellaneda, Lanús,
                            Berazategui y toda Zona Sur. Estos son nuestros servicios más
                            solicitados.
                        </p>

                        <Row className="g-4">
                            {servicios.map((service, i) => (
                                <Col key={i} md={6} lg={3}>
                                    <div
                                        style={{
                                            padding: '28px 24px',
                                            background: 'rgba(30, 41, 59, 0.4)',
                                            borderRadius: '20px',
                                            border: '1px solid rgba(255,255,255,0.06)',
                                            height: '100%',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: '2rem',
                                                color: '#22d3ee',
                                                marginBottom: '16px',
                                            }}
                                        >
                                            {service.icon}
                                        </div>
                                        <h3
                                            style={{
                                                color: '#fff',
                                                fontSize: '1.15rem',
                                                fontWeight: 700,
                                                marginBottom: '10px',
                                            }}
                                        >
                                            {service.title}
                                        </h3>
                                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                                            {service.desc}
                                        </p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </section>

                    {/* POR QUÉ ELEGIRNOS */}
                    <section style={{ marginBottom: '60px' }}>
                        <h2
                            style={{
                                fontSize: '2rem',
                                fontWeight: 800,
                                color: '#fff',
                                textAlign: 'center',
                                marginBottom: '3rem',
                            }}
                        >
                            ¿Por qué elegir Powa como tu agencia web en Quilmes?
                        </h2>

                        <Row className="g-4">
                            {diferenciales.map((item, i) => (
                                <Col key={i} md={6}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '12px',
                                            alignItems: 'flex-start',
                                            padding: '16px',
                                            background: 'rgba(30, 41, 59, 0.3)',
                                            borderRadius: '12px',
                                        }}
                                    >
                                        <FaCheckCircle
                                            style={{
                                                color: '#10b981',
                                                fontSize: '1.2rem',
                                                marginTop: '2px',
                                                flexShrink: 0,
                                            }}
                                        />
                                        <span style={{ color: '#cbd5e1', fontSize: '1rem' }}>{item}</span>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </section>

                    {/* ZONA DE COBERTURA - LOCAL + GLOBAL */}
                    <section style={{ marginBottom: '60px', textAlign: 'center' }}>
                        <h2
                            style={{
                                fontSize: '1.8rem',
                                fontWeight: 800,
                                color: '#fff',
                                marginBottom: '1.5rem',
                            }}
                        >
                            Base en Quilmes, alcance mundial
                        </h2>
                        <p
                            style={{
                                maxWidth: '780px',
                                margin: '0 auto 2rem',
                                fontSize: '1.05rem',
                                lineHeight: 1.7,
                            }}
                        >
                            <strong>Atendemos presencialmente en Quilmes y Zona Sur</strong>, y
                            trabajamos de forma <strong>100% remota con clientes de toda
                                Argentina, Latinoamérica, Estados Unidos y Europa</strong>. La
                            distancia no es un límite: coordinamos por videollamada,
                            compartimos avances por etapas y entregamos todo digital.
                        </p>

                        {/* Zonas locales */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '10px',
                                justifyContent: 'center',
                                marginBottom: '20px',
                            }}
                        >
                            {zonas.map((zona) => (
                                <span
                                    key={zona}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '8px 16px',
                                        background: 'rgba(34, 211, 238, 0.08)',
                                        border: '1px solid rgba(34, 211, 238, 0.2)',
                                        borderRadius: '50px',
                                        color: '#22d3ee',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    <FaMapMarkerAlt size={12} /> {zona}
                                </span>
                            ))}
                        </div>

                        {/* Países/Regiones globales */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '10px',
                                justifyContent: 'center',
                            }}
                        >
                            {paises.map((pais) => (
                                <span
                                    key={pais}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '8px 16px',
                                        background: 'rgba(139, 92, 246, 0.08)',
                                        border: '1px solid rgba(139, 92, 246, 0.2)',
                                        borderRadius: '50px',
                                        color: '#a78bfa',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    <FaGlobe size={12} /> {pais}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* CTA FINAL */}
                    <section
                        style={{
                            textAlign: 'center',
                            padding: '60px 40px',
                            background:
                                'linear-gradient(135deg, rgba(30, 58, 138, 0.4), rgba(49, 46, 129, 0.4))',
                            borderRadius: '32px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            marginBottom: '60px',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '2rem',
                                fontWeight: 800,
                                color: '#fff',
                                marginBottom: '1rem',
                            }}
                        >
                            ¿Listo para tener tu web profesional?
                        </h2>
                        <p
                            style={{
                                fontSize: '1.1rem',
                                maxWidth: '600px',
                                margin: '0 auto 2rem',
                                lineHeight: 1.6,
                            }}
                        >
                            Estés en Quilmes, Buenos Aires, Latinoamérica o Europa, contanos
                            qué necesitás y te damos un presupuesto sin compromiso en 24hs.
                        </p>
                        <Link
                            href="/contact"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '16px 40px',
                                background: '#fff',
                                color: '#1e3a8a',
                                borderRadius: '12px',
                                fontWeight: 800,
                                fontSize: '1rem',
                                textDecoration: 'none',
                            }}
                        >
                            Agendar consultoría gratis <FaRocket />
                        </Link>
                    </section>
                </Container>
            </main>
        </>
    );
}