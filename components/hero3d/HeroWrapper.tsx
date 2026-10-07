'use client';
import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroPlaceholder from './HeroPlaceholder';
import { useDeviceProfile } from '@/hooks/useDeviceProfile';
import styles from './HeroWrapper.module.css';

// Cargar las 3 versiones dinámicamente
const Hero3DParticles = dynamic(() => import('./Hero3DParticles'), {
    ssr: false,
    loading: () => null,
});

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });
const Hero3DMobile = dynamic(() => import('./Hero3DMobile'), { ssr: false });

interface HeroWrapperProps {
    children: React.ReactNode;
}

export default function HeroWrapper({ children }: HeroWrapperProps) {
    const profile = useDeviceProfile();
    const [ready, setReady] = useState(false);
    const [supportsWebGL, setSupportsWebGL] = useState(false);

    useEffect(() => {
        // Delay para que el placeholder se muestre primero
        const t = setTimeout(() => setReady(true), 100);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        // Detectar soporte WebGL y rendimiento
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

            // Detectar dispositivos de baja gama
            const cores = navigator.hardwareConcurrency || 4;
            const memory = (navigator as any).deviceMemory || 4;

            // Solo activar 3D si:
            // - WebGL disponible
            // - 4+ cores
            // - 4GB+ RAM
            // - No es mobile low
            const canRender3D =
                !!gl &&
                cores >= 4 &&
                memory >= 4 &&
                profile !== 'mobileLow';

            setSupportsWebGL(canRender3D);
        } catch {
            setSupportsWebGL(false);
        }
    }, [profile]);

    return (
        <div className={styles.heroContainer}>
            {/* Fallback CSS: siempre presente, se ve rápido */}
            <HeroPlaceholder />

            {/* 3D real: solo si el dispositivo lo soporta */}
            {ready && supportsWebGL && (
                <Suspense fallback={null}>
                    <Hero3DParticles />
                </Suspense>
            )}

            {/* Versión legacy de 3D (mantener si la tenés) */}
            {ready && !supportsWebGL && profile === 'desktop' && (
                <Suspense fallback={null}>
                    <Hero3D />
                </Suspense>
            )}

            {ready && !supportsWebGL && profile === 'mobileHigh' && (
                <Suspense fallback={null}>
                    <Hero3DMobile />
                </Suspense>
            )}

            <div className={styles.contentOverlay}>
                {children}
            </div>
        </div>
    );
}