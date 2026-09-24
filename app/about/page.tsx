'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import {
  FaCode, FaPaintBrush, FaRocket, FaUsers,
  FaAward, FaClock, FaLightbulb, FaCheckCircle,
  FaHeart, FaHandshake, FaStar, FaLaptopCode,
  FaPalette, FaArrowRight, FaQuoteRight,
  FaMedal, FaReact, FaNodeJs, FaPython, FaDocker,
  FaDatabase, FaCloud, FaBrain,
  FaBug, FaTasks, FaVial, FaServer, FaMobileAlt,
  FaChartLine, FaSearch, FaShieldAlt, FaPlug, FaMapMarkerAlt
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
      '<strong>15 años</strong> haciendo esto. No me considero un genio, pero sí alguien que <strong>aprendió a resolver problemas reales</strong> con el tiempo. Arranqué con proyectos chicos y hoy lidero arquitecturas para negocios que ya juegan en primera.',

      'Me manejo con el <strong>stack moderno</strong> (Next.js, React, TypeScript, Supabase, Node.js, Django), pero lo que más me importa no es la tecnología: es <strong>entender qué necesitás y armarte algo que te sirva de verdad</strong>.',

      'Laburé en sistemas de reservas con pagos, e-commerce que crecieron mucho y apps mobile nativas. Cada proyecto me enseñó lo mismo: <strong>el código es solo una herramienta, vos y tu negocio son lo importante</strong>.',

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
  {
    id: 'mariana',
    name: 'Mariana Juarez',
    role: 'Head of Design & UX Strategy',
    icon: <FaPalette size={22} />,
    img: '/marianaabout.png',
    imgClass: 'imgMariana',
    reverse: true,
    // Mariana en 1ª persona:
    bio: [
      'Soy Mariana y me ocupo del diseño y la estrategia en Powa. Hace <strong>6 años</strong> que diseño productos digitales para <strong>startups, fintechs y retail</strong>, y aprendí que lo más importante no es que la web sea "linda", sino que <strong>la gente la entienda y la use</strong>.',

      'Mi forma de trabajar es simple: <strong>primero escucho al usuario, después diseño</strong>. Testeo, mido y ajusto hasta que queda redondo. Soy especialista en <strong>sistemas de diseño</strong> y me aseguro de que tu marca se vea bien en todos lados.',

      'Lo que me hace distinta es que <strong>no diseño solo para la vista</strong>: pienso en cómo se siente navegar tu producto. Que sea claro, rápido y que no te haga renegar. Si algo no funciona, lo cambio sin drama.'
    ],
    tags: [
      'UX Research • Testing',
      'Figma • Design Systems',
      'Estrategia de producto',
      'Branding • Identidad visual',
      'Design Thinking',
      'Adobe Creative Suite'
    ]
  }
];

// ============================================================
// COLABORADORES ON-DEMAND (sin nombres, solo roles)
// ============================================================
const COLABORADORES = [
  {
    id: 'frontend',
    icon: <FaCode />,
    role: 'Desarrolladores Frontend',
    desc: 'Especialistas en React, Next.js y Vue que dan vida a las interfaces.'
  },
  {
    id: 'backend',
    icon: <FaServer />,
    role: 'Desarrolladores Backend',
    desc: 'Expertos en Node.js, Python y bases de datos que construyen la lógica.'
  },
  {
    id: 'mobile',
    icon: <FaMobileAlt />,
    role: 'Desarrolladores Mobile',
    desc: 'Creamos apps nativas y cross-platform para iOS y Android.'
  },
  {
    id: 'qa',
    icon: <FaBug />,
    role: 'QA & Testers',
    desc: 'Validan cada funcionalidad antes de que llegue al cliente final.'
  },
  {
    id: 'devops',
    icon: <FaDocker />,
    role: 'DevOps Engineers',
    desc: 'Automatizan deploys, monitorean infraestructura y optimizan costos cloud.'
  },
  {
    id: 'ux',
    icon: <FaPalette />,
    role: 'Diseñadores UX/UI',
    desc: 'Prototipan, testean y refinan cada pantalla para maximizar conversión.'
  },
  {
    id: 'seo',
    icon: <FaSearch />,
    role: 'Especialistas SEO',
    desc: 'Posicionan tu negocio en Google con estrategias técnicas y de contenido.'
  },
  {
    id: 'security',
    icon: <FaShieldAlt />,
    role: 'Consultores de Seguridad',
    desc: 'Auditan y blindan aplicaciones críticas contra vulnerabilidades.'
  }
];

export default function AboutPage() {
  const [counters, setCounters] = useState({ projects: 0, clients: 0, experience: 0 });
  const [statsAnimated, setStatsAnimated] = useState(false);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement | null>(null);

  // ===== ANIMACIÓN DE CONTADORES + OBSERVER (TODO EN UNO) =====
  useEffect(() => {
    if (statsAnimated) return;

    const targetProjects = 13;
    const targetClients = 10;
    const targetExperience = 5;

    const startCounter = () => {
      setStatsAnimated(true);

      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);

        setCounters({
          projects: Math.round(eased * targetProjects),
          clients: Math.round(eased * targetClients),
          experience: Math.round(eased * targetExperience),
        });

        if (step >= steps) {
          setCounters({
            projects: targetProjects,
            clients: targetClients,
            experience: targetExperience,
          });
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    };

    // Si no hay IntersectionObserver, arrancamos directo
    if (typeof IntersectionObserver === 'undefined') {
      startCounter();
      return;
    }

    const element = statsRef.current;

    // Si no hay ref todavía, arrancamos directo
    if (!element) {
      startCounter();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounter();
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(element);

    // Failsafe: si en 3 segundos no se disparó, arranca igual
    const failsafe = setTimeout(() => {
      if (!statsAnimated) {
        startCounter();
      }
    }, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, [statsAnimated]);

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
  const stats = [
    { icon: <FaRocket />, value: `${counters.projects}`, label: 'Proyectos en producción' },
    { icon: <FaUsers />, value: `${counters.clients}+`, label: 'Clientes activos' },
    { icon: <FaClock />, value: `${counters.experience}+`, label: 'Años en el rubro' },
    { icon: <FaHeart />, value: '100%', label: 'Código propio' },
  ];

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

  const technologies = [
    // ===== NUESTRO CORE (lo que usamos siempre) =====
    { name: 'React • Next.js', icon: <FaReact />, color: '#61dafb', nivel: 'core' },
    { name: 'TypeScript • JavaScript', icon: <FaCode />, color: '#3178c6', nivel: 'core' },
    { name: 'Node.js • Django', icon: <FaNodeJs />, color: '#68a063', nivel: 'core' },
    { name: 'PostgreSQL • Supabase', icon: <FaDatabase />, color: '#336791', nivel: 'core' },
    { name: 'Tailwind • Bootstrap', icon: <FaCode />, color: '#38bdf8', nivel: 'core' },
    { name: 'Vercel • Docker', icon: <FaDocker />, color: '#2496ed', nivel: 'core' },

    // ===== TAMBIÉN MANEJAMOS =====
    { name: 'Vue • Angular • Svelte', icon: <FaCode />, color: '#4fc08d', nivel: 'secundario' },
    { name: 'Python • FastAPI • Flask', icon: <FaPython />, color: '#3776ab', nivel: 'secundario' },
    { name: 'MongoDB • Redis • MySQL', icon: <FaDatabase />, color: '#47a248', nivel: 'secundario' },
    { name: 'AWS • Azure • GCP', icon: <FaCloud />, color: '#ff9900', nivel: 'secundario' },
    { name: 'CI/CD • GitHub Actions', icon: <FaCode />, color: '#2088ff', nivel: 'secundario' },
    { name: 'IA • OpenAI • TensorFlow', icon: <FaBrain />, color: '#10a37f', nivel: 'secundario' },
  ];

  // ============================================================
  // CASOS REALES (reemplaza a "testimonials")
  // ============================================================
  const casos = [
    {
      id: 'barberia',
      emoji: '✂️',
      rubro: 'Barbería',
      ubicacion: 'Quilmes, Buenos Aires',
      problema: 'Perdían turnos por WhatsApp y no tenían control de la agenda.',
      solucion: 'Sistema de reservas online con pago anticipado y panel de gestión.',
      resultado: 'Hoy gestionan 3x más turnos sin sumar personal.'
    },
    {
      id: 'distribuidora',
      emoji: '📦',
      rubro: 'Distribuidora',
      ubicacion: 'Avellaneda, Buenos Aires',
      problema: 'Llevaban stock y pedidos en planillas de Excel que se rompían.',
      solucion: 'Panel de administración con control de stock, pedidos y reportes.',
      resultado: 'Ahorran 15 horas semanales de trabajo administrativo.'
    },
    {
      id: 'estudio',
      emoji: '⚖️',
      rubro: 'Estudio contable',
      ubicacion: 'La Plata, Buenos Aires',
      problema: 'La web vieja no los representaba y no aparecían en Google.',
      solucion: 'Rediseño completo con SEO técnico y formulario de contacto.',
      resultado: 'Duplicaron las consultas mensuales en 4 meses.'
    }
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Sobre Powa - Agencia Digital",
    "description": "Conoce al equipo de Powa, la agencia digital que fusiona ingeniería avanzada con diseño premium.",
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
                Código, diseño y estrategia para que tu negocio funcione mejor.
                Un equipo senior que te acompaña de principio a fin,
                sin vueltas y sin intermediarios.
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

          {/* ===== STATS ===== */}
          <div ref={statsRef} className={styles.statsSection}>
            <Row className="g-4">
              {stats.map((stat, index) => (
                <Col key={index} md={3} sm={6}>
                  <div
                    className={`${styles.statCard} ${statsAnimated ? styles.statVisible : ''}`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className={styles.statIcon}>{stat.icon}</div>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* ============================================================ */}
          {/* SECCIÓN EQUIPO CORE */}
          {/* ============================================================ */}
          <div ref={addToRefs} className={`${styles.teamHeader} ${styles.reveal}`}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <FaUsers className={styles.sectionBadgeIcon} /> EQUIPO CORE
              </span>
              <h2 className={styles.sectionTitle}>
                Las personas <span className={styles.textGradient}>detrás del código</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Un equipo compacto de especialistas senior que lidera cada proyecto de punta a punta.
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
          {/* SECCIÓN COLABORADORES ON-DEMAND */}
          {/* ============================================================ */}
          <div ref={addToRefs} className={`${styles.collabSection} ${styles.reveal}`}>
            <div className={styles.collabHeader}>
              <span className={styles.collabBadge}>
                <FaHandshake className={styles.sectionBadgeIcon} /> COLABORADORES ON-DEMAND
              </span>
              <h2 className={styles.collabTitle}>
                Especialistas que se suman <span className={styles.textGradient}>según el proyecto</span>
              </h2>
              <p className={styles.collabSubtitle}>
                Trabajamos con una red de profesionales senior que se integran al equipo cuando el proyecto lo requiere.
                Esto nos permite <strong>escalar rápido</strong> sin perder calidad ni comprometer plazos.
              </p>
            </div>

            <Row className="g-3 g-md-4">
              {COLABORADORES.map((colab, index) => (
                <Col key={colab.id} xs={12} sm={6} lg={3}>
                  <div
                    className={styles.collabCard}
                    style={{ transitionDelay: `${index * 0.05}s` }}
                  >
                    <div className={styles.collabIconWrapper}>
                      {colab.icon}
                    </div>
                    <h3 className={styles.collabRole}>{colab.role}</h3>
                    <p className={styles.collabDesc}>{colab.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>

            <div className={styles.collabNote}>
              <FaLightbulb className={styles.collabNoteIcon} />
              <p>
                <strong>¿Por qué trabajamos así?</strong> Porque cada proyecto es distinto.
                No todos necesitan un equipo completo de 10 personas, ni todos pueden resolverse con 2.
                Armamos el equipo <strong>a medida</strong> de tu proyecto, tu presupuesto y tus tiempos.
              </p>
            </div>
          </div>

          {/* ===== TECNOLOGÍAS ===== */}
          <div ref={addToRefs} className={`${styles.techSection} ${styles.reveal}`}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <FaCode className={styles.sectionBadgeIcon} /> STACK TECNOLÓGICO
              </span>
              <h2 className={styles.sectionTitle}>
                Tecnologías que <span className={styles.textGradient}>dominamos</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                El ecosistema de herramientas que utilizamos para construir soluciones.
              </p>
            </div>

            <Row className="g-3">
              {technologies.map((tech, index) => (
                <Col key={index} xs={6} md={4} lg={3}>
                  <div className={styles.techCard}>
                    <div className={styles.techIcon} style={{ color: tech.color }}>
                      {tech.icon}
                    </div>
                    <span className={styles.techName}>{tech.name}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* ===== CASOS REALES ===== */}
          <div ref={addToRefs} className={`${styles.casesSection} ${styles.reveal}`}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <FaChartLine className={styles.sectionBadgeIcon} /> CASOS REALES
              </span>
              <h2 className={styles.sectionTitle}>
                Problemas que <span className={styles.textGradient}>resolvimos</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Casos concretos de clientes que confiaron en nosotros.
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
                        <span className={styles.caseUbicacion}>
                          <FaMapMarkerAlt className={styles.caseUbicacionIcon} />
                          {caso.ubicacion}
                        </span>
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
                        <span className={styles.caseLabelResult}>Resultado</span>
                        <p className={styles.caseTextResult}>{caso.resultado}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <p className={styles.casesNote}>
              * Por privacidad, algunos clientes prefieren mantener su nombre en reserva.
              Si querés referencias directas, te las pasamos cuando hablemos.
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