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

// Importación de datos estáticos descentralizados
import { blogPosts, Post } from '../../data/posts';
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

// ===== TAGS POPULARES =====
const POPULAR_TAGS = [
    'Next.js', 'TypeScript', 'Performance', 'SEO',
    'Arquitectura', 'DevOps', 'UX/UI', 'Cloud'
];

export default function BlogPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('Todos');
    const [showScrollTop, setShowScrollTop] = useState(false);

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

        return blogPosts.filter(post => {
            if (!searchLower && activeCategory === 'Todos') {
                return true;
            }

            const matchesSearch = !searchLower ||
                post.title.toLowerCase().includes(searchLower) ||
                post.excerpt.toLowerCase().includes(searchLower) ||
                post.category.toLowerCase().includes(searchLower);

            const matchesCategory = activeCategory === 'Todos' ||
                post.category === activeCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

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
        "url": "https://tu-dominio.com/blog",
        "blogPosts": blogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "author": {
                "@type": "Organization",
                "name": "Powa Agency"
            }
        }))
    };

    return (
        <>
            {/* ===== SCHEMA ===== */}
            <Script
                id="blog-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />

            <div className={styles.blogPageWrapper}>
                <div className={styles.ambientGlow} />
                <div className={styles.ambientGlowSecondary} />

                <Container className="py-5 mt-5 relative z-10">
                    {/* ===== HEADER ===== */}
                    <header className="text-center mb-5">
                        <span className={styles.badgePowaAccent}>Conocimiento Técnico</span>
                        <h1 className={styles.blogMainTitle}>
                            Powa <span className={styles.textGradient}>Insights</span>
                        </h1>
                        <p className={styles.heroSubtitleModern}>
                            Perspectivas globales sobre ingeniería de software, optimización de performance y arquitectura escalable.
                        </p>

                        {/* ===== CONTADOR DE POSTS ===== */}
                        <div className={styles.postCounter}>
                            <FaClock className={styles.counterIcon} />
                            <span>{blogPosts.length} artículos publicados</span>
                        </div>
                    </header>

                    {/* ===== FILTROS Y BÚSQUEDA ===== */}
                    <Row className="justify-content-center mb-4">
                        <Col lg={10}>
                            <div className={styles.filtersWrapper}>
                                {/* Buscador */}
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

                                {/* Filtros por categoría */}
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

                                {/* ===== TAGS POPULARES ===== */}
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
                                No hay artículos que coincidan con <strong>"{searchTerm}"</strong> en la categoría <strong>{activeCategory}</strong>.
                            </p>
                            <button
                                className={styles.emptyButton}
                                onClick={clearSearch}
                            >
                                Ver todos los artículos
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* ===== RESULTADOS COUNT ===== */}
                            <div className={styles.resultsCount}>
                                {searchTerm || activeCategory !== 'Todos' ? (
                                    <>
                                        Mostrando <strong>{filteredPosts.length}</strong> de <strong>{blogPosts.length}</strong> artículos
                                        {searchTerm && ` que coinciden con "${searchTerm}"`}
                                        {activeCategory !== 'Todos' && ` en ${activeCategory}`}
                                    </>
                                ) : (
                                    `Mostrando ${filteredPosts.length} artículos`
                                )}
                            </div>

                            {/* ===== GRID DE POSTS ===== */}
                            <Row className="g-4">
                                {filteredPosts.map((post: Post, index: number) => (
                                    <Col lg={6} key={post.id}>
                                        <Link href={`/blog/${post.id}`} className="text-decoration-none d-block h-100">
                                            <Card
                                                className={`${styles.blogCardPowa} border-0 h-100 fadeInUp`}
                                                style={{ animationDelay: `${(index + 1) * 0.05}s` }}
                                            >
                                                <Card.Body className="d-flex flex-column p-4">

                                                    {/* ===== CATEGORÍA Y FECHA ===== */}
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <span className={styles.postCategory}>
                                                            {post.category}
                                                        </span>
                                                        <span className={styles.postDate}>
                                                            <FaCalendarAlt className="me-2" size={12} />
                                                            {post.date}
                                                        </span>
                                                    </div>

                                                    {/* ===== TÍTULO CON EMOJI ===== */}
                                                    <div className="d-flex align-items-start mb-3">
                                                        <div className={styles.postEmoji} aria-hidden="true">
                                                            {post.emoji}
                                                        </div>
                                                        <h3 className={`${styles.postTitle} mb-0 ms-3`}>
                                                            {post.title}
                                                        </h3>
                                                    </div>

                                                    {/* ===== EXTRACTO ===== */}
                                                    <p className={styles.postExcerpt}>
                                                        {post.excerpt}
                                                    </p>

                                                    {/* ===== META INFO ===== */}
                                                    {post.readTime && (
                                                        <div className={styles.postMeta}>
                                                            <FaClock className={styles.metaIcon} />
                                                            <span>{post.readTime} de lectura</span>
                                                        </div>
                                                    )}

                                                    {/* ===== BOTÓN DE ACCIÓN ===== */}
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

                {/* ===== BOTÓN VOLVER ARRIBA ===== */}
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