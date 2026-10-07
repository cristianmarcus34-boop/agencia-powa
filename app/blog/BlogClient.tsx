// app/blog/BlogClient.tsx
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
import Image from 'next/image';
import type { PostFromDB } from './page';
import styles from './blog.module.css';

// ===== CONSTANTES =====
const CATEGORIES = [
    'Todos',
    'Arquitectura',
    'Performance',
    'Seguridad',
    'UX/UI',
    'DevOps',
    'Estrategia',
] as const;

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    Arquitectura: <FaCode />,
    Performance: <FaRocket />,
    Seguridad: <FaShieldAlt />,
    'UX/UI': <FaMobileAlt />,
    DevOps: <FaCloudUploadAlt />,
    Estrategia: <FaChartLine />,
};

const POPULAR_TAGS = [
    'Next.js', 'TypeScript', 'Performance', 'SEO',
    'Arquitectura', 'DevOps', 'UX/UI', 'Cloud',
];

interface BlogClientProps {
    posts: PostFromDB[];
}

export default function BlogClient({ posts }: BlogClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('Todos');
    const [showScrollTop, setShowScrollTop] = useState(false);

    // ===== SCROLL TOP =====
    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 500);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ===== FILTRADO =====
    const filteredPosts = useMemo(() => {
        const searchLower = searchTerm.toLowerCase().trim();
        const catLower = activeCategory.toLowerCase();

        return posts.filter((post) => {
            const matchesSearch =
                !searchLower ||
                post.titulo.toLowerCase().includes(searchLower) ||
                post.extracto?.toLowerCase().includes(searchLower) ||
                post.meta_keywords?.toLowerCase().includes(searchLower);

            const matchesCategory =
                activeCategory === 'Todos' ||
                (post.meta_keywords?.toLowerCase().includes(catLower) ?? false);

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory, posts]);

    // ===== LIMPIAR BÚSQUEDA =====
    const clearSearch = () => {
        setSearchTerm('');
        setActiveCategory('Todos');
    };

    return (
        <div className={styles.blogPageWrapper}>
            <div className={styles.ambientGlow} />
            <div className={styles.ambientGlowSecondary} />

            <Container className="py-5 mt-5" style={{ position: 'relative', zIndex: 10 }}>
                <header className="text-center mb-5">
                    <span className={styles.badgePowaAccent}>Conocimiento Técnico</span>
                    <h1 className={styles.blogMainTitle}>
                        Powa <span className={styles.textGradient}>Blog</span>
                    </h1>
                    <p className={styles.heroSubtitleModern}>
                        Artículos sobre ingeniería de software, optimización de rendimiento y arquitectura escalable para tu negocio.
                    </p>

                    <div className={styles.postCounter}>
                        <FaClock className={styles.counterIcon} />
                        <span>
                            {posts.length} {posts.length === 1 ? 'artículo publicado' : 'artículos publicados'}
                        </span>
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
                                        className={`${styles.filterButton} ${activeCategory === cat ? styles.activeFilter : ''
                                            }`}
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
                                    No hay artículos que coincidan con <strong>&quot;{searchTerm}&quot;</strong>
                                    {activeCategory !== 'Todos' && ` en la categoría ${activeCategory}`}
                                </>
                            ) : (
                                'No hay artículos publicados aún.'
                            )}
                        </p>
                        {(searchTerm || activeCategory !== 'Todos') && (
                            <button className={styles.emptyButton} onClick={clearSearch}>
                                Ver todos los artículos
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className={styles.resultsCount}>
                            {searchTerm || activeCategory !== 'Todos' ? (
                                <>
                                    Mostrando <strong>{filteredPosts.length}</strong> de{' '}
                                    <strong>{posts.length}</strong> artículos
                                    {searchTerm && ` que coinciden con "${searchTerm}"`}
                                    {activeCategory !== 'Todos' && ` en ${activeCategory}`}
                                </>
                            ) : (
                                `Mostrando ${filteredPosts.length} ${filteredPosts.length === 1 ? 'artículo' : 'artículos'
                                }`
                            )}
                        </div>

                        <Row className="g-4">
                            {filteredPosts.map((post, index) => (
                                <Col lg={6} key={post.id}>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-decoration-none d-block h-100"
                                    >
                                        <Card
                                            className={`${styles.blogCardPowa} border-0 h-100 fadeInUp`}
                                            style={{ animationDelay: `${(index + 1) * 0.05}s` }}
                                        >
                                            {post.imagen_url ? (
                                                <div className={styles.cardCoverWrapper}>
                                                    <Image
                                                        src={post.imagen_url}
                                                        alt={post.imagen_alt || post.titulo}
                                                        fill
                                                        sizes="(max-width: 992px) 100vw, 50vw"
                                                        className={styles.cardCoverImage}
                                                    />
                                                </div>
                                            ) : (
                                                <div className={styles.cardCoverWrapper}>
                                                    <div className={styles.cardCoverFallback}>
                                                        <span className={styles.cardFallbackIcon}>📝</span>
                                                    </div>
                                                </div>
                                            )}

                                            <Card.Body className="d-flex flex-column p-4">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <span className={styles.postCategory}>
                                                        {post.meta_keywords?.split(',')[0]?.trim() || 'Artículo'}
                                                    </span>
                                                    <span className={styles.postDate}>
                                                        <FaCalendarAlt className="me-2" size={12} />
                                                        {new Date(post.created_at).toLocaleDateString('es-AR', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </span>
                                                </div>

                                                <h3 className={styles.postTitle}>{post.titulo}</h3>

                                                <p className={styles.postExcerpt}>
                                                    {post.extracto || 'Sin extracto disponible.'}
                                                </p>

                                                <div className="mt-auto pt-3">
                                                    <span className={styles.btnReadMore}>
                                                        Leer Artículo
                                                        <FaArrowRight
                                                            className={`${styles.iconArrow} ms-2`}
                                                            size={12}
                                                        />
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
    );
}