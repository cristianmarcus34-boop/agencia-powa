// app/desarrollo-web-quilmes/_components/BarriosQuilmes.tsx
import { FaMapMarkerAlt } from 'react-icons/fa'
import { barrios } from './data'

export function BarriosQuilmes() {
    return (
        <section className="py-24">
            <p className="text-center text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
                Zona de trabajo
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-6 tracking-tight max-w-3xl mx-auto leading-[1.15]">
                Desarrollo web en los barrios de Quilmes y Zona Sur
            </h2>

            <p className="text-center max-w-2xl mx-auto mb-16 text-base md:text-lg leading-[1.8] text-slate-400 font-light">
                Conocemos la zona porque trabajamos acá. Estos son los barrios y
                localidades donde más proyectos desarrollamos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {barrios.map((barrio) => (
                    <div
                        key={barrio.nombre}
                        className="group relative p-6 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl border border-white/[0.06] hover:border-cyan-400/25 transition-all duration-500 overflow-hidden"
                    >
                        {/* Acento lateral */}
                        <div
                            aria-hidden
                            className="absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-400/15 transition-colors duration-500">
                                <FaMapMarkerAlt className="text-cyan-400" size={12} />
                            </div>
                            <h3 className="text-white text-base font-bold tracking-tight pt-1">
                                {barrio.nombre}
                            </h3>
                        </div>

                        <p className="text-sm leading-[1.7] text-slate-400 font-light pl-11">
                            {barrio.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}