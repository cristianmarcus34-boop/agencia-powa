'use client';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

// Iconos
import { FaCode, FaArrowRight, FaDatabase, FaMobileAlt, FaRocket } from 'react-icons/fa';
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
        { icon: <SiPostgresql color="#4169E1" />, name: "PostgreSQL" },
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
                                #1 Software & Tech Partners
                            </div>
                            <h1 className={styles.heroTitleMain}>
                                Ingeniería <span className="text-gradient">Digital</span><br />
                                que escala tu visión.
                            </h1>
                            <p className={styles.heroSubtitleModern}>
                                En <strong>Powa</strong> no solo creamos webs; diseñamos ecosistemas tecnológicos.
                                Construimos <strong>software robusto</strong> para marcas que lideran el mercado.
                            </p>
                            <div className="d-flex flex-wrap gap-3 mt-4">
                                {/* Clase global btn-powa-primary definida en globals.css */}
                                <Link href="/contact" className="btn-powa-primary text-decoration-none">
                                    Iniciar Proyecto <FaRocket className="ms-2" />
                                </Link>
                                <Link href="/servicios" className={`${styles.btnPowaOutline} text-decoration-none`}>
                                    Explorar Soluciones <HiOutlineArrowNarrowRight className="ms-2" />
                                </Link>
                            </div>
                        </Col>
                        <Col lg={5} className="d-none d-lg-block">
                            <div className="position-relative">
                                <Image 
                                  src="/desarrollo-de-sitios-web.webp" 
                                  alt="Software Development Powa" 
                                  width={550} 
                                  height={550}
                                  className="rounded-4 shadow-lg"
                                  priority
                                />
                                <div className={styles.codeBadge}>
                                  <code>{"{ performance: '100%' }"}</code>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* --- TECH STACK --- */}
            <section className={styles.techStackSection} ref={refStack}>
                <Container>
                    <p className={styles.techLabel}>Tecnologías que dominamos</p>
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
                        Expertise <span className="text-gradient">Full Stack</span>
                    </h2>
                    <Row className="g-4 mt-4">
                        {[
                            { icon: <FaCode />, title: "Software a Medida", desc: "Sistemas escalables, dashboards y automatización inteligente." },
                            { icon: <FaMobileAlt />, title: "Mobile & Apps", desc: "Experiencias nativas fluidas diseñadas para el usuario moderno." },
                            { icon: <FaDatabase />, title: "Infraestructura", desc: "Arquitecturas en la nube, seguridad y bases de datos robustas." }
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

            {/* --- CTA FINAL --- */}
            <section className={styles.ctaHomeMinimal} ref={refCta}>
                <Container>
                    <div className={styles.ctaMinimalBox}>
                        <h2 className="display-5 font-bold text-white mb-3" style={{fontWeight: '800'}}>¿Tienes un desafío tecnológico?</h2>
                        <p className="text-blue-100 mb-5 text-lg opacity-75">Convirtamos tu visión en una ventaja competitiva real.</p>
                        <Link href="/contact" className={styles.btnPowaWhite}>
                            Agendar Asesoría Técnica
                        </Link>
                    </div>
                </Container>
            </section>
        </div>
    );
}