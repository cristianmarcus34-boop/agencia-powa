// app/blog/[slug]/PostClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    FaArrowLeft,
    FaCalendarAlt,
    FaUserCircle,
    FaWhatsapp,
    FaClock,
    FaTag,
} from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

import styles from '../blog.module.css';
import ShareButtons from '../components/ShareButtons';
import ScrollToTop from '../components/ScrollToTop';
import ReadingProgress from '../components/ReadingProgress';
import PostContent from '../components/PostContent';

// ============================================
// TIPOS (inline para evitar import desde page.tsx)
// ============================================
interface PostFromDB {
    id: string;
    titulo: string;
    slug: string;
    contenido: string;
    extracto: string;
    imagen_url: string | null;
    imagen_alt: string | null;
    created_at: string;
    meta_keywords: string | null;
    meta_descripcion: string | null;
    emoji: string | null;
    read_time: string | null;
}

interface RelatedPost {
    id: string;
    titulo: string;
    slug: string;
    emoji: string | null;
}

interface PostClientProps {
    post: PostFromDB;
    relatedPosts: RelatedPost[];
}

// ============================================
// SANITIZADO EN CLIENTE (lazy, sin jsdom)
// ============================================
function useSanitizedHtml(html: string) {
    const [sanitized, setSanitized] = useState<string>('');

    useEffect(() => {
        // Solo en el cliente, importamos DOMPurify dinámicamente.
        // En el primer render (SSR), devolvemos el HTML crudo (no sanitizado)
        // para que el HTML inicial del artículo esté presente (SEO).
        // Después de hidratar, sanitizamos en el browser.
        let cancelled = false;

        (async () => {
            const mod = await import('dompurify');
            const DOMPurify = mod.default;
            const clean = DOMPurify.sanitize(html, {
                ADD_TAGS: ['iframe'],
                ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
            });
            if (!cancelled) setSanitized(clean);
        })();

        return () => { cancelled = true; };
    }, [html]);

    return sanitized;
}

export default function PostClient({ post, relatedPosts }: PostClientProps) {
    // 👇 HTML crudo para el primer render (SSR) — SEO ✅
    // Luego se reemplaza por el sanitizado en el cliente.
    const sanitizedContent = useSanitizedHtml(post.contenido || '');
    const contentToRender = sanitizedContent || post.contenido || '';

    // ===== SCHEMA JSON-LD =====
    const postSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.titulo,
        description: post.extracto,
        image: post.imagen_url || undefined,
        datePublished: post.created_at,
        author: {
            '@type': 'Organization',
            name: 'Powa Agency',
            url: 'https://www.agenciadigitalpowa.com.ar',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Powa Agency',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.agenciadigitalpowa.com.ar/logo-agenciadigitalpowa-redondo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.agenciadigitalpowa.com.ar/blog/${post.slug}`,
        },
    };

    return (
        <>
            <ReadingProgress />

            <Script
                id="post-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
            />

            <div className={styles.blogPageWrapper}>
                <div className={styles.ambientGlow} />
                <div className={styles.ambientGlowSecondary} />

                <Container className="py-5 mt-5" style={{ position: 'relative', zIndex: 10 }}>
                    <Row className="justify-content-center">
                        <Col lg={8} md={10}>

                            <Link href="/blog" className={`${styles.backLink} d-inline-flex mb-4`}>
                                <FaArrowLeft className="me-2" size={14} /> Volver a Insights
                            </Link>

                            <header className="mb-5">
                                <div className={styles.postHeader}>
                                    <span className={`${styles.postCategory} mb-3 d-inline-block`}>
                                        <FaTag className="me-1" size={10} />
                                        {post.meta_keywords?.split(',')[0]?.trim() || 'Artículo'}
                                    </span>

                                    <h1 className={styles.postFullTitle}>
                                        {post.titulo}
                                    </h1>

                                    <div className={styles.postMetaInfo}>
                                        <div className={styles.metaItem}>
                                            <FaUserCircle className={styles.metaIcon} />
                                            <span>Powa Team</span>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <FaCalendarAlt className={styles.metaIcon} />
                                            <span>
                                                {new Date(post.created_at).toLocaleDateString('es-AR', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        {post.read_time && (
                                            <div className={styles.metaItem}>
                                                <FaClock className={styles.metaIcon} />
                                                <span>{post.read_time} de lectura</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </header>

                            <article className={styles.articleContainer}>
                                {post.imagen_url ? (
                                    <div className={styles.articleCoverWrapper}>
                                        <Image
                                            src={post.imagen_url}
                                            alt={post.imagen_alt || post.titulo}
                                            fill
                                            sizes="(max-width: 992px) 100vw, 800px"
                                            className={styles.articleCoverImage}
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div className={styles.articleHeroEmoji} aria-hidden="true">
                                        {post.emoji || '📝'}
                                    </div>
                                )}

                                {/* 👇 HTML crudo en SSR, sanitizado después de hidratar */}
                                <PostContent html={contentToRender} />
                            </article>

                            <ShareButtons title={post.titulo} slug={post.slug} />

                            {relatedPosts.length > 0 && (
                                <section className={styles.relatedSection}>
                                    <h3 className={styles.relatedTitle}>
                                        📚 Artículos relacionados
                                    </h3>
                                    <Row className="g-3">
                                        {relatedPosts.map((related) => (
                                            <Col md={4} key={related.id}>
                                                <Link href={`/blog/${related.slug}`} className={styles.relatedLink}>
                                                    <div className={styles.relatedCard}>
                                                        <span className={styles.relatedEmoji}>
                                                            {related.emoji || '📝'}
                                                        </span>
                                                        <h4 className={styles.relatedPostTitle}>
                                                            {related.titulo}
                                                        </h4>
                                                        <span className={styles.relatedReadMore}>
                                                            Leer más →
                                                        </span>
                                                    </div>
                                                </Link>
                                            </Col>
                                        ))}
                                    </Row>
                                </section>
                            )}

                            <div className={styles.postCtaBox}>
                                <div className={styles.ctaContent}>
                                    <FaWhatsapp className={styles.ctaWhatsappIcon} />
                                    <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
                                        ¿Necesitás resultados reales en tu web?
                                    </h3>
                                    <p style={{ color: 'var(--slate-400)', marginBottom: '1.5rem' }}>
                                        Optimizamos tu infraestructura tecnológica para que cada clic en tus campañas convierta.
                                    </p>
                                    <a
                                        href="https://wa.me/5491138305837"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.btnCtaWhatsapp}
                                    >
                                        <FaWhatsapp className="me-2" /> Hablemos por WhatsApp
                                    </a>
                                </div>
                            </div>

                        </Col>
                    </Row>
                </Container>

                <ScrollToTop />
            </div>
        </>
    );
}