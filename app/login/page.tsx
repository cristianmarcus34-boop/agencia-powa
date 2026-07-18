// app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import styles from './login.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    // 🔥 Redirigir cuando la sesión esté disponible
    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            const redirectPath = session.user.rol === 'admin' ? '/admin' : '/cliente';
            router.push(redirectPath);
        }
    }, [status, session, router]);

    // 🔥 Cargar email guardado
    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!email || !password) {
            setError('Completa todos los campos');
            setLoading(false);
            return;
        }

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Email o contraseña incorrectos');
                setLoading(false);
                return;
            }

            if (rememberMe) {
                localStorage.setItem('rememberEmail', email);
            } else {
                localStorage.removeItem('rememberEmail');
            }

        } catch (error) {
            setError('Error al iniciar sesión');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Si está cargando o autenticado, mostrar mensaje
    if (status === 'loading') {
        return (
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.loadingWrapper}>
                        <FaSpinner className={styles.spinner} />
                        <p>Cargando...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'authenticated') {
        return (
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.loadingWrapper}>
                        <FaSpinner className={styles.spinner} />
                        <p>Redirigiendo...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                {/* 🔥 BOTÓN VOLVER AL INICIO */}
                <Link href="/" className={styles.backButton}>
                    <FaArrowLeft /> Volver al inicio
                </Link>

                <div className={styles.loginHeader}>
                    <div className={styles.logoIcon}>⚡</div>
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
                            disabled={loading}
                            className={styles.inputField}
                            autoComplete="email"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Contraseña</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={loading}
                                className={styles.inputField}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className={styles.eyeButton}
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className={styles.formOptions}>
                        <label className={styles.rememberMe}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Recordarme
                        </label>
                        {/* 🔥 REDIRIGE A CONTACTO EN LUGAR DE RECUPERAR PASSWORD */}
                        <Link href="/contact" className={styles.forgotPassword}>
                            ¿Problemas para ingresar? Contáctanos
                        </Link>
                    </div>

                    {error && (
                        <div className={styles.errorMessage}>
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={styles.loginButton}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className={styles.buttonSpinner} />
                                Iniciando sesión...
                            </>
                        ) : (
                            'Iniciar sesión'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}