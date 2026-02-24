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

export default function ContactPage() {
    const { register, handleSubmit, reset, control, setValue, unregister, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            services: [] as string[],
            name: '',
            email: '',
            message: '',
            usageMethod: '',
            budget: ''
        }
    });

    // En Next.js las variables públicas empiezan con NEXT_PUBLIC_
    const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_URL;
    const WHATSAPP_LINK = `https://wa.me/5491138305837?text=Hola%20Powa%20Digital!%20Me%20gustaría%20consultar%20por%20un%20proyecto...`;

    const selectedServices = useWatch({
        control,
        name: 'services',
        defaultValue: [],
    });

    const servicesWithBudget = ['Desarrollo Web', 'Desarrollo Mobile', 'Otros'];
    const shouldShowUsageAndBudget = selectedServices.some(s => servicesWithBudget.includes(s));

    useEffect(() => {
        if (!shouldShowUsageAndBudget) {
            unregister('usageMethod');
            unregister('budget');
        }
    }, [shouldShowUsageAndBudget, unregister]);

    const onSubmit = async (data: any) => {
        if (!FORMSPREE_URL) {
            toast.error('❌ Configuración incompleta.');
            return;
        }

        try {
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success('🎉 ¡Mensaje enviado! Nos contactaremos pronto.');
                reset();
            } else {
                toast.error('Ops! Hubo un problema.');
            }
        } catch (error) {
            toast.error('❌ Error de conexión.');
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
                    <Col lg={7}>
                        <div className={styles.contactFormGlass}>
                            <h3 className="mb-4 text-white fw-bold">Inicia tu transformación</h3>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="small-label">NOMBRE</Form.Label>
                                            <Form.Control
                                                className={styles.powaInput}
                                                {...register('name', { required: true })}
                                                placeholder="Tu nombre"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="small-label">EMAIL</Form.Label>
                                            <Form.Control
                                                type="email"
                                                className={styles.powaInput}
                                                {...register('email', { required: true })}
                                                placeholder="tu@email.com"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4">
                                    <Form.Label className="small-label">SERVICIOS</Form.Label>
                                    <div className={styles.servicesGrid}>
                                        {['Desarrollo Web', 'Diseño UI/UX', 'Marketing Digital', 'Desarrollo Mobile', 'Otros'].map((service) => (
                                            <div key={service} className={styles.powaCheckbox}>
                                                <input
                                                    type="checkbox"
                                                    id={service}
                                                    value={service}
                                                    {...register('services')}
                                                />
                                                <label htmlFor={service}>{service}</label>
                                            </div>
                                        ))}
                                    </div>
                                </Form.Group>

                                {shouldShowUsageAndBudget && (
                                    <Row className="animate-fade-in">
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="small-label">PRESUPUESTO (USD)</Form.Label>
                                                <Form.Select className={styles.powaInput} {...register('budget')}>
                                                    <option value="">Rango...</option>
                                                    <option value="500-1000">500 - 1.000</option>
                                                    <option value="1000-5000">1.000 - 5.000</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                )}

                                <Form.Group className="mb-4">
                                    <Form.Label className="small-label">MENSAJE</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        className={styles.powaInput}
                                        {...register('message', { required: true })}
                                        placeholder="Cuéntanos tu idea..."
                                    />
                                </Form.Group>

                                <Button type="submit" className="btn-powa-primary w-100 py-3" disabled={isSubmitting}>
                                    {isSubmitting ? <Spinner size="sm" /> : <><FaPaperPlane className="me-2" /> ACTIVAR PROYECTO</>}
                                </Button>
                            </Form>
                        </div>
                    </Col>

                    <Col lg={5}>
                        <div className="d-flex flex-column gap-4">
                            <div className={styles.infoCardModern}>
                                <div className={styles.iconCircle}><FaEnvelope /></div>
                                <div>
                                    <h5 className="text-white mb-0">Escríbenos</h5>
                                    <small className="text-slate-400">cristianmarcus34@gmail.com</small>
                                </div>
                            </div>

                            <a href={WHATSAPP_LINK} target="_blank" className="text-decoration-none">
                                <div className={`${styles.infoCardModern} border-success-subtle`}>
                                    <div className={`${styles.iconCircle} ${styles.whatsappBg}`}><FaWhatsapp /></div>
                                    <div>
                                        <h5 className="text-white mb-0">WhatsApp Directo</h5>
                                        <small className="text-success">+54 9 11 3830-5837</small>
                                    </div>
                                </div>
                            </a>

                            <div className={styles.infoCardModern}>
                                <div className={styles.iconCircle}><FaMapMarkerAlt /></div>
                                <div>
                                    <h5 className="text-white mb-0">Ubicación</h5>
                                    <small className="text-slate-400">San Fco Solano, Quilmes.</small>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}