'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Row, Col } from 'react-bootstrap';
import {
    FaArrowLeft, FaCalendarAlt, FaUserCircle, FaWhatsapp,
    FaClock, FaShareAlt, FaCopy, FaCheck, FaTag,
    FaTwitter, FaLinkedin, FaLink
} from 'react-icons/fa';
import Link from 'next/link';
import { blogPosts } from '../../../data/posts';
import Script from 'next/script';

import styles from '../blog.module.css';

export default function PostPage() {
    const params = useParams();
    const postId = params?.id;
    const [copied, setCopied] = useState(false);

    const post = blogPosts.find((p) => p.id === postId);

    // Scroll al inicio
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [postId]);

    // ===== COMPARTIR =====
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error('Error al copiar:', err);
        }
    };

    const handleShare = (platform: 'twitter' | 'linkedin') => {
        const text = encodeURIComponent(`${post?.title} - Powa Insights`);
        const url = encodeURIComponent(shareUrl);

        const urls = {
            twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        };

        window.open(urls[platform], '_blank', 'width=600,height=400');
    };

    // ===== SCHEMA PARA EL POST =====
    const postSchema = post ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.date,
        "author": {
            "@type": "Organization",
            "name": "Powa Agency",
            "url": "https://tu-dominio.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Powa Agency"
        }
    } : null;

    if (!post) {
        return (
            <div className={`${styles.blogPageWrapper} d-flex align-items-center justify-content-center text-center py-5`}>
                <Container>
                    <div className={styles.error404}>
                        <span className={styles.errorEmoji}>🔍</span>
                        <h2 className="text-white fw-bold mb-3">Artículo no encontrado</h2>
                        <p className="text-muted mb-4">La ruta solicitada no existe o el recurso fue movido.</p>
                        <Link href="/blog" className={styles.btnPowaErrorLink}>
                            <FaArrowLeft className="me-2" /> Volver al Blog
                        </Link>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <>
            {/* ===== SCHEMA ===== */}
            {postSchema && (
                <Script
                    id="post-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
                />
            )}

            <div className={styles.blogPageWrapper}>
                <div className={styles.ambientGlow} />
                <div className={styles.ambientGlowSecondary} />

                <Container className="py-5 mt-5 relative z-10">
                    <Row className="justify-content-center">
                        <Col lg={8} md={10}>

                            {/* ===== NAVEGACIÓN ===== */}
                            <Link href="/blog" className={`${styles.backLink} d-inline-flex mb-4`}>
                                <FaArrowLeft className="me-2" size={14} /> Volver a Insights
                            </Link>

                            {/* ===== CABECERA DEL ARTÍCULO ===== */}
                            <header className="mb-5">
                                <div className={styles.postHeader}>
                                    <span className={`${styles.postCategory} mb-3 d-inline-block`}>
                                        <FaTag className="me-1" size={10} />
                                        {post.category}
                                    </span>

                                    <h1 className={styles.postFullTitle}>
                                        {post.title}
                                    </h1>

                                    <div className={styles.postMetaInfo}>
                                        <div className={styles.metaItem}>
                                            <FaUserCircle className={styles.metaIcon} />
                                            <span>Powa Team</span>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <FaCalendarAlt className={styles.metaIcon} />
                                            <span>{post.date}</span>
                                        </div>
                                        {post.readTime && (
                                            <div className={styles.metaItem}>
                                                <FaClock className={styles.metaIcon} />
                                                <span>{post.readTime} de lectura</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </header>

                            {/* ===== CUERPO DEL ARTÍCULO ===== */}
                            <article className={styles.articleContainer}>
                                <div className={styles.articleHeroEmoji} aria-hidden="true">
                                    {post.emoji}
                                </div>

                                <div
                                    className={styles.postDynamicContent}
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            </article>

                            {/* ===== BOTONES DE COMPARTIR ===== */}
                            <div className={styles.shareSection}>
                                <span className={styles.shareLabel}>Compartir este artículo</span>
                                <div className={styles.shareButtons}>
                                    <button
                                        className={styles.shareButton}
                                        onClick={() => handleShare('twitter')}
                                        aria-label="Compartir en Twitter"
                                    >
                                        <FaTwitter />
                                    </button>
                                    <button
                                        className={styles.shareButton}
                                        onClick={() => handleShare('linkedin')}
                                        aria-label="Compartir en LinkedIn"
                                    >
                                        <FaLinkedin />
                                    </button>
                                    <button
                                        className={`${styles.shareButton} ${copied ? styles.copied : ''}`}
                                        onClick={handleCopyLink}
                                        aria-label="Copiar enlace"
                                    >
                                        {copied ? <FaCheck /> : <FaCopy />}
                                    </button>
                                </div>
                            </div>

                            {/* ===== CTA FINAL ===== */}
                            <div className={styles.postCtaBox}>
                                <div className={styles.ctaContent}>
                                    <FaWhatsapp className={styles.ctaWhatsappIcon} />
                                    <h3 className="text-white fw-bold mb-2">
                                        ¿Necesitás resultados reales en tu web?
                                    </h3>
                                    <p className="text-muted mb-4">
                                        Optimizamos tu infraestructura tecnológica para que cada clic en tus campañas convierta.
                                    </p>
                                    <a
                                        href="https://wa.me/5491138305837"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.btnCtaWhatsapp}
                                    >
                                        <FaWhatsapp className="me-2 fs-5" /> Hablemos por WhatsApp
                                    </a>
                                </div>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}