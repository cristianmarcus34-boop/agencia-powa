// app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

    // 🔥 Redirigir cuando la sesión esté disponible
    useEffect(() => {
        console.log('📋 Status:', status);
        console.log('📋 Session:', session);

        if (status === 'authenticated' && session?.user) {
            console.log('✅ Usuario logueado:', session.user);
            console.log('✅ Rol:', session.user.rol);

            if (session.user.rol === 'admin') {
                router.push('/admin');
            } else {
                router.push('/cliente');
            }
        }
    }, [status, session, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Email o contraseña incorrectos');
            } else {
                // ✅ La redirección la maneja el useEffect
                router.refresh();
            }
        } catch (error) {
            setError('Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Mostrar loading mientras se redirige
    if (status === 'loading') {
        return (
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <p style={{ color: '#fff', textAlign: 'center' }}>Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <h1>Powa Digital</h1>
                    <p>Iniciá sesión para acceder a tu panel</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <button type="submit" disabled={loading} className={styles.loginButton}>
                        {loading ? 'Cargando...' : 'Iniciar sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
}