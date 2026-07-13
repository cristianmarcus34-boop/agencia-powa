// app/api/admin/conversaciones/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
    try {
        console.log('🔵 GET /api/admin/conversaciones - Iniciando...');

        // 🔥 Consulta con JOIN a usuarios
        const { data, error } = await supabase
            .from('conversaciones')
            .select(`
        *,
        usuario:usuarios (
          id,
          email,
          nombre_completo,
          rol
        )
      `)
            .order('creado_en', { ascending: false });

        if (error) {
            console.error('❌ Error en consulta:', error);
            return NextResponse.json({
                success: false,
                error: error.message
            }, { status: 500 });
        }

        console.log('✅ Datos encontrados:', data?.length || 0);

        return NextResponse.json({
            success: true,
            data: data || []
        });
    } catch (error) {
        console.error('❌ Error en GET conversaciones:', error);
        return NextResponse.json({
            success: false,
            error: 'Error al cargar conversaciones'
        }, { status: 500 });
    }
}