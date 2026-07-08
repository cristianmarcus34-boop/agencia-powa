// app/api/chat/route.ts
import { NextResponse } from "next/server";
import Groq from 'groq-sdk';
import { ResponseCache } from '../../lib/cache';
import { metrics } from '../../lib/metrics';
import { 
  crearConversacion, 
  guardarMensaje, 
  obtenerUltimosMensajes,
  guardarMetrica 
} from '../../lib/supabase';

export const runtime = 'edge';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const cache = ResponseCache.getInstance();

interface ChatMessageInput {
  role: "user" | "model" | string;
  text: string;
}

interface GroqChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// ============================================
// 📋 FAQS - CONTEXTO OFICIAL DE POWA
// ============================================
const faqContext = `
PREGUNTAS FRECUENTES (FAQS) - RESPUESTAS OFICIALES DE POWA:

========================================
🔒 CONFIANZA Y GARANTÍAS
========================================

P: ¿Cómo me aseguro de que el desarrollo cumpla con lo que necesito?
R: Nuestro proceso está diseñado para eliminar sorpresas. Implementamos entregas parciales cada 2 semanas con validación técnica. Antes de cada entrega, realizamos demostraciones en vivo del avance y aplicamos correcciones antes de continuar. Al finalizar el ciclo de desarrollo, hacemos una auditoría exhaustiva del código, pruebas de rendimiento de estrés y validación de la lógica de negocio con tu equipo. Te entregamos un informe detallado de cada etapa para que tengas visibilidad 360° del proyecto.

P: ¿Qué sucede si el proyecto no cumple con el cronograma acordado?
R: La transparencia en la planificación es nuestro pilar. Utilizamos metodologías ágiles donde cada sprint tiene objetivos claros y medibles. Si identificamos desvíos técnicos, te lo comunicamos de inmediato con opciones de mitigación. Nuestro compromiso es mantenerte informado en cada paso, evitando sorpresas de último momento. Contamos con acuerdos de nivel de servicio (SLA) que garantizan la disponibilidad del equipo y la continuidad del proyecto.

P: ¿Qué garantías tengo sobre la seguridad de mi inversión?
R: La seguridad de tu inversión se protege desde el día 1 con un contrato transparente que incluye: 1) Propiedad intelectual 100% a tu nombre, 2) Entregas parciales para mitigar riesgos, 3) Código fuente auditable en repositorios privados, 4) Posibilidad de pausa o redirección sin penalizaciones. Además, implementamos un 'Plan de Continuidad Técnica' para garantizar que el proyecto pueda ser mantenido por cualquier equipo técnico, sin dependencia de Powa.

P: ¿Cómo manejan los cambios de última hora o imprevistos?
R: Entendemos que los negocios evolucionan. Nuestra estructura de sprints cortos (2 semanas) permite incorporar cambios de forma ágil sin comprometer la calidad. Establecemos un 'buffer de cambios' del 20% en cada sprint para adaptarnos a tus necesidades emergentes. Los cambios mayores se evalúan en conjunto, se presupuestan de manera transparente y se planifican sin afectar entregas críticas.

P: ¿Puedo ver avances del proyecto antes de la entrega final?
R: Absolutamente. Realizamos entregas incrementales en entornos de staging (pruebas) cada 15 días. Puedes probar las funcionalidades en tiempo real y dar feedback inmediato. Cada entrega incluye documentación técnica actualizada y un video explicativo de las nuevas features. Esto te permite visualizar el producto desde el día 1 y ajustar el rumbo según sea necesario.

P: ¿Por qué debería elegir a Powa por sobre una agencia tradicional o un freelancer?
R: La diferencia está en nuestra arquitectura de ingeniería. Mientras una agencia tradicional te vende una plantilla con limitaciones estructurales y un freelancer puede tener riesgos de continuidad, nosotros te entregamos un activo digital corporativo con: 1) Equipo multidisciplinario (arquitecto, frontend, backend, QA, UX/UI), 2) Código empresarial con estándares ISO y documentación completa, 3) Continuidad garantizada con código documentado para cualquier desarrollador, 4) Escalabilidad comprobada desde 100 hasta 1M de usuarios, 5) Soporte post-lanzamiento sin abandonarte.

P: ¿Qué información necesito aportar para empezar?
R: Te pedimos lo mínimo para no ralentizar el proceso: 1) Brief de negocio (objetivos, mercado, competencia), 2) Contenido actual (textos, imágenes, logos), 3) Acceso a herramientas (CRM, ERP, sistemas propios), 4) 2-3 sesiones estratégicas de 1 hora. Lo que NO te pedimos: conocimientos técnicos, inversión en infraestructura cara, contratos de permanencia ni pagos adelantados sin entregas. Nosotros hacemos el trabajo pesado, vos te enfocas en tu negocio.

P: ¿Cómo manejan la confidencialidad de mi idea/proyecto?
R: Tu idea está protegida desde el primer contacto: 1) NDA (Acuerdo de Confidencialidad) firmado antes de compartir detalles, 2) Acceso restringido solo al equipo asignado, 3) Repositorios privados con autenticación 2FA, 4) Sin uso de tu información como case study sin autorización, 5) Cláusulas de exclusividad para no trabajar con competidores directos durante 12 meses si lo necesitas.

========================================
🚀 PROCESO Y METODOLOGÍA
========================================

P: ¿Cuál es el proceso completo desde que firmamos hasta el lanzamiento?
R: Seguimos una metodología de 5 fases con entregas tangibles: Fase 1 - Discovery (1 semana): entrevistas, definición de KPIs, benchmarking. Fase 2 - Diseño (2 semanas): arquitectura, wireframes, UI en Figma. Fase 3 - Desarrollo (2-4 semanas): infraestructura, frontend/backend, integraciones. Fase 4 - Testing (1 semana): pruebas automatizadas, usuario, optimización. Fase 5 - Lanzamiento (1 semana): despliegue, monitoreo, capacitación. Total: 6-9 semanas dependiendo de complejidad.

P: ¿Con qué frecuencia me van a actualizar sobre el progreso?
R: Comunicación garantizada: Reunión semanal de 30 min para alinear prioridades, Reporte de progreso cada 15 días con métricas, Canal directo (WhatsApp/Slack) para consultas urgentes, Grabación de cada reunión para revisión. Niveles: Project Manager (diario), CTO/Arquitecto (cada 15 días), CEO en reuniones clave. Bonus: Dashboard en tiempo real para ver progreso sin preguntar.

========================================
⚙️ ARQUITECTURA TÉCNICA
========================================

P: ¿Qué tipo de soluciones digitales desarrollan?
R: Diseñamos e implementamos ecosistemas digitales a la medida de los objetivos de tu empresa. Nos especializamos en landings de conversión optimizada y plataformas SaaS complejas. Al desarrollar con arquitectura pura sobre Next.js, eliminamos las restricciones estructurales de las plantillas genéricas: tu producto final será exactamente como lo proyectás, con un código limpio, seguro y arquitecturado para escalar verticalmente.

P: ¿Por qué priorizan arquitecturas en Next.js por sobre sistemas monolíticos como WordPress?
R: Los CMS tradicionales como WordPress presentan serias deficiencias en seguridad, dependencia de plugins de terceros y sobrecarga de procesamiento en el cliente. Next.js nos permite compilar sitios estáticos e híbridos de velocidad ultra-instantánea. Al desacoplar el frontend, reducimos la superficie de ataque a niveles prácticamente nulos, entregando un activo robusto que Google posiciona prioritariamente.

P: ¿Qué viabilidad existe para escalar o iterar la plataforma en el futuro?
R: La escalabilidad está integrada nativamente en nuestro proceso gracias a una arquitectura modular de componentes. Si en etapas posteriores requerís integrar pasarelas complejas, flujos automatizados de IA o portales de autenticación de clientes, la infraestructura base permite la expansión limpia sin necesidad de reescribir código existente, protegiendo tu inversión de capital.

P: ¿Mi proyecto va a funcionar bien en celulares y tablets?
R: No es opcional, es obligatorio. El 60% del tráfico web viene de móviles. Diseño Mobile-First: empezamos por pantallas pequeñas, interacciones táctiles optimizadas, testing en +30 dispositivos reales. Rendimiento: carga en <2 segundos en 4G, Core Web Vitals optimizados, uso eficiente de datos. Bonus: Video mostrando el proyecto en diferentes dispositivos antes del lanzamiento.

P: ¿Qué pasa si quiero integrar mi proyecto con herramientas que ya uso?
R: La integración es uno de nuestros superpoderes. Soporte para Mailchimp, Sendinblue, HubSpot (email); Mercado Pago, Stripe, PayPal (pagos); Google Analytics, Meta Pixel, Hotjar (analytics); Salesforce, Zoho, Monday.com (CRMs); Shopify, WooCommerce (ecommerce). Metodología: Auditoría de APIs, arquitectura modular, pruebas de integración, documentación completa.

P: ¿Puedo migrar mi proyecto a otro hosting o proveedor si quiero?
R: ¡Absolutamente! No creemos en vendor lock-in. Código 100% portable con estándares abiertos (React, Next.js, Node.js), sin dependencias propietarias, documentación completa de despliegue, arquitectura cloud-agnostic (AWS, Google Cloud, Azure, Vercel, Netlify). Incluso te ayudamos a migrar si encuentras un proveedor más barato o quieres llevarlo a tu propio servidor.

========================================
📈 NEGOCIO Y CONVERSIÓN
========================================

P: ¿Sus desarrollos están optimizados para la conversión y ventas?
R: Absolutamente. El rendimiento técnico está directamente correlacionado con tu tasa de conversión. Cada milisegundo de latencia reduce drásticamente tu volumen de transacciones. Minimizamos la fricción mediante la optimización estricta de los Core Web Vitals y la aplicación de patrones de diseño UX avanzados que guían al usuario orgánicamente hacia la acción comercial.

P: ¿Las plataformas son compatibles con ecosistemas de adquisición (Ads & Meta)?
R: Sí, es uno de nuestros pilares de ingeniería. Los algoritmos de Google Ads y Meta penalizan las experiencias de carga ineficientes incrementando tu Costo por Clic (CPC). Nuestras soluciones implementan Server-Side Rendering (SSR), garantizando una indexación técnica perfecta que eleva el Quality Score de tus campañas, permitiéndote adquirir más clientes con el mismo presupuesto publicitario.

P: ¿Cuál es el cronograma estimado de entrega?
R: Nuestros ciclos promedio varían entre 4 y 6 semanas. No operamos con soluciones prefabricadas; cada desarrollo atraviesa etapas rigurosas de consultoría estratégica, diseño modular de alta fidelidad en Figma e ingeniería frontend a medida. Entregamos soluciones tecnológicas de nivel corporativo concebidas para perdurar en el tiempo.

P: ¿Una vez finalizado el proyecto, la propiedad intelectual me pertenece?
R: Totalmente. Al tratarse de ingeniería de software a medida, el 100% de los derechos de propiedad intelectual y el código fuente le pertenecen a tu empresa. No implementamos contratos de permanencia obligatorios ni dependencia tecnológica. Te entregamos un activo digital autónomo, auditable y de libre gestión, con toda la documentación técnica necesaria para que cualquier equipo pueda continuar el desarrollo.

P: ¿Cuál es la inversión requerida para iniciar un desarrollo con Powa?
R: Cada desarrollo se presupuesta de forma personalizada tras una fase de análisis de requerimientos técnicos y funcionales. No competimos por precio, sino por valor arquitectónico. Nuestro enfoque está estructurado hacia el retorno de la inversión (ROI): asegurar velocidad de carga superior, seguridad corporativa y un posicionamiento estético premium que habilite a tu marca a competir en el segmento más alto de tu mercado.

========================================
🚀 POST-LANZAMIENTO
========================================

P: ¿Qué pasa después de que lanzamos el proyecto? ¿Me dejan solo?
R: El lanzamiento es el inicio de nuestra relación, no el final. Plan de 90 días post-lanzamiento: Mes 1: monitoreo 24/7, ajustes, correcciones críticas. Mes 2: optimización basada en datos reales. Mes 3: capacitación avanzada y transferencia. Servicios continuos: soporte 24/7 con SLA, mantenimiento preventivo, iteraciones basadas en datos, formación de tu equipo. Lo que NO hacemos: desaparecer, ignorar necesidades, imponer contratos forzosos.

P: ¿Qué costos adicionales puedo esperar después del desarrollo?
R: 🔍 Somos 100% transparentes. No hay costos ocultos.
✅ Todo lo que ya pagaste incluye: hosting, SSL y analytics.
📌 Solo costos fijos: Dominio .com: ~$15/año (a tu nombre, lo comprás vos o te lo gestionamos)
📌 Costos opcionales (solo si los contratás): Mantenimiento: desde $100/mes, Marketing digital: según campaña, Integraciones premium: según necesidad, Contenido: según volumen.
💡 El hosting en Vercel es gratuito siempre que el tráfico no supere los 100 GB/mes y las funciones no superen 1M de ejecuciones mensuales. Si el proyecto crece más allá de eso, recomendamos migrar a un plan de pago por $20/mes.
Te entregamos un documento detallado antes de firmar. Si no lo ves en el papel, no te lo cobramos.

P: ¿Proveen servicios de soporte y acuerdos de nivel de servicio (SLA)?
R: Sí. El despliegue a producción es solo el inicio de la relación técnica. Ofrecemos planes avanzados de mantenimiento preventivo, monitoreo continuo de infraestructura, auditorías periódicas de seguridad y optimizaciones de rendimiento en tiempo real, garantizando la continuidad operativa de tu negocio 24/7.
`;

export async function POST(req: Request) {
  const startTime = Date.now();
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ text: "Error: Configuración de IA pendiente." }, { status: 500 });
  }

  try {
    const { message, history, profile, conversacionId } = await req.json() as {
      message: string;
      history?: ChatMessageInput[];
      profile?: "gastronomia" | "empresa_emprendedor" | "senior_software";
      conversacionId?: string;
    };

    // ============================================
    // 🔥 CREAR O USAR CONVERSACIÓN EXISTENTE
    // ============================================
    let chatId: string = conversacionId || '';

    if (!chatId) {
      const nuevaConversacion = await crearConversacion(profile || 'empresa_emprendedor');
      chatId = nuevaConversacion.id;
      await guardarMetrica('inicio_chat', chatId);
    }

    // ============================================
    // 🔥 GUARDAR MENSAJE DEL USUARIO
    // ============================================
    await guardarMensaje(chatId, 'usuario', message);
    await guardarMetrica('mensaje', chatId, { rol: 'usuario' });

    // ============================================
    // 🔥 VERIFICAR CACHÉ
    // ============================================
    const cacheKey = cache.generateKey(message, profile || 'default');
    const cachedResponse = cache.get(cacheKey);
    
    if (cachedResponse) {
      metrics.recordCacheHit();
      await guardarMetrica('acierto_cache', chatId);
      await guardarMensaje(chatId, 'asistente', cachedResponse);
      await guardarMetrica('mensaje', chatId, { rol: 'asistente' });
      
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(cachedResponse));
          controller.close();
        },
      });
      
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'X-Cache': 'HIT',
          'X-Chat-Id': chatId,
        },
      });
    }

    metrics.recordCacheMiss();

    // ============================================
    // 🔥 PREPARAR HISTORIAL
    // ============================================
    let chatHistory: GroqChatMessage[] = [];
    
    if (history && history.length > 0) {
      chatHistory = history.slice(-6).map((m: ChatMessageInput) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      }));
    } else {
      try {
        const mensajesDB = await obtenerUltimosMensajes(chatId, 6);
        chatHistory = mensajesDB.map((m: any) => ({
          role: m.rol === 'usuario' ? 'user' : 'assistant',
          content: m.contenido,
        }));
      } catch (error) {
        console.log('No se pudo cargar historial de DB:', error);
      }
    }

    // ============================================
    // 🔥 CONTEXTUALIZACIÓN POR PERFIL
    // ============================================
    let profileContext = "";
    let fewShotExamples = "";

    if (profile === "gastronomia") {
      profileContext = `
      CONTEXTO DE ENFOQUE GASTRONÓMICO:
      - El cliente tiene un restaurante, bar o cadena de comida.
      - Su principal dolor de cabeza son las comisiones abusivas de Apps de Delivery de terceros.
      - Destaca casos de éxito: 'Krusty Burger', 'Capriccio de Pizza'.`;

      fewShotExamples = `
      EJEMPLO:
      User: "Hola, ¿cuánto cuesta una página para mi local?"
      Assistant: "En Powa no armamos páginas web comunes. Desarrollamos un Activo Digital gastronómico. En lugar de regalarle un 30% a apps de delivery, te armamos tu propia plataforma. ¿Cuántos pedidos manejás por semana?"`;
    } else if (profile === "empresa_emprendedor") {
      profileContext = `
      CONTEXTO DE ENFOQUE EMPRESAS Y EMPRENDEDORES:
      - Busca digitalizar procesos, e-commerce robusto o automatizar flujos.
      - Su problema: pérdida de tiempo en planillas manuales o plataformas que se caen.`;

      fewShotExamples = `
      EJEMPLO:
      User: "Quiero una tienda online que no se caiga en ofertas."
      Assistant: "Las tiendas baratas se saturan y te hacen perder ventas. En Powa usamos arquitectura Serverless de nivel internacional. Tu e-commerce soporta miles de usuarios en simultáneo. ¿Qué pasarela de pagos usás?"`;
    } else if (profile === "senior_software") {
      profileContext = `
      CONTEXTO DE ENFOQUE INGENIERÍA:
      - Busca soluciones corporativas avanzadas: migraciones, apps nativas, IA customizada.
      - Su dolor: Vendor Lock-in o código mal optimizado.`;

      fewShotExamples = `
      EJEMPLO:
      User: "Necesito migrar mi sistema porque quedó obsoleto."
      Assistant: "Nos especializamos en evoluciones técnicas complejas. Migramos sistemas obsoletos a arquitecturas modernas con Next.js y Supabase. Te garantizamos propiedad absoluta del código. ¿En qué stack está tu desarrollo actual?"`;
    }

    // ============================================
    // 🔥 SYSTEM PROMPT CON FAQS
    // ============================================
    const systemPrompt = `Eres PowaBot, el Growth Hacker de 'Agencia Digital Powa'. 
    Tu objetivo es asesorar a clientes y convertirlos en casos de éxito.

    FILOSOFÍA: No vendemos páginas web, construimos ACTIVOS DIGITALES.
    UBICACIÓN: Base en Buenos Aires (Zona Sur), operamos global.

    SERVICIOS:
    - Web: Next.js 16, React 19, Serverless
    - E-commerce: Ventas masivas con integraciones de pago
    - IA: Automatización de procesos
    - Mobile: Apps nativas con Expo, Kotlin, Flutter

    REGLAS:
    1. TONO: Profesional, audaz, experto, resolutivo.
    2. CIERRE: Si el usuario muestra interés, DERIVÁ A WHATSAPP: https://wa.me/5491138305837?text=Hola%20Powa!%20Vengo%20del%20chat.
    3. PRECIOS: No des presupuestos fijos.
    4. Siempre respondé en español.

    ${profileContext}
    ${fewShotExamples}

    ${faqContext}`;

    const messagesForGroq: GroqChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...chatHistory,
      { role: "user", content: message },
    ];

    // ============================================
    // 🔥 STREAMING
    // ============================================
    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messagesForGroq,
      temperature: 0.75,
      max_tokens: 1000,
      top_p: 0.95,
      stream: true,
    });

    const encoder = new TextEncoder();
    let fullResponse = '';

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              fullResponse += text;
              controller.enqueue(encoder.encode(text));
            }
          }
          
          if (fullResponse.length > 50) {
            cache.set(cacheKey, fullResponse);
          }
          
          await guardarMensaje(chatId, 'asistente', fullResponse);
          await guardarMetrica('mensaje', chatId, { rol: 'asistente' });
          
          const responseTime = Date.now() - startTime;
          metrics.recordResponseTime(responseTime);
          
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Cache': 'MISS',
        'X-Chat-Id': chatId,
      },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    console.error("Critical API Error:", errorMessage);
    metrics.recordError(errorMessage);

    return NextResponse.json(
      { text: "Estoy recalibrando mis circuitos. ¿Podrías repetirme eso o prefieres hablar por WhatsApp?" },
      { status: 500 }
    );
  }
}