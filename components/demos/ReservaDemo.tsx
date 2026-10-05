'use client';

import { useState } from 'react';
import AppShell from './AppShell';

const SERVICES = [
    { id: 'consulta', name: 'Consulta inicial', detail: 'Conocé el servicio', duration: '45 min', icon: '👋' },
    { id: 'seguimiento', name: 'Seguimiento', detail: 'Revisemos tus avances', duration: '30 min', icon: '📈' },
    { id: 'asesoria', name: 'Asesoría express', detail: 'Una consulta puntual', duration: '20 min', icon: '💡' },
];

const DEMO_DATES = ['Hoy', 'Mañana', 'En 2 días', 'En 3 días', 'En 4 días', 'En 5 días', 'En 6 días'];

const AVAILABILITY = [
    ['09:00', '10:30', '14:00', '16:30'],
    ['09:30', '11:00', '15:00'],
    ['10:00', '13:30', '16:00', '17:00'],
    ['09:00', '12:00', '14:30'],
    ['10:30', '13:00', '15:30', '17:00'],
    ['09:30', '11:30', '14:00'],
    ['10:00', '12:30', '16:30'],
];

export default function ReservaDemo() {
    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedService, setSelectedService] = useState(SERVICES[0].id);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const service = SERVICES.find((item) => item.id === selectedService) ?? SERVICES[0];
    const availableTimes = AVAILABILITY[selectedDate] ?? AVAILABILITY[0];

    const handleDateChange = (index: number) => {
        setSelectedDate(index);
        setSelectedTime(null);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setConfirmed(true);
    };

    const resetDemo = () => {
        setConfirmed(false);
        setSelectedTime(null);
        setName('');
        setEmail('');
    };

    return (
        <AppShell>
            <div style={{ padding: '18px 16px 24px', background: '#f8fafc', minHeight: '100%', fontFamily: 'system-ui', color: '#0f172a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div>
                        <p style={{ color: '#f97316', fontSize: '10px', fontWeight: 800, letterSpacing: '1px', margin: '0 0 4px' }}>POWA SCHEDULE</p>
                        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>{confirmed ? '¡Listo!' : 'Reservá tu espacio'}</h2>
                    </div>
                    <span aria-hidden="true" style={{ fontSize: '23px' }}>🗓️</span>
                </div>

                <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', padding: '10px 12px', marginBottom: '18px' }}>
                    <p style={{ color: '#9a3412', fontSize: '11px', lineHeight: 1.5, margin: 0 }}>
                        <strong>Demo interactiva:</strong> disponibilidad y reserva de ejemplo. No se envían ni guardan datos.
                    </p>
                </div>

                {confirmed ? (
                    <div role="status" style={{ background: 'white', borderRadius: '20px', padding: '22px 18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(15,23,42,0.06)' }}>
                        <div aria-hidden="true" style={{ fontSize: '42px', marginBottom: '8px' }}>✅</div>
                        <h3 style={{ fontSize: '18px', margin: '0 0 6px' }}>Reserva simulada</h3>
                        <p style={{ fontSize: '12px', lineHeight: 1.6, color: '#64748b', margin: '0 0 16px' }}>
                            Gracias, {name}. Así se vería la confirmación de tu turno:
                        </p>
                        <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '14px', textAlign: 'left', fontSize: '12px', lineHeight: 1.9 }}>
                            <div><strong>Servicio:</strong> {service.name}</div>
                            <div><strong>Fecha:</strong> {DEMO_DATES[selectedDate]}</div>
                            <div><strong>Horario:</strong> {selectedTime} hs · {service.duration}</div>
                            <div><strong>Contacto:</strong> {email}</div>
                        </div>
                        <button type="button" onClick={resetDemo} style={{ width: '100%', marginTop: '16px', padding: '12px', border: 0, borderRadius: '12px', background: '#0f172a', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
                            Hacer otra prueba
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <section aria-labelledby="service-heading" style={{ marginBottom: '18px' }}>
                            <h3 id="service-heading" style={{ fontSize: '13px', margin: '0 0 9px' }}>1. Elegí el tipo de consulta</h3>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                {SERVICES.map((item) => {
                                    const selected = selectedService === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            aria-pressed={selected}
                                            onClick={() => setSelectedService(item.id)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px',
                                                border: selected ? '2px solid #f97316' : '1px solid #e2e8f0',
                                                borderRadius: '13px', background: selected ? '#fff7ed' : 'white', textAlign: 'left', cursor: 'pointer',
                                            }}
                                        >
                                            <span aria-hidden="true" style={{ fontSize: '20px' }}>{item.icon}</span>
                                            <span style={{ flex: 1 }}>
                                                <span style={{ display: 'block', fontSize: '12px', fontWeight: 750 }}>{item.name}</span>
                                                <span style={{ display: 'block', color: '#64748b', fontSize: '10px', marginTop: '2px' }}>{item.detail}</span>
                                            </span>
                                            <span style={{ color: '#64748b', fontSize: '10px', whiteSpace: 'nowrap' }}>{item.duration}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        <section aria-labelledby="date-heading" style={{ marginBottom: '18px' }}>
                            <h3 id="date-heading" style={{ fontSize: '13px', margin: '0 0 9px' }}>2. Seleccioná fecha</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '6px' }}>
                                {DEMO_DATES.map((date, index) => {
                                    const selected = selectedDate === index;
                                    return (
                                        <button
                                            key={date}
                                            type="button"
                                            aria-pressed={selected}
                                            onClick={() => handleDateChange(index)}
                                            style={{
                                                minHeight: '58px', border: selected ? '2px solid #f97316' : '1px solid #e2e8f0',
                                                borderRadius: '12px', background: selected ? '#fff7ed' : 'white', cursor: 'pointer',
                                            }}
                                        >
                                            <span style={{ display: 'block', color: '#64748b', fontSize: '9px', lineHeight: 1.3 }}>{date}</span>
                                            <span style={{ display: 'block', fontSize: '10px', fontWeight: 800, marginTop: '4px' }}>Disponible</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        <section aria-labelledby="time-heading" style={{ marginBottom: '18px' }}>
                            <h3 id="time-heading" style={{ fontSize: '13px', margin: '0 0 9px' }}>3. Elegí un horario</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
                                {availableTimes.map((time) => {
                                    const selected = selectedTime === time;
                                    return (
                                        <button
                                            key={time}
                                            type="button"
                                            aria-pressed={selected}
                                            onClick={() => setSelectedTime(time)}
                                            style={{
                                                padding: '11px', border: selected ? '2px solid #f97316' : '1px solid #e2e8f0',
                                                borderRadius: '11px', background: selected ? '#fff7ed' : 'white', color: selected ? '#c2410c' : '#334155',
                                                fontSize: '12px', fontWeight: 750, cursor: 'pointer',
                                            }}
                                        >
                                            {time} hs
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        <section aria-labelledby="contact-heading" style={{ marginBottom: '14px' }}>
                            <h3 id="contact-heading" style={{ fontSize: '13px', margin: '0 0 9px' }}>4. Tus datos de contacto</h3>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '9px' }}>
                                Nombre
                                <input
                                    required
                                    autoComplete="name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="Tu nombre"
                                    style={{ display: 'block', boxSizing: 'border-box', width: '100%', marginTop: '5px', padding: '11px', border: '1px solid #cbd5e1', borderRadius: '10px', font: 'inherit', fontWeight: 400 }}
                                />
                            </label>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700 }}>
                                Email
                                <input
                                    required
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="tu@email.com"
                                    style={{ display: 'block', boxSizing: 'border-box', width: '100%', marginTop: '5px', padding: '11px', border: '1px solid #cbd5e1', borderRadius: '10px', font: 'inherit', fontWeight: 400 }}
                                />
                            </label>
                        </section>

                        <button
                            type="submit"
                            disabled={!selectedTime}
                            style={{
                                width: '100%', padding: '13px', border: 0, borderRadius: '12px',
                                background: selectedTime ? '#f97316' : '#cbd5e1', color: 'white',
                                fontWeight: 800, fontSize: '12px', cursor: selectedTime ? 'pointer' : 'not-allowed',
                            }}
                        >
                            Confirmar demo {selectedTime ? `· ${selectedTime} hs` : ''}
                        </button>
                    </form>
                )}
            </div>
        </AppShell>
    );
}
