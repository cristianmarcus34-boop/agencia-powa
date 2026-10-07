// app/faq/FaqClient.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Link from 'next/link';
import {
    FaShieldAlt, FaShieldVirus, FaRocket, FaArrowRight,
    FaTags, FaSearch, FaRobot, FaWhatsapp,
    FaCheckCircle, FaClock, FaLock, FaHandshake, FaStar,
} from 'react-icons/fa';
import { FAQS, CATEGORIES, TECH_ICONS, type FAQItem } from './faqs-data';
import styles from './faq.module.css';

// ===== CONSTANTES =====
const WHATSAPP_NUMBER = '5491138305837';
const WHATSAPP_MESSAGE = encodeURIComponent(
    'Hola Powa, quiero consultar sobre desarrollo y mitigación de riesgos para mi proyecto.'
);

export default function FaqClient() {
    const [activeCategory, setActiveCategory] = useState<FAQItem['category'] | 'all'>('all');

    // ===== FILTRADO =====
    const filteredFaqs = useMemo(() => {
        if (activeCategory === 'all') return FAQS;
        return FAQS.filter((faq) => faq.category === activeCategory);
    }, [activeCategory]);

    // ===== CONTADOR =====
    const getCategoryCount = (categoryId: FAQItem['category']) => {
        return FAQS.filter((f) => f.category === categoryId).length;
    };

    return (
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

                {/* ===== FILTROS ===== */}
                <Row className="justify-content-center mb-4">
                    <Col lg={10}>
                        <div className={styles.categoryFilters}>
                            <button
                                className={`${styles.filterButton} ${activeCategory === 'all' ? styles.activeFilter : ''}`}
                                onClick={() => setActiveCategory('all')}
                            >
                                <FaTags />
                                Todas ({FAQS.length})
                            </button>
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`${styles.filterButton} ${activeCategory === cat.id ? styles.activeFilter : ''}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                    style={{
                                        borderColor: activeCategory === cat.id ? cat.color : 'transparent',
                                        color: activeCategory === cat.id ? cat.color : '#94a3b8',
                                    }}
                                >
                                    {cat.icon}
                                    {cat.label} ({getCategoryCount(cat.id)})
                                </button>
                            ))}
                        </div>
                    </Col>
                </Row>

                {/* ===== TRUST BADGES ===== */}
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
                                const category = CATEGORIES.find((c) => c.id === faq.category);
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

                {/* ===== CTA CHATBOT ===== */}
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
                                        const chatButton =
                                            document.querySelector('img[alt="Powa Bot Ayuda"]')?.closest('button') ||
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
                    <p className={styles.footerLabel}>CÓMO CUIDAMOS TU PRODUCTO</p>
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
    );
}