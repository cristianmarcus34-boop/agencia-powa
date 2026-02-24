'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaQuoteLeft } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';

export default function SwiperComponent() {
    const testimonials = [
        { name: "Andrés Silva", role: "CEO Logística AS", text: "Automatizaron nuestro stock ahorrándonos 15 horas semanales." },
        { name: "Lucía Fernández", role: "EcoModa", text: "Mis conversiones subieron un 40% con la nueva UX de la tienda." },
        { name: "Mariano Tech", role: "CTO Regional", text: "La arquitectura escalable soporta miles de usuarios sin latencia." }
    ];

    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            breakpoints={{ 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }}
            className="pb-5"
        >
            {testimonials.map((t, i) => (
                <SwiperSlide key={i}>
                    <div className="glass-testimonial p-4 rounded-4 border border-white/10 bg-white/5 backdrop-blur-md">
                        <FaQuoteLeft className="text-info opacity-25 mb-3" size={30} />
                        <p className="fst-italic text-slate-300">"{t.text}"</p>
                        <div className="d-flex align-items-center gap-3 mt-4">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: 40, height: 40}}>
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <div className="fw-bold text-white">{t.name}</div>
                                <div className="small text-muted">{t.role}</div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}