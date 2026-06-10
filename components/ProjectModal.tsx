'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Carousel, Image, Button } from 'react-bootstrap';
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

// Definimos qué espera este componente para que TS no se queje
interface ProjectModalProps {
  show: boolean;
  handleClose: () => void;
  project: {
    title: string;
    link: string;
    galleryImages: string[] | null;
    demoComponent?: React.ReactNode; // <-- Agregado para soportar los demos
  } | null;
}

const ProjectModal = ({ show, handleClose, project }: ProjectModalProps) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  // Resetear el carrusel al primer slide cada vez que se abre
  useEffect(() => {
    if (show) setIndex(0);
  }, [show]);

  if (!project) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
      contentClassName="powa-modal-content bg-slate-900 border-white/10"
    >
      <Modal.Header className="powa-modal-header border-white/5 bg-slate-900/50 backdrop-blur-md">
        <Modal.Title className="text-gradient font-bold">
          {project.title}
        </Modal.Title>
        <button
          className="powa-close-btn bg-transparent border-0 text-slate-400 hover:text-white transition-colors text-2xl"
          onClick={handleClose}
        >
          <FaTimes />
        </button>
      </Modal.Header>

      <Modal.Body className="powa-modal-body p-0 bg-black/20">
        {/* Lógica actualizada: Si es un demo, muestra el componente; si no, muestra la galería */}
        {project.demoComponent ? (
          <div className="flex items-center justify-center p-6 min-h-[400px]">
            {project.demoComponent}
          </div>
        ) : project.galleryImages && project.galleryImages.length > 0 ? (
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
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div className="p-20 text-center text-slate-500 italic">
            No hay capturas disponibles para este proyecto.
          </div>
        )}
      </Modal.Body>

      {/* El footer se mantiene, pero ocultamos el contador si estamos viendo un demo */}
      <Modal.Footer className="powa-modal-footer border-white/5 bg-slate-900/50">
        {!project.demoComponent && project.galleryImages && (
          <div className="powa-slide-counter text-slate-400 font-mono text-sm">
            {index + 1} <span className="opacity-50">/ {project.galleryImages.length}</span>
          </div>
        )}
        <Button
          className="btn-powa-primary border-0 px-4 py-2 font-bold"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visitar Proyecto <FaExternalLinkAlt className="ms-2" size={14} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModal;