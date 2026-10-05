'use client';

import { useState } from 'react';
import AppShell from './AppShell';

const ROUTINE = [
    { id: 'warmup', name: 'Calentamiento', detail: 'Movilidad · 8 min' },
    { id: 'squats', name: 'Sentadillas', detail: '3 series · 12 repeticiones' },
    { id: 'pushups', name: 'Flexiones', detail: '3 series · 10 repeticiones' },
    { id: 'stretch', name: 'Estiramiento', detail: 'Vuelta a la calma · 5 min' },
];

const MEALS = [
    { time: 'DESAYUNO', name: 'Yogur con frutas', detail: 'Yogur, banana y avena', icon: '🥣' },
    { time: 'ALMUERZO', name: 'Bowl de vegetales', detail: 'Quinoa, vegetales y legumbres', icon: '🥗' },
    { time: 'MERIENDA', name: 'Fruta de estación', detail: 'Una opción simple para tu día', icon: '🍎' },
];

const WEEK_ACTIVITY = [
    { day: 'L', value: 42 },
    { day: 'M', value: 68 },
    { day: 'X', value: 53 },
    { day: 'J', value: 86 },
    { day: 'V', value: 60 },
    { day: 'S', value: 35 },
    { day: 'D', value: 72 },
];

type FitnessTab = 'Resumen' | 'Rutina' | 'Nutrición';

export default function GimnasioDemo() {
    const [activeTab, setActiveTab] = useState<FitnessTab>('Resumen');
    const [completedExercises, setCompletedExercises] = useState<string[]>(['warmup']);
    const [water, setWater] = useState(4);

    const completion = Math.round((completedExercises.length / ROUTINE.length) * 100);

    const toggleExercise = (exerciseId: string) => {
        setCompletedExercises((current) => current.includes(exerciseId)
            ? current.filter((id) => id !== exerciseId)
            : [...current, exerciseId]);
    };

    const renderOverview = () => (
        <>
            <section style={{ background: 'linear-gradient(135deg, #172554, #0f172a)', padding: '17px', borderRadius: '19px', color: 'white', marginBottom: '13px' }}>
                <p style={{ fontSize: '9px', letterSpacing: '1px', opacity: 0.7, margin: '0 0 6px' }}>TU ACTIVIDAD DE HOY</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <strong style={{ fontSize: '32px', lineHeight: 1 }}>6.240</strong>
                    <span style={{ fontSize: '11px', opacity: 0.75 }}>pasos</span>
                </div>
                <div aria-label="62 por ciento de la meta diaria de pasos" style={{ height: '6px', background: '#334155', borderRadius: '10px', marginTop: '12px' }}>
                    <div style={{ width: '62%', height: '100%', background: '#fb923c', borderRadius: '10px' }} />
                </div>
                <p style={{ fontSize: '10px', opacity: 0.75, margin: '7px 0 0' }}>62% de tu meta diaria de 10.000</p>
            </section>

            <section aria-label="Resumen de actividad" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '13px' }}>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '11px' }}>
                    <span aria-hidden="true" style={{ fontSize: '17px' }}>🔥</span>
                    <p style={{ color: '#64748b', fontSize: '9px', margin: '5px 0 2px' }}>MOVIMIENTO</p>
                    <strong style={{ fontSize: '17px' }}>32 <small style={{ color: '#64748b', fontSize: '10px' }}>min</small></strong>
                </div>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '11px' }}>
                    <span aria-hidden="true" style={{ fontSize: '17px' }}>💧</span>
                    <p style={{ color: '#64748b', fontSize: '9px', margin: '5px 0 2px' }}>HIDRATACIÓN</p>
                    <strong style={{ fontSize: '17px' }}>{water}<small style={{ color: '#64748b', fontSize: '10px' }}> / 8 vasos</small></strong>
                </div>
            </section>

            <section style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '13px', marginBottom: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <strong style={{ fontSize: '12px' }}>Esta semana</strong>
                    <span style={{ color: '#64748b', fontSize: '9px' }}>Actividad de ejemplo</span>
                </div>
                <div aria-label="Gráfico ilustrativo de actividad semanal" style={{ display: 'flex', height: '72px', alignItems: 'end', justifyContent: 'space-between', gap: '6px' }}>
                    {WEEK_ACTIVITY.map((item, index) => (
                        <div key={item.day} style={{ display: 'flex', flex: 1, height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'end', gap: '5px' }}>
                            <div title={`${item.value}% de actividad`} style={{ width: '100%', maxWidth: '17px', height: `${item.value}%`, minHeight: '5px', background: index === 3 ? '#f97316' : '#fed7aa', borderRadius: '5px 5px 2px 2px' }} />
                            <span style={{ fontSize: '9px', color: '#64748b' }}>{item.day}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '16px', padding: '13px', marginBottom: '12px' }}>
                <p style={{ color: '#c2410c', fontSize: '9px', letterSpacing: '0.8px', fontWeight: 800, margin: '0 0 7px' }}>TU PRÓXIMA ACTIVIDAD</p>
                <strong style={{ display: 'block', fontSize: '13px' }}>Fuerza · cuerpo completo</strong>
                <span style={{ color: '#64748b', fontSize: '10px' }}>Hoy · 25 minutos · Nivel inicial</span>
                <button type="button" onClick={() => setActiveTab('Rutina')} style={{ display: 'block', marginTop: '10px', padding: '8px 11px', border: 0, borderRadius: '9px', background: '#f97316', color: 'white', fontSize: '10px', fontWeight: 750, cursor: 'pointer' }}>
                    Ver rutina
                </button>
            </section>
        </>
    );

    const renderRoutine = () => (
        <section>
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '14px', marginBottom: '12px' }}>
                <p style={{ color: '#f97316', fontSize: '9px', letterSpacing: '1px', fontWeight: 800, margin: '0 0 5px' }}>PLAN DE EJEMPLO · 25 MIN</p>
                <h3 style={{ fontSize: '16px', margin: '0 0 12px' }}>Fuerza de cuerpo completo</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '10px', marginBottom: '6px' }}>
                    <span>Tu avance</span><strong style={{ color: '#0f172a' }}>{completedExercises.length} de {ROUTINE.length} ejercicios</strong>
                </div>
                <div aria-label={`${completion}% de la rutina completada`} style={{ height: '6px', background: '#e2e8f0', borderRadius: '10px' }}>
                    <div style={{ width: `${completion}%`, height: '100%', background: '#f97316', borderRadius: '10px', transition: 'width 0.2s' }} />
                </div>
            </div>

            <div style={{ display: 'grid', gap: '8px' }}>
                {ROUTINE.map((exercise) => {
                    const isComplete = completedExercises.includes(exercise.id);
                    return (
                        <button
                            key={exercise.id}
                            type="button"
                            aria-pressed={isComplete}
                            onClick={() => toggleExercise(exercise.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '13px', background: isComplete ? '#f0fdf4' : 'white', textAlign: 'left', cursor: 'pointer' }}
                        >
                            <span aria-hidden="true" style={{ display: 'grid', placeItems: 'center', width: '22px', height: '22px', flexShrink: 0, borderRadius: '50%', background: isComplete ? '#16a34a' : '#f1f5f9', color: 'white', fontSize: '12px', fontWeight: 800 }}>
                                {isComplete ? '✓' : ''}
                            </span>
                            <span>
                                <strong style={{ display: 'block', fontSize: '11px' }}>{exercise.name}</strong>
                                <span style={{ display: 'block', color: '#64748b', fontSize: '9px', marginTop: '3px' }}>{exercise.detail}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );

    const renderNutrition = () => (
        <section>
            <div style={{ background: 'linear-gradient(135deg, #ecfdf5, #f0fdfa)', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '14px', marginBottom: '12px' }}>
                <p style={{ color: '#15803d', fontSize: '9px', letterSpacing: '1px', fontWeight: 800, margin: '0 0 5px' }}>HÁBITO DE HOY</p>
                <strong style={{ display: 'block', fontSize: '15px', marginBottom: '10px' }}>Agua durante el día</strong>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <span aria-live="polite" style={{ fontSize: '20px', fontWeight: 800 }}>{water} <small style={{ color: '#64748b', fontSize: '10px', fontWeight: 500 }}>/ 8 vasos</small></span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <button type="button" aria-label="Quitar un vaso de agua" onClick={() => setWater((current) => Math.max(0, current - 1))} disabled={water === 0} style={{ width: '32px', height: '32px', border: '1px solid #cbd5e1', borderRadius: '9px', background: 'white', cursor: water === 0 ? 'not-allowed' : 'pointer' }}>−</button>
                        <button type="button" aria-label="Sumar un vaso de agua" onClick={() => setWater((current) => Math.min(8, current + 1))} disabled={water === 8} style={{ width: '32px', height: '32px', border: 0, borderRadius: '9px', background: water === 8 ? '#94a3b8' : '#16a34a', color: 'white', fontSize: '17px', cursor: water === 8 ? 'not-allowed' : 'pointer' }}>+</button>
                    </div>
                </div>
                <div aria-label={`${Math.round((water / 8) * 100)}% de la meta de hidratación`} style={{ height: '6px', background: '#d1fae5', borderRadius: '10px', marginTop: '12px' }}>
                    <div style={{ width: `${(water / 8) * 100}%`, height: '100%', background: '#16a34a', borderRadius: '10px', transition: 'width 0.2s' }} />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '16px 2px 9px' }}>
                <strong style={{ fontSize: '12px' }}>Ideas para tu día</strong>
                <span style={{ color: '#64748b', fontSize: '9px' }}>Menú de muestra</span>
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
                {MEALS.map((meal) => (
                    <article key={meal.time} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '13px', padding: '11px' }}>
                        <span aria-hidden="true" style={{ display: 'grid', placeItems: 'center', width: '36px', height: '36px', flexShrink: 0, borderRadius: '11px', background: '#f8fafc', fontSize: '19px' }}>{meal.icon}</span>
                        <span>
                            <span style={{ display: 'block', color: '#f97316', fontSize: '8px', fontWeight: 800, letterSpacing: '0.8px', marginBottom: '3px' }}>{meal.time}</span>
                            <strong style={{ display: 'block', fontSize: '11px' }}>{meal.name}</strong>
                            <span style={{ display: 'block', color: '#64748b', fontSize: '9px', marginTop: '2px' }}>{meal.detail}</span>
                        </span>
                    </article>
                ))}
            </div>
            <p style={{ color: '#64748b', fontSize: '9px', lineHeight: 1.5, margin: '10px 2px 0' }}>
                Contenido ilustrativo; no reemplaza el asesoramiento de un profesional de nutrición.
            </p>
        </section>
    );

    return (
        <AppShell>
            <div style={{ padding: '17px 15px 22px', background: '#f8fafc', minHeight: '100%', fontFamily: 'system-ui', color: '#0f172a' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '13px' }}>
                    <div>
                        <p style={{ color: '#f97316', fontSize: '9px', fontWeight: 800, letterSpacing: '1px', margin: '0 0 3px' }}>DEMO INTERACTIVA</p>
                        <h2 style={{ fontSize: '19px', fontWeight: 850, margin: 0 }}>Powa Fitness</h2>
                    </div>
                    <div aria-label="Perfil de ejemplo" style={{ display: 'grid', placeItems: 'center', width: '36px', height: '36px', borderRadius: '50%', background: '#ffedd5', fontSize: '17px' }}>🏃</div>
                </header>

                <nav aria-label="Secciones de la demo" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '5px', padding: '4px', background: '#e2e8f0', borderRadius: '12px', marginBottom: '13px' }}>
                    {(['Resumen', 'Rutina', 'Nutrición'] as FitnessTab[]).map((tab) => {
                        const selected = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => setActiveTab(tab)}
                                style={{ padding: '9px 3px', border: 0, borderRadius: '9px', background: selected ? 'white' : 'transparent', color: selected ? '#0f172a' : '#64748b', boxShadow: selected ? '0 1px 3px rgba(15,23,42,0.12)' : 'none', fontSize: '10px', fontWeight: 750, cursor: 'pointer' }}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </nav>

                <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '11px', padding: '9px 10px', marginBottom: '12px' }}>
                    <p style={{ color: '#9a3412', fontSize: '9px', lineHeight: 1.5, margin: 0 }}>
                        Datos de muestra: tus cambios son temporales y solo viven en esta pantalla.
                    </p>
                </div>

                {activeTab === 'Resumen' && renderOverview()}
                {activeTab === 'Rutina' && renderRoutine()}
                {activeTab === 'Nutrición' && renderNutrition()}
            </div>
        </AppShell>
    );
}
