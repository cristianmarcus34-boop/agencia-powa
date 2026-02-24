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

// --- DEFINICIÓN DE TIPOS ---
interface Project {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  tag: string;
  tech: string[];
  galleryImages: string[] | null;
}

// --- DATOS DE LOS PROYECTOS (AQUÍ ESTÁ EL FIX) ---
const PROJECTS_DATA: Project[] = [
  {
    title: "Capriccio de Pizza (React)",
    icon: <FaReact />,
    description: "E-commerce de alto rendimiento. Stack optimizado para conversión y tiempos de carga ultra rápidos en dispositivos móviles.",
    link: "https://capiccio-de-pizza.web.app/",
    tag: "E-COMMERCE SYSTEM",
    tech: ["React Architecture", "Firebase", "Bootstrap 5"],
    galleryImages: null
  },
  {
    title: "Capriccio de Pizza (Django)",
    icon: <FaPython />,
    description: "Motor robusto con Python/Django. Escalabilidad total y panel administrativo personalizado para gestión de stock y Big Data.",
    link: "https://capricciodepizza.onrender.com/",
    tag: "BACKEND ARCHITECTURE",
    tech: ["Django Engine", "Python", "PostgreSQL"],
    galleryImages: null
  },
  {
    title: "La Abu Matie App",
    icon: <FaServer />,
    description: "Sistema de gestión de pedidos digitales. Interfaz minimalista enfocada en la facilidad de uso y accesibilidad total.",
    link: "https://la-abu-matie-app.web.app/",
    tag: "UI/UX SOLUTION",
    tech: ["React Core", "NoSQL", "User Experience"],
    galleryImages: null
  },
  {
    title: "Krusty Burger App",
    icon: <FaMobileAlt />,
    description: "TWA premium con notificaciones push, carrito avanzado y estética inmersiva. El futuro de los pedidos online.",
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
    <div className="portfolio-wrapper">
      {/* --- HERO SECTION --- */}
      <section className="portfolio-hero">
        <div className="hero-bg-glow" />
        <Container>
          <header className="text-center pt-5">
            <span className="badge-powa mb-3 inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase">
              ENGINEERING & DESIGN
            </span>
            <h1 className="portfolio-title-main text-5xl md:text-7xl font-black mb-4">
              Proyectos que redefinen<br />el estándar digital
            </h1>
            <p className="portfolio-lead-text mx-auto mt-4 max-w-2xl text-slate-400 text-lg">
              Arquitecturas escalables y diseño funcional. No solo construimos sitios,
              desarrollamos el motor tecnológico de tu empresa.
            </p>
          </header>
        </Container>
      </section>

      <Container className="pb-5 mt-[-40px] relative z-10">
        {/* --- STATS SECTION --- */}
        <Row className="text-center mb-5 g-4">
          {[
            { value: "+20", label: "Proyectos Live" },
            { value: "100%", label: "Eficiencia UX" },
            { value: "24/7", label: "Arquitectura" },
            { value: "+10", label: "Tecnologías" }
          ].map((stat, i) => (
            <Col xs={6} md={3} key={i}>
              <div className="stat-card glass-card">
                <h3 className="text-gradient font-bold text-3xl">{stat.value}</h3>
                <p className="text-slate-500 text-sm mb-0">{stat.label}</p>
              </div>
            </Col>
          ))}
        </Row>

        <h2 className="portfolio-section-divider d-flex align-items-center mb-5 text-2xl font-bold text-white">
          <FaCode className="me-3 text-blue-400" /> Desarrollo & Sistemas
        </h2>

        {/* --- GRID DE PROYECTOS --- */}
        <Row className="g-4">
          {PROJECTS_DATA.map((project, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="powa-project-card h-100 border-white/10 overflow-hidden group">
                <div className="project-img-wrapper">
                  <div className="project-tag absolute top-4 left-4 z-20">
                    {project.tag}
                  </div>

                  <div className="project-placeholder-icon text-5xl group-hover:scale-110 transition-transform duration-500">
                    {project.icon}
                  </div>
                  <div className="abstract-glow absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>

                  <div className="project-overlay absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                    <Button
                      variant="light"
                      className="rounded-full font-bold px-4 py-2"
                      onClick={() => project.galleryImages ? handleShowModal(project) : window.open(project.link, '_blank')}
                    >
                      {project.galleryImages ? "Ver Detalles" : "Visitar Sitio"}
                    </Button>
                  </div>
                </div>

                <Card.Body className="d-flex flex-column p-4">
                  <div className="tech-pills mb-3 d-flex flex-wrap gap-2">
                    {project.tech?.map((t, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-tighter">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Card.Title className="text-xl font-bold mb-2 text-white">{project.title}</Card.Title>

                  <Card.Text className="text-slate-400 text-sm flex-grow-1">
                    {project.description}
                  </Card.Text>

                  <div className="d-flex gap-2 mt-4">
                    <Button
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-powa-primary flex-grow-1"
                    >
                      Explorar Demo <FaExternalLinkAlt className="ms-2" size={12} />
                    </Button>

                    {project.galleryImages && (
                      <Button onClick={() => handleShowModal(project)} className="btn-powa-outline-glow">
                        <FaImages />
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* --- CTA BOX --- */}
        <div className="cta-minimal-box text-center mt-5 py-5">
          <h3 className="text-2xl font-bold mb-3 text-white">¿Tienes un desafío técnico?</h3>
          <p className="text-slate-500 mb-4">Construyamos la solución que tu negocio necesita.</p>

          {/* En Next.js moderno, el Link envuelve directamente el contenido o el componente */}
          <Link href="/contact" className="btn btn-powa-primary btn-lg px-5 inline-flex items-center justify-center decoration-none">
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