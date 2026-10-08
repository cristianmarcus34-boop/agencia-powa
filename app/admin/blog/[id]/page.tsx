'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import BlogForm from '@/components/BlogForm';
import type { Post } from '../../../types/blog';  // ✅ IMPORTAR EL TIPO
import styles from '../blog.module.css';

export default function EditarPostPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPost() {
            if (!id) {
                setError('ID del post no proporcionado');
                setLoading(false);
                return;
            }

            console.log('🔍 Buscando post con ID:', id);

            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('❌ Error al buscar post:', error);
                setError('Post no encontrado');
                setLoading(false);
                return;
            }

            if (!data) {
                setError('Post no encontrado');
                setLoading(false);
                return;
            }

            console.log('✅ Post encontrado:', data.titulo);
            console.log('📦 Datos completos:', data);
            setPost(data as Post);
            setLoading(false);
        }

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Cargando post...</div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className={styles.container}>
                <div className={styles.formWrapper}>
                    <h1 className={styles.title}>❌ Error</h1>
                    <p className="text-red-500">{error || 'Post no encontrado'}</p>
                    <button
                        onClick={() => router.push('/admin/blog')}
                        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                        Volver al listado
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>✏️ Editar post</h1>
                <BlogForm post={post} isEditing />
            </div>
        </div>
    );
}