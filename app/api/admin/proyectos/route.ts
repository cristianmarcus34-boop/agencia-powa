import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.rol !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { data: proyectos, error } = await supabase
      .from('proyectos')
      .select(`
        *,
        clientes (
          id,
          nombre_empresa,
          nombre_contacto,
          email
        )
      `)
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

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.rol !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('📝 POST /api/admin/proyectos - Body:', body);

    const {
      cliente_id,
      nombre,
      descripcion,
      estado,
      presupuesto,
      fecha_inicio,      // ✅ Columna correcta
      fecha_fin,         // ✅ Columna correcta
      activo,            // ✅ Columna correcta
      tipo,
      plazo,
      notas
    } = body;

    // Validaciones
    if (!cliente_id || !nombre) {
      return NextResponse.json(
        { success: false, error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const { data: proyecto, error } = await supabase
      .from('proyectos')
      .insert({
        cliente_id,
        nombre,
        descripcion: descripcion || null,
        estado: estado || 'planificacion',
        presupuesto: presupuesto || 0,
        fecha_inicio: fecha_inicio || null,    // ✅ Columna correcta
        fecha_fin: fecha_fin || null,          // ✅ Columna correcta
        activo: activo !== undefined ? activo : true,  // ✅ Columna correcta
        tipo: tipo || 'desarrollo',
        plazo: plazo || null,
        notas: notas || null,
        creado_en: new Date().toISOString(),
        actualizado_en: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error al crear proyecto:', error);
      return NextResponse.json(
        { success: false, error: 'Error al crear proyecto: ' + error.message },
        { status: 500 }
      );
    }

    console.log('✅ Proyecto creado:', proyecto.id);
    return NextResponse.json({
      success: true,
      data: proyecto,
      message: 'Proyecto creado correctamente'
    });
  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}