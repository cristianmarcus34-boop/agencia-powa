import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ text: "Falta la API Key." }, { status: 500 });
  }

  try {
    const { message } = await req.json();

    // Probamos con v1beta y el nombre de modelo más genérico
    // Si este falla, probaremos con 'gemini-pro'
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Eres PowaBot, asistente de Agencia Powa. Responde breve: ${message}` }]
          }]
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error crítico de Google:", data);
      // Intento de rescate: Si falla el flash, probamos el pro original
      return NextResponse.json({ text: "Error de modelo. Intenta cambiar gemini-1.5-flash por gemini-pro en el código." }, { status: 500 });
    }

    const botText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ text: botText });

  } catch (error: any) {
    return NextResponse.json({ text: "Error de conexión." }, { status: 500 });
  }
}