'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
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
    progreso: number;        // ✅ Agregado
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

export default function ProyectosPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [filteredProyectos, setFilteredProyectos] = useState<Proyecto[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProyecto, setEditingProyecto] = useState<Proyecto | null>(null);
    const [formData, setFormData] = useState({
        cliente_id: '',
        nombre: '',
        descripcion: '',
        estado: 'planificacion',
        presupuesto: '',
        fecha_inicio: '',
        fecha_fin: '',
        activo: true,
        progreso: '0',        // ✅ Agregado (string para el input)
        tipo: 'desarrollo',
        plazo: '',
        notas: ''
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
        if (session?.user?.rol !== 'admin') {
            router.push('/cliente');
        }
    }, [status, session, router]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProyectos(proyectos);
        } else {
            const term = searchTerm.toLowerCase();
            setFilteredProyectos(proyectos.filter(p =>
                p.nombre.toLowerCase().includes(term) ||
                p.descripcion?.toLowerCase().includes(term) ||
                p.clientes?.nombre_empresa?.toLowerCase().includes(term)
            ));
        }
    }, [searchTerm, proyectos]);

    const fetchData = async () => {
        try {
            const resProyectos = await fetch('/api/admin/proyectos');
            const resultProyectos = await resProyectos.json();
            if (resultProyectos.success) {
                setProyectos(resultProyectos.data);
                setFilteredProyectos(resultProyectos.data);
            }

            const resClientes = await fetch('/api/admin/clientes');
            const resultClientes = await resClientes.json();
            if (resultClientes.success) {
                setClientes(resultClientes.data);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingProyecto
                ? `/api/admin/proyectos/${editingProyecto.id}`
                : '/api/admin/proyectos';

            const method = editingProyecto ? 'PUT' : 'POST';

            const body = {
                cliente_id: formData.cliente_id,
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                estado: formData.estado,
                presupuesto: parseFloat(formData.presupuesto) || 0,
                fecha_inicio: formData.fecha_inicio || null,
                fecha_fin: formData.fecha_fin || null,
                activo: formData.activo,
                progreso: parseInt(String(formData.progreso)) || 0,  // ✅ Convertir a número
                tipo: formData.tipo,
                plazo: formData.plazo || null,
                notas: formData.notas || null
            };

            console.log('📝 Enviando datos:', body);

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const result = await res.json();
            if (result.success) {
                fetchData();
                setShowModal(false);
                resetForm();
                alert(editingProyecto ? '✅ Proyecto actualizado' : '✅ Proyecto creado');
            } else {
                alert(result.error || '❌ Error al guardar proyecto');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Error al guardar proyecto');
        }
    };

    const handleDelete = async (proyecto: Proyecto) => {
        if (!confirm(`¿Estás seguro de eliminar el proyecto "${proyecto.nombre}"?`)) return;

        try {
            const res = await fetch(`/api/admin/proyectos/${proyecto.id}`, {
                method: 'DELETE'
            });
            const result = await res.json();
            if (result.success) {
                fetchData();
                alert('✅ Proyecto eliminado');
            } else {
                alert(result.error || '❌ Error al eliminar proyecto');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Error al eliminar proyecto');
        }
    };

    const openEditModal = (proyecto: Proyecto) => {
        setEditingProyecto(proyecto);
        setFormData({
            cliente_id: proyecto.cliente_id,
            nombre: proyecto.nombre,
            descripcion: proyecto.descripcion || '',
            estado: proyecto.estado || 'planificacion',
            presupuesto: proyecto.presupuesto?.toString() || '',
            fecha_inicio: proyecto.fecha_inicio || '',
            fecha_fin: proyecto.fecha_fin || '',
            activo: proyecto.activo !== undefined ? proyecto.activo : true,
            progreso: proyecto.progreso?.toString() || '0',  // ✅ Convertir a string
            tipo: proyecto.tipo || 'desarrollo',
            plazo: proyecto.plazo || '',
            notas: proyecto.notas || ''
        });
        setShowModal(true);
    };

    const openCreateModal = () => {
        setEditingProyecto(null);
        setFormData({
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
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingProyecto(null);
        setFormData({
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
        });
    };

    const getEstadoBadge = (estado: string) => {
        const estadoInfo = estados.find(e => e.value === estado);
        return {
            label: estadoInfo?.label || estado,
            color: estadoInfo?.color || '#94a3b8'
        };
    };

    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando proyectos...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>📁 Proyectos</h1>
                    <p style={{ color: '#94a3b8' }}>Gestiona los proyectos de la agencia</p>
                </div>
                <button onClick={openCreateModal} className={styles.btnPrimary}>
                    <FaPlus style={{ marginRight: '8px' }} /> Nuevo proyecto
                </button>
            </div>

            {/* Buscador */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#1a2333',
                    borderRadius: '10px',
                    padding: '8px 16px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    maxWidth: '400px'
                }}>
                    <FaSearch style={{ color: '#64748b', marginRight: '12px' }} />
                    <input
                        type="text"
                        placeholder="Buscar proyectos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#ffffff',
                            padding: '8px 0',
                            width: '100%',
                            outline: 'none',
                            fontSize: '14px'
                        }}
                    />
                </div>
            </div>

            {/* Tabla */}
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
                                        <td style={{ fontWeight: 500 }}>{proyecto.nombre}</td>
                                        <td>{proyecto.clientes?.nombre_empresa || 'Sin cliente'}</td>
                                        <td>
                                            <span style={{
                                                padding: '2px 12px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                background: `${estadoInfo.color}15`,
                                                color: estadoInfo.color
                                            }}>
                                                {estadoInfo.label}
                                            </span>
                                        </td>
                                        <td>${proyecto.presupuesto?.toLocaleString() || '0'}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{
                                                    width: '60px',
                                                    height: '6px',
                                                    background: 'rgba(255,255,255,0.1)',
                                                    borderRadius: '4px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        width: `${proyecto.progreso || 0}%`,
                                                        height: '100%',
                                                        background: 'linear-gradient(90deg, #3b82f6, #22d3ee)',
                                                        borderRadius: '4px',
                                                        transition: 'width 0.3s ease'
                                                    }} />
                                                </div>
                                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                                                    {proyecto.progreso || 0}%
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '2px 12px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                background: proyecto.activo ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                color: proyecto.activo ? '#22c55e' : '#ef4444'
                                            }}>
                                                {proyecto.activo ? '✅ Activo' : '❌ Inactivo'}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => openEditModal(proyecto)}
                                                className={styles.btnEdit}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(proyecto)}
                                                className={styles.btnDanger}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                    No hay proyectos {searchTerm ? 'que coincidan con la búsqueda' : 'registrados'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de Crear/Editar */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>{editingProyecto ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
                            <button onClick={() => { setShowModal(false); resetForm(); }} className={styles.modalClose}>
                                ✕
                            </button>
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
                                        <option key={cliente.id} value={cliente.id}>
                                            {cliente.nombre_empresa}
                                        </option>
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
                                    placeholder="Descripción del proyecto..."
                                    style={{
                                        padding: '10px 14px',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        background: 'rgba(0,0,0,0.3)',
                                        color: '#ffffff',
                                        fontSize: '14px',
                                        width: '100%',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

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
                                    <option value="desarrollo">💻 Desarrollo Web</option>
                                    <option value="app">📱 App Móvil</option>
                                    <option value="marketing">📊 Marketing Digital</option>
                                    <option value="diseño">🎨 Diseño UI/UX</option>
                                    <option value="seo">🔍 SEO / Posicionamiento</option>
                                    <option value="consultoria">💡 Consultoría</option>
                                    <option value="otro">📦 Otro</option>
                                </select>
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
                                <label>Plazo estimado</label>
                                <select
                                    value={formData.plazo}
                                    onChange={(e) => setFormData({ ...formData, plazo: e.target.value })}
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

                            <div className={styles.formGroup}>
                                <label>Notas adicionales</label>
                                <textarea
                                    value={formData.notas}
                                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                                    rows={2}
                                    placeholder="Notas sobre el proyecto..."
                                    style={{
                                        padding: '10px 14px',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        background: 'rgba(0,0,0,0.3)',
                                        color: '#ffffff',
                                        fontSize: '14px',
                                        width: '100%',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.activo}
                                        onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                    Proyecto activo
                                </label>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className={styles.btnSecondary}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.btnPrimary}>
                                    {editingProyecto ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}