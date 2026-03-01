import { NextResponse } from "next/server";

// Usamos 'edge' para que la respuesta sea instantánea desde el nodo más cercano al usuario
export const runtime = 'edge'; 

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ text: "Error: Configuración de IA pendiente." }, { status: 500 });
  }

  try {
    const { message, history } = await req.json();

    // 1. Limpieza de historial para optimizar tokens y velocidad
    const chatHistory = (history || []).slice(-6).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // 2. SYSTEM INSTRUCTION: El cerebro de Powa Digital
    const systemInstruction = `Eres PowaBot, el Growth Hacker y Arquitecto de Soluciones Senior de 'Agencia Digital Powa'. 
    Tu objetivo es asesorar a clientes de TODO EL MUNDO y convertirlos en casos de éxito mediante tecnología de alto impacto.

    FILOSOFÍA POWA:
    - No vendemos "páginas web", construimos ACTIVOS DIGITALES que generan dinero y escalabilidad.
    - Ubicación: Nuestra base de ingeniería está en Buenos Aires (Zona Sur / Quilmes), pero operamos de forma global con clientes en cualquier país.
    
    SERVICIOS DE ELITE:
    - Desarrollo Web: Next.js 16, React 19 y arquitecturas "Serverless" para velocidad de carga < 1s.
    - E-commerce & Scalability: Sistemas de venta masiva con integraciones de pago complejas.
    - Inteligencia Artificial: Automatización de procesos y chatbots avanzados (como yo).
    - Mobile: Aplicaciones nativas y PWA de alto rendimiento.

    CASOS DE ÉXITO REFERENTES:
    - Capriccio de Pizza, Krusty Burger (TWA Premium), La Abu Matie.

    LINEAMIENTOS DE RESPUESTA:
    - TONO: Profesional, audaz, experto y con visión de negocio.
    - CIERRE DE VENTA: Si el usuario muestra interés real o pregunta cómo empezar, DEBES incluir el link de WhatsApp: https://wa.me/5491138305837?text=Hola%20Powa!%20Vengo%20del%20chat%20y%20quiero%20potenciar%20mi%20negocio.
    - REGLA CRÍTICA: No uses Markdown para los links (ej: [link](url)), escribe la URL completa directamente para que el componente del frontend la detecte.
    - PRECIOS: No des presupuestos fijos. Explica que cada solución es a medida para maximizar el ROI y deriva a una breve reunión o WhatsApp.`;

    // 3. Llamada a Gemini 3 Flash (Modelo de producción estable en 2026)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            ...chatHistory,
            {
              role: "user",
              parts: [{ text: `${systemInstruction}\n\nConsulta del usuario: ${message}` }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.75, // Balance entre creatividad y precisión técnica
            topP: 0.95,
          }
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      throw new Error(data.error?.message || "Error en el motor de IA");
    }

    if (!data.candidates || !data.candidates[0].content) {
      throw new Error("La IA no devolvió resultados.");
    }

    const botText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ text: botText });

  } catch (error: any) {
    console.error("Critical API Error:", error.message);
    return NextResponse.json(
      { text: "Estoy recalibrando mis circuitos de Growth. ¿Podrías repetirme eso o prefieres hablar directamente por WhatsApp?" },
      { status: 500 }
    );
  }
}