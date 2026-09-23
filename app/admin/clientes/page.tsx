// app/admin/clientes/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo } from 'react';
import {
    FaEdit, FaTrash, FaPlus, FaSearch, FaExclamationTriangle,
    FaBuilding, FaUserCheck, FaFolder, FaFilter
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import styles from '../admin.module.css';

interface Cliente {
    id: string;
    nombre_empresa: string;
    nombre_contacto: string;
    email: string;
    telefono: string;
    sitio_web: string;
    industria: string;
    tamaño_empresa: string;
    notas: string;
    activo: boolean;
    creado_en: string;
    proyectos?: Array<{ id: string; nombre: string; estado: string; presupuesto: number }>;
}

const industrias = [
    { value: 'gastronomia', label: '🍔 Gastronomía' },
    { value: 'tecnologia', label: '💻 Tecnología' },
    { value: 'ecommerce', label: '🛒 E-commerce' },
    { value: 'servicios', label: '📋 Servicios' },
    { value: 'salud', label: '🏥 Salud' },
    { value: 'educacion', label: '📚 Educación' },
    { value: 'finanzas', label: '💰 Finanzas' },
    { value: 'otros', label: '📦 Otros' },
];

const tamanos = [
    { value: 'startup', label: '🚀 Startup' },
    { value: 'pyme', label: '🏢 PYME' },
    { value: 'empresa', label: '🏛️ Empresa' },
    { value: 'corporacion', label: '🌍 Corporación' },
];

const initialFormData = {
    nombre_empresa: '',
    nombre_contacto: '',
    email: '',
    telefono: '',
    sitio_web: '',
    industria: '',
    tamaño_empresa: '',
    notas: '',
    activo: true
};

export default function ClientesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);

    // Filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [filterIndustria, setFilterIndustria] = useState('todos');
    const [filterEstado, setFilterEstado] = useState('todos');

    // Modales y estados
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
    const [deletingCliente, setDeletingCliente] = useState<Cliente | null>(null);
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (status === 'loading') return;

        if (status === 'unauthenticated') {
            router.replace('/login');
            return;
        }

        if (status === 'authenticated' && (session?.user as any)?.rol !== 'admin') {
            router.replace('/cliente');
            return;
        }
    }, [status, session, router]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/clientes');
            const result = await res.json();
            if (result.success) {
                setClientes(result.data);
                setFilteredClientes(result.data);
            } else {
                toast.error(result.error || 'Error al obtener clientes');
            }
        } catch (error) {
            console.error('Error al cargar clientes:', error);
            toast.error('Error de conexión al cargar clientes');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (status === 'authenticated' && (session?.user as any)?.rol === 'admin') {
            fetchData();
        }
    }, [status, session, fetchData]);

    // Filtros combinados
    useEffect(() => {
        let result = [...clientes];

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(c =>
                c.nombre_empresa.toLowerCase().includes(term) ||
                c.nombre_contacto.toLowerCase().includes(term) ||
                c.email.toLowerCase().includes(term)
            );
        }

        if (filterIndustria !== 'todos') {
            result = result.filter(c => c.industria === filterIndustria);
        }

        if (filterEstado !== 'todos') {
            const isActivo = filterEstado === 'activo';
            result = result.filter(c => c.activo === isActivo);
        }

        setFilteredClientes(result);
    }, [searchTerm, filterIndustria, filterEstado, clientes]);

    // Métricas
    const metrics = useMemo(() => {
        const total = clientes.length;
        const activos = clientes.filter(c => c.activo).length;
        const totalProyectos = clientes.reduce((acc, c) => acc + (c.proyectos?.length || 0), 0);
        return { total, activos, totalProyectos };
    }, [clientes]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        const toastId = toast.loading(editingCliente ? 'Guardando cambios...' : 'Creando cliente...');
        setSubmitting(true);

        try {
            const url = editingCliente
                ? `/api/admin/clientes/${editingCliente.id}`
                : '/api/admin/clientes';

            const method = editingCliente ? 'PUT' : 'POST';

            const body = {
                nombre_empresa: formData.nombre_empresa,
                nombre_contacto: formData.nombre_contacto,
                email: formData.email,
                telefono: formData.telefono || null,
                sitio_web: formData.sitio_web || null,
                industria: formData.industria || null,
                tamaño_empresa: formData.tamaño_empresa || null,
                notas: formData.notas || null,
                activo: formData.activo,
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
                toast.success(editingCliente ? 'Cliente actualizado correctamente' : 'Cliente creado con éxito', { id: toastId });
            } else {
                toast.error(result.error || 'Error al guardar cliente', { id: toastId });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error de conexión al guardar', { id: toastId });
        } finally {
            setSubmitting(false);
        }
    };

    const confirmDelete = async () => {
        if (!deletingCliente) return;

        const toastId = toast.loading('Eliminando cliente...');
        try {
            const res = await fetch(`/api/admin/clientes/${deletingCliente.id}`, { method: 'DELETE' });
            const result = await res.json();

            if (result.success) {
                await fetchData();
                toast.success('Cliente eliminado correctamente', { id: toastId });
            } else {
                toast.error(result.error || 'Error al eliminar cliente', { id: toastId });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error de conexión al eliminar', { id: toastId });
        } finally {
            setDeletingCliente(null);
        }
    };

    const openEditModal = (cliente: Cliente) => {
        setEditingCliente(cliente);
        setFormData({
            nombre_empresa: cliente.nombre_empresa || '',
            nombre_contacto: cliente.nombre_contacto || '',
            email: cliente.email || '',
            telefono: cliente.telefono || '',
            sitio_web: cliente.sitio_web || '',
            industria: cliente.industria || '',
            tamaño_empresa: cliente.tamaño_empresa || '',
            notas: cliente.notas || '',
            activo: cliente.activo !== undefined ? cliente.activo : true,
        });
        setShowModal(true);
    };

    const openCreateModal = () => {
        setEditingCliente(null);
        resetForm();
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingCliente(null);
        setFormData(initialFormData);
    };

    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando clientes de la agencia...</p>
            </div>
        );
    }

    if (status === 'unauthenticated' || (session?.user as any)?.rol !== 'admin') {
        return null;
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>🏢 Clientes y CRM</h1>
                    <p style={{ color: '#94a3b8' }}>Gestiona las empresas clientes y sus relaciones con la agencia</p>
                </div>
                <button onClick={openCreateModal} className={styles.btnPrimary}>
                    <FaPlus style={{ marginRight: '8px' }} /> Nuevo cliente
                </button>
            </div>

            {/* Métricas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#1a2333', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        <FaBuilding />
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Total Empresas</span>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#ffffff' }}>{metrics.total}</h3>
                    </div>
                </div>

                <div style={{ background: '#1a2333', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        <FaUserCheck />
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Clientes Activos</span>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#ffffff' }}>{metrics.activos}</h3>
                    </div>
                </div>

                <div style={{ background: '#1a2333', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        <FaFolder />
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Proyectos Totales</span>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#ffffff' }}>{metrics.totalProyectos}</h3>
                    </div>
                </div>
            </div>

            {/* Filtros */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', background: '#1a2333',
                    borderRadius: '10px', padding: '8px 16px', border: '1px solid rgba(255,255,255,0.05)',
                    flex: '1', minWidth: '240px'
                }}>
                    <FaSearch style={{ color: '#64748b', marginRight: '12px' }} />
                    <input
                        type="text"
                        placeholder="Buscar por empresa, contacto o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: '#ffffff', width: '100%', outline: 'none', fontSize: '14px' }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a2333', padding: '8px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <FaFilter style={{ color: '#64748b', fontSize: '12px' }} />
                    <select
                        value={filterIndustria}
                        onChange={(e) => setFilterIndustria(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '13px', cursor: 'pointer' }}
                    >
                        <option value="todos" style={{ background: '#1a2333' }}>Todas las industrias</option>
                        {industrias.map(i => (
                            <option key={i.value} value={i.value} style={{ background: '#1a2333' }}>{i.label}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a2333', padding: '8px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <FaFilter style={{ color: '#64748b', fontSize: '12px' }} />
                    <select
                        value={filterEstado}
                        onChange={(e) => setFilterEstado(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '13px', cursor: 'pointer' }}
                    >
                        <option value="todos" style={{ background: '#1a2333' }}>Todos los estados</option>
                        <option value="activo" style={{ background: '#1a2333' }}>Activo</option>
                        <option value="inactivo" style={{ background: '#1a2333' }}>Inactivo</option>
                    </select>
                </div>
            </div>

            {/* Tabla */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Empresa</th>
                            <th>Contacto</th>
                            <th>Email</th>
                            <th>Industria</th>
                            <th>Proyectos</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClientes.length > 0 ? (
                            filteredClientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td style={{ fontWeight: 600, color: '#ffffff' }}>{cliente.nombre_empresa}</td>
                                    <td>{cliente.nombre_contacto}</td>
                                    <td>{cliente.email}</td>
                                    <td>
                                        <span style={{
                                            padding: '2px 10px', borderRadius: '12px', fontSize: '12px',
                                            background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', fontWeight: 500
                                        }}>
                                            {industrias.find(i => i.value === cliente.industria)?.label || cliente.industria || '—'}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>{cliente.proyectos?.length || 0}</td>
                                    <td>
                                        <span style={{
                                            padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                                            background: cliente.activo ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                            color: cliente.activo ? '#22c55e' : '#ef4444'
                                        }}>
                                            {cliente.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <button
                                                onClick={() => openEditModal(cliente)}
                                                className={styles.btnEdit}
                                                title="Editar cliente"
                                            >
                                                <FaEdit /> <span>Editar</span>
                                            </button>
                                            <button
                                                onClick={() => setDeletingCliente(cliente)}
                                                className={styles.btnDelete}
                                                disabled={Boolean(cliente.proyectos && cliente.proyectos.length > 0)}
                                                title={cliente.proyectos && cliente.proyectos.length > 0 ? 'Tiene proyectos asociados' : 'Eliminar cliente'}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                    No hay clientes {searchTerm || filterIndustria !== 'todos' || filterEstado !== 'todos' ? 'que coincidan con los filtros' : 'registrados'}.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Crear / Editar */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => { setShowModal(false); resetForm(); }}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{editingCliente ? '✏️ Editar Cliente' : '➕ Nuevo Cliente'}</h2>
                            <button onClick={() => { setShowModal(false); resetForm(); }} className={styles.modalClose}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.modalForm}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Nombre de la empresa *</label>
                                    <input
                                        type="text"
                                        value={formData.nombre_empresa}
                                        onChange={(e) => setFormData({ ...formData, nombre_empresa: e.target.value })}
                                        required
                                        placeholder="Ej: Krusty Burger"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Nombre del contacto *</label>
                                    <input
                                        type="text"
                                        value={formData.nombre_contacto}
                                        onChange={(e) => setFormData({ ...formData, nombre_contacto: e.target.value })}
                                        required
                                        placeholder="Ej: Homero Simpson"
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        placeholder="contacto@empresa.com"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Teléfono</label>
                                    <input
                                        type="text"
                                        value={formData.telefono}
                                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                        placeholder="+54 11 1234-5678"
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Industria</label>
                                    <select
                                        value={formData.industria}
                                        onChange={(e) => setFormData({ ...formData, industria: e.target.value })}
                                    >
                                        <option value="">Seleccionar...</option>
                                        {industrias.map((i) => (
                                            <option key={i.value} value={i.value}>{i.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Tamaño de empresa</label>
                                    <select
                                        value={formData.tamaño_empresa}
                                        onChange={(e) => setFormData({ ...formData, tamaño_empresa: e.target.value })}
                                    >
                                        <option value="">Seleccionar...</option>
                                        {tamanos.map((t) => (
                                            <option key={t.value} value={t.value}>{t.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Sitio web</label>
                                <input
                                    type="url"
                                    value={formData.sitio_web}
                                    onChange={(e) => setFormData({ ...formData, sitio_web: e.target.value })}
                                    placeholder="https://www.empresa.com"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Notas</label>
                                <textarea
                                    value={formData.notas}
                                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                                    rows={3}
                                    placeholder="Información adicional sobre el cliente..."
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.activo}
                                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                                    id="clienteActivo"
                                />
                                <label htmlFor="clienteActivo" style={{ fontSize: '13px', color: '#e2e8f0', cursor: 'pointer' }}>Cliente activo</label>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className={styles.btnCancel}>
                                    Cancelar
                                </button>
                                <button type="submit" disabled={submitting} className={styles.btnSubmit}>
                                    {submitting ? 'Guardando...' : editingCliente ? '💾 Guardar cambios' : '➕ Crear cliente'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Confirmación de Eliminación */}
            {deletingCliente && (
                <div className={styles.modalOverlay} onClick={() => setDeletingCliente(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', textAlign: 'center' }}>
                        <div style={{ margin: '16px 0', color: '#ef4444', fontSize: '32px' }}>
                            <FaExclamationTriangle />
                        </div>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#ffffff' }}>¿Eliminar cliente?</h2>
                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
                            Esta acción eliminará permanentemente la empresa <strong>"{deletingCliente.nombre_empresa}"</strong>.
                        </p>
                        <div className={styles.modalActions} style={{ justifyContent: 'center' }}>
                            <button type="button" onClick={() => setDeletingCliente(null)} className={styles.btnCancel}>Cancelar</button>
                            <button type="button" onClick={confirmDelete} className={styles.btnSubmit} style={{ backgroundColor: '#ef4444' }}>Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}