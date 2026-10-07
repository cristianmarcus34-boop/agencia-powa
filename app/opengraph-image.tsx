import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Agencia Digital Powa';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0a0f1a',
                    backgroundImage:
                        'radial-gradient(circle at 25% 25%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
                    padding: 80,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 24,
                    }}
                >
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 800,
                            letterSpacing: 8,
                            color: '#22d3ee',
                            textTransform: 'uppercase',
                            textShadow: '0 0 30px rgba(34, 211, 238, 0.5)',
                        }}
                    >
                        Powa Digital
                    </div>
                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 900,
                            color: '#ffffff',
                            textAlign: 'center',
                            lineHeight: 1.1,
                            letterSpacing: -2,
                            maxWidth: 1000,
                        }}
                    >
                        Software Factory &{' '}
                        <span
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            Consultoría IT
                        </span>
                    </div>
                    <div
                        style={{
                            fontSize: 28,
                            color: '#94a3b8',
                            textAlign: 'center',
                            maxWidth: 900,
                            lineHeight: 1.5,
                        }}
                    >
                        Desarrollo web, apps y automatización con IA para PYMES y empresas
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16,
                            marginTop: 24,
                            padding: '16px 32px',
                            backgroundColor: 'rgba(34, 211, 238, 0.1)',
                            border: '1px solid rgba(34, 211, 238, 0.3)',
                            borderRadius: 100,
                            color: '#22d3ee',
                            fontSize: 22,
                            fontWeight: 700,
                        }}
                    >
                        🌐 www.agenciadigitalpowa.com.ar
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}