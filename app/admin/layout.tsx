// app/admin/layout.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    FaHome, FaUsers, FaProjectDiagram, FaUserTie,
    FaComments, FaChartBar, FaSignOutAlt, FaBars,
    FaTimes, FaCog, FaDatabase, FaFileInvoice
} from 'react-icons/fa';
import styles from './admin.module.css';

const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, path: '/admin' },
    { name: 'Usuarios', icon: <FaUsers />, path: '/admin/usuarios' },
    { name: 'Clientes', icon: <FaUserTie />, path: '/admin/clientes' },
    { name: 'Proyectos', icon: <FaProjectDiagram />, path: '/admin/proyectos' },
    { name: 'Facturas', icon: <FaFileInvoice />, path: '/admin/facturas' },  // ✅ NUEVO
    { name: 'Conversaciones', icon: <FaComments />, path: '/admin/conversaciones' },
    { name: 'Métricas', icon: <FaChartBar />, path: '/admin/metricas' },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
        if (session?.user?.rol !== 'admin') {
            router.push('/cliente');
        }
    }, [status, session, router]);

    if (status === 'loading') {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando panel...</p>
            </div>
        );
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleMobile = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={styles.adminContainer}>
            {/* Mobile Header */}
            <header className={styles.mobileHeader}>
                <button onClick={toggleMobile} className={styles.menuButton}>
                    <FaBars />
                </button>
                <span className={styles.mobileTitle}>Powa Admin</span>
                <div className={styles.mobileUser}>
                    <span>{session?.user?.name?.split(' ')[0]}</span>
                </div>
            </header>

            {/* Sidebar Overlay (Mobile) */}
            {mobileOpen && (
                <div className={styles.overlay} onClick={toggleMobile}></div>
            )}

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${!sidebarOpen ? styles.sidebarCollapsed : ''} ${mobileOpen ? styles.sidebarMobileOpen : ''}`}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>⚡</span>
                        {sidebarOpen && <span className={styles.logoText}>Powa Admin</span>}
                    </div>
                    <button onClick={toggleSidebar} className={styles.collapseBtn}>
                        {sidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                <nav className={styles.sidebarNav}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${styles.navItem} ${pathname === item.path ? styles.navItemActive : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            {sidebarOpen && <span className={styles.navText}>{item.name}</span>}
                        </Link>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>
                            {session?.user?.name?.charAt(0) || 'A'}
                        </div>
                        {sidebarOpen && (
                            <div className={styles.userDetails}>
                                <span className={styles.userName}>{session?.user?.name}</span>
                                <span className={styles.userRole}>Administrador</span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => router.push('/api/auth/signout')}
                        className={styles.logoutBtn}
                    >
                        <FaSignOutAlt />
                        {sidebarOpen && <span>Cerrar sesión</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`${styles.mainContent} ${!sidebarOpen ? styles.mainContentFull : ''}`}>
                <div className={styles.pageContent}>
                    {children}
                </div>
            </main>
        </div>
    );
}