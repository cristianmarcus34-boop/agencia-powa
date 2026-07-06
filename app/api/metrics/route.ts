// app/api/metrics/route.ts
import { NextResponse } from "next/server";
import { metrics } from '../../lib/metrics';        // ← RUTA RELATIVA

export async function GET() {
  try {
    const data = metrics.getMetrics();
    
    return NextResponse.json({
      success: true,
      metrics: {
        totalChats: data.totalChats,
        totalMessages: data.totalMessages,
        cacheHits: data.cacheHits,
        cacheMisses: data.cacheMisses,
        cacheHitRate: metrics.getCacheHitRate(),
        averageResponseTime: metrics.getAverageResponseTime(),
        averageSatisfaction: metrics.getAverageSatisfaction(),
        tokenUsage: data.tokenUsage,
        errors: data.errors,
        uptime: Date.now() - data.startTime,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al obtener métricas" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { action, data } = await req.json();

    switch (action) {
      case 'satisfaction':
        if (data?.rating) {
          metrics.recordSatisfaction(data.rating);
          return NextResponse.json({ success: true });
        }
        break;
      
      case 'reset':
        metrics.reset();
        return NextResponse.json({ success: true });
      
      default:
        return NextResponse.json(
          { success: false, error: 'Acción no válida' },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}