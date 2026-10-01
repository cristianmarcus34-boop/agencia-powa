'use client';

import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import {
  FaCode, FaPaintBrush, FaRocket,
  FaClock, FaLightbulb, FaCheckCircle,
  FaHeart, FaHandshake, FaStar, FaLaptopCode,
  FaArrowRight,
  FaMedal, FaReact, FaNodeJs, FaPython, FaDocker,
  FaDatabase, FaCloud, FaBrain,
  FaChartLine
} from 'react-icons/fa';
import Script from 'next/script';
import styles from './about.module.css';

// ============================================================
// EQUIPO CORE (perfiles reales, con bio y foto)
// ============================================================
const TEAM_CORE = [
  {
    id: 'cristian',
    name: 'Cristian Marcus',
    role: 'Fundador & Arquitecto de Software',
    icon: <FaLaptopCode size={22} />,
    img: '/Cristianabout.png',
    imgClass: '',
    reverse: false,
    bio: [
      '<strong>15 años</strong> trabajando en desarrollo de software. Arranqué con proyectos chicos y fui profundizando en arquitectura, producto y resolución de problemas concretos.',

      'Me manejo con el <strong>stack moderno</strong> (Next.js, React, TypeScript, Supabase, Node.js, Django), pero lo que más me importa no es la tecnología: es <strong>entender qué necesitás y armarte algo que te sirva de verdad</strong>.',

      'Desarrollo sistemas de reservas, e-commerce y aplicaciones mobile. Para mí, <strong>el código es una herramienta: entender el problema y el contexto del negocio va primero</strong>.',

      'Me gusta trabajar con <strong>transparencia y buena onda</strong>. Si algo no lo sé, te lo digo. Si algo se puede hacer mejor, te lo propongo. Mi objetivo no es solo entregarte un proyecto, es que <strong>tengas ganas de volver a trabajar conmigo</strong>.'
    ],
    tags: [
      'React • Next.js',
      'Node.js • Django',
      'Cloud (AWS / Azure)',
      'CI/CD • DevOps',
      'Liderazgo técnico',
      'UX/UI desde el código'
    ]
  },
];

export default function AboutPage() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ===== INTERSECTION OBSERVER PARA REVEAL =====
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
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

  // ===== DATA =====
  const values = [
    {
      icon: <FaCode />,
      title: 'Excelencia Técnica',
      description: 'Código limpio, escalable y mantenible. Priorizamos las mejores prácticas y estándares de la industria.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Innovación Constante',
      description: 'Exploramos nuevas tecnologías y metodologías para ofrecer soluciones vanguardistas a tus desafíos.'
    },
    {
      icon: <FaHandshake />,
      title: 'Transparencia y Confianza',
      description: 'Comunicación clara y abierta en cada etapa del proyecto. No hay sorpresas, solo resultados.'
    },
    {
      icon: <FaHeart />,
      title: 'Pasión por el Detalle',
      description: 'Cada pixel, cada línea de código, cada interacción es cuidadosamente diseñada para la mejor experiencia.'
    },
  ];

  const technologyGroups = [
    {
      id: 'core',
      label: 'Stack principal',
      description: 'Tecnologías que usamos como base para diseñar, desarrollar y desplegar productos digitales.',
      technologies: [
        { name: 'React • Next.js', icon: <FaReact />, color: '#61dafb' },
        { name: 'TypeScript • JavaScript', icon: <FaCode />, color: '#3178c6' },
        { name: 'Node.js • Django', icon: <FaNodeJs />, color: '#68a063' },
        { name: 'PostgreSQL • Supabase', icon: <FaDatabase />, color: '#336791' },
        { name: 'Tailwind • Bootstrap', icon: <FaCode />, color: '#38bdf8' },
        { name: 'Vercel • Docker', icon: <FaDocker />, color: '#2496ed' },
      ]
    },
    {
      id: 'extended',
      label: 'Herramientas complementarias',
      description: 'Alternativas que evaluamos cuando el producto, las integraciones o la infraestructura lo requieren.',
      technologies: [
        { name: 'Vue • Angular • Svelte', icon: <FaCode />, color: '#4fc08d' },
        { name: 'Python • FastAPI • Flask', icon: <FaPython />, color: '#3776ab' },
        { name: 'MongoDB • Redis • MySQL', icon: <FaDatabase />, color: '#47a248' },
        { name: 'AWS • Azure • GCP', icon: <FaCloud />, color: '#ff9900' },
        { name: 'CI/CD • GitHub Actions', icon: <FaCode />, color: '#2088ff' },
        { name: 'IA • OpenAI • TensorFlow', icon: <FaBrain />, color: '#10a37f' },
      ]
    }
  ];

  const collaborationModel = [
    {
      id: 'scope',
      icon: <FaChartLine />,
      title: 'El alcance define el equipo',
      description: 'Evaluamos complejidad, integraciones, riesgos técnicos, plazos y contexto operativo de la empresa.'
    },
    {
      id: 'specialists',
      icon: <FaCode />,
      title: 'Especialistas cuando aportan valor',
      description: 'UX/UI, backend, datos, QA, infraestructura o seguridad se suman según las necesidades concretas del proyecto.'
    },
    {
      id: 'coordination',
      icon: <FaHandshake />,
      title: 'Una coordinación central',
      description: 'El fundador mantiene la visión integral, la comunicación y la coordinación técnica de cada etapa.'
    }
  ];

  // ============================================================
  // DEMOS DE PRODUCTO
  // ============================================================
  const casos = [
    {
      id: 'barberia',
      emoji: '✂️',
      rubro: 'Agenda online para barbería',
      problema: 'Coordinar la disponibilidad y recibir solicitudes de turno.',
      solucion: 'Demo de agenda con selección de horarios y panel de gestión.',
      resultado: 'Demostración funcional; no representa resultados comerciales medidos.'
    },
    {
      id: 'distribuidora',
      emoji: '📦',
      rubro: 'Gestión de stock y pedidos',
      problema: 'Visualizar productos, pedidos y movimientos desde un mismo lugar.',
      solucion: 'Concepto de panel administrativo con control de stock y reportes.',
      resultado: 'Demo conceptual; no representa un caso de cliente.'
    },
    {
      id: 'estudio',
      emoji: '⚖️',
      rubro: 'Sitio para estudio profesional',
      problema: 'Explicar servicios y facilitar un primer contacto claro.',
      solucion: 'Concepto de sitio institucional con contenido y formulario.',
      resultado: 'Demo conceptual; no representa un caso de cliente.'
    }
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Sobre Powa - Agencia Digital",
    "description": "Conoce al fundador de Powa y su modelo flexible para integrar especialistas según cada proyecto.",
    "url": "https://agencia-powa.vercel.app/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Powa Agency",
      "description": "Agencia Digital especializada en desarrollo web, UX/UI y estrategia digital.",
      "founder": {
        "@type": "Person",
        "name": "Cristian Marcus"
      },
      "employee": TEAM_CORE.map((member) => ({
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.role
      }))
    }
  };

  return (
    <>
      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <div className={styles.aboutWrapper}>
        <div className={styles.ambientGlow} />
        <div className={styles.ambientGlowSecondary} />

        <Container className="pb-5">

          {/* ===== HERO ===== */}
          <div className={`${styles.aboutHeroSection} text-center`}>
            <div className={styles.logoGlowContainer}>
              <Image
                src="/logo-agenciadigitalpowa-redondo.png"
                alt="Logo Powa"
                className={styles.aboutHeroLogo}
                width={120}
                height={120}
                priority
              />
              <div className={styles.pulseRing} />
              <div className={styles.pulseRingSecondary} />
            </div>

            <div className="mb-4">
              <span className={styles.badgePowa}>
                <FaMedal className={styles.badgeIcon} /> NUESTRA ESENCIA
              </span>
            </div>

            <h1 className={styles.aboutHeaderTitle}>
              La Mente <br />
              <span className={styles.textGradient}>detrás de Powa</span>
            </h1>

            <div className={styles.aboutIntroContainer}>
              <p className={styles.aboutIntroParagraph}>
                El fundador lidera cada solución y suma especialistas según el alcance, la sofisticación del proyecto y el contexto de la empresa contratante.
              </p>
            </div>

            <div className={styles.heroCTA}>
              <a
                href="https://wa.me/5491138305837"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroButton}
              >
                <FaRocket className={styles.heroButtonIcon} />
                Trabajemos Juntos
                <FaArrowRight className={styles.heroButtonArrow} />
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* PERFIL DEL FUNDADOR */}
          {/* ============================================================ */}
          <div ref={addToRefs} className={`${styles.teamHeader} ${styles.reveal}`}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <FaLaptopCode className={styles.sectionBadgeIcon} /> FUNDADOR
              </span>
              <h2 className={styles.sectionTitle}>
                Desarrollo a cargo <span className={styles.textGradient}>del fundador</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Hablás directamente con quien define la solución y se ocupa de desarrollarla.
              </p>
            </div>
          </div>

          {/* ===== PERFILES DEL EQUIPO CORE ===== */}
          {TEAM_CORE.map((member) => (
            <div
              key={member.id}
              ref={addToRefs}
              className={`${styles.profileGlassCard} ${styles.reveal}`}
            >
              <Row className={`align-items-center g-0 ${member.reverse ? 'flex-row-reverse' : ''}`}>
                <Col md={5}>
                  <div className={styles.profileImgFrame}>
                    <Image
                      src={member.img}
                      alt={`${member.name} - ${member.role}`}
                      className={`${styles.profileMainImg} ${member.imgClass ? styles[member.imgClass] : ''}`}
                      width={400}
                      height={500}
                    />
                    <Image
                      src="/logo-agenciadigitalpowa-redondo.png"
                      className={styles.cornerLogo}
                      alt="Powa Seal"
                      width={60}
                      height={60}
                    />
                  </div>
                </Col>
                <Col md={7}>
                  <div className="p-4 p-md-5">
                    <div className="d-flex align-items-center mb-2">
                      <div className={styles.profileIconWrapper}>
                        {member.icon}
                      </div>
                      <h2 className={styles.profileName}>{member.name}</h2>
                    </div>
                    <h4 className={styles.profileRole}>{member.role}</h4>

                    {member.bio.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={styles.profileBio}
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}

                    <div className={styles.expertiseTags}>
                      {member.tags.map((tag, idx) => (
                        <span key={idx}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ))}

          {/* ===== MODELO DE COLABORACIÓN ===== */}
          <div ref={addToRefs} className={`${styles.collabSection} ${styles.reveal}`}>
            <div className={styles.collabHeader}>
              <span className={styles.collabBadge}>
                <FaHandshake className="me-2" /> MODELO DE COLABORACIÓN
              </span>
              <h2 className={styles.collabTitle}>
                El equipo adecuado <span className={styles.textGradient}>para cada desafío</span>
              </h2>
              <p className={styles.collabSubtitle}>
                La estructura se define para cada proyecto: no trabajamos con un equipo fijo sobredimensionado ni asignamos perfiles que no hacen falta.
              </p>
            </div>

            <Row className="g-3 g-md-4">
              {collaborationModel.map((item) => (
                <Col key={item.id} xs={12} md={4}>
                  <div className={styles.collabCard}>
                    <div className={styles.collabIconWrapper}>{item.icon}</div>
                    <h3 className={styles.collabRole}>{item.title}</h3>
                    <p className={styles.collabDesc}>{item.description}</p>
                  </div>
                </Col>
              ))}
            </Row>

            <div className={styles.collabNote}>
              <FaLightbulb className={styles.collabNoteIcon} />
              <p>
                <strong>Transparencia desde el inicio.</strong> Antes de avanzar se acuerdan alcance, responsabilidades, perfiles necesarios, etapas e inversión. Los especialistas se incorporan solo cuando aportan al objetivo del proyecto.
              </p>
            </div>
          </div>

          {/* ===== TECNOLOGÍAS ===== */}
          <div ref={addToRefs} className={`${styles.techSection} ${styles.reveal}`}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <FaCode className={styles.sectionBadgeIcon} /> INGENIERÍA Y PRODUCTO
              </span>
              <h2 className={styles.sectionTitle}>
                Tecnología con <span className={styles.textGradient}>criterio</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Elegimos el stack según el problema, la operación y la evolución esperada de cada producto; no al revés.
              </p>
            </div>

            {technologyGroups.map((group) => (
              <section key={group.id} className={styles.techGroup}>
                <div className={styles.techGroupHeader}>
                  <h3 className={styles.techGroupTitle}>{group.label}</h3>
                  <p className={styles.techGroupDescription}>{group.description}</p>
                </div>
                <Row className="g-2 g-lg-3">
                  {group.technologies.map((tech) => (
                    <Col key={tech.name} xs={12} sm={6} lg={4}>
                      <div className={styles.techCard}>
                        <div className={styles.techIcon} style={{ color: tech.color }} aria-hidden="true">
                          {tech.icon}
                        </div>
                        <span className={styles.techName}>{tech.name}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </section>
            ))}
          </div>

          {/* ===== DEMOS FUNCIONALES ===== */}
          <div ref={addToRefs} className={`${styles.casesSection} ${styles.reveal}`}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <FaChartLine className={styles.sectionBadgeIcon} /> DEMOS FUNCIONALES
              </span>
              <h2 className={styles.sectionTitle}>
                Ideas aplicadas a <span className={styles.textGradient}>problemas concretos</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Prototipos para explorar flujos, interfaces y posibilidades técnicas.
              </p>
            </div>

            <Row className="g-4">
              {casos.map((caso) => (
                <Col key={caso.id} md={6} lg={4}>
                  <div className={styles.caseCard}>
                    <div className={styles.caseHeader}>
                      <span className={styles.caseEmoji}>{caso.emoji}</span>
                      <div>
                        <h3 className={styles.caseRubro}>{caso.rubro}</h3>
                        <span className={styles.caseUbicacion}>DEMO</span>
                      </div>
                    </div>

                    <div className={styles.caseBody}>
                      <div className={styles.caseRow}>
                        <span className={styles.caseLabel}>Problema</span>
                        <p className={styles.caseText}>{caso.problema}</p>
                      </div>

                      <div className={styles.caseRow}>
                        <span className={styles.caseLabel}>Solución</span>
                        <p className={styles.caseText}>{caso.solucion}</p>
                      </div>

                      <div className={`${styles.caseRow} ${styles.caseRowResult}`}>
                        <span className={styles.caseLabelResult}>Alcance</span>
                        <p className={styles.caseTextResult}>{caso.resultado}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <p className={styles.casesNote}>
              Son ejemplos de producto, no proyectos de clientes ni métricas verificadas.
            </p>
          </div>

          <div className={styles.midCTA}>
            <p>¿Tenés un proyecto parecido en mente?</p>
            <a href="https://wa.me/5491138305837" className={styles.midCTAButton}>
              Contame tu idea
            </a>
          </div>

          {/* ===== VALORES ===== */}
          <div className={styles.valuesSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <FaHeart className={styles.sectionBadgeIcon} /> NUESTROS PILARES
              </span>
              <h2 className={styles.sectionTitle}>
                Los valores que <span className={styles.textGradient}>nos definen</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Cuatro principios que guían cada decisión y cada línea de código que escribimos.
              </p>
            </div>

            <Row className="g-4">
              {values.map((value, index) => (
                <Col key={index} md={6} lg={3}>
                  <div
                    ref={addToRefs}
                    className={`${styles.valueCard} ${styles.reveal}`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className={styles.valueIcon}>{value.icon}</div>
                    <h3 className={styles.valueTitle}>{value.title}</h3>
                    <p className={styles.valueDescription}>{value.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* ===== PROCESO ===== */}
          <div className={styles.processSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <FaClock className={styles.sectionBadgeIcon} /> CÓMO TRABAJAMOS
              </span>
              <h2 className={styles.sectionTitle}>
                Nuestro <span className={styles.textGradient}>proceso</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Una metodología probada que garantiza resultados excepcionales.
              </p>
            </div>

            <Row className="g-4">
              {[
                { num: '01', icon: <FaCheckCircle />, title: 'Descubrimiento', desc: 'Entendemos tu negocio, objetivos y desafíos para definir la estrategia.' },
                { num: '02', icon: <FaPaintBrush />, title: 'Diseño', desc: 'Creamos experiencias visuales que conectan con tu audiencia y transmiten confianza.' },
                { num: '03', icon: <FaCode />, title: 'Desarrollo', desc: 'Escribimos código limpio y escalable, con entregas parciales cada 15 días.' },
                { num: '04', icon: <FaRocket />, title: 'Lanzamiento', desc: 'Desplegamos, monitoreamos y optimizamos para garantizar el éxito continuo.' }
              ].map((step, idx) => (
                <Col key={idx} md={3} sm={6}>
                  <div className={styles.processStep}>
                    <div className={styles.stepNumber}>{step.num}</div>
                    <div className={styles.stepIcon}>{step.icon}</div>
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                    <p className={styles.stepDescription}>{step.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* ===== CTA FINAL ===== */}
          <div className={styles.finalCTA}>
            <div className={styles.ctaContent}>
              <FaStar className={styles.ctaIcon} />
              <h3 className={styles.ctaTitle}>¿Listo para trabajar con el mejor equipo?</h3>
              <p className={styles.ctaText}>
                Contanos tu proyecto y te mostraremos cómo podemos transformar tu visión en realidad.
              </p>
              <a
                href="https://wa.me/5491138305837"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                <FaRocket className={styles.ctaButtonIcon} />
                Empezar ahora
                <FaArrowRight className={styles.ctaButtonArrow} />
              </a>
            </div>
          </div>

        </Container>
      </div>
    </>
  );
}