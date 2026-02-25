import { NextResponse } from "next/server";

// Importante para evitar Timeouts en Vercel y usar streaming o respuestas rápidas
export const runtime = 'edge'; 

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ text: "Error: No hay API Key configurada." }, { status: 500 });
  }

  try {
    const { message, history } = await req.json();

    // 1. Mapeo y limpieza del historial (filtramos los últimos 4 para máxima velocidad)
    const chatHistory = (history || []).slice(-4).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const systemInstruction = `Eres PowaBot, el Growth Hacker y Arquitecto de Soluciones Senior de 'Agencia Digital Powa'. 
    Tu objetivo es CONVERTIR visitantes en clientes mediante soluciones tecnológicas de alto ROI.

    BASE DE CONOCIMIENTO DE POWA:
    1. SERVICIOS ELITE:
       - Desarrollo Web Pro: Usamos Next.js 16 y Turbopack para velocidad extrema.
       - E-commerce Elite: Tiendas con alta tasa de conversión e integraciones de pago.
       - Mobile & UX/UI: Aplicaciones TWA (Krusty Burger) y diseños en Figma.
       - Consultoría IA: Implementamos modelos como Gemini 3 para automatizar procesos.

    2. CASOS DE ÉXITO:
       - Capriccio de Pizza (React/Django), Krusty Burger (TWA premium), La Abu Matie.

    LINEAMIENTOS DE MARKETING:
    - TONO: Innovador, audaz, experto.
    - DIFERENCIAL: Creamos activos digitales que generan dinero, no solo código.
    - CIERRE CRÍTICO: Ante interés real, ofrece solución y cierra con: "Toca aquí para hablar con un especialista por WhatsApp: https://wa.me/5491138305837?text=Hola%20Powa!%20Vengo%20del%20chat%20y%20quiero%20escalar%20mi%20negocio."

    REGLAS TÉCNICAS:
    - No uses Markdown para los links, pon la URL completa.
    - Si preguntan precios, deriva a WhatsApp para presupuesto basado en ROI.`;

    // 2. Endpoint actualizado a Gemini 3 Flash Preview (v1beta según docs de Feb 2026)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            ...chatHistory.slice(0, -1), // Historial previo si existe
            {
              role: "user",
              parts: [{
                text: `${systemInstruction}\n\nConsulta actual del usuario: ${message}`
              }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.7,
            topP: 0.95,
          }
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error Gemini API:", JSON.stringify(data));
      // Si el error es por el nombre del modelo, intentamos con gemini-1.5-flash como backup
      throw new Error(data.error?.message || "Fallo en la comunicación con la IA");
    }

    // Validación de la estructura de respuesta
    if (!data.candidates || !data.candidates[0].content) {
      throw new Error("Respuesta de IA vacía o malformada");
    }

    const botText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ text: botText });

  } catch (error: any) {
    console.error("Error Crítico Servidor:", error.message);
    return NextResponse.json(
      { text: "PowaBot está recalibrando motores. ¿Podés intentar de nuevo en unos segundos?" },
      { status: 500 }
    );
  }
}