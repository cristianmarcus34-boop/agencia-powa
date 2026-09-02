'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../app/lib/supabase'
import BlogEditor from './BlogEditor'

interface BlogFormProps {
    post?: {
        id: string
        titulo: string
        slug: string
        contenido: string
        extracto: string
        imagen_url: string
        imagen_alt: string
        publicado: boolean
    }
    isEditing?: boolean
}

export default function BlogForm({ post, isEditing = false }: BlogFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        titulo: post?.titulo || '',
        slug: post?.slug || '',
        contenido: post?.contenido || '',
        extracto: post?.extracto || '',
        imagen_url: post?.imagen_url || '',
        imagen_alt: post?.imagen_alt || '',
        publicado: post?.publicado || false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                alert('Debes iniciar sesión')
                setLoading(false)
                return
            }

            const payload = {
                ...formData,
                autor_id: user.id,
                updated_at: new Date().toISOString(),
            }

            let error

            if (isEditing && post?.id) {
                const { error: updateError } = await supabase
                    .from('posts')
                    .update(payload)
                    .eq('id', post.id)
                error = updateError
            } else {
                const { error: insertError } = await supabase
                    .from('posts')
                    .insert([payload])
                error = insertError
            }

            if (error) throw error

            router.push('/admin/blog')
            router.refresh()
        } catch (error) {
            console.error('Error al guardar:', error)
            alert('Error al guardar el post')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título *
                </label>
                <input
                    type="text"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug (URL amigable) *
                </label>
                <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="ejemplo: mi-primer-post"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                />
                <p className="text-xs text-gray-500 mt-1">
                    Ejemplo: <strong>mi-primer-post</strong> → URL: /blog/mi-primer-post
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resumen (extracto)
                </label>
                <textarea
                    value={formData.extracto}
                    onChange={(e) => setFormData({ ...formData, extracto: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Breve resumen del post..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contenido *
                </label>
                <BlogEditor
                    content={formData.contenido}
                    onChange={(contenido) => setFormData({ ...formData, contenido })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL de la imagen destacada
                </label>
                <input
                    type="url"
                    value={formData.imagen_url}
                    onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://ejemplo.com/imagen.jpg"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Texto alternativo de la imagen (SEO)
                </label>
                <input
                    type="text"
                    value={formData.imagen_alt}
                    onChange={(e) => setFormData({ ...formData, imagen_alt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Descripción de la imagen para SEO"
                />
            </div>

            <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={formData.publicado}
                        onChange={(e) => setFormData({ ...formData, publicado: e.target.checked })}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Publicado</span>
                </label>
            </div>

            <div className="flex gap-4 pt-4 border-t">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Publicar'}
                </button>
                <button
                    type="button"
                    onClick={() => router.push('/admin/blog')}
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </form>
    )
}