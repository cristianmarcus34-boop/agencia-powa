import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth'; // ✅ Importación correcta
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: 'No autorizado' },
                { status: 401 }
            );
        }

        const { data: cliente, error: clienteError } = await supabase
            .from('clientes')
            .select('id')
            .eq('usuario_id', session.user.id)
            .single();

        if (clienteError || !cliente) {
            return NextResponse.json(
                { success: false, error: 'Cliente no encontrado' },
                { status: 404 }
            );
        }

        const { data: proyectos, error } = await supabase
            .from('proyectos')
            .select('*')
            .eq('cliente_id', cliente.id)
            .order('creado_en', { ascending: false });

        if (error) {
            console.error('Error al obtener proyectos:', error);
            return NextResponse.json(
                { success: false, error: 'Error al obtener proyectos' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data: proyectos });
    } catch (error) {
        console.error('Error en API:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}