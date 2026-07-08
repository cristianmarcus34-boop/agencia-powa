// app/admin/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    FaUsers, FaProjectDiagram, FaUserTie, FaComments,
    FaStar, FaEnvelope
} from 'react-icons/fa';
import styles from './admin.module.css';

interface DashboardData {
    totalUsuarios: number;
    usuariosActivos: number;
    totalProyectos: number;
    proyectosActivos: number;
    totalClientes: number;
    totalConversaciones: number;
    totalMensajes: number;
    promedioCalificacion: number;
    ultimasConversaciones: Array<{
        id: string;
        perfil: string;
        estado: string;
        creado_en: string;
    }>;
    actividadPorTipo: Record<string, number>;
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
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
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/dashboard');
                const result = await res.json();
                if (result.success) {
                    setData(result.data);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user?.rol === 'admin') {
            fetchData();
        }
    }, [session]);

    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando panel...</p>
            </div>
        );
    }

    // Tarjetas principales
    const cards = [
        {
            icon: <FaUsers />,
            value: data?.totalUsuarios || 0,
            label: 'Usuarios',
            sub: `${data?.usuariosActivos || 0} activos`,
            color: '#3b82f6'
        },
        {
            icon: <FaProjectDiagram />,
            value: data?.totalProyectos || 0,
            label: 'Proyectos',
            sub: `${data?.proyectosActivos || 0} activos`,
            color: '#22d3ee'
        },
        {
            icon: <FaUserTie />,
            value: data?.totalClientes || 0,
            label: 'Clientes',
            color: '#10b981'
        },
        {
            icon: <FaComments />,
            value: data?.totalConversaciones || 0,
            label: 'Conversaciones',
            sub: `${data?.totalMensajes || 0} mensajes`,
            color: '#f59e0b'
        },
        {
            icon: <FaStar />,
            value: data?.promedioCalificacion || '—',
            label: 'Calificación promedio',
            color: '#8b5cf6'
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>📊 Dashboard</h1>
                <p style={{ color: '#94a3b8' }}>
                    Bienvenido, {session?.user?.name}
                </p>
            </div>

            {/* Tarjetas */}
            <div className={styles.dashboardGrid}>
                {cards.map((card, index) => (
                    <div key={index} className={styles.dashboardCard}>
                        <span className={styles.cardIcon} style={{ color: card.color }}>
                            {card.icon}
                        </span>
                        <div className={styles.cardValue}>{card.value}</div>
                        <div className={styles.cardLabel}>{card.label}</div>
                        {card.sub && (
                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                                {card.sub}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Actividad reciente */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                {/* Últimas conversaciones */}
                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <span className={styles.tableTitle}>💬 Últimas conversaciones</span>
                    </div>
                    {data?.ultimasConversaciones && data.ultimasConversaciones.length > 0 ? (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Perfil</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.ultimasConversaciones.map((conv: any) => (
                                    <tr key={conv.id}>
                                        <td>{conv.perfil}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${conv.estado === 'activo' ? styles.statusActive :
                                                    conv.estado === 'cerrado' ? styles.statusInactive :
                                                        styles.statusPending
                                                }`}>
                                                {conv.estado}
                                            </span>
                                        </td>
                                        <td>{new Date(conv.creado_en).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                            No hay conversaciones recientes
                        </div>
                    )}
                </div>

                {/* Resumen de actividad */}
                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <span className={styles.tableTitle}>📈 Actividad (7 días)</span>
                    </div>
                    <div style={{ padding: '20px' }}>
                        {data?.actividadPorTipo && Object.keys(data.actividadPorTipo).length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {Object.entries(data.actividadPorTipo).map(([tipo, count]) => (
                                    <div key={tipo} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '8px 12px',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '8px'
                                    }}>
                                        <span style={{ color: '#94a3b8' }}>
                                            {tipo === 'inicio_chat' ? '🚀 Inicios de chat' :
                                                tipo === 'mensaje' ? '💬 Mensajes' :
                                                    tipo === 'satisfaccion' ? '⭐ Calificaciones' :
                                                        tipo === 'acierto_cache' ? '⚡ Aciertos caché' :
                                                            tipo === 'fallo_cache' ? '❌ Fallos caché' : tipo}
                                        </span>
                                        <span style={{ color: '#ffffff', fontWeight: 600 }}>{count}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '10px' }}>
                                Sin actividad reciente
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}