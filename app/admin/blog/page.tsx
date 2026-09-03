'use client';

import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './blog.module.css'; // ✅ Importar los estilos

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error) setPosts(data || []);
            setLoading(false);
        }
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('¿Eliminar este post?')) {
            await supabase.from('posts').delete().eq('id', id);
            setPosts(posts.filter(p => p.id !== id));
        }
    };

    if (loading) return <div className={styles.loading}>Cargando posts...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>📰 Gestión de Blog</h1>
                <Link href="/admin/blog/nuevo" className={styles.btnPrimary}>
                    + Nuevo Post
                </Link>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th style={{ textAlign: 'right' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className={styles.emptyState}>
                                    No hay posts aún.{' '}
                                    <Link href="/admin/blog/nuevo">Creá el primero</Link>
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id}>
                                    <td>
                                        <div className={styles.titleCell}>{post.titulo}</div>
                                        <div className={styles.slugCell}>/{post.slug}</div>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${post.publicado ? styles.badgePublished : styles.badgeDraft}`}>
                                            {post.publicado ? 'Publicado' : 'Borrador'}
                                        </span>
                                    </td>
                                    <td className={styles.dateCell}>
                                        {new Date(post.created_at).toLocaleDateString('es-AR')}
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/blog/${post.slug}`} target="_blank" className={`${styles.actionBtn} ${styles.view}`}>
                                                <Eye size={18} />
                                            </Link>
                                            <Link href={`/admin/blog/${post.id}`} className={`${styles.actionBtn} ${styles.edit}`}>
                                                <Pencil size={18} />
                                            </Link>
                                            <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => handleDelete(post.id)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}