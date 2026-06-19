'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ParticlesMobile from './ParticlesMobile';
import styles from './Hero3DMobile.module.css';

export default function Hero3DMobile() {
    return (
        <div className={styles.canvas}>
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 55 }}
                dpr={[1, 1.5]}
                performance={{ min: 0.3 }}
                gl={{ antialias: false, alpha: true }}
            >
                <color attach="background" args={['transparent']} />
                <Suspense fallback={null}>
                    <ParticlesMobile />
                </Suspense>
            </Canvas>
        </div>
    );
}