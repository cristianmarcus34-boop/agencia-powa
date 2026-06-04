'use client';

import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaLaptopCode, FaShoppingCart, FaTools, FaSearchDollar,
  FaLightbulb, FaMobileAlt, FaChevronDown, FaRocket, FaWhatsapp
} from 'react-icons/fa';
import Link from 'next/link';
import styles from './servicios.module.css';

interface ServiceData {
  icon: React.ReactNode;
  title: string;
  description: string;
  fullDescription: string;
  stack: string[];
}

interface ProcessStep {
  phase: string;
  title: string;
  desc: string;
}

interface ServiceCardProps {
  service: ServiceData;
  index: number;
}

const SERVICES_DATA: ServiceData[] = [
  {
    icon: <FaLaptopCode />,
    title: "Plataformas Web de Alta Conversión",
    description: "Sistemas ultra-rápidos que transforman visitas en clientes estables sin perder ventas.",
    fullDescription: "La lentitud mata el negocio. Desarrollamos con arquitectura Next.js y Supabase para garantizar cargas menores a 1 segundo. Cada milisegundo ganado reduce el abandono del carrito y escala de forma orgánica tu posicionamiento en Google (SEO), blindando tu embudo de ventas frente a la competencia.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Core Web Vitals"]
  },
  {
    icon: <FaMobileAlt />,
    title: "Desarrollo Mobile de Próxima Generation",
    description: "Aplicaciones nativas robustas y fluidas para fidelizar a tu audiencia en iOS y Android.",
    fullDescription: "Creamos experiencias mobile 100% nativas mediante Expo y React Native. Diseñamos sistemas con sincronización en tiempo real y persistencia de datos local (funcionamiento offline), asegurando que tus usuarios interactúen con tu marca de manera fluida, sin interrupciones ni pantallas colgadas.",
    stack: ["Expo Native", "React Native", "SQLite", "Real-time Sync"]
  },
  {
    icon: <FaShoppingCart />,
    title: "E-commerce de Rendimiento Masivo",
    description: "Infraestructura Headless diseñada para vender 24/7, incluso en picos de Hot Sale.",
    fullDescription: "Olvidate de las caídas de servidor y las plantillas lentas. Implementamos pasarelas avanzadas (MercadoPago / Stripe), automatización de stock en tiempo real y facturación directa. Diseñamos arquitecturas modulares preparadas para resistir campañas de tráfico masivo sin perder un solo centavo.",
    stack: ["MercadoPago / Stripe", "Headless Commerce", "Automation Pipelines"]
  },
  {
    icon: <FaSearchDollar />,
    title: "Ingeniería SEO & Captación Orgánica",
    description: "Estrategias de posicionamiento técnico para dominar las búsquedas donde está tu dinero.",
    fullDescription: "El SEO no es solo escribir blogs. Realizamos auditorías profundas de logs, estructuración de datos enriquecidos (Schema Markup) y optimización de arquitectura web para que los algoritmos de búsqueda te pongan arriba. Atraemos tráfico calificado directo a tu flujo de caja, disminuyendo tu dependencia de la pauta paga.",
    stack: ["Technical SEO", "Schema Markup", "Data Analytics", "Semrush"]
  },
  {
    icon: <FaTools />,
    title: "DevOps & Continuidad de Negocio",
    description: "Mantenimiento proactivo y monitoreo en la nube para que tu plataforma nunca se caiga.",
    fullDescription: "El software que no se monitorea es un riesgo financiero. Automatizamos el despliegue continuo (CI/CD) con Docker y Vercel, gestionando auditorías de seguridad constantes y copias de seguridad automáticas. Tu plataforma estará respaldada las 24 horas por ingeniería especializada para que te enfoques en crecer.",
    stack: ["Docker", "Vercel Enterprise", "CI/CD Git Automation"]
  },
  {
    icon: <FaLightbulb />,
    title: "Consultoría de Producto & MVP",
    description: "Validamos tus ideas de negocio con el menor riesgo técnico y financiero posible.",
    fullDescription: "Elegir el stack equivocado al inicio puede costar miles de dólares. Te guiamos en el modelado y lanzamiento de Productos Mínimos Viables (MVP) orientados a resultados de mercado rápidos. Diseñamos con escalabilidad modular: invertís exactamente lo que tu negocio necesita para validar y traccionar.",
    stack: ["MVP Architecture", "UI/UX Audit", "Cloud Cost Optimization"]
  }
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    phase: "01",
    title: "Discovery & Arquitectura",
    desc: "No tiramos una línea de código sin entender tu negocio. Auditamos tu infraestructura actual, modelamos la base de datos y definimos el stack tecnológico óptimo para mitigar riesgos financieros."
  },
  {
    phase: "02",
    title: "Desarrollo Modular & CI/CD",
    desc: "Trabajamos con metodologías ágiles y despliegue continuo. Implementamos pipelines automatizados (CI/CD): cada funcionalidad pasa por entornos de staging controlados antes de ir a producción."
  },
  {
    phase: "03",
    title: "QA & Pruebas de Carga",
    desc: "Sometemos la plataforma a auditorías de seguridad, pruebas de velocidad extremas y simulación de tráfico masivo. Nos aseguramos de que el sistema resista picos de usuarios sin degradar la experiencia."
  },
  {
    phase: "04",
    title: "Lanzamiento & Soporte Evolutivo",
    desc: "Desplegamos de forma transparente y sin interrupciones del servicio. Monitoreamos la salud de los servidores 24/7 y optimizamos la infraestructura de forma proactiva para acompañar tu crecimiento."
  }
];

const ServiceCardItem = ({ service, index }: ServiceCardProps) => {
  const { icon, title, description, fullDescription, stack } = service;
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
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
        <div className={styles.iconBox} aria-hidden="true">
          {icon}
        </div>

        <h3 className={styles.cardTitle}>{title}</h3>

        <div className={styles.descriptionContainer}>
          <p className={styles.cardDescription}>{description}</p>
          
          <div 
            id={`service-desc-${index}`}
            className={`${styles.expandableContent} ${isExpanded ? styles.visible : ''}`}
            aria-hidden={!isExpanded}
          >
            {/* El div interno es mandatorio para que la transición de CSS Grid funcione perfecto */}
            <div>
              <p className={styles.fullDescription}>{fullDescription}</p>
              <div className={styles.techStack}>
                {stack.map((tech) => (
                  <span key={tech} className={styles.techBadge}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.actionBtn}
          aria-expanded={isExpanded}
          aria-controls={`service-desc-${index}`}
        >
          <span>{isExpanded ? 'COLAPSAR' : 'EXPLORAR SOLUCIÓN'}</span>
          <FaChevronDown className={`${styles.iconChevron} ${isExpanded ? styles.rotate180 : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default function ServicesPage() {
  return (
    <main className={styles.servicesWrapper}>
      <Container>
        {/* HERO SECTION */}
        <header className="text-center mb-5">
          <span className={styles.badgePowa}>NUESTRO TOOLKIT TÉCNICO</span>
          <h1 className={styles.titleMain}>
            Ingeniería de <span className={styles.textGradient || 'text-gradient'}>Alto Impacto</span>
          </h1>
          <p className={styles.subtitle}>
            En Powa Digital, transformamos la complejidad técnica en 
            <strong> ventajas competitivas</strong> para tu modelo de negocio.
          </p>
        </header>

        {/* CARDS DE SERVICIOS */}
        <section aria-label="Nuestros Servicios Técnicos Extensivos" className="mb-5">
          <Row className="g-4">
            {SERVICES_DATA.map((service, index) => (
              <Col key={index} xs={12} md={6} lg={4}>
                <ServiceCardItem service={service} index={index} />
              </Col>
            ))}
          </Row>
        </section>

        {/* SECCIÓN: EL PROCESO TÉCNICO BLINDADO */}
        <section aria-label="Nuestro Proceso de Trabajo" className="my-5 pt-4">
          <div className="text-center mb-5">
            <span className={styles.badgePowa}>METODOLOGÍA SENIOR</span>
            <h2 className={styles.titleMain}>Cómo protegemos tu desarrollo</h2>
          </div>
          <Row className="g-4">
            {PROCESS_STEPS.map((step, index) => (
              <Col key={index} xs={12} sm={6} lg={3}>
                {/* Reutiliza dinámicamente la lógica del cardInner para mantener coherencia estética visual */}
                <div className={styles.serviceCard} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={styles.cardInner} style={{ padding: '30px 24px' }}>
                    <div className={styles.itemNumber || 'text-muted mb-2 fw-mono'} style={{ fontSize: '1.5rem', color: 'rgba(34, 211, 238, 0.4)', fontFamily: 'monospace' }}>
                      {step.phase}
                    </div>
                    <h4 className={styles.cardTitle} style={{ fontSize: '1.2rem' }}>{step.title}</h4>
                    <p className={styles.cardDescription} style={{ fontSize: '0.9rem', marginBottom: 0 }}>{step.desc}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* BANNER ESTRATÉGICO DE REDIRECCIÓN A FAQ */}
        <section className="my-5">
          <div className={styles.ctaGlass} style={{ padding: '50px 40px', textAlign: 'left' }}>
            <Row className="align-items-center g-4">
              <Col lg={8}>
                <h3 className={styles.cardTitle} style={{ fontSize: '1.6rem', marginBottom: '12px' }}>
                  ¿Tenés dudas sobre infraestructura, metodologías o presupuestos?
                </h3>
                <p className={styles.cardDescription} style={{ marginBottom: 0, maxWidth: '90%' }}>
                  Centralizamos todas las respuestas sobre propiedad del código, integraciones, tiempos de desarrollo y soporte en nuestro módulo de soporte técnico.
                </p>
              </Col>
              <Col lg={4} className="text-lg-end">
                <Link href="/faq" className={`text-decoration-none ${styles.btnPowaOutline}`}>
                  EXPLORAR PREGUNTAS FRECUENTES
                </Link>
              </Col>
            </Row>
          </div>
        </section>

        {/* SECTION CTA FINAL */}
        <section className={styles.footerCta} aria-label="Llamado a la acción">
          <div className={styles.ctaGlass}>
            <h2 className={styles.ctaTitle}>¿Listo para escalar tu infraestructura?</h2>
            <p className={styles.ctaText}>
              Agendemos una breve consultoría técnica para analizar los cuellos de botella de tu plataforma actual.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={`text-decoration-none ${styles.btnPowaMain}`}>
                INICIAR PROYECTO <FaRocket className="ms-2" />
              </Link>
              <a 
                href="https://wa.me/5491138305837" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`text-decoration-none ${styles.btnPowaOutline}`}
              >
                HABLAR POR WHATSAPP <FaWhatsapp className="ms-2" />
              </a>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}