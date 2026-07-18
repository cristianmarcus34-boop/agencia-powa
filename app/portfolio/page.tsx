'use client';

import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BsButton from 'react-bootstrap/Button';
const Button = BsButton as any;
import Image from 'next/image';

// ============================================================ //
// ICONOS - IMPORTACIONES MODERNAS
// ============================================================ //
import {
  FaCode,
  FaRocket,
  FaReact,
  FaPython,
  FaMobileAlt,
  FaServer,
  FaImages,
  FaChevronRight,
  FaStar,
  FaAward,
  FaClock,
  FaUsers,
  FaDatabase,
  FaCloudUploadAlt,
  FaShieldAlt,
  FaArrowRight,
  FaLeaf,
  FaWhatsapp,
  FaPalette,
  FaCut,
  FaSwimmer,
  FaSeedling,
  FaCalendarCheck,
  FaTree,
  FaPaw,
} from 'react-icons/fa';

// ============================================================ //
// ICONOS ADICIONALES (Font Awesome 6)
// ============================================================ //
import { FaScissors } from 'react-icons/fa6';

import Link from 'next/link';
import GimnasioDemo from '@/components/demos/GimnasioDemo';
import ReservaDemo from '@/components/demos/ReservaDemo';
import ProjectModal from '@/components/ProjectModal';
import styles from './portfolio.module.css';

// ============================================================ //
// INTERFACES
// ============================================================ //
interface Project {
  title: string;
  icon: React.ReactNode;
  image?: string;
  description: string;
  longDescription?: string;
  link: string;
  github?: string;
  tag: string;
  tech: string[];
  galleryImages: string[] | null;
  featured?: boolean;
  demoComponent?: React.ReactNode;
  year?: string;
  category?: string;
}

// ============================================================ //
// DATA DE PROYECTOS
// ============================================================ //
const PROJECTS_DATA: Project[] = [
  // ============================================================ //
  // 🚀 PROYECTO: KUBIC.AI (DESTACADO)
  // ============================================================ //
  {
    title: "Kubic.ai — Micro-espacios Inteligentes",
    icon: <FaRocket className="text-primary-400" />,
    image: "/proyectos/kubic-ia.jpg",
    description: "Plataforma SaaS + PropTech para alquiler de micro-espacios automatizados con IA. Gestión 100% autónoma de almacenamiento, estudios streaming y oficinas cápsula 24/7.",
    longDescription: `
      🚀 KUBIC.AI — Revolucionando el Espacio Urbano con IA

      Kubic.ai es una plataforma SaaS + PropTech que conecta a profesionales y empresas con micro-espacios inteligentes, totalmente automatizados y disponibles 24/7.

      ## 🔥 El Problema
      El espacio urbano es cada vez más caro y difícil de gestionar. Los profesionales necesitan flexibilidad: a veces un estudio de streaming, otras una oficina para una reunión, o simplemente un espacio de almacenamiento seguro.

      ## 💡 La Solución
      Una plataforma que permite reservar y gestionar espacios automatizados con IA en segundos. Sin papeleo, sin filas, sin intervención humana.

      ## 🏗️ Arquitectura Técnica
      **Frontend:** Next.js 16 con App Router y Turbopack, TypeScript, Tailwind CSS 4, Framer Motion
      **Backend & Servicios:** Next.js API Routes, EmailJS, Google Maps Platform
      **DevOps:** Vercel, CI/CD con GitHub Actions, dominio personalizado y SSL automático
      **UX/UI:** Modo oscuro nativo, microinteracciones, formularios con validación en tiempo real, mapa interactivo
    `,
    link: "https://kubic-ai.vercel.app",
    github: "https://github.com/cristianmarcus34-boop/kubic.ai",
    tag: "",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "EmailJS", "Google Maps API", "Vercel"],
    featured: true,
    year: "2026",
    category: "SaaS",
    galleryImages: [
      "/proyectos/kubic-hero.jpg",
      "/proyectos/kubic-servicios.jpg",
      "/proyectos/kubic-precios.jpg",
      "/proyectos/kubic-contacto.jpg",
      "/proyectos/kubic-mapa.jpg",
      "/proyectos/kubic-mobile.jpg",
    ],
  },

  // ============================================================ //
  // ✂️ PROYECTO: BARBERÍA EL RULO (DESTACADO)
  // ============================================================ //
  {
    title: "Barbería El Rulo — Sistema de Reservas",
    icon: <FaScissors className="text-primary-400" />,
    image: "/proyectos/barberia.webp",
    description: "Sistema completo de gestión de turnos con seña vía MercadoPago. Calendario interactivo en tiempo real, panel de administración y notificaciones automáticas.",
    longDescription: `
      ✂️ Barbería El Rulo — Sistema de Gestión de Turnos

      Desarrollo de una aplicación web completa para la gestión de turnos de una barbería, con integración de pagos y sistema de recordatorios automáticos.

      ## 🔥 El Problema
      La barbería manejaba los turnos de forma manual, lo que generaba:
      • Doble reserva de horarios
      • Pérdida de clientes por falta de recordatorios
      • Dificultad para gestionar la disponibilidad en tiempo real

      ## 💡 La Solución
      Una aplicación web que permite:
      • Reserva de turnos con seña vía MercadoPago
      • Calendario interactivo con disponibilidad en tiempo real
      • Panel de administración con estadísticas y gestión de turnos
      • Recordatorios automáticos vía email (cron job)
      • Modo demo para pruebas sin pago real

      ## 🏗️ Arquitectura Técnica
      **Frontend:** Next.js 16 con App Router, React 19, TypeScript
      **Estilos:** Tailwind CSS 4 con diseño moderno y sofisticado
      **Base de datos:** Supabase con RLS (Row Level Security)
      **Pagos:** MercadoPago (sandbox y producción)
      **Emails:** Resend para confirmaciones y recordatorios
      **Despliegue:** Vercel con CI/CD

      ## 📊 Resultados
      • Reducción del 100% de dobles reservas
      • Aumento de la satisfacción del cliente
      • Automatización de recordatorios
      • Panel de administración intuitivo
    `,
    link: "https://barberia-next-indol.vercel.app/",
    github: "https://github.com/cristianmarcus34-boop/barberia-next",
    tag: "",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "MercadoPago", "Resend", "Vercel"],
    featured: true,
    year: "2026",
    category: "SaaS",
    galleryImages: [
      "/proyectos/barberia-hero.jpg",
      "/proyectos/barberia-calendario.jpg",
      "/proyectos/barberia-modal.jpg",
      "/proyectos/barberia-admin.jpg",
      "/proyectos/barberia-mobile.jpg",
    ],
  },

  // ============================================================ //
  // 🌿 PROYECTO: VIVERO VERDE (DESTACADO)
  // ============================================================ //
  {
    title: "Vivero Verde — Sitio Web Tradicional",
    icon: <FaTree className="text-primary-400" />,
    image: "/proyectos/vivero.jpg",
    description: "Sitio web tradicional para vivero con HTML, CSS y JavaScript puro. Catálogo completo de plantas, macetas, tierra y accesorios con filtros por categoría y búsqueda en tiempo real.",
    longDescription: `
      🌿 Vivero Verde — Sitio Web Tradicional

      Desarrollo de un sitio web completo para un vivero, utilizando tecnologías web tradicionales (HTML, CSS, JavaScript) con Next.js 16 como framework.

      ## 🎯 El Proyecto
      Un sitio web estático y eficiente que permite a los clientes explorar el catálogo de productos del vivero: plantas, macetas, tierra, herramientas y accesorios.

      ## 💡 Características Principales
      • **Catálogo de productos** con arrays locales (sin base de datos)
      • **Filtros por categoría** (plantas, macetas, tierra, herramientas, decoración)
      • **Búsqueda en tiempo real** de productos
      • **Diseño responsive** para todos los dispositivos
      • **Formulario de contacto** con validación
      • **Banner informativo** de sitio web tradicional

      ## 🏗️ Arquitectura Técnica
      **Framework:** Next.js 16 con App Router
      **Frontend:** React 19, CSS Modules
      **Estilos:** Tailwind CSS 4
      **Datos:** Arrays en JavaScript (sin base de datos)
      **Despliegue:** Vercel con CI/CD
    `,
    link: "https://vivero-verde.vercel.app",
    github: "https://github.com/cristianmarcus34-boop/vivero-verde",
    tag: "",
    tech: ["Next.js 16", "React 19", "Tailwind CSS", "CSS Modules", "JavaScript", "Vercel"],
    featured: true,
    year: "2026",
    category: "Landing Page",
    galleryImages: [
      "/proyectos/vivero-hero.jpg",
      "/proyectos/vivero-productos.jpg",
      "/proyectos/vivero-contacto.jpg",
      "/proyectos/vivero-mobile.jpg",
    ],
  },

  // ============================================================ //
  // 🐾 PROYECTO: PETSHOP SOLUTIONS (DESTACADO)
  // ============================================================ //
  {
    title: "Petshop Solutions — Consultoría Digital",
    icon: <FaPaw className="text-primary-400" />,
    image: "/proyectos/petshop.jpg",
    description: "Plataforma de consultoría digital para petshops. Cuestionario interactivo de 4 pasos que recomienda la solución ideal (Básica, Dashboard o Premium) para digitalizar tu negocio de mascotas.",
    longDescription: `
      🐾 Petshop Solutions — Consultoría Digital para Petshops

      Plataforma de consultoría digital que ayuda a dueños de negocios de mascotas a encontrar la solución tecnológica perfecta.

      ## 🎯 Características Principales
      • **Cuestionario interactivo** de 4 pasos
      • **Recomendación personalizada** con IA
      • **3 planes** (Básico, Dashboard, Premium)
      • **Envío de leads** por WhatsApp
      • **Web3** - Conexión con MetaMask
      • **Demo de productos** con filtros

      ## 🏗️ Arquitectura Técnica
      **Framework:** Next.js 16 con App Router
      **Frontend:** React 19, Tailwind CSS
      **Estilos:** CSS Modules
      **Emails:** Web3Forms
      **Despliegue:** Vercel

      ## 📊 Tecnologías Utilizadas
      • Next.js 16 (App Router)
      • React 19
      • Tailwind CSS
      • Web3 / Ethers
      • Web3Forms
      • Vercel
    `,
    link: "https://petshop-solutions-y9aq.vercel.app/",
    github: "https://github.com/cristianmarcus34-boop/petshop-solutions",
    tag: "",
    tech: ["Next.js 16", "React 19", "Tailwind CSS", "Web3", "Ethers", "Web3Forms", "Vercel"],
    featured: true,
    year: "2026",
    category: "Landing Page",
    galleryImages: [
      "/proyectos/petshop-hero.jpg",
      "/proyectos/petshop-cuestionario.jpg",
      "/proyectos/petshop-opciones.jpg",
      "/proyectos/petshop-mobile.jpg",
    ],
  },

  // ============================================================ //
  // 🐾 PROYECTO: VET SOLUTIONS (DESTACADO)
  // ============================================================ //
  {
    title: "Vet Solutions — Consultoría Digital",
    icon: <FaPaw className="text-primary-400" />,
    image: "/proyectos/veterinaria.jpg",
    description: "Plataforma de consultoría digital para clínicas veterinarias. Cuestionario interactivo de 4 pasos que recomienda el plan ideal (Básico, Profesional o Premium) para digitalizar tu clínica.",
    longDescription: `
      🐾 Vet Solutions — Consultoría Digital para Veterinarias

      Plataforma de consultoría digital que ayuda a clínicas veterinarias a encontrar la solución tecnológica perfecta para su gestión diaria.

      ## 🎯 Características Principales
      • **Cuestionario interactivo** de 4 pasos
      • **Recomendación personalizada** de planes
      • **3 planes** (Básico, Profesional, Premium)
      • **Envío de leads** por WhatsApp
      • **Página de demo** interactiva
      • **Formulario de contacto** con Web3Forms

      ## 🏗️ Arquitectura Técnica
      **Framework:** Next.js 16 con App Router
      **Frontend:** React 19, Tailwind CSS
      **Estilos:** CSS Modules
      **Emails:** Web3Forms
      **Despliegue:** Vercel

      ## 📊 Tecnologías Utilizadas
      • Next.js 16 (App Router)
      • React 19
      • Tailwind CSS
      • Web3Forms
      • Vercel
    `,
    link: "https://vet-solutions.vercel.app/",
    github: "https://github.com/cristianmarcus34-boop/vet-solutions",
    tag: "",
    tech: ["Next.js 16", "React 19", "Tailwind CSS", "Web3Forms", "Vercel"],
    featured: true,
    year: "2026",
    category: "Landing Page",
    galleryImages: [
      "/proyectos/vet-hero.jpg",
      "/proyectos/vet-planes.jpg",
      "/proyectos/vet-cuestionario.jpg",
      "/proyectos/vet-mobile.jpg",
    ],
  },

  // ============================================================ //
  // 🎉 PROYECTO: EVENT SOLUTIONS (NUEVO - DESTACADO)
  // ============================================================ //
  {
    title: "Event Solutions — Consultoría Digital",
    icon: <FaCalendarCheck className="text-primary-400" />,
    image: "/proyectos/eventos.jpg",
    description: "Plataforma de consultoría digital para salones de eventos. Cuestionario interactivo de 4 pasos que recomienda el plan ideal (Básico, Profesional o Premium) para digitalizar tu salón.",
    longDescription: `
      🎉 Event Solutions — Consultoría Digital para Salones de Eventos

      Plataforma de consultoría digital que ayuda a dueños de salones de eventos a encontrar la solución tecnológica perfecta para su negocio.

      ## 🎯 Características Principales
      • **Cuestionario interactivo** de 4 pasos
      • **Recomendación personalizada** de planes
      • **3 planes** (Básico, Profesional, Premium)
      • **Envío de leads** por WhatsApp
      • **Página de demo** interactiva
      • **Formulario de contacto** con Web3Forms

      ## 🏗️ Arquitectura Técnica
      **Framework:** Next.js 16 con App Router
      **Frontend:** React 19, Tailwind CSS
      **Estilos:** CSS Modules
      **Emails:** Web3Forms
      **Despliegue:** Vercel

      ## 📊 Tecnologías Utilizadas
      • Next.js 16 (App Router)
      • React 19
      • Tailwind CSS
      • Web3Forms
      • Vercel
    `,
    link: "https://event-solutions-ten.vercel.app/",
    github: "https://github.com/cristianmarcus34-boop/event-solutions",
    tag: "",
    tech: ["Next.js 16", "React 19", "Tailwind CSS", "Web3Forms", "Vercel"],
    featured: true,
    year: "2026",
    category: "Landing Page",
    galleryImages: [
      "/proyectos/event-hero.jpg",
      "/proyectos/event-planes.jpg",
      "/proyectos/event-cuestionario.jpg",
      "/proyectos/event-mobile.jpg",
    ],
  },

  // ============================================================ //
  // PROYECTO: JARDINERÍA Y PISCINAS
  // ============================================================ //
  {
    title: "Jardinería y Piscinas",
    icon: <FaLeaf className="text-primary-400" />,
    image: "/proyectos/jardineria.jpg",
    description: "Landing page moderna y sofisticada para servicios de jardinería y mantenimiento de piscinas. Galería interactiva con filtros, formulario con validación en tiempo real, sección de testimonios y sistema de contacto integrado con WhatsApp.",
    longDescription: `
      Jardinería y Piscinas es una landing page completa para una empresa de servicios de jardinería y mantenimiento de piscinas.

      🏗️ Arquitectura:
      • Django 5.1.6 con WhiteNoise para archivos estáticos
      • Bootstrap 5 + CSS personalizado con variables CSS
      • JavaScript vanilla para interacciones (filtros, lightbox, acordeón)

      🎨 Diseño:
      • Interfaz moderna con efectos visuales premium (glassmorphism, gradientes)
      • Microinteracciones y animaciones con AOS
      • Footer con acordeón para experiencia móvil óptima

      📱 Experiencia de usuario:
      • Diseño responsive y mobile-first
      • Formulario con labels flotantes y validación en tiempo real
      • Contadores animados de estadísticas
      • Lightbox con navegación por teclado
      • Galería interactiva con filtros por categoría
    `,
    link: "https://jardineria-dun.vercel.app",
    github: "https://github.com/cristianmarcus34-boop/Jardineria",
    tag: "",
    tech: ["Django", "Python", "HTML5", "CSS3", "JavaScript", "Bootstrap", "Vercel"],
    featured: true,
    year: "2026",
    category: "Landing Page",
    galleryImages: [
      "/proyectos/jardineria-hero.jpg",
      "/proyectos/jardineria-servicios.jpg",
      "/proyectos/jardineria-galeria.jpg",
      "/proyectos/jardineria-formulario.jpg",
      "/proyectos/jardineria-mobile.jpg",
    ],
  },

  // ============================================================ //
  // PROYECTO: KRUSTY BURGER APP
  // ============================================================ //
  {
    title: "Krusty Burger App",
    icon: <FaMobileAlt className="text-primary-400" />,
    image: "/proyectos/krustyburger.webp",
    description: "App web de delivery con arquitectura moderna. El proyecto nativo está en desarrollo activo.",
    longDescription: `
    🍔 Krusty Burger App — App Web de Delivery con Visión Nativa

    ## 🎯 El Proyecto

    Krusty Burger App es una aplicación web de delivery de hamburguesas, desarrollada con Next.js 16 y Supabase.

    ## 📱 Estado Actual

    - ✅ **App Web:** Funcional y en producción
    - 🚧 **App Nativa:** En desarrollo activo
    - 🔄 **Base de datos:** Supabase para sincronización en tiempo real

    ## 🛠️ Tecnologías

    - **App Web:** Next.js 16, Tailwind CSS
    - **Backend:** Supabase (PostgreSQL + Realtime)
    - **App Nativa (en desarrollo):** React Native, Expo Core

    ## ⏳ Próximos Pasos

    - Finalizar la app nativa 
    - Sincronizar datos entre web y mobile
    - Publicar en Play Store y App Store
  `,
    link: "https://www.krustyburger.com.ar/",
    github: "https://github.com/cristianmarcus34-boop/krusty-burger",
    tag: "",
    tech: ["Next.js 16", "React Native", "Expo Core", "Supabase", "Tailwind CSS"],
    featured: false,
    year: "2025",
    category: "Mobile",
    galleryImages: [
      "/krustyappminiatura.png",
      "/menuprincipalminiatura.png",
      "/perfilmini.png",
      "/panelperfil.png",
    ],
  },

  // ============================================================ //
  // PROYECTO: CAPRICCIO DE PIZZA (REACT)
  // ============================================================ //
  {
    title: "Capriccio de Pizza (React)",
    icon: <FaReact className="text-primary-400" />,
    image: "/proyectos/capriccioreact.webp",
    description: "Plataforma e-commerce con SSR avanzado. Reducción de latencia y Core Web Vitals optimizados para SEO.",
    longDescription: `
      Capriccio de Pizza es una plataforma e-commerce construida con React 18 y Firebase. Implementa SSR avanzado para optimizar el rendimiento y los Core Web Vitals, mejorando significativamente el posicionamiento SEO del sitio.
    `,
    link: "https://capiccio-de-pizza.web.app/",
    github: "https://github.com/cristianmarcus34-boop/capriccio-react",
    tag: "",
    tech: ["React 18", "Firebase", "Optimization"],
    featured: false,
    year: "2024",
    category: "E-commerce",
    galleryImages: null
  },

  // ============================================================ //
  // PROYECTO: CAPRICCIO ENGINE (DJANGO)
  // ============================================================ //
  {
    title: "Capriccio Engine (Django)",
    icon: <FaPython className="text-primary-400" />,
    image: "/proyectos/capricciodjango.jpg",
    description: "Backend de grado corporativo con Python/Django. Implementación de CI/CD y bases de datos relacionales robustas.",
    longDescription: `
      Capriccio Engine es el backend corporativo desarrollado con Python y Django que potencia la plataforma de e-commerce. Incluye implementación de CI/CD con GitHub Actions, bases de datos relacionales PostgreSQL y una API Rest completamente documentada.
    `,
    link: "https://capricciodepizza.onrender.com/",
    github: "https://github.com/cristianmarcus34-boop/capriccio-engine",
    tag: "",
    tech: ["Django", "PostgreSQL", "API Rest"],
    year: "2024",
    category: "Backend",
    galleryImages: null
  },

  // ============================================================ //
  // PROYECTO: LA ABU MATIE APP
  // ============================================================ //
  {
    title: "La Abu Matie App",
    icon: <FaServer className="text-primary-400" />,
    image: "/proyectos/laabumatie.jpeg",
    description: "Gestión administrativa automatizada. Interfaz diseñada bajo principios de accesibilidad y eficiencia operativa.",
    longDescription: `
      La Abu Matie App es un sistema de gestión administrativa automatizado. La interfaz fue diseñada siguiendo principios de accesibilidad WCAG y eficiencia operativa, permitiendo a los administradores gestionar inventario, pedidos y clientes desde un único dashboard.
    `,
    link: "https://la-abu-matie-app.web.app/",
    github: "https://github.com/cristianmarcus34-boop/la-abu-matie",
    tag: "",
    tech: ["Material UI", "Realtime DB", "NoSQL"],
    year: "2025",
    category: "Dashboard",
    galleryImages: null
  },

  // ============================================================ //
  // PROYECTO: GIMNASIO & NUTRICIÓN
  // ============================================================ //
  {
    title: "Gimnasio & Nutrición",
    icon: <FaMobileAlt className="text-primary-400" />,
    image: "/proyectos/gimnasio.webp",
    description: "Ecosistema para gestión de centros fitness con integración nutricional y seguimiento de progreso en tiempo real.",
    longDescription: `
      Gimnasio & Nutrición es un ecosistema digital para la gestión de centros fitness. Incluye integración nutricional, seguimiento de progreso en tiempo real y paneles de control para entrenadores y clientes.
    `,
    link: "#",
    tag: "",
    tech: ["Next.js", "Supabase", "Tailwind"],
    year: "2025",
    category: "Health",
    galleryImages: null,
    demoComponent: <GimnasioDemo />
  },

  // ============================================================ //
  // PROYECTO: POWA SCHEDULE
  // ============================================================ //
  {
    title: "Powa Schedule",
    icon: <FaCloudUploadAlt className="text-primary-400" />,
    image: "/proyectos/powaschedule.jpg",
    description: "Sistema de gestión de turnos y consultorías con disponibilidad en tiempo real y notificaciones automáticas.",
    longDescription: `
      Powa Schedule es un sistema SaaS para la gestión de turnos y consultorías. Ofrece disponibilidad en tiempo real, notificaciones automáticas vía email y WhatsApp, y un panel de administración completo para gestionar reservas y clientes.
    `,
    link: "#",
    tag: "",
    tech: ["Next.js", "Supabase", "React"],
    year: "2025",
    category: "SaaS",
    galleryImages: null,
    demoComponent: <ReservaDemo />
  },
];

// ============================================================ //
// COMPONENTE PRINCIPAL
// ============================================================ //
export default function PortfolioPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const stats = useMemo(() => [
    { value: "+28", label: "Proyectos Entregados", icon: <FaAward /> },
    { value: "99%", label: "Uptime Garantizado", icon: <FaClock /> },
    { value: "+28", label: "Clientes Activos", icon: <FaUsers /> },
    { value: "Next.js", label: "Stack Principal", icon: <FaCode /> }
  ], []);

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(PROJECTS_DATA.map(p => p.category).filter(Boolean))];
    return cats as string[];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(p => p.category === filter);
  }, [filter]);

  const handleShowModal = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const featuredProjects = PROJECTS_DATA.filter(p => p.featured);

  return (
    <div className={styles.portfolioWrapper}>
      <div className={styles.ambientGlow} />
      <div className={styles.ambientGlowSecondary} />

      <Container className={styles.heroSection}>
        <header className="text-center">
          <div className={styles.badgeWrapper}>
            <span className={styles.badgePowa}>CASOS DE ESTUDIO</span>
          </div>
          <h1 className={styles.portfolioTitleMain}>
            Software de <span className={styles.textGradient}>Alto Impacto</span>
          </h1>
          <p className={styles.portfolioLeadText}>
            Soluciones de ingeniería que transforman la visión de negocio en productos escalables,
            seguros y centrados en el usuario.
          </p>

          <div className={styles.featuredBadge}>
            <FaStar className={styles.featuredIcon} />
            <span>Proyectos Destacados</span>
            <span className={styles.featuredCount}>{featuredProjects.length}</span>
          </div>
        </header>
      </Container>

      <Container className="pb-5">
        <Row className="mb-5 g-3">
          {stats.map((stat, i) => (
            <Col xs={6} md={3} key={i}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </Col>
          ))}
        </Row>

        <div className={styles.filterSection}>
          <div className={styles.filterWrapper}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterButton} ${filter === cat ? styles.filterActive : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? 'Todos' : cat}
              </button>
            ))}
          </div>
          <span className={styles.filterCount}>
            {filteredProjects.length} Proyectos
          </span>
        </div>

        <div className={styles.gridHeader}>
          <h2 className={styles.sectionDivider}>
            <FaCode className={styles.iconBlue} /> Catálogo de Ingeniería
          </h2>
          <div className={styles.lineDivider} />
        </div>

        <Row className="g-4">
          {filteredProjects.map((project, index) => (
            <Col md={6} lg={4} key={index} className={project.featured ? styles.featuredCol : ''}>
              <div className={`${styles.powaProjectCard} ${project.featured ? styles.featuredCard : ''}`}>
                {/* ============================================ */}
                {/* IMAGEN MEJORADA - CON object-fit COVER */}
                {/* ============================================ */}


                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardYear}>{project.year || '2025'}</span>
                    <span className={styles.cardCategory}>{project.category || 'General'}</span>
                  </div>
                  <div className={styles.techStack}>
                    {project.tech.map((t, i) => <span key={i} className={styles.techItem}>{t}</span>)}
                  </div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDescription}>{project.description}</p>

                  <div className={styles.cardFooter}>
                    <Button
                      variant="link"
                      href={project.link}
                      target="_blank"
                      className={styles.linkAction}
                    >
                      EXPLORAR <FaChevronRight size={10} className="ms-1" />
                    </Button>
                    {(project.galleryImages || project.demoComponent) && (
                      <button onClick={() => handleShowModal(project)} className={styles.iconAction} title="Ver Detalles">
                        <FaArrowRight />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <section className={styles.ctaWrapper}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaContent}>
              <FaRocket className={styles.ctaIcon} />
              <h3 className={styles.ctaTitle}>¿Necesitas escalar tu infraestructura digital?</h3>
              <p className={styles.ctaSubtitle}>Analicemos la viabilidad técnica de tu próximo proyecto.</p>
              <div className={styles.ctaBadges}>
                <span>✅ Sin compromiso</span>
                <span>⚡ Diagnóstico en 24hs</span>
                <span>🔒 100% confidencial</span>
              </div>
              <Link href="/contact" className={styles.btnCtaModern}>
                AGENDAR CONSULTORÍA <FaRocket className="ms-2" />
              </Link>
            </div>
          </div>
        </section>
      </Container>

      {selectedProject && (
        <ProjectModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          project={selectedProject}
        />
      )}
    </div>
  );
}