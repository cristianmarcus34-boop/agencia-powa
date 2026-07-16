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
    FaEye
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './cliente.module.css';
import SolicitarProyectoModal from '@/components/SolicitarProyectoModal';
// 🔥 IMPORTAR EL BOTÓN DE DESCARGA PDF
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
    nombre_contacto: string;
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
    // ✅ Control de redirección
    const [redirected, setRedirected] = useState(false);
    // 🔥 Estados para previsualización
    const [selectedFactura, setSelectedFactura] = useState<Factura | null>(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    // ✅ Manejo de autenticación mejorado
    useEffect(() => {
        if (status === 'loading') return;

        // Si no está autenticado y no se redirigió aún
        if (status === 'unauthenticated' && !redirected) {
            setRedirected(true);
            router.replace('/login');
            return;
        }

        // Si es admin, redirigir al panel de admin
        if (status === 'authenticated' && session?.user?.rol === 'admin' && !redirected) {
            setRedirected(true);
            router.replace('/admin');
            return;
        }

        // Si está autenticado como cliente, cargar datos
        if (status === 'authenticated' && session?.user?.id && session?.user?.rol !== 'admin') {
            fetchDashboardData();
        }
    }, [status, session, router, redirected]);

    // 🔥 Función para formatear la factura para el PDF
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
                nombre_contacto: clienteInfo.nombre_contacto,
                email: clienteInfo.email
            } : undefined
        };
    };

    // 🔥 Función para abrir previsualización
    const openFacturaPreview = (factura: Factura) => {
        setSelectedFactura(factura);
        setShowPreviewModal(true);
    };

    // 🔥 Función para cerrar previsualización
    const closeFacturaPreview = () => {
        setShowPreviewModal(false);
        setSelectedFactura(null);
    };

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // Obtener información del cliente
            const infoRes = await fetch('/api/cliente/info');
            const infoData = await infoRes.json();
            if (infoData.success) {
                setClienteInfo(infoData.data);
            }

            // Obtener proyectos del cliente
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

            // Obtener facturas
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
        const colores = {
            activo: '#22c55e',
            en_revision: '#eab308',
            completado: '#3b82f6',
            pausado: '#f59e0b',
            cancelado: '#ef4444',
            pagada: '#22c55e',
            pendiente: '#eab308',
            vencida: '#ef4444'
        };
        return colores[estado as keyof typeof colores] || '#94a3b8';
    };

    const getEstadoLabel = (estado: string) => {
        const labels = {
            activo: 'Activo',
            en_revision: 'En Revisión',
            completado: 'Completado',
            pausado: 'Pausado',
            cancelado: 'Cancelado',
            pagada: 'Pagada',
            pendiente: 'Pendiente',
            vencida: 'Vencida'
        };
        return labels[estado as keyof typeof labels] || estado;
    };

    // ✅ Mostrar loading controlado
    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando tu panel...</p>
            </div>
        );
    }

    // ✅ Si no está autenticado, no renderizar nada
    if (status === 'unauthenticated') {
        return null;
    }

    return (
        <div className={styles.dashboard}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.header}
            >
                <div>
                    <h1 className={styles.title}>👋 ¡Bienvenido, {clienteInfo?.nombre_contacto || session?.user?.name || 'Cliente'}!</h1>
                    <p className={styles.subtitle}>Panel de control de {clienteInfo?.nombre_empresa || 'tu empresa'}</p>
                </div>
                <div className={styles.headerActions}>
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

            <div className={styles.twoColumnLayout}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className={styles.card}
                >
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>📋 Proyectos Recientes</h3>
                        <button className={styles.cardAction}>Ver todos →</button>
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
                            <p className={styles.emptyState}>No tienes proyectos aún</p>
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
                            Ver todas →
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
                                    {/* 🔥 BOTONES DE ACCIÓN */}
                                    <div style={{
                                        marginTop: '12px',
                                        display: 'flex',
                                        gap: '8px',
                                        flexWrap: 'wrap'
                                    }}>
                                        {/* Botón Previsualizar */}
                                        <button
                                            onClick={() => openFacturaPreview(factura)}
                                            style={{
                                                background: 'rgba(59, 130, 246, 0.15)',
                                                border: '1px solid rgba(59, 130, 246, 0.2)',
                                                color: '#60a5fa',
                                                padding: '6px 14px',
                                                borderRadius: '8px',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.25)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                                            }}
                                        >
                                            <FaEye /> Previsualizar
                                        </button>
                                        {/* Botón Descargar */}
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

            {clienteInfo && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={styles.card}
                >
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>🏢 Información de la Empresa</h3>
                        <button className={styles.cardAction}>Editar perfil →</button>
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
                                <p className={styles.infoValue}>{clienteInfo.nombre_contacto}</p>
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

            {/* 🔥 MODAL DE PREVISUALIZACIÓN */}
            {selectedFactura && (
                <FacturaPreviewModal
                    isOpen={showPreviewModal}
                    onClose={closeFacturaPreview}
                    factura={formatFacturaForPDF(selectedFactura)}
                    onDownload={() => {
                        // El botón de descarga del modal ya maneja la descarga
                    }}
                />
            )}
        </div>
    );
}