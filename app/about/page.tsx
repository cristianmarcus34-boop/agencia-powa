'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import {
  FaCode, FaPaintBrush, FaRocket, FaUsers,
  FaShieldAlt, FaClock, FaAward, FaLightbulb,
  FaCheckCircle, FaHeart, FaHandshake, FaStar,
  FaLaptopCode, FaPalette, FaArrowRight, FaQuoteRight,
  FaMedal, FaReact, FaNodeJs, FaPython, FaDocker,
  FaDatabase, FaCloud, FaBrain
} from 'react-icons/fa';
import Script from 'next/script';
import styles from './about.module.css';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ projects: 0, clients: 0, experience: 0 });
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  // ===== ANIMACIÓN DE CONTADORES =====
  useEffect(() => {
    if (isVisible && !statsAnimated) {
      setStatsAnimated(true);
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let currentProjects = 0;
      let currentClients = 0;
      let currentExperience = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);

        const targetProjects = 24;
        const targetClients = 24;
        const targetExperience = 7;

        currentProjects = Math.round(eased * targetProjects);
        currentClients = Math.round(eased * targetClients);
        currentExperience = Math.round(eased * targetExperience);

        setCounters({
          projects: currentProjects,
          clients: currentClients,
          experience: currentExperience
        });

        if (step >= steps) {
          setCounters({
            projects: targetProjects,
            clients: targetClients,
            experience: targetExperience
          });
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible, statsAnimated]);

  // ===== INTERSECTION OBSERVER =====
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

  // ===== STATS OBSERVER =====
  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => statsObserver.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  // ===== DATA =====
  const stats = [
    { icon: <FaRocket />, value: `${counters.projects}+`, label: 'Proyectos Entregados' },
    { icon: <FaUsers />, value: `${counters.clients}+`, label: 'Clientes Satisfechos' },
    { icon: <FaClock />, value: `${counters.experience}+`, label: 'Años de Experiencia' },
    { icon: <FaAward />, value: '99%', label: 'Satisfacción' },
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
    { name: 'React / Next.js', icon: <FaReact />, color: '#61dafb' },
    { name: 'Node.js', icon: <FaNodeJs />, color: '#68a063' },
    { name: 'Python / Django', icon: <FaPython />, color: '#3776ab' },
    { name: 'Docker / Kubernetes', icon: <FaDocker />, color: '#2496ed' },
    { name: 'PostgreSQL / MongoDB', icon: <FaDatabase />, color: '#336791' },
    { name: 'AWS / Azure / GCP', icon: <FaCloud />, color: '#ff9900' },
    // ===== NUEVAS TECNOLOGÍAS =====
    { name: 'Inteligencia Artificial (OpenAI)', icon: <FaBrain />, color: '#10a37f' },
    { name: 'TypeScript', icon: <FaCode />, color: '#3178c6' },
    { name: 'GraphQL', icon: <FaCode />, color: '#e10098' },
    { name: 'Redis / RabbitMQ', icon: <FaDatabase />, color: '#dc382d' },
    { name: 'Terraform / IaC', icon: <FaCloud />, color: '#7b42bc' },
    { name: 'Kubernetes / DevOps', icon: <FaDocker />, color: '#326ce5' },
  ];

  const testimonials = [
    {
      quote: "Powa transformó nuestra plataforma en tiempo récord. La arquitectura que implementaron nos permitió escalar de 500 a 15,000 usuarios sin problemas.",
      author: "Carlos R.",
      role: "CEO, FintechPro"
    },
    {
      quote: "El rediseño aumentó nuestras conversiones en un 180%. El equipo entendió perfectamente nuestra audiencia.",
      author: "Laura M.",
      role: "CMO, EcomStore"
    }
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Sobre Powa - Agencia Digital",
    "description": "Conoce a Powa, la agencia digital que fusiona ingeniería avanzada con diseño premium.",
    "url": "https://agencia-powa.vercel.app/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Powa Agency",
      "description": "Agencia Digital especializada en desarrollo web, UX/UI y estrategia digital.",
      "founder": {
        "@type": "Person",
        "name": "Cristian Marcus"
      },
      "employee": [
        {
          "@type": "Person",
          "name": "Mariana Juarez",
          "jobTitle": "Head of Design & UX Strategy"
        }
      ]
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
                No solo escribimos código; diseñamos <strong>herramientas estratégicas</strong> para el éxito.
                <br className="d-none d-md-block" />
                En Agencia Digital Powa, fusionamos la <span>ingeniería avanzada</span> con una estética premium.
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
                    className={`${styles.statCard} ${isVisible ? styles.statVisible : ''}`}
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
          {/* PERFIL CRISTIAN - CON TODO EL CONTENIDO ORIGINAL */}
          {/* ============================================================ */}
          <div ref={addToRefs} className={`${styles.profileGlassCard} ${styles.reveal}`}>
            <Row className="align-items-center g-0">
              <Col md={5}>
                <div className={styles.profileImgFrame}>
                  <Image
                    src="/Cristianabout.png"
                    alt="Cristian Marcus - Founder & Lead Developer"
                    className={styles.profileMainImg}
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
                      <FaLaptopCode size={22} />
                    </div>
                    <h2 className={styles.profileName}>Cristian Marcus</h2>
                  </div>
                  <h4 className={styles.profileRole}>CTO & Lead Software Architect</h4>

                  <p className={styles.profileBio}>
                    Con <strong>más de 15 años de experiencia</strong> en el mundo del software, he aprendido que el mejor código no es el más complejo, sino el que resuelve problemas reales con simplicidad y elegancia. Mi viaje comenzó con proyectos pequeños, y hoy lidero arquitecturas que mueven negocios enteros.
                  </p>
                  <p className={styles.profileBio}>
                    Mi especialidad es el <strong>stack moderno</strong>: Next.js, React, TypeScript, Tailwind CSS, Supabase, Node.js y Django. Pero más allá de las tecnologías, lo que realmente me apasiona es <strong>diseñar soluciones escalables, seguras y mantenibles</strong> que no solo funcionen hoy, sino que crezcan con el negocio.
                  </p>
                  <p className={styles.profileBio}>
                    He liderado proyectos de alta complejidad como <strong>sistemas de reservas con integración de pagos</strong>, <strong>e-commerce escalables</strong> y <strong>aplicaciones mobile nativas</strong>. Cada proyecto me ha enseñado que la tecnología es solo una herramienta; el verdadero valor está en <strong>entender al usuario y al negocio</strong>.
                  </p>
                  <p className={styles.profileBio}>
                    <strong>Lo que me diferencia:</strong> No solo desarrollo, también <strong>diseño la experiencia de usuario desde el código</strong>. Creo prototipos funcionales, optimizo la interacción en tiempo real y construyo interfaces que no solo se ven bien, sino que <strong>funcionan de forma intuitiva y rápida</strong>. Mi enfoque combina la <strong>arquitectura escalable</strong> con la <strong>optimización de performance</strong>, asegurando que cada solución esté preparada para crecer.
                  </p>
                  <p className={styles.profileBio}>
                    Detrás de cada línea de código hay personas, por eso priorizo la <strong>comunicación clara</strong> y la <strong>transparencia</strong> en cada etapa del proyecto. No vendo líneas de código; vendo <strong>soluciones que funcionan</strong> y <strong>confianza</strong>. Mi mayor satisfacción no es escribir código perfecto, sino ver cómo una herramienta digital transforma un negocio y mejora la vida de quienes la usan.
                  </p>

                  <div className={styles.expertiseTags}>
                    <span>React • Next.js</span>
                    <span>Node.js • Django</span>
                    <span>Cloud Architecture (AWS/Azure)</span>
                    <span>CI/CD • DevOps</span>
                    <span>Team Leadership</span>
                    <span>UX/UI desde el código</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* ============================================================ */}
          {/* PERFIL MARIANA - CON TODO EL CONTENIDO ORIGINAL */}
          {/* ============================================================ */}
          <div ref={addToRefs} className={`${styles.profileGlassCard} ${styles.reveal}`}>
            <Row className="align-items-center g-0 flex-row-reverse">
              <Col md={5}>
                <div className={styles.profileImgFrame}>
                  <Image
                    src="/marianaabout.png"
                    alt="Mariana - UX/UI Designer & Strategy Manager"
                    className={`${styles.profileMainImg} ${styles.imgMariana}`}
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
                      <FaPalette size={22} />
                    </div>
                    <h2 className={styles.profileName}>Mariana Juarez</h2>
                  </div>
                  <h4 className={styles.profileRole}>Head of Design & UX Strategy</h4>

                  <p className={styles.profileBio}>
                    Mariana lidera la dirección creativa y estratégica de Powa, con <strong>6 años de experiencia</strong> en diseño de productos digitales y consultoría de experiencia de usuario. Ha trabajado en proyectos para <strong>startups, fintechs y empresas de retail</strong>, diseñando interfaces que combinan usabilidad con objetivos comerciales.
                  </p>
                  <p className={styles.profileBio}>
                    Su metodología se basa en la <strong>investigación de usuarios</strong> y la <strong>validación continua</strong>, asegurando que cada decisión de diseño esté respaldada por datos. Especialista en <strong>sistemas de diseño</strong> y transformación digital, ayuda a las empresas a traducir su identidad de marca en experiencias digitales coherentes y efectivas.
                  </p>
                  <p className={styles.profileBio}>
                    <strong>Lo que la diferencia:</strong> Mariana no solo diseña lo que se ve, sino <strong>cómo se siente</strong>. Su enfoque en la <strong>psicología del usuario</strong> y la <strong>arquitectura de la información</strong> garantiza que cada interacción sea clara, fluida y emocionalmente conectada con la marca.
                  </p>

                  <div className={styles.expertiseTags}>
                    <span>UX Research • User Testing</span>
                    <span>Figma • Design Systems</span>
                    <span>Product Strategy</span>
                    <span>Branding • Visual Identity</span>
                    <span>Design Thinking</span>
                    <span>Canva • Adobe Creative Suite</span>
                  </div>
                </div>
              </Col>
            </Row>
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
                El ecosistema de herramientas que utilizamos para construir soluciones de clase mundial.
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

          {/* ===== TESTIMONIOS ===== */}
          <div ref={addToRefs} className={`${styles.testimonialsSection} ${styles.reveal}`}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <FaQuoteRight className={styles.sectionBadgeIcon} /> TESTIMONIOS
              </span>
              <h2 className={styles.sectionTitle}>
                Lo que dicen <span className={styles.textGradient}>nuestros clientes</span>
              </h2>
            </div>

            <Row className="g-4">
              {testimonials.map((t, idx) => (
                <Col key={idx} md={6}>
                  <div className={styles.testimonialCard}>
                    <FaQuoteRight className={styles.testimonialQuoteIcon} />
                    <p className={styles.testimonialText}>"{t.quote}"</p>
                    <div className={styles.testimonialAuthor}>
                      <strong>{t.author}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
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