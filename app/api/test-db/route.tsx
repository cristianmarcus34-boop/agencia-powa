// app/api/test-db/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase"; // ← RUTA RELATIVA


export async function GET() {
    try {
        console.log('🔍 Probando conexión a Supabase...');
        console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log('KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...');

        // Probar conexión a Supabase
        const { data, error } = await supabase
            .from('usuarios')
            .select('id, email, nombre_completo, rol')
            .limit(5);

        if (error) {
            console.error('❌ Error de conexión:', error);
            return NextResponse.json({
                success: false,
                error: error.message,
                details: error
            }, { status: 500 });
        }

        console.log('✅ Conexión exitosa! Usuarios encontrados:', data?.length || 0);

        return NextResponse.json({
            success: true,
            message: '✅ Conexión a Supabase exitosa',
            usuarios: data,
            count: data?.length || 0
        });
    } catch (error: any) {
        console.error('❌ Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}