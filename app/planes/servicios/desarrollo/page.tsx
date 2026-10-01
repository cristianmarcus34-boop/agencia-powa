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
    plainSummary: string;
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
        description: 'Una página para presentar una propuesta y facilitar una acción principal.',
        plainSummary: 'Una página clara para explicar qué ofrecés y facilitar que te contacten por formulario o WhatsApp.',
        color: 'from-emerald-500 to-cyan-500',
        badge: '🚀 Conversión rápida',
        features: [
            'Diseño de una página alineado a la identidad y referencias acordadas',
            'Formulario de contacto o botón a WhatsApp',
            'Se verá correctamente en celulares, tablets y computadoras',
            'Revisamos la rapidez de las páginas acordadas; la meta depende del alojamiento, el contenido y las integraciones',
            'Configuramos el título y la descripción que pueden aparecer en Google; esto no garantiza una posición',
            'Medición básica de visitas, si se acuerda y se proveen los accesos',
            'Certificado SSL incluido'
        ]
    },
    {
        id: 'institutional',
        name: 'Sitio Institucional',
        icon: <FaUsers />,
        description: 'Presencia digital completa para tu marca',
        plainSummary: 'Un sitio para presentar tu empresa, explicar tus servicios, mostrar trabajos y recibir consultas.',
        color: 'from-blue-500 to-purple-500',
        badge: '🏢 Más solicitado',
        features: [
            'Hasta 8 páginas o secciones principales',
            'Diseño alineado con la identidad visual y los materiales de tu marca',
            'Preparamos títulos, descripciones y un listado de páginas para ayudar a Google a entender el sitio; redactar contenido y trabajar el posicionamiento se cotizan aparte',
            'Páginas para mostrar servicios y trabajos',
            'Enlaces a tus redes sociales',
            'Mapa y datos para que puedan encontrarte y contactarte',
            'Una página simple de noticias, con textos e imágenes provistos por vos, puede ocupar una de las 8 incluidas; publicar y organizar artículos desde un panel se cotiza aparte',
            'Formulario para recibir consultas; conexión con tu sistema de clientes si se acuerda'
        ]
    },
    {
        id: 'ecommerce',
        name: 'Tienda Online',
        icon: <FaChartLine />,
        description: 'Vendé tus productos 24/7 con la mejor experiencia',
        plainSummary: 'Una tienda para mostrar productos, recibir pedidos y cobrar en línea; las opciones de envío y administración se acuerdan para tu negocio.',
        color: 'from-orange-500 to-red-500',
        badge: '🛒 E-commerce',
        features: [
            'Catálogo con volumen y estructura definidos en el alcance',
            'Carrito para reunir productos antes de pagar',
            'Cobro en línea con el medio de pago acordado (por ejemplo, Mercado Pago o PayPal)',
            'Panel para actualizar productos y existencias',
            'Opciones de envío e impuestos definidas para tu operación',
            'Historial de compras para tus clientes',
            'Panel privado para consultar pedidos y ventas',
            'Configuramos títulos y descripciones de los productos acordados; ayuda a Google a entender el catálogo, pero no garantiza posiciones ni ventas'
        ]
    },
    {
        id: 'custom',
        name: 'Web App / Sistema',
        icon: <FaCode />,
        description: 'Soluciones personalizadas para procesos complejos',
        plainSummary: 'Un sistema hecho para un proceso específico de tu empresa, con usuarios, permisos e integraciones definidos según lo que necesites.',
        color: 'from-purple-500 to-pink-500',
        badge: '⚡ A medida',
        features: [
            'Estructura del sistema definida para el proceso que necesitás resolver',
            'Inicio de sesión y permisos distintos según cada usuario',
            'Organización de la información y conexiones con otros sistemas, según lo acordado',
            'Panel privado para administrar las tareas principales',
            'Conexiones con herramientas externas, definidas en la propuesta',
            'Reglas de funcionamiento propias de tu negocio',
            'Informes y paneles con los datos que necesitás consultar',
            'Pruebas con situaciones y objetivos definidos para el proyecto'
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
        landing: { unique: 150, two_payments: 170, three_payments: 190, custom: 0 },
        institutional: { unique: 350, two_payments: 390, three_payments: 420, custom: 0 },
        ecommerce: { unique: 700, two_payments: 770, three_payments: 840, custom: 0 },
        custom: { unique: 1200, two_payments: 1320, three_payments: 1450, custom: 0 }
    };

    const prices = basePrices[typeId as keyof typeof basePrices] || basePrices.landing;
    const price = prices[optionId as keyof typeof prices] || 0;

    if (optionId === 'custom') {
        return { price: '0', display: 'A cotizar' };
    }

    return { price: `${price}`, display: 'Consultar' };
};

const getPaymentBreakdown = (typeId: string, optionId: string): string => {
    const priceInfo = getPriceForOption(typeId, optionId);
    if (priceInfo.display === 'A cotizar' || optionId === 'unique') return '';

    const total = Number(priceInfo.price);
    const milestones = optionId === 'two_payments'
        ? [
            { share: 50, label: 'al inicio' },
            { share: 50, label: 'a la entrega' }
        ]
        : [
            { share: 30, label: 'al inicio' },
            { share: 30, label: 'a mitad del proyecto' },
            { share: 40, label: 'a la entrega' }
        ];

    return milestones
        .map(({ share, label }) => `USD ${Math.round(total * share / 100).toLocaleString('en-US')} ${label}`)
        .join(' + ');
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
            message += `💰 Total estimado del proyecto: *${priceInfo.price} USD*\n`;
            const breakdown = getPaymentBreakdown(selectedType, selectedPayment);
            if (breakdown) message += `📍 Cuotas: ${breakdown}\n`;
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
                                    <div className={styles.plainSummary}>
                                        <span className={styles.plainSummaryLabel}>En pocas palabras</span>
                                        <p>{currentType.plainSummary}</p>
                                    </div>
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
                            const breakdown = getPaymentBreakdown(selectedType, option.id);

                            return (
                                <Col key={option.id} md={3} sm={6}>
                                    <div
                                        className={`${styles.paymentCard} ${isSelected ? styles.paymentCardActive : ''} ${option.popular ? styles.paymentPopular : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        aria-pressed={isSelected}
                                        onClick={() => setSelectedPayment(option.id)}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter' || event.key === ' ') {
                                                event.preventDefault();
                                                setSelectedPayment(option.id);
                                            }
                                        }}
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
                                                    Total: {priceInfo.price} USD
                                                </span>
                                            )}
                                            {breakdown && (
                                                <span className={styles.paymentBreakdown}>{breakdown}</span>
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
                                                    Total del proyecto · {currentPayment.name}
                                                </span>
                                                {getPaymentBreakdown(selectedType, selectedPayment) && (
                                                    <span className={styles.summaryPriceBreakdown}>
                                                        {getPaymentBreakdown(selectedType, selectedPayment)}
                                                    </span>
                                                )}
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
                                        El total mostrado corresponde al alcance base descrito. La propuesta confirma páginas, contenido, integraciones y revisiones. Hosting, dominio, licencias y servicios externos solo se incluyen si se detallan.
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}

                {/* ===== CRITERIOS DE ALCANCE ===== */}
                <section className={styles.benefitsSection}>
                    <h3 className={styles.benefitsTitle}>
                        <FaShieldAlt className={styles.benefitsIcon} />
                        Qué se define en cada propuesta
                    </h3>
                    <p className={styles.scopeIntro}>
                        Los entregables se acuerdan según el tipo de producto. La propuesta deja por escrito qué incluye, qué queda fuera y cómo se valida.
                    </p>
                    <Row className="g-3">
                        <Col lg={3} sm={6}>
                            <div className={styles.benefitItem}>
                                <FaBolt className={styles.benefitItemIcon} />
                                <h4>Rendimiento</h4>
                                <p>Medimos la velocidad en las páginas acordadas. La meta se define por escrito y depende también del hosting, el contenido y las integraciones.</p>
                            </div>
                        </Col>
                        <Col lg={3} sm={6}>
                            <div className={styles.benefitItem}>
                                <FaPalette className={styles.benefitItemIcon} />
                                <h4>Diseño</h4>
                                <p>Se especifican pantallas, identidad visual y revisiones. Branding, redacción, fotografía o pantallas extra se detallan aparte.</p>
                            </div>
                        </Col>
                        <Col lg={3} sm={6}>
                            <div className={styles.benefitItem}>
                                <FaSearch className={styles.benefitItemIcon} />
                                <h4>SEO técnico</h4>
                                <p>Definimos qué páginas y productos se preparan para buscadores. Esto ayuda a entender el sitio, pero no garantiza una posición determinada.</p>
                            </div>
                        </Col>
                        <Col lg={3} sm={6}>
                            <div className={styles.benefitItem}>
                                <FaDatabase className={styles.benefitItemIcon} />
                                <h4>Datos</h4>
                                <p>La base de datos se incluye cuando el producto la necesita. Motor, alojamiento, costos, migraciones y copias de seguridad quedan definidos.</p>
                            </div>
                        </Col>
                    </Row>
                    <p className={styles.scopeNote}>
                        Ninguna puntuación de velocidad, posición en buscadores o resultado comercial se garantiza sin condiciones y métricas pactadas.
                    </p>
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