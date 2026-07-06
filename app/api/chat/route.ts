// app/api/chat/route.ts
import { NextResponse } from "next/server";
import Groq from 'groq-sdk';
// app/api/chat/route.ts
import { ResponseCache } from '../../lib/cache';    // ← RUTA RELATIVA
import { metrics } from '../../lib/metrics';        // ← RUTA RELATIVA
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

export async function POST(req: Request) {
  const startTime = Date.now();
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ text: "Error: Configuración de IA pendiente." }, { status: 500 });
  }

  try {
    const { message, history, profile } = await req.json() as {
      message: string;
      history?: ChatMessageInput[];
      profile?: "gastronomia" | "empresa_emprendedor" | "senior_software";
    };

    // Verificar caché
    const cacheKey = cache.generateKey(message, profile || 'default');
    const cachedResponse = cache.get(cacheKey);
    
    if (cachedResponse) {
      metrics.recordCacheHit();
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
        },
      });
    }

    metrics.recordCacheMiss();

    // Mapeo del historial
    const chatHistory: GroqChatMessage[] = (history || []).slice(-6).map((m: ChatMessageInput) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    }));

    // --- CONTEXTUALIZACIÓN POR PERFIL ---
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

    // System Prompt
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
    ${fewShotExamples}`;

    const messagesForGroq: GroqChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...chatHistory,
      { role: "user", content: message },
    ];

    // STREAMING
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