// app/blog/page.tsx
import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import BlogClient from './BlogClient';

// ============================================
// METADATA
// ============================================
export const metadata: Metadata = {
    title: 'Powa Blog | Ingeniería Web y Estrategia Digital',
    description: 'Artículos sobre ingeniería de software, optimización de rendimiento y arquitectura escalable para PYMES y empresas.',
    keywords: [
        'blog desarrollo web',
        'ingeniería de software',
        'next.js',
        'performance web',
        'SEO técnico',
        'arquitectura escalable',
        'agencia digital quilmes',
    ],
    alternates: {
        canonical: '/blog',
    },
    openGraph: {
        title: 'Powa Blog | Ingeniería Web y Estrategia Digital',
        description: 'Artículos sobre ingeniería de software, optimización de rendimiento y arquitectura escalable.',
        url: 'https://www.agenciadigitalpowa.com.ar/blog',
        type: 'website',
        images: [
            {
                url: '/logo-agenciadigitalpowa-redondo.png',
                width: 1200,
                height: 630,
                alt: 'Powa Blog',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Powa Blog | Ingeniería Web y Estrategia Digital',
        description: 'Artículos sobre ingeniería de software, optimización de rendimiento y arquitectura escalable.',
    },
};

// ============================================
// TIPOS
// ============================================
export interface PostFromDB {
    id: string;
    titulo: string;
    slug: string;
    extracto: string;
    imagen_url: string | null;
    imagen_alt: string | null;
    created_at: string;
    meta_keywords: string | null;
    meta_descripcion: string | null;
}

// ============================================
// FETCH DE POSTS EN EL SERVIDOR
// ============================================
async function getPosts(): Promise<PostFromDB[]> {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.error('Faltan variables de Supabase');
            return [];
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data, error } = await supabase
            .from('posts')
            .select('id, titulo, slug, extracto, imagen_url, imagen_alt, created_at, meta_keywords, meta_descripcion')
            .eq('publicado', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
            return [];
        }

        return (data || []) as PostFromDB[];
    } catch (err) {
        console.error('Error inesperado:', err);
        return [];
    }
}

// ============================================
// SCHEMA JSON-LD
// ============================================
function buildBlogSchema(posts: PostFromDB[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Powa Blog',
        description:
            'Artículos sobre ingeniería de software, optimización de rendimiento y arquitectura escalable.',
        url: 'https://www.agenciadigitalpowa.com.ar/blog',
        blogPosts: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.titulo,
            description: post.extracto,
            datePublished: post.created_at,
            url: `https://www.agenciadigitalpowa.com.ar/blog/${post.slug}`,
            author: {
                '@type': 'Organization',
                name: 'Agencia Digital Powa',
            },
        })),
    };
}

// ============================================
// PAGE (Server Component)
// ============================================
export default async function BlogPage() {
    const posts = await getPosts();
    const blogSchema = buildBlogSchema(posts);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />
            <BlogClient posts={posts} />
        </>
    );
}