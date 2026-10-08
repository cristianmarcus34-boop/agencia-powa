// app/api/admin/clientes/[id]/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabase";

// PUT - Actualizar un cliente
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      nombre_empresa,
      nombre_contacto,
      email,
      telefono,
      sitio_web,  // ← CAMBIAR: usar sitio_web directamente
      industria,
      tamaño_empresa,
      notas,
      activo
    } = body;

    const updateData: any = {
      nombre_empresa,
      nombre_contacto,
      email,
      telefono: telefono || '',
      sitio_web: sitio_web || '',
      industria: industria || '',
      tamaño_empresa: tamaño_empresa || '',
      notas: notas || '',
      activo: activo !== undefined ? activo : true,
      actualizado_en: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('clientes')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Cliente actualizado correctamente'
    });

  } catch (error) {
    console.error('Error en PUT cliente:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al actualizar cliente'
    }, { status: 500 });
  }
}

// DELETE - Eliminar un cliente
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verificar si el cliente tiene proyectos asociados
    const { data: proyectos, error: checkError } = await supabase
      .from('proyectos')
      .select('id, nombre')
      .eq('cliente_id', id);

    if (checkError) throw checkError;

    if (proyectos && proyectos.length > 0) {
      return NextResponse.json({
        success: false,
        error: `No se puede eliminar el cliente porque tiene ${proyectos.length} proyecto(s) asociado(s)`,
        proyectos: proyectos.map(p => p.nombre)
      }, { status: 400 });
    }

    // Eliminar el cliente
    const { error: deleteError } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    return NextResponse.json({
      success: true,
      message: 'Cliente eliminado correctamente'
    });

  } catch (error) {
    console.error('Error en DELETE cliente:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al eliminar cliente'
    }, { status: 500 });
  }
}