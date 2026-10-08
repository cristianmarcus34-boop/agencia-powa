// app/desarrollo-web-quilmes/_components/ServiciosLocal.tsx
import {
    FaCode,
    FaShoppingCart,
    FaMobileAlt,
    FaBrain,
    FaArrowRight,
} from 'react-icons/fa'
import { servicios } from './data'

const iconMap = {
    code: <FaCode />,
    cart: <FaShoppingCart />,
    mobile: <FaMobileAlt />,
    brain: <FaBrain />,
} as const

export function ServiciosLocal() {
    return (
        <section className="py-24">
            {/* Kicker */}
            <p className="text-center text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
                Servicios
            </p>

            {/* Título */}
            <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-6 tracking-tight max-w-3xl mx-auto leading-[1.15]">
                Desarrollo web a medida para tu negocio
            </h2>

            {/* Subtítulo */}
            <p className="text-center max-w-2xl mx-auto mb-16 text-base md:text-lg leading-[1.8] text-slate-400 font-light">
                Trabajamos con empresas de Quilmes, Bernal, Avellaneda, Lanús,
                Berazategui y toda Zona Sur. Estos son nuestros servicios más
                solicitados.
            </p>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {servicios.map((service, i) => (
                    <div
                        key={i}
                        className={`
              group relative p-8 rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col
              ${service.destacado
                                ? 'bg-linear-to-b from-cyan-400/6 via-slate-800/30 to-slate-800/10 border-cyan-400/20 hover:border-cyan-400/40'
                                : 'bg-linear-to-b from-slate-800/40 to-slate-800/10 border-white/6 hover:border-cyan-400/30'
                            }
            `}
                    >
                        {/* Glow hover */}
                        <div
                            aria-hidden
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                                background:
                                    'radial-gradient(circle at top, rgba(34,211,238,0.08), transparent 70%)',
                            }}
                        />

                        {/* Contenido */}
                        <div className="relative flex flex-col flex-1">
                            {/* Badge "Popular" si está destacado */}
                            {service.destacado && (
                                <span className="absolute -top-2 -right-2 text-[9px] font-bold tracking-[0.15em] uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/25 px-2 py-1 rounded-full backdrop-blur-sm">
                                    Popular
                                </span>
                            )}

                            {/* Icono */}
                            <div
                                className={`
                  w-12 h-12 flex items-center justify-center rounded-xl text-xl mb-6 transition-all duration-500 group-hover:scale-110
                  ${service.destacado
                                        ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 group-hover:bg-cyan-400/25'
                                        : 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 group-hover:bg-cyan-400/15'
                                    }
                `}
                            >
                                {iconMap[service.iconKey]}
                            </div>

                            {/* Título */}
                            <h3 className="text-white text-lg font-bold mb-3 tracking-tight">
                                {service.title}
                            </h3>

                            {/* Descripción */}
                            <p className="text-sm leading-[1.7] text-slate-400 font-light flex-1">
                                {service.desc}
                            </p>

                            {/* Link sutil al final */}
                            <div className="mt-6 pt-5 border-t border-white/4 flex items-center justify-between">
                                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-500 group-hover:text-cyan-400 transition-colors duration-500">
                                    Ver más
                                </span>
                                <FaArrowRight
                                    size={11}
                                    className="text-cyan-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA secundario al final */}
            <div className="mt-14 text-center">
                <p className="text-sm text-slate-500 font-light mb-4">
                    ¿No sabés qué servicio necesitás? Te asesoramos sin costo.
                </p>
                <a
                    href="https://wa.me/5491138305837"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors duration-300"
                >
                    Consultanos por WhatsApp
                    <FaArrowRight
                        size={10}
                        className="group-hover:translate-x-0.5 transition-transform duration-300"
                    />
                </a>
            </div>
        </section>
    )
}