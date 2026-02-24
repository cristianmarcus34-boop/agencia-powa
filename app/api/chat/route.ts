import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ text: "Falta la API Key en Vercel." }, { status: 500 });
  }

  try {
    const { message } = await req.json();
    const genAI = new GoogleGenerativeAI(apiKey);

    // CAMBIO CLAVE: Usamos el nombre del modelo con el prefijo "models/" 
    // Esto ayuda al SDK a encontrar la ruta correcta en la API de Google.
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    // En lugar de startChat, usamos generateContent directamente para probar conexión pura
    const promptConfig = {
      contents: [{
        role: 'user',
        parts: [{ text: `Eres PowaBot, asistente de Agencia Digital Powa. Responde breve: ${message}` }],
      }],
    };

    const result = await model.generateContent(promptConfig);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("LOG DETALLADO:", error);
    return NextResponse.json(
      { text: `Error: ${error.message}` }, 
      { status: 500 }
    );
  }
}