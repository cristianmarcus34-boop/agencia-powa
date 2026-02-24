import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Inicializamos la API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Verificamos si la API KEY existe
    if (!process.env.GEMINI_API_KEY) {
      console.error("Falta la GEMINI_API_KEY en el archivo .env.local");
      return NextResponse.json({ text: "Error de configuración en el servidor." }, { status: 500 });
    }

    // 1. Usamos 'gemini-1.5-flash' (sin el 'models/')
    // 2. Definimos las instrucciones del sistema aquí mismo
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    });

    // Iniciamos el chat con un historial vacío pero con un contexto de sistema
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Eres PowaBot, el asistente experto de 'Agencia Digital Powa'. Tu objetivo es ayudar a clientes. Eres profesional e innovador. Ofreces software a medida, apps e infraestructura. Si preguntan precios, redirígelos a contacto. Responde siempre en español de forma amable." }],
        },
        {
          role: "model",
          parts: [{ text: "¡Entendido! Soy PowaBot y estoy listo para asesorar a los clientes de Powa con la mejor energía tecnológica. ¿En qué puedo ayudarles hoy?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error: any) {
    // Log detallado para depuración
    console.error("Error en Gemini API detalle:", error.message);
    
    return NextResponse.json(
      { text: "Lo siento, tuve un problema al conectar con mi cerebro digital. ¿Podemos intentar de nuevo?" }, 
      { status: 500 }
    );
  }
}