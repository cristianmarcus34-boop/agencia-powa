'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import posthog from 'posthog-js';
import {
    FaArrowRight, FaCheckCircle, FaClock, FaUsers, FaChartBar,
    FaRocket, FaCalculator, FaMoneyBillWave,
} from 'react-icons/fa';
import styles from '@/app/page.module.css';

export default function RoiSection() {
    return (
        <section className={styles.roiSection}>
            <Container>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionBadge}>SIMULADOR ORIENTATIVO</span>
                    <h2 className={styles.sectionTitle}>Estimá el impacto de <span className={styles.textGradient}>mejorar tus procesos</span></h2>
                    <p className={styles.sectionSubtitle}>Usá tus propios datos para explorar un escenario posible. El cálculo depende de los supuestos que ingreses y no garantiza ahorros ni ventas.</p>
                </div>
                <Row className="g-4">
                    <Col lg={4} md={6}>
                        <div className={styles.roiCard}>
                            <div className={styles.roiIconWrapper}><FaMoneyBillWave className={styles.roiIcon} style={{ color: '#ef4444' }} /></div>
                            <div className={styles.roiValue} style={{ color: '#ef4444', fontSize: '2rem' }}>¿Cuánto <br />estás perdiendo?</div>
                            <div className={styles.roiLabel}>Detectamos fugas de plata y tiempo</div>
                            <ul className={styles.roiList}>
                                <li><FaClock className={styles.roiListIcon} />Procesos manuales que te comen horas</li>
                                <li><FaUsers className={styles.roiListIcon} />Clientes que se van por mala experiencia</li>
                                <li><FaChartBar className={styles.roiListIcon} />Oportunidades de venta que no aprovechás</li>
                            </ul>
                            <div className={styles.roiFootnote}>*Cada negocio tiene sus propias pérdidas ocultas</div>
                        </div>
                    </Col>
                    <Col lg={4} md={6}>
                        <div className={styles.roiCard}>
                            <div className={styles.roiIconWrapper}><FaRocket className={styles.roiIcon} style={{ color: '#22d3ee' }} /></div>
                            <div className={styles.roiValue} style={{ color: '#22d3ee', fontSize: '2rem' }}>Solución <br />a medida</div>
                            <div className={styles.roiLabel}>Desarrollamos lo que tu negocio necesita</div>
                            <ul className={styles.roiList}>
                                <li><FaCheckCircle className={styles.roiListIcon} style={{ color: '#10b981' }} />Automatización de procesos</li>
                                <li><FaCheckCircle className={styles.roiListIcon} style={{ color: '#10b981' }} />Mejor experiencia para tus clientes</li>
                                <li><FaCheckCircle className={styles.roiListIcon} style={{ color: '#10b981' }} />Paneles de control y estadísticas</li>
                            </ul>
                            <div className={styles.roiFootnote}>Invertís una vez, ganás todos los meses</div>
                        </div>
                    </Col>
                    <Col lg={4} md={6}>
                        <div className={`${styles.roiCard} ${styles.roiCardHighlight}`}>
                            <div className={styles.roiIconWrapper}><FaCalculator className={styles.roiIcon} style={{ color: '#10b981' }} /></div>
                            <div className={styles.roiValue} style={{ color: '#10b981', fontSize: '2rem' }}>Calculá <br />tu ROI</div>
                            <div className={styles.roiLabel}>Resultados personalizados para tu negocio</div>
                            <div className={styles.roiExampleBox}>
                                <div className={styles.roiExampleItem}>
                                    <span className={styles.roiExampleLabel}>Escenario, no promesa</span>
                                    <p className={styles.roiExampleDetail}>El simulador usa los valores que ingreses y explicita el supuesto de recuperación para estimar un posible ahorro.</p>
                                </div>
                            </div>
                            <div className={styles.roiCta}>
                                <button
                                    onClick={() => {
                                        posthog.capture('roi_simulador_abierto', { origen: 'home_seccion_roi' });
                                        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
                                        window.open(`${baseUrl}/lab?tool=roi`, '_blank');
                                    }}
                                    className={styles.roiButtonNeon}
                                >
                                    <FaCalculator className={styles.roiButtonIcon} />
                                    <span>Abrir simulador</span>
                                    <FaArrowRight className={styles.roiButtonIcon} />
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <p className={styles.roiIndustriesNote}>La simulación no reemplaza una medición real ni una cotización del proyecto.</p>
            </Container>
        </section>
    );
}