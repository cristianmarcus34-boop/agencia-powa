// app/admin/conversaciones/[id]/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaUser, FaRobot, FaClock } from 'react-icons/fa';
import styles from '../../admin.module.css';

interface Mensaje {
    id: string;
    rol: string;
    contenido: string;
    creado_en: string;
}

interface Conversacion {
    id: string;
    perfil: string;
    estado: string;
    origen: string;
    creado_en: string;
    cliente?: {
        nombre_empresa: string;
        nombre_contacto: string;
    };
}

// 🔥 RECIBIR params COMO Promise
export default function ConversacionDetallePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [conversacion, setConversacion] = useState<Conversacion | null>(null);
    const [mensajes, setMensajes] = useState<Mensaje[]>([]);
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
        // 🔥 OBTENER EL ID DESDE LA PROMESA
        const fetchData = async () => {
            try {
                const { id } = await params; // ← AWAIT PARA OBTENER EL ID
                console.log('📋 ID de conversación:', id);

                if (!id || id === 'undefined') {
                    console.error('❌ ID inválido');
                    router.push('/admin/conversaciones');
                    return;
                }

                await fetchConversacion(id);
            } catch (error) {
                console.error('❌ Error obteniendo params:', error);
                router.push('/admin/conversaciones');
            }
        };

        fetchData();
    }, [params, router]);

    const fetchConversacion = async (id: string) => {
        try {
            setLoading(true);

            // Obtener la conversación
            const resConv = await fetch(`/api/admin/conversaciones/${id}`);
            const resultConv = await resConv.json();
            if (resultConv.success) {
                setConversacion(resultConv.data);
            } else {
                console.error('❌ Error cargando conversación:', resultConv.error);
                router.push('/admin/conversaciones');
                return;
            }

            // Obtener los mensajes
            const resMsg = await fetch(`/api/admin/conversaciones/${id}/mensajes`);
            const resultMsg = await resMsg.json();
            if (resultMsg.success) {
                setMensajes(resultMsg.data);
            } else {
                console.error('❌ Error cargando mensajes:', resultMsg.error);
            }
        } catch (error) {
            console.error('❌ Error:', error);
            router.push('/admin/conversaciones');
        } finally {
            setLoading(false);
        }
    };

    const getPerfilLabel = (perfil: string) => {
        const perfiles: Record<string, string> = {
            gastronomia: '🍔 Gastronomía',
            empresa_emprendedor: '📈 Empresa/Emprendedor',
            senior_software: '⚙️ Software Senior',
        };
        return perfiles[perfil] || perfil;
    };

    if (status === 'loading' || loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando conversación...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Botón volver */}
            <button
                onClick={() => router.back()}
                className={styles.btnSecondary}
                style={{ marginBottom: '20px' }}
            >
                <FaArrowLeft style={{ marginRight: '8px' }} /> Volver
            </button>

            {/* Información de la conversación */}
            <div style={{
                background: '#1a2333',
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                marginBottom: '24px'
            }}>
                <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                    💬 Conversación
                </h1>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', color: '#94a3b8' }}>
                    <span><strong>Perfil:</strong> {conversacion ? getPerfilLabel(conversacion.perfil) : '—'}</span>
                    <span><strong>Cliente:</strong> {conversacion?.cliente?.nombre_empresa || 'Sin cliente'}</span>
                    <span><strong>Estado:</strong> {conversacion?.estado || '—'}</span>
                    <span><strong>Origen:</strong> {conversacion?.origen || 'web'}</span>
                    <span><strong>Fecha:</strong> {conversacion ? new Date(conversacion.creado_en).toLocaleString() : '—'}</span>
                </div>
            </div>

            {/* Mensajes */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <span className={styles.tableTitle}>📝 Mensajes</span>
                </div>
                <div style={{ padding: '16px', maxHeight: '500px', overflowY: 'auto' }}>
                    {mensajes.length > 0 ? (
                        mensajes.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    display: 'flex',
                                    gap: '12px',
                                    padding: '12px 16px',
                                    marginBottom: '8px',
                                    borderRadius: '10px',
                                    background: msg.rol === 'usuario'
                                        ? 'rgba(59, 130, 246, 0.08)'
                                        : 'rgba(34, 211, 238, 0.05)',
                                    border: msg.rol === 'usuario'
                                        ? '1px solid rgba(59, 130, 246, 0.15)'
                                        : '1px solid rgba(34, 211, 238, 0.08)',
                                }}
                            >
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: msg.rol === 'usuario'
                                        ? 'rgba(59, 130, 246, 0.2)'
                                        : 'rgba(34, 211, 238, 0.2)',
                                    flexShrink: 0
                                }}>
                                    {msg.rol === 'usuario' ? <FaUser /> : <FaRobot />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '4px'
                                    }}>
                                        <span style={{
                                            fontWeight: 600,
                                            color: msg.rol === 'usuario' ? '#60a5fa' : '#22d3ee',
                                            fontSize: '14px'
                                        }}>
                                            {msg.rol === 'usuario' ? 'Usuario' : 'Asistente'}
                                        </span>
                                        <span style={{
                                            fontSize: '11px',
                                            color: '#64748b',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            <FaClock size={10} />
                                            {new Date(msg.creado_en).toLocaleString()}
                                        </span>
                                    </div>
                                    <div style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                                        {msg.contenido}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
                            No hay mensajes en esta conversación
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}