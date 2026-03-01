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
              <FaMapMarkerAlt className="text-cyan-400 me-2" />
              <span>Villa La Florida • San Francisco Solano • Quilmes, AR</span>
            </div>
          </Col>

          {/* Lado Derecho: Redes Sociales */}
          <Col md={6}>
            <div className={styles.footerRight}>
              <div className={styles.socialWrapper}>
                <a href="https://github.com/CristianMarcus" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/cristian-marcus2025/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="https://www.instagram.com/agenciadigitalpowa" target="_blank" rel="noopener noreferrer" className={`${styles.socialLink} ${styles.instagram}`} aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="mailto:cristianmarcus34@gmail.com" className={styles.socialLink} aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* Mini Texto SEO (invisible pero legible para Google) */}
        <div className={styles.seoTagline}>
          Software Factory y Consultoría IT en Zona Sur. Expertos en transformación digital para comercios y empresas de Quilmes y alrededores.
        </div>
      </Container>
    </footer>
  );
}