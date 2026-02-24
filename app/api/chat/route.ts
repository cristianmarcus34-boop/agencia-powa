import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ text: "Falta la API Key en Vercel." }, { status: 500 });
  }

  try {
    const { message } = await req.json();

    // USAMOS LA RUTA V1 Y EL MODELO GEMINI-PRO (EL MÁS COMPATIBLE)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `Eres PowaBot, el asistente experto de la Agencia Digital Powa. Tu objetivo es ayudar a clientes. Responde de forma profesional e innovadora en español: ${message}` }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error detallado de Google:", data);
      throw new Error(data.error?.message || "Error en la comunicación");
    }

    // Estructura de respuesta para gemini-pro
    const botText = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ text: botText });

  } catch (error: any) {
    console.error("DETALLE DEL ERROR:", error.message);
    return NextResponse.json(
      { text: "PowaBot está experimentando una actualización. ¿Podés intentar de nuevo en un momento?" }, 
      { status: 500 }
    );
  }
}