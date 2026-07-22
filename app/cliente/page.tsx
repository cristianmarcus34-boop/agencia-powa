'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    FaBriefcase,
    FaFileInvoice,
    FaChartLine,
    FaClock,
    FaCheckCircle,
    FaSpinner,
    FaExclamationTriangle,
    FaCalendarAlt,
    FaUser,
    FaBuilding,
    FaEnvelope,
    FaPhone,
    FaGlobe,
    FaTag,
    FaPlus,
    FaEye,
    FaSignOutAlt,
    FaArrowRight,
    FaRocket
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './cliente.module.css';
import SolicitarProyectoModal from '@/components/SolicitarProyectoModal';
import { DownloadFacturaButton } from '@/components/FacturaPDF';
import FacturaPreviewModal from '@/components/FacturaPreviewModal';

interface Proyecto {
    id: string;
    nombre: string;
    descripcion: string;
    estado: 'activo' | 'en_revision' | 'completado' | 'pausado' | 'cancelado';
    presupuesto: number;
    creado_en: string;
    fecha_entrega: string;
    progreso: number;
}

interface Factura {
    id: string;
    numero: string;
    monto: number;
    estado: 'pagada' | 'pendiente' | 'vencida';
    fecha_emision: string;
    fecha_vencimiento: string;
    proyecto_nombre: string;
    subtotal?: number;
    monto_impuesto?: number;
    notas?: string;
}

interface ClienteInfo {
    id: string;
    nombre_empresa: string;
    nombre_completo: string;  // ✅ CAMBIADO
    email: string;
    telefono: string;
    sitio_web: string;
    industria: string;
    tamaño_empresa: string;
}

export default function ClienteDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [clienteInfo, setClienteInfo] = useState<ClienteInfo | null>(null);
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [facturas, setFacturas] = useState<Factura[]>([]);
    const [estadisticas, setEstadisticas] = useState({
        total_proyectos: 0,
        proyectos_activos: 0,
        proyectos_completados: 0,
        facturas_pendientes: 0,
        facturas_totales: 0
    });
    const [showModal, setShowModal] = useState(false);
    const [redirected, setRedirected] = useState(false);
    const [selectedFactura, setSelectedFactura] = useState<Factura | null>(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    // ===== CERRAR SESIÓN =====
    const handleLogout = async () => {
        await fetch('/api/auth/signout', { method: 'POST' });
        router.push('/login');
    };

    useEffect(() => {
        if (status === 'loading') return;

        if (status === 'unauthenticated' && !redirected) {
            setRedirected(true);
            router.replace('/login');
            return;
        }

        if (status === 'authenticated' && session?.user?.rol === 'admin' && !redirected) {
            setRedirected(true);
            router.replace('/admin');
            return;
        }

        if (status === 'authenticated' && session?.user?.id && session?.user?.rol !== 'admin') {
            fetchDashboardData();
        }
    }, [status, session, router, redirected]);

    const formatFacturaForPDF = (factura: Factura) => {
        return {
            numero_factura: factura.numero,
            fecha_emision: factura.fecha_emision,
            fecha_vencimiento: factura.fecha_vencimiento,
            subtotal: factura.subtotal || factura.monto * 0.8,
            tasa_impuesto: 21,
            monto_impuesto: factura.monto_impuesto || factura.monto * 0.21,
            total: factura.monto,
            estado: factura.estado,
            notas: factura.notas || '',
            clientes: clienteInfo ? {
                nombre_empresa: clienteInfo.nombre_empresa,
                nombre_contacto: clienteInfo.nombre_completo,
                email: clienteInfo.email
            } : undefined
        };
    };

    const openFacturaPreview = (factura: Factura) => {
        setSelectedFactura(factura);
        setShowPreviewModal(true);
    };

    const closeFacturaPreview = () => {
        setShowPreviewModal(false);
        setSelectedFactura(null);
    };

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // 🔥 Obtener información del cliente
            const infoRes = await fetch('/api/cliente/info');
            const infoData = await infoRes.json();
            console.log('📊 Datos de empresa (desde tabla):', infoData.data);

            if (infoData.success) {
                setClienteInfo(infoData.data);
                console.log('✅ Nombre empresa:', infoData.data.nombre_empresa);
                console.log('✅ Nombre completo:', infoData.data.nombre_completo);
            }

            const proyRes = await fetch('/api/cliente/proyectos');
            const proyData = await proyRes.json();
            if (proyData.success) {
                setProyectos(proyData.data);
                const activos = proyData.data.filter((p: Proyecto) => p.estado === 'activo' || p.estado === 'en_revision');
                const completados = proyData.data.filter((p: Proyecto) => p.estado === 'completado');
                setEstadisticas(prev => ({
                    ...prev,
                    total_proyectos: proyData.data.length,
                    proyectos_activos: activos.length,
                    proyectos_completados: completados.length
                }));
            }

            const factRes = await fetch('/api/cliente/facturas');
            const factData = await factRes.json();
            if (factData.success) {
                setFacturas(factData.data);
                const pendientes = factData.data.filter((f: Factura) => f.estado === 'pendiente' || f.estado === 'vencida');
                setEstadisticas(prev => ({
                    ...prev,
                    facturas_pendientes: pendientes.length,
                    facturas_totales: factData.data.length
                }));
            }
        } catch (error) {
            console.error('Error al cargar datos:', error);
        } finally {
            setLoading(false);
        }
    };

    const getEstadoColor = (estado: string) => {
        const colores: Record<string, string> = {
            activo: '#22c55e',
            en_revision: '#eab308',
            completado: '#3b82f6',
            pausado: '#f59e0b',
            cancelado: '#ef4444',
            pagada: '#22c55e',
            pendiente: '#eab308',
            vencida: '#ef4444'
        };
        return colores[estado] || '#94a3b8';
    };

    const getEstadoLabel = (estado: string) => {
        const labels: Record<string, string> = {
            activo: 'Activo',
            en_revision: 'En Revisión',
            completado: 'Completado',
            pausado: 'Pausado',
            cancelado: 'Cancelado',
            pagada: 'Pagada',
            pendiente: 'Pendiente',
            vencida: 'Vencida'
        };
        return labels[estado] || estado;
    };

    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando tu panel...</p>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return null;
    }

    return (
        <div className={styles.dashboard}>
            {/* ===== HEADER CON LOGOUT ===== */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.header}
            >
                <div>
                    <h1 className={styles.title}>
                        👋 ¡Bienvenido, {clienteInfo?.nombre_completo || session?.user?.name || 'Cliente'}!
                    </h1>
                    <p className={styles.subtitle}>
                        Panel de control de {clienteInfo?.nombre_empresa || 'tu empresa'}
                    </p>
                </div>
                <div className={styles.headerActions}>
                    <button
                        className={styles.btnLogout}
                        onClick={handleLogout}
                        title="Cerrar sesión"
                    >
                        <FaSignOutAlt /> Salir
                    </button>
                    <button
                        className={styles.btnPrimary}
                        onClick={() => setShowModal(true)}
                    >
                        <FaPlus /> Solicitar Proyecto
                    </button>
                </div>
            </motion.div>

            <SolicitarProyectoModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                clienteId={clienteInfo?.id || ''}
                clienteNombre={clienteInfo?.nombre_empresa || 'tu empresa'}
            />

            {/* ===== ESTADÍSTICAS ===== */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={styles.statsGrid}
            >
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
                        <FaBriefcase />
                    </div>
                    <div>
                        <p className={styles.statLabel}>Total Proyectos</p>
                        <p className={styles.statValue}>{estadisticas.total_proyectos}</p>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
                        <FaChartLine />
                    </div>
                    <div>
                        <p className={styles.statLabel}>Proyectos Activos</p>
                        <p className={styles.statValue}>{estadisticas.proyectos_activos}</p>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                        <FaCheckCircle />
                    </div>
                    <div>
                        <p className={styles.statLabel}>Completados</p>
                        <p className={styles.statValue}>{estadisticas.proyectos_completados}</p>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#eab308' }}>
                        <FaFileInvoice />
                    </div>
                    <div>
                        <p className={styles.statLabel}>Facturas Pendientes</p>
                        <p className={styles.statValue}>{estadisticas.facturas_pendientes}</p>
                    </div>
                </div>
            </motion.div>

            {/* ===== PROYECTOS Y FACTURAS ===== */}
            <div className={styles.twoColumnLayout}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className={styles.card}
                >
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>📋 Proyectos Recientes</h3>
                        <button
                            className={styles.cardAction}
                            onClick={() => router.push('/cliente/proyectos')}
                        >
                            Ver todos <FaArrowRight className={styles.cardActionIcon} />
                        </button>
                    </div>
                    <div className={styles.proyectosList}>
                        {proyectos.length > 0 ? (
                            proyectos.slice(0, 5).map((proyecto) => (
                                <div key={proyecto.id} className={styles.proyectoItem}>
                                    <div className={styles.proyectoInfo}>
                                        <div className={styles.proyectoNombre}>
                                            {proyecto.nombre}
                                            <span
                                                className={styles.estadoBadge}
                                                style={{ backgroundColor: getEstadoColor(proyecto.estado) }}
                                            >
                                                {getEstadoLabel(proyecto.estado)}
                                            </span>
                                        </div>
                                        <div className={styles.proyectoDetalles}>
                                            <span>${proyecto.presupuesto.toLocaleString()}</span>
                                            <span>•</span>
                                            <span>{new Date(proyecto.creado_en).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className={styles.progresoContainer}>
                                        <div
                                            className={styles.progresoBar}
                                            style={{ width: `${proyecto.progreso || 0}%` }}
                                        />
                                        <span className={styles.progresoTexto}>{proyecto.progreso || 0}%</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.emptyState}>
                                <FaRocket className={styles.emptyIcon} />
                                <p>No tienes proyectos aún</p>
                                <button
                                    className={styles.btnPrimarySmall}
                                    onClick={() => setShowModal(true)}
                                >
                                    <FaPlus /> Solicitar tu primer proyecto
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className={styles.card}
                >
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>🧾 Facturas Recientes</h3>
                        <button
                            className={styles.cardAction}
                            onClick={() => router.push('/cliente/facturas')}
                        >
                            Ver todas <FaArrowRight className={styles.cardActionIcon} />
                        </button>
                    </div>
                    <div className={styles.facturasList}>
                        {facturas.length > 0 ? (
                            facturas.slice(0, 5).map((factura) => (
                                <div key={factura.id} className={styles.facturaItem}>
                                    <div className={styles.facturaInfo}>
                                        <div>
                                            <div className={styles.facturaNumero}>#{factura.numero}</div>
                                            <div className={styles.facturaProyecto}>{factura.proyecto_nombre}</div>
                                        </div>
                                        <div className={styles.facturaMonto}>
                                            <span className={styles.monto}>${factura.monto.toLocaleString()}</span>
                                            <span
                                                className={styles.estadoBadge}
                                                style={{ backgroundColor: getEstadoColor(factura.estado) }}
                                            >
                                                {getEstadoLabel(factura.estado)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.facturaFecha}>
                                        <FaCalendarAlt /> Vence: {new Date(factura.fecha_vencimiento).toLocaleDateString()}
                                    </div>
                                    <div className={styles.facturaActions}>
                                        <button
                                            onClick={() => openFacturaPreview(factura)}
                                            className={styles.btnPreview}
                                        >
                                            <FaEye /> Previsualizar
                                        </button>
                                        <DownloadFacturaButton
                                            factura={formatFacturaForPDF(factura)}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={styles.emptyState}>No hay facturas</p>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* ===== INFORMACIÓN DE LA EMPRESA ===== */}
            {clienteInfo && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={styles.card}
                >
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>🏢 Información de la Empresa</h3>
                        <button
                            className={styles.cardAction}
                            onClick={() => router.push('/cliente/perfil')}
                        >
                            Editar perfil <FaArrowRight className={styles.cardActionIcon} />
                        </button>
                    </div>
                    <div className={styles.clienteInfoGrid}>
                        <div className={styles.clienteInfoItem}>
                            <FaBuilding className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoLabel}>Empresa</p>
                                <p className={styles.infoValue}>{clienteInfo.nombre_empresa}</p>
                            </div>
                        </div>
                        <div className={styles.clienteInfoItem}>
                            <FaUser className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoLabel}>Contacto</p>
                                <p className={styles.infoValue}>{clienteInfo.nombre_completo}</p>
                            </div>
                        </div>
                        <div className={styles.clienteInfoItem}>
                            <FaEnvelope className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoLabel}>Email</p>
                                <p className={styles.infoValue}>{clienteInfo.email}</p>
                            </div>
                        </div>
                        <div className={styles.clienteInfoItem}>
                            <FaPhone className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoLabel}>Teléfono</p>
                                <p className={styles.infoValue}>{clienteInfo.telefono || 'No registrado'}</p>
                            </div>
                        </div>
                        <div className={styles.clienteInfoItem}>
                            <FaGlobe className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoLabel}>Sitio Web</p>
                                <p className={styles.infoValue}>
                                    {clienteInfo.sitio_web ? (
                                        <a href={clienteInfo.sitio_web} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                            {clienteInfo.sitio_web.replace(/^https?:\/\//, '')}
                                        </a>
                                    ) : 'No registrado'}
                                </p>
                            </div>
                        </div>
                        <div className={styles.clienteInfoItem}>
                            <FaTag className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoLabel}>Industria / Tamaño</p>
                                <p className={styles.infoValue}>
                                    {clienteInfo.industria || 'No especificada'} • {clienteInfo.tamaño_empresa || 'No especificado'}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* ===== MODAL DE PREVISUALIZACIÓN ===== */}
            {selectedFactura && (
                <FacturaPreviewModal
                    isOpen={showPreviewModal}
                    onClose={closeFacturaPreview}
                    factura={formatFacturaForPDF(selectedFactura)}
                    onDownload={() => { }}
                />
            )}
        </div>
    );
}