// app/desarrollo-web-quilmes/_components/ProcesoLocal.tsx
import { procesoPasos } from './data'

export function ProcesoLocal() {
    return (
        <section className="py-24">
            <p className="text-center text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
                Proceso
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-6 tracking-tight max-w-3xl mx-auto leading-[1.15]">
                Cómo trabajamos
            </h2>

            <p className="text-center max-w-2xl mx-auto mb-16 text-base md:text-lg leading-[1.8] text-slate-400 font-light">
                Un proceso claro, sin sorpresas. Sabés en todo momento en qué etapa
                está tu proyecto.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {procesoPasos.map((paso) => (
                    <div
                        key={paso.num}
                        className="group relative p-6 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl border border-white/[0.06] hover:border-cyan-400/25 transition-all duration-500"
                    >
                        <span className="block text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400/60 to-cyan-400/10 mb-4 leading-none">
                            {paso.num}
                        </span>
                        <h3 className="text-white text-[15px] font-bold mb-2 tracking-tight">
                            {paso.title}
                        </h3>
                        <p className="text-[13px] leading-[1.7] text-slate-400 font-light">
                            {paso.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}