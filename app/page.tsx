'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

// Iconos
import {
    FaCode, FaArrowRight, FaDatabase, FaMobileAlt, FaRocket,
    FaMapMarkerAlt, FaSearch, FaCogs, FaCheckCircle, FaShieldAlt,
    FaFileContract, FaLock, FaUsers, FaClock,
    FaWhatsapp, FaCloudUploadAlt,
    FaBrain,
    FaUser, FaCalculator, FaMoneyBillWave, FaChartBar,
    FaCloud, FaPalette, FaAws, FaSyncAlt
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

    // ===== STATE PARA COTIZACIÓN DEL DÓLAR =====
    const [dolarVenta, setDolarVenta] = useState<number>(1488.27); // Valor por defecto de respaldo
    const [dolarFecha, setDolarFecha] = useState<string>('');
    const [loadingDolar, setLoadingDolar] = useState<boolean>(true);
    const [errorDolar, setErrorDolar] = useState<boolean>(false);
    const [moneda, setMoneda] = useState<'ARS' | 'USD'>('ARS'); // Toggle ARS/USD

    useEffect(() => {
        async function fetchDolar() {
            try {
                const response = await fetch('https://dolarapi.com/v1/dolares/oficial');
                const data = await response.json();
                if (data && data.venta) {
                    setDolarVenta(data.venta);
                    setDolarFecha(data.fechaActualizacion || new Date().toISOString());
                    setErrorDolar(false);
                }
            } catch (error) {
                console.error('Error al obtener la cotización del dólar:', error);
                setErrorDolar(true);
            } finally {
                setLoadingDolar(false);
            }
        }
        fetchDolar();

        // Refrescar cada 30 minutos
        const interval = setInterval(fetchDolar, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // ===== HELPER: FORMATEO DE PRECIOS =====
    const formatearPrecio = (valorUSD: number): string => {
        if (moneda === 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(valorUSD);
        }
        const valorARS = valorUSD * dolarVenta;
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(valorARS);
    };

    // Formato corto para tablas: sin "K", solo "M" para millones
    const formatearPrecioCorto = (valorUSD: number): string => {
        const valor = moneda === 'USD' ? valorUSD : valorUSD * dolarVenta;
        const simbolo = moneda === 'USD' ? 'US$' : '$';

        // Solo usamos "M" para millones (ej: $ 1,7M)
        if (valor >= 1_000_000) {
            return `${simbolo} ${(valor / 1_000_000).toFixed(1).replace('.', ',')}M`;
        }

        // Para miles, mostramos el número completo con separador de miles
        return `${simbolo} ${new Intl.NumberFormat('es-AR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(valor)}`;
    };

    const formatearFecha = (iso: string): string => {
        try {
            const fecha = new Date(iso);
            return fecha.toLocaleString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return '';
        }
    };

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
    const [refStats] = useInView(options);
    const [refROI] = useInView(options);

    // ===== PRECIOS BASE EN USD (fuente de verdad) =====
    // ===== PRECIOS BASE EN USD (fuente de verdad) =====
    const preciosBase = useMemo(() => ({
        perfiles: [
            { id: 'junior', label: 'Junior', badge: '🌱', rangoUSD: [8, 15], exp: '0-2 años', destacado: false },
            { id: 'semi', label: 'Semi-Senior', badge: '⚡', rangoUSD: [15, 30], exp: '2-5 años', destacado: true },
            { id: 'senior', label: 'Senior', badge: '🔥', rangoUSD: [30, 50], exp: '5-8 años', destacado: false, senior: true },
            { id: 'agencia', label: 'Agencia', badge: '🏢', rangoUSD: [50, 90], exp: 'Equipo completo', destacado: false },
        ],
        proyectos: [
            {
                id: 'landing',
                nombre: 'Landing Page',
                rangos: {
                    junior: [200, 400],
                    semi: [400, 700],
                    senior: [700, 1200],
                    agencia: [1200, 2000],
                },
                destacado: false,
            },
            {
                id: 'inst',
                nombre: 'Sitio Institucional',
                rangos: {
                    junior: [500, 900],
                    semi: [900, 1500],
                    senior: [1500, 2500],
                    agencia: [2500, 4000],
                },
                destacado: false,
            },
            {
                id: 'ecom',
                nombre: 'E-commerce',
                rangos: {
                    junior: [800, 1500],
                    semi: [1500, 2800],
                    senior: [2800, 4500],
                    agencia: [4500, 7000],
                },
                destacado: false,
            },
            {
                id: 'saas',
                nombre: 'SaaS / Web App',
                rangos: {
                    junior: [1500, 3000],
                    semi: [3000, 6000],
                    senior: [6000, 12000],
                    agencia: [12000, 25000],
                },
                destacado: true,
            },
            {
                id: 'dash',
                nombre: 'Dashboard Admin',
                rangos: {
                    junior: [1000, 2000],
                    semi: [2000, 4000],
                    senior: [4000, 7000],
                    agencia: [7000, 12000],
                },
                destacado: false,
            },
        ],
    }), []);

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
        { id: "heroku", icon: <FaCloud color="#430098" />, name: "Heroku" },
        { id: "netlify", icon: <SiNetlify color="#00C7B7" />, name: "Netlify" },
        { id: "cloudflare", icon: <SiCloudflare color="#F38020" />, name: "Cloudflare" },
        { id: "githubactions", icon: <SiGithubactions color="#2088FF" />, name: "GitHub Actions" },
        { id: "jenkins", icon: <SiJenkins color="#D24939" />, name: "Jenkins" },
        { id: "prometheus", icon: <SiPrometheus color="#E6522C" />, name: "Prometheus" },
        { id: "grafana", icon: <SiGrafana color="#F46800" />, name: "Grafana" },
        { id: "solidity", icon: <SiSolidity color="#363636" />, name: "Solidity" },
        { id: "openai", icon: <FaBrain color="#74AA9C" />, name: "OpenAI" },
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

    const featuredTechStackIds = new Set([
        'react', 'nextjs', 'typescript', 'nodejs', 'postgres',
        'supabase', 'tailwind', 'vercel', 'docker'
    ]);
    const featuredTechStack = techStack.filter(tech => featuredTechStackIds.has(tech.id));

    const processItems = [
        {
            id: "req",
            step: "01",
            icon: <FaSearch />,
            title: "Requerimientos & Briefing",
            desc: "Armamos un formulario técnico bien detallado para entender tu negocio, qué integraciones necesitás y dónde se te está yendo la plata."
        },
        {
            id: "dev",
            step: "02",
            icon: <FaCode />,
            title: "Desarrollo & Staging",
            desc: "Codeamos bajo un manual de estilo riguroso. Vas a tener un entorno de pruebas privado para ver los avances en tiempo real, sin sorpresas."
        },
        {
            id: "qa",
            step: "03",
            icon: <FaCheckCircle />,
            title: "QA & Despliegue Cloud",
            desc: "Probamos todo bajo presión: carga, seguridad y performance. El lanzamiento se hace con infraestructura escalable y control de cambios."
        },
        {
            id: "delivery",
            step: "04",
            icon: <FaRocket />,
            title: "Acta de Entrega Final",
            desc: "Te transferimos el repositorio, credenciales limpias y toda la documentación técnica. El código es tuyo, sin vueltas."
        }
    ];

    const serviceItems = [
        {
            id: "web",
            icon: <FaCode />,
            title: "Sistemas Web Escalables",
            desc: "Sitios, plataformas y paneles internos diseñados según tus procesos, tus usuarios y las integraciones que necesitás.",
            link: "/planes/servicios/desarrollo"
        },
        {
            id: "mobile",
            icon: <FaMobileAlt />,
            title: "Desarrollo Mobile Nativo",
            desc: "Aplicaciones para iOS y Android cuando tu operación necesita una experiencia móvil más completa que una web.",
            link: "/planes/servicios/desarrollo"
        },
        {
            id: "data",
            icon: <FaDatabase />,
            title: "Gestión de Datos & Cloud",
            desc: "Conectamos fuentes de datos y construimos paneles para que la información de tu operación sea más fácil de consultar.",
            link: "/planes/servicios/desarrollo"
        },
        {
            id: "auto",
            icon: <FaCogs />,
            title: "Automatización de Procesos",
            desc: "Integramos herramientas y automatizamos tareas repetitivas para reducir trabajo manual y errores operativos.",
            link: "/planes/servicios/desarrollo"
        },
        {
            id: "ai",
            icon: <FaBrain />,
            title: "Integración de IA",
            desc: "Evaluamos asistentes y flujos con IA para casos concretos, definiendo fuentes de datos, límites y revisión humana.",
            link: "/planes/servicios/desarrollo"
        },
        {
            id: "maint",
            icon: <FaCloudUploadAlt />,
            title: "Mantenimiento Evolutivo",
            desc: "Tu software no queda obsoleto. Monitoreo proactivo, actualizaciones de seguridad y optimizaciones de performance mes a mes.",
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
            text: " Tu código base vive en un entorno Git único e independiente, listo para cualquier auditoría futura."
        }
    ];

    const stats = [
        { value: "01", label: "Alcance definido antes de empezar", icon: <FaFileContract /> },
        { value: "02", label: "Avances revisables por etapas", icon: <FaSyncAlt /> },
        { value: "03", label: "Pruebas antes del lanzamiento", icon: <FaCheckCircle /> },
        { value: "04", label: "Código y accesos entregados", icon: <FaLock /> }
    ];

    return (
        <div className={styles.homepageWrapper}>
            {/* --- HERO SECTION (CON 3D) --- */}
            <HeroWrapper>
                <section className={styles.heroSectionModern}>
                    <Container className="position-relative z-3 pt-5 pt-md-4">
                        <Row className="align-items-center">
                            <Col lg={7}>
                                <div className={styles.badgePowa}>
                                    <FaMapMarkerAlt className="me-2" /> PYMES y empresas · Quilmes, Argentina · Remoto
                                </div>
                                <h1 className={styles.heroTitleMain}>
                                    Tecnología a medida para <span className={styles.textGradient}>PYMES y empresas.</span>
                                </h1>
                                <p className={styles.heroSubtitleModern}>
                                    Desde mejorar un proceso puntual hasta desarrollar una plataforma digital: definimos el alcance con vos y sumamos los perfiles adecuados según la complejidad y el contexto de tu empresa.
                                </p>
                                <div className="d-flex flex-wrap gap-3 mt-4">
                                    <Link href="/contact" className={`${styles.btnPowaPrimary} text-decoration-none`}>
                                        Contanos qué necesitás <FaArrowRight className="ms-2" />
                                    </Link>
                                    <Link href="/portfolio" className={`${styles.btnPowaOutline} text-decoration-none`}>
                                        Explorar demos <HiOutlineArrowNarrowRight className="ms-2" />
                                    </Link>
                                </div>

                                <div className={styles.heroTrustBadges}>
                                    <span className={styles.trustBadge}>
                                        <FaShieldAlt className={styles.trustBadgeIcon} />
                                        100% Propiedad Intelectual
                                    </span>
                                    <span className={styles.trustBadge}>
                                        <FaClock className={styles.trustBadgeIcon} />
                                        Trabajo por etapas
                                    </span>
                                    <span className={styles.trustBadge}>
                                        <FaLock className={styles.trustBadgeIcon} />
                                        Código y accesos para vos
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
                    <h2 className={styles.techLabel}>Stack principal de Powa</h2>
                    <p className={styles.sectionSubtitle}>
                        Tecnologías que usamos con mayor frecuencia; las herramientas adicionales se eligen según el alcance de cada proyecto.
                    </p>
                    <div className={styles.stackSlider}>
                        <div className={styles.stackTrack}>
                            {[...featuredTechStack, ...featuredTechStack].map((tech, idx) => (
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
                        <h2 className={styles.sectionTitle}>Un socio tecnológico, <span className={styles.textGradient}>distintas capacidades</span></h2>
                        <p className={styles.sectionSubtitle}>Elegimos una solución proporcional a tu desafío: desde una mejora puntual hasta un producto digital a medida.</p>
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
                                    <span className={styles.sectionBadge}>INVERSIÓN Y ALCANCE</span>
                                    <h2 className={styles.budgetTitle}>
                                        Una propuesta clara, <span className={styles.textGradient}>sin sorpresas.</span>
                                    </h2>
                                    <p className={styles.budgetSubtitle}>
                                        Primero entendemos el objetivo y definimos entregables, etapas y tiempos. Después cotizamos el alcance acordado; no prometemos resultados que todavía no medimos.
                                    </p>
                                    <div className={styles.budgetFeatures}>
                                        <div className={styles.budgetFeature}>
                                            <FaCheckCircle className={styles.budgetFeatureIcon} />
                                            <div>
                                                <h4>Planes flexibles</h4>
                                                <p>Desde proyectos chicos hasta soluciones enterprise. Nos adaptamos a tu realidad, no al revés.</p>
                                            </div>
                                        </div>
                                        <div className={styles.budgetFeature}>
                                            <FaCheckCircle className={styles.budgetFeatureIcon} />
                                            <div>
                                                <h4>Entregas escalonadas</h4>
                                                <p>No necesitás toda la plata por adelantado. Dividimos el proyecto en fases para que inviertas a tu ritmo.</p>
                                            </div>
                                        </div>
                                        <div className={styles.budgetFeature}>
                                            <FaCheckCircle className={styles.budgetFeatureIcon} />
                                            <div>
                                                <h4>Expectativas transparentes</h4>
                                                <p>Separamos lo que incluye el desarrollo de los resultados que dependen de tu mercado, tus datos y la implementación.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col lg={6}>
                                <div className={styles.budgetVisual}>
                                    <div className={styles.budgetCard}>
                                        {/* ===== HEADER CON COTIZACIÓN Y TOGGLE ===== */}
                                        <div className={styles.budgetCardHeader}>
                                            <div className={styles.budgetCardHeaderTop}>
                                                <span className={styles.budgetCardBadge}>REFERENCIA ORIENTATIVA</span>

                                                {/* Toggle ARS / USD */}
                                                <div className={styles.budgetToggle}>
                                                    <button
                                                        type="button"
                                                        className={`${styles.budgetToggleBtn} ${moneda === 'ARS' ? styles.budgetToggleActive : ''}`}
                                                        onClick={() => setMoneda('ARS')}
                                                        aria-pressed={moneda === 'ARS'}
                                                    >
                                                        ARS
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`${styles.budgetToggleBtn} ${moneda === 'USD' ? styles.budgetToggleActive : ''}`}
                                                        onClick={() => setMoneda('USD')}
                                                        aria-pressed={moneda === 'USD'}
                                                    >
                                                        USD
                                                    </button>
                                                </div>
                                            </div>

                                            <h3 className={styles.budgetCardTitle}>Rangos estimados de desarrollo</h3>
                                            <p className={styles.budgetCardSubtitle}>
                                                Rangos generales por perfil y tipo de proyecto; no son tarifas de Powa ni una cotización.
                                            </p>

                                            {/* Cotización destacada */}
                                            <div className={styles.budgetRateBox}>
                                                <div className={styles.budgetRateLeft}>
                                                    <FaSyncAlt className={styles.budgetRateIcon} />
                                                    <div className={styles.budgetRateInfo}>
                                                        <span className={styles.budgetRateLabel}>Dólar oficial</span>
                                                        <span className={styles.budgetRateValue}>
                                                            {loadingDolar
                                                                ? 'Cargando...'
                                                                : `$ ${new Intl.NumberFormat('es-AR', {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2,
                                                                }).format(dolarVenta)}`}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={styles.budgetRateRight}>
                                                    {errorDolar ? (
                                                        <span className={styles.budgetRateError}>⚠ Valor de respaldo</span>
                                                    ) : (
                                                        <>
                                                            <span className={styles.budgetRateUpdatedLabel}>Actualizado</span>
                                                            <span className={styles.budgetRateUpdatedValue}>
                                                                {formatearFecha(dolarFecha)}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.budgetCardBody}>
                                            {/* ===== PERFILES ===== */}
                                            <div className={styles.budgetProfiles}>
                                                {preciosBase.perfiles.map((perfil) => (
                                                    <div
                                                        key={perfil.id}
                                                        className={`${styles.budgetProfileCard} ${perfil.destacado ? styles.budgetProfileActive : ''} ${perfil.senior ? styles.budgetProfileSenior : ''}`}
                                                    >
                                                        <span className={styles.budgetProfileBadge}>{perfil.badge} {perfil.label}</span>
                                                        <div className={styles.budgetProfileRange}>
                                                            <span className={styles.budgetProfilePrice}>
                                                                {formatearPrecio(perfil.rangoUSD[0])}
                                                            </span>
                                                            <span className={styles.budgetProfileSeparator}>—</span>
                                                            <span className={styles.budgetProfilePrice}>
                                                                {formatearPrecio(perfil.rangoUSD[1])}
                                                            </span>
                                                        </div>
                                                        <span className={styles.budgetProfileLabel}>por hora</span>
                                                        <div className={styles.budgetProfileTag}>
                                                            <FaUser className={styles.budgetProfileIcon} />
                                                            {perfil.exp}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* ===== TABLA DE PROYECTOS ===== */}
                                            <div className={styles.budgetProjectTable}>
                                                <h4 className={styles.budgetTableTitle}>
                                                    <FaCode className={styles.budgetTableIcon} />
                                                    Precios estimados por proyecto
                                                </h4>

                                                <div className={styles.budgetTable}>
                                                    {/* Header de la tabla */}
                                                    <div className={styles.budgetTableHeader}>
                                                        <div className={styles.budgetTableHeaderCell}>Proyecto</div>
                                                        <div className={styles.budgetTableHeaderCell}>🌱 Junior</div>
                                                        <div className={styles.budgetTableHeaderCell}>⚡ Semi-Senior</div>
                                                        <div className={styles.budgetTableHeaderCell}>🔥 Senior</div>
                                                        <div className={styles.budgetTableHeaderCell}>🏢 Agencia</div>
                                                    </div>

                                                    {preciosBase.proyectos.map((proy) => (
                                                        <div
                                                            key={proy.id}
                                                            className={`${styles.budgetTableRow} ${proy.destacado ? styles.budgetTableHighlight : ''}`}
                                                        >
                                                            <div className={styles.budgetTableCell}>{proy.nombre}</div>

                                                            <div className={styles.budgetTableCell}>
                                                                {formatearPrecioCorto(proy.rangos.junior[0])} - {formatearPrecioCorto(proy.rangos.junior[1])}
                                                            </div>

                                                            <div className={styles.budgetTableCell}>
                                                                {formatearPrecioCorto(proy.rangos.semi[0])} - {formatearPrecioCorto(proy.rangos.semi[1])}
                                                            </div>

                                                            <div className={styles.budgetTableCell}>
                                                                {formatearPrecioCorto(proy.rangos.senior[0])} - {formatearPrecioCorto(proy.rangos.senior[1])}
                                                            </div>

                                                            <div className={styles.budgetTableCell}>
                                                                {formatearPrecioCorto(proy.rangos.agencia[0])} - {formatearPrecioCorto(proy.rangos.agencia[1])}
                                                            </div>
                                                        </div>
                                                    ))}
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

                                                <p className={styles.budgetDisclaimer}>
                                                    * Valores orientativos. Cada proyecto se cotiza según alcance, complejidad e integraciones.
                                                </p>
                                            </div>

                                            {/* ===== CTA ===== */}
                                            <div className={styles.budgetCtaBox}>
                                                <div className={styles.budgetCtaContent}>
                                                    <FaWhatsapp className={styles.budgetCtaIcon} />
                                                    <div>
                                                        <p className={styles.budgetCtaText}>
                                                            ¿Buscás los precios de Powa?
                                                            <strong> Consultá los valores base por tipo de desarrollo.</strong>
                                                        </p>
                                                    </div>
                                                </div>
                                                <Link href="/planes/servicios/desarrollo" className={styles.budgetCtaButton}>
                                                    Ver precios de desarrollo
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
                        <span className={styles.sectionBadge}>SIMULADOR ORIENTATIVO</span>
                        <h2 className={styles.sectionTitle}>
                            Estimá el impacto de <span className={styles.textGradient}>mejorar tus procesos</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Usá tus propios datos para explorar un escenario posible. El cálculo depende de los supuestos que ingreses y no garantiza ahorros ni ventas.
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
                                <div className={styles.roiLabel}>Detectamos fugas de plata y tiempo</div>

                                <ul className={styles.roiList}>
                                    <li>
                                        <FaClock className={styles.roiListIcon} />
                                        Procesos manuales que te comen horas
                                    </li>
                                    <li>
                                        <FaUsers className={styles.roiListIcon} />
                                        Clientes que se van por mala experiencia
                                    </li>
                                    <li>
                                        <FaChartBar className={styles.roiListIcon} />
                                        Oportunidades de venta que no aprovechás
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
                                        Mejor experiencia para tus clientes
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
                                        <span className={styles.roiExampleLabel}>Escenario, no promesa</span>
                                        <p className={styles.roiExampleDetail}>
                                            El simulador usa los valores que ingreses y explicita el supuesto de recuperación para estimar un posible ahorro.
                                        </p>
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
                                        <span>Abrir simulador</span>
                                        <FaArrowRight className={styles.roiButtonIcon} />
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <p className={styles.roiIndustriesNote}>
                        La simulación no reemplaza una medición real ni una cotización del proyecto.
                    </p>
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
                                        <input type="hidden" name="access_key" value="6a22a375-6730-499d-ab20-b86e359f069d" />
                                        <input type="hidden" name="subject" value="📋 Nuevo diagnóstico técnico - Agencia Digital Powa" />
                                        <input type="hidden" name="from_name" value="Agencia Digital Powa" />
                                        <input type="hidden" name="redirect" value="https://agencia-powa.vercel.app/gracias" />
                                        <input type="hidden" name="origen" value="Diagnóstico - Página Principal" />

                                        <div className={styles.diagnosticoInputGroup}>
                                            <input type="text" name="nombre" className={styles.diagnosticoInput} placeholder="Tu nombre" required />
                                        </div>

                                        <div className={styles.diagnosticoInputGroup}>
                                            <input type="url" name="url" className={styles.diagnosticoInput} placeholder="URL de tu sitio web (ej: mipagina.com)" required />
                                            <input type="email" name="email" className={styles.diagnosticoInput} placeholder="Tu email" required />
                                        </div>

                                        <div className={styles.diagnosticoInputGroup}>
                                            <input type="tel" name="telefono" className={styles.diagnosticoInput} placeholder="Tu teléfono (opcional)" />
                                        </div>

                                        <div className={styles.diagnosticoInputGroup}>
                                            <textarea
                                                name="mensaje"
                                                className={styles.diagnosticoTextarea}
                                                placeholder="Contanos qué necesitás mejorar o qué problema tenés con tu sitio..."
                                                rows={3}
                                            />
                                        </div>

                                        <button type="submit" className={styles.diagnosticoButton}>
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

            {/* --- DEMOS --- */}
            <section className={styles.testimonialsSection}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>DEMOS DE PRODUCTO</span>
                        <h2 className={styles.sectionTitle}>Explorá soluciones <span className={styles.textGradient}>en funcionamiento</span></h2>
                        <p className={styles.sectionSubtitle}>
                            Estos proyectos muestran capacidades y conceptos funcionales; no son casos de resultados de clientes.
                        </p>
                    </div>
                    <div className="text-center">
                        <Link href="/portfolio" className={`${styles.btnPowaPrimary} text-decoration-none`}>
                            Ver demos y proyectos <FaArrowRight className="ms-2" />
                        </Link>
                    </div>
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
                                En la industria del software, la seriedad no se demuestra solo escribiendo código, sino protegiendo el negocio del cliente. En cada desarrollo metemos protocolos de nivel enterprise.
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
                                <Link href="/planes/servicios/desarrollo" className={styles.btnCtaSecondary}>
                                    Ver opciones de desarrollo
                                </Link>
                                <Link href="/planes" className={styles.btnCtaSecondary}>
                                    Ver Planes de Mantenimiento
                                </Link>
                            </div>
                            <div className={styles.ctaTrustBadges}>
                                <span>✅ Sin compromiso</span>
                                <span>🔒 100% confidencial</span>
                                <span>⚡ Respuesta en 1 día hábil</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}