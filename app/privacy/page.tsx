// app/privacy/page.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { FaShieldAlt, FaLock, FaUserSecret, FaHandshake, FaArrowLeft } from 'react-icons/fa';
import styles from './privacy.module.css';

export const metadata = {
    title: 'Política de Privacidad y Confidencialidad | Agencia Digital Powa',
    description: 'Conocé cómo protegemos tu información y garantizamos la confidencialidad de tus proyectos en Agencia Digital Powa.',
};

export default function PrivacyPage() {
    return (
        <div className={styles.privacyWrapper}>
            <div className={styles.ambientGlow} />

            <Container className="position-relative z-2">
                <Row className="justify-content-center">
                    <Col lg={9} xl={8}>
                        {/* Header */}
                        <div className="text-center mb-5">
                            <span className={styles.badgePowa}>
                                <FaShieldAlt /> MARCO LEGAL Y SEGURIDAD
                            </span>
                            <h1 className={styles.title}>
                                Política de <span className={styles.textGradient}>Privacidad</span>
                            </h1>
                            <p className={styles.lastUpdated}>Última actualización: Enero 2026</p>
                        </div>

                        {/* Contenido Principal */}
                        <div className={styles.contentCard}>

                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    <FaLock className={styles.sectionIcon} /> 1. Compromiso de Confidencialidad
                                </h2>
                                <p className={styles.paragraph}>
                                    En <strong>Agencia Digital Powa</strong> (con base en Quilmes, Buenos Aires, Argentina), entendemos que la propiedad intelectual, las ideas de negocio y los datos comerciales de nuestros clientes son activos críticos. Por ello, asumimos un compromiso inquebrantable con la confidencialidad y la seguridad de la información desde el primer contacto.
                                </p>
                                <div className={styles.highlightBox}>
                                    <strong>Garantía Powa:</strong> Toda información compartida a través de nuestros formularios, llamadas de asesoramiento o reuniones técnicas se rige bajo estrictos estándares de secreto comercial, incluso antes de firmar un Acuerdo de Confidencialidad (NDA) formal.
                                </div>
                            </section>

                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    <FaUserSecret className={styles.sectionIcon} /> 2. Recolección y Uso de Datos
                                </h2>
                                <p className={styles.paragraph}>
                                    Los datos personales y comerciales que nos proporcionás a través de nuestros canales oficiales (nombre, correo electrónico, empresa y detalles del proyecto) son utilizados exclusivamente para:
                                </p>
                                <ul className={styles.list}>
                                    <li>Evaluar la viabilidad técnica y operativa de tu requerimiento.</li>
                                    <li>Elaborar propuestas comerciales, presupuestos y hojas de ruta personalizadas.</li>
                                    <li>Mantener comunicación directa vinculada al desarrollo y evolución del servicio contratado.</li>
                                </ul>
                                <p className={styles.paragraph}>
                                    <strong>No vendemos, alquilamos ni compartimos</strong> tu información con bases de datos publicitarias ni con terceros ajenos a la ejecución directa de tu solución tecnológica.
                                </p>
                            </section>

                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    <FaShieldAlt className={styles.sectionIcon} /> 3. Protección Tecnológica y Almacenamiento
                                </h2>
                                <p className={styles.paragraph}>
                                    Implementamos capas de seguridad de nivel corporativo para proteger tus datos:
                                </p>
                                <ul className={styles.list}>
                                    <li><strong>Zero Hardcoding & RLS:</strong> Accesos aislados mediante variables de entorno estrictas y Row Level Security en bases de datos.</li>
                                    <li><strong>Infraestructura Segura:</strong> Procesamiento de formularios y gestión de leads bajo protocolos encriptados (HTTPS / SSL).</li>
                                    <li><strong>Repositorios Privados:</strong> El código fuente y los entregables se alojan en entornos Git privados exclusivos para cada cliente.</li>
                                </ul>
                            </section>

                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    <FaHandshake className={styles.sectionIcon} /> 4. Acuerdos de Confidencialidad (NDA)
                                </h2>
                                <p className={styles.paragraph}>
                                    Para proyectos de gran envergadura, desarrollos de software propietarios o startups, extendemos un <strong>Acuerdo de Confidencialidad (NDA) formal y legalmente vinculante</strong> firmado por las partes antes de iniciar la etapa de arquitectura o escritura de código.
                                </p>
                            </section>

                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>5. Tus Derechos</h2>
                                <p className={styles.paragraph}>
                                    Tenés derecho absoluto a solicitar en cualquier momento el acceso, modificación o eliminación total de tus datos personales de nuestros registros comerciales enviando un correo electrónico a <strong>agenciadigitalpowa@gmail.com</strong>.
                                </p>
                            </section>

                        </div>

                        {/* Botón de Retorno */}
                        <div className={styles.backLinkWrapper}>
                            <Link href="/contact" className={styles.backButton}>
                                <FaArrowLeft /> Volver al formulario de contacto
                            </Link>
                        </div>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}