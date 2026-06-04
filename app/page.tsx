'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

// Iconos
import { 
    FaCode, FaArrowRight, FaDatabase, FaMobileAlt, FaRocket, 
    FaMapMarkerAlt, FaSearch, FaCogs, FaCheckCircle, FaShieldAlt, FaFileContract, FaLock 
} from 'react-icons/fa';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import {
    SiReact, SiNodedotjs, SiTypescript, SiNextdotjs, SiDocker,
    SiAmazonwebservices, SiPostgresql, SiOpenai, SiSupabase
} from 'react-icons/si';

import styles from './page.module.css';

export default function HomePage() {
    const options = { triggerOnce: true, threshold: 0.1 };
    const [refStack] = useInView(options);
    const [refServices] = useInView(options);
    const [refProcess] = useInView(options);
    const [refSecurity] = useInView(options);
    const [refCta] = useInView(options);

    const techStack = [
        { id: "react", icon: <SiReact color="#61DAFB" />, name: "React" },
        { id: "nextjs", icon: <SiNextdotjs color="#ffffff" />, name: "Next.js" },
        { id: "nodejs", icon: <SiNodedotjs color="#339933" />, name: "Node.js" },
        { id: "typescript", icon: <SiTypescript color="#3178C6" />, name: "TypeScript" },
        { id: "supabase", icon: <SiSupabase color="#3ECF8E" />, name: "Supabase" },
        { id: "aws", icon: <SiAmazonwebservices color="#FF9900" />, name: "AWS" },
        { id: "docker", icon: <SiDocker color="#2496ED" />, name: "Docker" },
        { id: "postgres", icon: <SiPostgresql color="#4169E1" />, name: "Postgres" },
    ];

    const processItems = [
        {
            id: "req",
            step: "01",
            icon: <FaSearch />,
            title: "1. Requerimientos & Briefing",
            desc: "Estructuramos un Formulario Técnico exhaustivo para entender tus objetivos de negocio, integraciones necesarias y cuellos de botella."
        },
        {
            id: "dev",
            step: "02",
            icon: <FaCode />,
            title: "2. Desarrollo & Entorno Staging",
            desc: "Iteramos bajo un Manual de Estilo de código riguroso. Dispondrás de un entorno de pruebas privado para ver los avances en tiempo real."
        },
        {
            id: "qa",
            step: "03",
            stepId: "qa-step",
            icon: <FaCheckCircle />,
            title: "3. QA & Despliegue Cloud",
            desc: "Sometemos el código a pruebas de carga y seguridad. El lanzamiento se ejecuta en infraestructura escalable bajo un estricto control de cambios."
        },
        {
            id: "delivery",
            step: "04",
            icon: <FaRocket />,
            title: "4. Acta de Entrega Final",
            desc: "Te transferimos la propiedad absoluta del repositorio, credenciales limpias y documentación técnica completa para garantizar tu autonomía."
        }
    ];

    const serviceItems = [
        { 
            id: "web",
            icon: <FaCode />, 
            title: "Sistemas Web Escalables", 
            desc: "No usamos plantillas genéricas. Desarrollamos plataformas robustas con Next.js preparadas para soportar tráfico masivo y SEO crítico." 
        },
        { 
            id: "mobile",
            icon: <FaMobileAlt />, 
            title: "Desarrollo Mobile Nativo", 
            desc: "Diseñamos aplicaciones nativas fluidas para iOS y Android utilizando arquitecturas modernas que escalan a la par de tu negocio." 
        },
        { 
            id: "data",
            icon: <FaDatabase />, 
            title: "Gestión de Datos & Cloud", 
            desc: "Modelamos bases de datos seguras y paneles administrativos a medida para centralizar y proteger los activos de información de tu empresa." 
        },
        { 
            id: "auto",
            icon: <FaCogs />, 
            title: "Automatización de Procesos", 
            desc: "Diseñamos flujos internos de software que eliminan las tareas manuales reiterativas, reduciendo drásticamente tus costos operativos." 
        },
        { 
            id: "ai",
            icon: <SiOpenai />, 
            title: "Integración de IA", 
            desc: "Implementamos agentes inteligentes y modelos avanzados de IA para optimizar análisis de datos internos o flujos automatizados de atención." 
        },
        { 
            id: "maint",
            icon: <FaRocket />, 
            title: "Mantenimiento Evolutivo", 
            desc: "Tu software no queda obsoleto. Aseguramos su evolución continua con monitoreo proactivo, actualizaciones de seguridad y optimizaciones de performance." 
        }
    ];

    const securityItems = [
        {
            id: "nda",
            icon: <FaFileContract className={styles.securityListIcon} />,
            boldText: "NDA (Acuerdo de Confidencialidad) Obligatorio:",
            text: " Resguardamos tu idea y tus datos comerciales bajo contrato legal firmado desde el día cero."
        },
        {
            id: "rls",
            icon: <FaLock className={styles.securityListIcon} />,
            boldText: "Estrategia Zero Hardcoding & RLS:",
            text: " Aislamos tus accesos con variables de entorno estrictas y Row Level Security nativo en Supabase."
        },
        {
            id: "repo",
            icon: <FaCode className={styles.securityListIcon} />,
            boldText: "Repositorio Privado Exclusivo:",
            text: " Tu código base se despliega en un entorno Git único e independiente, garantizando transparencia absoluta de cara a auditorías futuras."
        }
    ];

    return (
        <div className={styles.homepageWrapper}>
            {/* --- HERO SECTION --- */}
            <section className={styles.heroSectionModern}>
                <div className={styles.heroBgGlow}></div>
                <Container className="position-relative z-3">
                    <Row className="align-items-center">
                        <Col lg={7}>
                            <div className={styles.badgePowa}>
                                <FaMapMarkerAlt className="me-2" /> Hub Tecnológico en Quilmes & Zona Sur
                            </div>
                            <h1 className={styles.heroTitleMain}>
                                Transformamos Ideas en <span className="text-gradient">Software de Alto Impacto.</span>
                            </h1>
                            <p className={styles.heroSubtitleModern}>
                                No solo creamos webs; desarrollamos la infraestructura digital que tu empresa necesita para escalar.
                                Ingeniería Senior aplicada a negocios de <strong>Todo el Mundo.</strong>
                            </p>
                            <div className="d-flex flex-wrap gap-3 mt-4">
                                <Link href="/contact" className="btn-powa-primary text-decoration-none">
                                    Consultoría Gratuita <FaRocket className="ms-2" />
                                </Link>
                                {/* SOLUCIÓN UNDEFINED: Validamos la clase del módulo CSS para que nunca devuelva undefined si tarda la hidratación */}
                                <Link href="/servicios" className={`${styles.btnPowaOutline || ''} text-decoration-none`}>
                                    Nuestras Soluciones <HiOutlineArrowNarrowRight className="ms-2" />
                                </Link>
                            </div>
                        </Col>
                        <Col lg={5} className="d-none d-lg-block">
                            <div className={styles.heroImageContainer}>
                                <Image
                                    src="/desarrollo-de-sitios-web.webp"
                                    alt="Ingeniería de Software Powa Digital"
                                    width={640}
                                    height={427}
                                    className="rounded-4 shadow-lg"
                                    priority
                                />
                                <div className={styles.codeBadge}>
                                    ={'{'}
                                    <code>{"const stack = ['Next.js', 'Supabase', 'AI'];"}</code>
                                    {'}'}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* --- TECH STACK (INFINITE SCROLL) --- */}
            <section className={styles.techStackSection} ref={refStack}>
                <Container>
                    <h2 className={styles.techLabel}>Tecnologías Enterprise que dominamos</h2>
                    <div className={styles.stackSlider}>
                        <div className={styles.stackTrack}>
                            {[...techStack, ...techStack].map((tech, idx) => (
                                <div key={`tech-${tech.id}-${idx}`} className={styles.stackItem}>
                                    <div className={styles.techIconWrapper}>{tech.icon}</div>
                                    <span className={styles.techName}>{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* --- METODOLOGÍA (FLUJO SENIOR EN 4 FASES) --- */}
            <section className={styles.processSection} ref={refProcess}>
                <Container>
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>Nuestro ADN de <span className="text-gradient">Ingeniería</span></h2>
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

            {/* --- SERVICES GRID --- */}
            <section className={styles.homeServices} ref={refServices}>
                <Container>
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>Soluciones <span className="text-gradient">Estratégicas</span></h2>
                    </div>
                    <Row className="g-4">
                        {serviceItems.map((item) => (
                            <Col lg={4} md={6} key={item.id}> 
                                <div className={styles.powaServiceCard}>
                                    <div className={styles.iconBox}>{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                    <Link href="/servicios" className={styles.cardLink}>
                                        Saber más <FaArrowRight className="ms-2" />
                                    </Link>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* --- BLINDAJE LEGAL Y TECNOLÓGICO --- */}
            <section className={styles.securitySection} ref={refSecurity}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6}>
                            <div className={styles.badgeSecurity}>
                                <FaShieldAlt className="me-2" /> Estándar de Seguridad Corporativa
                            </div>
                            <h2 className={styles.sectionTitle} style={{ marginBottom: '1.5rem' }}>
                                Tu propiedad intelectual, <span className="text-gradient">completamente blindada.</span>
                            </h2>
                            <p className={styles.sectionSubtitle} style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                En la industria del software, la seriedad no se demuestra solo escribiendo código, sino protegiendo el negocio del cliente. En cada desarrollo de Digital Powa aplicamos protocolos de nivel enterprise.
                            </p>
                            <ul className={styles.securityList}>
                                {securityItems.map((item) => (
                                    <li key={item.id} className="d-flex align-items-start mb-3">
                                        {item.icon}
                                        <span className="ms-2">
                                            <strong>{item.boldText}</strong>{item.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col lg={6} className="text-center d-none d-lg-block">
                            <div className={styles.securityVisualBox}>
                                <FaShieldAlt className={styles.shieldBigIcon} />
                                <div className={styles.shieldPulse}></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* --- CTA FINAL --- */}
            <section className={styles.ctaHomeMinimal} ref={refCta}>
                <Container>
                    <div className={styles.ctaMinimalBox}>
                        <h2 className="display-5 text-white mb-3" style={{ fontWeight: '800' }}>¿Listo para profesionalizar tu empresa?</h2>
                        <p className="text-blue-100 mb-5 text-lg opacity-75">Hablemos sobre cómo la tecnología puede resolver tus cuellos de botella actuales.</p>
                        <Link href="/contact" className={styles.btnPowaWhite || ''}>
                            Agendar Consultoría Técnica
                        </Link>
                    </div>
                </Container>
            </section>
        </div>
    );
}