// app/desarrollo-web-quilmes/_components/CTAFinal.tsx
import Link from 'next/link'
import { FaRocket, FaGift, FaArrowRight } from 'react-icons/fa'

export function CTAFinal() {
    return (
        <section className="relative py-20 px-8 md:px-16 text-center bg-gradient-to-br from-slate-800/40 via-slate-900/40 to-slate-800/40 rounded-3xl border border-white/[0.06] mb-24 overflow-hidden">
            {/* Glow radial de fondo */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse at center, rgba(34,211,238,0.15), transparent 70%)',
                }}
            />

            <div className="relative">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-5 tracking-tight max-w-2xl mx-auto leading-[1.15]">
                    ¿Listo para tener tu web profesional?
                </h2>

                <p className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-[1.8] text-slate-400 font-light">
                    Estés en Quilmes, Buenos Aires, Latinoamérica o Europa, contanos qué
                    necesitás y te damos un presupuesto sin compromiso en 24hs.
                </p>

                <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#0a0f1a] rounded-xl font-extrabold tracking-tight shadow-[0_8px_40px_-8px_rgba(34,211,238,0.6)] hover:shadow-[0_12px_50px_-8px_rgba(34,211,238,0.8)] hover:-translate-y-0.5 transition-all duration-300"
                >
                    Agendar consultoría gratis
                    <FaRocket className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </Link>

                {/* Mención sutil de la promo */}
                <p className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-400/90 font-medium">
                    <FaGift size={12} />
                    Contratando este mes: primer mes de mantenimiento bonificado
                </p>

                {/* Link a las promos del home */}
                <div className="mt-8 pt-6 border-t border-white/[0.05] max-w-md mx-auto">
                    <p className="text-sm text-slate-500 font-light">
                        ¿Querés ver todos los planes y promociones?{' '}
                        <Link
                            href="/#promos"
                            className="group inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300 underline-offset-4 hover:underline"
                        >
                            Ver promos
                            <FaArrowRight
                                size={10}
                                className="group-hover:translate-x-0.5 transition-transform duration-300"
                            />
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}