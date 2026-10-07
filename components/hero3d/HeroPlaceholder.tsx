import styles from './HeroPlaceholder.module.css';

export default function HeroPlaceholder() {
    return (
        <div className={styles.heroBg}>
            <div className={styles.particleField}>
                {/* Capa base (centro) */}
                <div className={`${styles.pseudoParticles} ${styles.layer1}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer2}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer3}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer4}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer5}`} />

                {/* Capas arriba (cubren la zona del badge) */}
                <div className={`${styles.pseudoParticles} ${styles.layer1Top}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer2Top}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer3Top}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer4Top}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer5Top}`} />

                {/* Capas de esquinas (cobertura total) */}
                <div className={`${styles.pseudoParticles} ${styles.layer1TopLeft}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer1TopRight}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer1BottomLeft}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer1BottomRight}`} />
            </div>
        </div>
    );
}