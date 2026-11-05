// app/apps/page.tsx
// ✅ SERVER COMPONENT: sin 'use client'
// Página dedicada a apps nativas Android publicadas en Google Play Store.

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import {
    FaArrowRight, FaCheckCircle, FaTimes, FaRocket,
    FaMobileAlt, FaGooglePlay, FaShieldAlt, FaClock,
    FaCode, FaLock, FaFileContract, FaSyncAlt,
} from 'react-icons/fa';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import styles from './apps.module.css';

// ===== DATA =====
const plans = [
    {
        id: 'express',
        name: 'App Express',
        forWho: 'Para el que recién arranca',
        price: '$2.200.000',
        priceDetail: 'pago único, sin mensualidad',
        badge: null,
        features: [
            '3 pantallas',
            'Sin login',
            'Sin base de datos',
            'Publicación en Google Play incluida',
            'Ficha de la app (ícono, capturas, descripción)',
            '2 semanas de entrega',
            '1 mes de soporte',
        ],
        notIncludes: ['Backend mensual', 'Mantenimiento continuo'],
        cta: 'Quiero mi app express',
    },
    {
        id: 'profesional',
        name: 'App Profesional',
        forWho: 'Para la PYME que quiere crecer',
        price: '$5.500.000',
        priceDetail: 'pago único',
        badge: 'El más pedido',
        features: [
            'Login + base de datos',
            'Panel admin web',
            '5-10 pantallas',
            'Notificaciones push',
            'Publicación en Google Play incluida',
            'Ficha de la app en Play Store',
            '4-6 semanas de entrega',
            '3 meses de soporte',
        ],
        notIncludes: ['Backend mensual', 'Mantenimiento continuo'],
        cta: 'Quiero mi app profesional',
    },
    {
        id: 'premium',
        name: 'App Premium',
        forWho: 'Para la empresa que quiere escalar',
        price: '$12.000.000',
        priceDetail: 'pago único',
        badge: null,
        features: [
            'Todo lo anterior +',
            'Pagos integrados',
            'Mapas / geolocalización',
            'Chat / mensajería',
            'Integraciones externas',
            'Publicación en Google Play incluida',
            '6-10 semanas de entrega',
            '6 meses de soporte',
        ],
        notIncludes: ['Backend mensual', 'Mantenimiento continuo'],
        cta: 'Quiero mi app premium',
    },
];

const processItems = [
    { id: 'req', step: '01', icon: <FaFileContract />, title: 'Requerimientos & Briefing', desc: 'Armamos un formulario técnico para entender tu negocio, qué integraciones necesitás y dónde se te está yendo la plata.' },
    { id: 'dev', step: '02', icon: <FaCode />, title: 'Desarrollo & Staging', desc: 'Codeamos bajo un manual de estilo riguroso. Vas a tener un entorno de pruebas privado para ver los avances en tiempo real.' },
    { id: 'qa', step: '03', icon: <FaCheckCircle />, title: 'QA & Despliegue en Play Store', desc: 'Probamos todo bajo presión: carga, seguridad y performance. Publicamos en Google Play con infraestructura escalable.' },
    { id: 'delivery', step: '04', icon: <FaRocket />, title: 'Acta de Entrega Final', desc: 'Te transferimos el repositorio, credenciales limpias y toda la documentación técnica. El código es tuyo, sin vueltas.' },
];

const faqs = [
    { q: '¿Cuánto tarda una app?', a: 'Depende del plan: 2 semanas (Express), 4-6 semanas (Profesional), 6-10 semanas (Premium).' },
    { q: '¿Puedo actualizarla después?', a: 'Sí. Tenés el código y los accesos. Podés actualizarla vos o contratarnos mantenimiento (15% del valor inicial por año).' },
    { q: '¿Es solo Android o también iOS?', a: 'El precio base es para Android. iOS se cotiza aparte (cuenta Apple Developer: USD 99/año + desarrollo).' },
    { q: '¿Quién paga la cuenta de Google Play?', a: 'Nosotros. Usamos nuestra cuenta de desarrollador verificada, así que no tenés que crearla ni pagar los USD 25.' },
    { q: '¿La app es mía?', a: 'Sí. El 100% de la propiedad intelectual del código es tuya. Te transferimos el repositorio, credenciales limpias y toda la documentación técnica al finalizar el proyecto.' },
    { q: '¿Puedo transferir la app a mi cuenta de Google Play?', a: 'Sí. La app se publica inicialmente bajo nuestra cuenta de desarrollador verificada. Si querés transferirla a tu propia cuenta, tenés 2 opciones: (1) Pagar un costo único de $150.000 ARS. (2) Contratar mantenimiento anual (15% del valor inicial) y la transferencia es GRATIS.' },
    { q: '¿Qué pasa si no transfiero la app?', a: 'La app sigue funcionando normalmente bajo nuestra cuenta. Vos tenés el código, los accesos y la propiedad intelectual. La transferencia es opcional.' },
    { q: '¿Puedo vender dentro de la app?', a: 'Sí, pero Google cobra 15-30% de comisión por pagos in-app. Si vendés por fuera (MercadoPago, Stripe), evitás esa comisión.' },
];

// ===== SERVER COMPONENT =====
export default function AppsPage() {
    return (
        <div className={styles.appsPage}>
            {/* ===== HERO ===== */}
            <section className={styles.heroSection}>
                <Container>
                    <div className={styles.heroContent}>
                        <div className={styles.heroBadge}>
                            <FaMobileAlt className="me-2" /> Android · Google Play Store
                        </div>
                        <h1 className={styles.heroTitle}>
                            Apps Nativas <span className={styles.textGradient}>Android</span> para PYMES y empresas
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Publicamos en Google Play Store con <strong>nuestra cuenta de desarrollador verificada</strong>.
                            Código y accesos para vos. Sin vueltas, sin letra chica.
                        </p>
                        <div className="d-flex flex-wrap gap-3 mt-4 justify-content-center">
                            <Link href="/contact" className={`${styles.btnPowaPrimary} text-decoration-none`}>
                                Cotizá tu app sin cargo <FaArrowRight className="ms-2" />
                            </Link>
                            <Link href="/portfolio" className={`${styles.btnPowaOutline} text-decoration-none`}>
                                Ver demos <HiOutlineArrowNarrowRight className="ms-2" />
                            </Link>
                        </div>
                        <div className={styles.heroTrustBadges}>
                            <span className={styles.trustBadge}><FaShieldAlt /> Código 100% tuyo</span>
                            <span className={styles.trustBadge}><FaGooglePlay /> Publicación incluida</span>
                            <span className={styles.trustBadge}><FaClock /> Respuesta en 24h</span>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ===== PLANES ===== */}
            <section className={styles.plansSection}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>PLANES</span>
                        <h2 className={styles.sectionTitle}>
                            Elegí el plan según <span className={styles.textGradient}>tu momento</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            No todas las apps son iguales. Elegí el pack que mejor se adapta a tu proyecto.
                            Los tres incluyen publicación en Google Play Store.
                        </p>
                    </div>
                    <Row className="g-4 justify-content-center">
                        {plans.map((plan) => (
                            <Col lg={4} md={6} key={plan.id}>
                                <div className={`${styles.planCard} ${plan.badge ? styles.planCardFeatured : ''}`}>
                                    {plan.badge && (
                                        <span className={styles.planBadge}>{plan.badge}</span>
                                    )}
                                    <h3 className={styles.planName}>{plan.name}</h3>
                                    <p className={styles.planForWho}>{plan.forWho}</p>
                                    <div className={styles.planPriceBlock}>
                                        <span className={styles.planPrice}>{plan.price}</span>
                                        <span className={styles.planPriceDetail}>{plan.priceDetail}</span>
                                    </div>
                                    <ul className={styles.planFeatures}>
                                        {plan.features.map((f, i) => (
                                            <li key={i}>
                                                <FaCheckCircle className={styles.planCheck} />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className={styles.planNotIncludes}>
                                        <span className={styles.planNotIncludesLabel}>No incluye:</span>
                                        <span>{plan.notIncludes.join(' · ')}</span>
                                    </div>
                                    <Link href="/contact" className={styles.planCta}>
                                        {plan.cta} <FaArrowRight className="ms-2" />
                                    </Link>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <p className={styles.plansFootnote}>
                        Todos los planes incluyen publicación en Google Play Store con nuestra cuenta de desarrollador verificada.
                        La cuenta de Google Play (USD 25) no se cobra al cliente.
                        <br />
                        <strong>Los precios están expresados en pesos argentinos (ARS) y se actualizan según el dólar oficial del día.</strong>{' '}
                        Consultá el valor actual antes de contratar.
                    </p>
                    <div className={styles.priceDisclaimer}>
                        <span className={styles.priceDisclaimerIcon}>💵</span>
                        <div>
                            <strong>Precios en ARS actualizados según dólar oficial</strong>
                            <p>Los valores publicados son de referencia. Al momento de contratar, se toma el dólar oficial del día (Banco Nación).</p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ===== QUÉ INCLUYE ===== */}
            <section className={styles.includesSection}>
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={6}>
                            <div className={styles.sectionHeader} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                                <span className={styles.sectionBadge}>QUÉ INCLUYE</span>
                                <h2 className={styles.sectionTitle}>
                                    Todo lo que <span className={styles.textGradient}>necesitás</span>
                                </h2>
                            </div>
                            <ul className={styles.includesList}>
                                <li><FaCheckCircle className={styles.includesCheck} /> Diseño UI/UX de la app</li>
                                <li><FaCheckCircle className={styles.includesCheck} /> Desarrollo nativo Android (Kotlin o React Native)</li>
                                <li><FaCheckCircle className={styles.includesCheck} /> Backend (si la app lo necesita)</li>
                                <li><FaCheckCircle className={styles.includesCheck} /> Panel admin web (si la app lo necesita)</li>
                                <li><FaCheckCircle className={styles.includesCheck} /> Publicación en Google Play Store incluida</li>
                                <li><FaCheckCircle className={styles.includesCheck} /> Ficha de la app en Play Store</li>
                                <li><FaCheckCircle className={styles.includesCheck} /> Soporte post-lanzamiento (según plan)</li>
                            </ul>
                        </Col>
                        <Col lg={6}>
                            <div className={styles.notIncludesBox}>
                                <h3 className={styles.notIncludesTitle}>Lo que NO incluye</h3>
                                <ul className={styles.notIncludesList}>
                                    <li><FaTimes className={styles.notIncludesIcon} /> Backend / hosting mensual (se cotiza aparte)</li>
                                    <li><FaTimes className={styles.notIncludesIcon} /> Mantenimiento continuo (15% del valor inicial por año)</li>
                                    <li><FaTimes className={styles.notIncludesIcon} /> Actualizaciones mayores (se cotizan aparte)</li>
                                    <li><FaTimes className={styles.notIncludesIcon} /> Publicación en App Store (iOS) (se cotiza aparte)</li>
                                </ul>
                                <div className={styles.optionalBox}>
                                    <span className={styles.optionalLabel}>Servicios opcionales</span>
                                    <ul className={styles.optionalList}>
                                        <li>Transferencia a tu cuenta de Google Play: <strong>$150.000 ARS</strong> <em>(GRATIS si contratás mantenimiento anual)</em></li>
                                        <li>Publicación en App Store (iOS): se cotiza aparte</li>
                                        <li>Mantenimiento continuo: 15% del valor inicial por año</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* ===== PROCESO ===== */}
            <section className={styles.processSection}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>CÓMO TRABAJAMOS</span>
                        <h2 className={styles.sectionTitle}>
                            4 pasos para <span className={styles.textGradient}>lanzar tu app</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Un flujo de trabajo predecible, transparente y blindado de punta a punta.
                        </p>
                    </div>
                    <Row className="g-4">
                        {processItems.map((item) => (
                            <Col lg={3} md={6} key={item.id}>
                                <div className={styles.processCard}>
                                    <div className={styles.stepNumber}>{item.step}</div>
                                    <div className={styles.processIcon}>{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* ===== FAQ ===== */}
            <section className={styles.faqSection}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>PREGUNTAS FRECUENTES</span>
                        <h2 className={styles.sectionTitle}>
                            Dudas sobre <span className={styles.textGradient}>apps nativas</span>
                        </h2>
                    </div>
                    <Row className="g-3">
                        {faqs.map((faq, i) => (
                            <Col md={6} key={i}>
                                <div className={styles.faqItem}>
                                    <h4 className={styles.faqQuestion}>{faq.q}</h4>
                                    <p className={styles.faqAnswer}>{faq.a}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* ===== CTA FINAL ===== */}
            <section className={styles.ctaSection}>
                <Container>
                    <div className={styles.ctaBox}>
                        <FaRocket className={styles.ctaIcon} />
                        <h2 className={styles.ctaTitle}>¿Listo para lanzar tu app?</h2>
                        <p className={styles.ctaText}>
                            Hablemos sobre cómo la tecnología puede resolver tus cuellos de botella actuales
                            y potenciar tu crecimiento.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link href="/contact" className={styles.btnPowaWhite}>
                                Cotizá tu app sin cargo
                            </Link>
                            <Link href="/faq" className={styles.ctaSecondary}>
                                Ver más preguntas
                            </Link>
                        </div>
                        <div className={styles.ctaTrustBadges}>
                            <span>✅ Sin compromiso</span>
                            <span>🔒 100% confidencial</span>
                            <span>⚡ Respuesta en 1 día hábil</span>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}