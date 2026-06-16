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
  FaChevronRight,
  FaStar,
  FaAward,
  FaClock,
  FaUsers,
  FaDatabase,
  FaCloudUploadAlt,
  FaShieldAlt,
  FaArrowRight
} from 'react-icons/fa';
import Link from 'next/link';
import GimnasioDemo from '@/components/demos/GimnasioDemo';
import ReservaDemo from '@/components/demos/ReservaDemo';
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
  demoComponent?: React.ReactNode;
  year?: string;
  category?: string;
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
    year: "2025",
    category: "Mobile",
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
    featured: true,
    year: "2024",
    category: "E-commerce",
    galleryImages: null
  },
  {
    title: "Capriccio Engine (Django)",
    icon: <FaPython />,
    description: "Backend de grado corporativo con Python/Django. Implementación de CI/CD y bases de datos relacionales robustas.",
    link: "https://capricciodepizza.onrender.com/",
    tag: "BACKEND ARCHITECTURE",
    tech: ["Django", "PostgreSQL", "API Rest"],
    year: "2024",
    category: "Backend",
    galleryImages: null
  },
  {
    title: "La Abu Matie App",
    icon: <FaServer />,
    description: "Gestión administrativa automatizada. Interfaz diseñada bajo principios de accesibilidad y eficiencia operativa.",
    link: "https://la-abu-matie-app.web.app/",
    tag: "ADMIN DASHBOARD",
    tech: ["Material UI", "Realtime DB", "NoSQL"],
    year: "2025",
    category: "Dashboard",
    galleryImages: null
  },
  {
    title: "Gimnasio & Nutrición",
    icon: <FaMobileAlt />,
    description: "Ecosistema para gestión de centros fitness con integración nutricional y seguimiento de progreso en tiempo real.",
    link: "#",
    tag: "FITNESS APP",
    tech: ["Next.js", "Supabase", "Tailwind"],
    year: "2025",
    category: "Health",
    galleryImages: null,
    demoComponent: <GimnasioDemo />
  },
  {
    title: "Powa Schedule",
    icon: <FaCloudUploadAlt />,
    description: "Sistema de gestión de turnos y consultorías con disponibilidad en tiempo real y notificaciones automáticas.",
    link: "#",
    tag: "SAAS TOOL",
    tech: ["Next.js", "Supabase", "React"],
    year: "2025",
    category: "SaaS",
    galleryImages: null,
    demoComponent: <ReservaDemo />
  }
];

export default function PortfolioPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const stats = useMemo(() => [
    { value: "+20", label: "Proyectos Entregados", icon: <FaAward /> },
    { value: "99%", label: "Uptime Garantizado", icon: <FaClock /> },
    { value: "15+", label: "Clientes Activos", icon: <FaUsers /> },
    { value: "Next.js", label: "Stack Principal", icon: <FaCode /> }
  ], []);

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(PROJECTS_DATA.map(p => p.category).filter(Boolean))];
    return cats as string[];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(p => p.category === filter);
  }, [filter]);

  const handleShowModal = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const featuredProjects = PROJECTS_DATA.filter(p => p.featured);

  return (
    <div className={styles.portfolioWrapper}>
      <div className={styles.ambientGlow} />
      <div className={styles.ambientGlowSecondary} />

      <Container className={styles.heroSection}>
        <header className="text-center">
          <div className={styles.badgeWrapper}>
            <span className={styles.badgePowa}>CASE STUDIES</span>
          </div>
          <h1 className={styles.portfolioTitleMain}>
            Software de <span className={styles.textGradient}>Alto Impacto</span>
          </h1>
          <p className={styles.portfolioLeadText}>
            Soluciones de ingeniería que transforman la visión de negocio en productos escalables,
            seguros y centrados en el usuario.
          </p>

          {/* ===== FEATURED BADGE ===== */}
          <div className={styles.featuredBadge}>
            <FaStar className={styles.featuredIcon} />
            <span>Proyectos Destacados</span>
            <span className={styles.featuredCount}>{featuredProjects.length}</span>
          </div>
        </header>
      </Container>

      <Container className="pb-5">
        {/* ===== STATS ===== */}
        <Row className="mb-5 g-3">
          {stats.map((stat, i) => (
            <Col xs={6} md={3} key={i}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </Col>
          ))}
        </Row>

        {/* ===== FILTROS ===== */}
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
            {filteredProjects.length} proyectos
          </span>
        </div>

        {/* ===== GRID HEADER ===== */}
        <div className={styles.gridHeader}>
          <h2 className={styles.sectionDivider}>
            <FaCode className={styles.iconBlue} /> Catálogo de Ingeniería
          </h2>
          <div className={styles.lineDivider} />
        </div>

        {/* ===== PROJECTS GRID ===== */}
        <Row className="g-4">
          {filteredProjects.map((project, index) => (
            <Col md={6} lg={4} key={index} className={project.featured ? styles.featuredCol : ''}>
              <div className={`${styles.powaProjectCard} ${project.featured ? styles.featuredCard : ''}`}>
                <div className={styles.projectTop}>
                  {project.featured && (
                    <div className={styles.featuredTag}>
                      <FaStar /> Destacado
                    </div>
                  )}
                  <div className={styles.projectTag}>{project.tag}</div>
                  <div className={styles.projectIcon}>{project.icon}</div>

                  <div className={styles.overlayActions}>
                    <Button
                      className={styles.glassButton}
                      onClick={() => (project.galleryImages || project.demoComponent) ? handleShowModal(project) : window.open(project.link, '_blank')}
                    >
                      {project.demoComponent ? "Ver Demo" : (project.galleryImages ? "Ver Arquitectura" : "Explorar")}
                    </Button>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardYear}>{project.year || '2025'}</span>
                    <span className={styles.cardCategory}>{project.category || 'General'}</span>
                  </div>
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
                    {(project.galleryImages || project.demoComponent) && (
                      <button onClick={() => handleShowModal(project)} className={styles.iconAction} title="Ver Detalles">
                        <FaArrowRight />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* ===== CTA SECTION ===== */}
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