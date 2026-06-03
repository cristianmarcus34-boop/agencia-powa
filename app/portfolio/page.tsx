'use client';

import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
  FaCode, 
  FaRocket,
  FaReact, 
  FaPython, 
  FaMobileAlt, 
  FaServer,
  FaImages, 
  FaChevronRight
} from 'react-icons/fa';
import Link from 'next/link';
import ProjectModal from '@/components/ProjectModal';
import styles from './portfolio.module.css';

interface Project {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  tag: string;
  tech: string[];
  galleryImages: string[] | null;
  featured?: boolean;
}

const PROJECTS_DATA: Project[] = [
  {
    title: "Krusty Burger App",
    icon: <FaMobileAlt />,
    description: "Ecosistema TWA nativo con sincronización offline y arquitectura modular. Optimizada para flujos transaccionales masivos.",
    link: "https://www.krustyburger.com.ar/",
    tag: "MOBILE ENGINE",
    tech: ["Expo Core", "Supabase", "Next.js"],
    featured: true,
    galleryImages: [
      "/krustyappminiatura.png",
      "/menuprincipalminiatura.png",
      "/perfilmini.png",
      "/panelperfil.png",
    ],
  },
  {
    title: "Capriccio de Pizza (React)",
    icon: <FaReact />,
    description: "Plataforma e-commerce con SSR avanzado. Reducción de latencia y Core Web Vitals optimizados para SEO.",
    link: "https://capiccio-de-pizza.web.app/",
    tag: "PERFORMANCE UI",
    tech: ["React 18", "Firebase", "Optimization"],
    galleryImages: null
  },
  {
    title: "Capriccio Engine (Django)",
    icon: <FaPython />,
    description: "Backend de grado corporativo con Python/Django. Implementación de CI/CD y bases de datos relacionales robustas.",
    link: "https://capricciodepizza.onrender.com/",
    tag: "BACKEND ARCHITECTURE",
    tech: ["Django", "PostgreSQL", "API Rest"],
    galleryImages: null
  },
  {
    title: "La Abu Matie App",
    icon: <FaServer />,
    description: "Gestión administrativa automatizada. Interfaz diseñada bajo principios de accesibilidad y eficiencia operativa.",
    link: "https://la-abu-matie-app.web.app/",
    tag: "ADMIN DASHBOARD",
    tech: ["Material UI", "Realtime DB", "NoSQL"],
    galleryImages: null
  }
];

export default function PortfolioPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const stats = useMemo(() => [
    { value: "+20", label: "Despliegues" },
    { value: "99%", label: "Uptime" },
    { value: "0.8s", label: "Latencia" },
    { value: "Next.js", label: "Stack Principal" }
  ], []);

  const handleShowModal = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  return (
    <div className={styles.portfolioWrapper}>
      <div className={styles.ambientGlow} />
      
      <Container className={styles.heroSection}>
        <header className="text-center">
          <div className={styles.badgeWrapper}>
            <span className={styles.badgePowa}>CASE STUDIES</span>
          </div>
          <h1 className={styles.portfolioTitleMain}>
            Software de <span className={styles.textGradient}>Alto Impacto</span>
          </h1>
          <p className={styles.portfolioLeadText}>
            Soluciones de ingeniería que transforman la visión de negocio en productos escalables, seguros y centrados en el usuario.
          </p>
        </header>
      </Container>

      <Container className="pb-5">
        {/* Stats Bento Grid */}
        <Row className="mb-5 g-3">
          {stats.map((stat, i) => (
            <Col xs={6} md={3} key={i}>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </Col>
          ))}
        </Row>

        <div className={styles.gridHeader}>
          <h2 className={styles.sectionDivider}>
            <FaCode className={styles.iconBlue} /> Catálogo de Ingeniería
          </h2>
          <div className={styles.lineDivider} />
        </div>

        <Row className="g-4">
          {PROJECTS_DATA.map((project, index) => (
            <Col md={6} lg={4} key={index} className={project.featured ? styles.featuredCol : ''}>
              <div className={styles.powaProjectCard}>
                <div className={styles.projectTop}>
                  <div className={styles.projectTag}>{project.tag}</div>
                  <div className={styles.projectIcon}>{project.icon}</div>
                  
                  <div className={styles.overlayActions}>
                    <Button 
                      className={styles.glassButton}
                      onClick={() => project.galleryImages ? handleShowModal(project) : window.open(project.link, '_blank')}
                    >
                      {project.galleryImages ? "Ver Arquitectura" : "Ver Demo"}
                    </Button>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.techStack}>
                    {project.tech.map((t, i) => <span key={i} className={styles.techItem}>{t}</span>)}
                  </div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDescription}>{project.description}</p>
                  
                  <div className={styles.cardFooter}>
                    <Button 
                      variant="link" 
                      href={project.link} 
                      target="_blank"
                      className={styles.linkAction}
                    >
                      EXPLORAR <FaChevronRight size={10} className="ms-1" />
                    </Button>
                    {project.galleryImages && (
                      <button onClick={() => handleShowModal(project)} className={styles.iconAction} title="Ver Galería">
                        <FaImages />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* CTA Section */}
        <section className={styles.ctaWrapper}>
          <div className={styles.ctaInner}>
            <h3 className={styles.ctaTitle}>¿Necesitas escalar tu infraestructura digital?</h3>
            <p className={styles.ctaSubtitle}>Analicemos la viabilidad técnica de tu próximo proyecto.</p>
            <Link href="/contact" className={styles.btnCtaModern}>
              AGENDAR CONSULTORÍA <FaRocket className="ms-2" />
            </Link>
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