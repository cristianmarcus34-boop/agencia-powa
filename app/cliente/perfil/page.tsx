'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaSave, FaUser, FaBuilding, FaEnvelope, FaPhone, FaGlobe, FaTag } from 'react-icons/fa';
import Swal from 'sweetalert2';
import styles from './perfil.module.css';

interface ClienteInfo {
    id: string;
    nombre_empresa: string;
    nombre_completo: string;
    email: string;
    telefono: string;
    sitio_web: string;
    industria: string;
    tamaño_empresa: string;
}

export default function PerfilClientePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [clienteInfo, setClienteInfo] = useState<ClienteInfo | null>(null);
    const [formData, setFormData] = useState({
        nombre_empresa: '',
        nombre_completo: '',
        telefono: '',
        sitio_web: '',
        industria: '',
        tamaño_empresa: ''
    });

    useEffect(() => {
        if (status === 'loading') return;

        if (status === 'unauthenticated') {
            router.replace('/login');
            return;
        }

        if (status === 'authenticated' && session?.user?.rol === 'admin') {
            router.replace('/admin');
            return;
        }

        fetchPerfil();
    }, [status, session, router]);

    const fetchPerfil = async () => {
        try {
            setLoading(true);
            // 🔥 Evitar caché con timestamp
            const res = await fetch(`/api/cliente/info?t=${Date.now()}`, {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            });
            const data = await res.json();
            console.log('📥 Datos recibidos (fresh):', data);

            if (data.success) {
                setClienteInfo(data.data);
                const newFormData = {
                    nombre_empresa: data.data.nombre_empresa || '',
                    nombre_completo: data.data.nombre_completo || '',
                    telefono: data.data.telefono || '',
                    sitio_web: data.data.sitio_web || '',
                    industria: data.data.industria || '',
                    tamaño_empresa: data.data.tamaño_empresa || ''
                };
                setFormData(newFormData);
                // 🔥 Forzar re-render del formulario
                setRefreshKey(prev => prev + 1);
                console.log('📝 FormData actualizado:', newFormData);
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar perfil',
                text: 'No pudimos cargar tus datos. Intenta nuevamente.',
                background: '#1a2333',
                color: '#ffffff',
                confirmButtonColor: '#22d3ee',
                confirmButtonText: 'Entendido',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        Swal.fire({
            title: 'Actualizando...',
            text: 'Guardando los cambios de tu perfil',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            },
            background: '#1a2333',
            color: '#ffffff',
        });

        try {
            console.log('📤 Enviando datos:', formData);

            const res = await fetch('/api/cliente/perfil', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre_empresa: formData.nombre_empresa,
                    nombre_completo: formData.nombre_completo,
                    telefono: formData.telefono,
                    sitio_web: formData.sitio_web,
                    industria: formData.industria,
                    tamaño_empresa: formData.tamaño_empresa
                })
            });

            const data = await res.json();
            console.log('📥 Respuesta del servidor:', data);
            Swal.close();

            if (data.success) {
                // 🔥 Recargar datos actualizados
                await fetchPerfil();

                Swal.fire({
                    icon: 'success',
                    title: '✅ ¡Perfil actualizado!',
                    text: 'Los cambios se guardaron correctamente.',
                    background: '#1a2333',
                    color: '#ffffff',
                    confirmButtonColor: '#22d3ee',
                    confirmButtonText: 'Ir al panel',
                    timer: 3000,
                    timerProgressBar: true,
                    willClose: () => {
                        // 🔥 FORZAR RECARGA COMPLETA para ver los cambios
                        window.location.href = '/cliente';
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '❌ Error al actualizar',
                    text: data.error || 'Intenta nuevamente más tarde.',
                    background: '#1a2333',
                    color: '#ffffff',
                    confirmButtonColor: '#ef4444',
                    confirmButtonText: 'Intentar de nuevo',
                });
            }
        } catch (error) {
            console.error('❌ Error:', error);
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: '❌ Error',
                text: 'Ocurrió un error inesperado. Intenta nuevamente.',
                background: '#1a2333',
                color: '#ffffff',
                confirmButtonColor: '#ef4444',
                confirmButtonText: 'Entendido',
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando perfil...</p>
            </div>
        );
    }

    if (!clienteInfo) {
        return (
            <div className={styles.container}>
                <p>No se encontró información del cliente</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => router.push('/cliente')}>
                <FaArrowLeft /> Volver al panel
            </button>

            <div className={styles.card}>
                <h1 className={styles.title}>✏️ Editar Perfil</h1>
                <p className={styles.subtitle}>Actualiza la información de tu empresa</p>

                <form key={refreshKey} onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label><FaBuilding /> Nombre de la empresa</label>
                            <input
                                type="text"
                                value={formData.nombre_empresa}
                                onChange={(e) => setFormData({ ...formData, nombre_empresa: e.target.value })}
                                required
                                placeholder="Nombre de tu empresa"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label><FaUser /> Nombre completo *</label>
                            <input
                                type="text"
                                value={formData.nombre_completo}
                                onChange={(e) => setFormData({ ...formData, nombre_completo: e.target.value })}
                                required
                                placeholder="Tu nombre completo"
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label><FaEnvelope /> Email</label>
                        <input
                            type="email"
                            value={clienteInfo.email}
                            disabled
                            className={styles.inputDisabled}
                        />
                        <small className={styles.helpText}>El email no se puede modificar</small>
                    </div>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label><FaPhone /> Teléfono</label>
                            <input
                                type="text"
                                value={formData.telefono}
                                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                placeholder="+54 11 1234-5678"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label><FaGlobe /> Sitio web</label>
                            <input
                                type="url"
                                value={formData.sitio_web}
                                onChange={(e) => setFormData({ ...formData, sitio_web: e.target.value })}
                                placeholder="https://www.empresa.com"
                            />
                        </div>
                    </div>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label><FaTag /> Industria</label>
                            <select
                                value={formData.industria}
                                onChange={(e) => setFormData({ ...formData, industria: e.target.value })}
                            >
                                <option value="">Seleccionar...</option>
                                <option value="gastronomia">🍔 Gastronomía</option>
                                <option value="tecnologia">💻 Tecnología</option>
                                <option value="ecommerce">🛒 E-commerce</option>
                                <option value="servicios">📋 Servicios</option>
                                <option value="salud">🏥 Salud</option>
                                <option value="educacion">📚 Educación</option>
                                <option value="finanzas">💰 Finanzas</option>
                                <option value="otros">📦 Otros</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Tamaño de empresa</label>
                            <select
                                value={formData.tamaño_empresa}
                                onChange={(e) => setFormData({ ...formData, tamaño_empresa: e.target.value })}
                            >
                                <option value="">Seleccionar...</option>
                                <option value="startup">🚀 Startup</option>
                                <option value="pyme">🏢 PYME</option>
                                <option value="empresa">🏛️ Empresa</option>
                                <option value="corporacion">🌍 Corporación</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="button"
                            className={styles.btnCancel}
                            onClick={() => router.push('/cliente')}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.btnSave}
                            disabled={saving}
                        >
                            {saving ? 'Guardando...' : <><FaSave /> Guardar cambios</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}