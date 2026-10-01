'use client';

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    FaShieldAlt, FaRocket, FaWhatsapp,
    FaServer, FaClock, FaChartLine, FaStar,
    FaCloudUploadAlt, FaCrown, FaShieldVirus
} from 'react-icons/fa';
import Link from 'next/link';
import styles from './planes.module.css';

// ===== TIPOS =====
interface Plan {
    id: string;
    name: string;
    icon: React.ReactNode;
    priceUsd: number;
    period: string;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
    badge?: string;
}

// ===== PLAN PUNTUAL (post-lanzamiento) =====
const PLAN_LANZAMIENTO: Plan = {
    id: 'lanzamiento',
    name: 'Acompañamiento post-lanzamiento',
    icon: <FaRocket />,
    priceUsd: 1200,
    period: 'pago único',
    description: 'Acompañamiento durante los primeros 90 días, con tareas, canales y tiempos de respuesta definidos antes de empezar.',
    color: 'from-cyan-400 to-cyan-600',
    badge: '🚀 Servicio puntual',
    features: [
        'Monitoreo y alertas según la infraestructura acordada',
        'Correcciones del alcance entregado, según condiciones de la propuesta',
        'Revisión de rendimiento con métricas definidas para el proyecto',
        'Capacitación en las sesiones y temas acordados',
        'Documentación técnica del alcance implementado',
        'Transferencia de código, accesos y operación',
        'Revisión inicial de seguridad con alcance documentado'
    ]
};

// ===== PLANES MENSUALES =====
const PLANS_MENSUALES: Plan[] = [
    {
        id: 'basico',
        name: 'Básico',
        icon: <FaCloudUploadAlt />,
        priceUsd: 150,
        period: '/mes',
        description: 'Mantenimiento preventivo para proyectos pequeños, con soporte acotado y tareas definidas.',
        color: 'from-blue-500 to-blue-600',
        features: [
            'Monitoreo básico de disponibilidad',
            'Actualizaciones de seguridad críticas',
            'Soporte por email: respuesta dentro de 2 días hábiles',
            'Reporte mensual de rendimiento',
            'Respaldos semanales cuando la plataforma y el proveedor lo permiten',
            '1 hora de soporte mensual incluida'
        ],
        badge: 'Para proyectos pequeños'
    },
    {
        id: 'pro',
        name: 'Pro',
        icon: <FaShieldAlt />,
        priceUsd: 350,
        period: '/mes',
        description: 'Seguimiento preventivo y soporte ampliado para proyectos en crecimiento.',
        color: 'from-purple-500 to-accent-purple',
        popular: true,
        features: [
            'Monitoreo automatizado 24/7 con alertas; atención humana según horario acordado',
            'Revisión de actualizaciones de seguridad en ventanas planificadas',
            'Soporte por email y WhatsApp: respuesta dentro de 1 día hábil',
            'Reporte detallado de rendimiento y métricas',
            'Respaldos diarios cuando la plataforma y el proveedor lo permiten',
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
        priceUsd: 600,
        period: '/mes',
        description: 'Plan para operaciones con requisitos de soporte, disponibilidad y escalamiento definidos por contrato.',
        color: 'from-gold-500 to-orange-500',
        features: [
            'Monitoreo automatizado y escalamiento según SLA contratado',
            'Especialistas asignados según alcance y necesidades del proyecto',
            'Canales, cobertura y tiempos de respuesta definidos por contrato',
            'Métricas y reportes acordados para la operación',
            'Frecuencia de respaldos y recuperación según capacidades de la plataforma',
            'Horas de soporte mensuales especificadas en la propuesta',
            'Revisiones de seguridad con frecuencia y alcance definidos',
            'Mejoras de rendimiento priorizadas con métricas acordadas',
            'Instancia de consultoría incluida según propuesta',
            'SLA con objetivos, exclusiones y responsabilidades documentadas'
        ],
        badge: '🏢 Para empresas'
    }
];

// ===== PROPS =====
interface PlanesGridProps {
    usdToArs: number;
    dolarUpdatedAt: string;
    dolarSource: 'api' | 'fallback';
}

export default function PlanesGrid({ usdToArs, dolarUpdatedAt, dolarSource }: PlanesGridProps) {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const whatsappUrl = (message: string) =>
        `https://wa.me/5491138305837?text=${encodeURIComponent(message)}`;

    const formatArs = (usd: number) => {
        return (usd * usdToArs).toLocaleString('es-AR', {
            maximumFractionDigits: 0
        });
    };

    const formatFecha = (iso: string) => {
        try {
            return new Date(iso).toLocaleDateString('es-AR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'fecha desconocida';
        }
    };

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

                {/* ===== SECCIÓN: ACOMPAÑAMIENTO POST-LANZAMIENTO ===== */}
                <section className={styles.sectionGroup}>
                    <div className={styles.sectionLabel}>
                        <span className={styles.sectionLabelLine} />
                        <span className={styles.sectionLabelText}>Servicio puntual</span>
                        <span className={styles.sectionLabelLine} />
                    </div>

                    <div
                        className={`${styles.planCard} ${styles.launchCard}`}
                        onMouseEnter={() => setSelectedPlan('lanzamiento')}
                        onMouseLeave={() => setSelectedPlan(null)}
                    >
                        <Row className="align-items-center g-4">
                            {/* Columna izquierda: info + features */}
                            <Col lg={7}>
                                <div className={styles.launchHeader}>
                                    <div className={`${styles.planIcon} bg-gradient-to-br ${PLAN_LANZAMIENTO.color}`}>
                                        {PLAN_LANZAMIENTO.icon}
                                    </div>
                                    <div>
                                        {PLAN_LANZAMIENTO.badge && (
                                            <span className={styles.planBadge}>{PLAN_LANZAMIENTO.badge}</span>
                                        )}
                                        <h3 className={styles.launchName}>{PLAN_LANZAMIENTO.name}</h3>
                                        <p className={styles.launchDescription}>
                                            {PLAN_LANZAMIENTO.description}
                                        </p>
                                    </div>
                                </div>

                                <ul className={styles.launchFeatures}>
                                    {PLAN_LANZAMIENTO.features.map((feature, index) => (
                                        <li key={index} className={styles.featureItem}>
                                            <span className={styles.featureIcon}>✅</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Col>

                            {/* Columna derecha: precio + botón */}
                            <Col lg={5}>
                                <div className={styles.launchPriceBlock}>
                                    <div className={styles.planPrice}>
                                        <span className={styles.priceAmount}>
                                            USD ${PLAN_LANZAMIENTO.priceUsd}
                                        </span>
                                    </div>
                                    <div className={styles.pricePeriod}>
                                        {PLAN_LANZAMIENTO.period}
                                    </div>
                                    <div className={styles.priceArs}>
                                        ≈ ${formatArs(PLAN_LANZAMIENTO.priceUsd)} ARS
                                    </div>

                                    <a
                                        href={whatsappUrl('Hola, quiero consultar por el Acompañamiento post-lanzamiento de Powa.')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.btnPlan} ${styles.btnLaunch}`}
                                    >
                                        <FaWhatsapp className="me-2" />
                                        Contratar
                                    </a>
                                </div>
                            </Col>
                        </Row>

                        {selectedPlan === 'lanzamiento' && (
                            <div className={styles.planGlow} />
                        )}
                    </div>
                </section>

                {/* ===== SECCIÓN: PLANES MENSUALES ===== */}
                <section className={styles.sectionGroup}>
                    <div className={styles.sectionLabel}>
                        <span className={styles.sectionLabelLine} />
                        <span className={styles.sectionLabelText}>Planes mensuales</span>
                        <span className={styles.sectionLabelLine} />
                    </div>

                    <Row className="g-4">
                        {PLANS_MENSUALES.map((plan) => (
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
                                            <span className={styles.priceAmount}>
                                                USD ${plan.priceUsd}
                                            </span>
                                            <span className={styles.pricePeriod}>{plan.period}</span>
                                        </div>

                                        <div className={styles.priceArs}>
                                            ≈ ${formatArs(plan.priceUsd)} ARS{plan.period}
                                        </div>

                                        <p className={styles.planDescription}>{plan.description}</p>

                                        {plan.badge && (
                                            <span className={styles.planBadge}>{plan.badge}</span>
                                        )}
                                    </div>

                                    <ul className={styles.planFeatures}>
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className={styles.featureItem}>
                                                <span className={styles.featureIcon}>✅</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className={styles.planFooter}>
                                        <a
                                            href={whatsappUrl(`Hola, quiero consultar por el plan ${plan.name} de Powa.`)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${styles.btnPlan} ${plan.id === 'enterprise' ? styles.btnWhatsapp : ''}`}
                                        >
                                            <FaWhatsapp className="me-2" />
                                            {plan.id === 'enterprise' ? 'Consultar' : 'Contratar ahora'}
                                        </a>
                                    </div>

                                    {selectedPlan === plan.id && (
                                        <div className={styles.planGlow} />
                                    )}
                                </div>
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* ===== CARD A MEDIDA ===== */}
                <Row className="justify-content-center mt-5">
                    <Col lg={8} md={10}>
                        <div className={styles.customPlanCard}>
                            <Row className="align-items-center g-3">
                                <Col md={8}>
                                    <h3 className={styles.customPlanTitle}>
                                        ¿Ninguno te encaja?
                                    </h3>
                                    <p className={styles.customPlanText}>
                                        Armamos un plan a medida según las necesidades específicas de tu proyecto. Contanos qué necesitás y te preparamos una propuesta.
                                    </p>
                                </Col>
                                <Col md={4} className="text-md-end">
                                    <a
                                        href={whatsappUrl('Hola, quiero consultar un plan de mantenimiento a medida para mi proyecto.')}
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
                    </Col>
                </Row>

                {/* ===== NOTA AL PIE DE PRECIOS ===== */}
                <div className={styles.priceNote}>
                    <p className={styles.priceNoteText}>
                        * Los precios están expresados en dólares estadounidenses (USD).
                        El valor en pesos argentinos es una referencia calculada al dólar blue
                        (cotización actual: <strong>${usdToArs.toLocaleString('es-AR')} ARS</strong>
                        {dolarSource === 'api' ? (
                            <>, actualizada el {formatFecha(dolarUpdatedAt)}</>
                        ) : (
                            <>, cotización de referencia (no disponible en este momento)</>
                        )}
                        ). El valor final se confirma al momento de la contratación.
                    </p>
                </div>

                {/* ===== COMPARATIVA RÁPIDA ===== */}
                <section className={styles.compareSection}>
                    <h3 className={styles.compareTitle}>
                        <FaShieldVirus className={styles.compareIcon} />
                        ¿Qué queda definido en todos los planes?
                    </h3>
                    <Row className="g-3">
                        <Col md={3} sm={6}>
                            <div className={styles.compareItem}>
                                <FaServer className={styles.compareItemIcon} />
                                <span>Alcance de tareas y plataformas cubiertas</span>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className={styles.compareItem}>
                                <FaShieldAlt className={styles.compareItemIcon} />
                                <span>Canales y tiempos de respuesta</span>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className={styles.compareItem}>
                                <FaClock className={styles.compareItemIcon} />
                                <span>Condiciones de respaldo y disponibilidad</span>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className={styles.compareItem}>
                                <FaChartLine className={styles.compareItemIcon} />
                                <span>Adicionales aprobados antes de ejecutarse</span>
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