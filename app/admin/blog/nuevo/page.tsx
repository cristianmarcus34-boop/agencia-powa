import BlogForm from '@/components/BlogForm';
import styles from '../blog.module.css';

export default function NuevoPostPage() {
    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>✍️ Crear nuevo post</h1>
                <BlogForm />
            </div>
        </div>
    );
}