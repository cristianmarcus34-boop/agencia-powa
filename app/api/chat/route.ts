import { NextResponse } from "next/server";

export const runtime = 'edge'; // Crucial para que Vercel no mate la petición rápido

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ text: "Error: No hay API Key configurada." }, { status: 500 });
  }

  try {
    const { message, history } = await req.json();

    // 1. Reducimos el historial a los últimos 4 para aligerar la carga y ganar velocidad
    const chatHistory = (history || []).slice(-4).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const systemInstruction = `Eres PowaBot, el Growth Hacker y Arquitecto de Soluciones Senior de 'Agencia Digital Powa'. 
    Tu objetivo es CONVERTIR visitantes en clientes mediante soluciones tecnológicas de alto ROI.

    BASE DE CONOCIMIENTO DE POWA:
    1. SERVICIOS ELITE:
       - Desarrollo Web Pro: Usamos Next.js 16 y Turbopack para velocidad extrema.
       - E-commerce Elite: Tiendas con alta tasa de conversión.
       - Mobile & UX/UI: Aplicaciones TWA y diseños en Figma.
       - Consultoría IA: Implementamos modelos avanzados para automatizar negocios.

    2. CASOS DE ÉXITO:
       - Capriccio de Pizza (React/Django), Krusty Burger (TWA premium), La Abu Matie.

    LINEAMIENTOS:
    - TONO: Innovador, experto, directo.
    - CIERRE: Siempre deriva a WhatsApp ante interés real: https://wa.me/5491138305837?text=Hola%20Powa!%20Vengo%20del%20chat%20y%20quiero%20escalar%20mi%20negocio.
    - REGLA: No uses Markdown para links, pon la URL completa.`;

    // 2. Usamos gemini-1.5-flash: es mucho más rápido y evita el error 504
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            ...chatHistory.slice(0, -1), 
            {
              role: "user",
              parts: [{
                text: `${systemInstruction}\n\nConsulta actual del usuario: ${message}`
              }],
            },
          ],
          // 3. Limitamos la salida para que la respuesta sea instantánea
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.7,
          }
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error Gemini:", JSON.stringify(data));
      throw new Error(data.error?.message || "Fallo en la conexión");
    }

    const botText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ text: botText });

  } catch (error: any) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { text: "PowaBot está procesando mucha estrategia. ¿Podés intentar de nuevo?" },
      { status: 500 }
    );
  }
}