'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export default function PostPage() {
    const params = useParams();
    const slug = params?.slug; // ✅ OBTENER SLUG DE LA URL
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // ===== CARGAR POST DESDE SUPABASE =====
    useEffect(() => {
        async function fetchPost() {
            if (!slug) return;

            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('slug', slug)
                .eq('publicado', true)
                .single();

            if (!error) {
                setPost(data);
            }
            setLoading(false);
        }

        fetchPost();
    }, [slug]);

    // ===== LOADING =====
    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-400">
                Cargando artículo...
            </div>
        );
    }

    // ===== POST NO ENCONTRADO =====
    if (!post) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-white mb-4">Artículo no encontrado</h1>
                <Link href="/blog" className="text-orange-500 hover:underline">
                    Volver al blog
                </Link>
            </div>
        );
    }

    // ===== RENDER =====
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
    );
}