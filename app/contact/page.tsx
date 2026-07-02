'use client';

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import {
    FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaWhatsapp,
    FaBolt, FaUserCheck, FaShieldAlt, FaClock,
    FaStar, FaRocket, FaAward,
    FaQuoteRight, FaCode, FaChartLine,
    FaCloudUploadAlt
} from 'react-icons/fa';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './contact.module.css';

interface ContactFormData {
    services: string[];
    name: string;
    email: string;
    message: string;
    budget?: string;
}

interface FormServiceItem {
    id: string;
    label: string;
    requiresBudget: boolean;
    icon?: React.ReactNode;
}

const AVAILABLE_SERVICES: FormServiceItem[] = [
    { id: 'web', label: 'Sistemas Web Escalables', requiresBudget: true, icon: <FaCode /> },
    { id: 'mobile', label: 'Desarrollo Mobile Nativo', requiresBudget: true, icon: <FaRocket /> },
    { id: 'cloud', label: 'Gestión de Datos & Cloud', requiresBudget: true, icon: <FaCloudUploadAlt /> },
    { id: 'automation', label: 'Automatización de Procesos', requiresBudget: false, icon: <FaBolt /> },
    { id: 'ia', label: 'Integración de IA', requiresBudget: true, icon: <FaChartLine /> },
    { id: 'support', label: 'Soporte & Evolución', requiresBudget: false, icon: <FaShieldAlt /> }
];

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        control,
        unregister,
        formState: { errors }
    } = useForm<ContactFormData>({
        defaultValues: {
            services: [],
            name: '',
            email: '',
            message: '',
            budget: ''
        }
    });

    const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_URL || 'https://formspree.io/f/mzzgoaon';
    const WHATSAPP_LINK = `https://wa.me/5491138305837?text=Hola%20Powa%20Digital!%20Me%20gustaría%20consultar%20por%20un%20proyecto...`;

    const selectedServiceIds = useWatch({
        control,
        name: 'services',
        defaultValue: [],
    });

    const shouldShowBudget = AVAILABLE_SERVICES
        .filter(service => selectedServiceIds.includes(service.id))
        .some(service => service.requiresBudget);

    useEffect(() => {
        if (!shouldShowBudget) {
            unregister('budget');
        }
    }, [shouldShowBudget, unregister]);

    // ✅ NUEVO: Envío con fetch + redirección manual
    const onSubmit = async (data: ContactFormData) => {
        if (!FORMSPREE_URL) {
            toast.error('❌ Error de configuración. Contactá al administrador.');
            return;
        }

        setIsSubmitting(true);

        try {
            const readableServices = data.services.map(
                id => AVAILABLE_SERVICES.find(s => s.id === id)?.label || id
            );

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('message', data.message);
            formData.append('budget', data.budget || 'No especificado');
            formData.append('services', readableServices.join(', '));
            formData.append('_subject', 'Nuevo proyecto desde agenciadigitalpowa.com');
            formData.append('_captcha', 'false');

            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success('🎉 ¡Mensaje enviado! Te contactaremos pronto.');
                reset();
                // ✅ REDIRECCIÓN MANUAL
                window.location.href = 'https://agencia-powa.vercel.app/gracias';
            } else {
                const result = await response.json();
                toast.error(`❌ Error: ${result.error || 'Intenta nuevamente.'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('❌ Error de conexión con el servidor.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const testimonials = [
        { quote: "Powa transformó nuestra idea en un producto real en tiempo récord.", author: "Carlos R.", role: "CEO, FintechPro" },
        { quote: "La atención y el expertise técnico superaron nuestras expectativas.", author: "Laura M.", role: "CMO, EcomStore" }
    ];

    return (
        <div className={styles.contactWrapper}>
            <div className={styles.ambientGlow} />
            <div className={styles.ambientGlowSecondary} />

            <Container>
                <header className="text-center mb-5">
                    <span className={styles.badgePowa}>HABLEMOS DE TU PROYECTO</span>
                    <h1 className={styles.contactTitleMain}>
                        ¿Listo para <span className={styles.textGradient}>potenciar</span> tu negocio?
                    </h1>
                    <p className={styles.contactLeadText}>
                        No buscamos ser solo tu proveedor, sino tu <strong>partner tecnológico</strong>.
                    </p>
                </header>

                <Row className="g-5">
                    <Col lg={7}>
                        <div className={styles.contactFormGlass}>
                            <div className={styles.formHeader}>
                                <FaRocket className={styles.formHeaderIcon} />
                                <h3 className={styles.formTitle}>Inicia tu transformación</h3>
                                <p className={styles.formSubtitle}>Completá el formulario y empecemos a construir juntos.</p>
                            </div>

                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className={styles.formLabel}>NOMBRE</Form.Label>
                                            <Form.Control
                                                className={`${styles.powaInput} ${errors.name ? styles.inputError : ''}`}
                                                {...register('name', { required: 'El nombre es obligatorio' })}
                                                placeholder="Tu nombre completo"
                                            />
                                            {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className={styles.formLabel}>EMAIL</Form.Label>
                                            <Form.Control
                                                type="email"
                                                className={`${styles.powaInput} ${errors.email ? styles.inputError : ''}`}
                                                {...register('email', {
                                                    required: 'El email es obligatorio',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Email no válido'
                                                    }
                                                })}
                                                placeholder="tu@email.com"
                                            />
                                            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4">
                                    <Form.Label className={styles.formLabel}>¿QUÉ SOLUCIONES NECESITÁS?</Form.Label>
                                    <div className={styles.servicesGrid}>
                                        {AVAILABLE_SERVICES.map((service, index) => (
                                            <div key={service.id} className={styles.powaCheckbox}>
                                                <input
                                                    type="checkbox"
                                                    id={`service-cb-${service.id}-${index}`}
                                                    value={service.id}
                                                    {...register('services')}
                                                    className={styles.checkboxInput}
                                                />
                                                <label htmlFor={`service-cb-${service.id}-${index}`}>
                                                    <span className={styles.serviceIcon}>{service.icon}</span>
                                                    {service.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </Form.Group>

                                {shouldShowBudget && (
                                    <Row className={`${styles.animateFadeIn} mb-4`}>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label className={styles.formLabel}>PRESUPUESTO ESTIMADO (USD)</Form.Label>
                                                <Form.Select
                                                    className={styles.powaInput}
                                                    {...register('budget', { required: 'Por favor selecciona un rango' })}
                                                >
                                                    <option value="">Selecciona un rango...</option>
                                                    <option value="500-1500">USD 500 - USD 1.500</option>
                                                    <option value="1500-5000">USD 1.500 - USD 5.000</option>
                                                    <option value="5000+">Más de USD 5.000</option>
                                                </Form.Select>
                                                {errors.budget && <span className={styles.errorMessage}>{errors.budget.message}</span>}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                )}

                                <Form.Group className="mb-4">
                                    <Form.Label className={styles.formLabel}>MENSAJE / DETALLES DEL PROYECTO</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        className={`${styles.powaInput} ${styles.textareaPowa} ${errors.message ? styles.inputError : ''}`}
                                        {...register('message', { required: 'Cuéntanos un poco sobre tu idea' })}
                                        placeholder="Describí brevemente los alcances, objetivos o ideas de tu software..."
                                    />
                                    {errors.message && <span className={styles.errorMessage}>{errors.message.message}</span>}
                                </Form.Group>

                                <Button type="submit" className={styles.btnPowaPrimary} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : (
                                        <><FaPaperPlane className="me-2" /> ACTIVAR PROYECTO</>
                                    )}
                                </Button>

                                <p className={styles.formFooterText}>
                                    🔒 Tus datos están seguros. No compartimos tu información con terceros.
                                </p>
                            </Form>
                        </div>
                    </Col>

                    <Col lg={5}>
                        <div className="d-flex flex-column gap-4">
                            <div className={styles.infoCardModern}>
                                <div className={styles.iconCircle}><FaEnvelope /></div>
                                <div>
                                    <h5 className="text-white mb-0">Escríbenos</h5>
                                    <small className={styles.infoText}>cristianmarcus34@gmail.com</small>
                                </div>
                            </div>

                            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                <div className={`${styles.infoCardModern} ${styles.whatsappBorder}`}>
                                    <div className={`${styles.iconCircle} ${styles.whatsappBg}`}><FaWhatsapp /></div>
                                    <div>
                                        <h5 className="text-white mb-0">WhatsApp Directo</h5>
                                        <small className={styles.whatsappText}>+54 9 11 3830-5837</small>
                                    </div>
                                </div>
                            </a>

                            <div className={styles.infoCardModern}>
                                <div className={styles.iconCircle}><FaMapMarkerAlt /></div>
                                <div>
                                    <h5 className="text-white mb-0">Ubicación</h5>
                                    <small className={styles.infoText}>Buenos Aires, Argentina</small>
                                </div>
                            </div>

                            <div className={styles.testimonialsBlock}>
                                <h4 className={styles.testimonialsTitle}>
                                    <FaStar className={styles.testimonialsIcon} />
                                    Lo que dicen nuestros clientes
                                </h4>
                                {testimonials.map((t, i) => (
                                    <div key={i} className={styles.testimonialItem}>
                                        <FaQuoteRight className={styles.testimonialQuote} />
                                        <p className={styles.testimonialText}>"{t.quote}"</p>
                                        <div className={styles.testimonialAuthor}>
                                            <strong>{t.author}</strong>
                                            <span>{t.role}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.trustBlock}>
                                <h4 className={styles.trustTitle}>¿Qué pasa después?</h4>
                                <ul className={styles.trustList}>
                                    <li>
                                        <div className={styles.trustIcon}><FaClock /></div>
                                        <div>
                                            <strong>Respuesta rápida</strong>
                                            <span>Te respondemos en menos de 24 horas hábiles.</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.trustIcon}><FaUserCheck /></div>
                                        <div>
                                            <strong>Asesoramiento Técnico Senior</strong>
                                            <span>Hablás directo con desarrolladores, sin intermediarios.</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.trustIcon}><FaShieldAlt /></div>
                                        <div>
                                            <strong>Acuerdo de Confidencialidad (NDA)</strong>
                                            <span>Tus ideas están 100% protegidas.</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.trustIcon}><FaBolt /></div>
                                        <div>
                                            <strong>Desarrollo Ágil</strong>
                                            <span>Entregas iterativas desde el primer mes.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.trustBadge}>
                                <FaAward className={styles.trustBadgeIcon} />
                                <span>+50 proyectos entregados con éxito</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}