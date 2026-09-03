'use client';

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

// Iconos
import {
    FaCode, FaArrowRight, FaDatabase, FaMobileAlt, FaRocket,
    FaMapMarkerAlt, FaSearch, FaCogs, FaCheckCircle, FaShieldAlt,
    FaFileContract, FaLock, FaUsers, FaChartLine, FaClock,
    FaStar, FaQuoteRight, FaWhatsapp, FaCloudUploadAlt,
    FaAward, FaBrain, FaLightbulb, FaHandshake,
    FaUser, FaCalculator, FaMoneyBillWave, FaChartBar,
    FaCloud, FaPalette, FaAws // ✅ AGREGÁ FaAws y FaCloud
} from 'react-icons/fa';

import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import {
    SiReact, SiNodedotjs, SiTypescript, SiNextdotjs, SiDocker,
    SiPostgresql, SiSupabase,
    SiTailwindcss, SiVercel, SiJavascript, SiRedux,
    SiPython, SiDjango, SiFlask, SiFastapi, SiGraphql,
    SiMongodb, SiRedis, SiElasticsearch, SiApachekafka,
    SiKubernetes, SiTerraform, SiAnsible, SiGithubactions,
    SiJenkins, SiPrometheus, SiGrafana,
    SiAngular, SiVuedotjs, SiSvelte, SiSolidity,
    SiRust, SiGo, SiSpring, SiLaravel, SiPhp,
    SiFirebase, SiNetlify, SiCloudflare,
    SiMysql, SiSqlite, SiPrisma, SiSequelize,
    SiFigma, SiSketch,
    SiJest, SiCypress, SiMocha,
    SiWebpack, SiBabel, SiNpm, SiYarn,
    SiPytorch, SiTensorflow, SiKeras,
    SiLinux, SiUbuntu, SiDebian, SiNginx,
    SiApache, SiNatsdotio, SiRabbitmq
} from 'react-icons/si';

import styles from './page.module.css';
import HeroWrapper from '../components/hero3d/HeroWrapper';

export default function HomePage() {
    // ===== STATE PARA DIAGNÓSTICO =====
    const [diagnosticoEmail, setDiagnosticoEmail] = useState('');
    const [diagnosticoEnviado, setDiagnosticoEnviado] = useState(false);

    const handleDiagnosticoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (diagnosticoEmail) {
            setDiagnosticoEnviado(true);
            console.log('Email para diagnóstico:', diagnosticoEmail);
            setTimeout(() => {
                setDiagnosticoEnviado(false);
                setDiagnosticoEmail('');
            }, 5000);
        }
    };

    // ===== HOOKS DE IN VIEW =====
    const options = { triggerOnce: true, threshold: 0.1 };
    const [refStack] = useInView(options);
    const [refServices] = useInView(options);
    const [refBudget] = useInView(options);
    const [refProcess] = useInView(options);
    const [refSecurity] = useInView(options);
    const [refCta] = useInView(options);
    const [refTestimonials] = useInView(options);
    const [refStats] = useInView(options);
    const [refROI] = useInView(options);

    // ===== 🚀 TECH STACK AMPLIADO =====
    const techStack = [
        { id: "react", icon: <SiReact color="#61DAFB" />, name: "React" },
        { id: "nextjs", icon: <SiNextdotjs color="#ffffff" />, name: "Next.js" },
        { id: "angular", icon: <SiAngular color="#DD0031" />, name: "Angular" },
        { id: "vue", icon: <SiVuedotjs color="#4FC08D" />, name: "Vue.js" },
        { id: "svelte", icon: <SiSvelte color="#FF3E00" />, name: "Svelte" },
        { id: "typescript", icon: <SiTypescript color="#3178C6" />, name: "TypeScript" },
        { id: "javascript", icon: <SiJavascript color="#F7DF1E" />, name: "JavaScript" },
        { id: "tailwind", icon: <SiTailwindcss color="#38BDF8" />, name: "Tailwind" },
        { id: "nodejs", icon: <SiNodedotjs color="#339933" />, name: "Node.js" },
        { id: "python", icon: <SiPython color="#3776AB" />, name: "Python" },
        { id: "django", icon: <SiDjango color="#092E20" />, name: "Django" },
        { id: "flask", icon: <SiFlask color="#ffffff" />, name: "Flask" },
        { id: "fastapi", icon: <SiFastapi color="#009688" />, name: "FastAPI" },
        { id: "go", icon: <SiGo color="#00ADD8" />, name: "Go" },
        { id: "rust", icon: <SiRust color="#ffffff" />, name: "Rust" },
        { id: "spring", icon: <SiSpring color="#6DB33F" />, name: "Spring Boot" },
        { id: "laravel", icon: <SiLaravel color="#FF2D20" />, name: "Laravel" },
        { id: "php", icon: <SiPhp color="#777BB4" />, name: "PHP" },
        { id: "postgres", icon: <SiPostgresql color="#4169E1" />, name: "PostgreSQL" },
        { id: "mysql", icon: <SiMysql color="#4479A1" />, name: "MySQL" },
        { id: "mongodb", icon: <SiMongodb color="#47A248" />, name: "MongoDB" },
        { id: "redis", icon: <SiRedis color="#DC382D" />, name: "Redis" },
        { id: "elasticsearch", icon: <SiElasticsearch color="#005571" />, name: "Elasticsearch" },
        { id: "sqlite", icon: <SiSqlite color="#003B57" />, name: "SQLite" },
        { id: "supabase", icon: <SiSupabase color="#3ECF8E" />, name: "Supabase" },
        { id: "firebase", icon: <SiFirebase color="#FFCA28" />, name: "Firebase" },
        { id: "prisma", icon: <SiPrisma color="#2D3748" />, name: "Prisma" },
        { id: "sequelize", icon: <SiSequelize color="#52B0E7" />, name: "Sequelize" },
        { id: "aws", icon: <FaAws color="#FF9900" />, name: "AWS" },
        { id: "docker", icon: <SiDocker color="#2496ED" />, name: "Docker" },
        { id: "kubernetes", icon: <SiKubernetes color="#326CE5" />, name: "Kubernetes" },
        { id: "terraform", icon: <SiTerraform color="#7B42BC" />, name: "Terraform" },
        { id: "ansible", icon: <SiAnsible color="#EE0000" />, name: "Ansible" },
        { id: "vercel", icon: <SiVercel color="#ffffff" />, name: "Vercel" },
        { id: "heroku", icon: <FaCloud color="#430098" />, name: "Heroku" }, // ✅ CAMBIADO
        { id: "netlify", icon: <SiNetlify color="#00C7B7" />, name: "Netlify" },
        { id: "cloudflare", icon: <SiCloudflare color="#F38020" />, name: "Cloudflare" },
        { id: "githubactions", icon: <SiGithubactions color="#2088FF" />, name: "GitHub Actions" },
        { id: "jenkins", icon: <SiJenkins color="#D24939" />, name: "Jenkins" },
        { id: "prometheus", icon: <SiPrometheus color="#E6522C" />, name: "Prometheus" },
        { id: "grafana", icon: <SiGrafana color="#F46800" />, name: "Grafana" },
        { id: "solidity", icon: <SiSolidity color="#363636" />, name: "Solidity" },
        { id: "openai", icon: <FaBrain color="#74AA9C" />, name: "OpenAI" }, // ✅ CAMBIADO
        { id: "pytorch", icon: <SiPytorch color="#EE4C2C" />, name: "PyTorch" },
        { id: "tensorflow", icon: <SiTensorflow color="#FF6F00" />, name: "TensorFlow" },
        { id: "keras", icon: <SiKeras color="#D00000" />, name: "Keras" },
        { id: "kafka", icon: <SiApachekafka color="#231F20" />, name: "Kafka" },
        { id: "rabbitmq", icon: <SiRabbitmq color="#FF6600" />, name: "RabbitMQ" },
        { id: "nats", icon: <SiNatsdotio color="#27AAE1" />, name: "NATS" },
        { id: "redux", icon: <SiRedux color="#764ABC" />, name: "Redux" },
        { id: "webpack", icon: <SiWebpack color="#8DD6F9" />, name: "Webpack" },
        { id: "babel", icon: <SiBabel color="#F9DC3E" />, name: "Babel" },
        { id: "npm", icon: <SiNpm color="#CB3837" />, name: "npm" },
        { id: "yarn", icon: <SiYarn color="#2C8EBB" />, name: "Yarn" },
        { id: "jest", icon: <SiJest color="#C21325" />, name: "Jest" },
        { id: "cypress", icon: <SiCypress color="#17202C" />, name: "Cypress" },
        { id: "mocha", icon: <SiMocha color="#8D6748" />, name: "Mocha" },
        { id: "linux", icon: <SiLinux color="#FCC624" />, name: "Linux" },
        { id: "ubuntu", icon: <SiUbuntu color="#E95420" />, name: "Ubuntu" },
        { id: "debian", icon: <SiDebian color="#A81D33" />, name: "Debian" },
        { id: "nginx", icon: <SiNginx color="#009639" />, name: "Nginx" },
        { id: "apache", icon: <SiApache color="#D22128" />, name: "Apache" },
        { id: "figma", icon: <SiFigma color="#F24E1E" />, name: "Figma" },
        { id: "adobe", icon: <FaPalette color="#FF0000" />, name: "Adobe" },
        { id: "sketch", icon: <SiSketch color="#F7B500" />, name: "Sketch" },
        { id: "graphql", icon: <SiGraphql color="#E10098" />, name: "GraphQL" },
    ];

    const processItems = [
        {
            id: "req",
            step: "01",
            icon: <FaSearch />,
            title: "Requerimientos & Briefing",
            desc: "Estructuramos un Formulario Técnico exhaustivo para entender tus objetivos de negocio, integraciones necesarias y cuellos de botella."
        },
        {
            id: "dev",
            step: "02",
            icon: <FaCode />,
            title: "Desarrollo & Staging",
            desc: "Iteramos bajo un Manual de Estilo de código riguroso. Dispondrás de un entorno de pruebas privado para ver los avances en tiempo real."
        },
        {
            id: "qa",
            step: "03",
            icon: <FaCheckCircle />,
            title: "QA & Despliegue Cloud",
            desc: "Sometemos el código a pruebas de carga y seguridad. El lanzamiento se ejecuta en infraestructura escalable bajo control de cambios."
        },
        {
            id: "delivery",
            step: "04",
            icon: <FaRocket />,
            title: "Acta de Entrega Final",
            desc: "Te transferimos la propiedad absoluta del repositorio, credenciales limpias y documentación técnica completa para garantizar tu autonomía."
        }
    ];

    const serviceItems = [
        {
            id: "web",
            icon: <FaCode />,
            title: "Sistemas Web Escalables",
            desc: "No usamos plantillas genéricas. Desarrollamos plataformas robustas con Next.js preparadas para soportar tráfico masivo y SEO crítico.",
            link: "/servicios/desarrollo"
        },
        {
            id: "mobile",
            icon: <FaMobileAlt />,
            title: "Desarrollo Mobile Nativo",
            desc: "Diseñamos aplicaciones nativas fluidas para iOS y Android utilizando arquitecturas modernas que escalan a la par de tu negocio.",
            link: "/servicios/desarrollo"
        },
        {
            id: "data",
            icon: <FaDatabase />,
            title: "Gestión de Datos & Cloud",
            desc: "Modelamos bases de datos seguras y paneles administrativos a medida para centralizar y proteger los activos de información de tu empresa.",
            link: "/servicios/desarrollo"
        },
        {
            id: "auto",
            icon: <FaCogs />,
            title: "Automatización de Procesos",
            desc: "Diseñamos flujos internos de software que eliminan las tareas manuales reiterativas, reduciendo drásticamente tus costos operativos.",
            link: "/servicios/desarrollo"
        },
        {
            id: "ai",
            icon: <FaBrain />,
            title: "Integración de IA",
            desc: "Implementamos agentes inteligentes y modelos avanzados de IA para optimizar análisis de datos internos o flujos automatizados de atención.",
            link: "/servicios/desarrollo"
        },
        {
            id: "maint",
            icon: <FaCloudUploadAlt />,
            title: "Mantenimiento Evolutivo",
            desc: "Tu software no queda obsoleto. Aseguramos su evolución continua con monitoreo proactivo, actualizaciones de seguridad y optimizaciones de performance.",
            link: "/planes"
        }
    ];

    const securityItems = [
        {
            id: "nda",
            icon: <FaFileContract className={styles.securityListIcon} />,
            boldText: "NDA (Acuerdo de Confidencialidad) Obligatorio:",
            text: " Resguardamos tu idea y tus datos comerciales bajo contrato legal firmado desde el día cero."
        },
        {
            id: "rls",
            icon: <FaLock className={styles.securityListIcon} />,
            boldText: "Estrategia Zero Hardcoding & RLS:",
            text: " Aislamos tus accesos con variables de entorno estrictas y Row Level Security nativo en Supabase."
        },
        {
            id: "repo",
            icon: <FaCode className={styles.securityListIcon} />,
            boldText: "Repositorio Privado Exclusivo:",
            text: " Tu código base se despliega en un entorno Git único e independiente, garantizando transparencia absoluta de cara a auditorías futuras."
        }
    ];

    const testimonials = [
        {
            id: "test1",
            name: "Carlos Rodríguez",
            role: "CEO, FintechPro",
            quote: "Powa transformó nuestra plataforma en tiempo récord. La arquitectura que implementaron nos permitió escalar de 500 a 15,000 usuarios sin problemas.",
            avatar: "👨‍💼"
        },
        {
            id: "test2",
            name: "Laura Méndez",
            role: "CMO, EcomStore",
            quote: "El rediseño aumentó nuestras conversiones en un 180%. El equipo entendió perfectamente nuestra audiencia y creó una experiencia que realmente conecta.",
            avatar: "👩‍💼"
        },
        {
            id: "test3",
            name: "Andrés Silva",
            role: "CTO, HealthTech",
            quote: "La seguridad y el cumplimiento normativo fueron críticos para nosotros. Powa no solo cumplió, superó nuestras expectativas con creces.",
            avatar: "👨‍🔬"
        }
    ];

    const stats = [
        { value: "24+", label: "Proyectos Entregados", icon: <FaRocket /> },
        { value: "24+", label: "Clientes Satisfechos", icon: <FaUsers /> },
        { value: "15+", label: "Años de Experiencia", icon: <FaClock /> },
        { value: "100%", label: "Propiedad Intelectual", icon: <FaLock /> }
    ];

    return (
        <div className={styles.homepageWrapper}>
            {/* --- HERO SECTION (CON 3D) --- */}
            <HeroWrapper>
                <section className={styles.heroSectionModern}>
                    <Container className="position-relative z-3">
                        <Row className="align-items-center">
                            <Col lg={7}>
                                <div className={styles.badgePowa}>
                                    <FaMapMarkerAlt className="me-2" /> Hub Tecnológico en Quilmes & Zona Sur
                                </div>
                                <h1 className={styles.heroTitleMain}>
                                    Transformamos Ideas en <span className={styles.textGradient}>Software de Alto Impacto.</span>
                                </h1>
                                <p className={styles.heroSubtitleModern}>
                                    No solo creamos webs; desarrollamos la <strong>infraestructura digital</strong> que tu empresa necesita para escalar.
                                    Ingeniería Senior aplicada a negocios de <strong>Todo el Mundo.</strong>
                                </p>
                                <div className="d-flex flex-wrap gap-3 mt-4">
                                    <Link href="/contact" className={`${styles.btnPowaPrimary} text-decoration-none`}>
                                        Consultoría Gratuita <FaRocket className="ms-2" />
                                    </Link>
                                    <Link href="/servicios" className={`${styles.btnPowaOutline} text-decoration-none`}>
                                        Nuestras Soluciones <HiOutlineArrowNarrowRight className="ms-2" />
                                    </Link>
                                </div>

                                <div className={styles.heroTrustBadges}>
                                    <span className={styles.trustBadge}>
                                        <FaShieldAlt className={styles.trustBadgeIcon} />
                                        100% Propiedad Intelectual
                                    </span>
                                    <span className={styles.trustBadge}>
                                        <FaClock className={styles.trustBadgeIcon} />
                                        Entregas Parciales
                                    </span>
                                    <span className={styles.trustBadge}>
                                        <FaWhatsapp className={styles.trustBadgeIcon} />
                                        Soporte 24/7
                                    </span>
                                    <Link href="/planes/servicios/desarrollo" className={styles.trustBadgeLink}>
                                        <FaCode className={styles.trustBadgeIcon} />
                                        Desarrollo Web
                                    </Link>
                                    <Link href="/planes" className={styles.trustBadgeLink}>
                                        <FaShieldAlt className={styles.trustBadgeIcon} />
                                        Mantenimiento
                                    </Link>
                                </div>
                            </Col>
                            <Col lg={5} className="d-none d-lg-block">
                                <div className={styles.heroImageContainer}>
                                    <Image
                                        src="/logo-agenciadigitalpowa-redondo.png"
                                        alt="Agencia Digital Powa - Logo"
                                        width={640}
                                        height={427}
                                        className="rounded-4 shadow-lg"
                                        priority
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </HeroWrapper>

            {/* --- TECH STACK (INFINITE SCROLL) --- */}
            <section className={styles.techStackSection} ref={refStack}>
                <Container>
                    <h2 className={styles.techLabel}>Tecnologías Enterprise que dominamos</h2>
                    <div className={styles.stackSlider}>
                        <div className={styles.stackTrack}>
                            {[...techStack, ...techStack].map((tech, idx) => (
                                <div key={`tech-${tech.id}-${idx}`} className={styles.stackItem}>
                                    <div className={styles.techIconWrapper}>{tech.icon}</div>
                                    <span className={styles.techName}>{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* --- ESTADÍSTICAS --- */}
            <section className={styles.statsSection} ref={refStats}>
                <Container>
                    <Row className="g-4">
                        {stats.map((stat, index) => (
                            <Col key={index} md={3} sm={6}>
                                <div className={styles.statCard}>
                                    <div className={styles.statCardIcon}>{stat.icon}</div>
                                    <div className={styles.statCardValue}>{stat.value}</div>
                                    <div className={styles.statCardLabel}>{stat.label}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* --- METODOLOGÍA (FLUJO SENIOR EN 4 FASES) --- */}
            <section className={styles.processSection} ref={refProcess}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>METODOLOGÍA</span>
                        <h2 className={styles.sectionTitle}>Nuestro ADN de <span className={styles.textGradient}>Ingeniería</span></h2>
                        <p className={styles.sectionSubtitle}>Un flujo de trabajo predecible, transparente y blindado de punta a punta.</p>
                    </div>
                    <Row className="g-4">
                        {processItems.map((item) => (
                            <Col lg={3} md={6} key={item.id}>
                                <div className={styles.processCard}>
                                    <div className={styles.stepNumber}>{item.step}</div>
                                    <div className={styles.processIcon}>{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* --- SERVICES GRID --- */}
            <section className={styles.homeServices} ref={refServices}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>SERVICIOS</span>
                        <h2 className={styles.sectionTitle}>Soluciones <span className={styles.textGradient}>Estratégicas</span></h2>
                        <p className={styles.sectionSubtitle}>Tecnología a medida para cada desafío de tu negocio.</p>
                    </div>
                    <Row className="g-4">
                        {serviceItems.map((item) => (
                            <Col lg={4} md={6} key={item.id}>
                                <div className={styles.powaServiceCard}>
                                    <div className={styles.iconBox}>{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                    <Link href={item.link} className={styles.cardLink}>
                                        Saber más <FaArrowRight className="ms-2" />
                                    </Link>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* --- SECCIÓN "MEJORAMOS CUALQUIER PRESUPUESTO" --- */}
            <section className={styles.budgetMatchSection} ref={refBudget}>
                <Container>
                    <div className={styles.budgetMatchContainer}>
                        <Row className="align-items-center g-5">
                            <Col lg={6}>
                                <div className={styles.budgetContent}>
                                    <span className={styles.sectionBadge}>💰 PRESUPUESTO</span>
                                    <h2 className={styles.budgetTitle}>
                                        Mejoramos <span className={styles.textGradient}>Cualquier Presupuesto</span>
                                    </h2>
                                    <p className={styles.budgetSubtitle}>
                                        No importa el tamaño de tu proyecto ni tu inversión inicial.
                                        En Powa diseñamos soluciones a medida que se ajustan a tus posibilidades.
                                    </p>
                                    <div className={styles.budgetFeatures}>
                                        <div className={styles.budgetFeature}>
                                            <FaCheckCircle className={styles.budgetFeatureIcon} />
                                            <div>
                                                <h4>Planes flexibles</h4>
                                                <p>Desde proyectos pequeños hasta soluciones enterprise. Adaptamos nuestro proceso a tu realidad.</p>
                                            </div>
                                        </div>
                                        <div className={styles.budgetFeature}>
                                            <FaCheckCircle className={styles.budgetFeatureIcon} />
                                            <div>
                                                <h4>Entregas escalonadas</h4>
                                                <p>No necesitas todo el capital upfront. Dividimos el proyecto en fases para que inviertas a tu ritmo.</p>
                                            </div>
                                        </div>
                                        <div className={styles.budgetFeature}>
                                            <FaCheckCircle className={styles.budgetFeatureIcon} />
                                            <div>
                                                <h4>ROI garantizado</h4>
                                                <p>Cada inversión está diseñada para generar retorno. Si no ves resultados, ajustamos la estrategia.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col lg={6}>
                                <div className={styles.budgetVisual}>
                                    <div className={styles.budgetCard}>
                                        <div className={styles.budgetCardHeader}>
                                            <span className={styles.budgetCardBadge}>📊 COMPARATIVA</span>
                                            <h3>¿Cuánto cuesta invertir en tecnología?</h3>
                                            <p className={styles.budgetCardSubtitle}>
                                                Precios referenciales según el perfil del desarrollador y tipo de proyecto.
                                                <br />
                                                <span className={styles.budgetCardNote}>
                                                    *En pesos argentinos, cotización al día: <strong>$1.488,27 ARS/USD</strong>
                                                </span>
                                            </p>
                                        </div>

                                        <div className={styles.budgetCardBody}>
                                            <div className={styles.budgetProfiles}>
                                                <div className={styles.budgetProfileCard}>
                                                    <span className={styles.budgetProfileBadge}>Junior</span>
                                                    <div className={styles.budgetProfileRange}>
                                                        <span className={styles.budgetProfilePrice}>$22.324</span>
                                                        <span className={styles.budgetProfileSeparator}>—</span>
                                                        <span className={styles.budgetProfilePrice}>$37.206</span>
                                                    </div>
                                                    <span className={styles.budgetProfileLabel}>por hora</span>
                                                    <div className={styles.budgetProfileTag}>
                                                        <FaUser className={styles.budgetProfileIcon} />
                                                        0-2 años
                                                    </div>
                                                </div>

                                                <div className={`${styles.budgetProfileCard} ${styles.budgetProfileActive}`}>
                                                    <span className={styles.budgetProfileBadge}>Semi-Senior</span>
                                                    <div className={styles.budgetProfileRange}>
                                                        <span className={styles.budgetProfilePrice}>$44.648</span>
                                                        <span className={styles.budgetProfileSeparator}>—</span>
                                                        <span className={styles.budgetProfilePrice}>$74.413</span>
                                                    </div>
                                                    <span className={styles.budgetProfileLabel}>por hora</span>
                                                    <div className={styles.budgetProfileTag}>
                                                        <FaUser className={styles.budgetProfileIcon} />
                                                        2-5 años
                                                    </div>
                                                </div>

                                                <div className={`${styles.budgetProfileCard} ${styles.budgetProfileSenior}`}>
                                                    <span className={styles.budgetProfileBadge}>🔥 Senior</span>
                                                    <div className={styles.budgetProfileRange}>
                                                        <span className={styles.budgetProfilePrice}>$74.413</span>
                                                        <span className={styles.budgetProfileSeparator}>—</span>
                                                        <span className={styles.budgetProfilePrice}>$119.062</span>
                                                    </div>
                                                    <span className={styles.budgetProfileLabel}>por hora</span>
                                                    <div className={styles.budgetProfileTag}>
                                                        <FaUser className={styles.budgetProfileIcon} />
                                                        5-8 años
                                                    </div>
                                                </div>

                                                <div className={styles.budgetProfileCard}>
                                                    <span className={styles.budgetProfileBadge}>🏢 Agencia</span>
                                                    <div className={styles.budgetProfileRange}>
                                                        <span className={styles.budgetProfilePrice}>$119.062</span>
                                                        <span className={styles.budgetProfileSeparator}>—</span>
                                                        <span className={styles.budgetProfilePrice}>$223.240</span>
                                                    </div>
                                                    <span className={styles.budgetProfileLabel}>por hora</span>
                                                    <div className={styles.budgetProfileTag}>
                                                        <FaUsers className={styles.budgetProfileIcon} />
                                                        Equipo completo
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.budgetProjectTable}>
                                                <h4 className={styles.budgetTableTitle}>
                                                    <FaCode className={styles.budgetTableIcon} />
                                                    Precios estimados por proyecto
                                                </h4>

                                                <div className={styles.budgetTable}>
                                                    <div className={styles.budgetTableRow}>
                                                        <div className={styles.budgetTableCell}>Landing Page</div>
                                                        <div className={styles.budgetTableCell}>$178K - $297K</div>
                                                        <div className={styles.budgetTableCell}>$595K - $1.19M</div>
                                                        <div className={styles.budgetTableCell}>$1.19M - $2.23M</div>
                                                    </div>
                                                    <div className={styles.budgetTableRow}>
                                                        <div className={styles.budgetTableCell}>Sitio Institucional</div>
                                                        <div className={styles.budgetTableCell}>$446K - $892K</div>
                                                        <div className={styles.budgetTableCell}>$1.78M - $2.97M</div>
                                                        <div className={styles.budgetTableCell}>$2.97M - $5.35M</div>
                                                    </div>
                                                    <div className={styles.budgetTableRow}>
                                                        <div className={styles.budgetTableCell}>E-commerce</div>
                                                        <div className={styles.budgetTableCell}>$892K - $1.78M</div>
                                                        <div className={styles.budgetTableCell}>$2.97M - $5.35M</div>
                                                        <div className={styles.budgetTableCell}>$5.35M - $10.71M</div>
                                                    </div>
                                                    <div className={`${styles.budgetTableRow} ${styles.budgetTableHighlight}`}>
                                                        <div className={styles.budgetTableCell}>SaaS / Web App</div>
                                                        <div className={styles.budgetTableCell}>$2.67M - $4.46M</div>
                                                        <div className={styles.budgetTableCell}>$8.92M - $14.28M</div>
                                                        <div className={styles.budgetTableCell}>$14.28M - $26.78M</div>
                                                    </div>
                                                    <div className={styles.budgetTableRow}>
                                                        <div className={styles.budgetTableCell}>Dashboard Admin</div>
                                                        <div className={styles.budgetTableCell}>$1.78M - $3.57M</div>
                                                        <div className={styles.budgetTableCell}>$5.95M - $10.71M</div>
                                                        <div className={styles.budgetTableCell}>$10.71M - $17.85M</div>
                                                    </div>
                                                </div>

                                                <div className={styles.budgetTableLegend}>
                                                    <span className={styles.budgetLegendItem}>
                                                        <span className={styles.budgetLegendDot} style={{ background: '#94a3b8' }} />
                                                        Junior
                                                    </span>
                                                    <span className={styles.budgetLegendItem}>
                                                        <span className={styles.budgetLegendDot} style={{ background: '#3b82f6' }} />
                                                        Semi-Senior
                                                    </span>
                                                    <span className={styles.budgetLegendItem}>
                                                        <span className={styles.budgetLegendDot} style={{ background: '#8b5cf6' }} />
                                                        Senior
                                                    </span>
                                                    <span className={styles.budgetLegendItem}>
                                                        <span className={styles.budgetLegendDot} style={{ background: '#f59e0b' }} />
                                                        Agencia
                                                    </span>
                                                </div>
                                            </div>

                                            <div className={styles.budgetCtaBox}>
                                                <div className={styles.budgetCtaContent}>
                                                    <FaWhatsapp className={styles.budgetCtaIcon} />
                                                    <div>
                                                        <p className={styles.budgetCtaText}>
                                                            ¿No encontrás tu presupuesto?
                                                            <strong> Hablemos y armamos algo juntos.</strong>
                                                        </p>
                                                    </div>
                                                </div>
                                                <Link href="/contact" className={styles.budgetCtaButton}>
                                                    Consultar presupuesto
                                                    <FaRocket className={styles.budgetCtaArrow} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>

            {/* ============================================
               🚀 SECCIÓN ROI - DINÁMICA
            ============================================ */}
            <section className={styles.roiSection} ref={refROI}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>💰 ROI GARANTIZADO</span>
                        <h2 className={styles.sectionTitle}>
                            No es un gasto, es una <span className={styles.textGradient}>inversión</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Cada negocio es único. Te ayudamos a calcular cuánto estás perdiendo hoy
                            y cuánto podrías ganar con una solución a medida.
                        </p>
                    </div>

                    <Row className="g-4">
                        <Col lg={4} md={6}>
                            <div className={styles.roiCard}>
                                <div className={styles.roiIconWrapper}>
                                    <FaMoneyBillWave className={styles.roiIcon} style={{ color: '#ef4444' }} />
                                </div>
                                <div className={styles.roiValue} style={{ color: '#ef4444', fontSize: '2rem' }}>
                                    ¿Cuánto <br />estás perdiendo?
                                </div>
                                <div className={styles.roiLabel}>Identificamos fugas de dinero y tiempo</div>

                                <ul className={styles.roiList}>
                                    <li>
                                        <FaClock className={styles.roiListIcon} />
                                        Procesos manuales que consumen horas
                                    </li>
                                    <li>
                                        <FaUsers className={styles.roiListIcon} />
                                        Clientes perdidos por mala experiencia                                    </li>
                                    <li>
                                        <FaChartBar className={styles.roiListIcon} />
                                        Oportunidades de venta no aprovechadas
                                    </li>
                                </ul>

                                <div className={styles.roiFootnote}>
                                    *Cada negocio tiene sus propias pérdidas ocultas
                                </div>
                            </div>
                        </Col>

                        <Col lg={4} md={6}>
                            <div className={styles.roiCard}>
                                <div className={styles.roiIconWrapper}>
                                    <FaRocket className={styles.roiIcon} style={{ color: '#22d3ee' }} />
                                </div>
                                <div className={styles.roiValue} style={{ color: '#22d3ee', fontSize: '2rem' }}>
                                    Solución <br />a medida
                                </div>
                                <div className={styles.roiLabel}>Desarrollamos lo que tu negocio necesita</div>

                                <ul className={styles.roiList}>
                                    <li>
                                        <FaCheckCircle className={styles.roiListIcon} style={{ color: '#10b981' }} />
                                        Automatización de procesos
                                    </li>
                                    <li>
                                        <FaCheckCircle className={styles.roiListIcon} style={{ color: '#10b981' }} />
                                        Mejora de la experiencia del cliente
                                    </li>
                                    <li>
                                        <FaCheckCircle className={styles.roiListIcon} style={{ color: '#10b981' }} />
                                        Paneles de control y estadísticas
                                    </li>
                                </ul>

                                <div className={styles.roiFootnote}>
                                    Invertís una vez, ganás todos los meses
                                </div>
                            </div>
                        </Col>

                        <Col lg={4} md={6}>
                            <div className={`${styles.roiCard} ${styles.roiCardHighlight}`}>
                                <div className={styles.roiIconWrapper}>
                                    <FaCalculator className={styles.roiIcon} style={{ color: '#10b981' }} />
                                </div>
                                <div className={styles.roiValue} style={{ color: '#10b981', fontSize: '2rem' }}>
                                    Calculá <br />tu ROI
                                </div>
                                <div className={styles.roiLabel}>Resultados personalizados para tu negocio</div>

                                <div className={styles.roiExampleBox}>
                                    <div className={styles.roiExampleItem}>
                                        <span className={styles.roiExampleLabel}>📌 Ejemplo: Barbería</span>
                                        <div className={styles.roiExampleResult}>
                                            <span className={styles.roiExampleBefore}>Pérdida: $515.000/mes</span>
                                            <span className={styles.roiExampleArrow}>→</span>
                                            <span className={styles.roiExampleAfter}>Ahorro: $276.760/mes</span>
                                        </div>
                                        <div className={styles.roiExampleDetail}>
                                            10 turnos/día • Valor promedio: $12.000
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.roiCta}>
                                    <button
                                        onClick={() => {
                                            const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
                                            window.open(`${baseUrl}/lab?tool=roi`, '_blank');
                                        }}
                                        className={styles.roiButtonNeon}
                                    >
                                        <FaCalculator className={styles.roiButtonIcon} />
                                        <span>Calculá tu ROI exacto</span>
                                        <FaArrowRight className={styles.roiButtonIcon} />
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div className={styles.roiIndustries}>
                        <p className={styles.roiIndustriesLabel}>
                            Ejemplos de pérdidas en diferentes industrias:
                        </p>
                        <div className={styles.roiIndustriesGrid}>
                            <div className={styles.roiIndustryItem}>
                                <span className={styles.roiIndustryIcon}>✂️</span>
                                <span className={styles.roiIndustryName}>Barbería</span>
                                <span className={styles.roiIndustryValue}>$515.000/mes</span>
                            </div>
                            <div className={styles.roiIndustryItem}>
                                <span className={styles.roiIndustryIcon}>🍕</span>
                                <span className={styles.roiIndustryName}>Restaurante</span>
                                <span className={styles.roiIndustryValue}>$1.200.000/mes</span>
                            </div>
                            <div className={styles.roiIndustryItem}>
                                <span className={styles.roiIndustryIcon}>🛒</span>
                                <span className={styles.roiIndustryName}>Tienda Online</span>
                                <span className={styles.roiIndustryValue}>$900.000/mes</span>
                            </div>
                            <div className={styles.roiIndustryItem}>
                                <span className={styles.roiIndustryIcon}>💼</span>
                                <span className={styles.roiIndustryName}>Servicios</span>
                                <span className={styles.roiIndustryValue}>$600.000/mes</span>
                            </div>
                        </div>
                        <p className={styles.roiIndustriesNote}>
                            *Valores estimados. Calculá el ROI exacto para tu negocio.
                        </p>
                    </div>
                </Container>
            </section>

            {/* ===== 🎯 DIAGNÓSTICO GRATUITO ===== */}
            <section className={styles.diagnosticoSection}>
                <Container>
                    <div className={styles.diagnosticoCard}>
                        <div className={styles.diagnosticoGlow} />
                        <Row className="align-items-center g-4">
                            <Col lg={7}>
                                <div className={styles.diagnosticoContent}>
                                    <span className={styles.diagnosticoBadge}>🎯 GRATUITO</span>
                                    <h2 className={styles.diagnosticoTitle}>
                                        ¿Tu plataforma está <br />
                                        <span className={styles.textGradient}>funcionando al máximo?</span>
                                    </h2>
                                    <p className={styles.diagnosticoDesc}>
                                        Obtené un <strong>diagnóstico técnico gratuito</strong> en 24hs.
                                        Analizamos velocidad, seguridad, SEO y escalabilidad de tu sitio actual.
                                    </p>
                                    <ul className={styles.diagnosticoBeneficios}>
                                        <li>
                                            <FaCheckCircle className={styles.diagnosticoCheck} />
                                            <span>Análisis de performance y velocidad</span>
                                        </li>
                                        <li>
                                            <FaCheckCircle className={styles.diagnosticoCheck} />
                                            <span>Detección de cuellos de botella</span>
                                        </li>
                                        <li>
                                            <FaCheckCircle className={styles.diagnosticoCheck} />
                                            <span>Recomendaciones concretas de mejora</span>
                                        </li>
                                        <li>
                                            <FaCheckCircle className={styles.diagnosticoCheck} />
                                            <span>Sin compromiso ni obligación</span>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col lg={5}>
                                <div className={styles.diagnosticoFormWrapper}>
                                    <div className={styles.diagnosticoFormHeader}>
                                        <FaRocket className={styles.diagnosticoFormIcon} />
                                        <h4>Diagnóstico exprés</h4>
                                        <p>Recibí tu análisis en 24hs</p>
                                    </div>

                                    <form
                                        action="https://api.web3forms.com/submit"
                                        method="POST"
                                        className={styles.diagnosticoForm}
                                    >
                                        <input
                                            type="hidden"
                                            name="access_key"
                                            value="6a22a375-6730-499d-ab20-b86e359f069d"
                                        />
                                        <input
                                            type="hidden"
                                            name="subject"
                                            value="📋 Nuevo diagnóstico técnico - Agencia Digital Powa"
                                        />
                                        <input
                                            type="hidden"
                                            name="from_name"
                                            value="Agencia Digital Powa"
                                        />
                                        <input
                                            type="hidden"
                                            name="redirect"
                                            value="https://agencia-powa.vercel.app/gracias"
                                        />
                                        <input
                                            type="hidden"
                                            name="origen"
                                            value="Diagnóstico - Página Principal"
                                        />

                                        <div className={styles.diagnosticoInputGroup}>
                                            <input
                                                type="text"
                                                name="nombre"
                                                className={styles.diagnosticoInput}
                                                placeholder="Tu nombre"
                                                required
                                            />
                                        </div>

                                        <div className={styles.diagnosticoInputGroup}>
                                            <input
                                                type="url"
                                                name="url"
                                                className={styles.diagnosticoInput}
                                                placeholder="URL de tu sitio web (ej: mipagina.com)"
                                                required
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                className={styles.diagnosticoInput}
                                                placeholder="Tu email"
                                                required
                                            />
                                        </div>

                                        <div className={styles.diagnosticoInputGroup}>
                                            <input
                                                type="tel"
                                                name="telefono"
                                                className={styles.diagnosticoInput}
                                                placeholder="Tu teléfono (opcional)"
                                            />
                                        </div>

                                        <div className={styles.diagnosticoInputGroup}>
                                            <textarea
                                                name="mensaje"
                                                className={styles.diagnosticoTextarea}
                                                placeholder="Contanos qué necesitas mejorar o qué problema tenés con tu sitio..."
                                                rows={3}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className={styles.diagnosticoButton}
                                        >
                                            Quiero mi diagnóstico
                                        </button>

                                        <p className={styles.diagnosticoFooter}>
                                            🔒 Tu información está segura. No compartimos tus datos.
                                        </p>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>

            {/* --- TESTIMONIALS --- */}
            <section className={styles.testimonialsSection} ref={refTestimonials}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>TESTIMONIOS</span>
                        <h2 className={styles.sectionTitle}>Lo que dicen <span className={styles.textGradient}>nuestros clientes</span></h2>
                    </div>
                    <Row className="g-4">
                        {testimonials.map((testimonial) => (
                            <Col key={testimonial.id} lg={4} md={6}>
                                <div className={styles.testimonialCard}>
                                    <FaQuoteRight className={styles.quoteIcon} />
                                    <p className={styles.testimonialText}>"{testimonial.quote}"</p>
                                    <div className={styles.testimonialAuthor}>
                                        <div className={styles.testimonialAvatar}>{testimonial.avatar}</div>
                                        <div>
                                            <div className={styles.testimonialName}>{testimonial.name}</div>
                                            <div className={styles.testimonialRole}>{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* --- BLINDAJE LEGAL Y TECNOLÓGICO --- */}
            <section className={styles.securitySection} ref={refSecurity}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6}>
                            <div className={styles.badgeSecurity}>
                                <FaShieldAlt className="me-2" /> Estándar de Seguridad Corporativa
                            </div>
                            <h2 className={styles.sectionTitle} style={{ marginBottom: '1.5rem' }}>
                                Tu propiedad intelectual, <br />
                                <span className={styles.textGradient}>completamente blindada.</span>
                            </h2>
                            <p className={styles.sectionSubtitle} style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                En la industria del software, la seriedad no se demuestra solo escribiendo código, sino protegiendo el negocio del cliente. En cada desarrollo aplicamos protocolos de nivel enterprise.
                            </p>
                            <ul className={styles.securityList}>
                                {securityItems.map((item) => (
                                    <li key={item.id} className="d-flex align-items-start mb-3">
                                        <span className={styles.securityIconWrapper}>{item.icon}</span>
                                        <span className="ms-2">
                                            <strong>{item.boldText}</strong>{item.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col lg={6} className="text-center d-none d-lg-block">
                            <div className={styles.securityVisualBox}>
                                <FaShieldAlt className={styles.shieldBigIcon} />
                                <div className={styles.shieldPulse}></div>
                                <div className={styles.shieldPulseSecondary}></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* --- CTA FINAL --- */}
            <section className={styles.ctaHomeMinimal} ref={refCta}>
                <Container>
                    <div className={styles.ctaMinimalBox}>
                        <div className={styles.ctaGlow}></div>
                        <div className={styles.ctaContent}>
                            <FaRocket className={styles.ctaRocketIcon} />
                            <h2 className={styles.ctaTitle}>¿Listo para profesionalizar tu empresa?</h2>
                            <p className={styles.ctaText}>
                                Hablemos sobre cómo la tecnología puede resolver tus cuellos de botella actuales y potenciar tu crecimiento.
                            </p>
                            <div className={styles.ctaButtons}>
                                <Link href="/contact" className={styles.btnPowaWhite}>
                                    Agendar Consultoría Técnica
                                </Link>
                                <Link href="/faq" className={styles.btnCtaSecondary}>
                                    Ver Preguntas Frecuentes
                                </Link>
                                <Link href="/servicios/desarrollo" className={styles.btnCtaSecondary}>
                                    Ver Desarrollo Web
                                </Link>
                                <Link href="/planes" className={styles.btnCtaSecondary}>
                                    Ver Planes de Mantenimiento
                                </Link>
                            </div>
                            <div className={styles.ctaTrustBadges}>
                                <span>✅ Sin compromiso</span>
                                <span>🔒 100% confidencial</span>
                                <span>⚡ Respuesta en 24hs</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}