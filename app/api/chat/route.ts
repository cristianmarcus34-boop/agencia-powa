import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ text: "Falta la API Key en Vercel." }, { status: 500 });
  }

  try {
    const { message } = await req.json();

    // PROBAMOS CON LA URL ESTABLE Y EL MODELO LATEST
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `Eres PowaBot, asistente de la Agencia Digital Powa. Responde de forma amable y profesional: ${message}` }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error detallado de Google:", errorData);
      // Si falla el 1.5-flash-latest, intentamos el 1.5-pro por si tu cuenta tiene otra prioridad
      throw new Error(errorData.error?.message || "Error en la comunicación");
    }

    const data = await response.json();
    const botText = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ text: botText });

  } catch (error: any) {
    console.error("DETALLE DEL ERROR:", error.message);
    return NextResponse.json(
      { text: "PowaBot está recalibrando sus sistemas. ¿Podés intentar de nuevo?" }, 
      { status: 500 }
    );
  }
}