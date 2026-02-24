'use client';

import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

// Importación de datos desde la raíz
import { blogPosts, Post } from '../../data/posts'; 

// Importación del CSS Module (está en la misma carpeta)
import styles from './blog.module.css';

export default function BlogPage() {
    const router = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.blogPageWrapper}>
            <Container className="py-5 mt-5">
                {/* Header de la sección */}
                <div className="text-center mb-5 animate-fade-in">
                    <span className={styles.badgePowaAccent}>Conocimiento técnico</span>
                    <h1 className={styles.blogMainTitle}>
                        Powa <span className={styles.textGradient}>Insights</span>
                    </h1>
                    <p className={styles.heroSubtitleModern}>
                        Aprendé sobre el mundo digital con artículos escritos por desarrolladores y expertos en performance.
                    </p>
                </div>

                {/* Grid de Posts */}
                <Row className="g-4">
                    {blogPosts.map((post: Post) => (
                        <Col lg={6} key={post.id}>
                            <Card
                                className={`${styles.blogCardPowa} border-0`}
                                onClick={() => router.push(`/blog/${post.id}`)}
                            >
                                <Card.Body className="d-flex flex-column p-4">
                                    {/* Categoría y Fecha */}
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <span className={styles.postCategory}>{post.category}</span>
                                        <span className={styles.postDate}>
                                            <FaCalendarAlt className="me-2" />{post.date}
                                        </span>
                                    </div>

                                    {/* Título y Emoji */}
                                    <div className="d-flex align-items-center mb-3">
                                        <div className={styles.postEmoji}>
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

                                    {/* Botón Leer Más */}
                                    <div className="mt-auto pt-3">
                                        <div className={styles.btnReadMore}>
                                            Leer artículo <FaArrowRight className={`${styles.iconArrow} ms-2`} />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}