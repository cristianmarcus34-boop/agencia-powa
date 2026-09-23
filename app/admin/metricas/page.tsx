// app/admin/metricas/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../admin.module.css';

interface MetricData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
    }>;
}

export default function MetricasPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [metrics, setMetrics] = useState<MetricData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/login');
        } else if (status === 'authenticated' && session?.user?.rol !== 'admin') {
            router.replace('/cliente');
        }
    }, [status, session, router]);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch('/api/admin/metrics');
                const result = await res.json();
                if (result.success) {
                    setMetrics(result.data);
                }
            } catch (error) {
                console.error('Error al cargar métricas:', error);
            } finally {
                setLoading(false);
            }
        };

        if (status === 'authenticated' && session?.user?.rol === 'admin') {
            fetchMetrics();
        }
    }, [status, session]);

    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando métricas...</p>
            </div>
        );
    }

    if (status === 'unauthenticated' || session?.user?.rol !== 'admin') {
        return null;
    }

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>📈 Métricas detalladas</h1>
                <p style={{ color: '#94a3b8' }}>Análisis de actividad de los últimos 7 días</p>
            </div>

            {/* Vista de Resumen / Tarjetas Rápidas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {metrics?.datasets.map((ds, i) => {
                    const total = ds.data.reduce((acc, val) => acc + (val || 0), 0);
                    return (
                        <div key={i} className={styles.tableContainer} style={{ padding: '20px' }}>
                            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px' }}>{ds.label} (Total)</p>
                            <h3 style={{ fontSize: '28px', fontWeight: 700 }}>{total}</h3>
                        </div>
                    );
                })}
            </div>

            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <span className={styles.tableTitle}>📊 Actividad por día</span>
                </div>
                <div style={{ padding: '20px', overflowX: 'auto' }}>
                    {metrics && metrics.labels.length > 0 ? (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Día</th>
                                    {metrics.datasets.map((ds, i) => (
                                        <th key={i}>{ds.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.labels.map((dia, idx) => (
                                    <tr key={idx}>
                                        <td style={{ fontWeight: 500 }}>{dia}</td>
                                        {metrics.datasets.map((ds, i) => (
                                            <td key={i}>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                                }}>
                                                    {ds.data[idx] || 0}
                                                </span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
                            No hay datos de métricas disponibles para mostrar.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}