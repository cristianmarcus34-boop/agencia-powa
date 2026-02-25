"use client"; // Necesario para manejar el estado de las animaciones de scroll
import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaCode, FaPaintBrush } from 'react-icons/fa';
import styles from './about.module.css';

export default function AboutPage() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15, // Se activa cuando el 15% de la tarjeta es visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealActive);
        }
      });
    }, observerOptions);

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className={styles.aboutWrapper}>
      <Container className="pb-5">
        
        {/* SECCIÓN HERO */}
        <div className={`${styles.aboutHeroSection} text-center`}>
          <div className={styles.logoGlowContainer}>
            <Image 
              src="/logo-agenciadigitalpowa-redondo.png" 
              alt="Logo Powa" 
              className={styles.aboutHeroLogo}
            />
          </div>
          
          <div className="mb-4">
            <span className={styles.badgePowa}>NUESTRA ESENCIA</span>
          </div>

          <h1 className={`${styles.aboutHeaderTitle} text-gradient`}>
            La Mente detrás de Powa
          </h1>

          <div className={styles.aboutIntroContainer}>
            <p className={styles.aboutIntroParagraph}>
              No solo escribimos código; diseñamos <strong>herramientas estratégicas</strong> para el éxito.
              <br className="d-none d-md-block" /> 
              En Agencia Digital Powa, fusionamos la <span>ingeniería avanzada</span> con una estética premium.
            </p>
          </div>
        </div>

        {/* Perfil Cristian */}
        <div ref={addToRefs} className={`${styles.profileGlassCard} ${styles.reveal}`}>
          <Row className="align-items-center g-0">
            <Col md={5}>
              <div className={styles.profileImgFrame}>
                <Image
                  src="/Cristianabout.png"
                  alt="Cristian Marcus"
                  className={styles.profileMainImg}
                />
                <Image 
                  src="/logo-agenciadigitalpowa-redondo.png"
                  className={styles.cornerLogo}
                  alt="Powa Seal"
                />
              </div>
            </Col>
            <Col md={7}>
              <div className="p-4 p-md-5">
                <div className="d-flex align-items-center mb-2">
                  <FaCode className="text-info me-3" size={24} />
                  <h2 className={styles.profileName}>Cristian</h2>
                </div>
                <h4 className={styles.profileRole}>Founder & Lead Powa Developer</h4>
                <p className={styles.profileBio}>
                  Con <strong>5 años de trayectoria</strong>, mi enfoque es la arquitectura de software robusta. 
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
        <div ref={addToRefs} className={`${styles.profileGlassCard} ${styles.reveal}`}>
          <Row className="align-items-center g-0 flex-row-reverse">
            <Col md={5}>
              <div className={styles.profileImgFrame}>
                <Image
                  src="/marianaabout.png"
                  alt="Mariana UX Designer"
                  className={`${styles.profileMainImg} ${styles.imgMariana}`}
                />
                <Image 
                  src="/logo-agenciadigitalpowa-redondo.png"
                  className={styles.cornerLogo}
                  alt="Powa Seal"
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
                <p className={styles.profileBio}>
                  Experta en crear interfaces que no solo atraen, sino que <strong>convierten</strong>. 
                  Su enfoque estratégico asegura que cada interacción sea intuitiva y efectiva.
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