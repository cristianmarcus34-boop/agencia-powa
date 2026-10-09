// app/components/PromosSection/PromosSection.tsx
'use client';

import Link from 'next/link';
import {
    FaCheck,
    FaGift,
    FaArrowRight,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import styles from './PromosSection.module.css';

type Promo = {
    id: string;
    badge: string;
    paraQuien: string;
    titulo: string;
    subtitulo: string;
    precio: string;
    precioNormal?: string;
    precioDetalle?: string;
    precioDetalleNormal?: string;
    aclaracion?: string;
    incluye: string[];
    noIncluye?: string[];
    nota: string;
    ctaTexto: string;
    ctaHref: string;
    destacado?: boolean;
};

const promos: Promo[] = [
    {
        id: 'landing',
        badge: 'Landing Express',
        paraQuien: 'Para el que recién arranca',
        titulo: 'Una página simple para estar en Google ya',
        subtitulo:
            'Si todavía no tenés web y querés algo rápido, profesional y sin pagar todos los meses. Lista en 2 semanas.',
        precio: '$350.000',
        precioDetalle: 'pago único, sin mensualidad',
        aclaracion: 'Precio preferencial para Quilmes y Zona Sur',
        incluye: [
            'Una página enfocada en que te contacten',
            'Diseño único, no una plantilla',
            'Preparada para aparecer en Google',
            'Botón de WhatsApp y formulario',
            'Te enseñamos a ver cuánta gente entra',
        ],
        noIncluye: [
            'Hosting y dominio mensual',
            'Cambios de contenido',
            'Soporte continuo',
        ],
        nota: 'Solo para los primeros 5 clientes',
        ctaTexto: 'Quiero mi landing',
        ctaHref: '/contact',
    },
    {
        id: 'local',
        badge: 'Negocio Local',
        paraQuien: 'Para el comercio de barrio',
        titulo: 'Que te encuentren los clientes de tu zona',
        subtitulo:
            'Para peluquerías, restaurantes, consultorios y comercios que viven de clientes del barrio. Que te busquen en Google y te encuentren.',
        precio: 'desde $450.000',
        precioNormal: '$650.000',
        precioDetalle: '+ $70.000/mes de cuidado',
        precioDetalleNormal: '(normal: $120.000/mes)',
        aclaracion: 'Exclusivo Quilmes, Bernal, Varela y Lomas',
        incluye: [
            'Web completa con hasta 5 secciones',
            'Te armamos la ficha de Google Maps',
            'Preparada para que te encuentren en tu zona',
            'Tu dominio propio, incluido',
            'Servidor, seguridad y backups',
            'Hasta 3 cambios de contenido por mes',
            'Estamos a un WhatsApp si algo falla',
        ],
        nota: 'Solo para los primeros 5 clientes',
        ctaTexto: 'Quiero el pack local',
        ctaHref: '/contact',
        destacado: true,
    },
    {
        id: 'profesional',
        badge: 'Web Profesional',
        paraQuien: 'Para la PYME que quiere crecer',
        titulo: 'Una web completa, con contenido y que crece',
        subtitulo:
            'Para estudios, consultoras y empresas que quieren una web seria, con blog, formularios avanzados y presencia digital de verdad.',
        precio: 'desde $750.000',
        precioNormal: '$1.100.000',
        precioDetalle: '+ $90.000/mes de cuidado',
        precioDetalleNormal: '(normal: $150.000/mes)',
        aclaracion: 'Precio preferencial para Quilmes y Zona Sur',
        incluye: [
            'Web completa con hasta 10 secciones',
            'Blog o sección de noticias',
            'Formularios avanzados (cotizador, reservas)',
            'Integraciones (WhatsApp, pagos, email)',
            'Tu dominio propio, incluido',
            'Servidor, seguridad y backups',
            'Hasta 10 cambios de contenido por mes',
            'Soporte prioritario por WhatsApp',
            'Reporte mensual de visitas',
        ],
        nota: 'Cupos limitados — máximo 3 al mes',
        ctaTexto: 'Quiero la web profesional',
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
                        PROMO FUNDADORES — SOLO PRIMEROS 5 CLIENTES
                    </span>
                    <h2 className={styles.promosTitle}>
                        Tres formas de arrancar,{' '}
                        <span className={styles.textGradient}>
                            según lo que necesites
                        </span>
                    </h2>
                    <p className={styles.promosSubtitle}>
                        No todos los negocios necesitan lo mismo. Elegí el pack
                        que mejor se adapta a tu momento. Los tres tienen precio
                        preferencial para Quilmes y Zona Sur hasta agotar los
                        primeros 5 cupos.
                    </p>
                </div>

                {/* Grid de promos */}
                <div className={styles.promosGrid}>
                    {promos.map((promo) => (
                        <div
                            key={promo.id}
                            className={`${styles.promoCard} ${promo.destacado
                                ? styles.promoCardDestacado
                                : ''
                                }`}
                        >
                            {promo.destacado && (
                                <span className={styles.promoPopularBadge}>
                                    El más pedido
                                </span>
                            )}

                            <span className={styles.promoBadge}>
                                {promo.badge}
                            </span>

                            {/* Para quién es */}
                            <span className={styles.promoParaQuien}>
                                {promo.paraQuien}
                            </span>

                            <h3 className={styles.promoTitle}>
                                {promo.titulo}
                            </h3>
                            <p className={styles.promoSubtitle}>
                                {promo.subtitulo}
                            </p>

                            {/* Precio */}
                            <div className={styles.promoPriceBlock}>
                                {promo.precioNormal && (
                                    <span className={styles.promoPriceNormal}>
                                        {promo.precioNormal}
                                    </span>
                                )}
                                <span className={styles.promoPrice}>
                                    {promo.precio}
                                </span>
                                {promo.precioDetalle && (
                                    <span className={styles.promoPriceDetail}>
                                        {promo.precioDetalle}
                                    </span>
                                )}
                                {promo.precioDetalleNormal && (
                                    <span
                                        className={
                                            styles.promoPriceDetailNormal
                                        }
                                    >
                                        {promo.precioDetalleNormal}
                                    </span>
                                )}
                                {promo.aclaracion && (
                                    <span className={styles.promoAclaracion}>
                                        {promo.aclaracion}
                                    </span>
                                )}
                            </div>

                            {/* Incluye */}
                            <ul className={styles.promoList}>
                                {promo.incluye.map((item, i) => (
                                    <li
                                        key={i}
                                        className={styles.promoListItem}
                                    >
                                        <span className={styles.promoCheck}>
                                            <FaCheck size={9} />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* No incluye (opcional) */}
                            {promo.noIncluye && (
                                <div className={styles.promoNoIncluye}>
                                    <span
                                        className={styles.promoNoIncluyeLabel}
                                    >
                                        No incluye:
                                    </span>
                                    <span
                                        className={
                                            styles.promoNoIncluyeItems
                                        }
                                    >
                                        {promo.noIncluye.join(' · ')}
                                    </span>
                                </div>
                            )}

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
                    Los precios son promocionales de lanzamiento. Válidos solo
                    para los primeros 5 clientes de Zona Sur. Después de esa fecha o al agotar los
                    cupos, los precios suben a los valores normales. El dominio
                    se registra a tu nombre (nosotros lo gestionamos y lo
                    pagamos) y está incluido en la cuota mensual.
                </p>
            </div>
        </section>
    );
}