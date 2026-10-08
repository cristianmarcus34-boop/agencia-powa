'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { supabase } from '../lib/supabase';
import ImageUpload from '../components/ImageUpload';
import BlogEditor from '../components/BlogEditor';
import type { Post } from '../app/types/blog';

interface BlogFormProps {
    post?: Post;
    isEditing?: boolean;
}

export default function BlogForm({ post, isEditing = false }: BlogFormProps) {
    const originalSlug = post?.slug;
    const router = useRouter();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        titulo: post?.titulo || '',
        slug: post?.slug || '',
        contenido: post?.contenido || '',
        extracto: post?.extracto || '',
        imagen_url: post?.imagen_url || '',
        imagen_alt: post?.imagen_alt || '',
        publicado: post?.publicado || false,
    });

    useEffect(() => {
        if (post) {
            setFormData({
                titulo: post.titulo || '',
                slug: post.slug || '',
                contenido: post.contenido || '',
                extracto: post.extracto || '',
                imagen_url: post.imagen_url || '',
                imagen_alt: post.imagen_alt || '',
                publicado: post.publicado || false,
            });
        }
    }, [post]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ LOGS DE DEPURACIÓN
        console.log('🚀 handleSubmit ejecutado');
        console.log('📊 Status:', status);
        console.log('👤 Session:', session);
        console.log('📝 isEditing:', isEditing);
        console.log('📦 post:', post);
        console.log('📋 formData:', formData);

        if (status === 'unauthenticated' || !session) {
            alert('Debes iniciar sesión');
            return;
        }

        setLoading(true);

        try {
            const autorId = (session.user as any)?.id || null;
            console.log('👤 Autor ID:', autorId);

            const payload = {
                ...formData,
                autor_id: autorId,
                updated_at: new Date().toISOString(),
            };

            console.log('📦 Payload a enviar:', payload);

            let error;

            if (isEditing && post?.id) {
                console.log('✏️ Editando post con ID:', post.id);

                const { data, error: updateError } = await supabase
                    .from('posts')
                    .update(payload)
                    .eq('id', post.id)
                    .select();

                console.log('📥 Respuesta de Supabase:', data);
                console.log('❌ Error de Supabase:', updateError);

                error = updateError;
            } else {
                console.log('➕ Creando nuevo post');

                const { data, error: insertError } = await supabase
                    .from('posts')
                    .insert([payload])
                    .select();

                console.log('📥 Respuesta de Supabase:', data);
                console.log('❌ Error de Supabase:', insertError);

                error = insertError;
            }

            if (error) throw error;

            console.log('✅ Post guardado correctamente');

            // ✅ REVALIDAR EL BLOG PÚBLICO
            // ✅ REVALIDAR EL BLOG PÚBLICO Y EL SITEMAP
            try {
                await fetch('/api/revalidate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        slug: formData.slug,
                        previousSlug: isEditing ? originalSlug : undefined,
                    }),
                });
                console.log('✅ Blog y sitemap revalidados');
            } catch (revalidateError) {
                console.warn('⚠️ Error al revalidar:', revalidateError);
            }

            router.push('/admin/blog');
            router.refresh();
        } catch (error) {
            console.error('❌ Error al guardar:', error);
            alert('Error al guardar el post: ' + (error as any)?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Título */}
            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    Título *
                </label>
                <input
                    type="text"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    style={{
                        width: '100%',
                        padding: '0.5rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        background: '#ffffff',
                        color: '#111827',
                        fontSize: '1rem',
                    }}
                    required
                />
            </div>

            {/* Slug */}
            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    Slug (URL amigable) *
                </label>
                <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="ejemplo: mi-primer-post"
                    style={{
                        width: '100%',
                        padding: '0.5rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        background: '#ffffff',
                        color: '#111827',
                        fontSize: '1rem',
                    }}
                    required
                />
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    Ejemplo: <strong>mi-primer-post</strong> → URL: /blog/mi-primer-post
                </p>
            </div>

            {/* Extracto */}
            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    Resumen (extracto)
                </label>
                <textarea
                    value={formData.extracto}
                    onChange={(e) => setFormData({ ...formData, extracto: e.target.value })}
                    rows={2}
                    style={{
                        width: '100%',
                        padding: '0.5rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        background: '#ffffff',
                        color: '#111827',
                        fontSize: '1rem',
                    }}
                    placeholder="Breve resumen del post..."
                />
            </div>

            {/* Contenido con editor visual */}
            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    Contenido *
                </label>
                <BlogEditor
                    content={formData.contenido}
                    onChange={(contenido) => setFormData({ ...formData, contenido })}
                />
            </div>

            {/* Imagen destacada */}
            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    Imagen destacada
                </label>
                <ImageUpload
                    onUpload={(url) => setFormData({ ...formData, imagen_url: url })}
                    currentImage={formData.imagen_url || undefined}
                    folder="blog"
                />
            </div>

            {/* Texto alternativo */}
            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    Texto alternativo de la imagen (SEO)
                </label>
                <input
                    type="text"
                    value={formData.imagen_alt}
                    onChange={(e) => setFormData({ ...formData, imagen_alt: e.target.value })}
                    style={{
                        width: '100%',
                        padding: '0.5rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        background: '#ffffff',
                        color: '#111827',
                        fontSize: '1rem',
                    }}
                    placeholder="Descripción de la imagen para SEO"
                />
            </div>

            {/* Publicado */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                    type="checkbox"
                    checked={formData.publicado}
                    onChange={(e) => setFormData({ ...formData, publicado: e.target.checked })}
                    style={{ width: '1rem', height: '1rem', accentColor: '#f97316' }}
                />
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                    Publicado
                </label>
            </div>

            {/* Botones */}
            <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb', marginTop: '1rem' }}>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '0.5rem 1.5rem',
                        background: loading ? '#f97316' : '#f97316',
                        color: '#ffffff',
                        fontWeight: '700',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.5 : 1,
                    }}
                >
                    {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Publicar'}
                </button>
                <button
                    type="button"
                    onClick={() => router.push('/admin/blog')}
                    style={{
                        padding: '0.5rem 1.5rem',
                        background: '#e5e7eb',
                        color: '#374151',
                        fontWeight: '700',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                    }}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}