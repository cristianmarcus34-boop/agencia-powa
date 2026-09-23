import { NextResponse } from 'next/server';
import { supabaseAdmin, supabase } from '../../../../lib/supabase';

const db = supabaseAdmin || supabase;

// Función helper para limpiar valores que rompen las columnas UUID
const cleanUuid = (val: any) => (val && val !== '' && val !== 'undefined' ? val : null);

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
    try {
        // 🔥 En Next.js 15+ los params son una promesa, los "esperamos" primero
        const resolvedParams = await params;
        const id = resolvedParams.id;

        if (!id || id === 'undefined') {
            return NextResponse.json({ success: false, error: 'ID de tarea inválido' }, { status: 400 });
        }

        const body = await request.json();

        const updateData = {
            titulo: body.titulo,
            descripcion: body.descripcion || null,
            proyecto_id: cleanUuid(body.proyecto_id),
            asignado_a: cleanUuid(body.asignado_a),
            prioridad: body.prioridad || 'media',
            estado: body.estado || 'pendiente',
            fecha_vencimiento: body.fecha_vencimiento && body.fecha_vencimiento !== '' ? body.fecha_vencimiento : null,
            actualizado_en: new Date().toISOString()
        };

        const { data, error } = await db
            .from('tareas')
            .update(updateData)
            .eq('id', id)
            .select();

        if (error) throw error;

        return NextResponse.json({ success: true, data, message: 'Tarea actualizada' });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
    try {
        // 🔥 Lo mismo acá para el DELETE
        const resolvedParams = await params;
        const id = resolvedParams.id;

        if (!id || id === 'undefined') {
            return NextResponse.json({ success: false, error: 'ID de tarea inválido' }, { status: 400 });
        }

        const { error } = await db
            .from('tareas')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true, message: 'Tarea eliminada' });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}