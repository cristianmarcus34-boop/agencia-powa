// app/blog/[slug]/page.tsx
// ============================================
// SERVER COMPONENT — NO 'use client'
// ============================================
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import PostClient from './PostClient';

// ============================================
// SUPABASE SERVER (con manejo de errores)
// ============================================
function getSupabase() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
        console.error('[blog] Faltan variables de Supabase');
        return null;
    }
    return createClient(url, key);
}

async function getPost(slug: string) {
    try {
        const supabase = getSupabase();
        if (!supabase) return null;

        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .eq('publicado', true)
            .single();

        if (error) {
            console.error('[blog] getPost error:', error);
            return null;
        }
        return data;
    } catch (err) {
        console.error('[blog] getPost exception:', err);
        return null;
    }
}

async function getRelated(slug: string) {
    try {
        const supabase = getSupabase();
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('posts')
            .select('id, titulo, slug, emoji')
            .eq('publicado', true)
            .neq('slug', slug)
            .limit(3);

        if (error) {
            console.error('[blog] getRelated error:', error);
            return [];
        }
        return data || [];
    } catch (err) {
        console.error('[blog] getRelated exception:', err);
        return [];
    }
}

// ============================================
// METADATA DINÁMICA (SEO)
// ============================================
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: 'Artículo no encontrado | Powa Blog',
            robots: { index: false, follow: false },
        };
    }

    const description = post.meta_descripcion || post.extracto;
    const keywords = post.meta_keywords
        ? post.meta_keywords.split(',').map((k: string) => k.trim())
        : undefined;

    return {
        title: `${post.titulo} | Powa Blog`,
        description,
        keywords,
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
        openGraph: {
            title: post.titulo,
            description,
            url: `https://www.agenciadigitalpowa.com.ar/blog/${post.slug}`,
            type: 'article',
            publishedTime: post.created_at,
            images: post.imagen_url
                ? [{ url: post.imagen_url, alt: post.imagen_alt || post.titulo }]
                : [{ url: '/logo-agenciadigitalpowa-redondo.png', width: 1200, height: 630, alt: post.titulo }],
        },
    };
}

// ============================================
// STATIC PARAMS (ISR — blindado)
// ============================================
export async function generateStaticParams() {
    try {
        const supabase = getSupabase();
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('posts')
            .select('slug')
            .eq('publicado', true);

        if (error) {
            console.error('[blog] generateStaticParams error:', error);
            return [];
        }
        return (data || []).map((p) => ({ slug: p.slug }));
    } catch (err) {
        console.error('[blog] generateStaticParams exception:', err);
        return [];
    }
}

export const revalidate = 3600;

// ============================================
// PAGE (Server Component)
// ============================================
export default async function PostPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const [post, relatedPosts] = await Promise.all([
        getPost(slug),
        getRelated(slug),
    ]);

    if (!post) notFound();

    return <PostClient post={post} relatedPosts={relatedPosts} />;
}
