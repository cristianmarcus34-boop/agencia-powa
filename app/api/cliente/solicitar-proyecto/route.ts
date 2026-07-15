import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: 'No autorizado' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const {
            cliente_id,
            nombre,
            descripcion,
            tipo,
            presupuesto,
            plazo,
            notas
        } = body;

        // Validar datos requeridos
        if (!nombre || !descripcion || !cliente_id) {
            return NextResponse.json(
                { success: false, error: 'Faltan datos requeridos' },
                { status: 400 }
            );
        }

        // Verificar que el cliente pertenece al usuario
        const { data: cliente, error: clienteError } = await supabase
            .from('clientes')
            .select('id')
            .eq('id', cliente_id)
            .eq('usuario_id', session.user.id)
            .single();

        if (clienteError || !cliente) {
            return NextResponse.json(
                { success: false, error: 'Cliente no encontrado' },
                { status: 404 }
            );
        }

        // Crear la solicitud de proyecto
        const { data: proyecto, error } = await supabase
            .from('proyectos')
            .insert({
                cliente_id: cliente_id,
                nombre: nombre,
                descripcion: descripcion,
                tipo: tipo || 'desarrollo',
                presupuesto: presupuesto || 0,
                plazo: plazo || null,
                notas: notas || '',
                estado: 'solicitado', // Estado inicial
                creado_en: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error('Error al crear proyecto:', error);
            return NextResponse.json(
                { success: false, error: 'Error al crear la solicitud' },
                { status: 500 }
            );
        }

        // Opcional: Enviar notificación al admin (email, webhook, etc.)
        // await enviarNotificacionAdmin(proyecto);

        return NextResponse.json({
            success: true,
            data: proyecto,
            message: 'Solicitud enviada correctamente'
        });
    } catch (error) {
        console.error('Error en API:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}