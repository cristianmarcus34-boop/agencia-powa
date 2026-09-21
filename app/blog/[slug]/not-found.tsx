import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import styles from '../blog.module.css';

export default function NotFound() {
    return (
        <div className={styles.blogPageWrapper}>
            <div className={styles.ambientGlow} />
            <div className={styles.ambientGlowSecondary} />

            <div className="container py-5" style={{ position: 'relative', zIndex: 10 }}>
                <div className={styles.error404} style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
                    <span className={styles.errorEmoji}>🔍</span>
                    <h2 style={{ color: '#fff', fontWeight: 800, marginBottom: '1rem' }}>
                        Artículo no encontrado
                    </h2>
                    <p style={{ color: 'var(--slate-400)', marginBottom: '2rem' }}>
                        La ruta solicitada no existe o el recurso fue movido.
                    </p>
                    <Link href="/blog" className={styles.btnPowaErrorLink}>
                        <FaArrowLeft style={{ marginRight: 8 }} /> Volver al Blog
                    </Link>
                </div>
            </div>
        </div>
    );
}