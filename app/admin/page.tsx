// app/admin/page.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
    FaUsers, FaProjectDiagram, FaUserTie, FaComments,
    FaStar, FaHome, FaArrowLeft, FaFileInvoice,
    FaBars, FaSignOutAlt, FaChevronLeft, FaChevronRight,
    FaChartBar, FaNewspaper, FaTasks, FaPlus, FaExclamationTriangle, FaCheckCircle
} from 'react-icons/fa';
import toast from 'react-hot-toast';
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
    totalFacturas: number;
    facturasPendientes: number;
    tareasCriticas?: number;
    ultimasConversaciones: Array<{
        id: string;
        perfil: string;
        estado: string;
        creado_en: string;
    }>;
    actividadPorTipo: Record<string, number>;
}

const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <FaHome /> },
    { path: '/admin/usuarios', label: 'Usuarios', icon: <FaUsers /> },
    { path: '/admin/tareas', label: 'Tareas', icon: <FaTasks /> },
    { path: '/admin/proyectos', label: 'Proyectos', icon: <FaProjectDiagram /> },
    { path: '/admin/clientes', label: 'Clientes', icon: <FaUserTie /> },
    { path: '/admin/facturas', label: 'Facturas', icon: <FaFileInvoice /> },
    { path: '/admin/conversaciones', label: 'Conversaciones', icon: <FaComments /> },
    { path: '/admin/metricas', label: 'Métricas', icon: <FaChartBar /> },
    { path: '/admin/blog', label: 'Blog', icon: <FaNewspaper /> },
];

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login');
        if (session?.user && (session.user as any).rol !== 'admin') router.push('/cliente');
    }, [status, session, router]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/dashboard');
            const result = await res.json();
            if (result.success) {
                setData(result.data);
            } else {
                toast.error(result.error || 'Error al obtener datos del dashboard');
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error('Error de conexión al cargar métricas');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if ((session?.user as any)?.rol === 'admin') {
            fetchData();
        }
    }, [session, fetchData]);

    const handleNavClick = () => {
        if (typeof window !== 'undefined' && window.innerWidth <= 768) {
            setSidebarOpen(false);
        }
    };

    const handleLogout = async () => {
        const toastId = toast.loading('Cerrando sesión...');
        await signOut({ redirect: false });
        toast.success('Sesión cerrada', { id: toastId });
        router.push('/login');
    };

    const cards = useMemo(() => [
        {
            icon: <FaUsers />,
            value: data?.totalUsuarios || 0,
            label: 'Usuarios Registrados',
            sub: `${data?.usuariosActivos || 0} activos en la plataforma`,
            color: '#3b82f6',
            link: '/admin/usuarios'
        },
        {
            icon: <FaProjectDiagram />,
            value: data?.totalProyectos || 0,
            label: 'Proyectos en Agencia',
            sub: `${data?.proyectosActivos || 0} activos actualmente`,
            color: '#22d3ee',
            link: '/admin/proyectos'
        },
        {
            icon: <FaUserTie />,
            value: data?.totalClientes || 0,
            label: 'Empresas Clientes',
            sub: 'Base de datos CRM',
            color: '#10b981',
            link: '/admin/clientes'
        },
        {
            icon: <FaFileInvoice />,
            value: data?.totalFacturas || 0,
            label: 'Facturación / Pagos',
            sub: `${data?.facturasPendientes || 0} pend. de cobro`,
            color: '#f59e0b',
            link: '/admin/facturas'
        },
        {
            icon: <FaComments />,
            value: data?.totalConversaciones || 0,
            label: 'Interacciones IA',
            sub: `${data?.totalMensajes || 0} mensajes procesados`,
            color: '#8b5cf6',
            link: '/admin/conversaciones'
        },
        {
            icon: <FaStar />,
            value: data?.promedioCalificacion ? `${data.promedioCalificacion} / 5` : '—',
            label: 'Calificación Promedio',
            sub: 'Feedback de clientes',
            color: '#eab308'
        },
    ], [data]);

    if (status === 'loading' || (loading && !data)) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando panel de control...</p>
            </div>
        );
    }

    return (
        <div className={styles.adminContainer}>
            {/* Header Mobile */}
            <header className={styles.mobileHeader}>
                <button
                    className={styles.menuButton}
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Abrir menú"
                >
                    <FaBars />
                </button>
                <span className={styles.mobileTitle}>⚡ Powa Admin</span>
                <span className={styles.mobileUser}>
                    {session?.user?.name?.split(' ')[0] || 'Admin'}
                </span>
            </header>

            {/* Overlay Mobile */}
            {sidebarOpen && (
                <div
                    className={styles.overlayActive}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Lateral */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarMobileOpen : ''} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>⚡</span>
                        <span className={styles.logoText}>Powa Admin</span>
                    </div>
                    <button
                        className={styles.collapseBtn}
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        aria-label={sidebarCollapsed ? 'Expandir' : 'Colapsar'}
                    >
                        {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                    </button>
                </div>

                <nav className={styles.sidebarNav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${styles.navItem} ${item.path === '/admin' ? styles.navItemActive : ''}`}
                            onClick={handleNavClick}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span className={styles.navText}>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>
                            {session?.user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className={styles.userDetails}>
                            <span className={styles.userName}>{session?.user?.name || 'Admin'}</span>
                            <span className={styles.userRole}>{(session?.user as any)?.rol || 'admin'}</span>
                        </div>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <FaSignOutAlt />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>

            {/* Contenido Principal */}
            <main className={`${styles.mainContent} ${sidebarCollapsed ? styles.mainContentFull : ''}`}>
                <div className={styles.pageContent}>

                    {/* Top Bar Executive */}
                    <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px', color: '#ffffff' }}>📊 Dashboard Ejecutivo</h1>
                            <p style={{ color: '#94a3b8' }}>
                                Hola <strong>{session?.user?.name}</strong>, aquí tenés la actividad general de Agencia Powa.
                            </p>
                        </div>

                        {/* Atajos Rápidos */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <Link href="/admin/tareas" className={styles.btnPrimary} style={{ fontSize: '13px', padding: '8px 14px' }}>
                                <FaPlus style={{ marginRight: '6px' }} /> Nueva Tarea
                            </Link>
                            <Link href="/admin/proyectos" className={styles.btnPrimary} style={{ fontSize: '13px', padding: '8px 14px', background: 'linear-gradient(135deg, #22d3ee, #3b82f6)' }}>
                                <FaPlus style={{ marginRight: '6px' }} /> Nuevo Proyecto
                            </Link>
                            <Link href="/" className={styles.btnSecondary} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', fontSize: '13px' }}>
                                <FaArrowLeft /> Web Principal
                            </Link>
                        </div>
                    </div>

                    {/* Banner Alerta de Operaciones */}
                    {(data?.facturasPendientes || 0) > 0 && (
                        <div style={{
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.25)',
                            padding: '14px 20px',
                            borderRadius: '12px',
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            flexWrap: 'wrap'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <FaExclamationTriangle style={{ color: '#f59e0b', fontSize: '20px' }} />
                                <div>
                                    <strong style={{ color: '#ffffff', fontSize: '14px' }}>Atención en Facturación</strong>
                                    <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
                                        Tenés <strong>{data?.facturasPendientes}</strong> facturas pendientes de cobro o revisión.
                                    </p>
                                </div>
                            </div>
                            <Link href="/admin/facturas" style={{ color: '#f59e0b', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                                Revisar Facturas →
                            </Link>
                        </div>
                    )}

                    {/* Dashboard Cards Grid */}
                    <div className={styles.dashboardGrid} style={{ marginBottom: '28px' }}>
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
                                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
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
                                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                                            {card.sub}
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                    </div>

                    {/* Grilla de Actividad e Interacciones */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>

                        {/* Últimas conversaciones */}
                        <div className={styles.tableContainer}>
                            <div className={styles.tableHeader} style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className={styles.tableTitle} style={{ fontWeight: 700, fontSize: '15px' }}>💬 Últimas Consultas e IA</span>
                                <Link href="/admin/conversaciones" style={{ fontSize: '12px', color: '#3b82f6', textDecoration: 'none' }}>Ver todas</Link>
                            </div>
                            {data?.ultimasConversaciones && data.ultimasConversaciones.length > 0 ? (
                                <div style={{ overflowX: 'auto' }}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Perfil / Cliente</th>
                                                <th>Estado</th>
                                                <th>Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.ultimasConversaciones.map((conv) => (
                                                <tr key={conv.id}>
                                                    <td style={{ fontWeight: 600, color: '#ffffff' }}>{conv.perfil || 'Usuario Anónimo'}</td>
                                                    <td>
                                                        <span style={{
                                                            padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                                                            background: conv.estado === 'activo' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                                                            color: conv.estado === 'activo' ? '#22c55e' : '#94a3b8'
                                                        }}>
                                                            {conv.estado}
                                                        </span>
                                                    </td>
                                                    <td style={{ fontSize: '12px', color: '#94a3b8' }}>
                                                        {new Date(conv.creado_en).toLocaleDateString('es-AR')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                                    No hay conversaciones registradas recientemente.
                                </div>
                            )}
                        </div>

                        {/* Métrica de eventos y sistema */}
                        <div className={styles.tableContainer}>
                            <div className={styles.tableHeader} style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className={styles.tableTitle} style={{ fontWeight: 700, fontSize: '15px' }}>📈 Métricas del Sistema (7 días)</span>
                                <Link href="/admin/metricas" style={{ fontSize: '12px', color: '#3b82f6', textDecoration: 'none' }}>Ver detalle</Link>
                            </div>
                            <div style={{ padding: '20px' }}>
                                {data?.actividadPorTipo && Object.keys(data.actividadPorTipo).length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {Object.entries(data.actividadPorTipo).map(([tipo, count]) => (
                                            <div key={tipo} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '10px 14px',
                                                background: 'rgba(255,255,255,0.02)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255,255,255,0.03)'
                                            }}>
                                                <span style={{ color: '#cbd5e1', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <FaCheckCircle style={{ color: '#22c55e', fontSize: '12px' }} />
                                                    {tipo === 'inicio_chat' ? '🚀 Sesiones de Chat' :
                                                        tipo === 'mensaje' ? '💬 Mensajes Recibidos' :
                                                            tipo === 'satisfaccion' ? '⭐ Reseñas Enviadas' :
                                                                tipo === 'acierto_cache' ? '⚡ Caché Hit' :
                                                                    tipo === 'fallo_cache' ? '❌ Caché Miss' : tipo}
                                                </span>
                                                <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '14px' }}>{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>
                                        Sin actividad o logs registrados en los últimos días.
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}