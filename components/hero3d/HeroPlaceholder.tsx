import styles from './HeroPlaceholder.module.css';

export default function HeroPlaceholder() {
    return (
        <div className={styles.heroBg}>
            <div className={styles.particleField}>
                <div className={`${styles.pseudoParticles} ${styles.layer1}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer2}`} />
                <div className={`${styles.pseudoParticles} ${styles.layer3}`} />
            </div>
        </div>
    );
}