'use client';

import React, { useState } from 'react';
import { FaRocket, FaClock, FaMobileAlt, FaDesktop, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import styles from '../app/lab/lab.module.css';

interface VitalsResult {
    lcp: { value: number; status: 'good' | 'needs-improvement' | 'poor' };
    fid: { value: number; status: 'good' | 'needs-improvement' | 'poor' };
    cls: { value: number; status: 'good' | 'needs-improvement' | 'poor' };
    fcp: { value: number; status: 'good' | 'needs-improvement' | 'poor' };
    ttfb: { value: number; status: 'good' | 'needs-improvement' | 'poor' };
}

export default function WebVitalsAnalyzer() {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<VitalsResult | null>(null);
    const [error, setError] = useState('');

    const analyzeUrl = async () => {
        if (!url) {
            setError('Por favor, ingresá una URL válida');
            return;
        }

        setIsLoading(true);
        setError('');
        setResults(null);

        try {
            // Simulamos el análisis (en producción usarías una API real)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Datos simulados para demostración
            const mockResults: VitalsResult = {
                lcp: { value: 1.8 + Math.random() * 2, status: Math.random() > 0.5 ? 'good' : 'needs-improvement' },
                fid: { value: 50 + Math.random() * 150, status: Math.random() > 0.4 ? 'good' : 'needs-improvement' },
                cls: { value: 0.02 + Math.random() * 0.2, status: Math.random() > 0.6 ? 'good' : 'needs-improvement' },
                fcp: { value: 0.8 + Math.random() * 2, status: Math.random() > 0.5 ? 'good' : 'needs-improvement' },
                ttfb: { value: 100 + Math.random() * 500, status: Math.random() > 0.4 ? 'good' : 'needs-improvement' }
            };

            setResults(mockResults);
        } catch (err) {
            setError('Error al analizar la URL. Por favor, intentá de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        if (status === 'good') return <FaCheckCircle className={styles.statusGood} />;
        if (status === 'needs-improvement') return <FaClock className={styles.statusWarning} />;
        return <FaTimesCircle className={styles.statusPoor} />;
    };

    const getStatusText = (status: string) => {
        const labels = {
            'good': '✅ Excelente',
            'needs-improvement': '⚠️ Mejorable',
            'poor': '❌ Crítico'
        };
        return labels[status as keyof typeof labels] || status;
    };

    const getStatusColor = (status: string) => {
        const colors = {
            'good': styles.statusGood,
            'needs-improvement': styles.statusWarning,
            'poor': styles.statusPoor
        };
        return colors[status as keyof typeof colors] || '';
    };

    const metricLabels = {
        lcp: { label: 'Largest Contentful Paint (LCP)', desc: 'Tiempo de carga del contenido principal', unit: 's', good: '< 2.5s' },
        fid: { label: 'First Input Delay (FID)', desc: 'Tiempo de respuesta a interacción', unit: 'ms', good: '< 100ms' },
        cls: { label: 'Cumulative Layout Shift (CLS)', desc: 'Estabilidad visual de la página', unit: '', good: '< 0.1' },
        fcp: { label: 'First Contentful Paint (FCP)', desc: 'Tiempo hasta el primer contenido', unit: 's', good: '< 1.8s' },
        ttfb: { label: 'Time to First Byte (TTFB)', desc: 'Tiempo de respuesta del servidor', unit: 'ms', good: '< 200ms' }
    };

    return (
        <div className={styles.toolContainer}>
            <div className={styles.urlInputWrapper}>
                <div className={styles.inputGroup}>
                    <input
                        type="url"
                        className={styles.formControlPowa}
                        placeholder="https://tusitio.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && analyzeUrl()}
                    />
                    <button
                        onClick={analyzeUrl}
                        className={styles.btnPowaPrimary}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Analizando...' : 'Analizar'}
                    </button>
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>

            {isLoading && (
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner} />
                    <p>Analizando rendimiento de la página...</p>
                </div>
            )}

            {results && (
                <div className={styles.vitalsContainer}>
                    <div className={styles.vitalsHeader}>
                        <FaRocket className={styles.vitalsIcon} />
                        <h4>Resultados del Análisis</h4>
                    </div>

                    <div className={styles.vitalsGrid}>
                        {Object.entries(results).map(([key, metric]) => {
                            const info = metricLabels[key as keyof typeof metricLabels];
                            return (
                                <div key={key} className={styles.vitalCard}>
                                    <div className={styles.vitalHeader}>
                                        <span className={styles.vitalName}>{info.label}</span>
                                        {getStatusIcon(metric.status)}
                                    </div>
                                    <div className={styles.vitalValue}>
                                        <span className={styles.vitalNumber}>
                                            {metric.value.toFixed(2)}{info.unit}
                                        </span>
                                        <span className={`${styles.vitalStatus} ${getStatusColor(metric.status)}`}>
                                            {getStatusText(metric.status)}
                                        </span>
                                    </div>
                                    <div className={styles.vitalMeta}>
                                        <span className={styles.vitalDesc}>{info.desc}</span>
                                        <span className={styles.vitalGood}>Referencia: {info.good}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className={styles.vitalsFooter}>
                        <FaMobileAlt className={styles.vitalsFooterIcon} />
                        <span>Los resultados son simulados para demostración. En producción se usaría Google PageSpeed API.</span>
                    </div>
                </div>
            )}
        </div>
    );
}