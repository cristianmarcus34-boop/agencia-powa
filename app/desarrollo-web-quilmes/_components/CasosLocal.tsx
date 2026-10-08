// app/desarrollo-web-quilmes/_components/CasosLocal.tsx
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa'
import { casos } from './data'

export function CasosLocal() {
    return (
        <section className="py-24">
            <p className="text-center text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
                Casos
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-6 tracking-tight max-w-3xl mx-auto leading-[1.15]">
                Resultados reales en Zona Sur
            </h2>

            <p className="text-center max-w-2xl mx-auto mb-16 text-base md:text-lg leading-[1.8] text-slate-400 font-light">
                Proyectos que generaron resultados medibles para negocios de Quilmes,
                Bernal y alrededores.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {casos.map((caso, i) => (
                    <div
                        key={i}
                        className="group relative p-7 bg-gradient-to-b from-slate-800/40 to-slate-800/5 rounded-2xl border border-white/[0.06] hover:border-cyan-400/25 transition-all duration-500 flex flex-col overflow-hidden"
                    >
                        {/* Glow hover */}
                        <div
                            aria-hidden
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                                background:
                                    'radial-gradient(circle at top right, rgba(34,211,238,0.06), transparent 60%)',
                            }}
                        />

                        <div className="relative flex-1 flex flex-col">
                            <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-bold tracking-wider uppercase mb-4">
                                <FaMapMarkerAlt size={10} /> {caso.rubro} · {caso.zona}
                            </div>

                            <h3 className="text-white text-lg font-bold mb-3 tracking-tight">
                                {caso.titulo}
                            </h3>

                            <p className="text-sm leading-[1.7] text-slate-400 font-light mb-6 flex-1">
                                {caso.desc}
                            </p>

                            <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between">
                                <span className="text-emerald-400 font-bold text-sm tracking-tight">
                                    {caso.resultado}
                                </span>
                                <FaArrowRight
                                    className="text-cyan-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                                    size={12}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}