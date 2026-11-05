// components/FooterPowa.tsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import styles from "./FooterPowa.module.css";

export default function FooterPowa() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.mainFooter}>
      <Container>
        {/* ===== FILA PRINCIPAL ===== */}
        <Row className="align-items-start gy-4">
          {/* Lado Izquierdo: Marca + ubicación + disponibilidad */}
          <Col lg={4} md={6} className="text-center text-md-start">
            <p className={styles.copyright}>
              © {currentYear}{" "}
              <span className="text-gradient fw-bold">Agencia Digital Powa</span>
            </p>
            <div className={styles.locationInfo}>
              <FaMapMarkerAlt className={styles.locationIcon} />
              <span>Quilmes, Argentina · Desde 2024</span>
            </div>

            {/* Badge de disponibilidad */}
            <div className={styles.availabilityBadge}>
              <span className={styles.availabilityDot}></span>
              Disponible para nuevos proyectos
            </div>
          </Col>

          {/* Centro: Contacto visible */}
          <Col lg={4} md={6} className="text-center text-md-start">
            <div className={styles.footerContact}>
              <a
                href="mailto:agenciadigitalpowa@gmail.com"
                className={styles.footerContactItem}
              >
                <FaEnvelope className={styles.footerContactIcon} />
                <span>agenciadigitalpowa@gmail.com</span>
              </a>
              <a
                href="https://wa.me/5491138305837?text=Hola%20Powa!%20Quiero%20consultar%20por%20un%20proyecto"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerContactItem}
              >
                <FaWhatsapp className={styles.footerContactIcon} />
                <span>+54 9 11 3830-5837</span>
              </a>
            </div>
          </Col>

          {/* Derecha: Redes Sociales + CTA */}
          <Col lg={4} md={12}>
            <div className={styles.footerRight}>
              <div className={styles.socialWrapper}>
                <a
                  href="https://www.linkedin.com/in/cristian-marcus2025/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} ${styles.linkedin}`}
                  aria-label="Consultar por LinkedIn"
                  title="Consultar por LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.instagram.com/agenciadigitalpowa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} ${styles.instagram}`}
                  aria-label="Seguir en Instagram a Powa Digital"
                  title="Seguir en Instagram a Powa Digital"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://x.com/Cristiandepowa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} ${styles.twitter}`}
                  aria-label="Seguir en X (Twitter) a Powa Digital"
                  title="Seguir en X (Twitter) a Powa Digital"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="https://wa.me/5491138305837?text=Hola%20Powa!%20Quiero%20consultar%20por%20un%20proyecto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} ${styles.whatsapp}`}
                  aria-label="Contactar por WhatsApp"
                  title="Contactar por WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>

              {/* CTA */}
              <Link href="/contact" className={styles.footerCta}>
                Presupuesto sin cargo <FaArrowRight className={styles.footerCtaArrow} />
              </Link>
            </div>
          </Col>
        </Row>

        {/* ===== LINKS DEL FOOTER (3 columnas) ===== */}
        <div className={styles.footerLinks}>
          <div className={styles.footerLinksGroup}>
            <span className={styles.footerLinksLabel}>Navegación</span>
            <Link href="/servicios">Servicios</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/about">Sobre nosotros</Link>
          </div>
          <div className={styles.footerLinksGroup}>
            <span className={styles.footerLinksLabel}>Servicios</span>
            <Link href="/planes/servicios/desarrollo">Desarrollo Web</Link>
            <Link href="/apps">Aplicaciones Nativas Android/IOS</Link>
            <Link href="/planes/servicios/desarrollo">Automatización</Link>
            <Link href="/planes/servicios/desarrollo">Integración IA</Link>
            <Link href="/planes">Mantenimiento</Link>
          </div>
          <div className={styles.footerLinksGroup}>
            <span className={styles.footerLinksLabel}>Recursos</span>
            <Link href="/planes">Planes</Link>
            <Link href="/desarrollo-web-quilmes">Desarrollo Web Quilmes</Link>
            <Link href="/contact">Contacto</Link>
            <Link href="/gracias">Gracias</Link>
          </div>
        </div>

        {/* ===== SEO TAGLINE (sutil) ===== */}
        <div className={styles.seoTagline}>
          <p>
            <strong>Software Factory &amp; Consultoría IT</strong> con base en Zona Sur.
            Diseñamos, desarrollamos y escalamos productos digitales de alto impacto
            para empresas y comercios de <strong>Latinoamérica y el mundo</strong>.
          </p>
        </div>
      </Container>
    </footer>
  );
}