// app/api/admin/proyectos/[id]/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

// PUT - Actualizar un proyecto
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { cliente_id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, activo } = body;

    const updateData: any = {
      cliente_id,
      nombre,
      descripcion: descripcion || '',
      estado: estado || 'planificacion',
      presupuesto: presupuesto || 0,
      fecha_inicio: fecha_inicio || null,
      fecha_fin: fecha_fin || null,
      activo: activo !== undefined ? activo : true,
      actualizado_en: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('proyectos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Proyecto actualizado correctamente'
    });

  } catch (error) {
    console.error('Error en PUT proyecto:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al actualizar proyecto'
    }, { status: 500 });
  }
}

// DELETE - Eliminar un proyecto
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verificar que el proyecto existe
    const { data: proyecto, error: checkError } = await supabase
      .from('proyectos')
      .select('id')
      .eq('id', id)
      .single();

    if (checkError || !proyecto) {
      return NextResponse.json({
        success: false,
        error: 'Proyecto no encontrado'
      }, { status: 404 });
    }

    // Eliminar el proyecto
    const { error: deleteError } = await supabase
      .from('proyectos')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    return NextResponse.json({
      success: true,
      message: 'Proyecto eliminado correctamente'
    });

  } catch (error) {
    console.error('Error en DELETE proyecto:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al eliminar proyecto'
    }, { status: 500 });
  }
}