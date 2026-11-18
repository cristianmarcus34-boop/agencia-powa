// components/SolicitarProyectoModal.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import styles from './SolicitarProyectoModal.module.css';

interface SolicitarProyectoModalProps {
    isOpen: boolean;
    onClose: () => void;
    clienteId: string;
    clienteNombre: string;
}

export default function SolicitarProyectoModal({
    isOpen,
    onClose,
    clienteId,
    clienteNombre
}: SolicitarProyectoModalProps) {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        presupuesto: '',
        plazo: '',
        tipo: 'desarrollo',
        notas: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const tiposProyecto = [
        { value: 'desarrollo', label: '💻 Desarrollo Web' },
        { value: 'app', label: '📱 App Móvil' },
        { value: 'marketing', label: '📊 Marketing Digital' },
        { value: 'diseño', label: '🎨 Diseño UI/UX' },
        { value: 'seo', label: '🔍 SEO / Posicionamiento' },
        { value: 'consultoria', label: '💡 Consultoría' },
        { value: 'otro', label: '📦 Otro' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/cliente/solicitar-proyecto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cliente_id: clienteId,
                    nombre: formData.nombre.trim(),
                    descripcion: formData.descripcion.trim(),
                    presupuesto: parseFloat(formData.presupuesto) || 0,
                    tipo: formData.tipo,
                    plazo: formData.plazo || null,
                    notas: formData.notas || null
                })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                    setFormData({
                        nombre: '',
                        descripcion: '',
                        presupuesto: '',
                        plazo: '',
                        tipo: 'desarrollo',
                        notas: ''
                    });
                }, 2000);
            } else {
                setError(data.error || 'Error al enviar la solicitud');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error al enviar la solicitud');
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.overlay}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.92, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.92, y: 15 }}
                    className={styles.modal}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.header}>
                        <h2 className={styles.title}>🚀 Solicitar Nuevo Proyecto</h2>
                        <button onClick={onClose} className={styles.closeBtn} aria-label="Cerrar modal">
                            <FaTimes />
                        </button>
                    </div>

                    <p className={styles.subtitle}>
                        Completa el formulario para solicitar un nuevo proyecto para <strong>{clienteNombre}</strong>
                    </p>

                    {error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.12)',
                            color: '#f87171',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            marginBottom: '16px',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            fontSize: '0.9rem'
                        }}>
                            ❌ {error}
                        </div>
                    )}

                    {success ? (
                        <div className={styles.successMessage}>
                            <div className={styles.successIcon}>✨</div>
                            <h3>¡Solicitud enviada con éxito!</h3>
                            <p>Nos pondremos en contacto contigo a la brevedad.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Nombre del proyecto *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ej: Rediseño App Móvil"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Tipo de proyecto *</label>
                                <select
                                    required
                                    value={formData.tipo}
                                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                                    className={styles.select}
                                >
                                    {tiposProyecto.map((tipo) => (
                                        <option key={tipo.value} value={tipo.value}>
                                            {tipo.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Descripción *</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Describe brevemente el alcance o los objetivos..."
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    className={styles.textarea}
                                />
                            </div>

                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Presupuesto estimado (ARS)</label>
                                    <input
                                        type="number"
                                        placeholder="Ej: 500000"
                                        value={formData.presupuesto}
                                        onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Plazo estimado</label>
                                    <select
                                        value={formData.plazo}
                                        onChange={(e) => setFormData({ ...formData, plazo: e.target.value })}
                                        className={styles.select}
                                    >
                                        <option value="">Seleccionar...</option>
                                        <option value="1_semana">1 semana</option>
                                        <option value="2_semanas">2 semanas</option>
                                        <option value="1_mes">1 mes</option>
                                        <option value="2_meses">2 meses</option>
                                        <option value="3_meses">3 meses</option>
                                        <option value="mas">Más de 3 meses</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Notas adicionales</label>
                                <textarea
                                    rows={2}
                                    placeholder="Información extra o requerimientos técnicos..."
                                    value={formData.notas}
                                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                                    className={styles.textarea}
                                />
                            </div>

                            <div className={styles.actions}>
                                <button type="button" onClick={onClose} className={styles.btnCancel}>
                                    Cancelar
                                </button>
                                <button type="submit" disabled={loading} className={styles.btnSubmit}>
                                    {loading ? (
                                        <span className={styles.spinner}></span>
                                    ) : (
                                        <>
                                            <FaPaperPlane /> Enviar solicitud
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}