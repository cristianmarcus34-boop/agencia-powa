import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../../lib/auth'; // ✅ Importar authOptions
import { createClient } from '../../../lib/server'; // ✅ CORREGIDO

export async function PUT(request: Request) {
    console.log('🔵 PUT /api/cliente/perfil - INICIANDO');

    try {
        const session = await getServerSession(authOptions);
        console.log('🔍 Session encontrada?', !!session);
        console.log('🔍 Session.user?.id:', session?.user?.id);

        if (!session?.user?.id) {
            console.log('❌ No autorizado - sin sesión');
            return NextResponse.json(
                { success: false, error: 'No autorizado - Sesión no encontrada' },
                { status: 401 }
            );
        }

        const body = await request.json();
        console.log('📦 Body recibido:', body);

        const supabase = createClient();

        const { data, error } = await supabase
            .from('usuarios')
            .update({
                nombre_empresa: body.nombre_empresa,
                nombre_completo: body.nombre_completo,
                telefono: body.telefono,
                sitio_web: body.sitio_web,
                industria: body.industria,
                tamaño_empresa: body.tamaño_empresa,
                actualizado_en: new Date().toISOString()
            })
            .eq('id', session.user.id)
            .select();

        if (error) {
            console.error('❌ Error en Supabase:', error);
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        console.log('✅ Perfil actualizado:', data);
        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error('❌ Error:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}