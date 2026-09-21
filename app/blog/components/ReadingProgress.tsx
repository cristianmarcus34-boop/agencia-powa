'use client';

import React, { useEffect, useState } from 'react';
import styles from '../blog.module.css';

export default function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                const percent = (scrollTop / docHeight) * 100;
                setProgress(Math.min(100, Math.max(0, percent)));
            }
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div
            className={styles.readingProgressBar}
            style={{ width: `${progress}%` }}
            aria-hidden="true"
        />
    );
}
