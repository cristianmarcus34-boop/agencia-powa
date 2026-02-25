import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ text: "Error: No hay API Key configurada." }, { status: 500 });
  }

  try {
    const { message } = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{
                text: `Eres PowaBot, el Growth Hacker senior de 'Agencia Digital Powa'. 
                Tu objetivo es CONVERTIR visitantes en clientes mediante soluciones tecnológicas de alto ROI.

                LINEAMIENTOS DE MARKETING:
                1. TONO: Innovador, audaz, experto.
                2. DIFERENCIAL: Creamos activos digitales (Next.js, IA, Gemini 3) que generan dinero, no solo código.
                3. CIERRE CRÍTICO: Cuando detectes interés o un negocio (como una hamburguesería), ofrece una solución y cierra diciendo: "Toca aquí para hablar con un especialista por WhatsApp: https://wa.me/5491138305837?text=Hola%20Powa!%20Vengo%20del%20chat%20y%20quiero%20escalar%20mi%20negocio."
                
                Instrucción: No uses Markdown para los links, pon la URL completa.
                
                Consulta del usuario: ${message}`
              }],
            },
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