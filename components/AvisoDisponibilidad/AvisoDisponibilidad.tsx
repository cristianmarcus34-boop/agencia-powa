'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTimes, FaArrowRight } from 'react-icons/fa';
import styles from './AvisoDisponibilidad.module.css';

export default function AvisoDisponibilidad() {
    const [esVisible, setEsVisible] = useState(false);
    const rutaActual = usePathname();

    useEffect(() => {
        // No mostrar si ya está en la página de contacto o privacidad
        if (rutaActual === '/contact' || rutaActual === '/privacy') {
            setEsVisible(false);
            return;
        }

        // Verificar si el usuario ya cerró la cápsula en esta sesión
        const fueCerrado = sessionStorage.getItem('powa_disponibilidad_cerrada');
        if (fueCerrado) return;

        // Aparece de forma orgánica tras 18 segundos de navegación
        const temporizador = setTimeout(() => {
            setEsVisible(true);
        }, 18000);

        return () => clearTimeout(temporizador);
    }, [rutaActual]);

    const manejarCierre = () => {
        setEsVisible(false);
        sessionStorage.setItem('powa_disponibilidad_cerrada', 'true');
    };

    if (!esVisible) return null;

    return (
        <aside className={styles.contenedorAviso} aria-label="Estado de disponibilidad de la agencia">
            <div className={styles.encabezado}>
                <span className={styles.etiquetaEstado}>
                    <span className={styles.puntoPulso} />
                    Disponibilidad Activa
                </span>
                <button
                    type="button"
                    onClick={manejarCierre}
                    className={styles.botonCerrar}
                    aria-label="Cerrar notificación"
                >
                    <FaTimes />
                </button>
            </div>

            <p className={styles.textoCuerpo}>
                Tenemos <strong>1 cupo abierto</strong> este mes para desarrollo web o apps a medida. Hablemos directo, sin intermediarios.
            </p>

            <Link href="/contact" className={styles.enlaceAccion} onClick={manejarCierre}>
                Reservar diagnóstico <FaArrowRight />
            </Link>
        </aside>
    );
}