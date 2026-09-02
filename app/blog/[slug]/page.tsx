import { supabase } from '../../lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

async function getPost(slug: string) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('publicado', true)
        .single()

    if (error) return null
    return data
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors mb-6"
            >
                <ArrowLeft size={16} />
                Volver al blog
            </Link>

            <article>
                {post.imagen_url && (
                    <div className="relative w-full h-80 rounded-xl overflow-hidden mb-6">
                        <Image
                            src={post.imagen_url}
                            alt={post.imagen_alt || post.titulo}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {post.titulo}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                    <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.created_at).toLocaleDateString('es-AR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                    {post.vistas > 0 && (
                        <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.vistas} vistas
                        </span>
                    )}
                </div>

                {post.meta_descripcion && (
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6 text-gray-300 text-sm">
                        💡 {post.meta_descripcion}
                    </div>
                )}

                <div
                    className="prose prose-invert prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.contenido }}
                />
            </article>
        </div>
    )
}