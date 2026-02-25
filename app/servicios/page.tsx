'use client';

import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaLaptopCode, FaShoppingCart, FaTools, FaSearchDollar,
  FaLightbulb, FaMobileAlt, FaChevronDown, FaRocket, FaWhatsapp
} from 'react-icons/fa';
import Link from 'next/link';
import styles from './servicios.module.css';

// --- TIPADO ---
interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  fullDescription: string;
  index: number;
}

// --- TARJETA CON EFECTO SPOTLIGHT ---
const ServiceCardItem = ({ icon, title, description, fullDescription, index }: ServiceProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={styles.serviceCard}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.iconBox}>
        {icon}
      </div>

      <h3 className={styles.cardTitle}>{title}</h3>

      <div className={styles.descriptionContainer}>
        <p className={styles.cardDescription}>
          {description}
        </p>
        <div className={`${styles.fullDescription} ${isExpanded ? styles.visible : ''}`}>
          <p>{fullDescription}</p>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.actionBtn}
      >
        <span>{isExpanded ? 'VER MENOS' : 'DESCUBRIR MÁS'}</span>
        <FaChevronDown className={`${styles.iconChevron} ${isExpanded ? styles.rotate180 : ''} ms-2`} />
      </button>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---
export default function ServicesPage() {
  const services = [
    {
      icon: <FaLaptopCode />,
      title: "Desarrollo Web Pro",
      description: "Aplicaciones a medida con arquitectura escalable y alto rendimiento.",
      fullDescription: "Especialistas en Next.js y React. Creamos plataformas diseñadas para soportar miles de usuarios con seguridad de nivel bancario."
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile & UX/UI",
      description: "Diseños que enamoran a primera vista y funcionan en cualquier pantalla.",
      fullDescription: "Optimizamos el Customer Journey para maximizar conversiones utilizando prototipado avanzado en Figma."
    },
    {
      icon: <FaShoppingCart />,
      title: "E-commerce Elite",
      description: "Tiendas online diseñadas para vender masivamente sin fricciones.",
      fullDescription: "Integraciones con pasarelas de pago y automatización de stock. Tu tienda será una máquina de ventas 24/7."
    },
    {
      icon: <FaSearchDollar />,
      title: "Crecimiento SEO",
      description: "Posicionamos tu marca donde tus clientes buscan: la cima de Google.",
      fullDescription: "SEO técnico profundo y optimización de Core Web Vitals para tráfico orgánico sostenible."
    },
    {
      icon: <FaTools />,
      title: "Soporte Continuo",
      description: "Mantenimiento proactivo para que nunca sufras caídas de sistema.",
      fullDescription: "Monitoreo 24/7, backups automáticos y actualizaciones de seguridad constantes."
    },
    {
      icon: <FaLightbulb />,
      title: "Consultoría IT",
      description: "Transformamos tu modelo de negocio con tecnología de vanguardia.",
      fullDescription: "Analizamos procesos para implementar IA y automatizaciones que reduzcan costos y aumenten márgenes."
    }
  ];

  return (
    <div className={styles.servicesWrapper}>
      <Container>
        <header className="text-center mb-5">
          <span className={styles.badgePowa}>
            NUESTRO TOOLKIT
          </span>
          <h1 className={styles.titleMain}>
            Soluciones de <span className="text-gradient">Alto Impacto</span>
          </h1>
          <p className={styles.subtitle}>
            En Powa Digital, tu proyecto no es un gasto, es una <strong>inversión estratégica</strong> enfocada al ROI y la eficiencia operativa.
          </p>
        </header>

        <Row className="g-4">
          {services.map((service, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <ServiceCardItem
                icon={service.icon}
                title={service.title}
                description={service.description}
                fullDescription={service.fullDescription}
                index={index}
              />
            </Col>
          ))}
        </Row>

        {/* --- CTA FINAL --- */}
        <div className={styles.footerCta}>
          <div className={styles.ctaContentWrapper}>
            <h2 className={styles.ctaTitle}>¿Listo para escalar tu infraestructura digital?</h2>
            <p className={styles.ctaText}>
              No dejes tu crecimiento al azar. Combinamos diseño de vanguardia con
              arquitectura técnica sólida para potenciar tu negocio.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={styles.btnPowaMain}>
                INICIAR PROYECTO <FaRocket className="ms-2" />
              </Link>
              <a href="https://wa.me/5491138305837" target="_blank" rel="noopener noreferrer" className={styles.btnPowaOutline}>
                WHATSAPP <FaWhatsapp className="ms-2" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}