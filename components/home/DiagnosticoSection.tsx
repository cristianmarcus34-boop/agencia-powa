'use client';

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import posthog from 'posthog-js';
import { FaCheckCircle, FaRocket } from 'react-icons/fa';
import styles from '@/app/page.module.css';

export default function DiagnosticoSection() {
    const [diagnosticoEnviado, setDiagnosticoEnviado] = useState(false);

    const handleDiagnosticoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const url = formData.get('url') as string;

        posthog.capture('diagnostico_gratuito_enviado', {
            origen: 'home_diagnostico_expres',
            email_dominio: email?.split('@')[1] || 'desconocido',
            tiene_url: !!url,
        });

        setDiagnosticoEnviado(true);
        setTimeout(() => setDiagnosticoEnviado(false), 5000);
    };

    return (
        <section className={styles.diagnosticoSection}>
            <Container>
                <div className={styles.diagnosticoCard}>
                    <div className={styles.diagnosticoGlow} />
                    <Row className="align-items-center g-4">
                        <Col lg={7}>
                            <div className={styles.diagnosticoContent}>
                                <span className={styles.diagnosticoBadge}>🎯 GRATUITO</span>
                                <h2 className={styles.diagnosticoTitle}>¿Tu plataforma está <br /><span className={styles.textGradient}>funcionando al máximo?</span></h2>
                                <p className={styles.diagnosticoDesc}>Obtené un <strong>diagnóstico técnico gratuito</strong> en 24hs. Analizamos velocidad, seguridad, SEO y escalabilidad de tu sitio actual.</p>
                                <ul className={styles.diagnosticoBeneficios}>
                                    <li><FaCheckCircle className={styles.diagnosticoCheck} /><span>Análisis de performance y velocidad</span></li>
                                    <li><FaCheckCircle className={styles.diagnosticoCheck} /><span>Detección de cuellos de botella</span></li>
                                    <li><FaCheckCircle className={styles.diagnosticoCheck} /><span>Recomendaciones concretas de mejora</span></li>
                                    <li><FaCheckCircle className={styles.diagnosticoCheck} /><span>Sin compromiso ni obligación</span></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={5}>
                            <div className={styles.diagnosticoFormWrapper}>
                                <div className={styles.diagnosticoFormHeader}>
                                    <FaRocket className={styles.diagnosticoFormIcon} />
                                    <h4>Diagnóstico exprés</h4>
                                    <p>Recibí tu análisis en 24hs</p>
                                </div>
                                <form action="https://api.web3forms.com/submit" method="POST" className={styles.diagnosticoForm} onSubmit={handleDiagnosticoSubmit}>
                                    <input type="hidden" name="access_key" value="6a22a375-6730-499d-ab20-b86e359f069d" />
                                    <input type="hidden" name="subject" value="📋 Nuevo diagnóstico técnico - Agencia Digital Powa" />
                                    <input type="hidden" name="from_name" value="Agencia Digital Powa" />
                                    <input type="hidden" name="redirect" value="https://www.agenciadigitalpowa.com.ar/gracias" />
                                    <input type="hidden" name="origen" value="Diagnóstico - Página Principal" />
                                    <div className={styles.diagnosticoInputGroup}>
                                        <input type="text" name="nombre" className={styles.diagnosticoInput} placeholder="Tu nombre" required />
                                    </div>
                                    <div className={styles.diagnosticoInputGroup}>
                                        <input type="url" name="url" className={styles.diagnosticoInput} placeholder="URL de tu sitio web (ej: mipagina.com)" required />
                                        <input type="email" name="email" className={styles.diagnosticoInput} placeholder="Tu email" required />
                                    </div>
                                    <div className={styles.diagnosticoInputGroup}>
                                        <input type="tel" name="telefono" className={styles.diagnosticoInput} placeholder="Tu teléfono (opcional)" />
                                    </div>
                                    <div className={styles.diagnosticoInputGroup}>
                                        <textarea name="mensaje" className={styles.diagnosticoTextarea} placeholder="Contanos qué necesitás mejorar o qué problema tenés con tu sitio..." rows={3} />
                                    </div>
                                    <button type="submit" className={styles.diagnosticoButton}>Quiero mi diagnóstico</button>
                                    <p className={styles.diagnosticoFooter}>🔒 Tu información está segura. No compartimos tus datos.</p>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
}