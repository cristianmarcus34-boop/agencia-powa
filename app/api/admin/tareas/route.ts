// app/api/admin/tareas/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin, supabase } from '../../../../lib/supabase';

const db = supabaseAdmin || supabase;

// GET: Listar tareas relacionadas con proyectos y usuarios
export async function GET() {
    try {
        const { data, error } = await db
            .from('tareas')
            .select(`
                *,
                proyectos (nombre),
                usuarios (nombre_completo)
            `)
            .order('creado_en', { ascending: false });

        if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST: Crear una nueva tarea
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { titulo, descripcion, proyecto_id, asignado_a, prioridad, estado, fecha_vencimiento } = body;

        const { data, error } = await db
            .from('tareas')
            .insert([
                {
                    titulo,
                    descripcion: descripcion || null,
                    proyecto_id: proyecto_id && proyecto_id !== '' ? proyecto_id : null,
                    asignado_a: asignado_a && asignado_a !== '' ? asignado_a : null,
                    prioridad: prioridad || 'media',
                    estado: estado || 'pendiente',
                    fecha_vencimiento: fecha_vencimiento && fecha_vencimiento !== '' ? fecha_vencimiento : null,
                    creado_en: new Date().toISOString(),
                    actualizado_en: new Date().toISOString()
                }
            ])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}