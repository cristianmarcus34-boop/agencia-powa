'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import ImageOptimizer from '@/components/ImageOptimizer';
import RoiCalculator from '@/components/RoiCalculator';
import VideoCompressor from '@/components/VideoCompressor';
import SvgOptimizer from '@/components/SvgOptimizer';
import WebVitalsAnalyzer from '@/components/WebVitalsAnalyzer';
import SchemaGenerator from '@/components/SchemaGenerator';
import FontOptimizer from '@/components/FontOptimizer';
import {
  FaFlask, FaChevronDown, FaChevronUp,
  FaPaperPlane, FaCalculator, FaImages, FaVideo,
  FaRocket, FaShieldAlt, FaClock, FaStar,
  FaCode, FaCloudUploadAlt, FaChartLine, FaCrown,
  FaFileCode, FaFont, FaTachometerAlt, FaImage,
  FaFileAlt
} from 'react-icons/fa';

import styles from './lab.module.css';

export default function LabPage() {
  const [activeTool, setActiveTool] = useState<'optimizer' | 'roi' | 'video' | 'svg' | 'vitals' | 'schema' | 'font' | null>('optimizer');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleTool = (tool: 'optimizer' | 'roi' | 'video' | 'svg' | 'vitals' | 'schema' | 'font') => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackEmail && feedbackMessage) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFeedbackEmail('');
        setFeedbackMessage('');
      }, 3000);
    }
  };

  // Stats del Lab
  const labStats = [
    { value: "7", label: "Herramientas Activas", icon: <FaFlask /> },
    { value: "99%", label: "Procesamiento Local", icon: <FaShieldAlt /> },
    { value: "0ms", label: "Latencia (Serverless)", icon: <FaClock /> },
    { value: "Open", label: "Beta Pública", icon: <FaRocket /> }
  ];

  return (
    <div className={styles.labPageWrapper}>
      {/* ===== GLOW AMBIENTAL ===== */}
      <div className={styles.ambientGlow} />
      <div className={styles.ambientGlowSecondary} />

      <Container>
        {/* ===== HERO SECTION ===== */}
        <header className="text-center mb-5">
          <div className={styles.heroBadge}>
            <FaCrown className={styles.heroBadgeIcon} />
            <span>HERRAMIENTAS EXPERIMENTALES</span>
          </div>

          <div className={styles.heroIconWrapper}>
            <FaFlask className={styles.labHeroIcon} />
            <div className={styles.heroPulseRing} />
          </div>

          <h1 className={styles.heroTitleMain}>
            Powa <span className={styles.textGradient}>Lab</span>
          </h1>
          <p className={styles.heroSubtitleModern}>
            Herramientas experimentales de ingeniería digital. Optimizamos cada bit
            y cada centavo de tu estrategia para alcanzar el <strong>máximo rendimiento</strong>.
          </p>

          {/* ===== STATS DEL LAB ===== */}
          <Row className={`${styles.labStats} g-3 justify-content-center mt-4`}>
            {labStats.map((stat, index) => (
              <Col key={index} xs={6} md={3}>
                <div className={styles.labStatCard}>
                  <div className={styles.labStatIcon}>{stat.icon}</div>
                  <div className={styles.labStatValue}>{stat.value}</div>
                  <div className={styles.labStatLabel}>{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </header>

        <Row className="justify-content-center">
          <Col lg={10}>

            {/* ===== SECTION DIVIDER ===== */}
            <div className={styles.sectionDivider}>
              <span className={styles.dividerLine} />
              <span className={styles.dividerText}>HERRAMIENTAS DISPONIBLES</span>
              <span className={styles.dividerLine} />
            </div>

            {/* ===== TOOL 1: IMAGE OPTIMIZER ===== */}
            <div className={`${styles.labAccordionItem} ${activeTool === 'optimizer' ? styles.active : ''}`}>
              <div className={styles.labAccordionHeader} onClick={() => toggleTool('optimizer')}>
                <div className="d-flex align-items-center">
                  <div className={`${styles.iconCircle} me-3`}>
                    <FaImages />
                  </div>
                  <div>
                    <h4 className="mb-0 text-white">Image Optimizer v1.0</h4>
                    <small className={styles.labSubtitleCustom}>
                      Reducción de peso sin pérdida de fidelidad
                    </small>
                  </div>
                </div>
                <div className={styles.headerRight}>
                  <span className={styles.toolStatus}>Activo</span>
                  {activeTool === 'optimizer' ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {activeTool === 'optimizer' && (
                <div className={styles.labAccordionBody}>
                  <div className={styles.infoBoxLab}>
                    <FaShieldAlt className={styles.infoIcon} />
                    <div>
                      <strong>💡 Tip Powa:</strong> Las imágenes optimizadas pueden mejorar la velocidad de carga en un <strong>60%</strong>, impactando directamente en tus conversiones.
                    </div>
                  </div>
                  <ImageOptimizer />
                </div>
              )}
            </div>

            {/* ===== TOOL 2: ROI CALCULATOR ===== */}
            <div className={`${styles.labAccordionItem} ${activeTool === 'roi' ? styles.active : ''}`}>
              <div className={styles.labAccordionHeader} onClick={() => toggleTool('roi')}>
                <div className="d-flex align-items-center">
                  <div className={`${styles.iconCircle} me-3`}>
                    <FaCalculator />
                  </div>
                  <div>
                    <h4 className="mb-0 text-white">ROI Business Metrics</h4>
                    <small className={styles.labSubtitleCustom}>
                      Calculadora de rentabilidad publicitaria
                    </small>
                  </div>
                </div>
                <div className={styles.headerRight}>
                  <span className={styles.toolStatus}>Activo</span>
                  {activeTool === 'roi' ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {activeTool === 'roi' && (
                <div className={styles.labAccordionBody}>
                  <div className={styles.infoBoxLab}>
                    <FaChartLine className={styles.infoIcon} />
                    <div>
                      <strong>📊 Métrica Clave:</strong> Un ROI positivo es el indicador más importante de que tu estrategia digital está funcionando.
                    </div>
                  </div>
                  <RoiCalculator />
                </div>
              )}
            </div>

            {/* ===== TOOL 3: VIDEO COMPRESSOR ===== */}
            <div className={`${styles.labAccordionItem} ${activeTool === 'video' ? styles.active : ''}`}>
              <div className={styles.labAccordionHeader} onClick={() => toggleTool('video')}>
                <div className="d-flex align-items-center">
                  <div className={`${styles.iconCircle} me-3`}>
                    <FaVideo />
                  </div>
                  <div>
                    <h4 className="mb-0 text-white">Video Core Engine</h4>
                    <small className={styles.labSubtitleCustom}>
                      Compresión de video ultra-rápida (WASM)
                    </small>
                  </div>
                </div>
                <div className={styles.headerRight}>
                  <span className={styles.toolStatus}>Beta</span>
                  {activeTool === 'video' ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {activeTool === 'video' && (
                <div className={styles.labAccordionBody}>
                  <div className={styles.infoBoxLab}>
                    <FaCode className={styles.infoIcon} />
                    <div>
                      <strong>⚙️ Tecnología Powa:</strong> Utilizamos <strong>WebAssembly</strong> para procesar el video directamente en tu hardware, garantizando <strong>100% de privacidad</strong>.
                    </div>
                  </div>
                  <VideoCompressor />
                </div>
              )}
            </div>

            {/* ===== TOOL 4: SVG OPTIMIZER ===== */}
            <div className={`${styles.labAccordionItem} ${activeTool === 'svg' ? styles.active : ''}`}>
              <div className={styles.labAccordionHeader} onClick={() => toggleTool('svg')}>
                <div className="d-flex align-items-center">
                  <div className={`${styles.iconCircle} me-3`}>
                    <FaImage />
                  </div>
                  <div>
                    <h4 className="mb-0 text-white">SVG Optimizer</h4>
                    <small className={styles.labSubtitleCustom}>
                      Compresión de gráficos vectoriales sin pérdida
                    </small>
                  </div>
                </div>
                <div className={styles.headerRight}>
                  <span className={styles.toolStatus}>Nuevo</span>
                  {activeTool === 'svg' ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {activeTool === 'svg' && (
                <div className={styles.labAccordionBody}>
                  <div className={styles.infoBoxLab}>
                    <FaCode className={styles.infoIcon} />
                    <div>
                      <strong>🎨 Optimización de SVG:</strong> Reduce el peso de tus gráficos vectoriales eliminando metadatos innecesarios y optimizando la estructura del código.
                    </div>
                  </div>
                  <SvgOptimizer />
                </div>
              )}
            </div>

            {/* ===== TOOL 5: WEB VITALS ANALYZER ===== */}
            <div className={`${styles.labAccordionItem} ${activeTool === 'vitals' ? styles.active : ''}`}>
              <div className={styles.labAccordionHeader} onClick={() => toggleTool('vitals')}>
                <div className="d-flex align-items-center">
                  <div className={`${styles.iconCircle} me-3`}>
                    <FaTachometerAlt />
                  </div>
                  <div>
                    <h4 className="mb-0 text-white">Core Web Vitals Analyzer</h4>
                    <small className={styles.labSubtitleCustom}>
                      Mide el rendimiento de tu sitio en tiempo real
                    </small>
                  </div>
                </div>
                <div className={styles.headerRight}>
                  <span className={styles.toolStatus}>Nuevo</span>
                  {activeTool === 'vitals' ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {activeTool === 'vitals' && (
                <div className={styles.labAccordionBody}>
                  <div className={styles.infoBoxLab}>
                    <FaRocket className={styles.infoIcon} />
                    <div>
                      <strong>🚀 Core Web Vitals:</strong> Google utiliza estas métricas para posicionar tu sitio. Mejora tu LCP, FID y CLS para dominar los buscadores.
                    </div>
                  </div>
                  <WebVitalsAnalyzer />
                </div>
              )}
            </div>

            {/* ===== TOOL 6: SCHEMA GENERATOR ===== */}
            <div className={`${styles.labAccordionItem} ${activeTool === 'schema' ? styles.active : ''}`}>
              <div className={styles.labAccordionHeader} onClick={() => toggleTool('schema')}>
                <div className="d-flex align-items-center">
                  <div className={`${styles.iconCircle} me-3`}>
                    <FaFileCode />
                  </div>
                  <div>
                    <h4 className="mb-0 text-white">Schema Markup Generator</h4>
                    <small className={styles.labSubtitleCustom}>
                      Crea datos estructurados para SEO en segundos
                    </small>
                  </div>
                </div>
                <div className={styles.headerRight}>
                  <span className={styles.toolStatus}>Nuevo</span>
                  {activeTool === 'schema' ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {activeTool === 'schema' && (
                <div className={styles.labAccordionBody}>
                  <div className={styles.infoBoxLab}>
                    <FaStar className={styles.infoIcon} />
                    <div>
                      <strong>⭐ Schema Markup:</strong> Los datos estructurados mejoran tu visibilidad en Google y aumentan el CTR de tus resultados de búsqueda.
                    </div>
                  </div>
                  <SchemaGenerator />
                </div>
              )}
            </div>

            {/* ===== TOOL 7: FONT OPTIMIZER ===== */}
            <div className={`${styles.labAccordionItem} ${activeTool === 'font' ? styles.active : ''}`}>
              <div className={styles.labAccordionHeader} onClick={() => toggleTool('font')}>
                <div className="d-flex align-items-center">
                  <div className={`${styles.iconCircle} me-3`}>
                    <FaFont />
                  </div>
                  <div>
                    <h4 className="mb-0 text-white">Font Optimizer</h4>
                    <small className={styles.labSubtitleCustom}>
                      Carga de fuentes web optimizada y eficiente
                    </small>
                  </div>
                </div>
                <div className={styles.headerRight}>
                  <span className={styles.toolStatus}>Nuevo</span>
                  {activeTool === 'font' ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {activeTool === 'font' && (
                <div className={styles.labAccordionBody}>
                  <div className={styles.infoBoxLab}>
                    <FaCloudUploadAlt className={styles.infoIcon} />
                    <div>
                      <strong>🔤 Fuentes Optimizadas:</strong> Las fuentes web pueden sumar hasta 500ms al tiempo de carga. Optimizamos su carga para una experiencia instantánea.
                    </div>
                  </div>
                  <FontOptimizer />
                </div>
              )}
            </div>

            {/* ===== FEEDBACK SECTION ===== */}
            <div className={styles.feedbackSection}>
              <div className={styles.feedbackHeader}>
                <FaStar className={styles.feedbackIcon} />
                <h5 className="text-white mb-2">¿Necesitás una herramienta a medida?</h5>
                <p className={styles.feedbackSubtext}>
                  Estamos expandiendo el laboratorio. Decinos qué proceso te gustaría automatizar.
                </p>
              </div>

              {isSubmitted ? (
                <div className={styles.feedbackSuccess}>
                  <FaPaperPlane className={styles.successIcon} />
                  <span className={styles.successText}>¡Gracias! Tu idea fue enviada. La evaluaremos pronto.</span>
                </div>
              ) : (
                <Form onSubmit={handleFeedbackSubmit} className={styles.feedbackForm}>
                  <Row className="g-3">
                    <Col md={4}>
                      <Form.Control
                        className={styles.formControlPowa}
                        placeholder="Tu email (opcional)"
                        value={feedbackEmail}
                        onChange={(e) => setFeedbackEmail(e.target.value)}
                      />
                    </Col>
                    <Col md={5}>
                      <Form.Control
                        className={styles.formControlPowa}
                        placeholder="Ej: Optimizador de SVG, Analizador de SEO..."
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                        required
                      />
                    </Col>
                    <Col md={3}>
                      <Button type="submit" className={styles.btnPowaPrimary}>
                        <FaPaperPlane className="me-2" /> Enviar Idea
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </div>

            {/* ===== STATS TÉCNICAS ===== */}
            <div className={styles.techStatsSection}>
              <div className={styles.techStatsGrid}>
                <div className={styles.techStatItem}>
                  <FaCloudUploadAlt className={styles.techStatIcon} />
                  <div>
                    <span className={styles.techStatLabel}>Procesamiento</span>
                    <span className={styles.techStatValue}>100% Local</span>
                  </div>
                </div>
                <div className={styles.techStatItem}>
                  <FaShieldAlt className={styles.techStatIcon} />
                  <div>
                    <span className={styles.techStatLabel}>Privacidad</span>
                    <span className={styles.techStatValue}>Garantizada</span>
                  </div>
                </div>
                <div className={styles.techStatItem}>
                  <FaClock className={styles.techStatIcon} />
                  <div>
                    <span className={styles.techStatLabel}>Tiempo de Procesamiento</span>
                    <span className={styles.techStatValue}>&lt; 1s</span>
                  </div>
                </div>
                <div className={styles.techStatItem}>
                  <FaCode className={styles.techStatIcon} />
                  <div>
                    <span className={styles.techStatLabel}>Tecnología</span>
                    <span className={styles.techStatValue}>WASM + React</span>
                  </div>
                </div>
              </div>
            </div>

          </Col>
        </Row>

        {/* ===== FOOTER ===== */}
        <footer className={styles.labFooter}>
          <span>&copy; {new Date().getFullYear()} Powa Lab</span>
          <span className={styles.footerDot}>•</span>
          <span>Todos los datos se procesan localmente en tu navegador</span>
          <span className={styles.footerDot}>•</span>
          <span>v3.0 - 7 Herramientas</span>
        </footer>
      </Container>
    </div>
  );
}