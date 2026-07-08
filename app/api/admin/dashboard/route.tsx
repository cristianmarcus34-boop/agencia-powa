// app/api/admin/dashboard/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
    try {
        const [usuarios, proyectos, clientes, conversaciones] = await Promise.all([
            supabase.from('usuarios').select('*', { count: 'exact', head: true }),
            supabase.from('proyectos').select('*', { count: 'exact', head: true }),
            supabase.from('clientes').select('*', { count: 'exact', head: true }),
            supabase.from('conversaciones').select('*', { count: 'exact', head: true }),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                totalUsuarios: usuarios.count || 0,
                totalProyectos: proyectos.count || 0,
                totalClientes: clientes.count || 0,
                totalConversaciones: conversaciones.count || 0,
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard:', error);
        return NextResponse.json({
            success: false,
            error: 'Error al cargar el dashboard'
        }, { status: 500 });
    }
}