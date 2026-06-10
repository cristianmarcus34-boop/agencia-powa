'use client';
import { useState } from 'react';
import AppShell from './AppShell';

export default function GimnasioDemo() {
    const [activeTab, setActiveTab] = useState('Resumen');
    const [animating, setAnimating] = useState(false);
    const [water, setWater] = useState(4);

    const handleAction = () => {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 800);
    };

    // Contenido dinámico según la pestaña
    const renderContent = () => {
        switch (activeTab) {
            case 'Rutina':
                return (
                    <div style={{ animation: 'fadeIn 0.4s' }}>
                        <h3 style={{ fontSize: '14px', marginBottom: '15px' }}>Tu rutina de hoy</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {['Calentamiento (10min)', 'Cardio Intensivo (20min)', 'Estiramiento (5min)'].map((ex, i) => (
                                <div key={i} style={{ padding: '12px', background: '#f1f5f9', borderRadius: '12px', fontSize: '13px', fontWeight: '500' }}>
                                    ✅ {ex}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Nutrición':
                return (
                    <div style={{ animation: 'fadeIn 0.4s' }}>
                        <h3 style={{ fontSize: '14px', marginBottom: '15px' }}>Hidratación</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '24px', fontWeight: '800' }}>{water} / 8 vasos</span>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button onClick={() => setWater(Math.max(0, water - 1))} style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', background: '#e2e8f0' }}>-</button>
                                <button onClick={() => setWater(water + 1)} style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', background: '#f97316', color: 'white' }}>+</button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div style={{ animation: 'fadeIn 0.4s' }}>
                        <h3 style={{ fontSize: '14px', marginBottom: '15px' }}>Tu siguiente reto</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ background: '#fff7ed', padding: '15px', borderRadius: '16px', color: '#f97316' }}>🔥</div>
                            <div>
                                <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>Aerobics Pro</p>
                                <p style={{ fontSize: '12px', color: '#94a3b8' }}>45 minutos • Intensidad alta</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <AppShell>
            <div style={{ padding: '20px', background: '#f8fafc', height: '100%', fontFamily: 'system-ui' }}>

                {/* Header Minimalista */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Powa Fitness</h2>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#cbd5e1' }} />
                </div>

                {/* Tarjeta de Progreso (Glassmorphism) */}
                <div style={{
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    padding: '24px',
                    borderRadius: '28px',
                    color: 'white',
                    marginBottom: '20px',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)'
                }}>
                    <p style={{ fontSize: '10px', opacity: 0.6, marginBottom: '5px', letterSpacing: '1px' }}>CALORÍAS QUEMADAS</p>
                    <h1 style={{ fontSize: '42px', fontWeight: '800', margin: 0 }}>480 <span style={{ fontSize: '16px', opacity: 0.5 }}>kcal</span></h1>
                    <div style={{ height: '6px', background: '#334155', borderRadius: '3px', marginTop: '20px' }}>
                        <div style={{ height: '100%', background: '#f97316', width: '65%', borderRadius: '3px', transition: 'width 1s ease-in-out' }} />
                    </div>
                </div>

                {/* Tabs de Navegación */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    {['Resumen', 'Rutina', 'Nutrición'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                background: activeTab === tab ? '#f97316' : 'white',
                                color: activeTab === tab ? 'white' : '#64748b',
                                border: '1px solid #e2e8f0',
                                padding: '10px 18px',
                                borderRadius: '14px',
                                fontSize: '12px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: '0.2s'
                            }}
                        >{tab}</button>
                    ))}
                </div>

                {/* Contenido Dinámico con Transición */}
                <div style={{
                    background: 'white',
                    borderRadius: '28px',
                    padding: '24px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    transform: animating ? 'scale(0.98)' : 'scale(1)',
                    transition: '0.3s',
                    minHeight: '180px'
                }}>
                    {renderContent()}

                    <button
                        onClick={handleAction}
                        style={{
                            width: '100%',
                            marginTop: '25px',
                            padding: '14px',
                            borderRadius: '14px',
                            border: 'none',
                            background: '#0f172a',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        {activeTab === 'Nutrición' ? 'Guardar Avance' : 'Iniciar Sesión'}
                    </button>
                </div>

                {/* Estilos para animación de entrada */}
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