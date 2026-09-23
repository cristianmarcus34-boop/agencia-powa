// app/api/admin/tareas/[id]/historial/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin, supabase } from '../../../../../lib/supabase';

const db = supabaseAdmin || supabase;

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;

        const { data, error } = await db
            .from('historial_tareas')
            .select('*')
            .eq('tarea_id', id)
            .order('creado_en', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}