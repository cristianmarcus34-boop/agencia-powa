'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft, FaCalendarAlt, FaUserCircle, FaWhatsapp, FaClock } from 'react-icons/fa';
import Link from 'next/link';
import { blogPosts } from '../../../data/posts';

import styles from '../blog.module.css';

export default function PostPage() {
    const params = useParams();
    const postId = params?.id;

    const post = blogPosts.find((p) => p.id === postId);

    // Mantenemos el scroll reactivo al cambio de ID por seguridad en rutas dinámicas concurrentes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [postId]);

    if (!post) {
        return (
            <div className={`${styles.blogPageWrapper} d-flex align-items-center justify-content-center text-center py-5`}>
                <Container>
                    <h2 className="text-white fw-bold mb-3">Artículo no encontrado</h2>
                    <p className="text-muted mb-4">La ruta solicitada no existe o el recurso fue movido.</p>
                    <Link href="/blog" className={styles.btnPowaErrorLink}>
                        <FaArrowLeft className="me-2" /> Volver al Blog
                    </Link>
                </Container>
            </div>
        );
    }

    return (
        <div className={styles.blogPageWrapper}>
            <div className={styles.ambientGlow} />
            
            <Container className="py-5 mt-5 relative z-10">
                <Row className="justify-content-center">
                    <Col lg={8} md={10}>
                        
                        {/* Navegación Semántica Estilizada */}
                        <Link href="/blog" className={`${styles.btnReadMore} d-inline-flex mb-5`}>
                            <FaArrowLeft className="me-2" size={12} /> Volver a Insights
                        </Link>

                        {/* Cabecera del Artículo */}
                        <header className="mb-5">
                            <span className={`${styles.postCategory} mb-3 d-inline-block`}>
                                {post.category}
                            </span>
                            <h1 className={styles.postFullTitle}>
                                {post.title}
                            </h1>
                            
                            <div className="d-flex align-items-center flex-wrap mt-4 gap-4 text-muted fw-medium fs-7">
                                <div className="d-flex align-items-center">
                                    <FaUserCircle className="me-2 text-cyan" />
                                    <span className="text-slate-300">Powa Team</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <FaCalendarAlt className="me-2 text-cyan" />
                                    <span className="text-slate-300">{post.date}</span>
                                </div>
                                {post.readTime && (
                                    <div className="d-flex align-items-center">
                                        <FaClock className="me-2 text-cyan" />
                                        <span className="text-slate-300">{post.readTime}</span>
                                    </div>
                                )}
                            </div>
                        </header>

                        {/* Cuerpo del Artículo */}
                        <article className={styles.articleContainer}>
                            <div className={styles.articleHeroEmoji} aria-hidden="true">
                                {post.emoji}
                            </div>
                            
                            {/* Renderizado dinámico seguro y sanitizado por estilos tipográficos */}
                            <div 
                                className={styles.postDynamicContent}
                                dangerouslySetInnerHTML={{ __html: post.content }} 
                            />
                        </article>

                        {/* Caja de CTA Final (Estilo Glassmorphism de Alta Fidelidad) */}
                        <div className={styles.postCtaBox}>
                            <h3 className="text-white fw-bold mb-3">¿Necesitás resultados reales en tu web?</h3>
                            <p className="text-muted mb-4">Optimizamos tu infraestructura tecnológica para que cada clic en tus campañas convierta.</p>
                            <a 
                                href="https://wa.me/5491138305837" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={styles.btnCtaWhatsapp}
                            >
                                <FaWhatsapp className="me-2 fs-5" /> Hablemos por WhatsApp
                            </a>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    );
}