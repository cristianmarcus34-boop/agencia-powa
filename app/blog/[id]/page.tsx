'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft, FaCalendarAlt, FaUserCircle, FaWhatsapp, FaClock } from 'react-icons/fa';
import { blogPosts, Post } from '../../../data/posts';

// Usamos el mismo CSS Module del blog para mantener consistencia
import styles from '../blog.module.css';

export default function PostPage() {
    const params = useParams();
    const router = useRouter();
    const postId = params.id;

    const post = blogPosts.find((p) => p.id === postId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [postId]);

    if (!post) {
        return (
            <div className={styles.blogPageWrapper + " text-center py-5"}>
                <h2 className="text-white">Artículo no encontrado</h2>
                <button className="btn btn-info mt-3" onClick={() => router.push('/blog')}>
                    <FaArrowLeft className="me-2" /> Volver al Blog
                </button>
            </div>
        );
    }

    return (
        <div className={styles.blogPageWrapper}>
            <Container className="py-5 mt-5">
                <Row className="justify-content-center">
                    <Col lg={8} md={10}>
                        {/* Botón Volver con estilo Powa */}
                        <button 
                            className={styles.btnReadMore + " mb-5"} 
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            onClick={() => router.push('/blog')}
                        >
                            <FaArrowLeft className="me-2" /> Volver a Insights
                        </button>

                        {/* Cabecera del Artículo */}
                        <header className="mb-5">
                            <span className={styles.postCategory + " mb-3 d-inline-block"}>
                                {post.category}
                            </span>
                            <h1 className={styles.blogMainTitle} style={{ textAlign: 'left', lineHeight: '1.2' }}>
                                {post.title}
                            </h1>
                            
                            <div className="d-flex align-items-center flex-wrap mt-4 text-white-50">
                                <div className="d-flex align-items-center me-4 mb-2">
                                    <FaUserCircle className="me-2 text-info" />
                                    <span>Powa Team</span>
                                </div>
                                <div className="d-flex align-items-center me-4 mb-2">
                                    <FaCalendarAlt className="me-2 text-info" />
                                    <span>{post.date}</span>
                                </div>
                                {post.readTime && (
                                    <div className="d-flex align-items-center mb-2">
                                        <FaClock className="me-2 text-info" />
                                        <span>{post.readTime}</span>
                                    </div>
                                )}
                            </div>
                        </header>

                        {/* Cuerpo del Artículo */}
                        <article>
                            <div style={{ fontSize: '3.5rem', marginBottom: '30px' }}>{post.emoji}</div>
                            
                            <div 
                                className={styles.postExcerpt} // Reutilizamos estilos de texto
                                style={{ fontSize: '1.15rem', color: '#f8fafc' }}
                                dangerouslySetInnerHTML={{ __html: post.content }} 
                            />
                        </article>

                        {/* Caja de CTA Final (Estilo Glassmorphism) */}
                        <div className="mt-5 p-4 p-md-5 rounded-4 border border-info border-opacity-25" 
                             style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)' }}>
                            <h3 className="text-white mb-3">¿Necesitás resultados reales en tu web?</h3>
                            <p className="text-white-50 mb-4">Optimizamos tu tecnología para que cada clic en tus anuncios cuente.</p>
                            <a 
                                href="https://wa.me/5491138305837" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-info d-inline-flex align-items-center fw-bold px-4 py-2 text-dark"
                                style={{ borderRadius: '12px' }}
                            >
                                <FaWhatsapp className="me-2 fs-4" /> Hablemos por WhatsApp
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}