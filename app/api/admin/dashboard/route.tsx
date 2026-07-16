// app/api/admin/dashboard/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

export async function GET() {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);
        if (!session?.user?.id || session.user.rol !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'No autorizado' },
                { status: 401 }
            );
        }

        // Obtener datos del dashboard
        const [usuarios, usuariosActivos, proyectos, proyectosActivos, clientes, conversaciones, mensajes, facturas, facturasPendientes] = await Promise.all([
            // Total usuarios
            supabase.from('usuarios').select('*', { count: 'exact', head: true }),
            // Usuarios activos
            supabase.from('usuarios').select('*', { count: 'exact', head: true }).eq('activo', true),
            // Total proyectos
            supabase.from('proyectos').select('*', { count: 'exact', head: true }),
            // Proyectos activos
            supabase.from('proyectos').select('*', { count: 'exact', head: true }).eq('estado', 'activo'),
            // Total clientes
            supabase.from('clientes').select('*', { count: 'exact', head: true }),
            // Total conversaciones
            supabase.from('conversaciones').select('*', { count: 'exact', head: true }),
            // Total mensajes
            supabase.from('mensajes').select('*', { count: 'exact', head: true }),
            // Total facturas
            supabase.from('facturas').select('*', { count: 'exact', head: true }),
            // Facturas pendientes
            supabase.from('facturas').select('*', { count: 'exact', head: true }).eq('estado', 'pendiente'),
        ]);

        // Obtener últimas conversaciones
        const { data: ultimasConversaciones, error: convError } = await supabase
            .from('conversaciones')
            .select('id, perfil, estado, creado_en')
            .order('creado_en', { ascending: false })
            .limit(10);

        if (convError) {
            console.error('Error al obtener conversaciones:', convError);
        }

        // Obtener actividad reciente (7 días)
        const sieteDiasAtras = new Date();
        sieteDiasAtras.setDate(sieteDiasAtras.getDate() - 7);

        const { data: actividadReciente, error: actError } = await supabase
            .from('actividad')
            .select('tipo, fecha')
            .gte('fecha', sieteDiasAtras.toISOString());

        if (actError) {
            console.error('Error al obtener actividad:', actError);
        }

        // Agrupar actividad por tipo
        const actividadPorTipo: Record<string, number> = {};
        if (actividadReciente) {
            actividadReciente.forEach((item: any) => {
                const tipo = item.tipo || 'otro';
                actividadPorTipo[tipo] = (actividadPorTipo[tipo] || 0) + 1;
            });
        }

        // Obtener promedio de calificaciones (si existe la tabla)
        let promedioCalificacion = 0;
        try {
            const { data: calificaciones, error: calError } = await supabase
                .from('calificaciones')
                .select('puntuacion')
                .limit(1000);

            if (!calError && calificaciones && calificaciones.length > 0) {
                const total = calificaciones.reduce((sum: number, c: any) => sum + (c.puntuacion || 0), 0);
                promedioCalificacion = parseFloat((total / calificaciones.length).toFixed(1));
            }
        } catch (error) {
            console.log('Tabla calificaciones no existe o está vacía:', error);
        }

        return NextResponse.json({
            success: true,
            data: {
                totalUsuarios: usuarios.count || 0,
                usuariosActivos: usuariosActivos.count || 0,
                totalProyectos: proyectos.count || 0,
                proyectosActivos: proyectosActivos.count || 0,
                totalClientes: clientes.count || 0,
                totalConversaciones: conversaciones.count || 0,
                totalMensajes: mensajes.count || 0,
                totalFacturas: facturas.count || 0,
                facturasPendientes: facturasPendientes.count || 0,
                promedioCalificacion: promedioCalificacion,
                ultimasConversaciones: ultimasConversaciones || [],
                actividadPorTipo: actividadPorTipo || {},
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