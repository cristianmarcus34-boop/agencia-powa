'use client';

import React, { useState } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import {
  FaExternalLinkAlt, FaCode, FaRocket,
  FaReact, FaPython, FaMobileAlt, FaServer,
  FaImages
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
}

const PROJECTS_DATA: Project[] = [
  {
    title: "Capriccio de Pizza (React)",
    icon: <FaReact />,
    description: "E-commerce de alto rendimiento. Stack optimizado para conversión y tiempos de carga ultra rápidos.",
    link: "https://capiccio-de-pizza.web.app/",
    tag: "E-COMMERCE SYSTEM",
    tech: ["React Architecture", "Firebase", "Bootstrap 5"],
    galleryImages: null
  },
  {
    title: "Capriccio de Pizza (Django)",
    icon: <FaPython />,
    description: "Motor robusto con Python/Django. Escalabilidad total y panel administrativo personalizado.",
    link: "https://capricciodepizza.onrender.com/",
    tag: "BACKEND ARCHITECTURE",
    tech: ["Django Engine", "Python", "PostgreSQL"],
    galleryImages: null
  },
  {
    title: "La Abu Matie App",
    icon: <FaServer />,
    description: "Sistema de gestión de pedidos digitales. Interfaz minimalista enfocada en la facilidad de uso.",
    link: "https://la-abu-matie-app.web.app/",
    tag: "UI/UX SOLUTION",
    tech: ["React Core", "NoSQL", "User Experience"],
    galleryImages: null
  },
  {
    title: "Krusty Burger App",
    icon: <FaMobileAlt />,
    description: "TWA premium con notificaciones push y estética inmersiva. El futuro de los pedidos online.",
    link: "https://www.krustyburger.com.ar/",
    tag: "PREMIUM TWA ENGINE",
    tech: ["TWA Architecture", "Offline-Ready", "Mobile Core"],
    galleryImages: [
      "/krustyappminiatura.png",
      "/menuprincipalminiatura.png",
      "/perfilmini.png",
      "/panelperfil.png",
    ],
  }
];

export default function PortfolioPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleShowModal = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <div className={styles.portfolioWrapper}>
      <section className={styles.portfolioHero}>
        <div className={styles.heroBgGlow} />
        <Container>
          <header className="text-center">
            <span className={styles.badgePowa}>
              ENGINEERING & DESIGN
            </span>
            <h1 className={styles.portfolioTitleMain}>
              Proyectos que redefinen<br />el estándar digital
            </h1>
            <p className={styles.portfolioLeadText}>
              Arquitecturas escalables y diseño funcional. No solo construimos sitios,
              desarrollamos el motor tecnológico de tu empresa.
            </p>
          </header>
        </Container>
      </section>

      <Container className="pb-5 relative z-10">
        <Row className="text-center mb-5 g-4">
          {[
            { value: "+20", label: "Proyectos Live" },
            { value: "100%", label: "Eficiencia UX" },
            { value: "24/7", label: "Arquitectura" },
            { value: "+10", label: "Tecnologías" }
          ].map((stat, i) => (
            <Col xs={6} md={3} key={i}>
              <div className={styles.statCard}>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            </Col>
          ))}
        </Row>

        <h2 className={styles.sectionDivider}>
          <FaCode className="me-3" /> Desarrollo & Sistemas
        </h2>

        <Row className="g-4">
          {PROJECTS_DATA.map((project, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className={styles.powaProjectCard}>
                <div className={styles.projectImgWrapper}>
                  <div className={styles.projectTag}>
                    {project.tag}
                  </div>
                  <div className={styles.projectIcon}>
                    {project.icon}
                  </div>
                  <div className={styles.projectOverlay}>
                    <Button
                      className={styles.btnQuickView}
                      onClick={() => project.galleryImages ? handleShowModal(project) : window.open(project.link, '_blank')}
                    >
                      {project.galleryImages ? "Ver Detalles" : "Visitar Sitio"}
                    </Button>
                  </div>
                </div>

                <Card.Body className={styles.cardBody}>
                  <div className={styles.techPills}>
                    {project.tech?.map((t, i) => (
                      <span key={i}>{t}</span>
                    ))}
                  </div>

                  <Card.Title className={styles.cardTitle}>{project.title}</Card.Title>

                  <Card.Text className={styles.cardDescription}>
                    {project.description}
                  </Card.Text>

                  <div className="d-flex gap-2 mt-auto pt-4">
                    <Button
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnPowaPrimary}
                    >
                      Explorar Demo <FaExternalLinkAlt className="ms-2" size={12} />
                    </Button>

                    {project.galleryImages && (
                      <Button onClick={() => handleShowModal(project)} className={styles.btnPowaOutline}>
                        <FaImages />
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className={styles.ctaBox}>
          <h3>¿Tienes un desafío técnico?</h3>
          <p>Construyamos la solución que tu negocio necesita.</p>
          <Link href="/contact" className={styles.btnCtaLarge}>
            Iniciar Consulta <FaRocket className="ms-2" />
          </Link>
        </div>
      </Container>

      {selectedProject && (
        <ProjectModal
          show={showModal}
          handleClose={handleCloseModal}
          project={selectedProject}
        />
      )}
    </div>
  );
}