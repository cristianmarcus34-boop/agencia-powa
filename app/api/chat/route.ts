import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ text: "Falta la API Key en Vercel." }, { status: 500 });
  }

  try {
    const { message } = await req.json();

    // Llamamos directamente a la API de Google (Versión estable v1)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error de Google API:", errorData);
      throw new Error(errorData.error?.message || "Error en la comunicación con Google");
    }

    const data = await response.json();
    
    // Extraemos el texto de la respuesta estructurada de Google
    const botText = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ text: botText });

  } catch (error: any) {
    console.error("DETALLE DEL ERROR:", error.message);
    return NextResponse.json(
      { text: "PowaBot está experimentando una sobrecarga sensorial. ¿Reintentamos?" }, 
      { status: 500 }
    );
  }
}