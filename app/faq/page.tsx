'use client';

import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Link from 'next/link';
import {
  FaCode, FaBolt, FaShieldAlt, FaWhatsapp,
  FaCheckCircle, FaClock, FaLock, FaHandshake,
  FaRocket, FaStar, FaUsers, FaShieldVirus,
  FaMobileAlt, FaPlug, FaCloudUploadAlt, FaChartLine,
  FaUserTie, FaFileContract, FaQuestionCircle,
  FaSearch, FaFilter, FaTags, FaServer, FaDatabase,
  FaArrowRight, FaRobot
} from 'react-icons/fa';
import Script from 'next/script';
import styles from './faq.module.css';

// ===== TIPOS =====
interface FAQItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly category: 'trust' | 'process' | 'technical' | 'business' | 'postlaunch';
  readonly highlighted?: boolean;
  readonly icon?: React.ReactNode;
  readonly link?: string;
}

interface Category {
  id: FAQItem['category'];
  label: string;
  icon: React.ReactNode;
  color: string;
}

// ===== CONSTANTES =====
const WHATSAPP_NUMBER = "5491138305837";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola Powa, quiero consultar sobre desarrollo y mitigación de riesgos para mi proyecto."
);

const TECH_ICONS: readonly { icon: React.ReactNode; label: string; tooltip: string }[] = [
  { icon: <FaCode />, label: 'Clean Code', tooltip: 'Código Limpio y Arquitecturado' },
  { icon: <FaBolt />, label: 'Performance', tooltip: 'Rendimiento Crítico Optimizado' },
  { icon: <FaShieldAlt />, label: 'Security', tooltip: 'Seguridad Perimetral Avanzada' },
  { icon: <FaServer />, label: 'Infraestructura', tooltip: 'Arquitectura Escalable y Resiliente' },
  { icon: <FaDatabase />, label: 'Data', tooltip: 'Modelado y Gestión de Datos' },
] as const;

const CATEGORIES: Category[] = [
  { id: 'trust', label: 'Confianza y Garantías', icon: <FaShieldAlt />, color: '#f59e0b' },
  { id: 'process', label: 'Proceso y Metodología', icon: <FaRocket />, color: '#22d3ee' },
  { id: 'technical', label: 'Arquitectura Técnica', icon: <FaCode />, color: '#8b5cf6' },
  { id: 'business', label: 'Negocio y Conversión', icon: <FaChartLine />, color: '#10b981' },
  { id: 'postlaunch', label: 'Post-Lanzamiento', icon: <FaCloudUploadAlt />, color: '#f472b6' },
];

// ===== COMPONENTE PRINCIPAL =====
export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<FAQItem['category'] | 'all'>('all');

  const faqs: FAQItem[] = useMemo(() => [
    // ===== CATEGORÍA: CONFIANZA Y GARANTÍAS (TRUST) =====
    {
      id: 'trust-1',
      category: 'trust',
      highlighted: true,
      question: "¿Cómo me aseguro de que el desarrollo cumpla con lo que necesito?",
      icon: <FaCheckCircle />,
      answer: "Nuestro proceso está diseñado para eliminar sorpresas. Implementamos entregas parciales cada 2 semanas con validación técnica. Antes de cada entrega, realizamos demostraciones en vivo del avance y aplicamos correcciones antes de continuar. Al finalizar el ciclo de desarrollo, hacemos una auditoría exhaustiva del código, pruebas de rendimiento de estrés y validación de la lógica de negocio con tu equipo. Te entregamos un informe detallado de cada etapa para que tengas visibilidad 360° del proyecto."
    },
    {
      id: 'trust-2',
      category: 'trust',
      highlighted: true,
      question: "¿Qué sucede si el proyecto no cumple con el cronograma acordado?",
      icon: <FaClock />,
      answer: "La transparencia en la planificación es nuestro pilar. Utilizamos metodologías ágiles donde cada sprint tiene objetivos claros y medibles. Si identificamos desvíos técnicos, te lo comunicamos de inmediato con opciones de mitigación. Nuestro compromiso es mantenerte informado en cada paso, evitando sorpresas de último momento. Contamos con acuerdos de nivel de servicio (SLA) que garantizan la disponibilidad del equipo y la continuidad del proyecto."
    },
    {
      id: 'trust-3',
      category: 'trust',
      highlighted: true,
      question: "¿Qué garantías tengo sobre la seguridad de mi inversión?",
      icon: <FaLock />,
      answer: "La seguridad de tu inversión se protege desde el día 1 con un contrato transparente que incluye: 1) Propiedad intelectual 100% a tu nombre, 2) Entregas parciales para mitigar riesgos, 3) Código fuente auditable en repositorios privados, 4) Posibilidad de pausa o redirección sin penalizaciones. Además, implementamos un 'Plan de Continuidad Técnica' para garantizar que el proyecto pueda ser mantenido por cualquier equipo técnico, sin dependencia de Powa."
    },
    {
      id: 'trust-4',
      category: 'trust',
      question: "¿Cómo manejan los cambios de última hora o imprevistos?",
      icon: <FaHandshake />,
      answer: "Entendemos que los negocios evolucionan. Nuestra estructura de sprints cortos (2 semanas) permite incorporar cambios de forma ágil sin comprometer la calidad. Establecemos un 'buffer de cambios' del 20% en cada sprint para adaptarnos a tus necesidades emergentes. Los cambios mayores se evalúan en conjunto, se presupuestan de manera transparente y se planifican sin afectar entregas críticas."
    },
    {
      id: 'trust-5',
      category: 'trust',
      question: "¿Puedo ver avances del proyecto antes de la entrega final?",
      icon: <FaUsers />,
      answer: "Absolutamente. Realizamos entregas incrementales en entornos de staging (pruebas) cada 15 días. Puedes probar las funcionalidades en tiempo real y dar feedback inmediato. Cada entrega incluye documentación técnica actualizada y un video explicativo de las nuevas features. Esto te permite visualizar el producto desde el día 1 y ajustar el rumbo según sea necesario."
    },
    {
      id: 'trust-6',
      category: 'trust',
      highlighted: true,
      question: "¿Por qué debería elegir a Powa por sobre una agencia tradicional o un freelancer?",
      icon: <FaStar />,
      answer: "La diferencia está en nuestra arquitectura de ingeniería. Mientras una agencia tradicional te vende una plantilla con limitaciones estructurales y un freelancer puede tener riesgos de continuidad, nosotros te entregamos un activo digital corporativo con: 1) Equipo multidisciplinario (arquitecto, frontend, backend, QA, UX/UI), 2) Código empresarial con estándares ISO y documentación completa, 3) Continuidad garantizada con código documentado para cualquier desarrollador, 4) Escalabilidad comprobada desde 100 hasta 1M de usuarios, 5) Soporte post-lanzamiento sin abandonarte."
    },
    {
      id: 'trust-7',
      category: 'trust',
      question: "¿Qué información necesito aportar para empezar?",
      icon: <FaFileContract />,
      answer: "Te pedimos lo mínimo para no ralentizar el proceso: 1) Brief de negocio (objetivos, mercado, competencia), 2) Contenido actual (textos, imágenes, logos), 3) Acceso a herramientas (CRM, ERP, sistemas propios), 4) 2-3 sesiones estratégicas de 1 hora. Lo que NO te pedimos: conocimientos técnicos, inversión en infraestructura cara, contratos de permanencia ni pagos adelantados sin entregas. Nosotros hacemos el trabajo pesado, vos te enfocas en tu negocio."
    },
    {
      id: 'trust-8',
      category: 'trust',
      question: "¿Cómo manejan la confidencialidad de mi idea/proyecto?",
      icon: <FaShieldVirus />,
      answer: "Tu idea está protegida desde el primer contacto: 1) NDA (Acuerdo de Confidencialidad) firmado antes de compartir detalles, 2) Acceso restringido solo al equipo asignado, 3) Repositorios privados con autenticación 2FA, 4) Sin uso de tu información como case study sin autorización, 5) Cláusulas de exclusividad para no trabajar con competidores directos durante 12 meses si lo necesitas."
    },

    // ===== CATEGORÍA: PROCESO Y METODOLOGÍA =====
    {
      id: 'process-1',
      category: 'process',
      highlighted: true,
      question: "¿Cuál es el proceso completo desde que firmamos hasta el lanzamiento?",
      icon: <FaRocket />,
      answer: "Seguimos una metodología de 5 fases con entregas tangibles: Fase 1 - Discovery (1 semana): entrevistas, definición de KPIs, benchmarking. Fase 2 - Diseño (2 semanas): arquitectura, wireframes, UI en Figma. Fase 3 - Desarrollo (2-4 semanas): infraestructura, frontend/backend, integraciones. Fase 4 - Testing (1 semana): pruebas automatizadas, usuario, optimización. Fase 5 - Lanzamiento (1 semana): despliegue, monitoreo, capacitación. Total: 6-9 semanas dependiendo de complejidad."
    },
    {
      id: 'process-2',
      category: 'process',
      question: "¿Con qué frecuencia me van a actualizar sobre el progreso?",
      icon: <FaUsers />,
      answer: "Comunicación garantizada: Reunión semanal de 30 min para alinear prioridades, Reporte de progreso cada 15 días con métricas, Canal directo (WhatsApp/Slack) para consultas urgentes, Grabación de cada reunión para revisión. Niveles: Project Manager (diario), CTO/Arquitecto (cada 15 días), CEO en reuniones clave. Bonus: Dashboard en tiempo real para ver progreso sin preguntar."
    },

    // ===== CATEGORÍA: ARQUITECTURA TÉCNICA =====
    {
      id: 'technical-1',
      category: 'technical',
      question: "¿Qué tipo de soluciones digitales desarrollan?",
      icon: <FaCode />,
      answer: "Diseñamos e implementamos ecosistemas digitales a la medida de los objetivos de tu empresa. Nos especializamos en landings de conversión optimizada y plataformas SaaS complejas. Al desarrollar con arquitectura pura sobre Next.js, eliminamos las restricciones estructurales de las plantillas genéricas: tu producto final será exactamente como lo proyectás, con un código limpio, seguro y arquitecturado para escalar verticalmente."
    },
    {
      id: 'technical-2',
      category: 'technical',
      question: "¿Por qué priorizan arquitecturas en Next.js por sobre sistemas monolíticos como WordPress?",
      icon: <FaBolt />,
      answer: "Los CMS tradicionales como WordPress presentan serias deficiencias en seguridad, dependencia de plugins de terceros y sobrecarga de procesamiento en el cliente. Next.js nos permite compilar sitios estáticos e híbridos de velocidad ultra-instantánea. Al desacoplar el frontend, reducimos la superficie de ataque a niveles prácticamente nulos, entregando un activo robusto que Google posiciona prioritariamente."
    },
    {
      id: 'technical-3',
      category: 'technical',
      question: "¿Qué viabilidad existe para escalar o iterar la plataforma en el futuro?",
      icon: <FaChartLine />,
      answer: "La escalabilidad está integrada nativamente en nuestro proceso gracias a una arquitectura modular de componentes. Si en etapas posteriores requerís integrar pasarelas complejas, flujos automatizados de IA o portales de autenticación de clientes, la infraestructura base permite la expansión limpia sin necesidad de reescribir código existente, protegiendo tu inversión de capital."
    },
    {
      id: 'technical-4',
      category: 'technical',
      question: "¿Mi proyecto va a funcionar bien en celulares y tablets?",
      icon: <FaMobileAlt />,
      answer: "No es opcional, es obligatorio. El 60% del tráfico web viene de móviles. Diseño Mobile-First: empezamos por pantallas pequeñas, interacciones táctiles optimizadas, testing en +30 dispositivos reales. Rendimiento: carga en <2 segundos en 4G, Core Web Vitals optimizados, uso eficiente de datos. Bonus: Video mostrando el proyecto en diferentes dispositivos antes del lanzamiento."
    },
    {
      id: 'technical-5',
      category: 'technical',
      question: "¿Qué pasa si quiero integrar mi proyecto con herramientas que ya uso?",
      icon: <FaPlug />,
      answer: "La integración es uno de nuestros superpoderes. Soporte para Mailchimp, Sendinblue, HubSpot (email); Mercado Pago, Stripe, PayPal (pagos); Google Analytics, Meta Pixel, Hotjar (analytics); Salesforce, Zoho, Monday.com (CRMs); Shopify, WooCommerce (ecommerce). Metodología: Auditoría de APIs, arquitectura modular, pruebas de integración, documentación completa."
    },
    {
      id: 'technical-6',
      category: 'technical',
      question: "¿Puedo migrar mi proyecto a otro hosting o proveedor si quiero?",
      icon: <FaCloudUploadAlt />,
      answer: "¡Absolutamente! No creemos en vendor lock-in. Código 100% portable con estándares abiertos (React, Next.js, Node.js), sin dependencias propietarias, documentación completa de despliegue, arquitectura cloud-agnostic (AWS, Google Cloud, Azure, Vercel, Netlify). Incluso te ayudamos a migrar si encuentras un proveedor más barato o quieres llevarlo a tu propio servidor."
    },

    // ===== CATEGORÍA: NEGOCIO Y CONVERSIÓN =====
    {
      id: 'business-1',
      category: 'business',
      question: "¿Sus desarrollos están optimizados para la conversión y ventas?",
      icon: <FaChartLine />,
      answer: "Absolutamente. El rendimiento técnico está directamente correlacionado con tu tasa de conversión. Cada milisegundo de latencia reduce drásticamente tu volumen de transacciones. Minimizamos la fricción mediante la optimización estricta de los Core Web Vitals y la aplicación de patrones de diseño UX avanzados que guían al usuario orgánicamente hacia la acción comercial."
    },
    {
      id: 'business-2',
      category: 'business',
      question: "¿Las plataformas son compatibles con ecosistemas de adquisición (Ads & Meta)?",
      icon: <FaUsers />,
      answer: "Sí, es uno de nuestros pilares de ingeniería. Los algoritmos de Google Ads y Meta penalizan las experiencias de carga ineficientes incrementando tu Costo por Clic (CPC). Nuestras soluciones implementan Server-Side Rendering (SSR), garantizando una indexación técnica perfecta que eleva el Quality Score de tus campañas, permitiéndote adquirir más clientes con el mismo presupuesto publicitario."
    },
    {
      id: 'business-3',
      category: 'business',
      question: "¿Cuál es el cronograma estimado de entrega?",
      icon: <FaClock />,
      answer: "Nuestros ciclos promedio varían entre 4 y 6 semanas. No operamos con soluciones prefabricadas; cada desarrollo atraviesa etapas rigurosas de consultoría estratégica, diseño modular de alta fidelidad en Figma e ingeniería frontend a medida. Entregamos soluciones tecnológicas de nivel corporativo concebidas para perdurar en el tiempo."
    },
    {
      id: 'business-4',
      category: 'business',
      highlighted: true,
      question: "¿Una vez finalizado el proyecto, la propiedad intelectual me pertenece?",
      icon: <FaLock />,
      answer: "Totalmente. Al tratarse de ingeniería de software a medida, el 100% de los derechos de propiedad intelectual y el código fuente le pertenecen a tu empresa. No implementamos contratos de permanencia obligatorios ni dependencia tecnológica. Te entregamos un activo digital autónomo, auditable y de libre gestión, con toda la documentación técnica necesaria para que cualquier equipo pueda continuar el desarrollo."
    },
    {
      id: 'business-5',
      category: 'business',
      question: "¿Cuál es la inversión requerida para iniciar un desarrollo con Powa?",
      icon: <FaFileContract />,
      answer: "Cada desarrollo se presupuesta de forma personalizada tras una fase de análisis de requerimientos técnicos y funcionales. No competimos por precio, sino por valor arquitectónico. Nuestro enfoque está estructurado hacia el retorno de la inversión (ROI): asegurar velocidad de carga superior, seguridad corporativa y un posicionamiento estético premium que habilite a tu marca a competir en el segmento más alto de tu mercado."
    },

    // ===== CATEGORÍA: POST-LANZAMIENTO =====
    {
      id: 'postlaunch-1',
      category: 'postlaunch',
      highlighted: true,
      question: "¿Qué pasa después de que lanzamos el proyecto? ¿Me dejan solo?",
      icon: <FaRocket />,
      answer: "El lanzamiento es el inicio de nuestra relación, no el final. Plan de 90 días post-lanzamiento: Mes 1: monitoreo 24/7, ajustes, correcciones críticas. Mes 2: optimización basada en datos reales. Mes 3: capacitación avanzada y transferencia. Servicios continuos: soporte 24/7 con SLA, mantenimiento preventivo, iteraciones basadas en datos, formación de tu equipo. Lo que NO hacemos: desaparecer, ignorar necesidades, imponer contratos forzosos."
    },
    {
      id: 'postlaunch-2',
      category: 'postlaunch',
      highlighted: true,
      question: "¿Qué costos adicionales puedo esperar después del desarrollo?",
      icon: <FaFileContract />,
      answer: "🔍 Somos 100% transparentes. No hay costos ocultos.\n\n✅ Todo lo que ya pagaste incluye: hosting, SSL y analytics.\n\n📌 Solo costos fijos:\n• Dominio .com: ~$15/año (a tu nombre, lo comprás vos o te lo gestionamos)\n\n📌 Costos opcionales (solo si los contratás):\n• Mantenimiento: desde $100/mes\n• Marketing digital: según campaña\n• Integraciones premium: según necesidad\n• Contenido: según volumen\n\n💡 El hosting en Vercel es gratuito siempre que el tráfico no supere los 100 GB/mes y las funciones no superen 1M de ejecuciones mensuales. Si el proyecto crece más allá de eso, recomendamos migrar a un plan de pago por $20/mes.\n\nTe entregamos un documento detallado antes de firmar. Si no lo ves en el papel, no te lo cobramos."
    },
    {
      id: 'postlaunch-3',
      category: 'postlaunch',
      question: "¿Proveen servicios de soporte y acuerdos de nivel de servicio (SLA)?",
      icon: <FaUsers />,
      answer: "Sí. El despliegue a producción es solo el inicio de la relación técnica. Ofrecemos planes avanzados de mantenimiento preventivo, monitoreo continuo de infraestructura, auditorías periódicas de seguridad y optimizaciones de rendimiento en tiempo real, garantizando la continuidad operativa de tu negocio 24/7.",
      link: "/planes"
    }
  ], []);

  // ===== FILTRADO POR CATEGORÍA =====
  const filteredFaqs = useMemo(() => {
    if (activeCategory === 'all') return faqs;
    return faqs.filter(faq => faq.category === activeCategory);
  }, [activeCategory, faqs]);

  // ===== SCHEMA JSON-LD =====
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // ===== CONTADOR DE PREGUNTAS POR CATEGORÍA =====
  const getCategoryCount = (categoryId: FAQItem['category']) => {
    return faqs.filter(f => f.category === categoryId).length;
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className={styles.faqPageWrapper}>
        <Container>
          {/* ===== HEADER ===== */}
          <header className={`${styles.faqHeader} text-center`}>
            <span className={styles.badgeCategory}>RECURSOS & SOPORTE</span>
            <h1 className={styles.faqTitle}>
              Resolvemos tus dudas para <br />
              <span className={styles.textGradient}>que elijas con confianza</span>
            </h1>
            <p className={styles.faqDescription}>
              Transparencia, seguridad y resultados. Respuestas claras para que tomes
              la mejor decisión para tu negocio.
            </p>
          </header>

          {/* ===== FILTROS POR CATEGORÍA ===== */}
          <Row className="justify-content-center mb-4">
            <Col lg={10}>
              <div className={styles.categoryFilters}>
                <button
                  className={`${styles.filterButton} ${activeCategory === 'all' ? styles.activeFilter : ''}`}
                  onClick={() => setActiveCategory('all')}
                >
                  <FaTags />
                  Todas ({faqs.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className={`${styles.filterButton} ${activeCategory === cat.id ? styles.activeFilter : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      borderColor: activeCategory === cat.id ? cat.color : 'transparent',
                      color: activeCategory === cat.id ? cat.color : '#94a3b8'
                    }}
                  >
                    {cat.icon}
                    {cat.label} ({getCategoryCount(cat.id)})
                  </button>
                ))}
              </div>
            </Col>
          </Row>


          {/* ===== BADGES DE CONFIANZA ===== */}
          <Row className="justify-content-center mb-5">
            <Col lg={10}>
              <div className={styles.trustBadges}>
                <div className={styles.trustBadge}>
                  <FaCheckCircle className={styles.trustIcon} />
                  <span>Entregas parciales cada 2 semanas</span>
                </div>
                <div className={styles.trustBadge}>
                  <FaClock className={styles.trustIcon} />
                  <span>Planificación transparente sin sorpresas</span>
                </div>
                <div className={styles.trustBadge}>
                  <FaLock className={styles.trustIcon} />
                  <span>Propiedad intelectual 100% tuya</span>
                </div>
                <div className={styles.trustBadge}>
                  <FaHandshake className={styles.trustIcon} />
                  <span>Sin dependencia tecnológica</span>
                </div>
              </div>
            </Col>
          </Row>

          {/* ===== ACORDEÓN ===== */}
          <Row className="justify-content-center">
            <Col lg={9}>
              <Accordion flush className={styles.customAccordion}>
                {filteredFaqs.map((faq, index) => {
                  const category = CATEGORIES.find(c => c.id === faq.category);
                  return (
                    <Accordion.Item
                      eventKey={faq.id}
                      key={faq.id}
                      className={`${styles.accordionItem} fadeInUp ${faq.highlighted ? styles.highlightedItem : ''
                        } ${styles[`category-${faq.category}`]}`}
                      style={{ animationDelay: `${(index + 1) * 0.03}s` }}
                    >
                      <Accordion.Header
                        className={styles.accordionHeader}
                        aria-label={`Pregunta ${index + 1}: ${faq.question}`}
                      >
                        <div className={styles.headerLeft}>
                          {faq.highlighted && (
                            <FaStar className={styles.starIcon} aria-hidden="true" />
                          )}
                          {category && (
                            <span
                              className={styles.categoryBadge}
                              style={{ color: category.color, borderColor: category.color }}
                            >
                              {category.icon}
                              {category.label}
                            </span>
                          )}
                          <span className={styles.itemNumber} aria-hidden="true">
                            {(index + 1).toString().padStart(2, '0')}
                          </span>
                          {faq.question}
                        </div>
                      </Accordion.Header>
                      <Accordion.Body
                        className={styles.accordionBody}
                        role="region"
                        aria-label={`Respuesta a: ${faq.question}`}
                      >
                        <div className={styles.bodyContent}>
                          {faq.answer}
                          {faq.link && (
                            <Link href={faq.link} className={styles.faqLink}>
                              <FaArrowRight className={styles.faqLinkIcon} />
                              Ver planes de mantenimiento
                            </Link>
                          )}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>

              {filteredFaqs.length === 0 && (
                <div className={styles.emptyState}>
                  <FaSearch className={styles.emptyIcon} />
                  <p>No hay preguntas en esta categoría</p>
                </div>
              )}
            </Col>
          </Row>

          {/* ===== CTA: Si no encontraste tu respuesta ===== */}
          <Row className="justify-content-center mt-5">
            <Col lg={9}>
              <div className={styles.chatCtaCard}>
                <div className={styles.chatCtaContent}>
                  <div className={styles.chatCtaIconWrapper}>
                    <FaRobot className={styles.chatCtaIcon} />
                  </div>
                  <div className={styles.chatCtaText}>
                    <h4 className={styles.chatCtaTitle}>
                      ¿No encontraste lo que buscabas?
                    </h4>
                    <p className={styles.chatCtaDesc}>
                      Nuestro asistente con IA está listo para responder todas tus preguntas
                      sobre desarrollo, arquitectura y soluciones tecnológicas en tiempo real.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // Buscar el botón del chat y abrirlo
                      const chatButton = document.querySelector('[aria-label="Abrir Chat de Ayuda"]');
                      if (chatButton) {
                        (chatButton as HTMLButtonElement).click();
                      }
                    }}
                    className={styles.chatCtaButton}
                  >
                    <FaRocket className={styles.chatCtaButtonIcon} />
                    Hablar con PowaBot IA
                  </button>
                </div>
              </div>
            </Col>
          </Row>

          {/* ===== CTA FINAL ===== */}
          <Row className="justify-content-center mt-5">
            <Col lg={8}>
              <div className={styles.finalCTA}>
                <FaShieldVirus className={styles.ctaIcon} />
                <h3 className={styles.ctaTitle}>
                  ¿Todavía tienes dudas sobre cómo protegemos tu inversión?
                </h3>
                <p className={styles.ctaText}>
                  Agenda una auditoría técnica gratuita de 30 minutos y te mostramos
                  cómo eliminamos los riesgos de tu proyecto desde el día 1.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                  className={styles.ctaButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className={styles.ctaButtonIcon} />
                  Quiero mitigar riesgos en mi proyecto
                </a>
              </div>
            </Col>
          </Row>

          {/* ===== FOOTER ===== */}
          <footer className={styles.faqFooter}>
            <p className={styles.footerLabel}>ESTÁNDARES DE INFRAESTRUCTURA EMPRESARIAL</p>
            <div className={styles.techIconsGrid}>
              {TECH_ICONS.map((tech, index) => (
                <div
                  key={index}
                  className={`${styles.iconWrapper} fadeInIcons`}
                  style={{ animationDelay: `${(index + 1) * 0.15}s` }}
                  title={tech.tooltip}
                  aria-label={tech.tooltip}
                >
                  {tech.icon}
                </div>
              ))}
            </div>
          </footer>
        </Container>
      </div>
    </>
  );
}