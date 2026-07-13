// app/admin/conversaciones/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSearch, FaEye, FaTrash, FaComments, FaUser, FaUserTie, FaUserSecret } from 'react-icons/fa';
import styles from '../admin.module.css';

interface Usuario {
    id: string;
    email: string;
    nombre_completo: string;
    rol: string;
}

interface Conversacion {
    id: string;
    perfil: string;
    estado: string;
    origen: string;
    cliente_id: string | null;
    usuario_id: string | null;
    es_admin: boolean;
    creado_en: string;
    actualizado_en: string;
    usuario?: Usuario | null;
}

export default function ConversacionesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [conversaciones, setConversaciones] = useState<Conversacion[]>([]);
    const [filteredConversaciones, setFilteredConversaciones] = useState<Conversacion[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
        if (session?.user?.rol !== 'admin') {
            router.push('/cliente');
        }
    }, [status, session, router]);

    useEffect(() => {
        fetchConversaciones();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredConversaciones(conversaciones);
        } else {
            const term = searchTerm.toLowerCase();
            setFilteredConversaciones(conversaciones.filter(c =>
                c.perfil.toLowerCase().includes(term) ||
                c.estado.toLowerCase().includes(term) ||
                c.origen?.toLowerCase().includes(term) ||
                (c.usuario?.nombre_completo?.toLowerCase().includes(term)) ||
                (c.usuario?.email?.toLowerCase().includes(term))
            ));
        }
    }, [searchTerm, conversaciones]);

    const fetchConversaciones = async () => {
        try {
            console.log('📥 Fetching conversaciones...');
            const res = await fetch('/api/admin/conversaciones');
            const result = await res.json();
            console.log('📥 Resultado:', result);

            if (result.success) {
                setConversaciones(result.data);
                setFilteredConversaciones(result.data);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getEstadoBadge = (estado: string) => {
        const estados: Record<string, { label: string; color: string }> = {
            activo: { label: '🟢 Activo', color: '#10b981' },
            cerrado: { label: '🔴 Cerrado', color: '#ef4444' },
            archivado: { label: '🟡 Archivado', color: '#f59e0b' },
        };
        return estados[estado] || { label: estado, color: '#94a3b8' };
    };

    const getPerfilLabel = (perfil: string) => {
        const perfiles: Record<string, string> = {
            gastronomia: '🍔 Gastronomía',
            empresa_emprendedor: '📈 Empresa/Emprendedor',
            senior_software: '⚙️ Software Senior',
        };
        return perfiles[perfil] || perfil;
    };

    // 🔥 Función para obtener el label del usuario
    const getUsuarioLabel = (conversacion: Conversacion) => {
        // Si no tiene usuario asociado
        if (!conversacion.usuario_id && !conversacion.usuario) {
            return {
                label: '👤 Anónimo',
                color: '#94a3b8',
                icon: <FaUserSecret style={{ fontSize: '12px' }} />
            };
        }

        // Si es admin
        if (conversacion.es_admin || conversacion.usuario?.rol === 'admin') {
            return {
                label: `🛡️ ${conversacion.usuario?.nombre_completo || 'Admin'}`,
                color: '#8b5cf6',
                icon: <FaUserTie style={{ fontSize: '12px' }} />
            };
        }

        // Si es cliente
        return {
            label: `👤 ${conversacion.usuario?.nombre_completo || 'Cliente'}`,
            color: '#3b82f6',
            icon: <FaUser style={{ fontSize: '12px' }} />
        };
    };

    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando conversaciones...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>💬 Conversaciones</h1>
                <p style={{ color: '#94a3b8' }}>Gestiona las conversaciones del chat</p>
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
                        placeholder="Buscar conversaciones..."
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
                            <th>Perfil</th>
                            <th>Usuario</th>
                            <th>Estado</th>
                            <th>Origen</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredConversaciones.length > 0 ? (
                            filteredConversaciones.map((conv) => {
                                const estadoInfo = getEstadoBadge(conv.estado);
                                const usuarioInfo = getUsuarioLabel(conv);
                                return (
                                    <tr key={conv.id}>
                                        <td>
                                            <span style={{
                                                padding: '2px 10px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                background: 'rgba(59, 130, 246, 0.15)',
                                                color: '#60a5fa'
                                            }}>
                                                {getPerfilLabel(conv.perfil)}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                color: usuarioInfo.color
                                            }}>
                                                {usuarioInfo.icon}
                                                {usuarioInfo.label}
                                            </span>
                                        </td>
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
                                            <span style={{
                                                padding: '2px 10px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                background: 'rgba(139, 92, 246, 0.15)',
                                                color: '#a78bfa'
                                            }}>
                                                {conv.origen || 'web'}
                                            </span>
                                        </td>
                                        <td>{new Date(conv.creado_en).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                className={styles.btnEdit}
                                                title="Ver conversación"
                                                onClick={() => router.push(`/admin/conversaciones/${conv.id}`)}
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                className={styles.btnDanger}
                                                onClick={() => {
                                                    if (confirm('¿Estás seguro de archivar esta conversación?')) {
                                                        alert('Función en desarrollo');
                                                    }
                                                }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                    <FaComments style={{ fontSize: '40px', marginBottom: '12px', display: 'block', margin: '0 auto 12px' }} />
                                    No hay conversaciones {searchTerm ? 'que coincidan con la búsqueda' : 'registradas'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}