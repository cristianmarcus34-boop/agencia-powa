// app/portfolio/projects-data.tsx
import React from 'react';
import {
    FaCode,
    FaRocket,
    FaIndustry,
    FaReact,
    FaPython,
    FaMobileAlt,
    FaServer,
    FaCloudUploadAlt,
    FaLeaf,
    FaCalendarCheck,
    FaTree,
    FaPaw,
    FaHeart,
    FaMusic,
} from 'react-icons/fa';
import { FaScissors } from 'react-icons/fa6';
import GimnasioDemo from '@/components/demos/GimnasioDemo';
import ReservaDemo from '@/components/demos/ReservaDemo';

// ============================================================ //
// INTERFACE
// ============================================================ //
export interface Project {
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
    priceRange?: string;
}

// ============================================================ //
// DATA DE PROYECTOS
// ============================================================ //
export const PROJECTS_DATA: Project[] = [
    // 🎭 PROYECTO: REMOLINO FOLKLÓRICO (DESTACADO) 🆕
    {
        title: 'Remolino Folklórico — Sitio Web + Panel de Administración',
        icon: <FaMusic className="text-primary-400" />,
        image: '/proyectos/remolino-folklorico.jpeg',
        description:
            'Sitio web oficial del ballet  Remolino Folklórico (Quilmes). Incluye sitio público con hero 3D interactivo, historia del grupo, galería, eventos y contrataciones, más un panel de administración completo con CRUD de eventos, gestión de imágenes y mensajes.',
        longDescription: `
      🎭 Remolino Folklórico — Sitio web oficial + Panel de administración

      Sitio web del ballet folclórico **Remolino Folklórico**, un grupo integrado por mujeres que lleva el folclor a cada escenario. Nacido el 8 de noviembre de 2025 del encuentro entre amigas que querían volver a bailar juntas, hoy es un ballet que crece al ritmo de sus raíces.

      ## ✨ Características Principales

      **Sitio público:**
      • **Inicio** con hero 3D (remolino de partículas con Three.js que reacciona al mouse) y texto con entrada escalonada
      • **Nosotros** con la historia completa del grupo (origen, iniciativa, primeros pasos, presente) y valores reales (Amistad, Iniciativa, Comunidad)
      • **Galería** con imagen destacada + grilla de imágenes desde la base de datos
      • **Eventos** con listado de próximas presentaciones ordenadas por fecha
      • **Contrataciones** con servicios, formulario de contacto que guarda en base de datos y botón de WhatsApp
      • **Sección "Sumate al grupo"** con horarios y lugar de ensayo (Lunes y miércoles · 19 hs, Soc. de Fomento Barrio General Belgrano)
      • **Animaciones** con scroll reveal y entrada escalonada del hero
      • **Accesibilidad**: respeta prefers-reduced-motion

      **Panel de administración (protegido con auth):**
      • **Eventos**: crear, editar y eliminar presentaciones
      • **Galería**: subir imágenes a Vercel Blob, elegir sección, cambiar de sección y eliminar
      • **Mensajes**: ver consultas del formulario, marcar como leído, borrar, responder por email o WhatsApp
      • **Badge** con cantidad de no leídos en el navbar

      ## 🏗️ Arquitectura Técnica
      **Framework:** Astro 7 (modo híbrido: sitio público estático + panel SSR)
      **UI interactiva:** React (solo para componentes del panel)
      **Base de datos:** Neon (Postgres serverless)
      **ORM:** Drizzle
      **Autenticación:** Better Auth (email + contraseña)
      **Almacenamiento de imágenes:** Vercel Blob
      **3D:** Three.js (remolino de partículas en el hero)
      **Despliegue:** Vercel
      **Tipografías:** Fraunces (títulos) + Inter (cuerpo) vía next/font

      ## 🔎 SEO y Open Graph
      Open Graph + Twitter Card por página, canonical, favicons completos (apple-touch-icon, favicon-32x32, favicon-16x16, manifest) y tagline en el footer.
    `,
        link: 'https://remolino-folklorico.vercel.app/',
        github: 'https://github.com/cristianmarcus34-boop/remolino-folklorico',
        tag: '',
        tech: ['Astro 7', 'React', 'TypeScript', 'Three.js', 'Neon', 'Drizzle', 'Better Auth', 'Vercel Blob', 'Vercel'],
        featured: true,
        year: '2026',
        category: 'Institucional',
        galleryImages: null, // opcional: subí capturas y armá el array
    },
    // 🍲 PROYECTO: VIANDAS FLORIDA (DESTACADO)
    {
        title: 'Viandas Florida — Landing Page Gastronómica',
        icon: <FaLeaf className="text-primary-400" />,
        image: '/proyectos/logoredondoviandas.jpeg',
        description:
            'Landing page para un servicio de viandas caseras en Florida. Presenta el menú semanal, permite armar pedidos para consultar por WhatsApp e incluye un panel para administrar platos y publicaciones.',
        longDescription: `
      🍲 Viandas Florida — Comida casera, todos los días

      Landing page para un emprendimiento de viandas caseras en Florida. La experiencia presenta la propuesta del negocio y acompaña al cliente desde la consulta del menú semanal hasta la coordinación del pedido por WhatsApp.

      ## ✨ Características principales
      • **Presentación del negocio** con diseño responsive, navegación por secciones y llamados a la acción
      • **Menú semanal público** con platos, categorías, precios y disponibilidad
      • **Armado de pedidos** con cantidades, total estimado y notas para enviar por WhatsApp
      • **Panel de administración** para gestionar productos y menús semanales
      • **Imágenes de productos** administradas mediante Supabase Storage
      • **Carta de muestra** cuando todavía no está configurado el menú publicado

      ## 🏗️ Arquitectura técnica
      **Framework:** Next.js 16 con App Router
      **Frontend:** React 19 y TypeScript
      **Estilos:** Tailwind CSS 4 y CSS personalizado
      **Iconografía:** lucide-react
      **Datos y autenticación:** Supabase (PostgreSQL, Auth y Row Level Security)
      **Despliegue:** Vercel

      ## 🔎 SEO y presencia local
      Incluye metadatos y URLs canónicas, Open Graph y Twitter Cards, sitemap, robots.txt y datos estructurados de tipo FoodEstablishment.
    `,
        link: 'https://viandas-florida.vercel.app/',
        github: 'https://github.com/cristianmarcus34-boop/viandas-florida',
        tag: '',
        tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Supabase', 'lucide-react', 'Vercel'],
        featured: true,
        year: '2026',
        category: 'Landing Page',
        galleryImages: null,
    },

    // 🎁 PROYECTO: TIENDA DE EMOCIONES (DESTACADO)
    {
        title: 'Tienda de Emociones — E-commerce Emocional',
        icon: <FaHeart className="text-primary-400" />,
        image: '/proyectos/tiendaemociones.jpeg',
        description:
            'E-commerce de regalos con identidad emocional. Next.js 16 con App Router, carrito persistente, checkout con MercadoPago y transferencia, panel de administración y sistema de testimonios moderados.',
        longDescription: `
      🎁 Tienda de Emociones — E-commerce con Alma

      Plataforma de e-commerce completa para una tienda de regalos con identidad emocional. Cada detalle está pensado para transmitir calidez: desde la paleta cálida (coral, blush y verde oliva) hasta las microinteracciones con Framer Motion.

      ## 🎯 Sobre el Proyecto
      E-commerce full-stack que combina catálogo de productos con filtros por categoría, carrito persistente en localStorage, checkout con múltiples métodos de pago (MercadoPago y transferencia por alias), panel de administración y sistema de opiniones moderadas.

      ## ✨ Características Principales
      • **Home emocional** con hero animado, trust strip y storytelling de marca
      • **Catálogo con filtros** por categoría, búsqueda y ordenamiento
      • **Carrito persistente** con drawer lateral y cálculo de subtotal
      • **Checkout completo** con datos del cliente, método de envío y pago
      • **Pago con MercadoPago** y alternativa por transferencia con alias
      • **Sistema de opiniones** con moderación (formulario público + aprobación admin)
      • **Panel de administración** protegido para gestionar productos, pedidos y testimonios
      • **Diseño responsive** con paleta cálida custom y tipografías premium
      • **SEO técnico** con metadatos por página

      ## 🏗️ Arquitectura Técnica
      **Framework:** Next.js 16 con App Router
      **Lenguaje:** TypeScript
      **Estilos:** Tailwind CSS v4 + CSS custom properties
      **Animaciones:** Framer Motion
      **Íconos:** lucide-react
      **Fuentes:** DM Sans + Playfair Display vía next/font
      **Persistencia:** localStorage para carrito + base de datos para pedidos y opiniones
      **Pagos:** MercadoPago (sandbox y producción) + transferencia bancaria ::> a integrar
      **Deploy:** Vercel con CI/CD automático
    `,
        link: 'https://tienda-de-emociones.vercel.app/',
        github: 'https://github.com/cristianmarcus34-boop/tienda-de-emociones',
        tag: '',
        tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'lucide-react', 'MercadoPago', 'Vercel'],
        featured: true,
        year: '2026',
        category: 'E-commerce',
        galleryImages: [
            '/proyectos/tienda-emociones-hero.jpg',
            '/proyectos/tienda-emociones-catalogo.jpg',
            '/proyectos/tienda-emociones-carrito.jpg',
            '/proyectos/tienda-emociones-checkout.jpg',
            '/proyectos/tienda-emociones-opiniones.jpg',
            '/proyectos/tienda-emociones-mobile.jpg',
        ],
    },

    // 🏭 PROYECTO: METALCORP (DESTACADO)
    {
        title: 'MetalCorp — Web Institucional',
        icon: <FaIndustry className="text-primary-400" />,
        image: '/proyectos/metalcorp-home.png',
        description:
            'Sitio institucional para multinacional metalúrgica. Next.js 16 con App Router, SEO completo, páginas dinámicas y JSON-LD. Deploy en Vercel.',
        longDescription: `
      🏭 MetalCorp — Web Institucional para Multinacional Metalúrgica

      Sitio institucional completo para una empresa metalúrgica ficticia con presencia global. Proyecto de portfolio desarrollado con tecnologías modernas y foco en SEO, performance y diseño industrial.

      ## 🎯 Sobre el Proyecto
      Web corporativa con múltiples páginas y contenido dinámico, simulando el sitio de una multinacional real. Incluye arquitectura escalable lista para migrar a un CMS.

      ## ✨ Características Principales
      • **Home** con hero, estadísticas, catálogo e industrias
      • **Catálogo de productos** con páginas de detalle dinámicas (/productos/[slug])
      • **Sala de prensa** con comunicados y páginas de detalle (/prensa/[slug])
      • **Páginas institucionales**: Nosotros, Industrias, Proveedores, Contacto
      • **SEO completo**: metadatos por página, JSON-LD, sitemap y robots automáticos
      • **Hero con video de fondo** en el home
      • **Favicon SVG custom** con identidad visual de marca
      • **Diseño responsive** con paleta industrial custom

      ## 🏗️ Arquitectura Técnica
      **Framework:** Next.js 16 con App Router y Turbopack
      **Lenguaje:** TypeScript
      **Estilos:** Tailwind CSS v4 con paleta custom
      **Íconos:** lucide-react
      **Fuentes:** Inter + Montserrat vía next/font
      **SEO:** Metadata API nativa, JSON-LD, sitemap.xml y robots.txt generados
      **Deploy:** Vercel con CI/CD automático desde GitHub
    `,
        link: 'https://metalcorp-gamma.vercel.app',
        github: 'https://github.com/cristianmarcus34-boop/metalcorp',
        tag: '',
        tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'lucide-react', 'SEO', 'Vercel'],
        featured: true,
        year: '2026',
        category: 'Institucional',
        galleryImages: null,
    },

    // 🚀 PROYECTO: KUBIC.AI (DESTACADO)
    {
        title: 'Kubic.ai — Micro-espacios Inteligentes',
        icon: <FaRocket className="text-primary-400" />,
        image: '/proyectos/kubic-ia.jpg',
        description:
            'Plataforma SaaS + PropTech para alquiler de micro-espacios automatizados con IA. Gestión 100% autónoma de almacenamiento, estudios streaming y oficinas cápsula 24/7.',
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
        link: 'https://kubic-ai.vercel.app',
        github: 'https://github.com/cristianmarcus34-boop/kubic.ai',
        tag: '',
        tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'EmailJS', 'Google Maps API', 'Vercel'],
        featured: true,
        year: '2026',
        category: 'SaaS',
        galleryImages: [
            '/proyectos/kubic-hero.jpg',
            '/proyectos/kubic-servicios.jpg',
            '/proyectos/kubic-precios.jpg',
            '/proyectos/kubic-contacto.jpg',
            '/proyectos/kubic-mapa.jpg',
            '/proyectos/kubic-mobile.jpg',
        ],
    },

    // ✂️ PROYECTO: BARBERÍA EL RULO (DESTACADO)
    {
        title: 'Barbería El Rulo — Sistema de Reservas',
        icon: <FaScissors className="text-primary-400" />,
        image: '/proyectos/barberia.webp',
        description:
            'Sistema completo de gestión de turnos con seña vía MercadoPago. Calendario interactivo en tiempo real, panel de administración y notificaciones automáticas.',
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
        link: 'https://barberia-next-indol.vercel.app/',
        github: 'https://github.com/cristianmarcus34-boop/barberia-next',
        tag: '',
        tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'MercadoPago', 'Resend', 'Vercel'],
        featured: true,
        year: '2026',
        category: 'SaaS',
        galleryImages: [
            '/proyectos/barberia-hero.jpg',
            '/proyectos/barberia-calendario.jpg',
            '/proyectos/barberia-modal.jpg',
            '/proyectos/barberia-admin.jpg',
            '/proyectos/barberia-mobile.jpg',
        ],
    },

    // 🌿 PROYECTO: VIVERO VERDE (DESTACADO)
    {
        title: 'Vivero Verde — Sitio Web Tradicional',
        icon: <FaTree className="text-primary-400" />,
        image: '/proyectos/vivero.jpg',
        description:
            'Sitio web tradicional para vivero con HTML, CSS y JavaScript puro. Catálogo completo de plantas, macetas, tierra y accesorios con filtros por categoría y búsqueda en tiempo real.',
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
    `,
        link: 'https://vivero-verde.vercel.app',
        github: 'https://github.com/cristianmarcus34-boop/vivero-verde',
        tag: '',
        tech: ['Next.js 16', 'React 19', 'Tailwind CSS', 'CSS Modules', 'JavaScript', 'Vercel'],
        featured: true,
        year: '2026',
        category: 'Landing Page',
        galleryImages: [
            '/proyectos/vivero-hero.jpg',
            '/proyectos/vivero-productos.jpg',
            '/proyectos/vivero-contacto.jpg',
            '/proyectos/vivero-mobile.jpg',
        ],
    },

    // 🐾 PROYECTO: PETSHOP SOLUTIONS (DESTACADO)
    {
        title: 'Petshop Solutions — Consultoría Digital',
        icon: <FaPaw className="text-primary-400" />,
        image: '/proyectos/petshop.jpg',
        description:
            'Plataforma de consultoría digital para petshops. Cuestionario interactivo de 4 pasos que recomienda la solución ideal (Básica, Dashboard o Premium) para digitalizar tu negocio de mascotas.',
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
    `,
        link: 'https://petshop-solutions-y9aq.vercel.app/',
        github: 'https://github.com/cristianmarcus34-boop/petshop-solutions',
        tag: '',
        tech: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Web3', 'Ethers', 'Web3Forms', 'Vercel'],
        featured: true,
        year: '2026',
        category: 'Landing Page',
        galleryImages: [
            '/proyectos/petshop-hero.jpg',
            '/proyectos/petshop-cuestionario.jpg',
            '/proyectos/petshop-opciones.jpg',
            '/proyectos/petshop-mobile.jpg',
        ],
    },

    // 🐾 PROYECTO: VET SOLUTIONS (DESTACADO)
    {
        title: 'Vet Solutions — Consultoría Digital',
        icon: <FaPaw className="text-primary-400" />,
        image: '/proyectos/veterinaria.jpg',
        description:
            'Plataforma de consultoría digital para clínicas veterinarias. Cuestionario interactivo de 4 pasos que recomienda el plan ideal (Básico, Profesional o Premium) para digitalizar tu clínica.',
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
    `,
        link: 'https://vet-solutions.vercel.app/',
        github: 'https://github.com/cristianmarcus34-boop/vet-solutions',
        tag: '',
        tech: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Web3Forms', 'Vercel'],
        featured: true,
        year: '2026',
        category: 'Landing Page',
        galleryImages: [
            '/proyectos/vet-hero.jpg',
            '/proyectos/vet-planes.jpg',
            '/proyectos/vet-cuestionario.jpg',
            '/proyectos/vet-mobile.jpg',
        ],
    },

    // 🎉 PROYECTO: EVENT SOLUTIONS (DESTACADO)
    {
        title: 'Event Solutions — Consultoría Digital',
        icon: <FaCalendarCheck className="text-primary-400" />,
        image: '/proyectos/eventos.jpg',
        description:
            'Plataforma de consultoría digital para salones de eventos. Cuestionario interactivo de 4 pasos que recomienda el plan ideal (Básico, Profesional o Premium) para digitalizar tu salón.',
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
    `,
        link: 'https://event-solutions-ten.vercel.app/',
        github: 'https://github.com/cristianmarcus34-boop/event-solutions',
        tag: '',
        tech: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Web3Forms', 'Vercel'],
        featured: true,
        year: '2026',
        category: 'Landing Page',
        galleryImages: [
            '/proyectos/event-hero.jpg',
            '/proyectos/event-planes.jpg',
            '/proyectos/event-cuestionario.jpg',
            '/proyectos/event-mobile.jpg',
        ],
    },

    // PROYECTO: JARDINERÍA Y PISCINAS
    {
        title: 'Jardinería y Piscinas',
        icon: <FaLeaf className="text-primary-400" />,
        image: '/proyectos/jardineria.jpg',
        description:
            'Landing page moderna y sofisticada para servicios de jardinería y mantenimiento de piscinas. Galería interactiva con filtros, formulario con validación en tiempo real, sección de testimonios y sistema de contacto integrado con WhatsApp.',
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
    `,
        link: 'https://jardineria-dun.vercel.app',
        github: 'https://github.com/cristianmarcus34-boop/Jardineria',
        tag: '',
        tech: ['Django', 'Python', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Vercel'],
        featured: true,
        year: '2026',
        category: 'Landing Page',
        galleryImages: [
            '/proyectos/jardineria-hero.jpg',
            '/proyectos/jardineria-servicios.jpg',
            '/proyectos/jardineria-galeria.jpg',
            '/proyectos/jardineria-formulario.jpg',
            '/proyectos/jardineria-mobile.jpg',
        ],
    },

    // PROYECTO: KRUSTY BURGER APP
    {
        title: 'Krusty Burger App',
        icon: <FaMobileAlt className="text-primary-400" />,
        image: '/proyectos/krustyburger.webp',
        description:
            'App web de delivery con arquitectura moderna. El proyecto nativo está en desarrollo activo.',
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
    `,
        link: 'https://www.krustyburger.com.ar/',
        github: 'https://github.com/cristianmarcus34-boop/krusty-burger',
        tag: '',
        tech: ['Next.js 16', 'React Native', 'Expo Core', 'Supabase', 'Tailwind CSS'],
        featured: false,
        year: '2025',
        category: 'Mobile',
        galleryImages: [
            '/krustyappminiatura.png',
            '/menuprincipalminiatura.png',
            '/perfilmini.png',
            '/panelperfil.png',
        ],
    },

    // PROYECTO: CAPRICCIO DE PIZZA (REACT)
    {
        title: 'Capriccio de Pizza (React)',
        icon: <FaReact className="text-primary-400" />,
        image: '/proyectos/capriccioreact.webp',
        description:
            'Plataforma e-commerce con SSR avanzado. Reducción de latencia y Core Web Vitals optimizados para SEO.',
        longDescription: `
      Capriccio de Pizza es una plataforma e-commerce construida con React 18 y Firebase. Implementa SSR avanzado para optimizar el rendimiento y los Core Web Vitals, mejorando significativamente el posicionamiento SEO del sitio.
    `,
        link: 'https://capiccio-de-pizza.web.app/',
        github: 'https://github.com/cristianmarcus34-boop/capriccio-react',
        tag: '',
        tech: ['React 18', 'Firebase', 'Optimization'],
        featured: false,
        year: '2024',
        category: 'E-commerce',
        galleryImages: null,
    },

    // PROYECTO: CAPRICCIO ENGINE (DJANGO)
    {
        title: 'Capriccio Engine (Django)',
        icon: <FaPython className="text-primary-400" />,
        image: '/proyectos/capricciodjango.jpg',
        description:
            'Backend de grado corporativo con Python/Django. Implementación de CI/CD y bases de datos relacionales robustas.',
        longDescription: `
      Capriccio Engine es el backend corporativo desarrollado con Python y Django que potencia la plataforma de e-commerce. Incluye implementación de CI/CD con GitHub Actions, bases de datos relacionales PostgreSQL y una API Rest completamente documentada.
    `,
        link: 'https://capricciodepizza.onrender.com/',
        github: 'https://github.com/cristianmarcus34-boop/capriccio-engine',
        tag: '',
        tech: ['Django', 'PostgreSQL', 'API Rest'],
        year: '2024',
        category: 'Backend',
        galleryImages: null,
    },

    // PROYECTO: LA ABU MATIE APP
    {
        title: 'La Abu Matie App',
        icon: <FaServer className="text-primary-400" />,
        image: '/proyectos/laabumatie.jpeg',
        description:
            'Gestión administrativa automatizada. Interfaz diseñada bajo principios de accesibilidad y eficiencia operativa.',
        longDescription: `
      La Abu Matie App es un sistema de gestión administrativa automatizado. La interfaz fue diseñada siguiendo principios de accesibilidad WCAG y eficiencia operativa, permitiendo a los administradores gestionar inventario, pedidos y clientes desde un único dashboard.
    `,
        link: 'https://la-abu-matie-app.web.app/',
        github: 'https://github.com/cristianmarcus34-boop/la-abu-matie',
        tag: '',
        tech: ['Material UI', 'Realtime DB', 'NoSQL'],
        year: '2025',
        category: 'Dashboard',
        galleryImages: null,
    },

    // PROYECTO: GIMNASIO & NUTRICIÓN
    {
        title: 'Gimnasio & Nutrición',
        icon: <FaMobileAlt className="text-primary-400" />,
        image: '/proyectos/gimnasio.webp',
        description:
            'Ecosistema para gestión de centros fitness con integración nutricional y seguimiento de progreso en tiempo real.',
        longDescription: `
      Gimnasio & Nutrición es un ecosistema digital para la gestión de centros fitness. Incluye integración nutricional, seguimiento de progreso en tiempo real y paneles de control para entrenadores y clientes.
    `,
        link: 'https://gimnasio-nutricion.vercel.app/',
        tag: '',
        tech: ['Next.js', 'Supabase', 'Tailwind'],
        year: '2025',
        category: 'Health',
        galleryImages: null,
        demoComponent: <GimnasioDemo />,
    },

    // PROYECTO: POWA SCHEDULE
    {
        title: 'Powa Schedule',
        icon: <FaCloudUploadAlt className="text-primary-400" />,
        image: '/proyectos/powaschedule.jpg',
        description:
            'Sistema de gestión de turnos y consultorías con disponibilidad en tiempo real y notificaciones automáticas.',
        longDescription: `
      Powa Schedule es un sistema SaaS para la gestión de turnos y consultorías. Ofrece disponibilidad en tiempo real, notificaciones automáticas vía email y WhatsApp, y un panel de administración completo para gestionar reservas y clientes.
    `,
        link: 'https://powa-schedule.vercel.app/',
        tag: '',
        tech: ['Next.js', 'Supabase', 'React'],
        year: '2025',
        category: 'SaaS',
        galleryImages: null,
        demoComponent: <ReservaDemo />,
    },
];