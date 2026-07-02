'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './FooterPowa.module.css';

export default function FooterPowa() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.mainFooter}>
      <Container>
        <Row className="align-items-center gy-4">
          {/* Lado Izquierdo: Copyright y Localidad */}
          <Col md={6} className="text-center text-md-start">
            <p className={styles.copyright}>
              © {currentYear} <span className="text-gradient fw-bold">Agencia Digital Powa</span>
            </p>
            <div className={styles.locationInfo}>
              <FaMapMarkerAlt className={styles.locationIcon} />
              <span>Quilmes, Argentina</span>
            </div>
          </Col>

          {/* Lado Derecho: Redes Sociales */}
          <Col md={6}>
            <div className={styles.footerRight}>
              <div className={styles.socialWrapper}>
                {/* GitHub - Redirige a WhatsApp para consultar */}
                <a
                  href="https://wa.me/5491138305837?text=Hola!%20Quiero%20consultar%20por%20el%20c%C3%B3digo%20de%20GitHub%20de%20Powa%20Digital..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Consultar por código de GitHub"
                  title="Consultar por código de GitHub"
                >
                  <FaGithub />
                </a>

                {/* LinkedIn - Redirige a WhatsApp para consultar */}
                <a
                  href="https://wa.me/5491138305837?text=Hola!%20Quiero%20consultar%20por%20el%20perfil%20de%20LinkedIn%20de%20Powa%20Digital..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Consultar por LinkedIn"
                  title="Consultar por LinkedIn"
                >
                  <FaLinkedin />
                </a>

                {/* Instagram - Enlace directo */}
                <a
                  href="https://www.instagram.com/agenciadigitalpowa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} ${styles.instagram}`}
                  aria-label="Seguir en Instagram a Powa Digital"
                >
                  <FaInstagram />
                </a>

                {/* Email - Enlace directo */}
                <a
                  href="mailto:agenciadigitalpowa@gmail.com"
                  className={styles.socialLink}
                  aria-label="Enviar correo electrónico a Powa Digital"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* Marcado SEO: Ahora con mejor contraste para Lighthouse */}
        <div className={styles.seoTagline}>
          <p>
            <strong>Software Factory &amp; Consultoría IT con base en Zona Sur.</strong><br />
            Diseñamos, desarrollamos y escalamos productos digitales de alto impacto para empresas y comercios de <strong>Latinoamérica y el mundo</strong>.
            Combinamos ingeniería de software senior, arquitectura cloud-native e inteligencia artificial para entregar soluciones robustas, seguras y preparadas para expandirse a cualquier mercado.
          </p>
        </div>
      </Container>
    </footer>
  );
}