'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HeroPlaceholder.module.css';

export default function HeroPlaceholder() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 a 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            setMousePos({ x, y });
        };

        // Detectar touch para mobile
        const isTouch = 'ontouchstart' in window;

        if (!isTouch) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Cada plano se mueve distinto (parallax)
    const bgTransform = isClient
        ? `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0)`
        : '';

    const midTransform = isClient
        ? `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0)`
        : '';

    const frontTransform = isClient
        ? `translate3d(${mousePos.x * -35}px, ${mousePos.y * -35}px, 0)`
        : '';

    return (
        <div className={styles.heroBg} ref={containerRef}>
            {/* 🌫️ Neblina animada de fondo */}
            <div className={styles.fogLayer} />
            <div className={styles.fogLayer2} />

            {/* ✨ Constelaciones */}
            <svg
                className={styles.constellationLines}
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
            >
                <line className={styles.constellationLine} x1="200" y1="150" x2="400" y2="300" />
                <line className={styles.constellationLine} x1="400" y1="300" x2="600" y2="250" />
                <line className={styles.constellationLine} x1="600" y1="250" x2="800" y2="400" />
                <line className={styles.constellationLine} x1="300" y1="500" x2="500" y2="600" />
                <line className={styles.constellationLine} x1="500" y1="600" x2="700" y2="550" />
                <line className={styles.constellationLine} x1="150" y1="700" x2="350" y2="800" />
                <line className={styles.constellationLine} x1="650" y1="700" x2="850" y2="800" />
            </svg>

            {/* 🌫️ Vignette (viñeta cinematográfica) */}
            <div className={styles.vignette} />

            <div className={styles.particleField}>
                {/* ===== PLANO DE FONDO (parallax lento) ===== */}
                <div
                    className={styles.parallaxLayer}
                    style={{ transform: bgTransform }}
                >
                    <div className={`${styles.pseudoParticles} ${styles.layerBg1}`} />
                    <div className={`${styles.pseudoParticles} ${styles.layerBg2}`} />
                    <div className={`${styles.pseudoParticles} ${styles.layerBg3}`} />
                </div>

                {/* ===== PLANO MEDIO (parallax medio) ===== */}
                <div
                    className={styles.parallaxLayer}
                    style={{ transform: midTransform }}
                >
                    <div className={`${styles.pseudoParticles} ${styles.layerMid1}`} />
                    <div className={`${styles.pseudoParticles} ${styles.layerMid1Top}`} />
                    <div className={`${styles.pseudoParticles} ${styles.layerMid2}`} />
                    <div className={`${styles.pseudoParticles} ${styles.layerMid2Top}`} />
                </div>

                {/* ===== PLANO FRONTAL (parallax rápido) ===== */}
                <div
                    className={styles.parallaxLayer}
                    style={{ transform: frontTransform }}
                >
                    <div className={`${styles.pseudoParticles} ${styles.layerFront1}`} />
                    <div className={`${styles.pseudoParticles} ${styles.layerFront1Top}`} />
                    <div className={`${styles.pseudoParticles} ${styles.layerFront2}`} />
                    <div className={`${styles.pseudoParticles} ${styles.layerFront2Top}`} />
                    <div className={`${styles.pseudoParticles} ${styles.layerFront3}`} />
                    <div className={`${styles.pseudoParticles} ${styles.layerSparkle}`} />

                    {/* Esquinas */}
                    <div className={`${styles.pseudoParticles} ${styles.layerCorner1}`} />
                    <div className={`${styles.pseudoParticles} ${styles.layerCorner2}`} />
                    <div className={`${styles.pseudoParticles} ${styles.layerCorner3}`} />
                    <div className={`${styles.pseudoParticles} ${styles.layerCorner4}`} />
                </div>
            </div>
        </div>
    );
}