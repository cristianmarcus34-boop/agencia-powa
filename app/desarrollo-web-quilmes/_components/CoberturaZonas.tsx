// app/desarrollo-web-quilmes/_components/CoberturaZonas.tsx
import { FaMapMarkerAlt, FaGlobe } from 'react-icons/fa'
import { zonas, paises } from './data'

export function CoberturaZonas() {
    return (
        <section className="py-24 text-center">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
                Cobertura
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight max-w-3xl mx-auto leading-[1.15]">
                Base en Quilmes,{' '}
                <span className="bg-gradient-to-br from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                    alcance mundial
                </span>
            </h2>

            <p className="max-w-2xl mx-auto mb-12 text-base md:text-lg leading-[1.8] text-slate-400 font-light">
                <strong className="text-slate-200 font-semibold">
                    Atendemos presencialmente en Quilmes y Zona Sur
                </strong>
                , y trabajamos de forma 100% remota con clientes de toda Argentina,
                Latinoamérica, Estados Unidos y Europa.
            </p>

            <div className="flex flex-wrap gap-2 justify-center mb-4">
                {zonas.map((zona) => (
                    <span
                        key={zona}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-400/[0.06] border border-cyan-400/15 rounded-full text-cyan-300 text-[13px] font-medium hover:bg-cyan-400/[0.12] hover:border-cyan-400/30 transition-all duration-300"
                    >
                        <FaMapMarkerAlt size={10} /> {zona}
                    </span>
                ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
                {paises.map((pais) => (
                    <span
                        key={pais}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-violet-500/[0.06] border border-violet-500/15 rounded-full text-violet-300 text-[13px] font-medium hover:bg-violet-500/[0.12] hover:border-violet-500/30 transition-all duration-300"
                    >
                        <FaGlobe size={10} /> {pais}
                    </span>
                ))}
            </div>
        </section>
    )
}