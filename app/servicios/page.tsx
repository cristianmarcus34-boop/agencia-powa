'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaLaptopCode, FaShoppingCart, FaTools, FaSearchDollar,
  FaLightbulb, FaMobileAlt, FaChevronDown, FaRocket, FaWhatsapp
} from 'react-icons/fa';
import Link from 'next/link';
import styles from './servicios.module.css';

// --- TIPADO ---
interface ServiceData {
  icon: React.ReactNode;
  title: string;
  description: string;
  fullDescription: string;
  stack: string[];
}

interface ServiceCardProps extends ServiceData {
  index: number;
}

// --- TARJETA CON EFECTO SPOTLIGHT REFINADO ---
const ServiceCardItem = ({ icon, title, description, fullDescription, stack, index }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Seteamos las variables directamente en el estilo para evitar re-renders de React
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={styles.serviceCard}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.cardInner}>
        <div className={styles.iconBox}>
          {icon}
        </div>

        <h3 className={styles.cardTitle}>{title}</h3>

        <div className={styles.descriptionContainer}>
          <p className={styles.cardDescription}>{description}</p>
          
          <div className={`${styles.expandableContent} ${isExpanded ? styles.visible : ''}`}>
            <p className={styles.fullDescription}>{fullDescription}</p>
            <div className={styles.techStack}>
              {stack.map((tech) => (
                <span key={tech} className={styles.techBadge}>{tech}</span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.actionBtn}
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'COLAPSAR' : 'EXPLORAR SOLUCIÓN'}</span>
          <FaChevronDown className={`${styles.iconChevron} ${isExpanded ? styles.rotate180 : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default function ServicesPage() {
  const services: ServiceData[] = useMemo(() => [
    {
      icon: <FaLaptopCode />,
      title: "Sistemas Web Escalables",
      description: "Arquitecturas modernas diseñadas para el alto rendimiento y SEO.",
      fullDescription: "Implementamos arquitecturas desacopladas con Next.js y Supabase. Nos enfocamos en Core Web Vitals y seguridad SSR para garantizar tiempos de carga menores a 1s.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"]
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Architecture",
      description: "Apps nativas y cross-platform con experiencias de usuario fluidas.",
      fullDescription: "Desarrollo con React Native / Expo o Kotlin Nativo. Gestión de estado compleja, persistencia de datos local y sincronización en tiempo real.",
      stack: ["Expo", "React Native", "SQLite", "Firebase"]
    },
    {
      icon: <FaShoppingCart />,
      title: "E-commerce Engine",
      description: "Infraestructura robusta para procesar ventas masivas sin fricción.",
      fullDescription: "Automatización de inventario, integración avanzada con pasarelas de pago y sistemas de facturación automática. Escalabilidad garantizada en eventos de alto tráfico.",
      stack: ["Stripe", "MercadoPago", "Headless CMS"]
    },
    {
      icon: <FaSearchDollar />,
      title: "Data & Growth SEO",
      description: "Estrategias basadas en datos para dominar los resultados de búsqueda.",
      fullDescription: "No solo keywords. Hacemos SEO técnico, auditoría de logs, schema markup avanzado y optimización de arquitectura de información.",
      stack: ["Search Console", "Analytics", "Semrush"]
    },
    {
      icon: <FaTools />,
      title: "DevOps & Soporte",
      description: "Mantenimiento proactivo y despliegue continuo (CI/CD).",
      fullDescription: "Configuración de pipelines, Dockerización de servicios y monitoreo de salud del servidor 24/7. Tu código siempre actualizado y seguro.",
      stack: ["Docker", "Vercel", "GitHub Actions"]
    },
    {
      icon: <FaLightbulb />,
      title: "Consultoría Estratégica",
      description: "Transformamos ideas en productos mínimos viables (MVP) rentables.",
      fullDescription: "Asesoramiento en la elección del stack tecnológico y modelado de procesos de negocio para maximizar el ROI de tu inversión digital.",
      stack: ["MVP Strategy", "UI/UX Audit", "Cloud Infra"]
    }
  ], []);

  return (
    <div className={styles.servicesWrapper}>
      <Container>
        <header className="text-center mb-5 animate-fade-in">
          <span className={styles.badgePowa}>NUESTRO TOOLKIT TÉCNICO</span>
          <h1 className={styles.titleMain}>
            Ingeniería de <span className="text-gradient">Alto Impacto</span>
          </h1>
          <p className={styles.subtitle}>
            En Powa Digital, transformamos la complejidad técnica en 
            <strong> ventajas competitivas</strong> para tu modelo de negocio.
          </p>
        </header>

        <Row className="g-4">
          {services.map((service, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <ServiceCardItem {...service} index={index} />
            </Col>
          ))}
        </Row>

        <div className={styles.footerCta}>
          <div className={styles.ctaGlass}>
            <h2 className={styles.ctaTitle}>¿Listo para escalar tu infraestructura?</h2>
            <p className={styles.ctaText}>
              Agendemos una breve consultoría técnica para analizar los cuellos de botella de tu plataforma actual.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={styles.btnPowaMain}>
                INICIAR PROYECTO <FaRocket className="ms-2" />
              </Link>
              <a href="https://wa.me/5491138305837" target="_blank" rel="noopener noreferrer" className={styles.btnPowaOutline}>
                HABLAR POR WHATSAPP <FaWhatsapp className="ms-2" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}