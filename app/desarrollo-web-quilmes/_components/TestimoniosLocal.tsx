// app/desarrollo-web-quilmes/_components/TestimoniosLocal.tsx
import { FaQuoteLeft } from 'react-icons/fa'
import { testimonios } from './data'

export function TestimoniosLocal() {
    return (
        <section className="py-24">
            <p className="text-center text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
                Testimonios
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-16 tracking-tight max-w-3xl mx-auto leading-[1.15]">
                Lo que dicen nuestros clientes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {testimonios.map((t, i) => (
                    <div
                        key={i}
                        className="relative p-7 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 flex flex-col"
                    >
                        <FaQuoteLeft className="text-cyan-400/30 text-2xl mb-5" />

                        <p className="text-slate-300 leading-[1.8] font-light mb-6 flex-1 text-[15px]">
                            {t.texto}
                        </p>

                        <div className="pt-5 border-t border-white/[0.06]">
                            <p className="text-white font-bold text-sm tracking-tight">
                                {t.nombre}
                            </p>
                            <p className="text-slate-500 text-xs mt-0.5">{t.rol}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}