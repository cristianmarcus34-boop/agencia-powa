'use client';

import React, { useMemo } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

// Importación de datos estáticos descentralizados
import { blogPosts, Post } from '../../data/posts'; 

import styles from './blog.module.css';

export default function BlogPage() {
    // Memorizamos la lista para mitigar re-evaluaciones innecesarias en re-renders globales
    const posts = useMemo(() => blogPosts, []);

    return (
        <div className={styles.blogPageWrapper}>
            <div className={styles.ambientGlow} />
            
            <Container className="py-5 mt-5 relative z-10">
                {/* Header de la sección */}
                <header className="text-center mb-5">
                    <span className={styles.badgePowaAccent}>Conocimiento Técnico</span>
                    <h1 className={styles.blogMainTitle}>
                        Powa <span className={styles.textGradient}>Insights</span>
                    </h1>
                    <p className={styles.heroSubtitleModern}>
                        Perspectivas globales sobre ingeniería de software, optimización de performance y arquitectura escalable.
                    </p>
                </header>

                {/* Grid de Posts */}
                <Row className="g-4">
                    {posts.map((post: Post) => (
                        <Col lg={6} key={post.id}>
                            {/* Semántica correcta para SEO: la tarjeta entera es un link semántico */}
                            <Link href={`/blog/${post.id}`} className="text-decoration-none d-block h-100">
                                <Card className={`${styles.blogCardPowa} border-0 h-100`}>
                                    <Card.Body className="d-flex flex-column p-4">
                                        
                                        {/* Categoría y Fecha */}
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <span className={styles.postCategory}>{post.category}</span>
                                            <span className={styles.postDate}>
                                                <FaCalendarAlt className="me-2" size={12} />
                                                {post.date}
                                            </span>
                                        </div>

                                        {/* Bloque de Título con Identificador */}
                                        <div className="d-flex align-items-start mb-3">
                                            <div className={styles.postEmoji} aria-hidden="true">
                                                {post.emoji}
                                            </div>
                                            <h3 className={`${styles.postTitle} mb-0 ms-3`}>
                                                {post.title}
                                            </h3>
                                        </div>

                                        {/* Extracto */}
                                        <p className={styles.postExcerpt}>
                                            {post.excerpt}
                                        </p>

                                        {/* Botón de Acción Estilizado */}
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
            </Container>
        </div>
    );
}