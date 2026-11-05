// app/page.tsx
// ✅ SERVER COMPONENT: sin 'use client'
// Hero, tech stack, stats, metodología, servicios, quilmes, demos, security y CTA
// se renderizan en el servidor.
// Solo las secciones con estado (dólar, ROI, diagnóstico) son Client Components.

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';

// Iconos
import {
    FaCode, FaArrowRight, FaDatabase, FaMobileAlt, FaRocket,
    FaMapMarkerAlt, FaSearch, FaCogs, FaCheckCircle, FaShieldAlt,
    FaFileContract, FaLock, FaClock, FaCloudUploadAlt, FaBrain, FaSyncAlt,
    FaAws,
} from 'react-icons/fa';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import {
    SiReact, SiNodedotjs, SiTypescript, SiNextdotjs, SiDocker,
    SiPostgresql, SiSupabase, SiTailwindcss, SiVercel,
    SiGit, SiGithub, SiFigma, SiStripe, SiPosthog,
} from 'react-icons/si';

import styles from './page.module.css';
import HeroWrapper from '../components/hero3d/HeroWrapper';
import PromosSection from '../components/PromosSection/PromosSection';

// Client Components (solo las secciones con estado)
import DolarSection from '@/components/home/DolarSection';
import RoiSection from '@/components/home/RoiSection';
import DiagnosticoSection from '@/components/home/DiagnosticoSection';

// ===== DATA ESTÁTICA =====
const featuredTechStack = [
    { id: 'react', icon: <SiReact color="#61DAFB" />, name: 'React' },
    { id: 'nextjs', icon: <SiNextdotjs color="#ffffff" />, name: 'Next.js' },
    { id: 'typescript', icon: <SiTypescript color="#3178C6" />, name: 'TypeScript' },
    { id: 'nodejs', icon: <SiNodedotjs color="#339933" />, name: 'Node.js' },
    { id: 'postgres', icon: <SiPostgresql color="#4169E1" />, name: 'PostgreSQL' },
    { id: 'supabase', icon: <SiSupabase color="#3ECF8E" />, name: 'Supabase' },
    { id: 'tailwind', icon: <SiTailwindcss color="#38BDF8" />, name: 'Tailwind' },
    { id: 'vercel', icon: <SiVercel color="#ffffff" />, name: 'Vercel' },
    { id: 'docker', icon: <SiDocker color="#2496ED" />, name: 'Docker' },
    { id: 'git', icon: <SiGit color="#F05032" />, name: 'Git' },
    { id: 'github', icon: <SiGithub color="#ffffff" />, name: 'GitHub' },
    { id: 'figma', icon: <SiFigma color="#F24E1E" />, name: 'Figma' },
    { id: 'stripe', icon: <SiStripe color="#635BFF" />, name: 'Stripe' },
    { id: 'aws', icon: <FaAws color="#FF9900" />, name: 'AWS' },
    { id: 'posthog', icon: <SiPosthog color="#F54E00" />, name: 'PostHog' },
    { id: 'ia', icon: <FaBrain color="#22d3ee" />, name: 'IA' },
];

const processItems = [
    { id: 'req', step: '01', icon: <FaSearch />, title: 'Requerimientos & Briefing', desc: 'Armamos un formulario técnico bien detallado para entender tu negocio, qué integraciones necesitás y dónde se te está yendo la plata.' },
    { id: 'dev', step: '02', icon: <FaCode />, title: 'Desarrollo & Staging', desc: 'Codeamos bajo un manual de estilo riguroso. Vas a tener un entorno de pruebas privado para ver los avances en tiempo real, sin sorpresas.' },
    { id: 'qa', step: '03', icon: <FaCheckCircle />, title: 'QA & Despliegue Cloud', desc: 'Probamos todo bajo presión: carga, seguridad y performance. El lanzamiento se hace con infraestructura escalable y control de cambios.' },
    { id: 'delivery', step: '04', icon: <FaRocket />, title: 'Acta de Entrega Final', desc: 'Te transferimos el repositorio, credenciales limpias y toda la documentación técnica. El código es tuyo, sin vueltas.' },
];

const serviceItems = [
    { id: 'web', icon: <FaCode />, title: 'Sistemas Web Escalables', desc: 'Sitios, plataformas y paneles internos diseñados según tus procesos, tus usuarios y las integraciones que necesitás.', link: '/planes/servicios/desarrollo' },
    { id: 'mobile', icon: <FaMobileAlt />, title: 'Desarrollo Mobile Nativo', desc: 'Aplicaciones para iOS y Android cuando tu operación necesita una experiencia móvil más completa que una web.', link: '/planes/servicios/desarrollo' },
    { id: 'data', icon: <FaDatabase />, title: 'Gestión de Datos & Cloud', desc: 'Conectamos fuentes de datos y construimos paneles para que la información de tu operación sea más fácil de consultar.', link: '/planes/servicios/desarrollo' },
    { id: 'auto', icon: <FaCogs />, title: 'Automatización de Procesos', desc: 'Integramos herramientas y automatizamos tareas repetitivas para reducir trabajo manual y errores operativos.', link: '/planes/servicios/desarrollo' },
    { id: 'ai', icon: <FaBrain />, title: 'Integración de IA', desc: 'Evaluamos asistentes y flujos con IA para casos concretos, definiendo fuentes de datos, límites y revisión humana.', link: '/planes/servicios/desarrollo' },
    { id: 'maint', icon: <FaCloudUploadAlt />, title: 'Mantenimiento Evolutivo', desc: 'Tu software no queda obsoleto. Monitoreo proactivo, actualizaciones de seguridad y optimizaciones de performance mes a mes.', link: '/planes' },
];

const securityItems = [
    { id: 'nda', icon: <FaFileContract className={styles.securityListIcon} />, boldText: 'NDA (Acuerdo de Confidencialidad) Obligatorio:', text: ' Resguardamos tu idea y tus datos comerciales bajo contrato legal firmado desde el día cero.' },
    { id: 'rls', icon: <FaLock className={styles.securityListIcon} />, boldText: 'Estrategia Zero Hardcoding & RLS:', text: ' Aislamos tus accesos con variables de entorno estrictas y Row Level Security nativo en Supabase.' },
    { id: 'repo', icon: <FaCode className={styles.securityListIcon} />, boldText: 'Repositorio Privado Exclusivo:', text: ' Tu código base vive en un entorno Git único e independiente, listo para cualquier auditoría futura.' },
];

const stats = [
    { value: '01', label: 'Alcance definido antes de empezar', icon: <FaFileContract /> },
    { value: '02', label: 'Avances revisables por etapas', icon: <FaSyncAlt /> },
    { value: '03', label: 'Pruebas antes del lanzamiento', icon: <FaCheckCircle /> },
    { value: '04', label: 'Código y accesos entregados', icon: <FaLock /> },
];

// ===== SERVER COMPONENT =====
export default function HomePage() {
    return (
        <div className={styles.homepageWrapper}>
            {/* HERO (server + client wrapper) */}
            <HeroWrapper>
                <section className={styles.heroSectionModern}>
                    <Container className="position-relative z-3 pt-5 pt-md-4">
                        <Row className="align-items-center">
                            <Col lg={7}>
                                <div className={styles.badgePowa}>
                                    <FaMapMarkerAlt className="me-2" /> Quilmes, Zona Sur · Trabajo remoto con todo el país
                                </div>
                                <h1 className={styles.heroTitleMain}>
                                    Agencia de <span className={styles.textGradient}>Desarrollo Web en Quilmes</span> para PYMES y empresas
                                </h1>
                                <p className={styles.heroSubtitleModern}>
                                    <strong>Tu competencia ya está online. ¿Vos también?</strong> Diseñamos y desarrollamos sitios, plataformas y automatizaciones que <strong>te hacen ganar tiempo y clientes</strong>. Sin vueltas, sin letra chica, con el código en tus manos.
                                </p>
                                <div className="d-flex flex-wrap gap-3 mt-4">
                                    <Link href="/contact" className={`${styles.btnPowaPrimary} text-decoration-none`}>
                                        Presupuesto sin cargo <FaArrowRight className="ms-2" />
                                    </Link>
                                    <Link href="/portfolio" className={`${styles.btnPowaOutline} text-decoration-none`}>
                                        Ver casos reales <HiOutlineArrowNarrowRight className="ms-2" />
                                    </Link>
                                </div>
                                <div className={styles.heroTrustBadges}>
                                    <span className={styles.trustBadge}><FaShieldAlt className={styles.trustBadgeIcon} /> Código 100% tuyo</span>
                                    <span className={styles.trustBadge}><FaClock className={styles.trustBadgeIcon} /> Entrega por etapas</span>
                                    <span className={styles.trustBadge}><FaLock className={styles.trustBadgeIcon} /> NDA y confidencialidad</span>
                                    <span className={styles.trustBadge}><FaRocket className={styles.trustBadgeIcon} /> Respuesta en 24h</span>
                                    <Link href="/planes/servicios/desarrollo" className={styles.trustBadgeLink}><FaCode className={styles.trustBadgeIcon} /> Desarrollo Web</Link>
                                </div>
                            </Col>
                            <Col lg={5} className="d-none d-lg-block">
                                <div className={styles.heroImageContainer}>
                                    <Image src="/logo-agenciadigitalpowa-redondo.png" alt="Agencia Digital Powa - Desarrollo Web en Quilmes" width={640} height={427} className="rounded-4 shadow-lg" priority />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </HeroWrapper>

            {/* TECH STACK (server) */}
            <section className={styles.techStackSection}>
                <Container>
                    <h2 className={styles.techLabel}>Stack principal de Powa</h2>
                    <p className={styles.sectionSubtitle}>Tecnologías que usamos con mayor frecuencia; las herramientas adicionales se eligen según el alcance de cada proyecto.</p>
                    <div className={styles.stackSlider}>
                        <div className={styles.stackTrack}>
                            {[...featuredTechStack, ...featuredTechStack].map((tech, idx) => (
                                <div key={`tech-${tech.id}-${idx}`} className={styles.stackItem}>
                                    <div className={styles.techIconWrapper}>{tech.icon}</div>
                                    <span className={styles.techName}>{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* STATS (server) - CON TÍTULO Y SUBTÍTULO */}
            <section className={styles.statsSection}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>NUESTRO COMPROMISO</span>
                        <h2 className={styles.sectionTitle}>
                            Cómo <span className={styles.textGradient}>trabajamos</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Un proceso claro, transparente y sin sorpresas. Estos son los 4 pilares de cada proyecto.
                        </p>
                    </div>
                    <Row className="g-4">
                        {stats.map((stat, index) => (
                            <Col key={index} md={3} sm={6}>
                                <div className={styles.statCard}>
                                    <div className={styles.statCardIcon}>{stat.icon}</div>
                                    <div className={styles.statCardValue}>{stat.value}</div>
                                    <div className={styles.statCardLabel}>{stat.label}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* METODOLOGÍA (server) */}
            <section className={styles.processSection}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>METODOLOGÍA</span>
                        <h2 className={styles.sectionTitle}>Nuestro ADN de <span className={styles.textGradient}>Ingeniería</span></h2>
                        <p className={styles.sectionSubtitle}>Un flujo de trabajo predecible, transparente y blindado de punta a punta.</p>
                    </div>
                    <Row className="g-4">
                        {processItems.map((item) => (
                            <Col lg={3} md={6} key={item.id}>
                                <div className={styles.processCard}>
                                    <div className={styles.stepNumber}>{item.step}</div>
                                    <div className={styles.processIcon}>{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* SERVICIOS (server) */}
            <section className={styles.homeServices}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>SERVICIOS</span>
                        <h2 className={styles.sectionTitle}>Un socio tecnológico, <span className={styles.textGradient}>distintas capacidades</span></h2>
                        <p className={styles.sectionSubtitle}>Elegimos una solución proporcional a tu desafío: desde una mejora puntual hasta un producto digital a medida.</p>
                    </div>
                    <Row className="g-4">
                        {serviceItems.map((item) => (
                            <Col lg={4} md={6} key={item.id}>
                                <div className={styles.powaServiceCard}>
                                    <div className={styles.iconBox}>{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                    <Link href={item.link} className={styles.cardLink}>Saber más <FaArrowRight className="ms-2" /></Link>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* PROMOS (client, ya existente) */}
            <PromosSection />

            {/* BANNER QUILMES (server) */}
            <section className={styles.quilmesBannerSection}>
                <Container>
                    <div className={styles.quilmesBanner}>
                        <div className={styles.quilmesBannerGlow} />
                        <Row className="align-items-center g-4">
                            <Col lg={8}>
                                <div className={styles.quilmesBannerContent}>
                                    <span className={styles.quilmesBannerBadge}><FaMapMarkerAlt /> QUILMES · ZONA SUR</span>
                                    <h3 className={styles.quilmesBannerTitle}>¿Buscás una agencia de <span className={styles.textGradient}>desarrollo web en Quilmes</span>?</h3>
                                    <p className={styles.quilmesBannerText}>Base en Quilmes, trabajamos con PYMES y empresas de Bernal, Avellaneda, Lanús, Berazategui y toda Zona Sur — y también de forma 100% remota con clientes de Argentina, Latinoamérica y el mundo.</p>
                                    <div className={styles.quilmesBannerTags}>
                                        <span className={styles.quilmesBannerTag}>📍 Quilmes</span>
                                        <span className={styles.quilmesBannerTag}>📍 Bernal</span>
                                        <span className={styles.quilmesBannerTag}>📍 Avellaneda</span>
                                        <span className={styles.quilmesBannerTag}>📍 Lanús</span>
                                        <span className={styles.quilmesBannerTag}>🌍 Remoto internacional</span>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} className="text-lg-end text-center">
                                <Link href="/desarrollo-web-quilmes" className={styles.quilmesBannerButton}>Ver más sobre Quilmes <FaArrowRight className="ms-2" /></Link>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>

            {/* DÓLAR / PRECIOS (client) */}
            <DolarSection />

            {/* ROI (client) */}
            <RoiSection />

            {/* DIAGNÓSTICO (client) */}
            <DiagnosticoSection />

            {/* DEMOS (server) */}
            <section className={styles.testimonialsSection}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>DEMOS DE PRODUCTO</span>
                        <h2 className={styles.sectionTitle}>Explorá soluciones <span className={styles.textGradient}>en funcionamiento</span></h2>
                        <p className={styles.sectionSubtitle}>Estos proyectos muestran capacidades y conceptos funcionales; no son casos de resultados de clientes.</p>
                    </div>
                    <div className="text-center">
                        <Link href="/portfolio" className={`${styles.btnPowaPrimary} text-decoration-none`}>Ver demos y proyectos <FaArrowRight className="ms-2" /></Link>
                    </div>
                </Container>
            </section>

            {/* SECURITY (server) */}
            <section className={styles.securitySection}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6}>
                            <div className={styles.badgeSecurity}><FaShieldAlt className="me-2" /> Estándar de Seguridad Corporativa</div>
                            <h2 className={styles.sectionTitle} style={{ marginBottom: '1.5rem' }}>Tu propiedad intelectual, <br /><span className={styles.textGradient}>completamente blindada.</span></h2>
                            <p className={styles.sectionSubtitle} style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.7' }}>En la industria del software, la seriedad no se demuestra solo escribiendo código, sino protegiendo el negocio del cliente. En cada desarrollo metemos protocolos de nivel enterprise.</p>
                            <ul className={styles.securityList}>
                                {securityItems.map((item) => (
                                    <li key={item.id} className="d-flex align-items-start mb-3">
                                        <span className={styles.securityIconWrapper}>{item.icon}</span>
                                        <span className="ms-2"><strong>{item.boldText}</strong>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col lg={6} className="text-center d-none d-lg-block">
                            <div className={styles.securityVisualBox}>
                                <FaShieldAlt className={styles.shieldBigIcon} />
                                <div className={styles.shieldPulse}></div>
                                <div className={styles.shieldPulseSecondary}></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA FINAL (server) */}
            <section className={styles.ctaHomeMinimal}>
                <Container>
                    <div className={styles.ctaMinimalBox}>
                        <div className={styles.ctaGlow}></div>
                        <div className={styles.ctaContent}>
                            <FaRocket className={styles.ctaRocketIcon} />
                            <h2 className={styles.ctaTitle}>¿Listo para profesionalizar tu empresa?</h2>
                            <p className={styles.ctaText}>Hablemos sobre cómo la tecnología puede resolver tus cuellos de botella actuales y potenciar tu crecimiento.</p>
                            <div className={styles.ctaButtons}>
                                <Link href="/contact" className={styles.btnPowaWhite}>Agendar Consultoría Técnica</Link>
                                <Link href="/faq" className={styles.ctaSecondary}>Ver Preguntas Frecuentes</Link>
                                <Link href="/planes/servicios/desarrollo" className={styles.btnCtaSecondary}>Ver opciones de desarrollo</Link>
                                <Link href="/planes" className={styles.btnCtaSecondary}>Ver Planes de Mantenimiento</Link>
                            </div>
                            <div className={styles.ctaTrustBadges}>
                                <span>✅ Sin compromiso</span>
                                <span>🔒 100% confidencial</span>
                                <span>⚡ Respuesta en 1 día hábil</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}