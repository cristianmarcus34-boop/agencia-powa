// app/admin/layout.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    FaHome, FaUsers, FaProjectDiagram, FaUserTie,
    FaComments, FaChartBar, FaSignOutAlt, FaBars,
    FaChevronLeft, FaChevronRight, FaFileInvoice, FaNewspaper
} from 'react-icons/fa';
import styles from './admin.module.css';
import '../globals.css';

const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, path: '/admin' },
    { name: 'Usuarios', icon: <FaUsers />, path: '/admin/usuarios' },
    { name: 'Clientes', icon: <FaUserTie />, path: '/admin/clientes' },
    { name: 'Proyectos', icon: <FaProjectDiagram />, path: '/admin/proyectos' },
    { name: 'Facturas', icon: <FaFileInvoice />, path: '/admin/facturas' },
    { name: 'Conversaciones', icon: <FaComments />, path: '/admin/conversaciones' },
    { name: 'Métricas', icon: <FaChartBar />, path: '/admin/metricas' },
    { name: 'Blog', icon: <FaNewspaper />, path: '/admin/blog' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login');
        if (session?.user?.rol !== 'admin') router.push('/cliente');
    }, [status, session, router]);

    // Cerrar sidebar móvil al cambiar de página
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Cerrar sidebar móvil al redimensionar a desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMobileOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (status === 'loading') {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando panel...</p>
            </div>
        );
    }

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const toggleMobile = () => setMobileOpen(!mobileOpen);

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/login');
    };

    return (
        <div className={styles.adminContainer}>
            {/* 🔥 MOBILE HEADER - Visible solo en móvil */}
            <header className={styles.mobileHeader}>
                <button onClick={toggleMobile} className={styles.menuButton} aria-label="Abrir menú">
                    <FaBars />
                </button>
                <span className={styles.mobileTitle}>⚡ Admin</span>
                <span className={styles.mobileUser}>
                    {session?.user?.name?.split(' ')[0] || 'Admin'}
                </span>
            </header>

            {/* 🔥 OVERLAY - Para cerrar sidebar en móvil */}
            {mobileOpen && (
                <div
                    className={styles.overlayActive}
                    onClick={toggleMobile}
                />
            )}

            {/* 🔥 SIDEBAR */}
            <aside className={`${styles.sidebar} ${!sidebarOpen ? styles.sidebarCollapsed : ''} ${mobileOpen ? styles.sidebarMobileOpen : ''}`}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>⚡</span>
                        <span className={styles.logoText}>Admin</span>
                    </div>
                    <button onClick={toggleSidebar} className={styles.collapseBtn}>
                        {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
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
                            <span className={styles.navText}>{item.name}</span>
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
                            <span className={styles.userRole}>Administrador</span>
                        </div>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <FaSignOutAlt />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>

            {/* 🔥 MAIN CONTENT */}
            <main className={`${styles.mainContent} ${!sidebarOpen ? styles.mainContentFull : ''}`}>
                <div className={styles.pageContent}>
                    {children}
                </div>

                {/* 🔥 FOOTER DENTRO DEL MAIN (para que no se corte) */}
                <div style={{ marginTop: '24px' }}>
                    {/* Aquí va tu FooterPowa */}
                </div>
            </main>
        </div>
    );
}