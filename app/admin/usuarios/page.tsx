// app/admin/usuarios/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
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
    const [editingUser, setEditingUser] = useState<Usuario | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        nombre_completo: '',
        rol: 'cliente',
        password: '',
        activo: true
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
        fetchUsuarios();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredUsuarios(usuarios);
        } else {
            const term = searchTerm.toLowerCase();
            setFilteredUsuarios(usuarios.filter(u =>
                u.nombre_completo.toLowerCase().includes(term) ||
                u.email.toLowerCase().includes(term)
            ));
        }
    }, [searchTerm, usuarios]);

    const fetchUsuarios = async () => {
        try {
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

        try {
            const url = editingUser
                ? `/api/admin/usuarios/${editingUser.id}`
                : '/api/admin/usuarios';

            const method = editingUser ? 'PUT' : 'POST';

            const body = editingUser
                ? {
                    nombre_completo: formData.nombre_completo,
                    rol: formData.rol,
                    activo: formData.activo,
                    ...(formData.password && { password: formData.password })
                }
                : formData;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const result = await res.json();
            if (result.success) {
                fetchUsuarios();
                setShowModal(false);
                resetForm();
                alert(editingUser ? 'Usuario actualizado' : 'Usuario creado');
            } else {
                alert(result.error || 'Error al guardar usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar usuario');
        }
    };

    const handleDelete = async (usuario: Usuario) => {
        if (!confirm(`¿Estás seguro de eliminar a ${usuario.nombre_completo}?`)) return;

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
        setEditingUser(usuario);
        setFormData({
            email: usuario.email,
            nombre_completo: usuario.nombre_completo,
            rol: usuario.rol,
            password: '',
            activo: usuario.activo
        });
        setShowModal(true);
    };

    const openCreateModal = () => {
        setEditingUser(null);
        setFormData({
            email: '',
            nombre_completo: '',
            rol: 'cliente',
            password: '',
            activo: true
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingUser(null);
        setFormData({
            email: '',
            nombre_completo: '',
            rol: 'cliente',
            password: '',
            activo: true
        });
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
                        placeholder="Buscar por nombre o email..."
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
                            <th>Nombre</th>
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
                                            background: usuario.rol === 'admin'
                                                ? 'rgba(139, 92, 246, 0.15)'
                                                : 'rgba(59, 130, 246, 0.15)',
                                            color: usuario.rol === 'admin' ? '#a78bfa' : '#60a5fa'
                                        }}>
                                            {usuario.rol}
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
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(usuario)}
                                            className={styles.btnDanger}
                                            disabled={usuario.id === session?.user?.id}
                                            title={usuario.id === session?.user?.id ? 'No puedes eliminar tu propio usuario' : ''}
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

            {/* Modal de Crear/Editar */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>{editingUser ? 'Editar usuario' : 'Nuevo usuario'}</h2>
                            <button onClick={() => { setShowModal(false); resetForm(); }} className={styles.modalClose}>
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    disabled={!!editingUser}
                                    placeholder="usuario@email.com"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Nombre completo</label>
                                <input
                                    type="text"
                                    value={formData.nombre_completo}
                                    onChange={(e) => setFormData({ ...formData, nombre_completo: e.target.value })}
                                    required
                                    placeholder="Nombre Apellido"
                                />
                            </div>

                            {!editingUser && (
                                <div className={styles.formGroup}>
                                    <label>Contraseña</label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        placeholder="••••••••"
                                    />
                                </div>
                            )}

                            {editingUser && (
                                <div className={styles.formGroup}>
                                    <label>Nueva contraseña (opcional)</label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Dejar en blanco para no cambiar"
                                    />
                                </div>
                            )}

                            <div className={styles.formGroup}>
                                <label>Rol</label>
                                <select
                                    value={formData.rol}
                                    onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                                    required
                                >
                                    <option value="cliente">Cliente</option>
                                    <option value="admin">Administrador</option>
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
                                    {editingUser ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}