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
      answer: "Construimos herramientas a la medida de tu negocio, no al revés. Desde Landing Pages de alto impacto diseñadas para vender, hasta plataformas complejas que automatizan tu trabajo. Al trabajar con código puro (Next.js), eliminamos las limitaciones de las plantillas: tu web será exactamente como la imaginás, sin errores técnicos y lista para crecer."
    },
    {
      question: "¿Sus desarrollos están optimizados para generar ventas?",
      answer: "Absolutamente. Una web que tarda en cargar pierde clientes. Nosotros eliminamos esa fricción usando tecnología de alto rendimiento. Aplicamos estrategias de Experiencia de Usuario (UX) para guiar al visitante hacia el contacto de forma natural, convirtiendo las visitas en ventas reales para tu empresa."
    },
    {
      question: "¿Las webs son compatibles con Google Ads y Meta?",
      answer: "Sí, y es nuestra mayor fortaleza. Google y Facebook penalizan las webs lentas cobrándote más por cada clic. Nuestras aplicaciones son 'Ads-Ready': al ser técnicamente perfectas, tu 'Puntaje de Calidad' sube y tu costo por publicidad baja. Obtenés más clientes con el mismo presupuesto."
    },
    {
      question: "¿Por qué usan Next.js en lugar de WordPress?",
      answer: "WordPress es como un auto usado con accesorios pegados: termina siendo pesado, lento y vulnerable. En Powa construimos 'de fábrica' con Next.js. Tu web carga de forma instantánea y es prácticamente imposible de hackear. El resultado es una experiencia fluida que Google premia con mejores posiciones y que tus clientes aman usar."
    },
    {
      question: "¿Cuál es el tiempo estimado de entrega?",
      answer: "El plazo promedio es de 4 a 6 semanas. No usamos soluciones rápidas: cada proyecto atraviesa un ciclo de estrategia, diseño profesional en Figma y programación a medida. Entregamos un activo digital de élite diseñado para durar años, no una página que debas rehacer en pocos meses."
    },
    {
      question: "¿Una vez finalizado, el código me pertenece?",
      answer: "Totalmente. Al ser un desarrollo a medida, el código es propiedad de tu empresa. No te atamos a suscripciones mensuales obligatorias ni a plataformas cerradas. Te entregamos un producto independiente, escalable y con total libertad de gestión."
    },
    {
      question: "¿Qué sucede si necesito actualizar o escalar mi web?",
      answer: "Nuestra arquitectura es modular. Esto significa que si mañana necesitás agregar un sistema de reservas, un área de clientes o una IA, podemos hacerlo sin necesidad de reconstruir la web desde cero. Tu inversión está protegida porque el sitio está diseñado para crecer junto a tu facturación."
    },
    {
      question: "¿Ofrecen soporte y mantenimiento post-lanzamiento?",
      answer: "Sí, nuestro compromiso no termina con el despliegue. Ofrecemos planes de monitoreo preventivo, actualizaciones de seguridad y optimización continua. Nos convertimos en tu socio tecnológico para que vos te ocupes de tu negocio mientras nosotros nos aseguramos de que tu web rinda al 100% las 24 horas."
    },
    {
      question: "¿Cuál es la inversión necesaria para un proyecto con Powa?",
      answer: "No tenemos precios de 'plantilla' porque no entregamos trabajos genéricos. La inversión se define según los objetivos de tu negocio, la complejidad técnica y las funciones requeridas. Nuestro enfoque es maximizar el retorno de tu inversión: cada peso invertido se refleja en velocidad, seguridad y una imagen profesional de élite que te permite cobrar más por tus propios servicios."
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

          {/* Agregamos una clase extra de Bootstrap para forzar color si fuera necesario */}
          <h1 className={`${styles.faqTitle} text-white`}>
            Dudas comunes sobre <br />
            <span className={styles.textGradient}>diseño web profesional</span>
          </h1>

          {/* Cambiamos la clase del párrafo a la nueva faqDescription */}
          <p className={styles.faqDescription}>
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