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
            router.push('/login');
        }
        if (session?.user?.rol !== 'admin') {
            router.push('/cliente');
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
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user?.rol === 'admin') {
            fetchMetrics();
        }
    }, [session]);

    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando métricas...</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>📈 Métricas detalladas</h1>
                <p style={{ color: '#94a3b8' }}>Análisis de actividad de los últimos 7 días</p>
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
                                        <td>{dia}</td>
                                        {metrics.datasets.map((ds, i) => (
                                            <td key={i}>{ds.data[idx] || 0}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>
                            No hay datos de métricas disponibles
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}