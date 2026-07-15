import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth'; // ✅ Importación correcta
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

        const { data: facturas, error } = await supabase
            .from('facturas')
            .select(`
        *,
        proyectos (
          nombre
        )
      `)
            .eq('cliente_id', cliente.id)
            .order('fecha_emision', { ascending: false });

        if (error) {
            console.error('Error al obtener facturas:', error);
            return NextResponse.json(
                { success: false, error: 'Error al obtener facturas' },
                { status: 500 }
            );
        }

        const facturasFormateadas = facturas.map((f: any) => ({
            ...f,
            proyecto_nombre: f.proyectos?.nombre || 'Sin proyecto'
        }));

        return NextResponse.json({ success: true, data: facturasFormateadas });
    } catch (error) {
        console.error('Error en API:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}