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
  readonly category: 'trust' | 'pricing' | 'process' | 'technical' | 'business' | 'postlaunch';
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
  { id: 'pricing', label: 'Precios y Tiempos', icon: <FaFileContract />, color: '#f59e0b' },
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
      answer: "Nuestro proceso elimina sorpresas:\n\n✅ Entregas parciales cada 2 semanas\n✅ Demostraciones en vivo del avance\n✅ Auditoría exhaustiva del código\n✅ Pruebas de rendimiento de estrés\n✅ Informe detallado de cada etapa\n\nVisibilidad 360° desde el día 1."
    },
    {
      id: 'trust-2',
      category: 'trust',
      highlighted: true,
      question: "¿Qué sucede si el proyecto no cumple con el cronograma acordado?",
      icon: <FaClock />,
      answer: "Transparencia total:\n\n✅ Sprints con objetivos claros y medibles\n✅ Comunicación inmediata de desvíos\n✅ Opciones de mitigación desde el día 1\n✅ Acuerdos de nivel de servicio (SLA)\n\nMantenerte informado es nuestra prioridad."
    },
    {
      id: 'trust-3',
      category: 'trust',
      highlighted: true,
      question: "¿Qué garantías tengo sobre la seguridad de mi inversión?",
      icon: <FaLock />,
      answer: "Tu inversión protegida desde el día 1:\n\n✅ Propiedad intelectual 100% a tu nombre\n✅ Entregas parciales para mitigar riesgos\n✅ Código auditable en repositorios privados\n✅ Pausa o redirección sin penalizaciones\n✅ Plan de Continuidad Técnica (sin dependencia de Powa)"
    },
    {
      id: 'trust-4',
      category: 'trust',
      question: "¿Cómo manejan los cambios de última hora o imprevistos?",
      icon: <FaHandshake />,
      answer: "Evolución ágil:\n\n✅ Sprints cortos (2 semanas)\n✅ Buffer de cambios del 20% por sprint\n✅ Evaluación conjunta de cambios mayores\n✅ Presupuesto transparente\n✅ Planificación sin afectar entregas críticas"
    },
    {
      id: 'trust-5',
      category: 'trust',
      question: "¿Puedo ver avances del proyecto antes de la entrega final?",
      icon: <FaUsers />,
      answer: "Entregas incrementales cada 15 días:\n\n✅ Entornos de staging para pruebas en vivo\n✅ Feedback inmediato\n✅ Documentación técnica actualizada\n✅ Video explicativo de nuevas features\n✅ Ajustes de rumbo desde el día 1"
    },
    {
      id: 'trust-6',
      category: 'trust',
      highlighted: true,
      question: "¿Por qué debería elegir a Powa por sobre una agencia tradicional o un freelancer?",
      icon: <FaStar />,
      answer: "La diferencia está en nuestra ingeniería:\n\n✅ Equipo multidisciplinario (arquitecto, frontend, backend, QA, UX/UI)\n✅ Código empresarial con estándares ISO\n✅ Continuidad garantizada con código documentado\n✅ Escalabilidad comprobada (100 → 1M usuarios)\n✅ Soporte post-lanzamiento sin abandonarte"
    },
    {
      id: 'trust-7',
      category: 'trust',
      question: "¿Qué información necesito aportar para empezar?",
      icon: <FaFileContract />,
      answer: "Lo mínimo para empezar:\n\n✅ Brief de negocio (objetivos, mercado, competencia)\n✅ Contenido actual (textos, imágenes, logos)\n✅ Acceso a herramientas (CRM, ERP, sistemas propios)\n✅ 2-3 sesiones estratégicas de 1 hora\n\nNo necesitas conocimientos técnicos ni inversión en infraestructura cara."
    },
    {
      id: 'trust-8',
      category: 'trust',
      question: "¿Cómo manejan la confidencialidad de mi idea/proyecto?",
      icon: <FaShieldVirus />,
      answer: "Tu idea protegida desde el primer contacto:\n\n✅ NDA firmado antes de compartir detalles\n✅ Acceso restringido solo al equipo asignado\n✅ Repositorios privados con autenticación 2FA\n✅ Sin uso de tu información sin autorización\n✅ Cláusulas de exclusividad disponibles"
    },

    // ===== CATEGORÍA: PRECIOS Y TIEMPOS (PRICING) =====
    {
      id: 'pricing-1',
      category: 'pricing',
      highlighted: true,
      question: "¿Cuánto cuesta aproximadamente un desarrollo con Powa?",
      icon: <FaFileContract />,
      answer: "Cada proyecto es único. Referencia:\n\n• Landing Page / Sitio Institucional: USD 800 - 2.500\n• E-commerce / Plataforma: USD 3.000 - 10.000\n• SaaS / Proyecto a medida: USD 10.000+\n\nOfrecemos pagos escalonados (50% inicio, 25% hitos, 25% entrega) y mantenimiento desde USD 100/mes."
    },
    {
      id: 'pricing-2',
      category: 'pricing',
      highlighted: true,
      question: "¿Cuánto tiempo tarda en promedio un desarrollo?",
      icon: <FaClock />,
      answer: "Plazos promedio:\n\n• Landing Page: 2-3 semanas\n• Sitio Institucional: 3-4 semanas\n• E-commerce: 4-6 semanas\n• Plataforma/SaaS: 6-9 semanas\n\nEntregas parciales cada 15 días para ver avances reales."
    },
    {
      id: 'pricing-3',
      category: 'pricing',
      highlighted: true,
      question: "¿Qué garantía tengo de que el proyecto va a funcionar bien después del lanzamiento?",
      icon: <FaShieldVirus />,
      answer: "Garantía post-lanzamiento:\n\n✅ 30 días de soporte gratuito (ajustes, correcciones, optimizaciones)\n✅ Monitoreo 24/7 durante el primer mes\n✅ Capacitación a tu equipo\n✅ Documentación técnica completa\n✅ Plan de continuidad (cualquier dev puede tomar el proyecto)"
    },
    {
      id: 'pricing-4',
      category: 'pricing',
      highlighted: true,
      question: "¿Qué incluye el plan de mantenimiento?",
      icon: <FaCloudUploadAlt />,
      answer: "Planes desde USD 100/mes:\n\n• Monitoreo 24/7\n• Actualizaciones de seguridad\n• Copias de seguridad automáticas\n• Soporte prioritario (respuesta <4hs)\n• Optimizaciones de rendimiento\n• Reportes mensuales de salud"
    },

    // ===== CATEGORÍA: PROCESO Y METODOLOGÍA =====
    {
      id: 'process-1',
      category: 'process',
      highlighted: true,
      question: "¿Cuál es el proceso completo desde que firmamos hasta el lanzamiento?",
      icon: <FaRocket />,
      answer: "Metodología de 5 fases:\n\nFase 1 - Discovery (1 semana): entrevistas, KPIs, benchmarking\nFase 2 - Diseño (2 semanas): arquitectura, wireframes, UI en Figma\nFase 3 - Desarrollo (2-4 semanas): infraestructura, frontend/backend\nFase 4 - Testing (1 semana): pruebas automatizadas, optimización\nFase 5 - Lanzamiento (1 semana): despliegue, monitoreo, capacitación"
    },
    {
      id: 'process-2',
      category: 'process',
      question: "¿Con qué frecuencia me van a actualizar sobre el progreso?",
      icon: <FaUsers />,
      answer: "Comunicación garantizada:\n\n✅ Reunión semanal de 30 min\n✅ Reporte de progreso cada 15 días\n✅ Canal directo (WhatsApp/Slack) para consultas urgentes\n✅ Grabación de cada reunión\n✅ Dashboard en tiempo real para ver progreso"
    },

    // ===== CATEGORÍA: ARQUITECTURA TÉCNICA =====
    {
      id: 'technical-1',
      category: 'technical',
      question: "¿Qué tipo de soluciones digitales desarrollan?",
      icon: <FaCode />,
      answer: "Ecosistemas digitales a medida:\n\n✅ Landings de conversión optimizada\n✅ Plataformas SaaS complejas\n✅ Next.js con arquitectura pura\n✅ Código limpio, seguro y arquitecturado\n✅ Escalabilidad vertical garantizada"
    },
    {
      id: 'technical-2',
      category: 'technical',
      question: "¿Por qué priorizan arquitecturas en Next.js por sobre sistemas monolíticos como WordPress?",
      icon: <FaBolt />,
      answer: "Next.js vs WordPress:\n\n✅ Velocidad ultra-instantánea\n✅ Seguridad superior (menor superficie de ataque)\n✅ Sin dependencia de plugins de terceros\n✅ Sitios estáticos e híbridos\n✅ Mejor posicionamiento en Google"
    },
    {
      id: 'technical-3',
      category: 'technical',
      question: "¿Qué viabilidad existe para escalar o iterar la plataforma en el futuro?",
      icon: <FaChartLine />,
      answer: "Escalabilidad nativa:\n\n✅ Arquitectura modular de componentes\n✅ Integración de pasarelas complejas\n✅ Flujos automatizados de IA\n✅ Portales de autenticación\n✅ Expansión limpia sin reescribir código"
    },
    {
      id: 'technical-4',
      category: 'technical',
      question: "¿Mi proyecto va a funcionar bien en celulares y tablets?",
      icon: <FaMobileAlt />,
      answer: "Mobile-First obligatorio:\n\n✅ Diseño optimizado para pantallas pequeñas\n✅ Interacciones táctiles optimizadas\n✅ Testing en +30 dispositivos reales\n✅ Carga en <2 segundos en 4G\n✅ Core Web Vitals optimizados"
    },
    {
      id: 'technical-5',
      category: 'technical',
      question: "¿Qué pasa si quiero integrar mi proyecto con herramientas que ya uso?",
      icon: <FaPlug />,
      answer: "Integración con múltiples herramientas:\n\n✅ Email: Mailchimp, Sendinblue, HubSpot\n✅ Pagos: Mercado Pago, Stripe, PayPal\n✅ Analytics: Google Analytics, Meta Pixel, Hotjar\n✅ CRMs: Salesforce, Zoho, Monday.com\n✅ Ecommerce: Shopify, WooCommerce"
    },
    {
      id: 'technical-6',
      category: 'technical',
      question: "¿Puedo migrar mi proyecto a otro hosting o proveedor si quiero?",
      icon: <FaCloudUploadAlt />,
      answer: "Código 100% portable:\n\n✅ Estándares abiertos (React, Next.js, Node.js)\n✅ Sin dependencias propietarias\n✅ Documentación completa de despliegue\n✅ Arquitectura cloud-agnostic\n✅ Soporte para migración"
    },

    // ===== CATEGORÍA: NEGOCIO Y CONVERSIÓN =====
    {
      id: 'business-1',
      category: 'business',
      question: "¿Sus desarrollos están optimizados para la conversión y ventas?",
      icon: <FaChartLine />,
      answer: "Optimización de conversión:\n\n✅ Core Web Vitals optimizados\n✅ Patrones de diseño UX avanzados\n✅ Guía al usuario hacia la acción comercial\n✅ Reducción de fricción en el embudo\n✅ Aumento de tasa de conversión"
    },
    {
      id: 'business-2',
      category: 'business',
      question: "¿Las plataformas son compatibles con ecosistemas de adquisición (Ads & Meta)?",
      icon: <FaUsers />,
      answer: "Compatibilidad con ecosistemas de ads:\n\n✅ Server-Side Rendering (SSR) para calidad de indexación\n✅ Optimización para Google Ads y Meta\n✅ Reducción de Costo por Clic (CPC)\n✅ Aumento de Quality Score\n✅ Más clientes con el mismo presupuesto"
    },
    {
      id: 'business-3',
      category: 'business',
      question: "¿Cuál es el cronograma estimado de entrega?",
      icon: <FaClock />,
      answer: "Ciclos promedio: 4-6 semanas\n\n✅ No operamos con soluciones prefabricadas\n✅ Consultoría estratégica inicial\n✅ Diseño modular en Figma\n✅ Ingeniería frontend a medida\n✅ Soluciones de nivel corporativo"
    },
    {
      id: 'business-4',
      category: 'business',
      highlighted: true,
      question: "¿Una vez finalizado el proyecto, la propiedad intelectual me pertenece?",
      icon: <FaLock />,
      answer: "Propiedad intelectual 100% tuya:\n\n✅ Código fuente totalmente tuyo\n✅ Sin contratos de permanencia obligatorios\n✅ Sin dependencia tecnológica\n✅ Activo digital autónomo y auditable\n✅ Documentación técnica completa para cualquier equipo"
    },
    {
      id: 'business-5',
      category: 'business',
      question: "¿Cuál es la inversión requerida para iniciar un desarrollo con Powa?",
      icon: <FaFileContract />,
      answer: "Presupuesto personalizado:\n\n✅ Análisis de requerimientos previo\n✅ ROI garantizado\n✅ Velocidad de carga superior\n✅ Seguridad corporativa\n✅ Posicionamiento estético premium"
    },

    // ===== CATEGORÍA: POST-LANZAMIENTO =====
    {
      id: 'postlaunch-1',
      category: 'postlaunch',
      highlighted: true,
      question: "¿Qué pasa después de que lanzamos el proyecto? ¿Me dejan solo?",
      icon: <FaRocket />,
      answer: "Plan de 90 días post-lanzamiento:\n\nMes 1: monitoreo 24/7, ajustes, correcciones críticas\nMes 2: optimización basada en datos reales\nMes 3: capacitación avanzada y transferencia\n\nServicios continuos: soporte 24/7 con SLA, mantenimiento preventivo, iteraciones basadas en datos."
    },
    {
      id: 'postlaunch-2',
      category: 'postlaunch',
      highlighted: true,
      question: "¿Qué costos adicionales puedo esperar después del desarrollo?",
      icon: <FaFileContract />,
      answer: "Costos claros y transparentes:\n\n✅ Hosting, SSL y analytics incluidos\n✅ Dominio .com: ~$20/año (a tu nombre)\n\nCostos opcionales:\n• Mantenimiento: desde $100/mes\n• Marketing digital: según campaña\n• Integraciones premium: según necesidad\n• Contenido: según volumen\n\n⚠️ Hosting de pago por $20/mes.",
      link: "/planes" // 👈 Redirige a la página de planes
    },
    {
      id: 'postlaunch-3',
      category: 'postlaunch',
      question: "¿Proveen servicios de soporte y acuerdos de nivel de servicio (SLA)?",
      icon: <FaUsers />,
      answer: "Soporte con SLA:\n\n✅ Mantenimiento preventivo\n✅ Monitoreo continuo de infraestructura\n✅ Auditorías periódicas de seguridad\n✅ Optimizaciones de rendimiento en tiempo real\n✅ Continuidad operativa 24/7",
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
                          {faq.answer.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
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
                      const chatButton = document.querySelector('img[alt="Powa Bot Ayuda"]')?.closest('button') ||
                        document.querySelector('[aria-label="Abrir Chat de Ayuda"]');
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