// app/desarrollo-web-quilmes/_components/data.ts

// ============================================================================
// TIPOS
// ============================================================================

export type Servicio = {
    iconKey: 'code' | 'cart' | 'mobile' | 'brain'
    title: string
    desc: string
    destacado?: boolean
}

export type Barrio = {
    nombre: string
    desc: string
    tipo: 'barrio' | 'localidad'
}

export type ProcesoPaso = {
    num: string
    title: string
    desc: string
    duracion: string
}

export type Caso = {
    rubro: string
    zona: string
    titulo: string
    resultado: string
    desc: string
    tags: string[]
}

export type Testimonio = {
    nombre: string
    rol: string
    texto: string
    rating: number
}

export type FAQ = {
    q: string
    a: string
}

export type Stat = {
    valor: string
    label: string
}

// ============================================================================
// SERVICIOS
// ============================================================================

export const servicios: Servicio[] = [
    {
        iconKey: 'code',
        title: 'Desarrollo Web',
        desc: 'Landing pages, sitios institucionales y sistemas web con Next.js, React y TypeScript. Código limpio, rápido y optimizado para SEO.',
        destacado: true,
    },
    {
        iconKey: 'cart',
        title: 'Tiendas Online',
        desc: 'E-commerce con MercadoPago, Stripe, gestión de productos, pedidos, stock y envíos. Panel simple para que vos mismo administres todo.',
        destacado: true,
    },
    {
        iconKey: 'mobile',
        title: 'Apps Móviles',
        desc: 'Aplicaciones iOS y Android con React Native y Expo. Funcionamiento offline, notificaciones push y publicación en stores.',
    },
    {
        iconKey: 'brain',
        title: 'Automatización con IA',
        desc: 'Integración de IA, chatbots, automatización de procesos y conexión de herramientas existentes. Menos tareas manuales, más resultados.',
    },
]

// ============================================================================
// DIFERENCIALES
// ============================================================================

export const diferenciales = [
    'Trabajás directamente con el fundador, sin intermediarios ni vendedores',
    'Código y accesos 100% tuyos al finalizar el proyecto',
    'Entregas cada 2 semanas para que veas el avance real',
    'Sin contratos de permanencia ni dependencia tecnológica',
    'Especialistas en Next.js, React y tecnologías modernas',
    'Consultoría inicial sin costo y sin compromiso',
]

// ============================================================================
// STATS (para hero o sección de resultados)
// ============================================================================

export const stats: Stat[] = [
    { valor: '+50', label: 'Proyectos entregados' },
    { valor: '+8', label: 'Años de experiencia' },
    { valor: '100%', label: 'Clientes satisfechos' },
    { valor: '24hs', label: 'Respuesta promedio' },
]

// ============================================================================
// ZONAS (chips de cobertura)
// ============================================================================

export const zonas = [
    'Quilmes',
    'Bernal',
    'Avellaneda',
    'Lanús',
    'Berazategui',
    'Wilde',
    'Don Bosco',
    'Ezpeleta',
    'Florencio Varela',
    'Lomas de Zamora',
]

export const paises = [
    'Argentina',
    'Latinoamérica',
    'España',
    'Estados Unidos',
    'Europa',
]

// ============================================================================
// BARRIOS Y LOCALIDADES (SEO local profundo)
// ============================================================================

export const barrios: Barrio[] = [
    {
        nombre: 'Quilmes Centro',
        tipo: 'barrio',
        desc: 'Zona comercial por excelencia, con la peatonal Rivadavia como eje. Trabajamos con comercios que necesitan vender online y profesionales que quieren captar clientes desde Google.',
    },
    {
        nombre: 'Quilmes Oeste',
        tipo: 'barrio',
        desc: 'Zona residencial y de PYMES familiares. Hacemos webs para talleres, consultorios, estudios contables y negocios que quieren profesionalizar su presencia digital.',
    },
    {
        nombre: 'San Francisco Solano',
        tipo: 'barrio',
        desc: 'Uno de los barrios más grandes de Quilmes, con fuerte actividad comercial y emprendedora. Trabajamos con comercios de avenida y PYMES que buscan profesionalizar su presencia digital y captar clientes desde Google.',
    },
    {
        nombre: 'Bernal',
        tipo: 'localidad',
        desc: 'Barrio con fuerte actividad gastronómica y comercial cerca de la estación. Diseñamos cartas digitales, sistemas de reservas y tiendas online para negocios locales.',
    },
    {
        nombre: 'Don Bosco',
        tipo: 'localidad',
        desc: 'Zona residencial con emprendedores y profesionales independientes. Ideal para landing pages de servicios, portfolios y sitios institucionales.',
    },
    {
        nombre: 'Wilde',
        tipo: 'localidad',
        desc: 'Barrio con mezcla de comercios y industrias. Desarrollamos sistemas internos, catálogos B2B y webs corporativas para empresas de la zona.',
    },
    {
        nombre: 'Ezpeleta',
        tipo: 'localidad',
        desc: 'Zona en crecimiento con nuevos emprendimientos. Trabajamos con marcas que están arrancando y necesitan una base digital sólida desde el día uno.',
    },
    {
        nombre: 'Florencio Varela',
        tipo: 'localidad',
        desc: 'Localidad con fuerte actividad comercial y de servicios, en pleno crecimiento. Trabajamos con PYMES, consultorios y emprendimientos que buscan profesionalizar su presencia digital y captar más clientes desde Google.',
    },
    {
        nombre: 'Lomas de Zamora',
        tipo: 'localidad',
        desc: 'Uno de los polos comerciales más importantes de Zona Sur, con una amplia oferta de comercios, estudios profesionales y gastronomía. Desarrollamos tiendas online, sistemas a medida y sitios institucionales para empresas de la zona.',
    },
]

// ============================================================================
// PROCESO DE TRABAJO
// ============================================================================

export const procesoPasos: ProcesoPaso[] = [
    {
        num: '01',
        title: 'Llamada inicial',
        desc: 'Nos contás tu proyecto sin compromiso. Escuchamos, preguntamos y te asesoramos.',
        duracion: '30 min',
    },
    {
        num: '02',
        title: 'Propuesta en 24hs',
        desc: 'Te enviamos presupuesto detallado, alcance y cronograma estimado.',
        duracion: '24 horas',
    },
    {
        num: '03',
        title: 'Diseño y validación',
        desc: 'Diseñamos la interfaz y la validamos con vos antes de escribir una línea de código.',
        duracion: '1-2 semanas',
    },
    {
        num: '04',
        title: 'Desarrollo con entregas',
        desc: 'Avanzamos con entregas cada 2 semanas para que veas el progreso real.',
        duracion: '2-8 semanas',
    },
    {
        num: '05',
        title: 'Lanzamiento',
        desc: 'Publicamos, medimos y ajustamos. Te entregamos accesos y capacitación.',
        duracion: '1 semana',
    },
]

// ============================================================================
// CASOS DE ÉXITO
// ============================================================================

export const casos: Caso[] = [
    {
        rubro: 'Comercio local',
        zona: 'Quilmes Centro',
        titulo: 'E-commerce con MercadoPago',
        resultado: '+180% en ventas online en 4 meses',
        desc: 'Migración de catálogo manual a tienda online con pagos integrados, gestión de stock y envíos a todo el país.',
        tags: ['Next.js', 'MercadoPago', 'E-commerce'],
    },
    {
        rubro: 'Estudio profesional',
        zona: 'Bernal',
        titulo: 'Sitio institucional + reservas',
        resultado: '+45 turnos mensuales automatizados',
        desc: 'Landing con sistema de turnos online, recordatorios por WhatsApp y panel de gestión para el equipo.',
        tags: ['Landing', 'Reservas', 'Automatización'],
    },
    {
        rubro: 'PYME industrial',
        zona: 'Zona Sur',
        titulo: 'Sistema interno a medida',
        resultado: '-30% en tiempo administrativo',
        desc: 'Panel de gestión con control de stock, pedidos, facturación y reportes en tiempo real.',
        tags: ['Sistema', 'Dashboard', 'React'],
    },
]

// ============================================================================
// TESTIMONIOS
// ============================================================================

export const testimonios: Testimonio[] = [
    {
        nombre: 'Martín G.',
        rol: 'Dueño de comercio · Quilmes',
        texto:
            'Nos hicieron la tienda online completa. En 4 meses duplicamos las ventas y ahora vendemos a todo el país. Comunicación impecable de principio a fin.',
        rating: 5,
    },
    {
        nombre: 'Lucía F.',
        rol: 'Directora de estudio · Bernal',
        texto:
            'El sistema de turnos nos cambió la vida. Antes perdíamos horas al teléfono, ahora es automático. 100% recomendados.',
        rating: 5,
    },
    {
        nombre: 'Diego R.',
        rol: 'Gerente PYME · Avellaneda',
        texto:
            'Trabajamos con varios proveedores y Powa fue el único que cumplió fechas y presupuesto. El sistema a medida nos ahorró tiempo real.',
        rating: 5,
    },
]

// ============================================================================
// FAQS (con schema FAQPage)
// ============================================================================

export const faqs: FAQ[] = [
    {
        q: '¿Cuánto cuesta una página web en Quilmes?',
        a: 'El costo depende del tipo de proyecto. Una landing page profesional arranca desde un valor base accesible para PYMES, mientras que un e-commerce o sistema a medida requiere una inversión mayor. Te damos un presupuesto sin cargo en 24 horas.',
    },
    {
        q: '¿Trabajan con comercios de Quilmes centro?',
        a: 'Sí. Trabajamos con comercios, PYMES y empresas de Quilmes centro, Quilmes Oeste, San Francisco Solano, Bernal, Don Bosco, Wilde, Ezpeleta, Florencio Varela, Lomas de Zamora y toda la Zona Sur. También atendemos clientes de forma 100% remota en Argentina y el exterior.',
    },
    {
        q: '¿Hacen visitas presenciales en Zona Sur?',
        a: 'Sí, coordinamos reuniones presenciales en Quilmes y alrededores cuando el proyecto lo requiere. La mayoría del trabajo se hace de forma remota por videollamada, con entregas cada 2 semanas para que veas el avance.',
    },
    {
        q: '¿Cuánto tarda una landing page?',
        a: 'Una landing page profesional tarda entre 2 y 3 semanas. Un sitio institucional o e-commerce entre 4 y 8 semanas, según la complejidad. Antes de arrancar te damos un cronograma con fechas de entrega.',
    },
    {
        q: '¿Se puede pagar en cuotas?',
        a: 'Sí. Trabajamos con un esquema de anticipo y pagos por etapas. Aceptamos transferencia, MercadoPago y otros medios. Consultanos por tu caso particular.',
    },
    {
        q: '¿El código y los accesos quedan a mi nombre?',
        a: 'Sí. Al finalizar el proyecto te entregamos el 100% del código fuente, los accesos a hosting, dominio y todas las herramientas. No hay dependencia tecnológica ni contratos de permanencia.',
    },
    {
        q: '¿Trabajan con empresas de Florencio Varela y Lomas de Zamora?',
        a: 'Sí. Trabajamos con PYMES, comercios, estudios profesionales y emprendimientos de Florencio Varela, Lomas de Zamora y toda la Zona Sur. La mayoría del trabajo se coordina de forma remota, con posibilidad de reuniones presenciales cuando el proyecto lo requiere.',
    },
    {
        q: '¿Qué tecnologías usan para desarrollar?',
        a: 'Trabajamos principalmente con Next.js, React, TypeScript y Tailwind CSS para web. Para apps móviles usamos React Native y Expo. Para e-commerce integramos MercadoPago, Stripe y sistemas de gestión de stock. Siempre elegimos la tecnología que mejor se adapta al proyecto, no la que más nos gusta.',
    },
]