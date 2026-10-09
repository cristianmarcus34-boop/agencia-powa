// app/components/PromosSection/PromosSection.tsx
'use client';

import Link from 'next/link';
import { FaCheck, FaRocket, FaGift, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './PromosSection.module.css';

type Promo = {
    id: string;
    badge: string;
    titulo: string;
    subtitulo: string;
    precio: string;
    precioDetalle?: string;
    aclaracion?: string;
    incluye: string[];
    nota: string;
    ctaTexto: string;
    ctaHref: string;
    destacado?: boolean;
};

const promos: Promo[] = [
    {
        id: 'landing',
        badge: 'Landing que vende',
        titulo: 'Una página para que te encuentren y te llamen',
        subtitulo:
            'Para el comercio, el profesional o el emprendedor que necesita estar en Google y recibir consultas. Sin vueltas.',
        precio: 'desde $350.000',
        precioDetalle: 'pago único',
        aclaracion: 'Precio preferencial para Quilmes y Zona Sur',
        incluye: [
            'Diseño único, no una plantilla repetida',
            'Preparada para que Google la encuentre',
            'Carga rápida, anda bien en el celular',
            'Botón de WhatsApp y formulario de contacto',
            'Te mostramos cómo medir las visitas',
        ],
        nota: 'Solo para vecinos de Quilmes y Zona Sur',
        ctaTexto: 'Quiero mi página',
        ctaHref: '/contact',
    },
    {
        id: 'sitio',
        badge: 'Sitio + Cuidado mensual',
        titulo: 'Tu web completa, y nosotros nos ocupamos del resto',
        subtitulo:
            'Para PYMES que quieren una web seria y no quieren renegar con la parte técnica. Vos te enfocás en tu negocio, nosotros en que funcione.',
        precio: 'desde $550.000',
        precioDetalle: '+ $50.000 por mes de mantenimiento',
        aclaracion: 'Precio preferencial para Quilmes y Zona Sur',
        incluye: [
            'Web completa con hasta 5 secciones',
            'Dominio, hosting y seguridad incluidos',
            'Copias de seguridad todos los días',
            'Hasta 3 cambios de contenido por mes',
            'Te atendemos por WhatsApp si algo falla',
            'El precio del mantenimiento no sube por 12 meses',
        ],
        nota: 'Primer mes de cuidado bonificado para vecinos',
        ctaTexto: 'Quiero el pack completo',
        ctaHref: '/contact',
        destacado: true,
    },
    {
        id: 'pyme',
        badge: 'Pack Vecino',
        titulo: 'Tu negocio completo en internet, listo para vender',
        subtitulo:
            'Para el comercio de barrio que quiere aparecer en Google, tener su ficha en Maps y recibir clientes de la zona.',
        precio: 'desde $450.000',
        precioDetalle: '+ $50.000 por mes de mantenimiento',
        aclaracion: 'Exclusivo para Quilmes, Bernal, Varela y Lomas',
        incluye: [
            'Página web o landing a tu medida',
            'Te armamos la ficha de Google (Maps)',
            'Preparada para que te encuentren en tu zona',
            'Hosting, dominio y cuidado mensual',
            'Te enseñamos a manejarla vos mismo',
        ],
        nota: 'Tomamos pocos vecinos por mes',
        ctaTexto: 'Consultar disponibilidad',
        ctaHref: '/contact',
    },
];

export default function PromosSection() {
    return (
        <section id="promos" className={styles.promosSection}>
            <div className="container">
                {/* Header */}
                <div className={styles.promosHeader}>
                    <span className={styles.promosBadge}>
                        <FaMapMarkerAlt size={10} />
                        ATENCIÓN QUILMES Y ZONA SUR
                    </span>
                    <h2 className={styles.promosTitle}>
                        Precios de vecino,{' '}
                        <span className={styles.textGradient}>
                            no de agencia grande
                        </span>
                    </h2>
                    <p className={styles.promosSubtitle}>
                        Trabajamos con comercios y PYMES de Quilmes, Bernal, Varela
                        y Lomas de Zamora. Como somos del barrio, te cobramos lo
                        justo y te acompañamos de cerca. Estos son los precios para
                        vos, no para una empresa de Buenos Aires.
                    </p>
                </div>

                {/* Grid de promos */}
                <div className={styles.promosGrid}>
                    {promos.map((promo) => (
                        <div
                            key={promo.id}
                            className={`${styles.promoCard} ${promo.destacado ? styles.promoCardDestacado : ''
                                }`}
                        >
                            {promo.destacado && (
                                <span className={styles.promoPopularBadge}>
                                    El más pedido
                                </span>
                            )}

                            <span className={styles.promoBadge}>{promo.badge}</span>

                            <h3 className={styles.promoTitle}>{promo.titulo}</h3>
                            <p className={styles.promoSubtitle}>{promo.subtitulo}</p>

                            {/* Precio */}
                            <div className={styles.promoPriceBlock}>
                                <span className={styles.promoPrice}>
                                    {promo.precio}
                                </span>
                                {promo.precioDetalle && (
                                    <span className={styles.promoPriceDetail}>
                                        {promo.precioDetalle}
                                    </span>
                                )}
                                {promo.aclaracion && (
                                    <span className={styles.promoAclaracion}>
                                        {promo.aclaracion}
                                    </span>
                                )}
                            </div>

                            <ul className={styles.promoList}>
                                {promo.incluye.map((item, i) => (
                                    <li key={i} className={styles.promoListItem}>
                                        <span className={styles.promoCheck}>
                                            <FaCheck size={9} />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.promoFooter}>
                                <div className={styles.promoNota}>
                                    <FaGift size={11} />
                                    {promo.nota}
                                </div>
                                <Link
                                    href={promo.ctaHref}
                                    className={styles.promoButton}
                                >
                                    {promo.ctaTexto}
                                    <FaArrowRight
                                        size={11}
                                        className={styles.promoButtonArrow}
                                    />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Nota al pie */}
                <p className={styles.promosFootnote}>
                    Los precios son en pesos y pueden variar según lo que necesites.
                    Te damos un presupuesto claro, sin compromiso, en menos de 24
                    horas. Si no sos de Quilmes ni Zona Sur, también podemos
                    trabajar — pero el precio preferencial es para los vecinos.
                </p>
            </div>
        </section>
    );
}