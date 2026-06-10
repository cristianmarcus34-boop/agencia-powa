'use client';
import { useState } from 'react';
import AppShell from './AppShell';

export default function ReservaDemo() {
    const [selected, setSelected] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);
    const horarios = ['09:00', '10:30', '14:00', '16:30'];

    const handleConfirm = () => {
        setConfirmed(true);
        // Opcional: Resetear después de unos segundos
        setTimeout(() => setConfirmed(false), 5000);
    };

    return (
        <AppShell>
            <div style={{
                padding: '30px',
                background: '#ffffff',
                height: '100%',
                fontFamily: 'Inter, system-ui',
                position: 'relative'
            }}>

                {confirmed ? (
                    /* Pantalla de Éxito (Success State) */
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', height: '100%', textAlign: 'center',
                        animation: 'fadeIn 0.5s ease'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>¡Turno Confirmado!</h2>
                        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>Tu cita para las <strong style={{ color: '#f97316' }}>{selected} Hs</strong> ha sido agendada con éxito.</p>
                        <button
                            onClick={() => { setConfirmed(false); setSelected(null); }}
                            style={{ marginTop: '24px', background: '#f1f5f9', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '600' }}
                        >Reservar otro</button>
                    </div>
                ) : (
                    /* Pantalla de Reserva */
                    <div style={{ animation: 'fadeIn 0.5s' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Powa Schedule</h2>
                        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '25px' }}>Selecciona tu bloque horario de consultoría técnica:</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '30px' }}>
                            {horarios.map((h) => (
                                <button
                                    key={h}
                                    onClick={() => setSelected(h)}
                                    style={{
                                        padding: '16px',
                                        borderRadius: '16px',
                                        border: selected === h ? '2px solid #f97316' : '1px solid #e2e8f0',
                                        background: selected === h ? '#fff7ed' : '#ffffff',
                                        color: selected === h ? '#f97316' : '#1e293b',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {h} Hs
                                </button>
                            ))}
                        </div>

                        <div style={{ background: '#0f172a', padding: '24px', borderRadius: '24px', color: 'white' }}>
                            <p style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px', textTransform: 'uppercase' }}>Tu selección</p>
                            <div style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>
                                {selected ? `${selected} Hs` : 'Ningún turno'}
                            </div>
                            <button
                                disabled={!selected}
                                onClick={handleConfirm}
                                style={{
                                    width: '100%', padding: '16px', borderRadius: '16px',
                                    border: 'none', background: selected ? '#f97316' : '#334155',
                                    color: 'white', fontWeight: '800', cursor: selected ? 'pointer' : 'not-allowed',
                                    transition: 'background 0.3s'
                                }}
                            >
                                Confirmar Turno
                            </button>
                        </div>
                    </div>
                )}

                {/* Estilos para animaciones */}
                <style jsx>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        </AppShell>
    );
}