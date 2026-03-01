'use client';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

// Iconos
import { FaCode, FaArrowRight, FaDatabase, FaMobileAlt, FaRocket, FaMapMarkerAlt } from 'react-icons/fa';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { 
  SiReact, SiNodedotjs, SiTypescript, SiNextdotjs, SiDocker, 
  SiAmazonwebservices, SiPostgresql, SiOpenai
} from 'react-icons/si';

import styles from './page.module.css';

export default function HomePage() {
    const options = { triggerOnce: true, threshold: 0.1 };
    const [refStack, inViewStack] = useInView(options);
    const [refServices, inViewServices] = useInView(options);
    const [refCta, inViewCta] = useInView(options);

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
            {/* --- JSON-LD --- */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "name": "Powa Digital",
                        "url": "https://agencia-powa.vercel.app",
                        "image": "https://agencia-powa.vercel.app/desarrollo-de-sitios-web.webp",
                        "description": "Agencia de software y desarrollo web líder en Villa La Florida, San Francisco Solano y Quilmes.",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Quilmes",
                            "addressRegion": "Buenos Aires",
                            "addressCountry": "AR"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": "-34.776333",
                            "longitude": "-58.292194"
                        },
                        "areaServed": ["Quilmes", "San Francisco Solano", "Villa La Florida", "Bernal", "Zona Sur"]
                    })
                }}
            />

            {/* --- HERO SECTION --- */}
            <section className={styles.heroSectionModern}>
                <div className={styles.heroBgGlow}></div>
                <Container className="position-relative z-3">
                    <Row className="align-items-center">
                        <Col lg={7}>
                            <div className={styles.badgePowa}>
                                <FaMapMarkerAlt className="me-2" /> Agencia Tech en Villa La Florida & Solano
                            </div>
                            <h1 className={styles.heroTitleMain}>
                                Expertos en <span className="text-gradient">Desarrollo Web</span><br />
                                y Software en Quilmes.
                            </h1>
                            <p className={styles.heroSubtitleModern}>
                                Impulsamos el crecimiento de empresas en <strong>Villa La Florida, San Francisco Solano</strong> y toda la <strong>Zona Sur</strong>. 
                                Desarrollamos <strong>ecosistemas digitales</strong> a medida con ingeniería de clase mundial.
                            </p>
                            <div className="d-flex flex-wrap gap-3 mt-4">
                                <Link href="/contact" className="btn-powa-primary text-decoration-none">
                                    Iniciar Proyecto <FaRocket className="ms-2" />
                                </Link>
                                <Link href="/servicios" className={`${styles.btnPowaOutline} text-decoration-none`}>
                                    Soluciones para Negocios <HiOutlineArrowNarrowRight className="ms-2" />
                                </Link>
                            </div>
                        </Col>
                        <Col lg={5} className="d-none d-lg-block">
                            <div className="position-relative">
                                {/* SOLUCIÓN AL ASPECT RATIO: width y height ahora coinciden con la proporción real (1.5) */}
                                <Image 
                                  src="/desarrollo-de-sitios-web.webp" 
                                  alt="Software y Páginas Web en Villa La Florida Quilmes" 
                                  width={640} 
                                  height={427}
                                  className="rounded-4 shadow-lg"
                                  priority
                                  style={{
                                      width: '100%',
                                      height: 'auto',
                                      maxWidth: '550px', // Mantenemos el tamaño visual que querías
                                      objectFit: 'cover'
                                  }}
                                />
                                <div className={styles.codeBadge}>
                                  <code>{"{ location: 'Villa La Florida, AR' }"}</code>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* --- TECH STACK --- */}
            <section className={styles.techStackSection} ref={refStack}>
                <Container>
                    <h2 className={styles.techLabel}>Tecnologías de Vanguardia para la Zona Sur</h2>
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

            {/* --- SERVICES GRID --- */}
            <section className={styles.homeServices} ref={refServices}>
                <Container>
                    <h2 className="text-center text-white mb-5" style={{fontSize: '2.5rem', fontWeight: '800'}}>
                        Expertise en <span className="text-gradient">Ingeniería Digital</span>
                    </h2>
                    <Row className="g-4 mt-4">
                        {[
                            { 
                                icon: <FaCode />, 
                                title: "Webs en Villa La Florida", 
                                desc: "Diseño y desarrollo de sitios ultra rápidos para destacar en el mercado local de Quilmes." 
                            },
                            { 
                                icon: <FaMobileAlt />, 
                                title: "Apps en San Fco. Solano", 
                                desc: "Aplicaciones móviles diseñadas para conectar negocios de Zona Sur con sus clientes." 
                            },
                            { 
                                icon: <FaDatabase />, 
                                title: "Automatización Industrial", 
                                desc: "Software robusto para optimizar procesos en pymes y fábricas de la zona." 
                            }
                        ].map((item, idx) => (
                            <Col md={4} key={idx}>
                                <div className={styles.powaServiceCard}>
                                    <div className={styles.iconBox}>{item.icon}</div>
                                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-slate-200 text-sm mb-4 leading-relaxed">{item.desc}</p>
                                    <Link href="/servicios" className={styles.cardLink}>
                                        Explorar <FaArrowRight className="ms-2" />
                                    </Link>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* --- SEO FOOTER TEXT --- */}
            <section className="py-5 bg-darker">
                <Container>
                    <div className="text-center opacity-50 text-white" style={{fontSize: '0.85rem'}}>
                        <p><strong>Powa Digital</strong>: Innovación en software y <strong>desarrollo web en San Francisco Solano</strong>, <strong>Villa La Florida</strong> y <strong>Quilmes</strong>. 
                        Servicios profesionales de tecnología para toda la <strong>Zona Sur</strong> de Buenos Aires. 
                        Ubicación técnica: 34°46'34.8"S 58°17'31.9"W.</p>
                    </div>
                </Container>
            </section>

            {/* --- CTA FINAL --- */}
            <section className={styles.ctaHomeMinimal} ref={refCta}>
                <Container>
                    <div className={styles.ctaMinimalBox}>
                        <h2 className="display-5 font-bold text-white mb-3" style={{fontWeight: '800'}}>¿Tu negocio está en Florida o Solano?</h2>
                        <p className="text-blue-100 mb-5 text-lg opacity-75">Hagamos que tu presencia digital sea tan fuerte como tu presencia física.</p>
                        <Link href="/contact" className={styles.btnPowaWhite}>
                            Agendar Visita o Asesoría
                        </Link>
                    </div>
                </Container>
            </section>
        </div>
    );
}