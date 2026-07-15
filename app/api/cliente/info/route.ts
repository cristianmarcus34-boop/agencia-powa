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

        const { data: cliente, error } = await supabase
            .from('clientes')
            .select('id, nombre_empresa, nombre_contacto, email, telefono, sitio_web, industria, tamaño_empresa')
            .eq('usuario_id', session.user.id)
            .single();

        if (error) {
            console.error('Error al obtener cliente:', error);
            return NextResponse.json(
                { success: false, error: 'Cliente no encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: cliente });
    } catch (error) {
        console.error('Error en API:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}