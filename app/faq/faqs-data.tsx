// app/faq/faqs-data.tsx
import React from 'react';
import {
    FaCode, FaBolt, FaShieldAlt, FaCheckCircle,
    FaClock, FaLock, FaHandshake, FaRocket,
    FaStar, FaUsers, FaShieldVirus, FaMobileAlt,
    FaPlug, FaCloudUploadAlt, FaChartLine, FaDatabase,
    FaFileContract,
} from 'react-icons/fa';

// ===== TIPOS =====
export interface FAQItem {
    readonly id: string;
    readonly question: string;
    readonly answer: string;
    readonly category: 'trust' | 'pricing' | 'process' | 'technical' | 'business' | 'postlaunch';
    readonly highlighted?: boolean;
    readonly icon?: React.ReactNode;
    readonly link?: string;
}

export interface Category {
    id: FAQItem['category'];
    label: string;
    icon: React.ReactNode;
    color: string;
}

// ===== CONSTANTES =====
export const CATEGORIES: Category[] = [
    { id: 'trust', label: 'Confianza y Garantías', icon: <FaShieldAlt />, color: '#f59e0b' },
    { id: 'pricing', label: 'Precios y Tiempos', icon: <FaFileContract />, color: '#f59e0b' },
    { id: 'process', label: 'Proceso y Metodología', icon: <FaRocket />, color: '#22d3ee' },
    { id: 'technical', label: 'Arquitectura Técnica', icon: <FaCode />, color: '#8b5cf6' },
    { id: 'business', label: 'Negocio y Conversión', icon: <FaChartLine />, color: '#10b981' },
    { id: 'postlaunch', label: 'Post-Lanzamiento', icon: <FaCloudUploadAlt />, color: '#f472b6' },
];

export const TECH_ICONS = [
    { icon: <FaCode />, label: 'Código claro', tooltip: 'Organización del código para facilitar su mantenimiento' },
    { icon: <FaBolt />, label: 'Velocidad', tooltip: 'Mediciones y objetivos acordados según cada proyecto' },
    { icon: <FaShieldAlt />, label: 'Seguridad', tooltip: 'Controles de acceso y protección definidos en el alcance' },
    { icon: <FaDatabase />, label: 'Alojamiento', tooltip: 'Elección del proveedor según las necesidades del producto' },
    { icon: <FaDatabase />, label: 'Información', tooltip: 'Organización y acceso a los datos que usa el sistema' },
] as const;

// ===== FAQS =====
export const FAQS: FAQItem[] = [
    // ===== CONFIANZA Y GARANTÍAS =====
    {
        id: 'trust-1',
        category: 'trust',
        highlighted: true,
        question: '¿Cómo me aseguro de que el desarrollo cumpla con lo que necesito?',
        icon: <FaCheckCircle />,
        answer: 'Antes de empezar dejamos por escrito el alcance, los entregables y los criterios de aceptación. La frecuencia de avances, revisiones y pruebas se define según el tamaño y la modalidad del proyecto.',
    },
    {
        id: 'trust-2',
        category: 'trust',
        highlighted: true,
        question: '¿Qué sucede si el proyecto no cumple con el cronograma acordado?',
        icon: <FaClock />,
        answer: 'El cronograma y los hitos quedan en la propuesta. Si un riesgo afecta una fecha acordada, lo comunicamos y revisamos alternativas; un SLA aplica solo cuando se incluye expresamente en el contrato.',
    },
    {
        id: 'trust-3',
        category: 'trust',
        highlighted: true,
        question: '¿Qué garantías tengo sobre la seguridad de mi inversión?',
        icon: <FaLock />,
        answer: 'La propuesta y el contrato especifican propiedad del código, repositorios, entregas, pagos y condiciones de pausa o cambio de alcance. La documentación y transferencia se detallan para que otro equipo pueda continuar según lo contratado.',
    },
    {
        id: 'trust-4',
        category: 'trust',
        question: '¿Cómo manejan los cambios de última hora o imprevistos?',
        icon: <FaHandshake />,
        answer: 'Los cambios se revisan por impacto en alcance, costo y cronograma. Si requieren trabajo adicional, se aprueban y cotizan antes de incorporarlos; no asumimos un porcentaje fijo de cambios incluido salvo que figure en la propuesta.',
    },
    {
        id: 'trust-5',
        category: 'trust',
        question: '¿Puedo ver avances del proyecto antes de la entrega final?',
        icon: <FaUsers />,
        answer: 'Las instancias de revisión, el entorno de pruebas y la documentación se acuerdan según el proyecto. Los comentarios se agrupan y priorizan para incorporarlos dentro del alcance y cronograma definidos.',
    },
    {
        id: 'trust-6',
        category: 'trust',
        highlighted: true,
        question: '¿Por qué debería elegir a Powa por sobre una agencia tradicional o un freelancer?',
        icon: <FaStar />,
        answer: 'Trabajás directamente con el fundador y desarrollador responsable:\n\n✅ Alcance y etapas definidos antes de empezar\n✅ Avances para revisar durante el desarrollo\n✅ Código y accesos entregados según lo acordado\n✅ Soporte posterior definido en la propuesta',
    },
    {
        id: 'trust-7',
        category: 'trust',
        question: '¿Qué información necesito aportar para empezar?',
        icon: <FaFileContract />,
        answer: 'Para estimar el trabajo necesitamos conocer el objetivo, los usuarios, los flujos actuales, las integraciones y el contenido disponible. Las reuniones y accesos requeridos se acuerdan según el alcance; no hace falta definir la solución técnica de antemano.',
    },
    {
        id: 'trust-8',
        category: 'trust',
        question: '¿Cómo manejan la confidencialidad de mi idea/proyecto?',
        icon: <FaShieldVirus />,
        answer: 'Podemos acordar confidencialidad antes de intercambiar información sensible. Los accesos, repositorios y obligaciones de privacidad se definen en el contrato y se limitan a quienes participan del proyecto.',
    },

    // ===== PRECIOS Y TIEMPOS =====
    {
        id: 'pricing-1',
        category: 'pricing',
        highlighted: true,
        question: '¿Cuánto cuesta aproximadamente un desarrollo con Powa?',
        icon: <FaFileContract />,
        answer: 'Los valores iniciales publicados son:\n\n• Landing Page: desde USD 150\n• Sitio institucional: desde USD 350\n• Tienda online: desde USD 700\n• Web app o sistema: desde USD 1.200\n\nEl total depende del alcance y la modalidad de pago elegida. Los planes de mantenimiento empiezan en USD 150/mes.',
    },
    {
        id: 'pricing-2',
        category: 'pricing',
        highlighted: true,
        question: '¿Cuánto tiempo tarda en promedio un desarrollo?',
        icon: <FaClock />,
        answer: 'Como referencia inicial, una landing puede llevar 2-3 semanas, un sitio institucional 3-4, un e-commerce 4-6 y una plataforma 6-9. El cronograma definitivo se acuerda tras definir alcance, disponibilidad de contenidos, integraciones y revisiones.',
    },
    {
        id: 'pricing-3',
        category: 'pricing',
        highlighted: true,
        question: '¿Qué garantía tengo de que el proyecto va a funcionar bien después del lanzamiento?',
        icon: <FaShieldVirus />,
        answer: 'Antes de iniciar, la propuesta especifica qué correcciones incluye la entrega y durante cuánto tiempo. El monitoreo, mantenimiento y soporte continuo se acuerdan por separado según el plan elegido.',
    },
    {
        id: 'pricing-4',
        category: 'pricing',
        highlighted: true,
        question: '¿Qué incluye el plan de mantenimiento?',
        icon: <FaCloudUploadAlt />,
        answer: 'Hay tres niveles publicados:\n\n• Básico: USD 150/mes, con 1 hora de soporte y respuesta por email en hasta 2 días hábiles\n• Pro: USD 350/mes, con 5 horas de soporte y respuesta en hasta 1 día hábil\n• Enterprise: USD 600/mes, con horas, canales y tiempos de respuesta definidos en la propuesta\n\nEl monitoreo puede generar alertas automatizadas; la atención humana depende del horario y alcance contratados.',
    },

    // ===== PROCESO =====
    {
        id: 'process-1',
        category: 'process',
        highlighted: true,
        question: '¿Cuál es el proceso completo desde que firmamos hasta el lanzamiento?',
        icon: <FaRocket />,
        answer: 'Metodología de 5 fases:\n\nFase 1 - Discovery (1 semana): entrevistas, KPIs, benchmarking\nFase 2 - Diseño (2 semanas): arquitectura, wireframes, UI en Figma\nFase 3 - Desarrollo (2-4 semanas): infraestructura, frontend/backend\nFase 4 - Testing (1 semana): pruebas automatizadas, optimización\nFase 5 - Lanzamiento (1 semana): despliegue, monitoreo, capacitación',
    },
    {
        id: 'process-2',
        category: 'process',
        question: '¿Con qué frecuencia me van a actualizar sobre el progreso?',
        icon: <FaUsers />,
        answer: 'Antes de empezar definimos cada cuánto compartimos avances, por qué canal y quién los revisa. La frecuencia de reuniones y reportes queda acordada en la propuesta según el proyecto.',
    },

    // ===== TÉCNICO =====
    {
        id: 'technical-1',
        category: 'technical',
        question: '¿Qué tipo de soluciones digitales desarrollan?',
        icon: <FaCode />,
        answer: 'En simple: hacemos desde páginas para presentar un negocio hasta tiendas y sistemas de uso interno. Elegimos las herramientas según las funciones, usuarios e integraciones que necesites; el alcance concreto se define antes de cotizar.',
    },
    {
        id: 'technical-2',
        category: 'technical',
        question: '¿Por qué priorizan arquitecturas en Next.js por sobre sistemas monolíticos como WordPress?',
        icon: <FaBolt />,
        answer: 'No hay una opción que sea mejor para todos. WordPress puede convenir si necesitás editar mucho contenido; un desarrollo a medida puede ser más adecuado para funciones e integraciones específicas. Comparamos costos, facilidad de administración y necesidades antes de recomendar una opción. La tecnología por sí sola no garantiza velocidad ni posiciones en Google.',
    },
    {
        id: 'technical-3',
        category: 'technical',
        question: '¿Qué viabilidad existe para escalar o iterar la plataforma en el futuro?',
        icon: <FaChartLine />,
        answer: 'Podemos planificar desde el inicio cómo sumar funciones, usuarios o integraciones más adelante. Qué tan simple y costoso será dependerá del diseño inicial, la infraestructura y los cambios que se pidan; esas decisiones se documentan en la propuesta.',
    },
    {
        id: 'technical-4',
        category: 'technical',
        question: '¿Mi proyecto va a funcionar bien en celulares y tablets?',
        icon: <FaMobileAlt />,
        answer: 'Sí. El diseño se adapta a celulares, tablets y computadoras. Acordamos qué pantallas y dispositivos revisar; la velocidad final también depende del hosting, las imágenes, el contenido y las conexiones externas.',
    },
    {
        id: 'technical-5',
        category: 'technical',
        question: '¿Qué pasa si quiero integrar mi proyecto con herramientas que ya uso?',
        icon: <FaPlug />,
        answer: 'En simple: podemos conectar tu web con herramientas de pagos, correo, ventas o gestión. Primero revisamos cuál usás, si permite conectarse y qué permisos o costos requiere; las conexiones incluidas se enumeran en la propuesta.',
    },
    {
        id: 'technical-6',
        category: 'technical',
        question: '¿Puedo migrar mi proyecto a otro hosting o proveedor si quiero?',
        icon: <FaCloudUploadAlt />,
        answer: 'El proyecto puede prepararse para transferir su código y documentación según lo contratado. Cambiar de proveedor también puede requerir adaptar servicios, datos o configuraciones; revisamos ese trabajo y su costo antes de una migración.',
    },

    // ===== NEGOCIO =====
    {
        id: 'business-1',
        category: 'business',
        question: '¿Sus desarrollos están optimizados para la conversión y ventas?',
        icon: <FaChartLine />,
        answer: 'Podemos ordenar la información, hacer más claro el siguiente paso y medir acciones como consultas o compras. Eso ayuda a evaluar la experiencia, pero las ventas también dependen de la oferta, el tráfico y el mercado; no garantizamos aumentos de conversión.',
    },
    {
        id: 'business-2',
        category: 'business',
        question: '¿Las plataformas son compatibles con ecosistemas de adquisición (Ads & Meta)?',
        icon: <FaUsers />,
        answer: 'Podemos preparar páginas y medición para campañas de Google o Meta si se acuerdan las plataformas y los accesos. El costo por clic, la calificación de los anuncios y la cantidad de clientes dependen de la campaña, el presupuesto, la audiencia y la oferta; no se garantizan desde el desarrollo del sitio.',
    },
    {
        id: 'business-3',
        category: 'business',
        question: '¿Cuál es el cronograma estimado de entrega?',
        icon: <FaClock />,
        answer: 'El plazo y las etapas se estiman después de acordar qué hay que construir. Como referencia, el calendario depende del alcance, los materiales disponibles, las integraciones y el tiempo de revisión del cliente.',
    },
    {
        id: 'business-4',
        category: 'business',
        highlighted: true,
        question: '¿Una vez finalizado el proyecto, la propiedad intelectual me pertenece?',
        icon: <FaLock />,
        answer: 'La propuesta especifica qué código y materiales se entregan y qué licencias o servicios de terceros aplican. También define la documentación y los accesos incluidos para que puedas continuar el proyecto según lo contratado.',
    },
    {
        id: 'business-5',
        category: 'business',
        question: '¿Cuál es la inversión requerida para iniciar un desarrollo con Powa?',
        icon: <FaFileContract />,
        answer: 'Primero definimos objetivos, alcance, etapas y criterios de aceptación. La propuesta detalla la inversión y los aspectos técnicos; el impacto comercial depende también de factores externos y no se garantiza.',
    },

    // ===== POST-LANZAMIENTO =====
    {
        id: 'postlaunch-1',
        category: 'postlaunch',
        highlighted: true,
        question: '¿Qué pasa después de que lanzamos el proyecto? ¿Me dejan solo?',
        icon: <FaRocket />,
        answer: 'Está disponible un acompañamiento puntual de 90 días por USD 1.200. La propuesta especifica tareas, canales, horarios de atención, correcciones cubiertas y sesiones de transferencia. El monitoreo automatizado no implica atención humana continua; los SLA y el mantenimiento mensual se contratan según su alcance.',
    },
    {
        id: 'postlaunch-2',
        category: 'postlaunch',
        highlighted: true,
        question: '¿Qué costos adicionales puedo esperar después del desarrollo?',
        icon: <FaFileContract />,
        answer: 'Los costos de dominio, hosting, correo, servicios de terceros y licencias dependen del proveedor, el uso y la arquitectura. Se identifican en la propuesta; no se consideran incluidos salvo que estén enumerados expresamente.\n\nEl mantenimiento mensual publicado comienza en USD 150. Contenido, campañas, integraciones o consumos externos se cotizan según necesidad.',
        link: '/planes',
    },
    {
        id: 'postlaunch-3',
        category: 'postlaunch',
        question: '¿Proveen servicios de soporte y acuerdos de nivel de servicio (SLA)?',
        icon: <FaUsers />,
        answer: 'Los planes detallan tareas, horas incluidas, canales y tiempos de respuesta. El monitoreo puede ser automatizado; la atención humana, cobertura, escalamiento y objetivos de disponibilidad solo se ofrecen con las condiciones escritas en el plan o SLA contratado.',
        link: '/planes',
    },
];