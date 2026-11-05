'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import {
    FaCode, FaCheckCircle, FaSyncAlt, FaUser, FaWhatsapp, FaRocket,
} from 'react-icons/fa';
import styles from '@/app/page.module.css';

export default function DolarSection() {
    const [dolarVenta, setDolarVenta] = useState<number>(1488.27);
    const [dolarFecha, setDolarFecha] = useState<string>('');
    const [loadingDolar, setLoadingDolar] = useState<boolean>(true);
    const [errorDolar, setErrorDolar] = useState<boolean>(false);
    const [moneda, setMoneda] = useState<'ARS' | 'USD'>('ARS');

    useEffect(() => {
        async function fetchDolar() {
            try {
                const response = await fetch('https://dolarapi.com/v1/dolares/oficial');
                const data = await response.json();
                if (data && data.venta) {
                    setDolarVenta(data.venta);
                    setDolarFecha(data.fechaActualizacion || new Date().toISOString());
                    setErrorDolar(false);
                }
            } catch (error) {
                console.error('Error al obtener la cotización del dólar:', error);
                setErrorDolar(true);
            } finally {
                setLoadingDolar(false);
            }
        }
        fetchDolar();
        const interval = setInterval(fetchDolar, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const formatearPrecio = (valorUSD: number): string => {
        if (moneda === 'USD') {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(valorUSD);
        }
        const valorARS = valorUSD * dolarVenta;
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(valorARS);
    };

    const formatearPrecioCorto = (valorUSD: number): string => {
        const valor = moneda === 'USD' ? valorUSD : valorUSD * dolarVenta;
        const simbolo = moneda === 'USD' ? 'US$' : '$';
        if (valor >= 1_000_000) return `${simbolo} ${(valor / 1_000_000).toFixed(1).replace('.', ',')}M`;
        return `${simbolo} ${new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(valor)}`;
    };

    const formatearFecha = (iso: string): string => {
        try {
            return new Date(iso).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        } catch {
            return '';
        }
    };

    const preciosBase = useMemo(() => ({
        perfiles: [
            { id: 'junior', label: 'Junior', badge: '🌱', rangoUSD: [8, 15], exp: '0-2 años', destacado: false },
            { id: 'semi', label: 'Semi-Senior', badge: '⚡', rangoUSD: [15, 30], exp: '2-5 años', destacado: true },
            { id: 'senior', label: 'Senior', badge: '🔥', rangoUSD: [30, 50], exp: '5-8 años', destacado: false, senior: true },
            { id: 'agencia', label: 'Agencia', badge: '🏢', rangoUSD: [50, 90], exp: 'Equipo completo', destacado: false },
        ],
        proyectos: [
            { id: 'landing', nombre: 'Landing Page', rangos: { junior: [200, 400], semi: [400, 700], senior: [700, 1200], agencia: [1200, 2000] }, destacado: false },
            { id: 'inst', nombre: 'Sitio Institucional', rangos: { junior: [500, 900], semi: [900, 1500], senior: [1500, 2500], agencia: [2500, 4000] }, destacado: false },
            { id: 'ecom', nombre: 'E-commerce', rangos: { junior: [800, 1500], semi: [1500, 2800], senior: [2800, 4500], agencia: [4500, 7000] }, destacado: false },
            { id: 'saas', nombre: 'SaaS / Web App', rangos: { junior: [1500, 3000], semi: [3000, 6000], senior: [6000, 12000], agencia: [12000, 25000] }, destacado: true },
            { id: 'dash', nombre: 'Dashboard Admin', rangos: { junior: [1000, 2000], semi: [2000, 4000], senior: [4000, 7000], agencia: [7000, 12000] }, destacado: false },
        ],
    }), []);

    return (
        <section className={styles.budgetMatchSection}>
            <Container>
                <div className={styles.budgetMatchContainer}>
                    <Row className="align-items-center g-5">
                        <Col lg={6}>
                            <div className={styles.budgetContent}>
                                <span className={styles.sectionBadge}>INVERSIÓN Y ALCANCE</span>
                                <h2 className={styles.budgetTitle}>Una propuesta clara, <span className={styles.textGradient}>sin sorpresas.</span></h2>
                                <p className={styles.budgetSubtitle}>Primero entendemos el objetivo y definimos entregables, etapas y tiempos. Después cotizamos el alcance acordado; no prometemos resultados que todavía no medimos.</p>
                                <div className={styles.budgetFeatures}>
                                    <div className={styles.budgetFeature}><FaCheckCircle className={styles.budgetFeatureIcon} /><div><h4>Planes flexibles</h4><p>Desde proyectos chicos hasta soluciones enterprise. Nos adaptamos a tu realidad, no al revés.</p></div></div>
                                    <div className={styles.budgetFeature}><FaCheckCircle className={styles.budgetFeatureIcon} /><div><h4>Entregas escalonadas</h4><p>No necesitás toda la plata por adelantado. Dividimos el proyecto en fases para que inviertas a tu ritmo.</p></div></div>
                                    <div className={styles.budgetFeature}><FaCheckCircle className={styles.budgetFeatureIcon} /><div><h4>Expectativas transparentes</h4><p>Separamos lo que incluye el desarrollo de los resultados que dependen de tu mercado, tus datos y la implementación.</p></div></div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className={styles.budgetVisual}>
                                <div className={styles.budgetCard}>
                                    <div className={styles.budgetCardHeader}>
                                        <div className={styles.budgetCardHeaderTop}>
                                            <span className={styles.budgetCardBadge}>REFERENCIA ORIENTATIVA</span>
                                            <div className={styles.budgetToggle}>
                                                <button type="button" className={`${styles.budgetToggleBtn} ${moneda === 'ARS' ? styles.budgetToggleActive : ''}`} onClick={() => setMoneda('ARS')} aria-pressed={moneda === 'ARS'}>ARS</button>
                                                <button type="button" className={`${styles.budgetToggleBtn} ${moneda === 'USD' ? styles.budgetToggleActive : ''}`} onClick={() => setMoneda('USD')} aria-pressed={moneda === 'USD'}>USD</button>
                                            </div>
                                        </div>
                                        <h3 className={styles.budgetCardTitle}>Rangos estimados de desarrollo</h3>
                                        <p className={styles.budgetCardSubtitle}>Rangos generales por perfil y tipo de proyecto; no son tarifas de Powa ni una cotización.</p>
                                        <div className={styles.budgetRateBox}>
                                            <div className={styles.budgetRateLeft}>
                                                <FaSyncAlt className={styles.budgetRateIcon} />
                                                <div className={styles.budgetRateInfo}>
                                                    <span className={styles.budgetRateLabel}>Dólar oficial</span>
                                                    <span className={styles.budgetRateValue}>{loadingDolar ? 'Cargando...' : `$ ${new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(dolarVenta)}`}</span>
                                                </div>
                                            </div>
                                            <div className={styles.budgetRateRight}>
                                                {errorDolar ? (<span className={styles.budgetRateError}>⚠ Valor de respaldo</span>) : (<><span className={styles.budgetRateUpdatedLabel}>Actualizado</span><span className={styles.budgetRateUpdatedValue}>{formatearFecha(dolarFecha)}</span></>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.budgetCardBody}>
                                        <div className={styles.budgetProfiles}>
                                            {preciosBase.perfiles.map((perfil) => (
                                                <div key={perfil.id} className={`${styles.budgetProfileCard} ${perfil.destacado ? styles.budgetProfileActive : ''} ${perfil.senior ? styles.budgetProfileSenior : ''}`}>
                                                    <span className={styles.budgetProfileBadge}>{perfil.badge} {perfil.label}</span>
                                                    <div className={styles.budgetProfileRange}><span className={styles.budgetProfilePrice}>{formatearPrecio(perfil.rangoUSD[0])}</span><span className={styles.budgetProfileSeparator}>—</span><span className={styles.budgetProfilePrice}>{formatearPrecio(perfil.rangoUSD[1])}</span></div>
                                                    <span className={styles.budgetProfileLabel}>por hora</span>
                                                    <div className={styles.budgetProfileTag}><FaUser className={styles.budgetProfileIcon} />{perfil.exp}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={styles.budgetProjectTable}>
                                            <h4 className={styles.budgetTableTitle}><FaCode className={styles.budgetTableIcon} />Precios estimados por proyecto</h4>
                                            <div className={styles.budgetTable}>
                                                <div className={styles.budgetTableHeader}>
                                                    <div className={styles.budgetTableHeaderCell}>Proyecto</div>
                                                    <div className={styles.budgetTableHeaderCell}>🌱 Junior</div>
                                                    <div className={styles.budgetTableHeaderCell}>⚡ Semi-Senior</div>
                                                    <div className={styles.budgetTableHeaderCell}>🔥 Senior</div>
                                                    <div className={styles.budgetTableHeaderCell}>🏢 Agencia</div>
                                                </div>
                                                {preciosBase.proyectos.map((proy) => (
                                                    <div key={proy.id} className={`${styles.budgetTableRow} ${proy.destacado ? styles.budgetTableHighlight : ''}`}>
                                                        <div className={styles.budgetTableCell}>{proy.nombre}</div>
                                                        <div className={styles.budgetTableCell}>{formatearPrecioCorto(proy.rangos.junior[0])} - {formatearPrecioCorto(proy.rangos.junior[1])}</div>
                                                        <div className={styles.budgetTableCell}>{formatearPrecioCorto(proy.rangos.semi[0])} - {formatearPrecioCorto(proy.rangos.semi[1])}</div>
                                                        <div className={styles.budgetTableCell}>{formatearPrecioCorto(proy.rangos.senior[0])} - {formatearPrecioCorto(proy.rangos.senior[1])}</div>
                                                        <div className={styles.budgetTableCell}>{formatearPrecioCorto(proy.rangos.agencia[0])} - {formatearPrecioCorto(proy.rangos.agencia[1])}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className={styles.budgetTableLegend}>
                                                <span className={styles.budgetLegendItem}><span className={styles.budgetLegendDot} style={{ background: '#94a3b8' }} />Junior</span>
                                                <span className={styles.budgetLegendItem}><span className={styles.budgetLegendDot} style={{ background: '#3b82f6' }} />Semi-Senior</span>
                                                <span className={styles.budgetLegendItem}><span className={styles.budgetLegendDot} style={{ background: '#8b5cf6' }} />Senior</span>
                                                <span className={styles.budgetLegendItem}><span className={styles.budgetLegendDot} style={{ background: '#f59e0b' }} />Agencia</span>
                                            </div>
                                            <p className={styles.budgetDisclaimer}>* Valores orientativos. Cada proyecto se cotiza según alcance, complejidad e integraciones.</p>
                                        </div>
                                        <div className={styles.budgetCtaBox}>
                                            <div className={styles.budgetCtaContent}>
                                                <FaWhatsapp className={styles.budgetCtaIcon} />
                                                <div><p className={styles.budgetCtaText}>¿Buscás los precios de Powa?<strong> Consultá los valores base por tipo de desarrollo.</strong></p></div>
                                            </div>
                                            <Link href="/planes/servicios/desarrollo" className={styles.budgetCtaButton}>Ver precios de desarrollo <FaRocket className={styles.budgetCtaArrow} /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
}