// app/desarrollo-web-quilmes/_components/FAQQuilmes.tsx
import { faqs } from './data'

export function FAQQuilmes() {
    return (
        <section className="py-24">
            <p className="text-center text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
                FAQ
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-6 tracking-tight max-w-3xl mx-auto leading-[1.15]">
                Preguntas frecuentes
            </h2>

            <p className="text-center max-w-2xl mx-auto mb-16 text-base md:text-lg leading-[1.8] text-slate-400 font-light">
                Las dudas más comunes que nos consultan empresas y PYMES de la zona.
            </p>

            <div className="max-w-3xl mx-auto space-y-3">
                {faqs.map((faq, i) => (
                    <details
                        key={i}
                        className="group bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-colors duration-300"
                    >
                        <summary className="cursor-pointer p-6 text-white font-semibold text-base md:text-[17px] list-none flex justify-between items-center gap-6 hover:bg-white/[0.02] transition-colors">
                            <span className="tracking-tight">{faq.q}</span>
                            <span className="text-cyan-400 text-2xl font-light shrink-0 group-open:rotate-45 transition-transform duration-300 leading-none">
                                +
                            </span>
                        </summary>
                        <div className="px-6 pb-6 text-slate-400 leading-[1.8] text-[15px] font-light">
                            {faq.a}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    )
}