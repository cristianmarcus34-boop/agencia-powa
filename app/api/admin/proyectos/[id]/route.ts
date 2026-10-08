import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.rol !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { data: proyecto, error } = await supabase
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
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error al obtener proyecto:', error);
      return NextResponse.json(
        { success: false, error: 'Proyecto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: proyecto });
  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;

    console.log('🔍 ===== ACTUALIZAR PROYECTO =====');
    console.log('📝 ID del proyecto:', id);

    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.rol !== 'admin') {
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
      estado,
      presupuesto,
      fecha_inicio,    // ✅ Columna correcta
      fecha_fin,       // ✅ Columna correcta
      activo,
      progreso,          // ✅ Columna correcta
      tipo,
      plazo,
      notas
    } = body;

    // Construir el objeto de actualización
    const updateData: any = {
      actualizado_en: new Date().toISOString()
    };

    if (cliente_id !== undefined) updateData.cliente_id = cliente_id;
    if (nombre !== undefined) updateData.nombre = nombre;
    if (descripcion !== undefined) updateData.descripcion = descripcion;
    if (estado !== undefined) updateData.estado = estado;
    if (presupuesto !== undefined) updateData.presupuesto = presupuesto;
    if (fecha_inicio !== undefined) updateData.fecha_inicio = fecha_inicio;
    if (fecha_fin !== undefined) updateData.fecha_fin = fecha_fin;
    if (activo !== undefined) updateData.activo = activo;
    if (progreso !== undefined) updateData.progreso = progreso;
    if (tipo !== undefined) updateData.tipo = tipo;
    if (plazo !== undefined) updateData.plazo = plazo;
    if (notas !== undefined) updateData.notas = notas;

    console.log('📝 UpdateData:', updateData);

    const { data: proyecto, error } = await supabase
      .from('proyectos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Error al actualizar proyecto:', error);
      return NextResponse.json(
        { success: false, error: 'Error al actualizar proyecto: ' + error.message },
        { status: 500 }
      );
    }

    console.log('✅ Proyecto actualizado:', proyecto.id);
    console.log('✅ ===== ACTUALIZACIÓN EXITOSA =====');

    return NextResponse.json({
      success: true,
      data: proyecto,
      message: 'Proyecto actualizado correctamente'
    });
  } catch (error) {
    console.error('❌ Error en API:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.rol !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { error } = await supabase
      .from('proyectos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar proyecto:', error);
      return NextResponse.json(
        { success: false, error: 'Error al eliminar proyecto' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Proyecto eliminado correctamente'
    });
  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}