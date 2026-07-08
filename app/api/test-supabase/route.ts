// app/api/test-supabase/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase"; // ← RUTA RELATIVA

export async function GET() {
  try {
    console.log('🔍 Probando conexión directa a Supabase...');

    // Consulta directa a la tabla usuarios
    const { data, error } = await supabase
      .from('usuarios')
      .select('*');

    if (error) {
      console.error('❌ Error en la consulta:', error);
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error
      }, { status: 500 });
    }

    console.log('✅ Datos encontrados:', data?.length || 0);

    return NextResponse.json({
      success: true,
      usuarios: data,
      total: data?.length || 0
    });
  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}