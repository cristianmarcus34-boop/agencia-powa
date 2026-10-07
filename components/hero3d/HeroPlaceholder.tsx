import styles from './HeroPlaceholder.module.css';

export default function HeroPlaceholder() {
    return (
        <div className={styles.heroBg}>
            <div className={styles.particleField}>
                {/* Punto central */}
                <div className={`${styles.pseudoParticles} ${styles.layer1}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer2}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer3}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer4}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer5}`} />

                {/* Punto arriba (cubre la zona del badge) */}
                <div className={`${styles.pseudoParticles} ${styles.layer1Top}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer2Top}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer3Top}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer4Top}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer5Top}`} />

                {/* Punto arriba-izquierda */}
                <div className={`${styles.pseudoParticles} ${styles.layer1TopLeft}`} />

                {/* Punto arriba-derecha */}
                <div className={`${styles.pseudoParticles} ${styles.layer1TopRight}`} />

                {/* Punto abajo-izquierda */}
                <div className={`${styles.pseudoParticles} ${styles.layer1BottomLeft}`} />

                {/* Punto abajo-derecha */}
                <div className={`${styles.pseudoParticles} ${styles.layer1BottomRight}`} />
            </div>
        </div>
    );
}