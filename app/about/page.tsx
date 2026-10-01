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
// EQUIPO CORE
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
      '<strong>Hace 15 años</strong> que convivo con la tecnología. Arranqué conociendo una computadora cuando era pibe, casi como un juego, y nunca más me despegó.',

      'Con los años eso se volvió oficio: <strong>5 años desarrollando profesionalmente</strong>, metiéndome en arquitectura, producto y resolución de problemas concretos —los que de verdad importan cuando el cliente está esperando una respuesta.',

      'Me muevo con el <strong>stack moderno</strong> (Next.js, React, TypeScript, Supabase, Node.js, Django), pero te soy honesto: la tecnología es lo de menos. Lo que importa es <strong>entender qué necesitás y armarte algo que sirva de verdad</strong>, no un adorno lindo que se rompe a los dos meses.',

      'Si tenés una idea dando vueltas o un proyecto que no arranca, <strong>escribime y lo charlamos sin compromiso</strong>. La primera charla es para escucharte, no para venderte nada.'
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
      title: 'Código que se aguanta el tiempo',
      description: 'Escribimos pensando en el día después: fácil de mantener, fácil de escalar, difícil de romper.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Sin vueltas: probamos, medimos, elegimos',
      description: 'No nos casamos con ninguna tecnología. Elegimos la que mejor resuelve tu problema, no la que está de moda.'
    },
    {
      icon: <FaHandshake />,
      title: 'Si algo no lo sé, te lo digo',
      description: 'Preferimos la verdad incómoda antes que una promesa que no vamos a cumplir. Transparencia desde el día uno.'
    },
    {
      icon: <FaHeart />,
      title: 'Nos importa que vuelvas',
      description: 'No trabajamos para entregar y desaparecer. Trabajamos para que la próxima vez nos escribas sin dudar.'
    },
  ];

  const whyPowa = [
    {
      icon: <FaLaptopCode />,
      title: 'Hablás con quien desarrolla',
      desc: 'Sin vendedores ni intermediarios. La misma persona que te escucha es la que diseña y programa tu proyecto.'
    },
    {
      icon: <FaRocket />,
      title: 'Agencia chica, decisiones rápidas',
      desc: 'Sin comités ni burocracia. Lo que acordamos hoy, empieza mañana. Respuestas en horas, no en semanas.'
    },
    {
      icon: <FaMedal />,
      title: '15 años de tecnología, 5 de oficio',
      desc: 'Criterio real, no improvisación. Sabemos qué funciona, qué no y por qué. Y te lo explicamos sin tecnicismos.'
    }
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
                <FaHandshake className={styles.badgeIcon} /> LA HISTORIA DETRÁS DE POWA
              </span>
            </div>

            <h1 className={styles.aboutHeaderTitle}>
              Tecnología con oficio,<br />
              <span className={styles.textGradient}>trato con buena onda</span>
            </h1>

            <div className={styles.aboutIntroContainer}>
              <p className={styles.aboutIntroParagraph}>
                POWA es una agencia joven con <strong>15 años de tecnología encima</strong> y
                <strong> 5 desarrollando profesionalmente</strong>. Detrás hay una sola persona que
                diseña, desarrolla y te responde directo —sin intermediarios, sin chamuyo.
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
                Hablemos de tu proyecto
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
                <FaLaptopCode className={styles.sectionBadgeIcon} /> EL FUNDADOR
              </span>
              <h2 className={styles.sectionTitle}>
                El fundador, <span className={styles.textGradient}>en cada línea</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Hablás directo con quien diseña y desarrolla. Sin intermediarios.
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

          {/* ============================================================ */}
          {/* POR QUÉ POWA */}
          {/* ============================================================ */}
          <div ref={addToRefs} className={`${styles.whySection} ${styles.reveal}`}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <FaStar className={styles.sectionBadgeIcon} /> POR QUÉ POWA
              </span>
              <h2 className={styles.sectionTitle}>
                Tres razones <span className={styles.textGradient}>para elegirnos</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                No somos la agencia más grande. Somos la que te va a responder el WhatsApp.
              </p>
            </div>

            <Row className="g-3 g-md-4">
              {whyPowa.map((item, idx) => (
                <Col key={idx} xs={12} md={4}>
                  <div className={styles.whyCard}>
                    <div className={styles.whyIconWrapper}>{item.icon}</div>
                    <h3 className={styles.whyTitle}>{item.title}</h3>
                    <p className={styles.whyDesc}>{item.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

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
                Un método simple y transparente, pensado para que sepas en todo momento en qué etapa estás.
              </p>
            </div>

            <Row className="g-4">
              {[
                { num: '01', icon: <FaCheckCircle />, title: 'Descubrimiento', desc: 'Entendemos tu negocio, objetivos y desafíos para definir la estrategia.' },
                { num: '02', icon: <FaPaintBrush />, title: 'Diseño', desc: 'Creamos experiencias visuales que conectan con tu audiencia y transmiten confianza.' },
                { num: '03', icon: <FaCode />, title: 'Desarrollo', desc: 'Código limpio y escalable, con entregas parciales para que veas el avance real.' },
                { num: '04', icon: <FaRocket />, title: 'Lanzamiento', desc: 'Desplegamos, monitoreamos y optimizamos para que el producto siga creciendo.' }
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
              <h3 className={styles.ctaTitle}>¿Arrancamos?</h3>
              <p className={styles.ctaText}>
                Contanos qué tenés en mente. Te respondemos con honestidad, sin chamuyo y sin compromiso.
              </p>
              <a
                href="https://wa.me/5491138305837"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                <FaRocket className={styles.ctaButtonIcon} />
                Hablemos de tu proyecto
                <FaArrowRight className={styles.ctaButtonArrow} />
              </a>
            </div>
          </div>

        </Container>
      </div>
    </>
  );
}