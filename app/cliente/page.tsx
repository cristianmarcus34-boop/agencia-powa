// app/cliente/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './cliente.module.css';

export default function ClientePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className={styles.clienteContainer}>
            <div className={styles.clienteHeader}>
                <h1 className={styles.clienteTitle}>Panel del Cliente</h1>
                <p className={styles.clienteSubtitle}>Bienvenido, {session?.user?.name}</p>
            </div>

            <div className={styles.dashboardGrid}>
                <div className={styles.dashboardCard}>
                    <span className={styles.cardIcon}>📁</span>
                    <div className={styles.cardValue}>0</div>
                    <div className={styles.cardLabel}>Mis proyectos</div>
                </div>
                <div className={styles.dashboardCard}>
                    <span className={styles.cardIcon}>💬</span>
                    <div className={styles.cardValue}>0</div>
                    <div className={styles.cardLabel}>Conversaciones</div>
                </div>
                <div className={styles.dashboardCard}>
                    <span className={styles.cardIcon}>⭐</span>
                    <div className={styles.cardValue}>0</div>
                    <div className={styles.cardLabel}>Calificaciones</div>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <span className={styles.tableTitle}>Mis proyectos</span>
                </div>
                <div className={styles.emptyState}>
                    No tienes proyectos asignados aún.
                </div>
            </div>
        </div>
    );
}