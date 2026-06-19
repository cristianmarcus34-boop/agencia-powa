'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticlesMobile() {
    const pointsRef = useRef<THREE.Points>(null);
    const geometry = useMemo(() => {
        const count = 1000;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 4;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);
    const material = useMemo(() => {
        return new THREE.PointsMaterial({
            size: 0.06,
            color: '#00ffcc',
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
        });
    }, []);

    useFrame(() => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0008;
            pointsRef.current.rotation.x += 0.0003;
        }
    });

    return <points ref={pointsRef} geometry={geometry} material={material} />;
}