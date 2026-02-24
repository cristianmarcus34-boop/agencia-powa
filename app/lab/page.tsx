'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import ImageOptimizer from '@/components/ImageOptimizer';
import RoiCalculator from '@/components/RoiCalculator';
import { 
  FaFlask, FaChevronDown, FaChevronUp, 
  FaLock, FaPaperPlane, FaCalculator, FaImages 
} from 'react-icons/fa';

// Importamos el CSS Module
import styles from './lab.module.css';

export default function LabPage() {
  const [activeTool, setActiveTool] = useState<'optimizer' | 'roi' | null>('optimizer');

  const toggleTool = (tool: 'optimizer' | 'roi') => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  return (
    <div className={styles.labPageWrapper}>
      <Container>
        {/* --- HERO SECTION --- */}
        <header className="text-center mb-5 animate-fade-in">
          <FaFlask className={`${styles.labHeroIcon} animate-pulse`} />
          <h1 className={styles.heroTitleMain}>
            Powa <span className={styles.textGradient}>Lab</span>
          </h1>
          <p className={`${styles.heroSubtitleModern} mx-auto`}>
            Herramientas experimentales de ingeniería digital. Optimizamos cada bit 
            y cada centavo de tu estrategia para alcanzar el máximo rendimiento.
          </p>
        </header>

        <Row className="justify-content-center">
          <Col lg={10}>
            
            {/* --- TOOL 1: OPTIMIZER --- */}
            <div className={`${styles.labAccordionItem} ${activeTool === 'optimizer' ? styles.active : ''}`}>
              <div className={styles.labAccordionHeader} onClick={() => toggleTool('optimizer')}>
                <div className="d-flex align-items-center">
                  <div className={`${styles.iconCircle} me-3`}>
                    <FaImages />
                  </div>
                  <div>
                    <h4 className="mb-0 text-white">Image Optimizer v1.0</h4>
                    {/* CAMBIO: Usamos la clase del módulo para legibilidad */}
                    <small className={styles.labSubtitleCustom}>
                      Reducción de peso sin pérdida de fidelidad
                    </small>
                  </div>
                </div>
                {activeTool === 'optimizer' ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              
              {activeTool === 'optimizer' && (
                <div className={`${styles.labAccordionBody} animate-fade-in`}>
                  <div className={`${styles.infoBoxLab} mb-4`}>
                    <strong>💡 Tip Powa:</strong> Las imágenes optimizadas pueden mejorar la velocidad de carga en un 60%, impactando directamente en tus conversiones.
                  </div>
                  <ImageOptimizer />
                </div>
              )}
            </div>

            {/* --- TOOL 2: ROI CALCULATOR --- */}
            <div className={`${styles.labAccordionItem} ${activeTool === 'roi' ? styles.active : ''}`}>
              <div className={styles.labAccordionHeader} onClick={() => toggleTool('roi')}>
                <div className="d-flex align-items-center">
                  <div className={`${styles.iconCircle} me-3`}>
                    <FaCalculator />
                  </div>
                  <div>
                    <h4 className="mb-0 text-white">ROI Business Metrics</h4>
                    {/* CAMBIO: Usamos la clase del módulo para legibilidad */}
                    <small className={styles.labSubtitleCustom}>
                      Calculadora de rentabilidad publicitaria
                    </small>
                  </div>
                </div>
                {activeTool === 'roi' ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              
              {activeTool === 'roi' && (
                <div className={`${styles.labAccordionBody} animate-fade-in`}>
                  <RoiCalculator />
                </div>
              )}
            </div>

            {/* --- TOOL 3: LOCKED (Coming Soon) --- */}
            <div className={`${styles.labAccordionItem} ${styles.locked}`}>
              <div className={styles.labAccordionHeader}>
                <div className="d-flex align-items-center opacity-50">
                  <div className={`${styles.iconCircle} me-3`}>
                    <FaLock />
                  </div>
                  <div>
                    <h4 className="mb-0 text-white">Video Core Engine</h4>
                    {/* CAMBIO: Usamos la clase del módulo para legibilidad */}
                    <small className={styles.labSubtitleCustom}>
                      Compresión de video ultra-rápida
                    </small>
                  </div>
                </div>
                <span className={styles.lockedBadgeMini}>Próximamente</span>
              </div>
            </div>

            {/* --- FEEDBACK SECTION --- */}
            <div className="mt-5 p-4 rounded-4 text-center animate-fade-in" 
                 style={{background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)'}}>
              <h5 className="text-white mb-3">¿Necesitás una herramienta a medida?</h5>
              {/* CAMBIO: Quitamos text-muted y usamos la clase del módulo */}
              <p className={`small mb-4 ${styles.labSubtitleCustom}`}>
                Estamos expandiendo el laboratorio. Decinos qué proceso te gustaría automatizar.
              </p>
              <div className="d-flex justify-content-center">
                <div className="input-group" style={{maxWidth: '500px'}}>
                  <Form.Control 
                    className={`${styles.formControlPowa} bg-dark border-0 text-white`} 
                    placeholder="Ej: Optimizador de SVG..." 
                  />
                  <Button className={styles.btnPowaPrimary}>
                    <FaPaperPlane className="me-2" /> Enviar Idea
                  </Button>
                </div>
              </div>
            </div>

          </Col>
        </Row>

        <footer className={`mt-5 text-center small pb-5 ${styles.labSubtitleCustom}`}>
          &copy; 2026 Powa Lab // Todos los datos se procesan localmente en tu navegador.
        </footer>
      </Container>
    </div>
  );
}