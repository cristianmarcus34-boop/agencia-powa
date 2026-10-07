import styles from './HeroPlaceholder.module.css';

export default function HeroPlaceholder() {
    return (
        <div className={styles.heroBg}>
            <div className={styles.particleField}>
                {/* PLANO DE FONDO - Polvo estelar (chico, tenue, blur alto) */}
                <div className={`${styles.pseudoParticles} ${styles.layerBg1}`} />
                <div className={`${styles.pseudoParticles} ${styles.layerBg2}`} />
                <div className={`${styles.pseudoParticles} ${styles.layerBg3}`} />

                {/* PLANO MEDIO - Partículas principales */}
                <div className={`${styles.pseudoParticles} ${styles.layerMid1}`} />
                <div className={`${styles.pseudoParticles} ${styles.layerMid1Top}`} />
                <div className={`${styles.pseudoParticles} ${styles.layerMid2}`} />
                <div className={`${styles.pseudoParticles} ${styles.layerMid2Top}`} />

                {/* PLANO FRONTAL - Estrellas brillantes */}
                <div className={`${styles.pseudoParticles} ${styles.layerFront1}`} />
                <div className={`${styles.pseudoParticles} ${styles.layerFront1Top}`} />
                <div className={`${styles.pseudoParticles} ${styles.layerFront2}`} />
                <div className={`${styles.pseudoParticles} ${styles.layerFront2Top}`} />

                {/* Esquinas */}
                <div className={`${styles.pseudoParticles} ${styles.layerCorner1}`} />
                <div className={`${styles.pseudoParticles} ${styles.layerCorner2}`} />
                <div className={`${styles.pseudoParticles} ${styles.layerCorner3}`} />
                <div className={`${styles.pseudoParticles} ${styles.layerCorner4}`} />
            </div>
        </div>
    );
}