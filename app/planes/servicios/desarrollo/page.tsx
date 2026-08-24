'use client';

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    FaMobileAlt, FaUsers, FaChartLine, FaCode,
    FaWhatsapp, FaCheckCircle, FaRocket,
    FaStar, FaCreditCard, FaCalendarCheck,
    FaHandshake, FaGem, FaArrowRight, FaShieldAlt,
    FaBolt, FaPalette, FaSearch, FaDatabase,
    FaCrown
} from 'react-icons/fa';
import Link from 'next/link';
import styles from './desarrollo.module.css';

// ===== TIPOS DE DESARROLLO =====
interface DevelopmentType {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    color: string;
    badge: string;
    features: string[];
}

// ===== OPCIONES DE PAGO =====
interface PaymentOption {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    badge?: string;
    popular?: boolean;
}

// ===== CONFIGURACIÓN =====
const DEVELOPMENT_TYPES: DevelopmentType[] = [
    {
        id: 'landing',
        name: 'Landing Page',
        icon: <FaMobileAlt />,
        description: 'Una página enfocada 100% en conversión y ventas',
        color: 'from-emerald-500 to-cyan-500',
        badge: '🚀 Conversión rápida',
        features: [
            'Diseño one-page optimizado para conversión',
            'Formulario de contacto o botón a WhatsApp',
            'Diseño 100% mobile first',
            'Carga ultrarrápida (90+ en Pagespeed)',
            'Optimización SEO básica',
            'Integración con Google Analytics',
            'Certificado SSL incluido'
        ]
    },
    {
        id: 'institutional',
        name: 'Sitio Institucional',
        icon: <FaUsers />,
        description: 'Presencia digital completa para tu marca',
        color: 'from-blue-500 to-purple-500',
        badge: '🏢 Más solicitado',
        features: [
            'Hasta 8 páginas/secciones principales',
            'Diseño premium con identidad de marca',
            'Optimización SEO avanzada',
            'Sección de servicios y portfolio',
            'Integración con redes sociales',
            'Mapa interactivo y contacto',
            'Blog o noticias (opcional)',
            'Formulario de contacto con CRM'
        ]
    },
    {
        id: 'ecommerce',
        name: 'Tienda Online',
        icon: <FaChartLine />,
        description: 'Vendé tus productos 24/7 con la mejor experiencia',
        color: 'from-orange-500 to-red-500',
        badge: '🛒 E-commerce',
        features: [
            'Catálogo de productos ilimitado',
            'Carrito de compras inteligente',
            'Pasarela de pagos (MercadoPago, PayPal)',
            'Panel de gestión de stock',
            'Cálculo de envíos e impuestos',
            'Historial de pedidos para clientes',
            'Dashboard de ventas para administrador',
            'Optimización SEO para productos'
        ]
    },
    {
        id: 'custom',
        name: 'Web App / Sistema',
        icon: <FaCode />,
        description: 'Soluciones personalizadas para procesos complejos',
        color: 'from-purple-500 to-pink-500',
        badge: '⚡ A medida',
        features: [
            'Arquitectura a medida según tu negocio',
            'Autenticación y roles de usuario',
            'Base de datos y APIs personalizadas',
            'Panel de administración completo',
            'Integraciones con sistemas externos',
            'Lógica de negocio personalizada',
            'Reportes y dashboards avanzados',
            'Escalabilidad y rendimiento optimizado'
        ]
    }
];

// ===== OPCIONES DE PAGO =====
const PAYMENT_OPTIONS: PaymentOption[] = [
    {
        id: 'unique',
        name: 'Pago Único',
        icon: <FaCreditCard />,
        description: 'Cancelás el 100% al inicio y obtenés un descuento especial',
        badge: '💰 Mejor precio'
    },
    {
        id: 'two_payments',
        name: '2 Cuotas',
        icon: <FaCalendarCheck />,
        description: '50% al inicio y 50% al entregar el proyecto',
        popular: true
    },
    {
        id: 'three_payments',
        name: '3 Cuotas',
        icon: <FaCalendarCheck />,
        description: '30% al inicio, 30% a mitad y 40% al entregar'
    },
    {
        id: 'custom',
        name: 'Plan a Medida',
        icon: <FaHandshake />,
        description: 'Te armamos un plan de pagos según tus necesidades',
        badge: '🤝 Flexibilidad total'
    }
];

// ===== PRECIOS POR TIPO Y OPCIÓN DE PAGO =====
const getPriceForOption = (typeId: string, optionId: string): { price: string, display: string } => {
    const basePrices = {
        landing: { unique: 150, two: 170, three: 190, custom: 0 },
        institutional: { unique: 350, two: 390, three: 420, custom: 0 },
        ecommerce: { unique: 700, two: 770, three: 840, custom: 0 },
        custom: { unique: 1200, two: 1320, three: 1450, custom: 0 }
    };

    const prices = basePrices[typeId as keyof typeof basePrices] || basePrices.landing;
    const price = prices[optionId as keyof typeof prices] || 0;

    if (optionId === 'custom') {
        return { price: '0', display: 'A cotizar' };
    }

    return { price: `${price}`, display: 'Consultar' };
};

export default function DesarrolloPage() {
    const [selectedType, setSelectedType] = useState<string>('landing');
    const [selectedPayment, setSelectedPayment] = useState<string>('unique');

    const currentType = DEVELOPMENT_TYPES.find(t => t.id === selectedType);
    const currentPayment = PAYMENT_OPTIONS.find(p => p.id === selectedPayment);

    const phoneNumber = "5491138305837";

    const handleWhatsApp = () => {
        if (!currentType || !currentPayment) return;

        const priceInfo = getPriceForOption(selectedType, selectedPayment);

        let message = `Hola! 👋\n\n`;
        message += `Me interesa contratar el desarrollo de *${currentType.name}*.\n`;
        message += `📦 Modalidad de pago: *${currentPayment.name}*\n`;

        if (priceInfo.display !== 'A cotizar') {
            message += `💰 Presupuesto estimado: *${priceInfo.price} USD*\n`;
        } else {
            message += `💰 Necesito un presupuesto personalizado\n`;
        }

        message += `\n¿Podemos coordinar para definir los detalles? 🚀`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className={styles.desarrolloWrapper}>
            {/* Efectos de fondo */}
            <div className={styles.ambientGlow} />
            <div className={styles.ambientGlowSecondary} />

            <Container>
                {/* ===== HEADER ===== */}
                <header className="text-center mb-5">
                    <span className={styles.badgePowa}>DESARROLLO WEB</span>
                    <h1 className={styles.desarrolloTitulo}>
                        Elegí tu <span className={styles.textGradient}>proyecto</span> y empezá a crecer
                    </h1>
                    <p className={styles.desarrolloSubtitle}>
                        Seleccioná el tipo de desarrollo que necesitás y elegí la modalidad de pago que mejor se adapte a tu presupuesto.
                    </p>
                </header>

                {/* ===== TIPOS DE DESARROLLO ===== */}
                <div className={styles.typesContainer}>
                    <Row className="g-3">
                        {DEVELOPMENT_TYPES.map((type) => {
                            const isSelected = selectedType === type.id;
                            return (
                                <Col key={type.id} md={3} sm={6}>
                                    <button
                                        onClick={() => setSelectedType(type.id)}
                                        className={`${styles.typeCard} ${isSelected ? styles.typeCardActive : ''}`}
                                    >
                                        <div className={`${styles.typeIcon} ${isSelected ? styles.typeIconActive : ''}`}>
                                            {type.icon}
                                        </div>
                                        <h4 className={styles.typeName}>{type.name}</h4>
                                        <p className={styles.typeDescription}>{type.description}</p>
                                        <span className={styles.typeBadge}>{type.badge}</span>
                                        {isSelected && (
                                            <div className={styles.typeCheck}>
                                                <FaCheckCircle />
                                            </div>
                                        )}
                                    </button>
                                </Col>
                            );
                        })}
                    </Row>
                </div>

                {/* ===== FEATURES DEL TIPO SELECCIONADO ===== */}
                {currentType && (
                    <div className={styles.featuresPreview}>
                        <Row className="align-items-center">
                            <Col lg={12}>
                                <div className={styles.featuresContent}>
                                    <h4 className={styles.featuresTitle}>
                                        <span className={styles.featuresIcon}>{currentType.icon}</span>
                                        ¿Qué incluye {currentType.name}?
                                    </h4>
                                    <div className={styles.featuresGrid}>
                                        {currentType.features.map((feature, idx) => (
                                            <span key={idx} className={styles.featureTag}>
                                                <FaCheckCircle className={styles.featureCheck} />
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}

                {/* ===== OPCIONES DE PAGO ===== */}
                <div className={styles.paymentContainer}>
                    <h3 className={styles.paymentTitle}>
                        <FaGem className={styles.paymentIcon} />
                        Elegí tu modalidad de pago
                    </h3>
                    <p className={styles.paymentSubtitle}>
                        Todos los precios son en USD. Consultá por WhatsApp para obtener el detalle completo.
                    </p>

                    <Row className="g-3">
                        {PAYMENT_OPTIONS.map((option) => {
                            const isSelected = selectedPayment === option.id;
                            const priceInfo = getPriceForOption(selectedType, option.id);

                            return (
                                <Col key={option.id} md={3} sm={6}>
                                    <div
                                        className={`${styles.paymentCard} ${isSelected ? styles.paymentCardActive : ''} ${option.popular ? styles.paymentPopular : ''}`}
                                        onClick={() => setSelectedPayment(option.id)}
                                    >
                                        {option.popular && (
                                            <div className={styles.popularBadge}>
                                                <FaStar className={styles.popularIcon} />
                                                Más elegido
                                            </div>
                                        )}

                                        <div className={styles.paymentIconWrapper}>
                                            {option.icon}
                                        </div>

                                        <h4 className={styles.paymentName}>{option.name}</h4>
                                        <p className={styles.paymentDescription}>{option.description}</p>

                                        {option.badge && (
                                            <span className={styles.paymentBadge}>{option.badge}</span>
                                        )}

                                        <div className={styles.paymentPrice}>
                                            {priceInfo.display === 'A cotizar' ? (
                                                <span className={styles.priceCustom}>A cotizar</span>
                                            ) : (
                                                <span className={styles.priceAmount}>
                                                    {priceInfo.price} USD
                                                </span>
                                            )}
                                        </div>

                                        {isSelected && (
                                            <div className={styles.paymentCheck}>
                                                <FaCheckCircle />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </div>

                {/* ===== RESUMEN Y CTA ===== */}
                {currentType && currentPayment && (
                    <div className={styles.summaryCard}>
                        <Row className="align-items-center">
                            <Col lg={7}>
                                <div className={styles.summaryContent}>
                                    <h4 className={styles.summaryTitle}>
                                        <span className={styles.summaryIcon}>
                                            {currentType.icon}
                                        </span>
                                        {currentType.name} - {currentPayment.name}
                                    </h4>
                                    <p className={styles.summaryDescription}>
                                        {currentPayment.description}
                                    </p>
                                    <div className={styles.summaryFeatures}>
                                        {currentType.features.slice(0, 3).map((feature, idx) => (
                                            <span key={idx} className={styles.summaryTag}>
                                                <FaCheckCircle className={styles.summaryCheck} />
                                                {feature}
                                            </span>
                                        ))}
                                        {currentType.features.length > 3 && (
                                            <span className={styles.summaryTag}>
                                                +{currentType.features.length - 3} más
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={5} className="text-lg-end">
                                <div className={styles.summaryAction}>
                                    <div className={styles.summaryPrice}>
                                        {getPriceForOption(selectedType, selectedPayment).display === 'A cotizar' ? (
                                            <span className={styles.summaryPriceCustom}>
                                                Presupuesto a medida
                                            </span>
                                        ) : (
                                            <>
                                                <span className={styles.summaryPriceAmount}>
                                                    {getPriceForOption(selectedType, selectedPayment).price} USD
                                                </span>
                                                <span className={styles.summaryPricePeriod}>
                                                    {currentPayment.name}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleWhatsApp}
                                        className={styles.btnWhatsappBig}
                                    >
                                        <FaWhatsapp className="me-2" />
                                        Solicitar propuesta
                                    </button>
                                    <span className={styles.summaryNote}>
                                        * Recibirás un presupuesto detallado por WhatsApp
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}

                {/* ===== BENEFICIOS ADICIONALES ===== */}
                <section className={styles.benefitsSection}>
                    <h3 className={styles.benefitsTitle}>
                        <FaShieldAlt className={styles.benefitsIcon} />
                        Todos nuestros desarrollos incluyen
                    </h3>
                    <Row className="g-3">
                        <Col md={3} sm={6}>
                            <div className={styles.benefitItem}>
                                <FaBolt className={styles.benefitItemIcon} />
                                <span>Rendimiento optimizado</span>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className={styles.benefitItem}>
                                <FaPalette className={styles.benefitItemIcon} />
                                <span>Diseño personalizado</span>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className={styles.benefitItem}>
                                <FaSearch className={styles.benefitItemIcon} />
                                <span>SEO optimizado</span>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className={styles.benefitItem}>
                                <FaDatabase className={styles.benefitItemIcon} />
                                <span>Base de datos incluida</span>
                            </div>
                        </Col>
                    </Row>
                </section>

                {/* ===== NAVEGACIÓN A PLANES DE MANTENIMIENTO ===== */}
                <div className={styles.serviceNav}>
                    <Row className="align-items-center g-3">
                        <Col md={6}>
                            <Link href="/planes" className={styles.navLink}>
                                <FaArrowRight className={styles.navIcon} />
                                Ver planes de mantenimiento
                            </Link>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <Link href="/" className={styles.navLink}>
                                ← Volver al inicio
                            </Link>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}