'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaEye, FaFileInvoice, FaDownload } from 'react-icons/fa';
import styles from '../admin.module.css';

interface Factura {
    id: string;
    cliente_id: string;
    numero_factura: string;
    fecha_emision: string;
    fecha_vencimiento: string;
    subtotal: number;
    tasa_impuesto: number;
    monto_impuesto: number;
    total: number;
    estado: string;
    fecha_pago: string | null;
    notas: string | null;
    creado_en: string;
    actualizado_en: string;
    clientes?: {
        id: string;
        nombre_empresa: string;
        nombre_contacto: string;
        email: string;
    };
}

const estados = [
    { value: 'pendiente', label: '⏳ Pendiente', color: '#f59e0b' },
    { value: 'pagada', label: '✅ Pagada', color: '#10b981' },
    { value: 'vencida', label: '❌ Vencida', color: '#ef4444' },
    { value: 'cancelada', label: '🚫 Cancelada', color: '#6b7280' },
];

export default function FacturasPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [facturas, setFacturas] = useState<Factura[]>([]);
    const [filteredFacturas, setFilteredFacturas] = useState<Factura[]>([]);
    const [clientes, setClientes] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingFactura, setEditingFactura] = useState<Factura | null>(null);
    const [formData, setFormData] = useState({
        cliente_id: '',
        numero_factura: '',
        fecha_emision: '',
        fecha_vencimiento: '',
        subtotal: '',
        tasa_impuesto: '21',
        monto_impuesto: '',
        total: '',
        estado: 'pendiente',
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
            setFilteredFacturas(facturas);
        } else {
            const term = searchTerm.toLowerCase();
            setFilteredFacturas(facturas.filter(f =>
                f.numero_factura.toLowerCase().includes(term) ||
                f.clientes?.nombre_empresa?.toLowerCase().includes(term) ||
                f.estado.toLowerCase().includes(term)
            ));
        }
    }, [searchTerm, facturas]);

    const fetchData = async () => {
        try {
            const resFacturas = await fetch('/api/admin/facturas');
            const resultFacturas = await resFacturas.json();
            if (resultFacturas.success) {
                setFacturas(resultFacturas.data);
                setFilteredFacturas(resultFacturas.data);
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

    const calcularTotales = (subtotal: number, tasa: number) => {
        const montoImpuesto = subtotal * (tasa / 100);
        const total = subtotal + montoImpuesto;
        return { montoImpuesto, total };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const subtotal = parseFloat(formData.subtotal) || 0;
            const tasa = parseFloat(formData.tasa_impuesto) || 0;
            const { montoImpuesto, total } = calcularTotales(subtotal, tasa);

            const url = editingFactura
                ? `/api/admin/facturas/${editingFactura.id}`
                : '/api/admin/facturas';

            const method = editingFactura ? 'PUT' : 'POST';

            const body = {
                cliente_id: formData.cliente_id,
                numero_factura: formData.numero_factura,
                fecha_emision: formData.fecha_emision,
                fecha_vencimiento: formData.fecha_vencimiento,
                subtotal: subtotal,
                tasa_impuesto: tasa,
                monto_impuesto: montoImpuesto,
                total: total,
                estado: formData.estado,
                notas: formData.notas || null
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
                alert(editingFactura ? '✅ Factura actualizada' : '✅ Factura creada');
            } else {
                alert(result.error || '❌ Error al guardar factura');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Error al guardar factura');
        }
    };

    const handleDelete = async (factura: Factura) => {
        if (!confirm(`¿Estás seguro de eliminar la factura "${factura.numero_factura}"?`)) return;

        try {
            const res = await fetch(`/api/admin/facturas/${factura.id}`, {
                method: 'DELETE'
            });
            const result = await res.json();
            if (result.success) {
                fetchData();
                alert('✅ Factura eliminada');
            } else {
                alert(result.error || '❌ Error al eliminar factura');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Error al eliminar factura');
        }
    };

    const openEditModal = (factura: Factura) => {
        setEditingFactura(factura);
        setFormData({
            cliente_id: factura.cliente_id,
            numero_factura: factura.numero_factura,
            fecha_emision: factura.fecha_emision || '',
            fecha_vencimiento: factura.fecha_vencimiento || '',
            subtotal: factura.subtotal?.toString() || '',
            tasa_impuesto: factura.tasa_impuesto?.toString() || '21',
            monto_impuesto: factura.monto_impuesto?.toString() || '',
            total: factura.total?.toString() || '',
            estado: factura.estado || 'pendiente',
            notas: factura.notas || ''
        });
        setShowModal(true);
    };

    const openCreateModal = () => {
        setEditingFactura(null);
        const now = new Date();
        const año = now.getFullYear();
        const mes = String(now.getMonth() + 1).padStart(2, '0');
        const numero = String(facturas.length + 1).padStart(4, '0');
        const numeroFactura = `FAC-${año}${mes}-${numero}`;

        setFormData({
            cliente_id: '',
            numero_factura: numeroFactura,
            fecha_emision: now.toISOString().split('T')[0],
            fecha_vencimiento: '',
            subtotal: '',
            tasa_impuesto: '21',
            monto_impuesto: '',
            total: '',
            estado: 'pendiente',
            notas: ''
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingFactura(null);
        setFormData({
            cliente_id: '',
            numero_factura: '',
            fecha_emision: '',
            fecha_vencimiento: '',
            subtotal: '',
            tasa_impuesto: '21',
            monto_impuesto: '',
            total: '',
            estado: 'pendiente',
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

    useEffect(() => {
        const subtotal = parseFloat(formData.subtotal) || 0;
        const tasa = parseFloat(formData.tasa_impuesto) || 0;
        const { montoImpuesto, total } = calcularTotales(subtotal, tasa);
        setFormData(prev => ({
            ...prev,
            monto_impuesto: montoImpuesto.toFixed(2),
            total: total.toFixed(2)
        }));
    }, [formData.subtotal, formData.tasa_impuesto]);

    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando facturas...</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>🧾 Facturas</h1>
                    <p style={{ color: '#94a3b8' }}>Gestiona las facturas de la agencia</p>
                </div>
                <button onClick={openCreateModal} className={styles.btnPrimary}>
                    <FaPlus style={{ marginRight: '8px' }} /> Nueva factura
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
                        placeholder="Buscar facturas..."
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
                            <th>N° Factura</th>
                            <th>Cliente</th>
                            <th>Fecha Emisión</th>
                            <th>Fecha Vencimiento</th>
                            <th>Subtotal</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFacturas.length > 0 ? (
                            filteredFacturas.map((factura) => {
                                const estadoInfo = getEstadoBadge(factura.estado);
                                return (
                                    <tr key={factura.id}>
                                        <td style={{ fontWeight: 500 }}>{factura.numero_factura}</td>
                                        <td>{factura.clientes?.nombre_empresa || 'Sin cliente'}</td>
                                        <td>{factura.fecha_emision ? new Date(factura.fecha_emision).toLocaleDateString() : '—'}</td>
                                        <td>{factura.fecha_vencimiento ? new Date(factura.fecha_vencimiento).toLocaleDateString() : '—'}</td>
                                        <td>${factura.subtotal?.toLocaleString() || '0'}</td>
                                        <td><strong>${factura.total?.toLocaleString() || '0'}</strong></td>
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
                                        <td>
                                            {/* 🔥 BOTONES DE ACCIÓN MEJORADOS */}
                                            <div className={styles.actionButtons}>
                                                <button
                                                    onClick={() => openEditModal(factura)}
                                                    className={styles.btnEdit}
                                                    title="Editar factura"
                                                >
                                                    <FaEdit /> <span>Editar</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(factura)}
                                                    className={styles.btnDelete}
                                                    title="Eliminar factura"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                    No hay facturas {searchTerm ? 'que coincidan con la búsqueda' : 'registradas'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal con estilos premium */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>
                                <span className={styles.modalIcon}>
                                    {editingFactura ? '✏️' : '🧾'}
                                </span>
                                {editingFactura ? 'Editar factura' : 'Nueva factura'}
                            </h2>
                            <button onClick={() => { setShowModal(false); resetForm(); }} className={styles.modalClose}>
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label>Cliente <span className={styles.required}>*</span></label>
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
                                <label>N° Factura <span className={styles.required}>*</span></label>
                                <input
                                    type="text"
                                    value={formData.numero_factura}
                                    onChange={(e) => setFormData({ ...formData, numero_factura: e.target.value })}
                                    required
                                    placeholder="Ej: FAC-2024-001"
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Fecha Emisión</label>
                                    <input
                                        type="date"
                                        value={formData.fecha_emision}
                                        onChange={(e) => setFormData({ ...formData, fecha_emision: e.target.value })}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Fecha Vencimiento</label>
                                    <input
                                        type="date"
                                        value={formData.fecha_vencimiento}
                                        onChange={(e) => setFormData({ ...formData, fecha_vencimiento: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Subtotal ($) <span className={styles.required}>*</span></label>
                                    <input
                                        type="number"
                                        value={formData.subtotal}
                                        onChange={(e) => setFormData({ ...formData, subtotal: e.target.value })}
                                        placeholder="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Tasa Impuesto (%)</label>
                                    <input
                                        type="number"
                                        value={formData.tasa_impuesto}
                                        onChange={(e) => setFormData({ ...formData, tasa_impuesto: e.target.value })}
                                        placeholder="21"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Monto Impuesto ($)</label>
                                    <input
                                        type="number"
                                        value={formData.monto_impuesto}
                                        disabled
                                        style={{ opacity: 0.7, cursor: 'not-allowed' }}
                                    />
                                    <small style={{ color: '#64748b' }}>Calculado automáticamente</small>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Total ($)</label>
                                    <input
                                        type="number"
                                        value={formData.total}
                                        disabled
                                        style={{ opacity: 0.7, cursor: 'not-allowed' }}
                                    />
                                    <small style={{ color: '#64748b' }}>Calculado automáticamente</small>
                                </div>
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
                                <label>Notas</label>
                                <textarea
                                    value={formData.notas}
                                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                                    rows={2}
                                    placeholder="Notas sobre la factura..."
                                />
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className={styles.btnCancel}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.btnSubmit}>
                                    {editingFactura ? '💾 Actualizar' : '➕ Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}