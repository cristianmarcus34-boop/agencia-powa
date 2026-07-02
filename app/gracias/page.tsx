'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaRocket, FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import styles from './gracias.module.css';

export default function GraciasPage() {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.graciasWrapper}>
            {/* Efectos de fondo */}
            <div className={styles.ambientGlow} />
            <div className={styles.ambientGlowSecondary} />

            <div className={styles.graciasContainer}>
                {/* Icono principal con animación */}
                <div className={styles.iconWrapper}>
                    <div className={styles.iconPulse} />
                    <div className={styles.iconRing} />
                    <span className={styles.iconMain}>🎯</span>
                </div>

                {/* Título y descripción */}
                <h1 className={styles.title}>
                    ¡Diagnóstico <span className={styles.textGradient}>solicitado</span>!
                </h1>

                <p className={styles.description}>
                    Te contactaremos en las próximas <strong>24hs</strong> con el análisis completo de tu plataforma.
                </p>

                {/* Beneficios / Próximos pasos */}
                <div className={styles.nextSteps}>
                    <h3 className={styles.nextStepsTitle}>📋 ¿Qué sigue?</h3>
                    <ul className={styles.nextStepsList}>
                        <li>
                            <FaCheckCircle className={styles.nextStepsIcon} />
                            <span>Analizaremos tu sitio web en profundidad</span>
                        </li>
                        <li>
                            <FaCheckCircle className={styles.nextStepsIcon} />
                            <span>Identificaremos cuellos de botella y oportunidades</span>
                        </li>
                        <li>
                            <FaCheckCircle className={styles.nextStepsIcon} />
                            <span>Te enviaremos un informe detallado con recomendaciones</span>
                        </li>
                    </ul>
                </div>

                {/* Acciones */}
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

                {/* Contador de redirección automática */}
                <p className={styles.autoRedirect}>
                    Serás redirigido automáticamente en {countdown} segundos
                </p>
            </div>
        </div>
    );
}