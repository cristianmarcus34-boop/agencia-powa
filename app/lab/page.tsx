'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';
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
  FaFileAlt, FaArrowRight
} from 'react-icons/fa';

import styles from './lab.module.css';

// ============================================
// TIPOS
// ============================================
type ToolType = 'optimizer' | 'roi' | 'video' | 'svg' | 'vitals' | 'schema' | 'font';

export default function LabPage() {
  // ===== STATE =====
  const [activeTool, setActiveTool] = useState<ToolType | null>('optimizer');
  const [feedbackEmail, setFeedbackEmail] = useState<string>('');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // ===== LEER PARÁMETRO DE URL =====
  const searchParams = useSearchParams();

  // ===== EFECTO PARA ABRIR LA HERRAMIENTA SEGÚN PARÁMETRO =====
  useEffect(() => {
    const toolParam = searchParams.get('tool');
    if (toolParam === 'roi') {
      setActiveTool('roi');
      setTimeout(() => {
        const roiElement = document.getElementById('roi-tool');
        if (roiElement) {
          roiElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [searchParams]);

  // ===== HANDLERS =====
  const toggleTool = (toolId: string): void => {
    setActiveTool(activeTool === toolId ? null : toolId as ToolType);
  };

  const handleFeedbackEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFeedbackEmail(e.target.value);
  };

  const handleFeedbackMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFeedbackMessage(e.target.value);
  };

  // ===== HANDLER PARA ENVÍO CON WEB3FORMS =====
  const handleFeedbackSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    if (!feedbackMessage.trim()) {
      setErrorMessage('Por favor, describí tu idea.');
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        access_key: '8aec62d9-0155-4c0b-ac90-929df1d972ef',
        name: feedbackEmail || 'Anónimo',
        email: feedbackEmail || 'anonimo@email.com',
        subject: '💡 Nueva idea para Powa Lab',
        message: `
💡 NUEVA IDEA PARA POWA LAB

📧 Email: ${feedbackEmail || 'No especificado'}
💡 Idea:
${feedbackMessage}

---
Enviado desde Powa Lab
https://agencia-powa.vercel.app/lab
        `,
        from_name: feedbackEmail || 'Anónimo',
        replyto: feedbackEmail || 'anonimo@email.com',
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar');
      }

      setIsSubmitted(true);
      setFeedbackEmail('');
      setFeedbackMessage('');
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('❌ Error al enviar. Intenta nuevamente.');
    }
    setIsLoading(false);
  };

  // ===== STATS DEL LAB =====
  const labStats = [
    { value: "7", label: "Herramientas Activas", icon: <FaFlask /> },
    { value: "99%", label: "Procesamiento Local", icon: <FaShieldAlt /> },
    { value: "0ms", label: "Latencia (Serverless)", icon: <FaClock /> },
    { value: "Open", label: "Beta Pública", icon: <FaRocket /> }
  ];

  // ===== INFO TIPS POR HERRAMIENTA =====
  const toolTips: Record<ToolType, { icon: React.ReactNode; title: string; text: string }> = {
    optimizer: {
      icon: <FaImages />,
      title: "💡 Tip Powa:",
      text: "Las imágenes optimizadas pueden mejorar la velocidad de carga en un <strong>60%</strong>, impactando directamente en tus conversiones."
    },
    roi: {
      icon: <FaChartLine />,
      title: "📊 Métrica Clave:",
      text: "Un ROI positivo es el indicador más importante de que tu estrategia digital está funcionando."
    },
    video: {
      icon: <FaCode />,
      title: "⚙️ Tecnología Powa:",
      text: "Utilizamos <strong>WebAssembly</strong> para procesar el video directamente en tu hardware, garantizando <strong>100% de privacidad</strong>."
    },
    svg: {
      icon: <FaCode />,
      title: "🎨 Optimización de SVG:",
      text: "Reduce el peso de tus gráficos vectoriales eliminando metadatos innecesarios y optimizando la estructura del código."
    },
    vitals: {
      icon: <FaRocket />,
      title: "🚀 Core Web Vitals:",
      text: "Google utiliza estas métricas para posicionar tu sitio. Mejora tu LCP, FID y CLS para dominar los buscadores."
    },
    schema: {
      icon: <FaStar />,
      title: "⭐ Schema Markup:",
      text: "Los datos estructurados mejoran tu visibilidad en Google y aumentan el CTR de tus resultados de búsqueda."
    },
    font: {
      icon: <FaCloudUploadAlt />,
      title: "🔤 Fuentes Optimizadas:",
      text: "Las fuentes web pueden sumar hasta 500ms al tiempo de carga. Optimizamos su carga para una experiencia instantánea."
    }
  };

  // ===== HERRAMIENTAS CONFIG =====
  const tools: { id: ToolType; icon: React.ReactNode; title: string; subtitle: string; status: string; color: string }[] = [
    { id: 'optimizer', icon: <FaImages />, title: 'Image Optimizer v1.0', subtitle: 'Reducción de peso sin pérdida de fidelidad', status: 'Activo', color: '#10b981' },
    { id: 'roi', icon: <FaCalculator />, title: 'ROI Business Metrics', subtitle: 'Calculá tu retorno de inversión en segundos', status: '💰 Nuevo', color: '#f59e0b' },
    { id: 'video', icon: <FaVideo />, title: 'Video Core Engine', subtitle: 'Compresión de video ultra-rápida (WASM)', status: 'Beta', color: '#8b5cf6' },
    { id: 'svg', icon: <FaImage />, title: 'SVG Optimizer', subtitle: 'Compresión de gráficos vectoriales sin pérdida', status: 'Nuevo', color: '#22d3ee' },
    { id: 'vitals', icon: <FaTachometerAlt />, title: 'Core Web Vitals Analyzer', subtitle: 'Mide el rendimiento de tu sitio en tiempo real', status: 'Nuevo', color: '#f472b6' },
    { id: 'schema', icon: <FaFileCode />, title: 'Schema Markup Generator', subtitle: 'Crea datos estructurados para SEO en segundos', status: 'Nuevo', color: '#f59e0b' },
    { id: 'font', icon: <FaFont />, title: 'Font Optimizer', subtitle: 'Carga de fuentes web optimizada y eficiente', status: 'Nuevo', color: '#10b981' }
  ];

  const toolComponents: Record<ToolType, React.ReactNode> = {
    optimizer: <ImageOptimizer />,
    roi: <RoiCalculator />,
    video: <VideoCompressor />,
    svg: <SvgOptimizer />,
    vitals: <WebVitalsAnalyzer />,
    schema: <SchemaGenerator />,
    font: <FontOptimizer />
  };

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

            {/* ===== HERRAMIENTAS ===== */}
            {tools.map((tool) => (
              <div
                key={tool.id}
                id={tool.id === 'roi' ? 'roi-tool' : undefined}
                className={`${styles.labAccordionItem} ${activeTool === tool.id ? styles.active : ''}`}
              >
                <div className={styles.labAccordionHeader} onClick={() => toggleTool(tool.id)}>
                  <div className="d-flex align-items-center">
                    <div className={`${styles.iconCircle} me-3`} style={{ borderColor: activeTool === tool.id ? tool.color : 'rgba(0,212,255,0.05)' }}>
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="mb-0 text-white">{tool.title}</h4>
                      <small className={styles.labSubtitleCustom}>{tool.subtitle}</small>
                    </div>
                  </div>
                  <div className={styles.headerRight}>
                    <span className={styles.toolStatus} style={{ color: tool.color, borderColor: tool.color + '44' }}>
                      {tool.status}
                    </span>
                    {activeTool === tool.id ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>

                {activeTool === tool.id && (
                  <div className={styles.labAccordionBody}>
                    <div className={styles.infoBoxLab}>
                      <span className={styles.infoIcon}>{toolTips[tool.id].icon}</span>
                      <div>
                        <strong>{toolTips[tool.id].title}</strong>
                        <span dangerouslySetInnerHTML={{ __html: toolTips[tool.id].text }} />
                      </div>
                    </div>
                    {toolComponents[tool.id]}
                  </div>
                )}
              </div>
            ))}

            {/* ===== FEEDBACK SECTION ===== */}
            <div className={styles.feedbackSection}>
              <div className={styles.feedbackHeader}>
                <FaStar className={styles.feedbackIcon} />
                <h5 className="text-white mb-2">¿Necesitás una herramienta a medida?</h5>
                <p className={styles.feedbackSubtext}>
                  Estamos expandiendo el laboratorio. Decinos qué proceso te gustaría automatizar.
                </p>
              </div>

              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              {isSubmitted ? (
                <div className={styles.feedbackSuccess}>
                  <FaPaperPlane className={styles.successIcon} />
                  <span className={styles.successText}>✅ ¡Gracias! Tu idea fue enviada. La evaluaremos pronto.</span>
                </div>
              ) : (
                <Form onSubmit={handleFeedbackSubmit} className={styles.feedbackForm}>
                  <Row className="g-3">
                    <Col md={4}>
                      <Form.Control
                        className={styles.formControlPowa}
                        placeholder="Tu email (opcional)"
                        value={feedbackEmail}
                        onChange={handleFeedbackEmailChange}
                        type="email"
                      />
                    </Col>
                    <Col md={5}>
                      <Form.Control
                        className={styles.formControlPowa}
                        placeholder="Ej: Optimizador de SVG, Analizador de SEO..."
                        value={feedbackMessage}
                        onChange={handleFeedbackMessageChange}
                        required
                      />
                    </Col>
                    <Col md={3}>
                      <Button type="submit" className={styles.btnPowaPrimary} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="me-2" /> Enviar Idea
                          </>
                        )}
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