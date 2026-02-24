import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaCode, FaPaintBrush } from 'react-icons/fa';
import styles from './about.module.css';

export const metadata = {
  title: 'Sobre Nosotros | Agencia Digital Powa',
  description: 'Conoce al equipo de Powa Digital. Expertos en desarrollo web y diseño UX/UI en Quilmes.',
};

export default function AboutPage() {
  return (
    <div className={styles.aboutWrapper}>
      <Container className="pb-5">
        
        {/* SECCIÓN HERO */}
        <div className={`${styles.aboutHeroSection} text-center mb-5`}>
          <div className={styles.logoGlowContainer}>
            <Image 
              src="/logo-agenciadigitalpowa-redondo.png" 
              alt="Logo Powa" 
              className={styles.aboutHeroLogo}
            />
          </div>
          
          <div className="mb-3">
            <span className="badge-powa">NUESTRA ESENCIA</span>
          </div>

          <h1 className={`${styles.aboutHeaderTitle} text-gradient`}>La Mente detrás de Powa</h1>
          <p className={`${styles.aboutIntroParagraph} mx-auto`}>
            No solo escribimos código; diseñamos <strong>herramientas estratégicas</strong> para el éxito. 
            En Agencia Digital Powa, fusionamos la ingeniería avanzada con una estética premium.
          </p>
        </div>

        {/* Perfil Cristian */}
        <div className={styles.profileGlassCard}>
          <Row className="align-items-center g-0">
            <Col md={5}>
              <div className={styles.profileImgFrame}>
                <Image
                  src="/Cristianabout.png"
                  alt="Cristian Marcus"
                  className={styles.profileMainImg}
                />
              </div>
            </Col>
            <Col md={7}>
              <div className="p-4 p-md-5">
                <div className="d-flex align-items-center mb-2">
                  <FaCode className="text-info me-3" size={24} />
                  <h2 className={styles.profileName}>Cristian Marcus</h2>
                </div>
                <h4 className={styles.profileRole}>Founder & Lead Powa Developer</h4>
                <p className="text-slate-400 mt-4">
                  Con 5 años de trayectoria, mi enfoque es la arquitectura de software robusta. 
                  Creo en la colaboración transparente: cada línea de código está diseñada para 
                  alinearse con tus objetivos de negocio.
                </p>
                <div className={styles.expertiseTags}>
                  <span>React</span><span>Django</span><span>Cloud Architecture</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Perfil Mariana */}
        <div className={styles.profileGlassCard}>
          <Row className="align-items-center g-0 flex-row-reverse">
            <Col md={5}>
              <div className={styles.profileImgFrame}>
                <Image
                  src="/marianaabout.png"
                  alt="Mariana UX Designer"
                  className={`${styles.profileMainImg} ${styles.imgMariana}`}
                />
              </div>
            </Col>
            <Col md={7}>
              <div className="p-4 p-md-5">
                <div className="d-flex align-items-center mb-2">
                  <FaPaintBrush className="text-info me-3" size={22} />
                  <h2 className={styles.profileName}>Mariana</h2>
                </div>
                <h4 className={styles.profileRole}>UX/UI Designer & Strategy Manager</h4>
                <p className="text-slate-400 mt-4">
                  Experta en crear interfaces que no solo atraen, sino que convierten. Su enfoque 
                  estratégico asegura que cada interacción sea intuitiva y efectiva.
                </p>
                <div className={styles.expertiseTags}>
                  <span>UX Research</span><span>Figma</span><span>Strategy</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}