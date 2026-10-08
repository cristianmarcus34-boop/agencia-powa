// app/desarrollo-web-quilmes/_components/HeroQuilmes.tsx
import Link from 'next/link'
import { FaMapMarkerAlt, FaWhatsapp, FaRocket } from 'react-icons/fa'

export function HeroQuilmes() {
    return (
        <header className="relative text-center pt-20 pb-24">
            {/* Glow decorativo de fondo */}
            <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[500px] pointer-events-none opacity-40 blur-3xl"
                style={{
                    background:
                        'radial-gradient(ellipse at top, rgba(34,211,238,0.25), transparent 60%)',
                }}
            />

            <div className="relative">
                {/* Kicker */}
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] backdrop-blur-sm text-cyan-400 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase border border-cyan-400/20 mb-8">
                    <FaMapMarkerAlt size={10} />
                    Quilmes · Zona Sur · Remoto en todo el mundo
                </span>

                {/* H1 */}
                <h1 className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-black leading-[1.05] text-white mb-8 tracking-[-0.03em] max-w-5xl mx-auto">
                    Agencia de{' '}
                    <span className="bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Desarrollo Web en Quilmes
                    </span>
                </h1>

                {/* Subtítulo */}
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-[1.8] text-slate-400 font-light">
                    Somos Powa Digital, tu agencia de desarrollo web en Quilmes. Creamos
                    landing pages que convierten, tiendas online que venden, sistemas a
                    medida y apps móviles para PYMES y empresas de{' '}
                    <strong className="text-slate-200 font-semibold">
                        Argentina, Latinoamérica y el mundo
                    </strong>
                    .
                </p>

                {/* CTAs */}
                <div className="flex gap-4 justify-center flex-wrap">
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#0a0f1a] rounded-xl font-bold tracking-tight shadow-[0_8px_40px_-8px_rgba(34,211,238,0.6)] hover:shadow-[0_12px_50px_-8px_rgba(34,211,238,0.8)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                        Consultá tu proyecto
                        <FaRocket className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </Link>

                    <a
                        href="https://wa.me/5491138305837"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.02] backdrop-blur-sm text-white border border-white/[0.08] rounded-xl font-bold tracking-tight hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300"
                    >
                        WhatsApp <FaWhatsapp />
                    </a>
                </div>
            </div>
        </header>
    )
}