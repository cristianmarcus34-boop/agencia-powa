'use client';
import HeroPlaceholder from './HeroPlaceholder';
import styles from './HeroWrapper.module.css';

interface HeroWrapperProps {
    children: React.ReactNode;
}

export default function HeroWrapper({ children }: HeroWrapperProps) {
    return (
        <div className={styles.heroContainer}>
            <HeroPlaceholder />
            <div className={styles.contentOverlay}>
                {children}
            </div>
        </div>
    );
}