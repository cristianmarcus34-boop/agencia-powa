'use client';

import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaLaptopCode, FaShoppingCart, FaTools, FaSearchDollar,
  FaLightbulb, FaMobileAlt, FaChevronDown, FaRocket, FaWhatsapp,
  FaShieldAlt, FaClock, FaCheckCircle, FaStar, FaAward,
  FaHandshake, FaCloudUploadAlt, FaBrain
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
    title: "Desarrollo de Plataformas Web",
    description: "Creamos la web o el sistema que necesitan tus clientes y tu equipo, con funciones definidas antes de empezar.",
    fullDescription: "Diseñamos y desarrollamos con tecnologías acordes al producto. Acordamos qué páginas y dispositivos medir, qué objetivos de rendimiento perseguir y qué SEO técnico incluir. Las métricas dependen también del hosting, el contenido, las integraciones y los servicios externos; por eso se definen según el contexto del proyecto.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Core Web Vitals"],
    benefits: [
      "⚡ Rendimiento medido en páginas y dispositivos acordados",
      "🔎 SEO técnico detallado en la propuesta",
      "📊 Arquitectura dimensionada al uso previsto",
      "📱 Interfaz adaptable a desktop y mobile"
    ]
  },
  {
    icon: <FaMobileAlt />,
    title: "Aplicaciones móviles a medida",
    description: "Apps para que tus clientes o tu equipo resuelvan tareas desde iPhone y Android, con las funciones que tu operación necesita.",
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
    title: "Tienda online e integraciones",
    description: "Mostrá productos, recibí pagos y organizá pedidos y envíos desde una tienda adaptada a tu negocio.",
    fullDescription: "Integramos medios de pago, catálogo, inventario, envíos y medición según las herramientas y reglas que use tu negocio. Antes de implementar se definen los flujos, integraciones, volumen esperado y escenarios de prueba. La capacidad y disponibilidad dependen de la plataforma, la infraestructura y los proveedores elegidos.",
    stack: ["MercadoPago / Stripe", "Headless Commerce", "Automation Pipelines"],
    benefits: [
      "💳 Medio de pago acordado en el alcance",
      "📦 Flujo de inventario y pedidos definido",
      "📊 Eventos de medición especificados",
      "🧪 Pruebas con escenarios de carga acordados"
    ]
  },
  {
    icon: <FaSearchDollar />,
    title: "Mejoras para buscadores (SEO)",
    description: "Preparamos la estructura del sitio para que Google entienda su contenido; no se puede garantizar una posición.",
    fullDescription: "Revisamos arquitectura, indexabilidad, metadatos, datos estructurados y señales técnicas según el alcance acordado. Entregamos hallazgos y prioridades de mejora; el posicionamiento depende también del contenido, la competencia, la autoridad del dominio y los cambios de los buscadores, por lo que no se garantiza una posición ni un volumen de tráfico.",
    stack: ["Technical SEO", "Schema Markup", "Data Analytics", "Semrush"],
    benefits: [
      "📊 Auditoría técnica con hallazgos priorizados",
      "🧭 Recomendaciones de arquitectura e indexabilidad",
      "🧩 Metadatos y datos estructurados según alcance",
      "📅 Seguimiento de métricas acordadas"
    ]
  },
  {
    icon: <FaTools />,
    title: "Mantenimiento y operación de plataformas",
    description: "Actualizaciones, copias de seguridad, alertas y monitoreo según el plan; soporte humano y tiempos se acuerdan por escrito.",
    fullDescription: "Configuramos despliegues, registros, alertas y respaldos según la arquitectura del sistema y el plan contratado. La frecuencia de revisión, los tiempos de respuesta, las ventanas de mantenimiento y los objetivos de disponibilidad se definen por escrito en el alcance o SLA correspondiente.",
    stack: ["Docker", "Vercel Enterprise", "CI/CD Git Automation"],
    benefits: [
      "⚡ Deploy automatizado",
      "🛡️ Revisiones de seguridad según el plan acordado",
      "📦 Frecuencia de respaldos documentada",
      "📊 Monitoreo, alertas y respuesta según SLA"
    ]
  },
  {
    icon: <FaLightbulb />,
    title: "Consultoría de producto y primera versión (MVP)",
    description: "Priorizamos qué construir primero para probar una idea con usuarios antes de ampliar la inversión.",
    fullDescription: "Definimos una primera versión funcional (MVP), sus funciones prioritarias y cómo recoger comentarios de usuarios. El alcance, los supuestos a validar y las siguientes etapas se detallan antes de desarrollar.",
    stack: ["MVP Architecture", "UI/UX Audit", "Cloud Cost Optimization"],
    benefits: [
      "🧪 Validación de mercado rápida",
      "💰 Inversión ajustada a objetivos",
      "📊 Feedback de usuarios reales",
      "🔄 Iteración continua"
    ]
  },
  {
    icon: <FaRocket />,
    title: "Software por suscripción",
    description: "Creamos un servicio digital que podés ofrecer mediante un abono, con funciones y costos operativos definidos para el proyecto.",
    fullDescription: "Diseñamos una primera versión funcional, el acceso de usuarios y el flujo de suscripción. Los medios de cobro, las comisiones, el alojamiento y el soporte se revisan antes de estimar inversión y fechas.",
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
    title: "Automatización de tareas",
    description: "Conectamos las herramientas que ya usás para reducir trabajo repetitivo, como copiar pedidos o enviar avisos.",
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
    title: "Productos digitales propios",
    description: "Convertimos un servicio o conocimiento en un recurso digital para ofrecer online, como un curso, una herramienta o una plataforma.",
    fullDescription: "Definimos el formato, las funciones, el contenido y la forma de acceso según el producto. La propuesta especifica qué se desarrolla, qué materiales aporta el cliente y qué costos externos pueden aplicar.",
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
    desc: "Definimos escenarios de prueba de rendimiento y seguridad según el uso previsto. Registramos resultados y hallazgos; la capacidad final depende de la infraestructura, las integraciones y el volumen acordado."
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
              <span className={styles.detailSectionLabel}>DETALLE DE IMPLEMENTACIÓN</span>
              <p className={styles.fullDescription}>{fullDescription}</p>

              <div className={styles.benefitsList}>
                {benefits.map((benefit, idx) => (
                  <span key={idx} className={styles.benefitItem}>
                    {benefit}
                  </span>
                ))}
              </div>

              <span className={styles.detailSectionLabel}>TECNOLOGÍAS POSIBLES SEGÚN EL PROYECTO</span>
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
          <span>{isExpanded ? 'MENOS DETALLES' : 'VER MÁS'}</span>
          <FaChevronDown className={`${styles.iconChevron} ${isExpanded ? styles.rotate180 : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default function ServicesPage() {
  const trustSignals = [
    { text: "✅ Código 100% tuyo", icon: <FaShieldAlt /> },
    { text: "✅ Entregas cada 15 días", icon: <FaClock /> },
    { text: "✅ Sin dependencia tecnológica", icon: <FaHandshake /> },
    { text: "✅ Soporte post-lanzamiento", icon: <FaRocket /> }
  ];

  const faqTrust = [
    { q: "¿El código es mío al finalizar?", a: "Sí. Te entregamos el repositorio completo con toda la propiedad intelectual. No quedás atado a nosotros." },
    { q: "¿Puedo ver avances durante el desarrollo?", a: "Sí. Hacemos entregas parciales cada 15 días para que veas el progreso y puedas hacer ajustes a tiempo." },
    { q: "¿Qué pasa si necesito cambios después del lanzamiento?", a: "Ofrecemos planes de mantenimiento flexibles. También te capacitamos para que puedas hacer cambios simples vos mismo." },
    { q: "No tengo mucho presupuesto, ¿pueden ayudarme?", a: "Sí. Trabajamos con pagos escalonados y priorizamos features para que puedas lanzar con lo esencial y crecer después." }
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

        {/* ===== TRUST SIGNALS ===== */}
        <Row className="g-3 mb-5">
          {trustSignals.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <div className={styles.trustSignalCard}>
                <div className={styles.trustSignalIcon}>{item.icon}</div>
                <div className={styles.trustSignalText}>{item.text}</div>
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

        {/* ===== SECCIÓN: PARA QUIÉN ES POWA ===== */}
        <section className="my-5">
          <div className="text-center mb-4">
            <span className={styles.badgePowa}>A QUIÉNES AYUDAMOS</span>
            <h2 className={styles.titleMain}>
              ¿Tu negocio encaja con <span className={styles.textGradient}>POWA</span>?
            </h2>
            <p className={styles.subtitle} style={{ marginBottom: 0 }}>
              Trabajamos con personas y empresas que necesitan tecnología para crecer.
            </p>
          </div>
          <Row className="g-4">
            <Col md={4}>
              <div className={styles.audienceCard}>
                <div className={styles.audienceIcon}>🚀</div>
                <h3 className={styles.audienceTitle}>Emprendedores</h3>
                <p className={styles.audienceDesc}>
                  Tenés una idea y necesitás validarla con un MVP profesional, sin gastar una fortuna ni perder tiempo en tecnología.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className={styles.audienceCard}>
                <div className={styles.audienceIcon}>🏢</div>
                <h3 className={styles.audienceTitle}>Empresas con web obsoleta</h3>
                <p className={styles.audienceDesc}>
                  Tu sitio actual es lento, no convierte o no se ve bien en celular. Necesitás un upgrade urgente para no perder ventas.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className={styles.audienceCard}>
                <div className={styles.audienceIcon}>🛒</div>
                <h3 className={styles.audienceTitle}>Negocios que quieren vender online</h3>
                <p className={styles.audienceDesc}>
                  Ya tenés clientes, pero querés escalar con un e-commerce o plataforma de servicios que funcione 24/7.
                </p>
              </div>
            </Col>
          </Row>
        </section>

        {/* ===== SECCIÓN: SIN RIESGO ===== */}
        <section className="my-5">
          <div className={styles.riskFreeSection}>
            <Row className="align-items-center g-4">
              <Col lg={5}>
                <span className={styles.badgePowa}>GARANTÍA POWA</span>
                <h2 className={styles.titleMain} style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)' }}>
                  Empezar con <span className={styles.textGradient}>POWA</span> es sin riesgo
                </h2>
                <p className={styles.subtitle} style={{ marginBottom: 0 }}>
                  No creemos en contratos que te aten. Creemos en resultados que te hagan querer quedarte.
                </p>
              </Col>
              <Col lg={7}>
                <div className={styles.riskFreeGrid}>
                  <div className={styles.riskFreeItem}>
                    <FaCheckCircle className={styles.riskFreeIcon} />
                    <div>
                      <h4>Sin permanencia</h4>
                      <p>Podés cancelar cuando quieras. No hay multas ni contratos de fidelización.</p>
                    </div>
                  </div>
                  <div className={styles.riskFreeItem}>
                    <FaCheckCircle className={styles.riskFreeIcon} />
                    <div>
                      <h4>Pago por hitos</h4>
                      <p>Pagás a medida que avanzamos. No ponés todo el dinero al inicio.</p>
                    </div>
                  </div>
                  <div className={styles.riskFreeItem}>
                    <FaCheckCircle className={styles.riskFreeIcon} />
                    <div>
                      <h4>Código 100% tuyo</h4>
                      <p>Te llevás todo al finalizar. No dependés de nosotros para nada.</p>
                    </div>
                  </div>
                  <div className={styles.riskFreeItem}>
                    <FaCheckCircle className={styles.riskFreeIcon} />
                    <div>
                      <h4>Consulta gratuita</h4>
                      <p>Sin compromiso. Analizamos tu proyecto y te damos un plan claro.</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
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
                      <strong>Fundador</strong>
                      <span>de agencia digital POWA</span>
                    </div>
                  </div>
                  <div className={styles.whyUsBadge}>
                    <FaBrain className={styles.whyUsBadgeIcon} />
                    <div>
                      <strong>Fullstack</strong>
                      <span>Next.js · TypeScript · Node.js</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* ===== MINI FAQ DE CONFIANZA ===== */}
        <section className="my-5">
          <div className="text-center mb-4">
            <span className={styles.badgePowa}>PREGUNTAS FRECUENTES</span>
            <h2 className={styles.titleMain} style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)' }}>
              Lo que siempre preguntan <span className={styles.textGradient}>antes de empezar</span>
            </h2>
          </div>
          <Row className="g-3">
            {faqTrust.map((faq, idx) => (
              <Col key={idx} md={6}>
                <div className={styles.miniFaqItem}>
                  <h4 className={styles.miniFaqQ}>❓ {faq.q}</h4>
                  <p className={styles.miniFaqA}>{faq.a}</p>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* ===== BANNER ESTRATÉGICO ===== */}
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
              <span>⚡ Respuesta en 1 día hábil</span>
              <span>📋 Diagnóstico gratuito</span>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={`text-decoration-none ${styles.btnPowaMain}`}>
                RESERVÁ TU CONSULTORÍA GRATIS <FaRocket className="ms-2" />
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