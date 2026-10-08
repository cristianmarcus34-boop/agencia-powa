// app/api/cliente/info/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
// app/api/cliente/info/route.ts
import { createClient } from '../../../../lib/server'; // ✅ Ruta correcta

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: 'No autorizado' },
                { status: 401 }
            );
        }

        const supabase = createClient();

        const { data: usuario, error } = await supabase
            .from('usuarios')
            .select('id, email, nombre_completo, nombre_empresa, telefono, sitio_web, industria, tamaño_empresa, rol, activo')
            .eq('id', session.user.id)
            .single();

        if (error) {
            console.error('Error al obtener usuario:', error);
            return NextResponse.json(
                { success: false, error: 'Usuario no encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: usuario });
    } catch (error) {
        console.error('Error en API:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}