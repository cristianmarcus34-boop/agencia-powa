'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaRocket, FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import styles from './gracias-contacto.module.css';

export default function GraciasContactoPage() {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.graciasWrapper}>
            <div className={styles.ambientGlow} />
            <div className={styles.ambientGlowSecondary} />

            <div className={styles.graciasContainer}>
                <div className={styles.iconWrapper}>
                    <div className={styles.iconPulse} />
                    <div className={styles.iconRing} />
                    <span className={styles.iconMain}>🚀</span>
                </div>

                <h1 className={styles.title}>
                    ¡Proyecto <span className={styles.textGradient}>recibido</span>!
                </h1>

                <p className={styles.description}>
                    Tu consulta ha sido enviada con éxito. En <strong>menos de 24hs</strong> te contactaremos para agendar una reunión y empezar a trabajar en tu proyecto.
                </p>

                <div className={styles.nextSteps}>
                    <h3 className={styles.nextStepsTitle}>📋 ¿Qué sigue?</h3>
                    <ul className={styles.nextStepsList}>
                        <li>
                            <FaCheckCircle className={styles.nextStepsIcon} />
                            <span>Revisaremos tu solicitud en detalle</span>
                        </li>
                        <li>
                            <FaCheckCircle className={styles.nextStepsIcon} />
                            <span>Analizaremos los requisitos de tu proyecto</span>
                        </li>
                        <li>
                            <FaCheckCircle className={styles.nextStepsIcon} />
                            <span>Te contactaremos para coordinar una reunión</span>
                        </li>
                    </ul>
                </div>

                <div className={styles.actions}>
                    <Link href="/" className={styles.btnPrimary}>
                        Volver al inicio
                        <FaArrowRight className={styles.btnIcon} />
                    </Link>

                    <a
                        href="https://wa.me/5491138305837"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnWhatsapp}
                    >
                        <FaWhatsapp className={styles.btnIcon} />
                        Contactar por WhatsApp
                    </a>
                </div>

                <p className={styles.autoRedirect}>
                    Serás redirigido automáticamente en {countdown} segundos
                </p>
            </div>
        </div>
    );
}