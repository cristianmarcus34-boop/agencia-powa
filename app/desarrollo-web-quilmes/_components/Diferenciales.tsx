// app/desarrollo-web-quilmes/_components/Diferenciales.tsx
import { FaCheck } from 'react-icons/fa'
import { diferenciales } from './data'

export function Diferenciales() {
    return (
        <section className="py-24">
            <p className="text-center text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
                Por qué elegirnos
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-16 tracking-tight max-w-3xl mx-auto leading-[1.15]">
                La diferencia de trabajar con Powa
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {diferenciales.map((item, i) => (
                    <div
                        key={i}
                        className="group flex gap-4 items-start p-5 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300"
                    >
                        <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500/25 transition-colors duration-300">
                            <FaCheck className="text-emerald-400" size={10} />
                        </div>
                        <span className="text-slate-300 text-[15px] leading-[1.6]">{item}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}