'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../app/lib/supabase';

interface BlogFormProps {
    post?: {
        id: string;
        titulo: string;
        slug: string;
        contenido: string;
        extracto: string;
        imagen_url: string;
        imagen_alt: string;
        publicado: boolean;
    };
    isEditing?: boolean;
}

// ⚠️ IMPORTANTE: No podemos importar CSS Modules desde components/ directamente
// porque el CSS Modules está en admin/blog/blog.module.css
// Vamos a usar estilos en línea o Tailwind (pero Tailwind no está cargando)
// La solución más limpia es usar estilos en línea para este componente

export default function BlogForm({ post, isEditing = false }: BlogFormProps) {
    const router = useRouter();
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert('Debes iniciar sesión');
                setLoading(false);
                return;
            }

            const payload = {
                ...formData,
                autor_id: user.id,
                updated_at: new Date().toISOString(),
            };

            let error;

            if (isEditing && post?.id) {
                const { error: updateError } = await supabase
                    .from('posts')
                    .update(payload)
                    .eq('id', post.id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('posts')
                    .insert([payload]);
                error = insertError;
            }

            if (error) throw error;

            router.push('/admin/blog');
            router.refresh();
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Error al guardar el post');
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

            {/* Contenido */}
            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    Contenido *
                </label>
                <textarea
                    value={formData.contenido}
                    onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                    rows={10}
                    style={{
                        width: '100%',
                        padding: '0.5rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        background: '#ffffff',
                        color: '#111827',
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                    }}
                    placeholder="Escribí el contenido del post (podés usar HTML)"
                    required
                />
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    Podés usar HTML para dar formato: <strong>&lt;p&gt;</strong>, <strong>&lt;h4&gt;</strong>, <strong>&lt;ul&gt;</strong>, <strong>&lt;li&gt;</strong>, etc.
                </p>
            </div>

            {/* Imagen destacada */}
            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    URL de la imagen destacada
                </label>
                <input
                    type="url"
                    value={formData.imagen_url}
                    onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
                    style={{
                        width: '100%',
                        padding: '0.5rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        background: '#ffffff',
                        color: '#111827',
                        fontSize: '1rem',
                    }}
                    placeholder="https://ejemplo.com/imagen.jpg"
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