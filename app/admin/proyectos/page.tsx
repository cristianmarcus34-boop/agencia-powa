'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo } from 'react';
import {
    FaEdit, FaTrash, FaPlus, FaSearch, FaExclamationTriangle,
    FaFolderOpen, FaDollarSign, FaCheckCircle, FaFilter, FaClock
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import styles from '../admin.module.css';

interface Cliente {
    id: string;
    nombre_empresa: string;
    nombre_contacto: string;
    email: string;
}

interface Proyecto {
    id: string;
    cliente_id: string;
    nombre: string;
    descripcion: string;
    estado: string;
    presupuesto: number;
    fecha_inicio: string;
    fecha_fin: string;
    activo: boolean;
    progreso: number;
    creado_en: string;
    tipo?: string;
    plazo?: string;
    notas?: string;
    clientes?: Cliente;
}

const estados = [
    { value: 'solicitado', label: '📩 Solicitado', color: '#f59e0b' },
    { value: 'planificacion', label: '📋 Planificación', color: '#f59e0b' },
    { value: 'desarrollo', label: '💻 Desarrollo', color: '#3b82f6' },
    { value: 'en_revision', label: '🔍 En Revisión', color: '#8b5cf6' },
    { value: 'completado', label: '✅ Completado', color: '#10b981' },
    { value: 'cancelado', label: '❌ Cancelado', color: '#ef4444' },
];

const tiposProyecto = [
    { value: 'desarrollo', label: '💻 Desarrollo Web' },
    { value: 'app', label: '📱 App Móvil' },
    { value: 'marketing', label: '📊 Marketing Digital' },
    { value: 'diseño', label: '🎨 Diseño UI/UX' },
    { value: 'seo', label: '🔍 SEO / Posicionamiento' },
    { value: 'consultoria', label: '💡 Consultoría' },
    { value: 'otro', label: '📦 Otro' }
];

const initialFormData = {
    cliente_id: '',
    nombre: '',
    descripcion: '',
    estado: 'planificacion',
    presupuesto: '',
    fecha_inicio: '',
    fecha_fin: '',
    activo: true,
    progreso: '0',
    tipo: 'desarrollo',
    plazo: '',
    notas: ''
};

export default function ProyectosPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [filteredProyectos, setFilteredProyectos] = useState<Proyecto[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);

    // Filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState('todos');
    const [filterTipo, setFilterTipo] = useState('todos');

    // Modales y estados
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingProyecto, setEditingProyecto] = useState<Proyecto | null>(null);
    const [deletingProyecto, setDeletingProyecto] = useState<Proyecto | null>(null);

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login');
        if (session?.user && (session.user as any).rol !== 'admin') router.push('/cliente');
    }, [status, session, router]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [resProyectos, resClientes] = await Promise.all([
                fetch('/api/admin/proyectos'),
                fetch('/api/admin/clientes')
            ]);

            const [resultProyectos, resultClientes] = await Promise.all([
                resProyectos.json(),
                resClientes.json()
            ]);

            if (resultProyectos.success) {
                setProyectos(resultProyectos.data);
                setFilteredProyectos(resultProyectos.data);
            }
            if (resultClientes.success) setClientes(resultClientes.data);

        } catch (error) {
            console.error('Error al cargar proyectos:', error);
            toast.error('Error al cargar la lista de proyectos');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Aplicar Filtros Combinados
    useEffect(() => {
        let result = [...proyectos];

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(p =>
                p.nombre.toLowerCase().includes(term) ||
                p.descripcion?.toLowerCase().includes(term) ||
                p.clientes?.nombre_empresa?.toLowerCase().includes(term)
            );
        }

        if (filterEstado !== 'todos') {
            result = result.filter(p => p.estado === filterEstado);
        }

        if (filterTipo !== 'todos') {
            result = result.filter(p => p.tipo === filterTipo);
        }

        setFilteredProyectos(result);
    }, [searchTerm, filterEstado, filterTipo, proyectos]);

    // Cálculo de métricas rápidas
    const metrics = useMemo(() => {
        const total = proyectos.length;
        const activos = proyectos.filter(p => p.activo).length;
        const presupuestoTotal = proyectos.reduce((acc, p) => acc + (Number(p.presupuesto) || 0), 0);
        const completados = proyectos.filter(p => p.estado === 'completado').length;
        return { total, activos, presupuestoTotal, completados };
    }, [proyectos]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        const toastId = toast.loading(editingProyecto ? 'Guardando cambios...' : 'Creando proyecto...');
        setSubmitting(true);

        try {
            const url = editingProyecto
                ? `/api/admin/proyectos/${editingProyecto.id}`
                : '/api/admin/proyectos';

            const method = editingProyecto ? 'PUT' : 'POST';

            const body = {
                cliente_id: formData.cliente_id || null,
                nombre: formData.nombre,
                descripcion: formData.descripcion || null,
                estado: formData.estado,
                presupuesto: parseFloat(formData.presupuesto) || 0,
                fecha_inicio: formData.fecha_inicio || null,
                fecha_fin: formData.fecha_fin || null,
                activo: formData.activo,
                progreso: parseInt(String(formData.progreso)) || 0,
                tipo: formData.tipo,
                plazo: formData.plazo || null,
                notas: formData.notas || null
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const result = await res.json();

            if (result.success) {
                await fetchData();
                setShowModal(false);
                resetForm();
                toast.success(editingProyecto ? 'Proyecto actualizado' : 'Proyecto creado con éxito', { id: toastId });
            } else {
                toast.error(result.error || 'Error al guardar el proyecto', { id: toastId });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error de conexión al guardar', { id: toastId });
        } finally {
            setSubmitting(false);
        }
    };

    const confirmDelete = async () => {
        if (!deletingProyecto) return;

        const toastId = toast.loading('Eliminando proyecto...');
        try {
            const res = await fetch(`/api/admin/proyectos/${deletingProyecto.id}`, { method: 'DELETE' });
            const result = await res.json();

            if (result.success) {
                await fetchData();
                toast.success('Proyecto eliminado correctamente', { id: toastId });
            } else {
                toast.error(result.error || 'Error al eliminar el proyecto', { id: toastId });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al conectar con el servidor', { id: toastId });
        } finally {
            setDeletingProyecto(null);
        }
    };

    const openEditModal = (proyecto: Proyecto) => {
        setEditingProyecto(proyecto);
        setFormData({
            cliente_id: proyecto.cliente_id || '',
            nombre: proyecto.nombre || '',
            descripcion: proyecto.descripcion || '',
            estado: proyecto.estado || 'planificacion',
            presupuesto: proyecto.presupuesto?.toString() || '',
            fecha_inicio: proyecto.fecha_inicio ? proyecto.fecha_inicio.split('T')[0] : '',
            fecha_fin: proyecto.fecha_fin ? proyecto.fecha_fin.split('T')[0] : '',
            activo: proyecto.activo !== undefined ? proyecto.activo : true,
            progreso: proyecto.progreso?.toString() || '0',
            tipo: proyecto.tipo || 'desarrollo',
            plazo: proyecto.plazo || '',
            notas: proyecto.notas || ''
        });
        setShowModal(true);
    };

    const openCreateModal = () => {
        setEditingProyecto(null);
        resetForm();
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingProyecto(null);
        setFormData(initialFormData);
    };

    const getEstadoBadge = (estado: string) => {
        const estadoInfo = estados.find(e => e.value === estado);
        return {
            label: estadoInfo?.label || estado,
            color: estadoInfo?.color || '#94a3b8'
        };
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val || 0);
    };

    if (loading && proyectos.length === 0) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando proyectos de la agencia...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>📁 Proyectos</h1>
                    <p style={{ color: '#94a3b8' }}>Gestiona los proyectos activos, clientes y entregables</p>
                </div>
                <button onClick={openCreateModal} className={styles.btnPrimary}>
                    <FaPlus style={{ marginRight: '8px' }} /> Nuevo proyecto
                </button>
            </div>

            {/* Tarjetas de Métricas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#1a2333', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        <FaFolderOpen />
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Total Proyectos</span>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#ffffff' }}>{metrics.total}</h3>
                    </div>
                </div>

                <div style={{ background: '#1a2333', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        <FaCheckCircle />
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Activos / Finalizados</span>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#ffffff' }}>{metrics.activos} <span style={{ fontSize: '13px', color: '#64748b' }}>/ {metrics.completados}</span></h3>
                    </div>
                </div>

                <div style={{ background: '#1a2333', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        <FaDollarSign />
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Presupuesto Total</span>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#ffffff' }}>{formatCurrency(metrics.presupuestoTotal)}</h3>
                    </div>
                </div>
            </div>

            {/* Barra de Filtros y Búsqueda */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', background: '#1a2333',
                    borderRadius: '10px', padding: '8px 16px', border: '1px solid rgba(255,255,255,0.05)',
                    flex: '1', minWidth: '240px'
                }}>
                    <FaSearch style={{ color: '#64748b', marginRight: '12px' }} />
                    <input
                        type="text"
                        placeholder="Buscar por proyecto o cliente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: '#ffffff', width: '100%', outline: 'none', fontSize: '14px' }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a2333', padding: '8px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <FaFilter style={{ color: '#64748b', fontSize: '12px' }} />
                    <select
                        value={filterEstado}
                        onChange={(e) => setFilterEstado(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '13px', cursor: 'pointer' }}
                    >
                        <option value="todos" style={{ background: '#1a2333' }}>Todos los estados</option>
                        {estados.map(e => (
                            <option key={e.value} value={e.value} style={{ background: '#1a2333' }}>{e.label}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a2333', padding: '8px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <FaFilter style={{ color: '#64748b', fontSize: '12px' }} />
                    <select
                        value={filterTipo}
                        onChange={(e) => setFilterTipo(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '13px', cursor: 'pointer' }}
                    >
                        <option value="todos" style={{ background: '#1a2333' }}>Todos los tipos</option>
                        {tiposProyecto.map(t => (
                            <option key={t.value} value={t.value} style={{ background: '#1a2333' }}>{t.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Tabla Principal */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Proyecto</th>
                            <th>Cliente</th>
                            <th>Estado</th>
                            <th>Presupuesto</th>
                            <th>Progreso</th>
                            <th>Activo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProyectos.length > 0 ? (
                            filteredProyectos.map((proyecto) => {
                                const estadoInfo = getEstadoBadge(proyecto.estado);
                                return (
                                    <tr key={proyecto.id}>
                                        <td style={{ fontWeight: 600, color: '#ffffff' }}>
                                            {proyecto.nombre}
                                            {proyecto.tipo && (
                                                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 400 }}>
                                                    {tiposProyecto.find(t => t.value === proyecto.tipo)?.label || proyecto.tipo}
                                                </div>
                                            )}
                                        </td>
                                        <td>{proyecto.clientes?.nombre_empresa || 'Sin cliente'}</td>
                                        <td>
                                            <span style={{
                                                padding: '3px 10px', borderRadius: '6px', fontSize: '11px',
                                                background: `${estadoInfo.color}15`, color: estadoInfo.color, fontWeight: 600
                                            }}>
                                                {estadoInfo.label}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: 600 }}>{formatCurrency(proyecto.presupuesto)}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '60px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <div style={{
                                                        width: `${proyecto.progreso || 0}%`, height: '100%',
                                                        background: 'linear-gradient(90deg, #3b82f6, #22d3ee)', borderRadius: '4px'
                                                    }} />
                                                </div>
                                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{proyecto.progreso || 0}%</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                                                background: proyecto.activo ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                color: proyecto.activo ? '#22c55e' : '#ef4444'
                                            }}>
                                                {proyecto.activo ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.actionButtons}>
                                                <button onClick={() => openEditModal(proyecto)} className={styles.btnEdit} title="Editar proyecto">
                                                    <FaEdit /> <span>Editar</span>
                                                </button>
                                                <button onClick={() => setDeletingProyecto(proyecto)} className={styles.btnDelete} title="Eliminar proyecto">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                    No hay proyectos {searchTerm || filterEstado !== 'todos' || filterTipo !== 'todos' ? 'que coincidan con los filtros' : 'registrados'}.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de Crear / Editar */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => { setShowModal(false); resetForm(); }}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{editingProyecto ? '✏️ Editar Proyecto' : '➕ Nuevo Proyecto'}</h2>
                            <button onClick={() => { setShowModal(false); resetForm(); }} className={styles.modalClose}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label>Cliente *</label>
                                <select
                                    value={formData.cliente_id}
                                    onChange={(e) => setFormData({ ...formData, cliente_id: e.target.value })}
                                    required
                                >
                                    <option value="">Seleccionar cliente...</option>
                                    {clientes.map((cliente) => (
                                        <option key={cliente.id} value={cliente.id}>{cliente.nombre_empresa}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Nombre del proyecto *</label>
                                <input
                                    type="text"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    required
                                    placeholder="Ej: App Krusty Burger"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Descripción</label>
                                <textarea
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    rows={3}
                                    placeholder="Detalles y objetivos del proyecto..."
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Estado</label>
                                    <select
                                        value={formData.estado}
                                        onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                                    >
                                        {estados.map((e) => (
                                            <option key={e.value} value={e.value}>{e.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Tipo de proyecto</label>
                                    <select
                                        value={formData.tipo}
                                        onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                                    >
                                        {tiposProyecto.map((t) => (
                                            <option key={t.value} value={t.value}>{t.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Presupuesto ($)</label>
                                    <input
                                        type="number"
                                        value={formData.presupuesto}
                                        onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                                        placeholder="0"
                                        step="0.01"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Progreso (%)</label>
                                    <input
                                        type="number"
                                        value={formData.progreso}
                                        onChange={(e) => setFormData({ ...formData, progreso: e.target.value })}
                                        placeholder="0"
                                        min="0"
                                        max="100"
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Fecha de inicio</label>
                                    <input
                                        type="date"
                                        value={formData.fecha_inicio}
                                        onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Fecha de fin</label>
                                    <input
                                        type="date"
                                        value={formData.fecha_fin}
                                        onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Notas adicionales</label>
                                <textarea
                                    value={formData.notas}
                                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                                    rows={2}
                                    placeholder="Notas internas o acotaciones..."
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.activo}
                                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                                    id="proyectoActivo"
                                />
                                <label htmlFor="proyectoActivo" style={{ fontSize: '13px', color: '#e2e8f0', cursor: 'pointer' }}>Proyecto activo</label>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className={styles.btnCancel}>Cancelar</button>
                                <button type="submit" disabled={submitting} className={styles.btnSubmit}>
                                    {submitting ? 'Guardando...' : editingProyecto ? '💾 Guardar cambios' : '➕ Crear proyecto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Confirmación de Eliminación */}
            {deletingProyecto && (
                <div className={styles.modalOverlay} onClick={() => setDeletingProyecto(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', textAlign: 'center' }}>
                        <div style={{ margin: '16px 0', color: '#ef4444', fontSize: '32px' }}>
                            <FaExclamationTriangle />
                        </div>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#ffffff' }}>¿Eliminar proyecto?</h2>
                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
                            Esta acción eliminará permanentemente <strong>"{deletingProyecto.nombre}"</strong> y no se podrá recuperar.
                        </p>
                        <div className={styles.modalActions} style={{ justifyContent: 'center' }}>
                            <button type="button" onClick={() => setDeletingProyecto(null)} className={styles.btnCancel}>Cancelar</button>
                            <button type="button" onClick={confirmDelete} className={styles.btnSubmit} style={{ backgroundColor: '#ef4444' }}>Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}