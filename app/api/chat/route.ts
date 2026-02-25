import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ text: "Error: No hay API Key configurada." }, { status: 500 });
  }

  try {
    const { message, history } = await req.json();

    // Mapeamos el historial para que Gemini mantenga la memoria de la charla
    const formattedHistory = history.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{
                text: `Eres PowaBot, el Growth Hacker y Arquitecto de Soluciones Senior de 'Agencia Digital Powa'. 
                Tu objetivo es CONVERTIR visitantes en clientes mediante soluciones tecnológicas de alto ROI.

                BASE DE CONOCIMIENTO DE POWA:
                1. SERVICIOS ELITE:
                   - Desarrollo Web Pro: Usamos Next.js 16 y Turbopack para velocidad extrema.
                   - E-commerce Elite: Tiendas que venden solas con integraciones de pago.
                   - Mobile & UX/UI: Aplicaciones TWA (Krusty Burger) y diseños en Figma.
                   - Consultoría IA: Implementamos modelos como Gemini 3 para automatizar negocios.

                2. CASOS DE ÉXITO (PORTFOLIO):
                   - Capriccio de Pizza: E-commerce de alto rendimiento (React y Django).
                   - Krusty Burger: TWA premium con experiencia inmersiva.
                   - La Abu Matie: Gestión de pedidos con interfaz minimalista.

                LINEAMIENTOS DE MARKETING:
                1. TONO: Innovador, audaz, experto.
                2. DIFERENCIAL: Creamos activos digitales que generan dinero, no solo código.
                3. CIERRE CRÍTICO: Cuando detectes interés, ofrece una solución y cierra diciendo exactamente: "Toca aquí para hablar con un especialista por WhatsApp: https://wa.me/5491138305837?text=Hola%20Powa!%20Vengo%20del%20chat%20y%20quiero%20escalar%20mi%20negocio."

                REGLAS:
                - No uses Markdown para los links, pon la URL completa.
                - Si preguntan precios, deriva a WhatsApp para presupuesto basado en ROI.
                
                Consulta actual: ${message}`
              }],
            },
            ...formattedHistory.slice(-6) // Enviamos los últimos 6 mensajes para mantener contexto sin saturar el token limit
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error de Google:", JSON.stringify(data));
      throw new Error(data.error?.message || "Fallo en Gemini 3");
    }

    const botText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ text: botText });

  } catch (error: any) {
    return NextResponse.json(
      { text: "PowaBot está recalibrando motores. ¿Podés intentar de nuevo?" },
      { status: 500 }
    );
  }
}