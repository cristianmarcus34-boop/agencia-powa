'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
    FaCheckCircle, FaClock, FaShieldAlt, FaRocket,
    FaWhatsapp, FaServer, FaDatabase, FaCode,
    FaChartLine, FaUsers, FaCloudUploadAlt, FaBolt,
    FaCrown, FaStar, FaArrowRight, FaShieldVirus
} from 'react-icons/fa';
import Link from 'next/link';
import styles from './planes.module.css';

interface Plan {
    id: string;
    name: string;
    icon: React.ReactNode;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
    badge?: string;
}

const PLANS: Plan[] = [
    {
        id: 'basico',
        name: 'Básico',
        icon: <FaCloudUploadAlt />,
        price: '$100',
        period: '/mes',
        description: 'Mantenimiento preventivo y soporte básico para proyectos pequeños.',
        color: 'from-blue-500 to-blue-600',
        features: [
            'Monitoreo básico de disponibilidad',
            'Actualizaciones de seguridad críticas',
            'Soporte por email (respuesta en 48hs)',
            'Reporte mensual de rendimiento',
            'Backups semanales',
            '1 hora de soporte mensual incluida'
        ],
        badge: 'Para proyectos pequeños'
    },
    {
        id: 'pro',
        name: 'Pro',
        icon: <FaShieldAlt />,
        price: '$250',
        period: '/mes',
        description: 'Soporte completo y mantenimiento avanzado para proyectos en crecimiento.',
        color: 'from-purple-500 to-accent-purple',
        popular: true,
        features: [
            'Monitoreo 24/7 con alertas proactivas',
            'Actualizaciones de seguridad en tiempo real',
            'Soporte por email y WhatsApp (respuesta en 24hs)',
            'Reporte detallado de rendimiento y métricas',
            'Backups diarios',
            '5 horas de soporte mensual incluidas',
            'Auditoría de seguridad trimestral',
            'Optimización de rendimiento mensual'
        ],
        badge: '⭐ Más popular'
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        icon: <FaCrown />,
        price: 'Personalizado',
        period: '',
        description: 'Solución completa para empresas con necesidades críticas y alto volumen.',
        color: 'from-gold-500 to-orange-500',
        features: [
            'Monitoreo 24/7 con respuesta en minutos',
            'Equipo dedicado de ingenieros',
            'Soporte prioritario 24/7 (email, WhatsApp, llamada)',
            'Dashboard de métricas en tiempo real',
            'Backups cada 6 horas con recuperación rápida',
            'Horas de soporte ilimitadas',
            'Auditoría de seguridad mensual',
            'Optimización continua de rendimiento',
            'Consultoría estratégica mensual',
            'SLA personalizado con garantías'
        ],
        badge: '🏢 Para empresas'
    }
];

export default function PlanesPage() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const WHATSAPP_LINK = `https://wa.me/5491138305837?text=Hola!%20Quiero%20contratar%20un%20plan%20de%20mantenimiento%20para%20mi%20proyecto...`;

    return (
        <div className={styles.planesWrapper}>
            <div className={styles.ambientGlow} />
            <div className={styles.ambientGlowSecondary} />

            <Container>
                {/* ===== HEADER ===== */}
                <header className="text-center mb-5">
                    <span className={styles.badgePowa}>PLANES DE MANTENIMIENTO</span>
                    <h1 className={styles.planesTitle}>
                        Protegé tu <span className={styles.textGradient}>inversión</span> con soporte continuo
                    </h1>
                    <p className={styles.planesSubtitle}>
                        Tu proyecto merece cuidado constante. Elegí el plan que mejor se adapte a tus necesidades.
                    </p>
                </header>

                {/* ===== GRID DE PLANES ===== */}
                <Row className="g-4">
                    {PLANS.map((plan) => (
                        <Col key={plan.id} lg={4} md={6}>
                            <div
                                className={`${styles.planCard} ${plan.popular ? styles.popularCard : ''}`}
                                onMouseEnter={() => setSelectedPlan(plan.id)}
                                onMouseLeave={() => setSelectedPlan(null)}
                            >
                                {plan.popular && (
                                    <div className={styles.popularBadge}>
                                        <FaStar className={styles.popularIcon} />
                                        Más popular
                                    </div>
                                )}

                                <div className={styles.planHeader}>
                                    <div className={`${styles.planIcon} bg-gradient-to-br ${plan.color}`}>
                                        {plan.icon}
                                    </div>
                                    <h3 className={styles.planName}>{plan.name}</h3>
                                    <div className={styles.planPrice}>
                                        <span className={styles.priceAmount}>{plan.price}</span>
                                        <span className={styles.pricePeriod}>{plan.period}</span>
                                    </div>
                                    <p className={styles.planDescription}>{plan.description}</p>
                                    {plan.badge && (
                                        <span className={styles.planBadge}>{plan.badge}</span>
                                    )}
                                </div>

                                <ul className={styles.planFeatures}>
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className={styles.featureItem}>
                                            <FaCheckCircle className={styles.featureIcon} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className={styles.planFooter}>
                                    {plan.id === 'enterprise' ? (
                                        <a
                                            href={WHATSAPP_LINK}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${styles.btnPlan} ${styles.btnWhatsapp}`}
                                        >
                                            <FaWhatsapp className="me-2" />
                                            Consultar
                                        </a>
                                    ) : (
                                        <a
                                            href={WHATSAPP_LINK}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.btnPlan}
                                        >
                                            Contratar plan
                                            <FaArrowRight className="ms-2" />
                                        </a>
                                    )}
                                </div>

                                {selectedPlan === plan.id && (
                                    <div className={styles.planGlow} />
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>

                {/* ===== NOTA AL PIE DE PRECIOS ===== */}
                <div className={styles.priceNote}>
                    <p className={styles.priceNoteText}>
                        * Todos los precios están expresados en dólares estadounidenses (USD).
                        El valor en pesos argentinos se calcula al tipo de cambio del día de la transacción.
                    </p>
                </div>

                {/* ===== CTA ADICIONAL ===== */}
                <div className={styles.extraCta}>
                    <Row className="align-items-center">
                        <Col lg={8}>
                            <h3 className={styles.ctaTitle}>
                                ¿No encontrás el plan que buscás?
                            </h3>
                            <p className={styles.ctaText}>
                                Te armamos un plan a medida según las necesidades específicas de tu proyecto.
                            </p>
                        </Col>
                        <Col lg={4} className="text-lg-end">
                            <a
                                href={WHATSAPP_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.ctaButton}
                            >
                                <FaWhatsapp className="me-2" />
                                Hablar con un asesor
                            </a>
                        </Col>
                    </Row>
                </div>

                {/* ===== COMPARATIVA RÁPIDA ===== */}
                <section className={styles.compareSection}>
                    <h3 className={styles.compareTitle}>
                        <FaShieldVirus className={styles.compareIcon} />
                        ¿Qué incluyen todos los planes?
                    </h3>
                    <Row className="g-3">
                        <Col md={3} sm={6}>
                            <div className={styles.compareItem}>
                                <FaServer className={styles.compareItemIcon} />
                                <span>Infraestructura monitoreada</span>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className={styles.compareItem}>
                                <FaShieldAlt className={styles.compareItemIcon} />
                                <span>Seguridad continua</span>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className={styles.compareItem}>
                                <FaClock className={styles.compareItemIcon} />
                                <span>Disponibilidad garantizada</span>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className={styles.compareItem}>
                                <FaChartLine className={styles.compareItemIcon} />
                                <span>Optimización constante</span>
                            </div>
                        </Col>
                    </Row>
                </section>

                {/* ===== BOTÓN VOLVER A FAQ ===== */}
                <div className="text-center mt-5">
                    <Link href="/faq" className={styles.backLink}>
                        ← Volver a preguntas frecuentes
                    </Link>
                </div>
            </Container>
        </div>
    );
}