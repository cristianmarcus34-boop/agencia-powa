import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ text: "Error: No hay API Key configurada." }, { status: 500 });
  }

  try {
    const { message } = await req.json();

    // SEGÚN TUS NOTAS DE FEBRERO 2026:
    // El modelo actual es gemini-3-flash-preview
    // Usamos v1beta porque los modelos preview suelen vivir allí primero
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ 
                text: `Eres PowaBot, el asistente de vanguardia de Agencia Digital Powa. 
                       Responde de forma profesional, breve y con un toque tecnológico: ${message}` 
              }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error de Google (Feb 2026):", JSON.stringify(data));
      throw new Error(data.error?.message || "Fallo en el nuevo modelo Gemini 3");
    }

    const botText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ text: botText });

  } catch (error: any) {
    console.error("LOG DE POWA:", error.message);
    return NextResponse.json(
      { text: "PowaBot se está actualizando a los nuevos servidores de Gemini 3. ¿Reintentamos?" }, 
      { status: 500 }
    );
  }
}