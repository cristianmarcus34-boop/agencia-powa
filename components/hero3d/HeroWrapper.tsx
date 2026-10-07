'use client';
import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroPlaceholder from './HeroPlaceholder';
import { useDeviceProfile } from '@/hooks/useDeviceProfile';
import styles from './HeroWrapper.module.css';

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });
const Hero3DMobile = dynamic(() => import('./Hero3DMobile'), { ssr: false });

interface HeroWrapperProps {
    children: React.ReactNode;
}

export default function HeroWrapper({ children }: HeroWrapperProps) {
    const profile = useDeviceProfile();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setReady(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className={styles.heroContainer}>
            <HeroPlaceholder />
            {/* Deshabilitado para mejor rendimiento */}
            {/* {ready && profile === 'desktop' && (
        <Suspense fallback={null}>
            <Hero3D />
        </Suspense>
    )}
    {ready && profile === 'mobileHigh' && (
        <Suspense fallback={null}>
            <Hero3DMobile />
        </Suspense>
    )} */}
            <div className={styles.contentOverlay}>
                {children}
            </div>
        </div>
    );
}