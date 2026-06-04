'use client';

import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import {
    FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaWhatsapp,
    FaBolt, FaUserCheck, FaShieldAlt, FaClock
} from 'react-icons/fa';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './contact.module.css';

// Definición estricta del contrato de datos del Formulario
interface ContactFormData {
    services: string[]; // Guardará los IDs de los servicios elegidos
    name: string;
    email: string;
    message: string;
    budget?: string;    // Opcional por la naturaleza condicional
}

interface FormServiceItem {
    id: string;
    label: string;
    requiresBudget: boolean;
}

// Estructuración limpia de servicios para evitar romper lógica por cambios en el texto
const AVAILABLE_SERVICES: FormServiceItem[] = [
    { id: 'web', label: 'Sistemas Web Escalables', requiresBudget: true },
    { id: 'mobile', label: 'Desarrollo Mobile Nativo', requiresBudget: true },
    { id: 'cloud', label: 'Gestión de Datos & Cloud', requiresBudget: true },
    { id: 'automation', label: 'Automatización de Procesos', requiresBudget: false },
    { id: 'ia', label: 'Integración de IA', requiresBudget: true },
    { id: 'support', label: 'Soporte & Evolución', requiresBudget: false }
];

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        reset,
        control,
        unregister,
        formState: { errors, isSubmitting }
    } = useForm<ContactFormData>({
        defaultValues: {
            services: [],
            name: '',
            email: '',
            message: '',
            budget: ''
        }
    });

    const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_URL;
    const WHATSAPP_LINK = `https://wa.me/5491138305837?text=Hola%20Powa%20Digital!%20Me%20gustaría%20consultar%20por%20un%20proyecto...`;

    // Escuchamos de forma reactiva los servicios seleccionados (obtenemos array de IDs)
    const selectedServiceIds = useWatch({
        control,
        name: 'services',
        defaultValue: [],
    });

    // Evaluamos si alguno de los servicios tildados requiere presupuesto en base a su ID estable
    const shouldShowBudget = AVAILABLE_SERVICES
        .filter(service => selectedServiceIds.includes(service.id))
        .some(service => service.requiresBudget);

    // Limpieza profunda del árbol si deja de requerirse el presupuesto
    useEffect(() => {
        if (!shouldShowBudget) {
            unregister('budget');
        }
    }, [shouldShowBudget, unregister]);

    const onSubmit = async (data: ContactFormData) => {
        if (!FORMSPREE_URL) {
            toast.error('❌ Configuración incompleta en el servidor.');
            return;
        }

        try {
            // Mapeamos los IDs estables a los labels legibles antes de enviar a Formspree
            const readableServices = data.services.map(
                id => AVAILABLE_SERVICES.find(s => s.id === id)?.label || id
            );

            const payload = {
                ...data,
                services: readableServices
            };

            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success('🎉 ¡Mensaje enviado! Nos contactaremos pronto.');
                reset();
            } else {
                toast.error('❌ Hubo un problema al enviar. Inténtalo de nuevo.');
            }
        } catch {
            toast.error('❌ Error de conexión con el servidor.');
        }
    };

    return (
        <div className={styles.contactWrapper}>
            <Container>
                <header className="text-center mb-5">
                    <span className="badge-powa mb-3">HABLEMOS DE TU PROYECTO</span>
                    <h1 className={`${styles.contactTitleMain} text-gradient`}>¿Listo para potenciar tu negocio?</h1>
                    <p className={`${styles.contactLeadText} mx-auto max-w-2xl`}>
                        No buscamos ser solo tu proveedor, sino tu <strong>partner tecnológico</strong>.
                    </p>
                </header>

                <Row className="g-5">
                    {/* COLUMNA FORMULARIO */}
                    <Col lg={7}>
                        <div className={styles.contactFormGlass}>
                            <h3 className="mb-4 text-white fw-bold">Inicia tu transformación</h3>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="small-label">NOMBRE</Form.Label>
                                            <Form.Control
                                                className={`${styles.powaInput} ${errors.name ? styles.inputError : ''}`}
                                                {...register('name', { required: 'El nombre es obligatorio' })}
                                                placeholder="Tu nombre"
                                            />
                                            {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="small-label">EMAIL</Form.Label>
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
                                    <Form.Label className="small-label">¿QUÉ SOLUCIONES NECESITÁS?</Form.Label>
                                    <div className={styles.servicesGrid}>
                                        {AVAILABLE_SERVICES.map((service, index) => (
                                            <div key={service.id} className={styles.powaCheckbox}>
                                                <input
                                                    type="checkbox"
                                                    id={`service-cb-${service.id}-${index}`}
                                                    value={service.id}
                                                    {...register('services')}
                                                />
                                                <label htmlFor={`service-cb-${service.id}-${index}`}>{service.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                </Form.Group>

                                {shouldShowBudget && (
                                    <Row className={`${styles.animateFadeIn} mb-4`}>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label className="small-label">PRESUPUESTO ESTIMADO (USD)</Form.Label>
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
                                    <Form.Label className="small-label">MENSAJE / DETALLES DEL PROYECTO</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        className={`${styles.powaInput} ${errors.message ? styles.inputError : ''}`}
                                        {...register('message', { required: 'Cuéntanos un poco sobre tu idea' })}
                                        placeholder="Describí brevemente los alcances, objetivos o ideas de tu software..."
                                    />
                                    {errors.message && <span className={styles.errorMessage}>{errors.message.message}</span>}
                                </Form.Group>

                                <Button type="submit" className="btn-powa-primary w-100 py-3" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : (
                                        <><FaPaperPlane className="me-2" /> ACTIVAR PROYECTO</>
                                    )}
                                </Button>
                            </Form>
                        </div>
                    </Col>

                    {/* COLUMNA INFORMACIÓN & CONFIANZA */}
                    <Col lg={5}>
                        <div className="d-flex flex-column gap-4">
                            <div className={styles.infoCardModern}>
                                <div className={styles.iconCircle}><FaEnvelope /></div>
                                <div>
                                    <h5 className="text-white mb-0">Escríbenos</h5>
                                    <small className="text-slate-400">cristianmarcus34@gmail.com</small>
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
                                    <small className="text-slate-400">Buenos Aires, Argentina.</small>
                                </div>
                            </div>

                            <div className={styles.trustBlock}>
                                <h4 className="text-white mb-4 fw-bold style-heading">¿Qué pasa después?</h4>
                                <ul className="list-unstyled d-flex flex-column gap-3">
                                    <li className="d-flex align-items-start gap-3">
                                        <div className={styles.trustIcon}><FaClock /></div>
                                        <div>
                                            <strong className="text-white d-block">Respuesta rápida</strong>
                                            <span className="text-slate-400 evaluation-text">Te respondemos en menos de 24 horas hábiles para coordinar una llamada.</span>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-start gap-3">
                                        <div className={styles.trustIcon}><FaUserCheck /></div>
                                        <div>
                                            <strong className="text-white d-block">Asesoramiento Técnico Senior</strong>
                                            <span className="text-slate-400 evaluation-text">Hablás directo con desarrolladores, sin intermediarios comerciales.</span>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-start gap-3">
                                        <div className={styles.trustIcon}><FaShieldAlt /></div>
                                        <div>
                                            <strong className="text-white d-block">Acuerdo de Confidencialidad (NDA)</strong>
                                            <span className="text-slate-400 evaluation-text">Tus ideas de negocio y propiedad intelectual están 100% protegidas con nosotros.</span>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-start gap-3">
                                        <div className={styles.trustIcon}><FaBolt /></div>
                                        <div>
                                            <strong className="text-white d-block">Desarrollo Ágil</strong>
                                            <span className="text-slate-400 evaluation-text">Planificamos entregas iterativas para que veas tu software funcionando desde el primer mes.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}