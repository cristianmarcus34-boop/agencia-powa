// app/admin/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    FaUsers, FaProjectDiagram, FaUserTie, FaComments,
    FaStar, FaEnvelope, FaHome, FaArrowLeft, FaFileInvoice
} from 'react-icons/fa';
import styles from './admin.module.css';

// ✅ INTERFAZ ACTUALIZADA CON LAS NUEVAS PROPIEDADES
interface DashboardData {
    totalUsuarios: number;
    usuariosActivos: number;
    totalProyectos: number;
    proyectosActivos: number;
    totalClientes: number;
    totalConversaciones: number;
    totalMensajes: number;
    promedioCalificacion: number;
    totalFacturas: number;        // ✅ Agregado
    facturasPendientes: number;   // ✅ Agregado
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
            color: '#3b82f6',
            link: '/admin/usuarios'
        },
        {
            icon: <FaProjectDiagram />,
            value: data?.totalProyectos || 0,
            label: 'Proyectos',
            sub: `${data?.proyectosActivos || 0} activos`,
            color: '#22d3ee',
            link: '/admin/proyectos'
        },
        {
            icon: <FaUserTie />,
            value: data?.totalClientes || 0,
            label: 'Clientes',
            color: '#10b981',
            link: '/admin/clientes'
        },
        {
            icon: <FaFileInvoice />,
            value: data?.totalFacturas || 0,        // ✅ Ahora existe
            label: 'Facturas',
            sub: `${data?.facturasPendientes || 0} pendientes`,  // ✅ Ahora existe
            color: '#f59e0b',
            link: '/admin/facturas'
        },
        {
            icon: <FaComments />,
            value: data?.totalConversaciones || 0,
            label: 'Conversaciones',
            sub: `${data?.totalMensajes || 0} mensajes`,
            color: '#f59e0b',
            link: '/admin/conversaciones'
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
            {/* 🔥 HEADER CON BOTÓN VOLVER */}
            <div style={{
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>📊 Dashboard</h1>
                    <p style={{ color: '#94a3b8' }}>
                        Bienvenido, {session?.user?.name}
                    </p>
                </div>

                {/* 🔥 BOTÓN VOLVER AL INICIO */}
                <Link
                    href="/"
                    className={styles.btnSecondary}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        color: '#e2e8f0',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        fontSize: '14px',
                        fontWeight: 600
                    }}
                >
                    <FaArrowLeft /> Volver al inicio
                </Link>
            </div>

            {/* Tarjetas */}
            <div className={styles.dashboardGrid}>
                {cards.map((card, index) => (
                    card.link ? (
                        <Link
                            key={index}
                            href={card.link}
                            className={styles.dashboardCard}
                            style={{ textDecoration: 'none', cursor: 'pointer' }}
                        >
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
                        </Link>
                    ) : (
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
                    )
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