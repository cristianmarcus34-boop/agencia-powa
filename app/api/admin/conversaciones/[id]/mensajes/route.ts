// app/api/admin/conversaciones/[id]/mensajes/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../../../../lib/supabase";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('🔵 GET mensajes para conversación ID:', id);

    if (!id || id === 'undefined') {
      return NextResponse.json({
        success: false,
        error: 'ID inválido'
      }, { status: 400 });
    }

    // 🔥 QUERY SIMPLE - SOLO MENSAJES
    const { data, error } = await supabase
      .from('mensajes')
      .select('*')
      .eq('conversacion_id', id)
      .order('creado_en', { ascending: true });

    if (error) {
      console.error('❌ Error en consulta:', error);
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }

    console.log('✅ Mensajes encontrados:', data?.length || 0);
    console.log('📦 Primer mensaje:', data?.[0]);

    return NextResponse.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('❌ Error en GET mensajes:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al cargar mensajes'
    }, { status: 500 });
  }
}