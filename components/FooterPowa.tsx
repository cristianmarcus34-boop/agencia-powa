'use client';

import React from 'react';
import { Container } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';
import styles from './FooterPowa.module.css';

export default function FooterPowa() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.mainFooter}>
      <Container>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>
            © {currentYear} <span className="text-gradient fw-bold">Agencia Digital Powa</span>. 
            Todos los derechos reservados.
          </p>
          
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
      </Container>
    </footer>
  );
}