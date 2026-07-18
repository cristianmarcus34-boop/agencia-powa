'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaEye, FaBuilding, FaUser, FaEnvelope, FaPhone, FaGlobe, FaIndustry } from 'react-icons/fa';
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

export default function ClientesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
    const [formData, setFormData] = useState({
        nombre_empresa: '',
        nombre_contacto: '',
        email: '',
        telefono: '',
        sitio_web: '',
        industria: '',
        tamaño_empresa: '',
        notas: '',
        activo: true
    });
    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
        if (status === 'loading') return;

        if (status === 'unauthenticated' && !redirected) {
            setRedirected(true);
            router.replace('/login');
            return;
        }

        if (status === 'authenticated' && session?.user?.rol !== 'admin' && !redirected) {
            setRedirected(true);
            router.replace('/cliente');
            return;
        }

        if (status === 'authenticated' && session?.user?.rol === 'admin') {
            fetchData();
        }
    }, [status, session, router, redirected]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredClientes(clientes);
        } else {
            const term = searchTerm.toLowerCase();
            setFilteredClientes(clientes.filter(c =>
                c.nombre_empresa.toLowerCase().includes(term) ||
                c.nombre_contacto.toLowerCase().includes(term) ||
                c.email.toLowerCase().includes(term)
            ));
        }
    }, [searchTerm, clientes]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/clientes');
            const result = await res.json();
            if (result.success) {
                setClientes(result.data);
                setFilteredClientes(result.data);
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
            const url = editingCliente
                ? `/api/admin/clientes/${editingCliente.id}`
                : '/api/admin/clientes';

            const method = editingCliente ? 'PUT' : 'POST';

            const body = {
                nombre_empresa: formData.nombre_empresa,
                nombre_contacto: formData.nombre_contacto,
                email: formData.email,
                telefono: formData.telefono,
                sitio_web: formData.sitio_web,
                industria: formData.industria,
                tamaño_empresa: formData.tamaño_empresa,
                notas: formData.notas,
                activo: formData.activo,
            };

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
                alert(editingCliente ? 'Cliente actualizado' : 'Cliente creado');
            } else {
                alert(result.error || 'Error al guardar cliente');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar cliente');
        }
    };

    const handleDelete = async (cliente: Cliente) => {
        if (!confirm(`¿Estás seguro de eliminar al cliente "${cliente.nombre_empresa}"?`)) return;

        try {
            const res = await fetch(`/api/admin/clientes/${cliente.id}`, {
                method: 'DELETE'
            });
            const result = await res.json();
            if (result.success) {
                fetchData();
                alert('Cliente eliminado');
            } else {
                alert(result.error || 'Error al eliminar cliente');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar cliente');
        }
    };

    const openEditModal = (cliente: Cliente) => {
        setEditingCliente(cliente);
        setFormData({
            nombre_empresa: cliente.nombre_empresa,
            nombre_contacto: cliente.nombre_contacto,
            email: cliente.email,
            telefono: cliente.telefono || '',
            sitio_web: cliente.sitio_web || '',
            industria: cliente.industria || '',
            tamaño_empresa: cliente.tamaño_empresa || '',
            notas: cliente.notas || '',
            activo: cliente.activo,
        });
        setShowModal(true);
    };

    const openCreateModal = () => {
        setEditingCliente(null);
        setFormData({
            nombre_empresa: '',
            nombre_contacto: '',
            email: '',
            telefono: '',
            sitio_web: '',
            industria: '',
            tamaño_empresa: '',
            notas: '',
            activo: true,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingCliente(null);
        setFormData({
            nombre_empresa: '',
            nombre_contacto: '',
            email: '',
            telefono: '',
            sitio_web: '',
            industria: '',
            tamaño_empresa: '',
            notas: '',
            activo: true,
        });
    };

    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando clientes...</p>
            </div>
        );
    }

    if (status === 'unauthenticated' || session?.user?.rol !== 'admin') {
        return null;
    }

    return (
        <div>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>🏢 Clientes</h1>
                    <p style={{ color: '#94a3b8' }}>Gestiona los clientes de la agencia</p>
                </div>
                <button onClick={openCreateModal} className={styles.btnPrimary}>
                    <FaPlus style={{ marginRight: '8px' }} /> Nuevo cliente
                </button>
            </div>

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
                        placeholder="Buscar clientes..."
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
                                    <td style={{ fontWeight: 500 }}>{cliente.nombre_empresa}</td>
                                    <td>{cliente.nombre_contacto}</td>
                                    <td>{cliente.email}</td>
                                    <td>
                                        <span style={{
                                            padding: '2px 10px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            background: 'rgba(59, 130, 246, 0.15)',
                                            color: '#60a5fa'
                                        }}>
                                            {industrias.find(i => i.value === cliente.industria)?.label || cliente.industria || '—'}
                                        </span>
                                    </td>
                                    <td>{cliente.proyectos?.length || 0}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${cliente.activo ? styles.statusActive : styles.statusInactive}`}>
                                            {cliente.activo ? '✅ Activo' : '❌ Inactivo'}
                                        </span>
                                    </td>
                                    <td>
                                        {/* 🔥 BOTONES DE ACCIÓN MEJORADOS */}
                                        <div className={styles.actionButtons}>
                                            <button
                                                onClick={() => openEditModal(cliente)}
                                                className={styles.btnEdit}
                                                title="Editar cliente"
                                            >
                                                <FaEdit /> <span>Editar</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cliente)}
                                                className={styles.btnDelete}
                                                disabled={cliente.proyectos && cliente.proyectos.length > 0}
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
                                    No hay clientes {searchTerm ? 'que coincidan con la búsqueda' : 'registrados'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>{editingCliente ? '✏️ Editar cliente' : '➕ Nuevo cliente'}</h2>
                            <button onClick={() => { setShowModal(false); resetForm(); }} className={styles.modalClose}>
                                ✕
                            </button>
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
                                    Cliente activo
                                </label>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className={styles.btnSecondary}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.btnPrimary}>
                                    {editingCliente ? '💾 Actualizar' : '➕ Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}