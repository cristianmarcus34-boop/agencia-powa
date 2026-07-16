'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaKey, FaUser, FaEnvelope, FaUserTag } from 'react-icons/fa';
import styles from '../admin.module.css';

interface Usuario {
    id: string;
    email: string;
    nombre_completo: string;
    rol: string;
    activo: boolean;
    creado_en: string;
}

export default function UsuariosPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
    const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        nombre_completo: '',
        rol: 'cliente',
        activo: true,
        password: ''
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
        if (status === 'authenticated' && session?.user?.rol === 'admin') {
            fetchUsuarios();
        }
    }, [status, session]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredUsuarios(usuarios);
        } else {
            const term = searchTerm.toLowerCase();
            setFilteredUsuarios(usuarios.filter(u =>
                u.email.toLowerCase().includes(term) ||
                u.nombre_completo.toLowerCase().includes(term)
            ));
        }
    }, [searchTerm, usuarios]);

    const fetchUsuarios = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/usuarios');
            const result = await res.json();
            if (result.success) {
                setUsuarios(result.data);
                setFilteredUsuarios(result.data);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');

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

            // Solo enviar password si es nuevo usuario
            if (!editingUsuario) {
                if (!formData.password || formData.password.length < 6) {
                    setFormError('La contraseña debe tener al menos 6 caracteres');
                    return;
                }
                body.password = formData.password;
            }

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const result = await res.json();
            if (result.success) {
                setFormSuccess(editingUsuario ? '✅ Usuario actualizado correctamente' : '✅ Usuario creado correctamente');
                fetchUsuarios();

                setTimeout(() => {
                    setShowModal(false);
                    resetForm();
                    setFormSuccess('');
                }, 1500);
            } else {
                setFormError(result.error || 'Error al guardar usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            setFormError('Error al guardar usuario');
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (newPassword.length < 6) {
            setPasswordError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            return;
        }

        try {
            const res = await fetch(`/api/admin/usuarios/${selectedUsuario?.id}/cambiar-password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: newPassword })
            });

            const result = await res.json();
            if (result.success) {
                setPasswordSuccess('✅ Contraseña actualizada correctamente');
                setTimeout(() => {
                    setShowPasswordModal(false);
                    setNewPassword('');
                    setConfirmPassword('');
                    setPasswordSuccess('');
                }, 2000);
            } else {
                setPasswordError(result.error || 'Error al cambiar contraseña');
            }
        } catch (error) {
            console.error('Error:', error);
            setPasswordError('Error al cambiar contraseña');
        }
    };

    const handleDelete = async (usuario: Usuario) => {
        if (!confirm(`¿Estás seguro de eliminar al usuario "${usuario.nombre_completo}"?`)) return;

        try {
            const res = await fetch(`/api/admin/usuarios/${usuario.id}`, {
                method: 'DELETE'
            });
            const result = await res.json();
            if (result.success) {
                fetchUsuarios();
                alert('Usuario eliminado');
            } else {
                alert(result.error || 'Error al eliminar usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar usuario');
        }
    };

    const openEditModal = (usuario: Usuario) => {
        setEditingUsuario(usuario);
        setFormData({
            email: usuario.email,
            nombre_completo: usuario.nombre_completo,
            rol: usuario.rol,
            activo: usuario.activo,
            password: ''
        });
        setFormError('');
        setFormSuccess('');
        setShowModal(true);
    };

    const openPasswordModal = (usuario: Usuario) => {
        setSelectedUsuario(usuario);
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
        setPasswordSuccess('');
        setShowPasswordModal(true);
    };

    const openCreateModal = () => {
        setEditingUsuario(null);
        setFormData({
            email: '',
            nombre_completo: '',
            rol: 'cliente',
            activo: true,
            password: ''
        });
        setFormError('');
        setFormSuccess('');
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingUsuario(null);
        setFormData({
            email: '',
            nombre_completo: '',
            rol: 'cliente',
            activo: true,
            password: ''
        });
        setFormError('');
        setFormSuccess('');
    };

    const getRolLabel = (rol: string) => {
        const labels = {
            admin: '👑 Admin',
            cliente: '👤 Cliente'
        };
        return labels[rol as keyof typeof labels] || rol;
    };

    const getRolColor = (rol: string) => {
        const colors = {
            admin: '#8b5cf6',
            cliente: '#22d3ee'
        };
        return colors[rol as keyof typeof colors] || '#94a3b8';
    };

    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando usuarios...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>👥 Usuarios</h1>
                    <p style={{ color: '#94a3b8' }}>Gestiona los usuarios del sistema</p>
                </div>
                <button onClick={openCreateModal} className={styles.btnPrimary}>
                    <FaPlus style={{ marginRight: '8px' }} /> Nuevo usuario
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
                        placeholder="Buscar usuarios..."
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
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsuarios.length > 0 ? (
                            filteredUsuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td style={{ fontWeight: 500 }}>{usuario.nombre_completo}</td>
                                    <td>{usuario.email}</td>
                                    <td>
                                        <span style={{
                                            padding: '2px 12px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            background: `rgba(${usuario.rol === 'admin' ? '139, 92, 246' : '34, 211, 238'}, 0.15)`,
                                            color: getRolColor(usuario.rol)
                                        }}>
                                            {getRolLabel(usuario.rol)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${usuario.activo ? styles.statusActive : styles.statusInactive}`}>
                                            {usuario.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => openEditModal(usuario)}
                                            className={styles.btnEdit}
                                            title="Editar usuario"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => openPasswordModal(usuario)}
                                            className={styles.btnPassword}
                                            title="Cambiar contraseña"
                                        >
                                            <FaKey />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(usuario)}
                                            className={styles.btnDanger}
                                            disabled={usuario.id === session?.user?.id}
                                            title={usuario.id === session?.user?.id ? 'No puedes eliminarte a ti mismo' : ''}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                    No hay usuarios {searchTerm ? 'que coincidan con la búsqueda' : 'registrados'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de Crear/Editar Usuario */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>{editingUsuario ? 'Editar usuario' : 'Nuevo usuario'}</h2>
                            <button onClick={() => { setShowModal(false); resetForm(); }} className={styles.modalClose}>
                                ✕
                            </button>
                        </div>

                        {formError && (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                color: '#ef4444',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                marginBottom: '16px',
                                border: '1px solid rgba(239, 68, 68, 0.2)'
                            }}>
                                {formError}
                            </div>
                        )}

                        {formSuccess && (
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.15)',
                                color: '#22c55e',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                marginBottom: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                {formSuccess}
                            </div>
                        )}

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
                                    <small style={{ color: '#94a3b8', fontSize: '12px' }}>
                                        La contraseña debe tener al menos 6 caracteres
                                    </small>
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

                            <div className={styles.formGroup}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.activo}
                                        onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                    Usuario activo
                                </label>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className={styles.btnSecondary}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.btnPrimary}>
                                    {editingUsuario ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal para cambiar contraseña */}
            {showPasswordModal && selectedUsuario && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>🔑 Cambiar contraseña</h2>
                            <button onClick={() => { setShowPasswordModal(false); setPasswordError(''); setPasswordSuccess(''); }} className={styles.modalClose}>
                                ✕
                            </button>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <p style={{ color: '#94a3b8' }}>
                                Cambiando contraseña para: <strong style={{ color: '#ffffff' }}>{selectedUsuario.nombre_completo}</strong>
                            </p>
                            <p style={{ color: '#64748b', fontSize: '14px' }}>
                                Email: {selectedUsuario.email}
                            </p>
                        </div>

                        {passwordSuccess && (
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.15)',
                                color: '#22c55e',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                marginBottom: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                {passwordSuccess}
                            </div>
                        )}

                        {passwordError && (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                color: '#ef4444',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                marginBottom: '16px',
                                border: '1px solid rgba(239, 68, 68, 0.2)'
                            }}>
                                {passwordError}
                            </div>
                        )}

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

                            <div style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                marginBottom: '16px',
                                fontSize: '13px',
                                color: '#94a3b8'
                            }}>
                                💡 La contraseña debe tener al menos 6 caracteres.
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                                <button type="button" onClick={() => { setShowPasswordModal(false); setPasswordError(''); setPasswordSuccess(''); }} className={styles.btnSecondary}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.btnPrimary}>
                                    <FaKey style={{ marginRight: '8px' }} /> Cambiar contraseña
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}