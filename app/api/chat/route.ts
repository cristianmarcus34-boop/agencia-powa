import { NextResponse } from "next/server";

// Usamos 'edge' para que la respuesta sea instantánea desde el nodo más cercano al usuario
export const runtime = 'edge'; 

interface ChatMessageInput {
  role: "user" | "model" | string;
  text: string;
}

interface GeminiChatPart {
  text: string;
}

interface GeminiChatMessage {
  role: "user" | "model";
  parts: GeminiChatPart[];
}

interface GeminiApiResponse {
  candidates?: {
    content?: {
      parts?: GeminiChatPart[];
      role?: string;
    };
    finishReason?: string;
    index?: number;
  }[];
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ text: "Error: Configuración de IA pendiente." }, { status: 500 });
  }

  try {
    const { message, history, profile } = await req.json() as { 
      message: string; 
      history?: ChatMessageInput[]; 
      profile?: "gastronomia" | "empresa_emprendedor" | "senior_software";
    };

    // Mapeo limpio del historial de conversación
    const chatHistory: GeminiChatMessage[] = (history || []).slice(-6).map((m: ChatMessageInput) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // Insertamos la consulta actual del usuario al final del historial
    chatHistory.push({
      role: "user",
      parts: [{ text: message }]
    });

    // --- ESTRATEGIA 1: CONTEXTUALIZACIÓN DINÁMICA SEGÚN EL RUBRO ---
    let profileContext = "";
    let fewShotExamples = "";

    if (profile === "gastronomia") {
      profileContext = `
      CONTEXTO DE ENFOQUE GASTRONÓMICO:
      - El cliente tiene un restaurante, bar o cadena de comida.
      - Su principal dolor de cabeza son las comisiones abusivas de Apps de Delivery de terceros y la lentitud de los sistemas actuales.
      - Destaca casos de éxito gastronómicos como 'Krusty Burger' (su transición a app 100% nativa con Expo y base de datos Supabase en tiempo real) y 'Capriccio de Pizza'.
      - Enfoca el valor de Powa en: control total del negocio, aumento del ticket promedio, sistemas de comandas ultra veloces e integración de pagos automatizada.`;

      fewShotExamples = `
      EJEMPLO DE INTERACCIÓN DE ÉXITO (Sigue esta estructura lógica de respuesta):
      User: "Hola, ¿cuánto cuesta una página para mi local de hamburguesas?"
      Model: "¡Hola! Mirá, en Powa no armamos páginas web comunes con plantillas lentas que quedan perdidas en internet. Nosotros desarrollamos un Activo Digital gastronómico de alto rendimiento. Pensalo así: en lugar de regalarle hasta un 30% de tus ventas en comisiones a apps de terceros, te armamos tu propia plataforma web o app nativa ultra veloz (usando Next.js y Supabase en tiempo real). Tus clientes compran en segundos y las comandas caen a tu cocina al instante. El costo se calcula a medida según el volumen de ventas que quieras automatizar. ¿Cuántos pedidos manejás hoy por semana?"`;

    } else if (profile === "empresa_emprendedor") {
      profileContext = `
      CONTEXTO DE ENFOQUE EMPRESAS Y EMPRENDEDORES:
      - El cliente busca digitalizar procesos, armar un e-commerce robusto, landing pages corporativas o automatizar flujos de trabajo en la nube.
      - Su principal problema es la pérdida de tiempo en planillas manuales de Excel o plataformas baratas de e-commerce que se caen o no escalan.
      - Enfoca el valor de Powa en: escalabilidad ilimitada, velocidad de carga que duplica las ventas (Next.js), automatizaciones inteligentes e infraestructuras en la nube modernas.`;

      fewShotExamples = `
      EJEMPLO DE INTERACCIÓN DE ÉXITO (Sigue esta estructura lógica de respuesta):
      User: "Quiero una tienda online pero que no se rompa cuando meto ofertas en Instagram."
      Model: "Es un excelente punto. Las tiendas baratas basadas en plantillas se saturan y se caen en eventos de alta demanda, haciéndote perder ventas y dinero. En Powa resolvemos esto con arquitectura Serverless de nivel internacional (Next.js y Node). Tu e-commerce va a soportar miles de usuarios en simultáneo comprando al mismo tiempo en milisegundos, sin pestañear. Contame, ¿qué pasarela de pagos usás actualmente y cuántos productos tenés en stock?"`;

    } else if (profile === "senior_software") {
      profileContext = `
      CONTEXTO DE ENFOQUE INGENIERÍA Y SOFTWARE SENIOR:
      - El cliente es más técnico o busca soluciones corporativas avanzadas: migraciones de arquitecturas monolíticas o Firebase hacia Next.js + Supabase, aplicaciones móviles nativas (Expo/Flutter), integraciones API complejas o IA customizada.
      - Su dolor de cabeza es el 'Vendor Lock-in' (quedar atado a una plataforma) o código mal optimizado hecho por juniors.
      - Enfoca el valor de Powa en: estándares senior globales, código limpio y documentado, bases de datos optimizadas con PostgreSQL y blindaje de seguridad avanzado (RLS).`;

      fewShotExamples = `
      EJEMPLO DE INTERACCIÓN DE ÉXITO (Sigue esta estructura lógica de respuesta):
      User: "Necesito migrar mi sistema actual porque quedó obsoleto y lento."
      Model: "Perfecto, estás en el lugar indicado. En Powa nos especializamos justamente en evoluciones técnicas complejas. Migramos sistemas obsoletos o fragmentados hacia arquitecturas modernas basadas en Next.js para el renderizado híbrido de alta velocidad y Supabase/PostgreSQL para el manejo relacional de datos en tiempo real con aislamiento estricto (RLS) a nivel de fila. Te garantizamos propiedad absoluta del código sin dependencias externas ocultas. ¿En qué stack está corriendo tu desarrollo actual para evaluar la migración?"`;
    }

    // --- 3. SYSTEM INSTRUCTION NATIVA INTEGRADA ---
    const systemInstructionContent = {
      parts: [{
        text: `Eres PowaBot, el Growth Hacker y Arquitecto de Soluciones Senior de 'Agencia Digital Powa'. 
        Tu objetivo es asesorar a clientes de TODO EL MUNDO y convertirlos en casos de éxito mediante tecnología de alto impacto.

        FILOSOFÍA POWA:
        - No vendemos "páginas web", construimos ACTIVOS DIGITALES que generan dinero, automatización y escalabilidad.
        - Ubicación: Nuestra base de ingeniería está en Buenos Aires (Zona Sur / Quilmes), pero operamos de forma global con clientes en cualquier país.
        
        SERVICIOS DE ELITE:
        - Desarrollo Web: Next.js 16, React 19 y arquitecturas "Serverless" para velocidad de carga < 1s.
        - E-commerce & Scalability: Sistemas de venta masiva con integraciones de pago complejas.
        - Inteligencia Artificial: Automatización de procesos de negocio y asistentes de IA avanzados.
        - Mobile: Aplicaciones 100% nativas (Expo, Kotlin, Flutter) y PWAs de alto rendimiento.

        CASOS DE ÉXITO REFERENTES:
        - Capriccio de Pizza, Krusty Burger (Evolución de TWA a App 100% Nativa en Expo), La Abu Matie.
        ${profileContext}

        LINEAMIENTOS DE RESPUESTA:
        - TONO: Profesional, audaz, experto, con mucha visión de negocio y resolutivo.
        - CIERRE DE VENTA: Si el usuario muestra interés real, hace una segunda pregunta o consulta cómo empezar, DEBES inducir el contacto e incluir el link de WhatsApp completo directamente: https://wa.me/5491138305837?text=Hola%20Powa!%20Vengo%20del%20chat%20y%20quiero%20potenciar%20mi%20negocio.
        - REGLA CRÍTICA: No uses Markdown para los links (ej: [link](url)), escribe la URL completa directamente para que el componente del frontend la detecte.
        - PRECIOS: No des presupuestos fijos bajo ningún concepto. Explica que cada solución es de ingeniería a medida para maximizar el ROI y deriva a una consultoría breve por WhatsApp.

        ${fewShotExamples}`
      }]
    };

    // 4. Petición HTTP a la API de Google (Modelo gemini-2.5-flash de producción estable)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: chatHistory,
          systemInstruction: systemInstructionContent,
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.75,
            topP: 0.95,
          }
        }),
      }
    );

    const data = await response.json() as GeminiApiResponse;

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      throw new Error(data.error?.message || "Error en el motor de IA");
    }

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error("La IA no devolvió resultados legibles.");
    }

    const botText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ text: botText });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    console.error("Critical API Error:", errorMessage);
    
    return NextResponse.json(
      { text: "Estoy recalibrando mis circuitos de Growth. ¿Podrías repetirme eso o prefieres hablar directamente por WhatsApp?" },
      { status: 500 }
    );
  }
}