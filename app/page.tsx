'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

// Iconos
import {
    FaCode, FaArrowRight, FaDatabase, FaMobileAlt, FaRocket,
    FaMapMarkerAlt, FaSearch, FaCogs, FaCheckCircle, FaShieldAlt,
    FaFileContract, FaLock, FaUsers, FaChartLine, FaClock,
    FaStar, FaQuoteRight, FaWhatsapp, FaCloudUploadAlt,
    FaAward, FaBrain, FaLightbulb, FaHandshake
} from 'react-icons/fa';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import {
    SiReact, SiNodedotjs, SiTypescript, SiNextdotjs, SiDocker,
    SiAmazonwebservices, SiPostgresql, SiOpenai, SiSupabase,
    SiTailwindcss, SiVercel, SiJavascript, SiRedux
} from 'react-icons/si';

import styles from './page.module.css';
import HeroWrapper from '../components/hero3d/HeroWrapper';

export default function HomePage() {
    const options = { triggerOnce: true, threshold: 0.1 };
    const [refStack] = useInView(options);
    const [refServices] = useInView(options);
    const [refBudget] = useInView(options);
    const [refProcess] = useInView(options);
    const [refSecurity] = useInView(options);
    const [refCta] = useInView(options);
    const [refTestimonials] = useInView(options);
    const [refStats] = useInView(options);

    const techStack = [
        { id: "react", icon: <SiReact color="#61DAFB" />, name: "React" },
        { id: "nextjs", icon: <SiNextdotjs color="#ffffff" />, name: "Next.js" },
        { id: "nodejs", icon: <SiNodedotjs color="#339933" />, name: "Node.js" },
        { id: "typescript", icon: <SiTypescript color="#3178C6" />, name: "TypeScript" },
        { id: "tailwind", icon: <SiTailwindcss color="#38BDF8" />, name: "Tailwind" },
        { id: "supabase", icon: <SiSupabase color="#3ECF8E" />, name: "Supabase" },
        { id: "aws", icon: <SiAmazonwebservices color="#FF9900" />, name: "AWS" },
        { id: "docker", icon: <SiDocker color="#2496ED" />, name: "Docker" },
        { id: "postgres", icon: <SiPostgresql color="#4169E1" />, name: "Postgres" },
        { id: "vercel", icon: <SiVercel color="#ffffff" />, name: "Vercel" },
        { id: "openai", icon: <SiOpenai color="#74AA9C" />, name: "OpenAI" },
        { id: "redux", icon: <SiRedux color="#764ABC" />, name: "Redux" },
    ];

    const processItems = [
        {
            id: "req",
            step: "01",
            icon: <FaSearch />,
            title: "Requerimientos & Briefing",
            desc: "Estructuramos un Formulario Técnico exhaustivo para entender tus objetivos de negocio, integraciones necesarias y cuellos de botella."
        },
        {
            id: "dev",
            step: "02",
            icon: <FaCode />,
            title: "Desarrollo & Staging",
            desc: "Iteramos bajo un Manual de Estilo de código riguroso. Dispondrás de un entorno de pruebas privado para ver los avances en tiempo real."
        },
        {
            id: "qa",
            step: "03",
            icon: <FaCheckCircle />,
            title: "QA & Despliegue Cloud",
            desc: "Sometemos el código a pruebas de carga y seguridad. El lanzamiento se ejecuta en infraestructura escalable bajo control de cambios."
        },
        {
            id: "delivery",
            step: "04",
            icon: <FaRocket />,
            title: "Acta de Entrega Final",
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
            icon: <FaCloudUploadAlt />,
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

    const testimonials = [
        {
            id: "test1",
            name: "Carlos Rodríguez",
            role: "CEO, FintechPro",
            quote: "Powa transformó nuestra plataforma en tiempo récord. La arquitectura que implementaron nos permitió escalar de 500 a 15,000 usuarios sin problemas.",
            avatar: "👨‍💼"
        },
        {
            id: "test2",
            name: "Laura Méndez",
            role: "CMO, EcomStore",
            quote: "El rediseño aumentó nuestras conversiones en un 180%. El equipo entendió perfectamente nuestra audiencia y creó una experiencia que realmente conecta.",
            avatar: "👩‍💼"
        },
        {
            id: "test3",
            name: "Andrés Silva",
            role: "CTO, HealthTech",
            quote: "La seguridad y el cumplimiento normativo fueron críticos para nosotros. Powa no solo cumplió, superó nuestras expectativas con creces.",
            avatar: "👨‍🔬"
        }
    ];

    const stats = [
        { value: "50+", label: "Proyectos Entregados", icon: <FaRocket /> },
        { value: "30+", label: "Clientes Satisfechos", icon: <FaUsers /> },
        { value: "5+", label: "Años de Experiencia", icon: <FaClock /> },
        { value: "100%", label: "Propiedad Intelectual", icon: <FaLock /> }
    ];

    return (
        <div className={styles.homepageWrapper}>
            {/* --- HERO SECTION (CON 3D) --- */}
            <HeroWrapper>
                <section className={styles.heroSectionModern}>
                    <Container className="position-relative z-3">
                        <Row className="align-items-center">
                            <Col lg={7}>
                                <div className={styles.badgePowa}>
                                    <FaMapMarkerAlt className="me-2" /> Hub Tecnológico en Quilmes & Zona Sur
                                </div>
                                <h1 className={styles.heroTitleMain}>
                                    Transformamos Ideas en <span className={styles.textGradient}>Software de Alto Impacto.</span>
                                </h1>
                                <p className={styles.heroSubtitleModern}>
                                    No solo creamos webs; desarrollamos la <strong>infraestructura digital</strong> que tu empresa necesita para escalar.
                                    Ingeniería Senior aplicada a negocios de <strong>Todo el Mundo.</strong>
                                </p>
                                <div className="d-flex flex-wrap gap-3 mt-4">
                                    <Link href="/contact" className={`${styles.btnPowaPrimary} text-decoration-none`}>
                                        Consultoría Gratuita <FaRocket className="ms-2" />
                                    </Link>
                                    <Link href="/servicios" className={`${styles.btnPowaOutline} text-decoration-none`}>
                                        Nuestras Soluciones <HiOutlineArrowNarrowRight className="ms-2" />
                                    </Link>
                                </div>

                                {/* Trust Badges */}
                                <div className={styles.heroTrustBadges}>
                                    <span className={styles.trustBadge}>
                                        <FaShieldAlt className={styles.trustBadgeIcon} />
                                        100% Propiedad Intelectual
                                    </span>
                                    <span className={styles.trustBadge}>
                                        <FaClock className={styles.trustBadgeIcon} />
                                        Entregas Parciales
                                    </span>
                                    <span className={styles.trustBadge}>
                                        <FaWhatsapp className={styles.trustBadgeIcon} />
                                        Soporte 24/7
                                    </span>
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
                                        <code>{"const stack = ['Next.js', 'Supabase', 'IA'];"}</code>
                                        {'}'}
                                    </div>
                                    <div className={styles.floatingBadge}>
                                        <FaStar className={styles.floatingBadgeIcon} />
                                        <span>4.9/5 - Clientes</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </HeroWrapper>

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

            {/* --- ESTADÍSTICAS --- */}
            <section className={styles.statsSection} ref={refStats}>
                <Container>
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

            {/* --- METODOLOGÍA (FLUJO SENIOR EN 4 FASES) --- */}
            <section className={styles.processSection} ref={refProcess}>
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

            {/* --- SERVICES GRID --- */}
            <section className={styles.homeServices} ref={refServices}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>SERVICIOS</span>
                        <h2 className={styles.sectionTitle}>Soluciones <span className={styles.textGradient}>Estratégicas</span></h2>
                        <p className={styles.sectionSubtitle}>Tecnología a medida para cada desafío de tu negocio.</p>
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

            {/* --- SECCIÓN "MEJORAMOS CUALQUIER PRESUPUESTO" --- */}
            <section className={styles.budgetMatchSection} ref={refBudget}>
                <Container>
                    <div className={styles.budgetMatchContainer}>
                        <Row className="align-items-center g-4">
                            <Col lg={6}>
                                <div className={styles.budgetContent}>
                                    <span className={styles.sectionBadge}>💰 PRESUPUESTO</span>
                                    <h2 className={styles.budgetTitle}>
                                        Mejoramos <span className={styles.textGradient}>Cualquier Presupuesto</span>
                                    </h2>
                                    <p className={styles.budgetSubtitle}>
                                        No importa el tamaño de tu proyecto ni tu inversión inicial.
                                        En Powa diseñamos soluciones a medida que se ajustan a tus posibilidades.
                                    </p>
                                    <div className={styles.budgetFeatures}>
                                        <div className={styles.budgetFeature}>
                                            <FaCheckCircle className={styles.budgetFeatureIcon} />
                                            <div>
                                                <h4>Planes flexibles</h4>
                                                <p>Desde proyectos pequeños hasta soluciones enterprise. Adaptamos nuestro proceso a tu realidad.</p>
                                            </div>
                                        </div>
                                        <div className={styles.budgetFeature}>
                                            <FaCheckCircle className={styles.budgetFeatureIcon} />
                                            <div>
                                                <h4>Entregas escalonadas</h4>
                                                <p>No necesitas todo el capital upfront. Dividimos el proyecto en fases para que inviertas a tu ritmo.</p>
                                            </div>
                                        </div>
                                        <div className={styles.budgetFeature}>
                                            <FaCheckCircle className={styles.budgetFeatureIcon} />
                                            <div>
                                                <h4>ROI garantizado</h4>
                                                <p>Cada inversión está diseñada para generar retorno. Si no ves resultados, ajustamos la estrategia.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className={styles.budgetVisual}>
                                    <div className={styles.budgetCard}>
                                        <div className={styles.budgetCardHeader}>
                                            <span className={styles.budgetCardBadge}>📊 Comparativa</span>
                                            <h3>¿Cuánto cuesta invertir en tecnología?</h3>
                                        </div>
                                        <div className={styles.budgetCardBody}>
                                            <div className={styles.budgetComparison}>
                                                <div className={styles.budgetItem}>
                                                    <span className={styles.budgetItemLabel}>Desarrollo básico</span>
                                                    <div className={styles.budgetBarWrapper}>
                                                        <div className={styles.budgetBar} style={{ width: '100%' }}>
                                                            <span>$800 - $1,500</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.budgetItem}>
                                                    <span className={styles.budgetItemLabel}>Desarrollo profesional</span>
                                                    <div className={styles.budgetBarWrapper}>
                                                        <div className={`${styles.budgetBar} ${styles.budgetBarPrimary}`} style={{ width: '85%' }}>
                                                            <span>$1,500 - $3,500</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.budgetItem}>
                                                    <span className={styles.budgetItemLabel}>Solución enterprise</span>
                                                    <div className={styles.budgetBarWrapper}>
                                                        <div className={`${styles.budgetBar} ${styles.budgetBarPremium}`} style={{ width: '70%' }}>
                                                            <span>$3,500+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.budgetCtaBox}>
                                                <p>¿No encontrás tu presupuesto? <strong>Hablemos y armamos algo juntos.</strong></p>
                                                <Link href="/contact" className={styles.budgetCtaButton}>
                                                    <FaWhatsapp className={styles.budgetCtaIcon} />
                                                    Consultar presupuesto
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>

            {/* --- TESTIMONIALS --- */}
            <section className={styles.testimonialsSection} ref={refTestimonials}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>TESTIMONIOS</span>
                        <h2 className={styles.sectionTitle}>Lo que dicen <span className={styles.textGradient}>nuestros clientes</span></h2>
                    </div>
                    <Row className="g-4">
                        {testimonials.map((testimonial) => (
                            <Col key={testimonial.id} lg={4} md={6}>
                                <div className={styles.testimonialCard}>
                                    <FaQuoteRight className={styles.quoteIcon} />
                                    <p className={styles.testimonialText}>"{testimonial.quote}"</p>
                                    <div className={styles.testimonialAuthor}>
                                        <div className={styles.testimonialAvatar}>{testimonial.avatar}</div>
                                        <div>
                                            <div className={styles.testimonialName}>{testimonial.name}</div>
                                            <div className={styles.testimonialRole}>{testimonial.role}</div>
                                        </div>
                                    </div>
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
                                Tu propiedad intelectual, <br />
                                <span className={styles.textGradient}>completamente blindada.</span>
                            </h2>
                            <p className={styles.sectionSubtitle} style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                En la industria del software, la seriedad no se demuestra solo escribiendo código, sino protegiendo el negocio del cliente. En cada desarrollo aplicamos protocolos de nivel enterprise.
                            </p>
                            <ul className={styles.securityList}>
                                {securityItems.map((item) => (
                                    <li key={item.id} className="d-flex align-items-start mb-3">
                                        <span className={styles.securityIconWrapper}>{item.icon}</span>
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
                                <div className={styles.shieldPulseSecondary}></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* --- CTA FINAL --- */}
            <section className={styles.ctaHomeMinimal} ref={refCta}>
                <Container>
                    <div className={styles.ctaMinimalBox}>
                        <div className={styles.ctaGlow}></div>
                        <div className={styles.ctaContent}>
                            <FaRocket className={styles.ctaRocketIcon} />
                            <h2 className={styles.ctaTitle}>¿Listo para profesionalizar tu empresa?</h2>
                            <p className={styles.ctaText}>
                                Hablemos sobre cómo la tecnología puede resolver tus cuellos de botella actuales y potenciar tu crecimiento.
                            </p>
                            <div className={styles.ctaButtons}>
                                <Link href="/contact" className={styles.btnPowaWhite}>
                                    Agendar Consultoría Técnica
                                </Link>
                                <Link href="/faq" className={styles.btnCtaSecondary}>
                                    Ver Preguntas Frecuentes
                                </Link>
                            </div>
                            <div className={styles.ctaTrustBadges}>
                                <span>✅ Sin compromiso</span>
                                <span>🔒 100% confidencial</span>
                                <span>⚡ Respuesta en 24hs</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}