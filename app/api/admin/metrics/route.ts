// app/api/admin/metrics/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
  try {
    // Obtener métricas de los últimos 7 días
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 7);

    const { data: metricas, error } = await supabase
      .from('metricas')
      .select('tipo_evento, creado_en')
      .gte('creado_en', fechaLimite.toISOString())
      .order('creado_en', { ascending: true });

    if (error) throw error;

    // Agrupar por día
    const dias: Record<string, Record<string, number>> = {};
    const tipos = ['inicio_chat', 'mensaje', 'satisfaccion', 'acierto_cache', 'fallo_cache'];

    if (metricas) {
      metricas.forEach((m: any) => {
        const dia = new Date(m.creado_en).toISOString().split('T')[0];
        if (!dias[dia]) {
          dias[dia] = {};
          tipos.forEach(t => dias[dia][t] = 0);
        }
        dias[dia][m.tipo_evento] = (dias[dia][m.tipo_evento] || 0) + 1;
      });
    }

    // Convertir a array para el gráfico
    const labels = Object.keys(dias).sort();
    const datasets = tipos.map(tipo => ({
      label: tipo,
      data: labels.map(dia => dias[dia]?.[tipo] || 0)
    }));

    return NextResponse.json({
      success: true,
      data: {
        labels,
        datasets
      }
    });
  } catch (error) {
    console.error('Error en métricas:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Error al cargar métricas' 
    }, { status: 500 });
  }
}