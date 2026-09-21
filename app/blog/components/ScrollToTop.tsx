'use client';

import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styles from '../blog.module.css';

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className={styles.scrollTopButton}
            aria-label="Volver arriba"
        >
            <FaArrowUp />
        </button>
    );
}
