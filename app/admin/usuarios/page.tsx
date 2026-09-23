// app/admin/usuarios/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo } from 'react';
import {
    FaEdit, FaTrash, FaPlus, FaSearch, FaKey, FaExclamationTriangle,
    FaUsers, FaUserShield, FaUserCheck, FaFilter, FaUser
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import styles from '../admin.module.css';

interface Usuario {
    id: string;
    email: string;
    nombre_completo: string;
    rol: string;
    activo: boolean;
    creado_en: string;
}

const initialFormData = {
    email: '',
    nombre_completo: '',
    rol: 'cliente',
    activo: true,
    password: ''
};

export default function UsuariosPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([]);

    // Filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRol, setFilterRol] = useState('todos');
    const [filterEstado, setFilterEstado] = useState('todos');

    // Modales y estados
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
    const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
    const [deletingUsuario, setDeletingUsuario] = useState<Usuario | null>(null);

    // Contraseñas
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login');
        if (session?.user && (session.user as any).rol !== 'admin') router.push('/cliente');
    }, [status, session, router]);

    const fetchUsuarios = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/usuarios');
            const result = await res.json();
            if (result.success) {
                setUsuarios(result.data);
                setFilteredUsuarios(result.data);
            } else {
                toast.error(result.error || 'Error al obtener usuarios');
            }
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            toast.error('Error de conexión al cargar usuarios');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (status === 'authenticated' && (session?.user as any)?.rol === 'admin') {
            fetchUsuarios();
        }
    }, [status, session, fetchUsuarios]);

    // Aplicar Filtros Combinados
    useEffect(() => {
        let result = [...usuarios];

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(u =>
                u.email.toLowerCase().includes(term) ||
                u.nombre_completo.toLowerCase().includes(term)
            );
        }

        if (filterRol !== 'todos') {
            result = result.filter(u => u.rol === filterRol);
        }

        if (filterEstado !== 'todos') {
            const isActivo = filterEstado === 'activo';
            result = result.filter(u => u.activo === isActivo);
        }

        setFilteredUsuarios(result);
    }, [searchTerm, filterRol, filterEstado, usuarios]);

    // Métricas
    const metrics = useMemo(() => {
        const total = usuarios.length;
        const activos = usuarios.filter(u => u.activo).length;
        const admins = usuarios.filter(u => u.rol === 'admin').length;
        const clientes = usuarios.filter(u => u.rol === 'cliente').length;
        return { total, activos, admins, clientes };
    }, [usuarios]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        if (!editingUsuario && (!formData.password || formData.password.length < 6)) {
            toast.error('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        const toastId = toast.loading(editingUsuario ? 'Actualizando usuario...' : 'Creando usuario...');
        setSubmitting(true);

        try {
            const url = editingUsuario
                ? `/api/admin/usuarios/${editingUsuario.id}`
                : '/api/admin/usuarios';

            const method = editingUsuario ? 'PUT' : 'POST';

            const body: any = {
                email: formData.email,
                nombre_completo: formData.nombre_completo,
                rol: formData.rol,
                activo: formData.activo,
            };

            if (!editingUsuario) {
                body.password = formData.password;
            }

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const result = await res.json();
            if (result.success) {
                await fetchUsuarios();
                setShowModal(false);
                resetForm();
                toast.success(editingUsuario ? 'Usuario actualizado con éxito' : 'Usuario creado con éxito', { id: toastId });
            } else {
                toast.error(result.error || 'Error al guardar usuario', { id: toastId });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error de conexión al guardar', { id: toastId });
        } finally {
            setSubmitting(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        const toastId = toast.loading('Cambiando contraseña...');

        try {
            const res = await fetch(`/api/admin/usuarios/${selectedUsuario?.id}/cambiar-password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: newPassword })
            });

            const result = await res.json();
            if (result.success) {
                toast.success('Contraseña actualizada correctamente', { id: toastId });
                setShowPasswordModal(false);
                setNewPassword('');
                setConfirmPassword('');
            } else {
                toast.error(result.error || 'Error al cambiar contraseña', { id: toastId });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al conectar con el servidor', { id: toastId });
        }
    };

    const confirmDelete = async () => {
        if (!deletingUsuario) return;

        const toastId = toast.loading('Eliminando usuario...');
        try {
            const res = await fetch(`/api/admin/usuarios/${deletingUsuario.id}`, { method: 'DELETE' });
            const result = await res.json();

            if (result.success) {
                await fetchUsuarios();
                toast.success('Usuario eliminado correctamente', { id: toastId });
            } else {
                toast.error(result.error || 'Error al eliminar usuario', { id: toastId });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error de conexión al eliminar', { id: toastId });
        } finally {
            setDeletingUsuario(null);
        }
    };

    const openEditModal = (usuario: Usuario) => {
        setEditingUsuario(usuario);
        setFormData({
            email: usuario.email || '',
            nombre_completo: usuario.nombre_completo || '',
            rol: usuario.rol || 'cliente',
            activo: usuario.activo !== undefined ? usuario.activo : true,
            password: ''
        });
        setShowModal(true);
    };

    const openPasswordModal = (usuario: Usuario) => {
        setSelectedUsuario(usuario);
        setNewPassword('');
        setConfirmPassword('');
        setShowPasswordModal(true);
    };

    const openCreateModal = () => {
        setEditingUsuario(null);
        resetForm();
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingUsuario(null);
        setFormData(initialFormData);
    };

    const getRolLabel = (rol: string) => {
        const labels: Record<string, string> = {
            admin: '👑 Admin',
            cliente: '👤 Cliente'
        };
        return labels[rol] || rol;
    };

    const getRolColor = (rol: string) => {
        const colors: Record<string, string> = {
            admin: '#8b5cf6',
            cliente: '#22d3ee'
        };
        return colors[rol] || '#94a3b8';
    };

    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando usuarios del sistema...</p>
            </div>
        );
    }

    const currentUserId = (session?.user as any)?.id;

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>👥 Usuarios y Accesos</h1>
                    <p style={{ color: '#94a3b8' }}>Gestiona las cuentas, roles y permisos del sistema</p>
                </div>
                <button onClick={openCreateModal} className={styles.btnPrimary}>
                    <FaPlus style={{ marginRight: '8px' }} /> Nuevo usuario
                </button>
            </div>

            {/* Métricas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#1a2333', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        <FaUsers />
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Total Cuentas</span>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#ffffff' }}>{metrics.total}</h3>
                    </div>
                </div>

                <div style={{ background: '#1a2333', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        <FaUserCheck />
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Usuarios Activos</span>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#ffffff' }}>{metrics.activos}</h3>
                    </div>
                </div>

                <div style={{ background: '#1a2333', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        <FaUserShield />
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Administradores</span>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#ffffff' }}>{metrics.admins}</h3>
                    </div>
                </div>

                <div style={{ background: '#1a2333', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        <FaUser />
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Clientes</span>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#ffffff' }}>{metrics.clientes}</h3>
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
                        placeholder="Buscar por nombre o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: '#ffffff', width: '100%', outline: 'none', fontSize: '14px' }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a2333', padding: '8px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <FaFilter style={{ color: '#64748b', fontSize: '12px' }} />
                    <select
                        value={filterRol}
                        onChange={(e) => setFilterRol(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '13px', cursor: 'pointer' }}
                    >
                        <option value="todos" style={{ background: '#1a2333' }}>Todos los roles</option>
                        <option value="admin" style={{ background: '#1a2333' }}>Admin</option>
                        <option value="cliente" style={{ background: '#1a2333' }}>Cliente</option>
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
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsuarios.length > 0 ? (
                            filteredUsuarios.map((usuario) => {
                                const isSelf = usuario.id === currentUserId;
                                return (
                                    <tr key={usuario.id}>
                                        <td style={{ fontWeight: 600, color: '#ffffff' }}>
                                            {usuario.nombre_completo} {isSelf && <span style={{ fontSize: '11px', color: '#3b82f6' }}>(Tú)</span>}
                                        </td>
                                        <td>{usuario.email}</td>
                                        <td>
                                            <span style={{
                                                padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
                                                background: `rgba(${usuario.rol === 'admin' ? '139, 92, 246' : '34, 211, 238'}, 0.15)`,
                                                color: getRolColor(usuario.rol)
                                            }}>
                                                {getRolLabel(usuario.rol)}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                                                background: usuario.activo ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                color: usuario.activo ? '#22c55e' : '#ef4444'
                                            }}>
                                                {usuario.activo ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.actionButtons}>
                                                <button
                                                    onClick={() => openEditModal(usuario)}
                                                    className={styles.btnEdit}
                                                    title="Editar usuario"
                                                >
                                                    <FaEdit /> <span>Editar</span>
                                                </button>
                                                <button
                                                    onClick={() => openPasswordModal(usuario)}
                                                    style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}
                                                    title="Cambiar contraseña"
                                                >
                                                    <FaKey />
                                                </button>
                                                <button
                                                    onClick={() => setDeletingUsuario(usuario)}
                                                    className={styles.btnDelete}
                                                    disabled={isSelf}
                                                    title={isSelf ? 'No puedes eliminarte a ti mismo' : 'Eliminar usuario'}
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
                                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                    No hay usuarios {searchTerm || filterRol !== 'todos' || filterEstado !== 'todos' ? 'que coincidan con los filtros' : 'registrados'}.
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
                            <h2>{editingUsuario ? '✏️ Editar Usuario' : '➕ Nuevo Usuario'}</h2>
                            <button onClick={() => { setShowModal(false); resetForm(); }} className={styles.modalClose}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label>Nombre completo *</label>
                                <input
                                    type="text"
                                    value={formData.nombre_completo}
                                    onChange={(e) => setFormData({ ...formData, nombre_completo: e.target.value })}
                                    required
                                    placeholder="Ej: Juan Pérez"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Email *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    placeholder="ejemplo@email.com"
                                />
                            </div>

                            {!editingUsuario && (
                                <div className={styles.formGroup}>
                                    <label>Contraseña *</label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        placeholder="Mínimo 6 caracteres"
                                        minLength={6}
                                    />
                                </div>
                            )}

                            <div className={styles.formGroup}>
                                <label>Rol</label>
                                <select
                                    value={formData.rol}
                                    onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                                >
                                    <option value="cliente">Cliente</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.activo}
                                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                                    id="usuarioActivo"
                                />
                                <label htmlFor="usuarioActivo" style={{ fontSize: '13px', color: '#e2e8f0', cursor: 'pointer' }}>Usuario activo</label>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className={styles.btnCancel}>Cancelar</button>
                                <button type="submit" disabled={submitting} className={styles.btnSubmit}>
                                    {submitting ? 'Guardando...' : editingUsuario ? '💾 Guardar cambios' : '➕ Crear usuario'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Cambiar Contraseña */}
            {showPasswordModal && selectedUsuario && (
                <div className={styles.modalOverlay} onClick={() => setShowPasswordModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
                        <div className={styles.modalHeader}>
                            <h2>🔑 Cambiar Contraseña</h2>
                            <button onClick={() => setShowPasswordModal(false)} className={styles.modalClose}>✕</button>
                        </div>

                        <div style={{ marginBottom: '16px', background: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                            <p style={{ color: '#94a3b8', margin: 0, fontSize: '13px' }}>
                                Cambiando clave para: <strong style={{ color: '#ffffff' }}>{selectedUsuario.nombre_completo}</strong>
                            </p>
                            <p style={{ color: '#64748b', fontSize: '12px', margin: '4px 0 0 0' }}>
                                {selectedUsuario.email}
                            </p>
                        </div>

                        <form onSubmit={handleChangePassword} className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label>Nueva contraseña *</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder="Mínimo 6 caracteres"
                                    minLength={6}
                                    autoFocus
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Confirmar contraseña *</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Repite la contraseña"
                                    minLength={6}
                                />
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setShowPasswordModal(false)} className={styles.btnCancel}>Cancelar</button>
                                <button type="submit" className={styles.btnSubmit}>
                                    <FaKey style={{ marginRight: '6px' }} /> Actualizar clave
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Confirmación Eliminación */}
            {deletingUsuario && (
                <div className={styles.modalOverlay} onClick={() => setDeletingUsuario(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', textAlign: 'center' }}>
                        <div style={{ margin: '16px 0', color: '#ef4444', fontSize: '32px' }}>
                            <FaExclamationTriangle />
                        </div>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#ffffff' }}>¿Eliminar usuario?</h2>
                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
                            Esta acción eliminará permanentemente la cuenta de <strong>"{deletingUsuario.nombre_completo}"</strong>.
                        </p>
                        <div className={styles.modalActions} style={{ justifyContent: 'center' }}>
                            <button type="button" onClick={() => setDeletingUsuario(null)} className={styles.btnCancel}>Cancelar</button>
                            <button type="button" onClick={confirmDelete} className={styles.btnSubmit} style={{ backgroundColor: '#ef4444' }}>Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}