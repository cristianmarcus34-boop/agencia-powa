'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Carousel, Image, Badge } from 'react-bootstrap';
import {
  FaExternalLinkAlt,
  FaTimes,
  FaGithub,
  FaCode,
  FaCalendarAlt,
  FaArrowRight,
  FaWhatsapp,
} from 'react-icons/fa';
import { SiDjango, SiPython, SiJavascript, SiBootstrap } from 'react-icons/si';
import { DiHtml5, DiCss3 } from 'react-icons/di';

interface ProjectModalProps {
  show: boolean;
  handleClose: () => void;
  project: {
    title: string;
    link: string;
    galleryImages: string[] | null;
    demoComponent?: React.ReactNode;
    description?: string;
    longDescription?: string;
    tag?: string;
    tech?: string[];
    year?: string;
    category?: string;
    github?: string;
  } | null;
}

const techIcons: { [key: string]: React.ReactNode } = {
  'Django': <SiDjango className="text-green-400" />,
  'Python': <SiPython className="text-blue-400" />,
  'HTML5': <DiHtml5 className="text-orange-500" />,
  'CSS3': <DiCss3 className="text-blue-500" />,
  'JavaScript': <SiJavascript className="text-yellow-400" />,
  'Bootstrap': <SiBootstrap className="text-purple-400" />,
  'Next.js': <FaCode className="text-white" />,
  'React': <FaCode className="text-cyan-400" />,
  'Vercel': <FaCode className="text-white" />,
  'Supabase': <FaCode className="text-green-400" />,
  'Tailwind': <FaCode className="text-cyan-400" />,
};

const categoryColors: { [key: string]: string } = {
  'Mobile': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'E-commerce': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Backend': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Dashboard': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Health': 'bg-green-500/20 text-green-400 border-green-500/30',
  'SaaS': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'Landing Page': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'General': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

const ProjectModal = ({ show, handleClose, project }: ProjectModalProps) => {
  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'info' | 'details'>('info');

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (show) {
      setIndex(0);
      setActiveTab('info');
    }
  }, [show]);

  if (!project) return null;

  const renderContent = () => {
    if (project.demoComponent) {
      return (
        <div className="flex items-center justify-center p-6 min-h-[400px] bg-slate-900/50">
          {project.demoComponent}
        </div>
      );
    }

    if (project.galleryImages && project.galleryImages.length > 0) {
      return (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          interval={5000}
          pause="hover"
          indicators={true}
          className="powa-carousel"
        >
          {project.galleryImages.map((imagePath, idx) => (
            <Carousel.Item key={idx}>
              <div className="powa-img-container flex items-center justify-center bg-slate-950 min-h-[400px]">
                <Image
                  src={imagePath}
                  alt={`${project.title} - ${idx + 1}`}
                  className="powa-modal-img max-h-[70vh] w-auto object-contain"
                />
              </div>
              <Carousel.Caption className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                <p className="text-sm text-white/80">
                  {project.title} - Vista {idx + 1}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      );
    }

    return (
      <div className="p-20 text-center text-slate-500 italic">
        No hay capturas disponibles para este proyecto.
      </div>
    );
  };

  const renderTech = () => {
    if (!project.tech || project.tech.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {project.tech.map((tech, idx) => (
          <Badge
            key={idx}
            className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 text-slate-300 font-normal flex items-center gap-2"
          >
            {techIcons[tech] || <FaCode className="text-slate-400" />}
            {tech}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
      contentClassName="powa-modal-content bg-slate-900 border-white/10"
      className="powa-modal"
    >
      {/* ===== HEADER ===== */}
      <Modal.Header className="powa-modal-header border-white/5 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Modal.Title className="text-gradient font-bold text-xl">
            {project.title}
          </Modal.Title>
          {project.tag && (
            <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1 text-xs font-medium">
              {project.tag}
            </Badge>
          )}
        </div>
        <button
          className="powa-close-btn bg-transparent border-0 text-slate-400 hover:text-white transition-colors text-2xl"
          onClick={handleClose}
          aria-label="Cerrar"
        >
          <FaTimes />
        </button>
      </Modal.Header>

      {/* ===== BODY ===== */}
      <Modal.Body className="powa-modal-body p-0 bg-black/20">
        {renderContent()}

        <div className="p-6 border-t border-white/5">
          {/* Tabs */}
          <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'info'
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              onClick={() => setActiveTab('info')}
            >
              Información
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'details'
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              onClick={() => setActiveTab('details')}
            >
              Detalles técnicos
            </button>
          </div>

          {activeTab === 'info' && (
            <div className="space-y-4">
              {project.description && (
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.description}
                </p>
              )}

              {project.longDescription && (
                <div className="mt-3 p-4 bg-slate-800/30 rounded-lg border border-white/5">
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                    {project.longDescription}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 mt-3 text-sm">
                {project.year && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <FaCalendarAlt className="text-cyan-400" />
                    <span>{project.year}</span>
                  </div>
                )}
                {project.category && (
                  <div className="flex items-center gap-2">
                    <Badge className={`${categoryColors[project.category] || categoryColors['General']} border px-3 py-1 text-xs font-medium`}>
                      {project.category}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Stack Tecnológico</h4>
                {renderTech()}
              </div>

              {project.title === 'Jardinería y Piscinas' && (
                <div className="mt-4 p-4 bg-cyan-500/5 rounded-lg border border-cyan-500/10">
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">✨ Características destacadas</h4>
                  <ul className="text-slate-400 text-sm space-y-1 list-disc list-inside">
                    <li>Diseño responsive y mobile-first</li>
                    <li>Galería interactiva con filtros por categoría</li>
                    <li>Formulario de pedido con validación en tiempo real</li>
                    <li>Efectos visuales premium (glassmorphism, microinteracciones)</li>
                    <li>Integración con WhatsApp para contacto directo</li>
                    <li>SEO optimizado y rendimiento con Django</li>
                    <li>Desplegado en Vercel con CI/CD</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal.Body>

      {/* ===== FOOTER ===== */}
      <Modal.Footer className="powa-modal-footer border-white/5 bg-slate-900/50 backdrop-blur-sm flex flex-wrap gap-3">
        <div className="flex-1 flex items-center gap-4">
          {!project.demoComponent && project.galleryImages && (
            <div className="powa-slide-counter text-slate-400 font-mono text-sm">
              {index + 1} <span className="opacity-50">/ {project.galleryImages.length}</span>
            </div>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <FaGithub size={20} />
            </a>
          )}
        </div>
        <div className="flex gap-2">
          {/* Botón Cerrar corregido */}
          <button
            className="px-4 py-2 bg-transparent border border-white/10 text-slate-300 font-bold rounded-lg hover:bg-white/5 hover:text-white transition-all"
            onClick={handleClose}
          >
            Cerrar
          </button>
          {/* Botón Visitar Proyecto (enlace externo con as="a") */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-all flex items-center gap-2 no-underline"
          >
            Visitar Proyecto <FaExternalLinkAlt size={14} />
          </a>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModal;