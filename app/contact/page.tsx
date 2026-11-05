'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';
import {
    FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaWhatsapp,
    FaBolt, FaUserCheck, FaShieldAlt,
    FaStar, FaRocket, FaAward, FaCheckCircle,
    FaCode, FaChartLine,
    FaCloudUploadAlt, FaArrowRight, FaInfoCircle,
    FaRegSmile, FaRegClock, FaShieldVirus,
    FaGooglePlay,
} from 'react-icons/fa';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './contact.module.css';

// ============================================================ //
// TIPOS
// ============================================================ //
interface ContactFormData {
    services: string[];
    name: string;
    email: string;
    company?: string;
    message: string;
    budget?: string;
    heardFrom?: string;
    acceptTerms?: boolean;
}

interface FormServiceItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    description: string;
    requiresBudget: boolean;
    color: string;
}

// ============================================================ //
// CONSTANTES
// ============================================================ //
const AVAILABLE_SERVICES: FormServiceItem[] = [
    {
        id: 'web',
        label: 'Sistemas Web',
        icon: <FaCode />,
        description: 'Plataformas escalables con Next.js y TypeScript',
        requiresBudget: true,
        color: '#22d3ee'
    },
    {
        id: 'app-android',
        label: 'Apps Nativas Android',
        icon: <FaGooglePlay />,
        description: 'Apps publicadas en Google Play Store. Desde $2.200.000 ARS (precio actualizado según dólar oficial).',
        requiresBudget: true,
        color: '#34d399'
    },
    {
        id: 'cloud',
        label: 'Cloud & Data',
        icon: <FaCloudUploadAlt />,
        description: 'Infraestructura en la nube, bases de datos y escalabilidad',
        requiresBudget: true,
        color: '#f59e0b'
    },
    {
        id: 'automation',
        label: 'Automatización',
        icon: <FaBolt />,
        description: 'Optimización de procesos y reducción de costos operativos',
        requiresBudget: false,
        color: '#10b981'
    },
    {
        id: 'ia',
        label: 'Inteligencia Artificial',
        icon: <FaChartLine />,
        description: 'Agentes inteligentes, modelos predictivos y NLP',
        requiresBudget: true,
        color: '#f472b6'
    },
    {
        id: 'support',
        label: 'Soporte & Evolución',
        icon: <FaShieldAlt />,
        description: 'Mantenimiento, monitoreo y mejora continua',
        requiresBudget: false,
        color: '#64748b'
    }
];

const HEARD_FROM_OPTIONS = [
    'Google / Búsqueda',
    'LinkedIn',
    'Recomendación de un amigo',
    'Instagram / Redes Sociales',
    'YouTube / Contenido',
    'Otro'
];

const RECENT_DEMOS = [
    { name: 'Kubic.ai', type: 'Plataforma SaaS', emoji: '🚀', url: 'https://kubic-ai.vercel.app' },
    { name: 'Barbería El Rulo', type: 'Sistema de Reservas', emoji: '✂️', url: 'https://barberia-next-indol.vercel.app' },
    { name: 'Vivero Verde', type: 'E-commerce', emoji: '🌿', url: 'https://vivero-verde.vercel.app' }
];

// ============================================================ //
// COMPONENTE PRINCIPAL
// ============================================================ //
export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formProgress, setFormProgress] = useState(0);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        control,
        unregister,
        watch,
        formState: { errors }
    } = useForm<ContactFormData>({
        defaultValues: {
            services: [],
            name: '',
            email: '',
            company: '',
            message: '',
            budget: '',
            heardFrom: '',
            acceptTerms: false
        },
        mode: 'onTouched'
    });

    // ===== CONSTANTES =====
    const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
    const WEB3FORMS_ACCESS_KEY = '6a22a375-6730-499d-ab20-b86e359f069d';
    const WHATSAPP_LINK = `https://wa.me/5491138305837?text=${encodeURIComponent('Hola Powa Digital! Me gustaría consultar por un proyecto...')}`;

    // ===== WATCHES =====
    const selectedServiceIds = useWatch({ control, name: 'services', defaultValue: [] });
    const nameValue = watch('name', '');
    const emailValue = watch('email', '');
    const messageValue = watch('message', '');
    const budgetValue = watch('budget', '') || '';
    const acceptTermsValue = watch('acceptTerms', false);

    // ===== PROGRESO DEL FORMULARIO =====
    useEffect(() => {
        let progress = 0;
        if (nameValue.length > 0) progress += 15;
        if (emailValue.length > 0) progress += 15;
        if (selectedServiceIds.length > 0) progress += 25;
        if (messageValue.length > 0) progress += 20;
        if (budgetValue.length > 0) progress += 15;
        if (acceptTermsValue) progress += 10;
        setFormProgress(progress);
    }, [nameValue, emailValue, selectedServiceIds, messageValue, budgetValue, acceptTermsValue]);

    // ===== MOSTRAR CAMPO DE PRESUPUESTO =====
    const shouldShowBudget = AVAILABLE_SERVICES
        .filter(s => selectedServiceIds.includes(s.id))
        .some(s => s.requiresBudget);

    useEffect(() => {
        if (!shouldShowBudget) {
            unregister('budget');
        }
    }, [shouldShowBudget, unregister]);

    // ===== ENVÍO CON WEB3FORMS =====
    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);

        try {
            const readableServices = data.services.map(
                id => AVAILABLE_SERVICES.find(s => s.id === id)?.label || id
            );

            const form = document.createElement('form');
            form.method = 'POST';
            form.action = WEB3FORMS_URL;

            const fields: Record<string, string> = {
                access_key: WEB3FORMS_ACCESS_KEY,
                name: data.name,
                email: data.email,
                company: data.company || 'No especificado',
                message: data.message,
                budget: data.budget || 'No especificado',
                services: readableServices.join(', '),
                heard_from: data.heardFrom || 'No especificado',
                subject: 'Nuevo proyecto desde agenciadigitalpowa',
                from_name: 'Agencia Digital Powa',
                redirect: 'https://agencia-powa.vercel.app/gracias-contacto',
                botcheck: ''
            };

            Object.entries(fields).forEach(([key, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();

            toast.success('🎉 ¡Mensaje enviado! Te contactaremos pronto.');
            reset();

            setTimeout(() => {
                window.location.href = 'https://agencia-powa.vercel.app/gracias-contacto';
            }, 1500);

        } catch (error) {
            console.error('Error:', error);
            toast.error('❌ Error al enviar el formulario.');
            setIsSubmitting(false);
        }
    };

    // ===== RENDER =====
    return (
        <div className={styles.contactWrapper}>
            <div className={styles.ambientGlow} />
            <div className={styles.ambientGlowSecondary} />

            <Container>
                {/* ===== HEADER ===== */}
                <header className="text-center mb-5">
                    <span className={styles.badgePowa}>
                        <FaRegSmile className={styles.badgeIcon} /> HABLEMOS DE TU PROYECTO
                    </span>
                    <h1 className={styles.contactTitleMain}>
                        ¿Listo para <span className={styles.textGradient}>potenciar</span> tu negocio?
                    </h1>
                    <p className={styles.contactLeadText}>
                        No buscamos ser solo tu proveedor, sino tu <strong>partner tecnológico</strong>.
                        <br />
                        <span className={styles.leadSubtext}>Completá el formulario y empecemos a construir juntos.</span>
                    </p>
                </header>

                <Row className="g-5">
                    {/* ===== FORMULARIO ===== */}
                    <Col lg={7}>
                        <div className={styles.contactFormGlass}>
                            {/* ===== PROGRESS BAR ===== */}
                            <div className={styles.progressWrapper}>
                                <div className={styles.progressHeader}>
                                    <span className={styles.progressLabel}>Progreso</span>
                                    <span className={styles.progressPercent}>{formProgress}%</span>
                                </div>
                                <ProgressBar
                                    now={formProgress}
                                    className={styles.progressBarCustom}
                                    style={{ height: '6px' }}
                                />
                            </div>

                            <div className={styles.formHeader}>
                                <div className={styles.formHeaderIconWrapper}>
                                    <FaRocket className={styles.formHeaderIcon} />
                                    <FaCheckCircle className={styles.formHeaderCheck} />
                                </div>
                                <h3 className={styles.formTitle}>Inicia tu transformación</h3>
                                <p className={styles.formSubtitle}>Completá el formulario y empecemos a construir juntos.</p>
                            </div>

                            <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                                {/* ===== NOMBRE Y EMAIL ===== */}
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className={styles.formLabel}>
                                                NOMBRE <span className={styles.requiredStar}>*</span>
                                            </Form.Label>
                                            <Form.Control
                                                className={`${styles.powaInput} ${errors.name ? styles.inputError : ''}`}
                                                {...register('name', { required: 'El nombre es obligatorio' })}
                                                placeholder="Tu nombre completo"
                                                onFocus={() => setFocusedField('name')}
                                                onBlur={() => setFocusedField(null)}
                                            />
                                            {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className={styles.formLabel}>
                                                EMAIL <span className={styles.requiredStar}>*</span>
                                            </Form.Label>
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
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField(null)}
                                            />
                                            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* ===== EMPRESA ===== */}
                                <Form.Group className="mb-4">
                                    <Form.Label className={styles.formLabel}>
                                        EMPRESA (Opcional)
                                        <FaInfoCircle className={styles.fieldInfoIcon} title="Si no tienes empresa, escribí 'Freelance' o 'Particular'" />
                                    </Form.Label>
                                    <Form.Control
                                        className={styles.powaInput}
                                        {...register('company')}
                                        placeholder="Nombre de tu empresa o proyecto"
                                    />
                                </Form.Group>

                                {/* ===== SERVICIOS ===== */}
                                <Form.Group className="mb-4">
                                    <Form.Label className={styles.formLabel}>
                                        ¿QUÉ SOLUCIONES NECESITÁS? <span className={styles.requiredStar}>*</span>
                                    </Form.Label>
                                    <div className={styles.servicesGrid}>
                                        {AVAILABLE_SERVICES.map((service) => (
                                            <div key={service.id} className={styles.powaCheckbox}>
                                                <input
                                                    type="checkbox"
                                                    id={`service-${service.id}`}
                                                    value={service.id}
                                                    {...register('services', {
                                                        validate: value => value.length > 0 || 'Seleccioná al menos un servicio'
                                                    })}
                                                    className={styles.checkboxInput}
                                                />
                                                <label
                                                    htmlFor={`service-${service.id}`}
                                                    style={{
                                                        borderColor: selectedServiceIds.includes(service.id) ? service.color : 'rgba(255,255,255,0.06)'
                                                    }}
                                                >
                                                    <span className={styles.serviceIcon} style={{ color: service.color }}>
                                                        {service.icon}
                                                    </span>
                                                    <span className={styles.serviceLabel}>{service.label}</span>
                                                    <span className={styles.serviceDesc}>{service.description}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.services && <span className={styles.errorMessage}>{errors.services.message}</span>}
                                </Form.Group>

                                {/* ===== PRESUPUESTO ===== */}
                                {shouldShowBudget && (
                                    <Row className={`${styles.animateFadeIn} mb-4`}>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label className={styles.formLabel}>
                                                    PRESUPUESTO ESTIMADO (USD) <span className={styles.requiredStar}>*</span>
                                                </Form.Label>
                                                <Form.Select
                                                    className={styles.powaInput}
                                                    {...register('budget', { required: 'Seleccioná un rango' })}
                                                >
                                                    <option value="">Selecciona un rango...</option>
                                                    <option value="150-499">USD 150 - USD 499</option>
                                                    <option value="500-1499">USD 500 - USD 1.499</option>
                                                    <option value="1500-4999">USD 1.500 - USD 4.999</option>
                                                    <option value="5000-14999">USD 5.000 - USD 14.999</option>
                                                    <option value="15000+">USD 15.000 o más</option>
                                                    <option value="no-se">No estoy seguro / Consultoría</option>
                                                </Form.Select>
                                                {errors.budget && <span className={styles.errorMessage}>{errors.budget.message}</span>}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                )}

                                {/* ===== CÓMO NOS CONOCISTE ===== */}
                                <Form.Group className="mb-4">
                                    <Form.Label className={styles.formLabel}>¿CÓMO NOS CONOCISTE?</Form.Label>
                                    <Form.Select className={styles.powaInput} {...register('heardFrom')}>
                                        <option value="">Selecciona una opción...</option>
                                        {HEARD_FROM_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                {/* ===== MENSAJE ===== */}
                                <Form.Group className="mb-4">
                                    <Form.Label className={styles.formLabel}>
                                        MENSAJE / DETALLES DEL PROYECTO <span className={styles.requiredStar}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        className={`${styles.powaInput} ${styles.textareaPowa} ${errors.message ? styles.inputError : ''}`}
                                        {...register('message', { required: 'Contanos un poco sobre tu idea' })}
                                        placeholder="¿Qué problema querés resolver? ¿Qué objetivo tenés? ¿Tenés algún plazo estimado?"
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                    {errors.message && <span className={styles.errorMessage}>{errors.message.message}</span>}
                                </Form.Group>

                                {/* ===== TÉRMINOS ===== */}
                                <Form.Group className="mb-4">
                                    <div className={styles.termsCheckbox}>
                                        <input
                                            type="checkbox"
                                            id="acceptTerms"
                                            {...register('acceptTerms', { required: 'Aceptá los términos para continuar' })}
                                            className={styles.checkboxInput}
                                        />
                                        <label htmlFor="acceptTerms" className={styles.termsLabel}>
                                            <FaShieldVirus className={styles.termsIcon} />
                                            <span>
                                                Acepto que mis datos serán tratados con confidencialidad.
                                                <br />
                                                <small>No compartimos tu información con terceros.</small>
                                            </span>
                                        </label>
                                    </div>
                                    {errors.acceptTerms && <span className={styles.errorMessage}>{errors.acceptTerms.message}</span>}
                                </Form.Group>

                                {/* ===== BOTÓN ===== */}
                                <Button
                                    type="submit"
                                    className={`${styles.btnPowaPrimary} ${isSubmitting ? styles.btnLoading : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : (
                                        <>
                                            <FaPaperPlane className="me-2" />
                                            ACTIVAR PROYECTO
                                            <FaArrowRight className="ms-2" />
                                        </>
                                    )}
                                </Button>

                                <p className={styles.formFooterText}>
                                    🔒 Tus datos están seguros. No compartimos tu información con terceros.
                                    <br />
                                    <span className={styles.formFooterSubtext}>Te respondemos dentro de 1 día hábil.</span>
                                    <br />
                                    <span className={styles.formFooterDisclaimer}>
                                        💵 Los precios publicados se actualizan según el dólar oficial del día.
                                    </span>
                                </p>
                            </Form>
                        </div>
                    </Col>

                    {/* ===== SIDEBAR ===== */}
                    <Col lg={5}>
                        <div className="d-flex flex-column gap-4">

                            {/* ===== INFO CARDS ===== */}
                            <div className={styles.infoCardModern}>
                                <div className={styles.iconCircle}><FaEnvelope /></div>
                                <div>
                                    <h5 className="text-white mb-0">Escríbenos</h5>
                                    <small className={styles.infoText}>agenciadigitalpowa@gmail.com</small>
                                    <span className={styles.infoCta}>Respuesta en 1 día hábil</span>
                                </div>
                            </div>

                            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                <div className={`${styles.infoCardModern} ${styles.whatsappBorder}`}>
                                    <div className={`${styles.iconCircle} ${styles.whatsappBg}`}><FaWhatsapp /></div>
                                    <div>
                                        <h5 className="text-white mb-0">WhatsApp Directo</h5>
                                        <small className={styles.whatsappText}>+54 9 11 3830-5837</small>
                                        <span className={styles.infoCta}>Chatea con nosotros</span>
                                    </div>
                                </div>
                            </a>

                            <div className={styles.infoCardModern}>
                                <div className={styles.iconCircle}><FaMapMarkerAlt /></div>
                                <div>
                                    <h5 className="text-white mb-0">Ubicación</h5>
                                    <small className={styles.infoText}>Quilmes, Buenos Aires, Argentina</small>
                                    <span className={styles.infoCta}>100% Remoto</span>
                                </div>
                            </div>

                            {/* ===== DEMOS ===== */}
                            <div className={styles.recentProjectsBlock}>
                                <h4 className={styles.recentProjectsTitle}>
                                    <FaRocket className={styles.recentProjectsIcon} />
                                    Demos para explorar
                                </h4>
                                {RECENT_DEMOS.map((project, i) => (
                                    <a
                                        key={i}
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.recentProjectItem}
                                    >
                                        <span className={styles.recentProjectEmoji}>{project.emoji}</span>
                                        <div>
                                            <strong className={styles.recentProjectName}>{project.name}</strong>
                                            <span className={styles.recentProjectType}>{project.type}</span>
                                        </div>
                                        <FaArrowRight className={styles.recentProjectArrow} />
                                    </a>
                                ))}
                            </div>

                            {/* ===== EXPECTATIVAS DE TRABAJO ===== */}
                            <div className={styles.testimonialsBlock}>
                                <h4 className={styles.testimonialsTitle}>
                                    <FaStar className={styles.testimonialsIcon} />
                                    Qué podés esperar
                                </h4>
                                <div className={styles.testimonialItem}>
                                    <p className={styles.testimonialText}>Contacto directo con quien define y desarrolla tu solución.</p>
                                    <p className={styles.testimonialText}>Alcance, etapas e inversión por escrito antes de empezar.</p>
                                    <p className={styles.testimonialText}>Avances revisables y entrega de código y accesos acordados.</p>
                                </div>
                            </div>

                            {/* ===== TRUST BLOCK ===== */}
                            <div className={styles.trustBlock}>
                                <h4 className={styles.trustTitle}>¿Qué pasa después?</h4>
                                <ul className={styles.trustList}>
                                    <li>
                                        <div className={styles.trustIcon}><FaRegClock /></div>
                                        <div>
                                            <strong>Respuesta rápida</strong>
                                            <span>Te respondemos dentro de 1 día hábil.</span>
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

                            {/* ===== TRUST BADGE ===== */}
                            <div className={styles.trustBadge}>
                                <FaAward className={styles.trustBadgeIcon} />
                                <span>Atención directa con el fundador</span>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}