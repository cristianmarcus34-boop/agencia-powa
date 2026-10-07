// components/WhatsAppFloat.tsx
'use client';

import { FaWhatsapp } from 'react-icons/fa';
import posthog from 'posthog-js';
import styles from './WhatsAppFloat.module.css';

// 📱 Configuración
const WHATSAPP_NUMBER = '5491138305837'; // 👈 CAMBIAR por tu número real
const WHATSAPP_MESSAGE = 'Hola Powa! Quiero consultar por un proyecto 👋';

export default function WhatsAppFloat() {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

    const handleClick = () => {
        posthog.capture('click_whatsapp_flotante', {
            origen: 'boton_flotante',
            page: window.location.pathname,
        });
    };

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappFloat}
            aria-label="Contactar por WhatsApp"
            title="Escribinos por WhatsApp"
            onClick={handleClick}
        >
            <FaWhatsapp className={styles.icon} />

            {/* Tooltip que aparece al hover */}
            <span className={styles.tooltip}>¿Hablamos? 👋</span>

            {/* Pulso animado */}
            <span className={styles.pulse}></span>
        </a>
    );
}