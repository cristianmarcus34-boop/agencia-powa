'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import {
    FaEdit, FaTrash, FaPlus, FaSearch, FaExclamationTriangle,
    FaThList, FaColumns, FaHistory, FaFilter
} from 'react-icons/fa';
import styles from '../admin.module.css';

interface Proyecto {
    id: string;
    nombre: string;
}

interface Usuario {
    id: string;
    nombre_completo: string;
    rol?: string;
}

interface Tarea {
    id: string;
    titulo: string;
    descripcion: string;
    proyecto_id: string;
    asignado_a: string;
    prioridad: 'baja' | 'media' | 'alta' | 'urgente';
    estado: 'pendiente' | 'en_progreso' | 'en_revision' | 'completada';
    fecha_vencimiento: string;
    creado_en: string;
    proyectos?: { nombre: string };
    usuarios?: { nombre_completo: string };
}

interface HistorialItem {
    id: string;
    accion: string;
    detalle: string;
    usuario_nombre: string;
    creado_en: string;
}

type PrioridadType = 'baja' | 'media' | 'alta' | 'urgente';
type EstadoType = 'pendiente' | 'en_progreso' | 'en_revision' | 'completada';

const prioridades: Array<{ value: PrioridadType; label: string; color: string }> = [
    { value: 'baja', label: '🟢 Baja', color: '#10b981' },
    { value: 'media', label: '🔵 Media', color: '#3b82f6' },
    { value: 'alta', label: '🟠 Alta', color: '#f59e0b' },
    { value: 'urgente', label: '🔴 Urgente', color: '#ef4444' },
];

const estadosTarea: Array<{ value: EstadoType; label: string; color: string }> = [
    { value: 'pendiente', label: '⏳ Pendiente', color: '#94a3b8' },
    { value: 'en_progreso', label: '💻 En Progreso', color: '#3b82f6' },
    { value: 'en_revision', label: '🔍 En Revisión', color: '#8b5cf6' },
    { value: 'completada', label: '✅ Completada', color: '#10b981' },
];

const initialFormData = {
    titulo: '',
    descripcion: '',
    proyecto_id: '',
    asignado_a: '',
    prioridad: 'media' as PrioridadType,
    estado: 'pendiente' as EstadoType,
    fecha_vencimiento: ''
};

export default function TareasPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [filteredTareas, setFilteredTareas] = useState<Tarea[]>([]);
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    // Estados de filtros y vista
    const [viewMode, setViewMode] = useState<'table' | 'kanban'>('kanban');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState<string>('todos');
    const [filterPrioridad, setFilterPrioridad] = useState<string>('todos');

    // Modales y estados de edición
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingTarea, setEditingTarea] = useState<Tarea | null>(null);
    const [deletingTarea, setDeletingTarea] = useState<Tarea | null>(null);

    // Modal de Historial
    const [historyTarea, setHistoryTarea] = useState<Tarea | null>(null);
    const [historialItems, setHistorialItems] = useState<HistorialItem[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [formData, setFormData] = useState(initialFormData);

    const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login');
    }, [status, router]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [resTareas, resProyectos, resUsuarios] = await Promise.all([
                fetch('/api/admin/tareas'),
                fetch('/api/admin/proyectos'),
                fetch('/api/admin/usuarios')
            ]);

            const [resultTareas, resultProyectos, resultUsuarios] = await Promise.all([
                resTareas.json(),
                resProyectos.json(),
                resUsuarios.json()
            ]);

            if (resultTareas.success) {
                setTareas(resultTareas.data);
                setFilteredTareas(resultTareas.data);
            }
            if (resultProyectos.success) setProyectos(resultProyectos.data);
            if (resultUsuarios.success) setUsuarios(resultUsuarios.data);

        } catch (error) {
            console.error('Error al cargar datos:', error);
            triggerToast('Error al cargar la información inicial', 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Aplicar filtros combinados (Búsqueda + Estado + Prioridad)
    useEffect(() => {
        let result = [...tareas];

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(t =>
                t.titulo.toLowerCase().includes(term) ||
                t.descripcion?.toLowerCase().includes(term) ||
                t.proyectos?.nombre?.toLowerCase().includes(term) ||
                t.usuarios?.nombre_completo?.toLowerCase().includes(term)
            );
        }

        if (filterEstado !== 'todos') {
            result = result.filter(t => t.estado === filterEstado);
        }

        if (filterPrioridad !== 'todos') {
            result = result.filter(t => t.prioridad === filterPrioridad);
        }

        setFilteredTareas(result);
    }, [searchTerm, filterEstado, filterPrioridad, tareas]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        try {
            const url = editingTarea ? `/api/admin/tareas/${editingTarea.id}` : '/api/admin/tareas';
            const method = editingTarea ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();
            if (result.success) {
                await fetchData();
                setShowModal(false);
                resetForm();
                triggerToast(editingTarea ? 'Tarea actualizada' : 'Tarea creada', 'success');
            } else {
                triggerToast(result.error || 'Error al guardar la tarea', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            triggerToast('Error al conectar con el servidor', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    // Actualización rápida de estado (Para el tablero Kanban)
    const handleQuickStatusChange = async (tarea: Tarea, newEstado: EstadoType) => {
        if (tarea.estado === newEstado) return;

        try {
            const res = await fetch(`/api/admin/tareas/${tarea.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...tarea, estado: newEstado })
            });

            const result = await res.json();
            if (result.success) {
                await fetchData();
                triggerToast(`Estado cambiado a ${getEstadoBadge(newEstado).label}`, 'success');
            } else {
                triggerToast(result.error || 'No se pudo cambiar el estado', 'error');
            }
        } catch (error) {
            triggerToast('Error al actualizar estado', 'error');
        }
    };

    const confirmDelete = async () => {
        if (!deletingTarea) return;

        try {
            const res = await fetch(`/api/admin/tareas/${deletingTarea.id}`, { method: 'DELETE' });
            const result = await res.json();

            if (result.success) {
                await fetchData();
                triggerToast('Tarea eliminada', 'success');
            } else {
                triggerToast(result.error || 'Error al eliminar', 'error');
            }
        } catch (error) {
            triggerToast('Error al conectar con el servidor', 'error');
        } finally {
            setDeletingTarea(null);
        }
    };

    const openHistoryModal = async (tarea: Tarea) => {
        setHistoryTarea(tarea);
        setLoadingHistory(true);
        try {
            const res = await fetch(`/api/admin/tareas/${tarea.id}/historial`);
            const result = await res.json();
            if (result.success) {
                setHistorialItems(result.data);
            }
        } catch (error) {
            console.error('Error al obtener historial:', error);
        } finally {
            setLoadingHistory(false);
        }
    };

    const openEditModal = (tarea: Tarea) => {
        setEditingTarea(tarea);
        setFormData({
            titulo: tarea.titulo || '',
            descripcion: tarea.descripcion || '',
            proyecto_id: tarea.proyecto_id || '',
            asignado_a: tarea.asignado_a || '',
            prioridad: tarea.prioridad || 'media',
            estado: tarea.estado || 'pendiente',
            fecha_vencimiento: tarea.fecha_vencimiento ? tarea.fecha_vencimiento.split('T')[0] : ''
        });
        setShowModal(true);
    };

    const openCreateModal = () => {
        setEditingTarea(null);
        resetForm();
        setShowModal(true);
    };

    const resetForm = () => setFormData(initialFormData);

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return 'Sin fecha';
        const cleanDate = dateStr.split('T')[0];
        const [year, month, day] = cleanDate.split('-');
        return `${day}/${month}/${year}`;
    };

    const getPrioridadBadge = (p: string) => prioridades.find(x => x.value === p) || { label: p, color: '#94a3b8' };
    const getEstadoBadge = (e: string) => estadosTarea.find(x => x.value === e) || { label: e, color: '#94a3b8' };

    if (loading && tareas.length === 0) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando tareas del equipo...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Toast feedback */}
            {toast && (
                <div style={{
                    position: 'fixed', bottom: '24px', right: '24px',
                    backgroundColor: toast.type === 'success' ? '#059669' : '#dc2626',
                    color: '#ffffff', padding: '12px 20px', borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)', zIndex: 9999,
                    fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                    <span>{toast.type === 'success' ? '✅' : '❌'}</span>
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Header y Control de Vistas */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>📋 Tareas y Operaciones</h1>
                    <p style={{ color: '#94a3b8' }}>Módulo de gestión y seguimiento en tiempo real</p>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {/* Toggle de Modo de Vista */}
                    <div style={{ background: '#1a2333', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex' }}>
                        <button
                            onClick={() => setViewMode('kanban')}
                            style={{
                                background: viewMode === 'kanban' ? '#3b82f6' : 'transparent',
                                color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px'
                            }}
                        >
                            <FaColumns /> Kanban
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            style={{
                                background: viewMode === 'table' ? '#3b82f6' : 'transparent',
                                color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px'
                            }}
                        >
                            <FaThList /> Lista
                        </button>
                    </div>

                    <button onClick={openCreateModal} className={styles.btnPrimary}>
                        <FaPlus style={{ marginRight: '8px' }} /> Nueva tarea
                    </button>
                </div>
            </div>

            {/* Barra de Filtros */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Campo de Búsqueda */}
                <div style={{
                    display: 'flex', alignItems: 'center', background: '#1a2333',
                    borderRadius: '10px', padding: '8px 16px', border: '1px solid rgba(255,255,255,0.05)',
                    flex: '1', minWidth: '240px'
                }}>
                    <FaSearch style={{ color: '#64748b', marginRight: '12px' }} />
                    <input
                        type="text"
                        placeholder="Buscar tareas, proyectos o usuarios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: '#ffffff', width: '100%', outline: 'none', fontSize: '14px' }}
                    />
                </div>

                {/* Filtro por Estado */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a2333', padding: '8px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <FaFilter style={{ color: '#64748b', fontSize: '12px' }} />
                    <select
                        value={filterEstado}
                        onChange={(e) => setFilterEstado(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '13px', cursor: 'pointer' }}
                    >
                        <option value="todos" style={{ background: '#1a2333' }}>Todos los estados</option>
                        {estadosTarea.map(e => (
                            <option key={e.value} value={e.value} style={{ background: '#1a2333' }}>{e.label}</option>
                        ))}
                    </select>
                </div>

                {/* Filtro por Prioridad */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a2333', padding: '8px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <FaFilter style={{ color: '#64748b', fontSize: '12px' }} />
                    <select
                        value={filterPrioridad}
                        onChange={(e) => setFilterPrioridad(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '13px', cursor: 'pointer' }}
                    >
                        <option value="todos" style={{ background: '#1a2333' }}>Todas las prioridades</option>
                        {prioridades.map(p => (
                            <option key={p.value} value={p.value} style={{ background: '#1a2333' }}>{p.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* VISTA 1: TABLERO KANBAN */}
            {viewMode === 'kanban' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', alignItems: 'start' }}>
                    {estadosTarea.map((estadoCol) => {
                        const tareasCol = filteredTareas.filter(t => t.estado === estadoCol.value);
                        return (
                            <div key={estadoCol.value} style={{ background: '#111827', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>{estadoCol.label}</h3>
                                    <span style={{ background: `${estadoCol.color}20`, color: estadoCol.color, fontSize: '12px', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                                        {tareasCol.length}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {tareasCol.length > 0 ? (
                                        tareasCol.map((tarea) => {
                                            const prio = getPrioridadBadge(tarea.prioridad);
                                            return (
                                                <div key={tarea.id} style={{ background: '#1e293b', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                                        <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{tarea.titulo}</h4>
                                                        <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: `${prio.color}15`, color: prio.color, fontWeight: 600 }}>
                                                            {prio.label}
                                                        </span>
                                                    </div>

                                                    {tarea.descripcion && (
                                                        <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                            {tarea.descripcion}
                                                        </p>
                                                    )}

                                                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '12px' }}>
                                                        📁 {tarea.proyectos?.nombre || 'General'} • 👤 {tarea.usuarios?.nombre_completo || 'Sin asignar'}
                                                    </div>

                                                    {/* Selector rápido de mover estado */}
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                                        <select
                                                            value={tarea.estado}
                                                            onChange={(e) => handleQuickStatusChange(tarea, e.target.value as EstadoType)}
                                                            style={{ background: '#0f172a', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '11px', padding: '2px 4px' }}
                                                        >
                                                            {estadosTarea.map(st => (
                                                                <option key={st.value} value={st.value}>{st.label}</option>
                                                            ))}
                                                        </select>

                                                        <div style={{ display: 'flex', gap: '6px' }}>
                                                            <button onClick={() => openHistoryModal(tarea)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }} title="Ver Historial">
                                                                <FaHistory size={12} />
                                                            </button>
                                                            <button onClick={() => openEditModal(tarea)} style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer' }} title="Editar">
                                                                <FaEdit size={12} />
                                                            </button>
                                                            <button onClick={() => setDeletingTarea(tarea)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Eliminar">
                                                                <FaTrash size={12} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '20px', color: '#475569', fontSize: '12px', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                            Sin tareas
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* VISTA 2: TABLA DE LISTA */}
            {viewMode === 'table' && (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Proyecto</th>
                                <th>Asignado a</th>
                                <th>Prioridad</th>
                                <th>Estado</th>
                                <th>Vencimiento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTareas.length > 0 ? (
                                filteredTareas.map((tarea) => {
                                    const prio = getPrioridadBadge(tarea.prioridad);
                                    const est = getEstadoBadge(tarea.estado);
                                    return (
                                        <tr key={tarea.id}>
                                            <td style={{ fontWeight: 600, color: '#ffffff' }}>{tarea.titulo}</td>
                                            <td>{tarea.proyectos?.nombre || 'General'}</td>
                                            <td>{tarea.usuarios?.nombre_completo || 'Sin asignar'}</td>
                                            <td>
                                                <span style={{ padding: '2px 8px', borderRadius: '6px', fontSize: '11px', background: `${prio.color}15`, color: prio.color, fontWeight: 600 }}>
                                                    {prio.label}
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{ padding: '2px 8px', borderRadius: '6px', fontSize: '11px', background: `${est.color}15`, color: est.color, fontWeight: 600 }}>
                                                    {est.label}
                                                </span>
                                            </td>
                                            <td>{formatDate(tarea.fecha_vencimiento)}</td>
                                            <td>
                                                <div className={styles.actionButtons}>
                                                    <button onClick={() => openHistoryModal(tarea)} style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }} title="Historial">
                                                        <FaHistory />
                                                    </button>
                                                    <button onClick={() => openEditModal(tarea)} className={styles.btnEdit} title="Editar">
                                                        <FaEdit /> <span>Editar</span>
                                                    </button>
                                                    <button onClick={() => setDeletingTarea(tarea)} className={styles.btnDelete} title="Eliminar">
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
                                        No se encontraron tareas registradas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal Crear / Editar */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{editingTarea ? '✏️ Editar Tarea' : '➕ Nueva Tarea'}</h2>
                            <button onClick={() => setShowModal(false)} className={styles.modalClose}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label>Título de la tarea *</label>
                                <input
                                    type="text"
                                    value={formData.titulo}
                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                    required
                                    placeholder="Ej: Integrar pasarela de pagos"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Descripción</label>
                                <textarea
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    rows={3}
                                    placeholder="Detalles de lo que hay que hacer..."
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Proyecto asociado</label>
                                    <select
                                        value={formData.proyecto_id}
                                        onChange={(e) => setFormData({ ...formData, proyecto_id: e.target.value })}
                                    >
                                        <option value="">Seleccionar proyecto...</option>
                                        {proyectos.map((p) => (
                                            <option key={p.id} value={p.id}>{p.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Asignar a empleado</label>
                                    <select
                                        value={formData.asignado_a}
                                        onChange={(e) => setFormData({ ...formData, asignado_a: e.target.value })}
                                    >
                                        <option value="">Seleccionar usuario...</option>
                                        {usuarios.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u.nombre_completo} {u.rol ? `(${u.rol})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Prioridad</label>
                                    <select
                                        value={formData.prioridad}
                                        onChange={(e) => setFormData({ ...formData, prioridad: e.target.value as PrioridadType })}
                                    >
                                        {prioridades.map((p) => (
                                            <option key={p.value} value={p.value}>{p.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Estado</label>
                                    <select
                                        value={formData.estado}
                                        onChange={(e) => setFormData({ ...formData, estado: e.target.value as EstadoType })}
                                    >
                                        {estadosTarea.map((e) => (
                                            <option key={e.value} value={e.value}>{e.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Fecha Vencimiento</label>
                                <input
                                    type="date"
                                    value={formData.fecha_vencimiento}
                                    onChange={(e) => setFormData({ ...formData, fecha_vencimiento: e.target.value })}
                                />
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setShowModal(false)} className={styles.btnCancel}>Cancelar</button>
                                <button type="submit" disabled={submitting} className={styles.btnSubmit}>
                                    {submitting ? 'Guardando...' : editingTarea ? '💾 Guardar cambios' : '➕ Crear tarea'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Historial y Auditoría */}
            {historyTarea && (
                <div className={styles.modalOverlay} onClick={() => setHistoryTarea(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className={styles.modalHeader}>
                            <h2>📜 Historial: {historyTarea.titulo}</h2>
                            <button onClick={() => setHistoryTarea(null)} className={styles.modalClose}>✕</button>
                        </div>

                        <div style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {loadingHistory ? (
                                <p style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>Cargando registros...</p>
                            ) : historialItems.length > 0 ? (
                                historialItems.map(item => (
                                    <div key={item.id} style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #3b82f6' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>
                                            <span>👤 {item.usuario_nombre}</span>
                                            <span>{new Date(item.creado_en).toLocaleString()}</span>
                                        </div>
                                        <p style={{ fontSize: '13px', color: '#e2e8f0', margin: 0 }}>{item.detalle}</p>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: '#64748b', textAlign: 'center', padding: '20px' }}>Sin cambios registrados aún.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmación de Eliminación */}
            {deletingTarea && (
                <div className={styles.modalOverlay} onClick={() => setDeletingTarea(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', textAlign: 'center' }}>
                        <div style={{ margin: '16px 0', color: '#ef4444', fontSize: '32px' }}>
                            <FaExclamationTriangle />
                        </div>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#ffffff' }}>¿Eliminar tarea?</h2>
                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
                            Esta acción eliminará permanentemente <strong>"{deletingTarea.titulo}"</strong>.
                        </p>
                        <div className={styles.modalActions} style={{ justifyContent: 'center' }}>
                            <button type="button" onClick={() => setDeletingTarea(null)} className={styles.btnCancel}>Cancelar</button>
                            <button type="button" onClick={confirmDelete} className={styles.btnSubmit} style={{ backgroundColor: '#ef4444' }}>Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}