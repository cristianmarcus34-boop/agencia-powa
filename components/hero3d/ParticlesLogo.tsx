'use client';
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function generateLogoPoints(): Float32Array {
    const points = [];
    const count = 4000;
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 8;
        const radius = 1.5 + Math.sin(i * 0.05) * 0.3;
        points.push(
            Math.cos(angle) * radius,
            Math.sin(angle * 1.5) * 0.8,
            (Math.random() - 0.5) * 0.5
        );
    }
    return new Float32Array(points);
}

interface ParticlesLogoProps {
    particleCount?: number;
}

export default function ParticlesLogo({ particleCount = 6000 }: ParticlesLogoProps) {
    const pointsRef = useRef<THREE.Points>(null);
    const { mouse, viewport } = useThree();
    const logoPositions = useMemo(() => generateLogoPoints(), []);
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = logoPositions.slice(0, particleCount * 3);
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [logoPositions, particleCount]);
    const material = useMemo(() => {
        return new THREE.PointsMaterial({
            size: 0.04,
            color: '#00ffcc',
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
        });
    }, []);

    useFrame(() => {
        if (pointsRef.current) {
            const targetX = (mouse.x * viewport.width) / 3;
            const targetY = (mouse.y * viewport.height) / 3;
            pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.02;
            pointsRef.current.rotation.x += (-targetY - pointsRef.current.rotation.x) * 0.02;
            pointsRef.current.rotation.y += 0.0003;
        }
    });

    return <points ref={pointsRef} geometry={geometry} material={material} />;
}