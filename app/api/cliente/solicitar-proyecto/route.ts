import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 🔥 Usar el cliente ADMIN para Auth
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
    try {
        console.log('🔍 ===== SOLICITAR PROYECTO =====');

        const session = await getServerSession(authOptions);
        console.log('📝 Session:', session?.user?.id);

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: 'No autorizado' },
                { status: 401 }
            );
        }

        const body = await request.json();
        console.log('📝 Body recibido:', body);

        const {
            cliente_id,
            nombre,
            descripcion,
            tipo,
            presupuesto,
            plazo,
            notas
        } = body;

        // 🔥 Validar campos requeridos
        if (!cliente_id) {
            console.log('❌ Falta cliente_id');
            return NextResponse.json(
                { success: false, error: 'Falta el ID del cliente' },
                { status: 400 }
            );
        }

        if (!nombre || nombre.trim() === '') {
            console.log('❌ Falta nombre');
            return NextResponse.json(
                { success: false, error: 'El nombre del proyecto es requerido' },
                { status: 400 }
            );
        }

        if (!descripcion || descripcion.trim() === '') {
            console.log('❌ Falta descripcion');
            return NextResponse.json(
                { success: false, error: 'La descripción del proyecto es requerida' },
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
            console.log('❌ Cliente no encontrado:', clienteError);
            return NextResponse.json(
                { success: false, error: 'Cliente no encontrado' },
                { status: 404 }
            );
        }

        console.log('✅ Cliente verificado:', cliente_id);

        // Crear la solicitud de proyecto
        const { data: proyecto, error } = await supabase
            .from('proyectos')
            .insert({
                cliente_id: cliente_id,
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                tipo: tipo || 'desarrollo',
                presupuesto: presupuesto || 0,
                plazo: plazo || null,
                notas: notas || null,
                estado: 'solicitado',
                creado_en: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error('❌ Error al crear proyecto:', error);
            return NextResponse.json(
                { success: false, error: 'Error al crear la solicitud: ' + error.message },
                { status: 500 }
            );
        }

        console.log('✅ Proyecto creado:', proyecto.id);
        console.log('✅ ===== SOLICITUD EXITOSA =====');

        return NextResponse.json({
            success: true,
            data: proyecto,
            message: 'Solicitud enviada correctamente'
        });

    } catch (error) {
        console.error('❌ Error en API:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}