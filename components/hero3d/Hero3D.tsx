'use client';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Suspense } from 'react';
import ParticlesLogo from './ParticlesLogo';
import styles from './Hero3D.module.css';

export default function Hero3D() {
    return (
        <div className={styles.canvas}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 2]}
                performance={{ min: 0.5 }}
                gl={{ antialias: true, alpha: true }}
            >
                <color attach="background" args={['transparent']} />
                <Suspense fallback={null}>
                    <ParticlesLogo particleCount={6000} />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} intensity={1.2} radius={0.4} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}