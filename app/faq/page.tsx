'use client';

import React, { useMemo } from 'react';
import { Container, Accordion, Row, Col } from 'react-bootstrap';
import { FaCode, FaBolt, FaShieldAlt, FaWhatsapp } from 'react-icons/fa';
import styles from './faq.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FaqPage() {
  const whatsappNumber = "5491138305837";
  const message = encodeURIComponent("Hola Powa, me interesa realizar una auditoría técnica para mi próximo desarrollo.");

  const faqs: FAQItem[] = useMemo(() => [
    {
      question: "¿Qué tipo de soluciones digitales desarrollan?",
      answer: "Diseñamos e implementamos ecosistemas digitales a la medida de los objetivos de su empresa. Nos especializamos en landings de conversión optimizada y plataformas SaaS complejas. Al desarrollar con arquitectura pura sobre Next.js, eliminamos las restricciones estructurales de las plantillas genéricas: su producto final será exactamente como lo proyecta, con un código limpio, seguro y arquitecturado para escalar verticalmente."
    },
    {
      question: "¿Sus desarrollos están optimizados para la conversión y ventas?",
      answer: "Absolutamente. El rendimiento técnico está directamente correlacionado con la tasa de conversión. Cada milisegundo de latencia reduce drásticamente el volumen de transacciones. Minimizamos la fricción mediante la optimización estricta del Core Web Vitals y la aplicación de patrones de diseño UX avanzados que guían al usuario orgánicamente hacia la acción comercial."
    },
    {
      question: "¿Las plataformas son compatibles con ecosistemas de adquisición (Ads & Meta)?",
      answer: "Sí, es uno de nuestros pilares de ingeniería. Los algoritmos de Google Ads y Meta penalizan las experiencias de carga ineficientes incrementando el Costo por Clic (CPC). Nuestras soluciones implementan Server-Side Rendering (SSR), garantizando una indexación técnica perfecta que eleva el Quality Score de sus campañas, permitiéndole adquirir más clientes con el mismo presupuesto publicitario."
    },
    {
      question: "¿Por qué priorizan arquitecturas en Next.js por sobre sistemas monolíticos como WordPress?",
      answer: "Los CMS tradicionales como WordPress presentan serias deficiencias en seguridad, dependencia de plugins de terceros y sobrecarga de procesamiento en cliente. Next.js nos permite compilar sitios estáticos e híbridos de velocidad ultra-instantánea. Al desacoplar el frontend, reducimos la superficie de ataque a niveles prácticamente nulos, entregando un activo robusto que Google posiciona prioritariamente."
    },
    {
      question: "¿Cuál es el cronograma estimado de entrega?",
      answer: "Nuestros ciclos promedio varían entre 4 y 6 semanas. No operamos con soluciones prefabricadas; cada desarrollo atraviesa etapas rigurosas de consultoría estratégica, diseño modular de alta fidelidad en Figma e ingeniería frontend a medida. Entregamos soluciones tecnológicas de nivel corporativo concebidas para perdurar en el tiempo."
    },
    {
      question: "¿Una vez finalizado el proyecto, la propiedad intelectual me pertenece?",
      answer: "Totalmente. Al tratarse de ingeniería de software a medida, el 100% de los derechos de propiedad intelectual y el código fuente pertenecen a su empresa. No implementamos contratos de permanencia obligatorios ni dependencia tecnológica. Entregamos un activo digital autónomo, auditable y de libre gestión."
    },
    {
      question: "¿Qué viabilidad existe para escalar o iterar la plataforma en el futuro?",
      answer: "La escalabilidad está integrada nativamente en nuestro proceso gracias a una arquitectura modular de componentes. Si en etapas posteriores requiere integrar pasarelas complejas, flujos automatizados de IA o portales de autenticación de clientes, la infraestructura base permite la expansión limpia sin necesidad de reescribir código existente, protegiendo su inversión de capital."
    },
    {
      question: "¿Proveen servicios de soporte y acuerdos de nivel de servicio (SLA)?",
      answer: "Sí. El despliegue a producción es solo el inicio de la relación técnica. Ofrecemos planes avanzados de mantenimiento preventivo, monitoreo continuo de infraestructura, auditorías periódicas de seguridad y optimizaciones de rendimiento en tiempo real, garantizando la continuidad operativa de su negocio 24/7."
    },
    {
      question: "¿Cuál es la inversión requerida para iniciar un desarrollo con Powa?",
      answer: "Cada desarrollo se presupuesta de forma personalizada tras una fase de análisis de requerimientos técnicos y funcionales. No competimos por precio, sino por valor arquitectónico. Nuestro enfoque está estructurado hacia el retorno de la inversión (ROI): asegurar velocidad de carga superior, seguridad corporativa y un posicionamiento estético premium que habilite a su marca a competir en el segmento más alto de su mercado."
    }
  ], []);

  return (
    <div className={styles.faqPageWrapper}>
      <Container>
        {/* Header */}
        <header className={`${styles.faqHeader} text-center`}>
          <span className={styles.badgeCategory}>RECURSOS & SOPORTE</span>
          <h1 className={styles.faqTitle}>
            Preguntas frecuentes sobre <br />
            <span className={styles.textGradient}>ingeniería web premium</span>
          </h1>
          <p className={styles.faqDescription}>
            Respuestas técnicas detalladas sobre nuestra metodología de desarrollo, arquitectura de software y optimización estratégica.
          </p>
        </header>

        {/* Acordeón */}
        <Row className="justify-content-center">
          <Col lg={9}>
            <Accordion flush className={styles.customAccordion}>
              {faqs.map((faq, index) => (
                <Accordion.Item
                  eventKey={index.toString()}
                  key={index}
                  className={styles.accordionItem}
                >
                  <Accordion.Header className={styles.accordionHeader}>
                    <span className={styles.itemNumber}>{(index + 1).toString().padStart(2, '0')}</span>
                    {faq.question}
                  </Accordion.Header>
                  <Accordion.Body className={styles.accordionBody}>
                    <div className={styles.bodyContent}>
                      {faq.answer}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>

        {/* Enterprise Badges */}
        <footer className={styles.faqFooter}>
          <p className={styles.footerLabel}>ESTÁNDARES DE INFRAESTRUCTURA EMPRESARIAL</p>
          <div className={styles.techIconsGrid}>
            <div className={styles.iconWrapper} title="Código Limpio"><FaCode /></div>
            <div className={styles.iconWrapper} title="Rendimiento Crítico"><FaBolt /></div>
            <div className={styles.iconWrapper} title="Seguridad Perimetral"><FaShieldAlt /></div>
          </div>
        </footer>
      </Container>

      {/* WhatsApp Flotante */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        className={styles.whatsappFloat}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a soporte técnico vía WhatsApp"
      >
        <div className={styles.pulseContainer}>
          <FaWhatsapp className={styles.floatIcon} />
        </div>
        <span className={styles.floatText}>CONSULTA TÉCNICA DIRECTA</span>
      </a>
    </div>
  );
}