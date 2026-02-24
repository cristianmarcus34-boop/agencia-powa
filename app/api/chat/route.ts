import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Inicializamos la API Key con validación
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!apiKey) {
      console.error("CRÍTICO: GEMINI_API_KEY no configurada en Vercel.");
      return NextResponse.json({ text: "Error de configuración." }, { status: 500 });
    }

    // Usamos 'gemini-1.5-flash' que es el más rápido y estable para chats
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    });

    // Configuramos las instrucciones del sistema y el historial de una forma más robusta
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Eres PowaBot, el asistente experto de 'Agencia Digital Powa'. Tu objetivo es ayudar a clientes. Eres profesional e innovador. Ofreces software a medida, apps e infraestructura. Si preguntan precios, redirígelos a la sección de contacto. Responde siempre en español de forma amable y concisa." }],
        },
        {
          role: "model",
          parts: [{ text: "¡Entendido! Soy PowaBot, el asistente de Agencia Digital Powa. Estoy listo para ayudar a innovar. ¿En qué puedo asesorarte hoy?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 800, // Un poco menos para mayor velocidad
        temperature: 0.7,    // Creatividad equilibrada
      },
    });

    // Enviamos el mensaje del usuario
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error: any) {
    // Este log aparecerá en Vercel si algo falla
    console.error("Error en PowaBot Engine:", error.message);
    
    return NextResponse.json(
      { text: "Mi conexión neuronal tuvo un hipo. ¿Podrías intentar enviarme el mensaje de nuevo?" }, 
      { status: 500 }
    );
  }
}