'use client';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

// Iconos
import { FaCode, FaArrowRight, FaDatabase, FaMobileAlt, FaRocket, FaMapMarkerAlt, FaSearch, FaCogs, FaCheckCircle } from 'react-icons/fa';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import {
    SiReact, SiNodedotjs, SiTypescript, SiNextdotjs, SiDocker,
    SiAmazonwebservices, SiPostgresql, SiOpenai
} from 'react-icons/si';

import styles from './page.module.css';

export default function HomePage() {
    const options = { triggerOnce: true, threshold: 0.1 };
    const [refStack] = useInView(options);
    const [refServices] = useInView(options);
    const [refProcess] = useInView(options);
    const [refCta] = useInView(options);

    const techStack = [
        { icon: <SiReact color="#61DAFB" />, name: "React" },
        { icon: <SiNextdotjs color="#ffffff" />, name: "Next.js" },
        { icon: <SiNodedotjs color="#339933" />, name: "Node.js" },
        { icon: <SiTypescript color="#3178C6" />, name: "TypeScript" },
        { icon: <SiOpenai color="#ffffff" />, name: "AI Integration" },
        { icon: <SiAmazonwebservices color="#FF9900" />, name: "AWS" },
        { icon: <SiDocker color="#2496ED" />, name: "Docker" },
        { icon: <SiPostgresql color="#4169E1" />, name: "Postgres" },
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
                                Ingeniería Senior aplicada a negocios de <strong>Quilmes, Solano y Florida.</strong>
                            </p>
                            <div className="d-flex flex-wrap gap-3 mt-4">
                                <Link href="/contact" className="btn-powa-primary text-decoration-none">
                                    Consultoría Gratuita <FaRocket className="ms-2" />
                                </Link>
                                <Link href="/servicios" className={`${styles.btnPowaOutline} text-decoration-none`}>
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
                                    <code>{"const stack = ['Next.js', 'AI', 'Cloud'];"}</code>
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
                                <div key={idx} className={styles.stackItem}>
                                    <div className={styles.techIconWrapper}>{tech.icon}</div>
                                    <span className={styles.techName}>{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* --- METODOLOGÍA (NUEVA SECCIÓN SENIOR) --- */}
            <section className={styles.processSection} ref={refProcess}>
                <Container>
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>Nuestro ADN de <span className="text-gradient">Ingeniería</span></h2>
                        <p className={styles.sectionSubtitle}>Cómo convertimos un requerimiento en una ventaja competitiva.</p>
                    </div>
                    <Row className="g-4">
                        {[
                            {
                                step: "01",
                                icon: <FaSearch />,
                                title: "Discovery & Estrategia",
                                desc: "Analizamos tu modelo de negocio y procesos actuales para identificar dónde el software puede generar mayor ROI."
                            },
                            {
                                step: "02",
                                icon: <FaCode />,
                                title: "Desarrollo Ágil",
                                desc: "Iteraciones rápidas con acceso a un entorno de pruebas (Staging). Ves el progreso de tu producto en tiempo real."
                            },
                            {
                                step: "03",
                                icon: <FaCheckCircle />,
                                title: "QA & Deployment",
                                desc: "Testeamos cada funcionalidad bajo estándares de seguridad rigurosos antes de salir a producción en la nube."
                            }
                        ].map((item, idx) => (
                            <Col lg={4} key={idx}>
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
                        {[
    { 
        icon: <FaCode />, 
        title: "Sistemas Web Escalables", 
        desc: "No son plantillas. Son plataformas robustas construidas con Next.js para una velocidad y SEO inigualables." 
    },
    { 
        icon: <FaMobileAlt />, 
        title: "Desarrollo Mobile Nativo", 
        desc: "Apps para iOS y Android con arquitecturas modernas que ofrecen una experiencia fluida y escalable." 
    },
    { 
        icon: <FaDatabase />, 
        title: "Gestión de Datos & Cloud", 
        desc: "Centralizamos la información de tu negocio con bases de datos seguras y paneles de administración a medida." 
    },
    { 
        icon: <FaCogs />, 
        title: "Automatización de Procesos", 
        desc: "Optimizamos tus flujos internos con software que elimina tareas manuales, ahorrando tiempo y costos operativos." 
    },
    { 
        icon: <SiOpenai />, // Usando el icono de OpenAI que ya tenías importado
        title: "Integración de IA", 
        desc: "Implementamos modelos de Inteligencia Artificial para análisis de datos, chatbots avanzados o generación de contenido." 
    },
    { 
        icon: <FaRocket />, 
        title: "Soporte & Evolución", 
        desc: "Acompañamos el crecimiento de tu producto con mantenimiento proactivo, actualizaciones de seguridad y mejora continua." 
    }
].map((item, idx) => (
    <Col lg={4} md={6} key={idx}> 
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

            {/* --- CTA FINAL --- */}
            <section className={styles.ctaHomeMinimal} ref={refCta}>
                <Container>
                    <div className={styles.ctaMinimalBox}>
                        <h2 className="display-5 font-bold text-white mb-3" style={{ fontWeight: '800' }}>¿Listo para profesionalizar tu empresa?</h2>
                        <p className="text-blue-100 mb-5 text-lg opacity-75">Hablemos sobre cómo la tecnología puede resolver tus cuellos de botella actuales.</p>
                        <Link href="/contact" className={styles.btnPowaWhite}>
                            Agendar Consultoría Técnica
                        </Link>
                    </div>
                </Container>
            </section>
        </div>
    );
}