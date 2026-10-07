'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ============================================
// COMPONENTE DE PARTÍCULAS 3D
// ============================================
function Particles({ count = 5000 }) {
    const points = useRef<THREE.Points>(null);
    const mouse = useThree((state) => state.pointer);

    // Generar posiciones aleatorias en una esfera
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = Math.random() * 8 + 2; // radio entre 2 y 10
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        return positions;
    }, [count]);

    // Colores: mezcla de cian, violeta y blanco
    const colors = useMemo(() => {
        const colors = new Float32Array(count * 3);
        const palette = [
            new THREE.Color('#22d3ee'), // cian
            new THREE.Color('#8b5cf6'), // violeta
            new THREE.Color('#ffffff'), // blanco
            new THREE.Color('#67e8f9'), // cyan claro
        ];
        for (let i = 0; i < count; i++) {
            const color = palette[Math.floor(Math.random() * palette.length)];
            // Variar ligeramente el brillo
            const brightness = 0.6 + Math.random() * 0.4;
            colors[i * 3] = color.r * brightness;
            colors[i * 3 + 1] = color.g * brightness;
            colors[i * 3 + 2] = color.b * brightness;
        }
        return colors;
    }, [count]);

    // Animación
    useFrame((state, delta) => {
        if (!points.current) return;

        // Rotación lenta continua
        points.current.rotation.x += delta * 0.02;
        points.current.rotation.y += delta * 0.03;

        // Seguir el mouse sutilmente
        points.current.rotation.x += (mouse.y * 0.3 - points.current.rotation.x) * 0.02;
        points.current.rotation.y += (mouse.x * 0.3 - points.current.rotation.y) * 0.02;

        // Pulso de escala
        const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
        points.current.scale.setScalar(scale);
    });

    return (
        <Points ref={points} positions={positions} colors={colors} stride={3}>
            <PointMaterial
                transparent
                vertexColors
                size={0.05}
                sizeAttenuation
                depthWrite={false}
                opacity={0.85}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

// ============================================
// SEGUNDA CAPA: Partículas más grandes y brillantes
// ============================================
function BrightParticles({ count = 300 }) {
    const points = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = Math.random() * 6 + 1;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        return positions;
    }, [count]);

    useFrame((state, delta) => {
        if (!points.current) return;
        points.current.rotation.y -= delta * 0.05;
        points.current.rotation.x += delta * 0.01;
    });

    return (
        <Points ref={points} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.15}
                sizeAttenuation
                depthWrite={false}
                opacity={0.9}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

// ============================================
// TERCERA CAPA: Polvo sutil de fondo
// ============================================
function DustParticles({ count = 2500 }) {
    const points = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return positions;
    }, [count]);

    useFrame((state, delta) => {
        if (!points.current) return;
        points.current.rotation.y += delta * 0.01;
        points.current.rotation.z += delta * 0.005;
    });

    return (
        <Points ref={points} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#22d3ee"
                size={0.02}
                sizeAttenuation
                depthWrite={false}
                opacity={0.4}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function Hero3DParticles() {
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Verificar soporte WebGL
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

        if (!gl) {
            setShouldRender(false);
            return;
        }

        // Detectar dispositivo de baja gama
        const isLowEnd =
            navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

        if (isLowEnd) {
            setShouldRender(false);
        }
    }, []);

    if (!shouldRender) {
        return null; // Deja que el HeroPlaceholder (CSS) se muestre
    }

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none',
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{
                    background: 'transparent',
                    pointerEvents: 'none',
                }}
            >
                <color attach="background" args={['transparent']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {/* 3 capas de partículas */}
                <Particles count={2500} />
                <BrightParticles count={150} />
                <DustParticles count={1200} />
            </Canvas>
        </div>
    );
}

// Importar useState
import { useState } from 'react';