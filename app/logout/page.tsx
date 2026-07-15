// app/logout/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaSpinner, FaCheckCircle, FaHome } from 'react-icons/fa';
import styles from './logout.module.css';

export default function LogoutPage() {
    const { status } = useSession();
    const router = useRouter();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (status === 'unauthenticated') {
            // Si ya no está autenticado, redirigir al inicio después de 3 segundos
            const timer = setTimeout(() => {
                router.push('/');
            }, 3000);
            return () => clearTimeout(timer);
        }

        if (status === 'authenticated') {
            // Cerrar sesión automáticamente
            signOut({ redirect: false });
        }
    }, [status, router]);

    // Contador para redirección
    useEffect(() => {
        if (status === 'unauthenticated') {
            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [status]);

    if (status === 'loading') {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.iconWrapper}>
                        <FaSpinner className={styles.spinner} />
                    </div>
                    <h1 className={styles.title}>Cerrando sesión...</h1>
                    <p className={styles.description}>Esperá un momento, por favor.</p>
                </div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.iconWrapperSuccess}>
                        <FaCheckCircle className={styles.successIcon} />
                    </div>
                    <h1 className={styles.title}>¡Sesión cerrada!</h1>
                    <p className={styles.description}>
                        Has cerrado sesión correctamente. Serás redirigido en {countdown} segundos.
                    </p>
                    <Link href="/" className={styles.button}>
                        <FaHome className={styles.buttonIcon} />
                        Volver al inicio ahora
                    </Link>
                </div>
            </div>
        );
    }

    // Si está autenticado, mostrar loading mientras se cierra la sesión
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconWrapper}>
                    <FaSpinner className={styles.spinner} />
                </div>
                <h1 className={styles.title}>Cerrando sesión...</h1>
                <p className={styles.description}>Esperá un momento, por favor.</p>
            </div>
        </div>
    );
}