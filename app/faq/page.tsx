'use client';
import React from 'react';
import { Container, Accordion, Row, Col } from 'react-bootstrap';
import { FaQuestionCircle, FaCode, FaBolt, FaShieldAlt, FaWhatsapp } from 'react-icons/fa';
import styles from './faq.module.css';

export default function FaqPage() {
  const whatsappNumber = "5491138305837"; 
  const message = encodeURIComponent("¡Hola Powa! Estuve viendo la sección de soporte y tengo una consulta...");

  const faqs = [
    {
      question: "¿Qué tipo de soluciones digitales desarrollan?",
      answer: "Desarrollamos ecosistemas digitales de alto rendimiento: desde Landing Pages ultra-veloces en React.js hasta plataformas escalables con arquitecturas sólidas en Node.js. Al no usar plantillas predefinidas como WordPress, tu proyecto no tiene límites técnicos ni de diseño."
    },
    {
      question: "¿Sus desarrollos están optimizados para generar ventas?",
      answer: "Absolutamente. Combinamos la velocidad extrema de React con interfaces diseñadas para la conversión. Una web rápida y fluida mejora la experiencia del usuario y aumenta significativamente la tasa de conversión."
    },
    {
      question: "¿Las webs son compatibles con Google Ads y Meta?",
      answer: "Sí. Entregamos aplicaciones 'Ads-Ready'. Al ser código optimizado, el puntaje de calidad de Google suele ser mayor, reduciendo el costo por clic (CPC) en tus campañas."
    },
    {
      question: "¿Por qué eligen Node.js y React en lugar de WordPress?",
      answer: "Priorizamos rendimiento y seguridad. Con este stack tu web carga una sola vez y la navegación es instantánea. Además, eliminamos las vulnerabilidades típicas de los plugins de terceros."
    },
    {
      question: "¿Cuál es el tiempo estimado de entrega?",
      answer: "Un desarrollo profesional toma aproximadamente 4 semanas, incluyendo estrategia, diseño UX/UI en Figma, codificación a medida y despliegue final."
    }
  ];

  return (
    <div className={styles.faqPageWrapper}>
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <div className={`${styles.faqIconHeader} animate-pulse`}>
            <FaQuestionCircle />
          </div>
          <h1 className={styles.faqTitle}>
            Dudas comunes sobre <br />
            <span className="text-gradient">diseño web profesional</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3">
            Despejá tus dudas sobre cómo trabajamos con tecnologías de vanguardia como React y Node.js.
          </p>
        </div>

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
                    <span className="text-blue-400 me-3">0{index + 1}.</span> 
                    {faq.question}
                  </Accordion.Header>
                  <Accordion.Body className={styles.accordionBody}>
                    {faq.answer}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>

        {/* Stack sutil */}
        <div className="text-center mt-5 pt-5 opacity-40">
          <p className="small tracking-widest text-uppercase mb-4 text-white">Tecnología de Grado Empresarial</p>
          <div className="d-flex justify-content-center gap-5 fs-2 text-white">
            <FaCode />
            <FaBolt />
            <FaShieldAlt />
          </div>
        </div>
      </Container>

      {/* BOTÓN WHATSAPP FLOTANTE */}
      <a 
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        className={styles.whatsappFloat}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className={styles.floatIcon} />
        <span className={styles.floatText}>¿Tenés otra duda?</span>
      </a>
    </div>
  );
}