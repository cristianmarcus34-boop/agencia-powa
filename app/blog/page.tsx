'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
    FaCalendarAlt, FaArrowRight, FaSearch,
    FaTag, FaClock, FaRocket, FaCode, FaShieldAlt,
    FaMobileAlt, FaCloudUploadAlt, FaChartLine, FaTimes,
    FaArrowUp
} from 'react-icons/fa';
import Link from 'next/link';
import Script from 'next/script';
import { supabase } from '../lib/supabase';

import styles from './blog.module.css';

// ===== CONSTANTES =====
const CATEGORIES = [
    'Todos',
    'Arquitectura',
    'Performance',
    'Seguridad',
    'UX/UI',
    'DevOps',
    'Estrategia'
] as const;

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    'Arquitectura': <FaCode />,
    'Performance': <FaRocket />,
    'Seguridad': <FaShieldAlt />,
    'UX/UI': <FaMobileAlt />,
    'DevOps': <FaCloudUploadAlt />,
    'Estrategia': <FaChartLine />
};

const POPULAR_TAGS = [
    'Next.js', 'TypeScript', 'Performance', 'SEO',
    'Arquitectura', 'DevOps', 'UX/UI', 'Cloud'
];

// ===== TIPO DE POST DESDE SUPABASE =====
interface PostFromDB {
    id: string
    titulo: string
    slug: string
    contenido: string
    extracto: string
    imagen_url: string
    imagen_alt: string
    publicado: boolean
    created_at: string
    updated_at: string
    autor_id: string
    proyecto_id: string | null
    vistas: number
    meta_descripcion: string | null
    meta_keywords: string | null
}

export default function BlogPage() {
    const [posts, setPosts] = useState<PostFromDB[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('Todos');
    const [showScrollTop, setShowScrollTop] = useState(false);

    // ===== CARGAR POSTS DESDE SUPABASE =====
    useEffect(() => {
        async function fetchPosts() {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('publicado', true)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setPosts(data || []);
            } catch (error) {
                console.error('Error cargando posts:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    // ===== SCROLL TOP =====
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ===== FILTRADO =====
    const filteredPosts = useMemo(() => {
        const searchLower = searchTerm.toLowerCase().trim();

        return posts.filter(post => {
            if (!searchLower && activeCategory === 'Todos') {
                return true;
            }

            const matchesSearch = !searchLower ||
                post.titulo.toLowerCase().includes(searchLower) ||
                post.extracto?.toLowerCase().includes(searchLower) ||
                post.meta_keywords?.toLowerCase().includes(searchLower);

            const matchesCategory = activeCategory === 'Todos' || true;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory, posts]);

    // ===== LIMPIAR BÚSQUEDA =====
    const clearSearch = () => {
        setSearchTerm('');
        setActiveCategory('Todos');
    };

    // ===== SCHEMA JSON-LD PARA SEO =====
    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Powa Insights - Blog de Ingeniería Web",
        "description": "Perspectivas globales sobre ingeniería de software, optimización de performance y arquitectura escalable.",
        "url": "https://www.agenciadigitalpowa.com.ar/blog",
        "blogPosts": posts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.titulo,
            "description": post.extracto,
            "datePublished": post.created_at,
            "author": {
                "@type": "Organization",
                "name": "Agencia Powa"
            }
        }))
    };

    // ===== LOADING =====
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // ===== RENDER =====
    return (
        <>
            <Script
                id="blog-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />

            <div className={styles.blogPageWrapper}>
                <div className={styles.ambientGlow} />
                <div className={styles.ambientGlowSecondary} />

                <Container className="py-5 mt-5 relative z-10">
                    <header className="text-center mb-5">
                        <span className={styles.badgePowaAccent}>Conocimiento Técnico</span>
                        <h1 className={styles.blogMainTitle}>
                            Powa <span className={styles.textGradient}>Insights</span>
                        </h1>
                        <p className={styles.heroSubtitleModern}>
                            Perspectivas globales sobre ingeniería de software, optimización de performance y arquitectura escalable.
                        </p>

                        <div className={styles.postCounter}>
                            <FaClock className={styles.counterIcon} />
                            <span>{posts.length} artículos publicados</span>
                        </div>
                    </header>

                    {/* ===== FILTROS Y BÚSQUEDA ===== */}
                    <Row className="justify-content-center mb-4">
                        <Col lg={10}>
                            <div className={styles.filtersWrapper}>
                                <div className={styles.searchWrapper}>
                                    <FaSearch className={styles.searchIcon} />
                                    <input
                                        type="text"
                                        className={styles.searchInput}
                                        placeholder="Buscar artículos por título, categoría o contenido..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        aria-label="Buscar artículos del blog"
                                    />
                                    {searchTerm && (
                                        <button
                                            className={styles.clearSearch}
                                            onClick={clearSearch}
                                            aria-label="Limpiar búsqueda"
                                        >
                                            <FaTimes />
                                        </button>
                                    )}
                                </div>

                                <div className={styles.categoryFilters}>
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            className={`${styles.filterButton} ${activeCategory === cat ? styles.activeFilter : ''}`}
                                            onClick={() => setActiveCategory(cat)}
                                        >
                                            {cat !== 'Todos' && CATEGORY_ICONS[cat]}
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                <div className={styles.tagsWrapper}>
                                    <span className={styles.tagsLabel}>
                                        <FaTag className={styles.tagsIcon} />
                                        Tags populares:
                                    </span>
                                    <div className={styles.tagsCloud}>
                                        {POPULAR_TAGS.map((tag) => (
                                            <button
                                                key={tag}
                                                className={styles.tagButton}
                                                onClick={() => {
                                                    setSearchTerm(tag);
                                                    setActiveCategory('Todos');
                                                }}
                                            >
                                                #{tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* ===== RESULTADOS ===== */}
                    {filteredPosts.length === 0 ? (
                        <div className={styles.emptyState}>
                            <FaSearch className={styles.emptyIcon} />
                            <h3 className={styles.emptyTitle}>No encontramos resultados</h3>
                            <p className={styles.emptyText}>
                                {searchTerm || activeCategory !== 'Todos' ? (
                                    <>
                                        No hay artículos que coincidan con <strong>"{searchTerm}"</strong>
                                        {activeCategory !== 'Todos' && ` en la categoría ${activeCategory}`}
                                    </>
                                ) : (
                                    'No hay artículos publicados aún.'
                                )}
                            </p>
                            {(searchTerm || activeCategory !== 'Todos') && (
                                <button
                                    className={styles.emptyButton}
                                    onClick={clearSearch}
                                >
                                    Ver todos los artículos
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className={styles.resultsCount}>
                                {searchTerm || activeCategory !== 'Todos' ? (
                                    <>
                                        Mostrando <strong>{filteredPosts.length}</strong> de <strong>{posts.length}</strong> artículos
                                        {searchTerm && ` que coinciden con "${searchTerm}"`}
                                        {activeCategory !== 'Todos' && ` en ${activeCategory}`}
                                    </>
                                ) : (
                                    `Mostrando ${filteredPosts.length} artículos`
                                )}
                            </div>

                            <Row className="g-4">
                                {filteredPosts.map((post: PostFromDB, index: number) => (
                                    <Col lg={6} key={post.id}>
                                        <Link href={`/blog/${post.slug}`} className="text-decoration-none d-block h-100">
                                            <Card
                                                className={`${styles.blogCardPowa} border-0 h-100 fadeInUp`}
                                                style={{ animationDelay: `${(index + 1) * 0.05}s` }}
                                            >
                                                <Card.Body className="d-flex flex-column p-4">

                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <span className={styles.postCategory}>
                                                            {post.meta_keywords?.split(',')[0] || 'Artículo'}
                                                        </span>
                                                        <span className={styles.postDate}>
                                                            <FaCalendarAlt className="me-2" size={12} />
                                                            {new Date(post.created_at).toLocaleDateString('es-AR', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>

                                                    <div className="d-flex align-items-start mb-3">
                                                        <div className={styles.postEmoji} aria-hidden="true">
                                                            📝
                                                        </div>
                                                        <h3 className={`${styles.postTitle} mb-0 ms-3`}>
                                                            {post.titulo}
                                                        </h3>
                                                    </div>

                                                    <p className={styles.postExcerpt}>
                                                        {post.extracto || 'Sin extracto disponible.'}
                                                    </p>

                                                    <div className="mt-auto pt-3">
                                                        <span className={styles.btnReadMore}>
                                                            Leer Artículo
                                                            <FaArrowRight className={`${styles.iconArrow} ms-2`} size={12} />
                                                        </span>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}
                </Container>

                {showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        className={styles.scrollTopButton}
                        aria-label="Volver arriba"
                    >
                        <FaArrowUp />
                    </button>
                )}
            </div>
        </>
    );
}