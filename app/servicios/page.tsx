'use client';

import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaLaptopCode, FaShoppingCart, FaTools, FaSearchDollar,
  FaLightbulb, FaMobileAlt, FaChevronDown, FaRocket, FaWhatsapp,
  FaShieldAlt, FaClock, FaCheckCircle, FaStar, FaAward,
  FaHandshake, FaCloudUploadAlt, FaBrain, FaChartLine
} from 'react-icons/fa';
import Link from 'next/link';
import styles from './servicios.module.css';

interface ServiceData {
  icon: React.ReactNode;
  title: string;
  description: string;
  fullDescription: string;
  stack: string[];
  benefits: string[];
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
    fullDescription: "La lentitud mata el negocio. Desarrollamos con arquitectura Next.js y Supabase para garantizar cargas menores a 1 segundo. Cada milisegundo ganado reduce el abandono del carrito y escala de forma orgánica tu posicionamiento en Google (SEO), blindando tu embudo de ventas frente a la competencia. Nuestras plataformas están diseñadas para soportar picos de tráfico sin degradar la experiencia del usuario.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Core Web Vitals"],
    benefits: [
      "🚀 Carga en < 1 segundo",
      "📈 SEO optimizado para Google",
      "🛡️ Escalable para tráfico masivo",
      "💻 Experiencia desktop y mobile"
    ]
  },
  {
    icon: <FaMobileAlt />,
    title: "Desarrollo Mobile de Próxima Generación",
    description: "Aplicaciones nativas robustas y fluidas para fidelizar a tu audiencia en iOS y Android.",
    fullDescription: "Creamos experiencias mobile 100% nativas mediante Expo y React Native. Diseñamos sistemas con sincronización en tiempo real y persistencia de datos local (funcionamiento offline), asegurando que tus usuarios interactúen con tu marca de manera fluida, sin interrupciones ni pantallas colgadas. Ideal para apps de delivery, e-commerce y servicios on-demand.",
    stack: ["Expo Native", "React Native", "SQLite", "Real-time Sync"],
    benefits: [
      "📱 Funciona offline sin interrupciones",
      "🔄 Sincronización en tiempo real",
      "📦 Apps ligeras y optimizadas",
      "🔐 Seguridad de datos en dispositivo"
    ]
  },
  {
    icon: <FaShoppingCart />,
    title: "E-commerce de Rendimiento Masivo",
    description: "Infraestructura Headless diseñada para vender 24/7, incluso en picos de Hot Sale.",
    fullDescription: "Olvidate de las caídas de servidor y las plantillas lentas. Implementamos pasarelas avanzadas (MercadoPago / Stripe), automatización de stock en tiempo real y facturación directa. Diseñamos arquitecturas modulares preparadas para resistir campañas de tráfico masivo sin perder un solo centavo. Gestión de inventario, envíos y analytics todo en un solo ecosistema.",
    stack: ["MercadoPago / Stripe", "Headless Commerce", "Automation Pipelines"],
    benefits: [
      "💳 Pasarelas de pago integradas",
      "📦 Stock en tiempo real",
      "📊 Analytics de conversión",
      "🚀 Resiste picos de tráfico"
    ]
  },
  {
    icon: <FaSearchDollar />,
    title: "Ingeniería SEO & Captación Orgánica",
    description: "Estrategias de posicionamiento técnico para dominar las búsquedas donde está tu dinero.",
    fullDescription: "El SEO no es solo escribir blogs. Realizamos auditorías profundas de logs, estructuración de datos enriquecidos (Schema Markup) y optimización de arquitectura web para que los algoritmos de búsqueda te pongan arriba. Atraemos tráfico calificado directo a tu flujo de caja, disminuyendo tu dependencia de la pauta paga. Monitoreo constante de posicionamiento y ajustes estratégicos.",
    stack: ["Technical SEO", "Schema Markup", "Data Analytics", "Semrush"],
    benefits: [
      "📊 Auditoría SEO completa",
      "🔍 Posicionamiento en primeras posiciones",
      "📈 Reducción de costo por adquisición",
      "📅 Reportes mensuales de avance"
    ]
  },
  {
    icon: <FaTools />,
    title: "DevOps & Continuidad de Negocio",
    description: "Mantenimiento proactivo y monitoreo en la nube para que tu plataforma nunca se caiga.",
    fullDescription: "El software que no se monitorea es un riesgo financiero. Automatizamos el despliegue continuo (CI/CD) con Docker y Vercel, gestionando auditorías de seguridad constantes y copias de seguridad automáticas. Tu plataforma estará respaldada las 24 horas por ingeniería especializada para que te enfoques en crecer. SLA de disponibilidad 99.9%.",
    stack: ["Docker", "Vercel Enterprise", "CI/CD Git Automation"],
    benefits: [
      "⚡ Deploy automatizado",
      "🛡️ Auditorías de seguridad constantes",
      "📦 Copias de seguridad automáticas",
      "📊 Monitoreo 24/7"
    ]
  },
  {
    icon: <FaLightbulb />,
    title: "Consultoría de Producto & MVP",
    description: "Validamos tus ideas de negocio con el menor riesgo técnico y financiero posible.",
    fullDescription: "Elegir el stack equivocado al inicio puede costar miles de dólares. Te guiamos en el modelado y lanzamiento de Productos Mínimos Viables (MVP) orientados a resultados de mercado rápidos. Diseñamos con escalabilidad modular: invertís exactamente lo que tu negocio necesita para validar y traccionar. Acompañamiento post-lanzamiento para iterar basado en feedback real.",
    stack: ["MVP Architecture", "UI/UX Audit", "Cloud Cost Optimization"],
    benefits: [
      "🧪 Validación de mercado rápida",
      "💰 Inversión ajustada a objetivos",
      "📊 Feedback de usuarios reales",
      "🔄 Iteración continua"
    ]
  },
  // ============================================================ //
  // 🚀 NUEVOS SERVICIOS PARA EMPRENDEDORES
  // ============================================================ //
  {
    icon: <FaRocket />,
    title: "Lanzamiento de Micro-SaaS",
    description: "Desarrollamos tu software como servicio para que puedas facturar mensualmente sin inversión inicial.",
    fullDescription: "Creamos herramientas digitales que se pagan por suscripción mensual. Así generás ingresos recurrentes sin necesidad de stock, logística ni grandes inversiones. Te ayudamos a identificar oportunidades en tu nicho y desarrollamos un MVP funcional en 4 a 6 semanas.",
    stack: ["Next.js", "Supabase", "Stripe", "MVP en 4-6 semanas"],
    benefits: [
      "🚀 MVP en 4-6 semanas",
      "💰 Ingresos recurrentes",
      "📈 Escalable desde el día 1",
      "🔄 Suscripción mensual"
    ]
  },
  {
    icon: <FaCloudUploadAlt />,
    title: "Automatización de Procesos",
    description: "Conectamos tus herramientas para que trabajen solas y ahorres horas de trabajo manual.",
    fullDescription: "Tu negocio usa múltiples herramientas (WhatsApp, Google Sheets, CRMs, sistemas de stock) pero no se comunican entre sí. Nosotros las integramos y automatizamos flujos completos de trabajo. Así eliminamos tareas repetitivas, reducimos errores y liberamos tu tiempo para lo que realmente importa.",
    stack: ["Node.js", "APIs", "Webhooks", "Automatización"],
    benefits: [
      "🤖 Procesos automatizados",
      "🔗 Integración con tus herramientas",
      "📊 Dashboard de control",
      "💸 Ahorro de tiempo y dinero"
    ]
  },
  {
    icon: <FaBrain />,
    title: "Productos Digitales Rentables",
    description: "Creamos activos digitales que generan ingresos sin esfuerzo adicional. Vos diseñás, nosotros lo construimos.",
    fullDescription: "Convertimos tu conocimiento en un producto digital que podés vender sin necesidad de stock ni logística. Desde plantillas especializadas hasta sistemas completos, creamos activos digitales que generan ingresos pasivos. El producto es 100% tuyo y podés comercializarlo sin depender de nosotros.",
    stack: ["Next.js", "Tailwind CSS", "UI/UX", "Vercel"],
    benefits: [
      "💼 Tu producto, tu propiedad",
      "🔄 Ingresos pasivos",
      "📦 Sin stock ni logística",
      "📈 Escalable sin esfuerzo"
    ]
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
  const { icon, title, description, fullDescription, stack, benefits } = service;
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
      className={`${styles.serviceCard} ${isExpanded ? styles.expanded : ''}`}
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
            <div>
              <p className={styles.fullDescription}>{fullDescription}</p>

              {/* Beneficios destacados */}
              <div className={styles.benefitsList}>
                {benefits.map((benefit, idx) => (
                  <span key={idx} className={styles.benefitItem}>
                    {benefit}
                  </span>
                ))}
              </div>

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
  // Stats de impacto
  const impactStats = [
    { value: "99.9%", label: "Uptime Garantizado", icon: <FaClock /> },
    { value: "<1s", label: "Tiempo de Carga", icon: <FaRocket /> },
    { value: "24+", label: "Proyectos Entregados", icon: <FaAward /> },
    { value: "100%", label: "Propiedad Intelectual", icon: <FaShieldAlt /> }
  ];

  return (
    <main className={styles.servicesWrapper}>
      <Container>
        {/* ===== HERO SECTION ===== */}
        <header className="text-center mb-5">
          <span className={styles.badgePowa}>NUESTRO TOOLKIT TÉCNICO</span>
          <h1 className={styles.titleMain}>
            Ingeniería de <span className={styles.textGradient}>Alto Impacto</span>
          </h1>
          <p className={styles.subtitle}>
            En Powa Digital, transformamos la complejidad técnica en
            <strong> ventajas competitivas</strong> para tu modelo de negocio.
          </p>
        </header>

        {/* ===== STATS DE IMPACTO ===== */}
        <Row className="g-4 mb-5">
          {impactStats.map((stat, index) => (
            <Col key={index} xs={6} md={3}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </Col>
          ))}
        </Row>

        {/* ===== CARDS DE SERVICIOS ===== */}
        <section aria-label="Nuestros Servicios Técnicos Extensivos" className="mb-5">
          <div className={styles.sectionDivider}>
            <FaStar className={styles.dividerIcon} />
            <span>DESARROLLOS DE SOLUCIONES TÉCNICAS PREMIUM</span>
            <FaStar className={styles.dividerIcon} />
          </div>
          <Row className="g-4">
            {SERVICES_DATA.map((service, index) => (
              <Col key={index} xs={12} md={6} lg={4}>
                <ServiceCardItem service={service} index={index} />
              </Col>
            ))}
          </Row>
        </section>

        {/* ===== SECCIÓN: EL PROCESO TÉCNICO BLINDADO ===== */}
        <section aria-label="Nuestro Proceso de Trabajo" className="my-5 pt-4">
          <div className="text-center mb-5">
            <span className={styles.badgePowa}>METODOLOGÍA SENIOR</span>
            <h2 className={styles.titleMain}>Cómo protegemos <span className={styles.textGradient}>tu desarrollo</span></h2>
            <p className={styles.subtitle} style={{ marginBottom: 0 }}>
              Un proceso transparente que elimina la incertidumbre y garantiza resultados.
            </p>
          </div>
          <Row className="g-4">
            {PROCESS_STEPS.map((step, index) => (
              <Col key={index} xs={12} sm={6} lg={3}>
                <div className={`${styles.processCard}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={styles.processNumber}>{step.phase}</div>
                  <div className={styles.processIconWrapper}>
                    {index === 0 && <FaSearchDollar />}
                    {index === 1 && <FaCloudUploadAlt />}
                    {index === 2 && <FaShieldAlt />}
                    {index === 3 && <FaRocket />}
                  </div>
                  <h4 className={styles.processTitle}>{step.title}</h4>
                  <p className={styles.processDesc}>{step.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* ===== SECCIÓN: ¿POR QUÉ ELEGIRNOS? ===== */}
        <section className="my-5">
          <div className={styles.whyUsSection}>
            <Row className="align-items-center g-4">
              <Col lg={6}>
                <span className={styles.badgePowa}>VENTAJAS COMPETITIVAS</span>
                <h2 className={styles.titleMain} style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                  ¿Por qué <span className={styles.textGradient}>Powa</span>?
                </h2>
                <div className={styles.whyUsList}>
                  <div className={styles.whyUsItem}>
                    <FaCheckCircle className={styles.whyUsIcon} />
                    <div>
                      <h4>Arquitectura Escalable</h4>
                      <p>Diseñamos sistemas que crecen con tu negocio, sin necesidad de reescribir código.</p>
                    </div>
                  </div>
                  <div className={styles.whyUsItem}>
                    <FaCheckCircle className={styles.whyUsIcon} />
                    <div>
                      <h4>Propiedad Intelectual 100%</h4>
                      <p>El código es tuyo. No hay dependencia tecnológica ni contratos de permanencia.</p>
                    </div>
                  </div>
                  <div className={styles.whyUsItem}>
                    <FaCheckCircle className={styles.whyUsIcon} />
                    <div>
                      <h4>Entregas Parciales</h4>
                      <p>Ves resultados cada 15 días. No esperas al final del proyecto para validar.</p>
                    </div>
                  </div>
                  <div className={styles.whyUsItem}>
                    <FaCheckCircle className={styles.whyUsIcon} />
                    <div>
                      <h4>Soporte 24/7</h4>
                      <p>Tu plataforma monitoreada constantemente con respuesta garantizada en SLA.</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.whyUsVisual}>
                  <div className={styles.whyUsBadge}>
                    <FaAward className={styles.whyUsBadgeIcon} />
                    <div>
                      <strong>15+ años</strong>
                      <span>de experiencia en software</span>
                    </div>
                  </div>
                  <div className={styles.whyUsBadge}>
                    <FaHandshake className={styles.whyUsBadgeIcon} />
                    <div>
                      <strong>24+</strong>
                      <span>clientes satisfechos</span>
                    </div>
                  </div>
                  <div className={styles.whyUsBadge}>
                    <FaBrain className={styles.whyUsBadgeIcon} />
                    <div>
                      <strong>24+</strong>
                      <span>proyectos entregados</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* ===== BANNER ESTRATÉGICO DE REDIRECCIÓN A FAQ ===== */}
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

        {/* ===== SECTION CTA FINAL ===== */}
        <section className={styles.footerCta} aria-label="Llamado a la acción">
          <div className={styles.ctaGlass}>
            <div className={styles.ctaGlow} />
            <h2 className={styles.ctaTitle}>¿Listo para escalar tu <span className={styles.textGradient}>infraestructura</span>?</h2>
            <p className={styles.ctaText}>
              Agendemos una breve consultoría técnica para analizar los cuellos de botella de tu plataforma actual.
            </p>
            <div className={styles.ctaTrustBadges}>
              <span>🔒 Sin compromiso</span>
              <span>⚡ Respuesta en 24hs</span>
              <span>📋 Diagnóstico gratuito</span>
            </div>
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