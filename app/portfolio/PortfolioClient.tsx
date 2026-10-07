// app/portfolio/PortfolioClient.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import {
    FaCode,
    FaRocket,
    FaImages,
    FaChevronRight,
    FaStar,
    FaArrowRight,
} from 'react-icons/fa';
import ProjectModal from '@/components/ProjectModal';
import { PROJECTS_DATA, type Project } from './projects-data';
import styles from './portfolio.module.css';

export default function PortfolioClient() {
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState<string>('all');

    const categories = useMemo(() => {
        const cats = ['all', ...new Set(PROJECTS_DATA.map((p) => p.category).filter(Boolean))];
        return cats as string[];
    }, []);

    const filteredProjects = useMemo(() => {
        if (filter === 'all') return PROJECTS_DATA;
        return PROJECTS_DATA.filter((p) => p.category === filter);
    }, [filter]);

    const handleShowModal = (project: Project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);

    return (
        <div className={styles.portfolioWrapper}>
            <div className={styles.ambientGlow} />
            <div className={styles.ambientGlowSecondary} />

            <Container className={styles.heroSection}>
                <header className="text-center">
                    <div className={styles.badgeWrapper}>
                        <span className={styles.badgePowa}>PORTFOLIO Y DEMOS</span>
                    </div>
                    <h1 className={styles.portfolioTitleMain}>
                        Software de <span className={styles.textGradient}>Alto Impacto</span>
                    </h1>
                    <p className={styles.portfolioLeadText}>
                        Proyectos propios y demostraciones funcionales. Explorá interfaces y flujos de producto; los ejemplos no representan resultados de clientes.
                    </p>

                    <div className={styles.featuredBadge}>
                        <FaStar className={styles.featuredIcon} />
                        <span>Proyectos Destacados</span>
                        <span className={styles.featuredCount}>{featuredProjects.length}</span>
                    </div>
                </header>
            </Container>

            <Container className="pb-5">
                <div className={styles.filterSection}>
                    <div className={styles.filterWrapper}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`${styles.filterButton} ${filter === cat ? styles.filterActive : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat === 'all' ? 'Todos' : cat}
                            </button>
                        ))}
                    </div>
                    <span className={styles.filterCount}>
                        {filteredProjects.length} Proyectos
                    </span>
                </div>

                <div className={styles.gridHeader}>
                    <h2 className={styles.sectionDivider}>
                        <FaCode className={styles.iconBlue} /> Catálogo de Ingeniería
                    </h2>
                    <div className={styles.lineDivider} />
                </div>

                <Row className="g-4">
                    {filteredProjects.map((project, index) => (
                        <Col md={6} lg={4} key={index} className={project.featured ? styles.featuredCol : ''}>
                            <div className={`${styles.powaProjectCard} ${project.featured ? styles.featuredCard : ''}`}>
                                <div className={styles.projectTop}>
                                    {project.image ? (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority={index < 3}
                                            />
                                        </div>
                                    ) : (
                                        <div className={styles.projectPlaceholder}>
                                            <FaImages className={styles.placeholderIcon} />
                                        </div>
                                    )}
                                    <div className={styles.projectIcon}>{project.icon}</div>
                                    {project.tag && <span className={styles.projectTag}>{project.tag}</span>}
                                    {project.featured && (
                                        <span className={styles.featuredTag}>
                                            <FaStar className={styles.featuredStarIcon} />
                                            Destacado
                                        </span>
                                    )}
                                </div>

                                <div className={styles.cardContent}>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.cardYear}>{project.year || '2025'}</span>
                                        <span className={styles.cardCategory}>{project.category || 'General'}</span>
                                    </div>
                                    <div className={styles.techStack}>
                                        {project.tech.map((t, i) => (
                                            <span key={i} className={styles.techItem}>{t}</span>
                                        ))}
                                    </div>
                                    <h3 className={styles.cardTitle}>{project.title}</h3>
                                    <p className={styles.cardDescription}>{project.description}</p>

                                    <div className={styles.cardFooter}>
                                        {project.link !== '#' ? (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.linkAction}
                                            >
                                                EXPLORAR <FaChevronRight size={10} className="ms-1" />
                                            </a>
                                        ) : (
                                            <Link href="/contact" className={styles.linkAction}>
                                                CONSULTAR <FaChevronRight size={10} className="ms-1" />
                                            </Link>
                                        )}
                                        {(project.galleryImages || project.demoComponent) && (
                                            <button
                                                onClick={() => handleShowModal(project)}
                                                className={styles.iconAction}
                                                title="Ver Detalles"
                                            >
                                                <FaArrowRight />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

                <section className={styles.testimonialsSection}>
                    <div className="text-center mb-4">
                        <span className={styles.badgePowa}>SOBRE ESTE PORTFOLIO</span>
                        <h2 className={styles.sectionTitle}>
                            Demos para explorar, <span className={styles.textGradient}>sin métricas inventadas</span>
                        </h2>
                        <p className={styles.portfolioLeadText}>
                            Cada proyecto muestra una solución técnica o visual. El alcance y los resultados de un trabajo real se definen con cada cliente.
                        </p>
                    </div>
                </section>

                <section className={styles.ctaWrapper}>
                    <div className={styles.ctaInner}>
                        <div className={styles.ctaGlow} />
                        <div className={styles.ctaContent}>
                            <FaRocket className={styles.ctaIcon} />
                            <h3 className={styles.ctaTitle}>¿Necesitas escalar tu infraestructura digital?</h3>
                            <p className={styles.ctaSubtitle}>Analicemos la viabilidad técnica de tu próximo proyecto.</p>
                            <div className={styles.ctaBadges}>
                                <span>✅ Sin compromiso</span>
                                <span>⚡ Diagnóstico en 24hs</span>
                                <span>🔒 100% confidencial</span>
                            </div>
                            <Link href="/contact" className={styles.btnCtaModern}>
                                AGENDAR CONSULTORÍA <FaRocket className="ms-2" />
                            </Link>
                        </div>
                    </div>
                </section>
            </Container>

            {selectedProject && (
                <ProjectModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    project={selectedProject}
                />
            )}
        </div>
    );
}