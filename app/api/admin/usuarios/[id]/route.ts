// app/api/admin/usuarios/[id]/route.ts
import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "../../../../../lib/supabase";

// PUT - Actualizar un usuario
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { nombre_completo, rol, activo, password } = body;

    // 1. Actualizar en tu tabla usuarios
    const updateData: any = {
      nombre_completo,
      rol,
      activo,
      actualizado_en: new Date().toISOString(),
    };

    // 🔥 Si hay password, actualizar en auth usando supabaseAdmin
    if (password) {
      const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
        id,
        { password }
      );
      if (authError) {
        console.error('Error actualizando password en auth:', authError);
        return NextResponse.json({
          success: false,
          error: authError.message
        }, { status: 500 });
      }
    }

    const { data, error } = await supabase
      .from('usuarios')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Usuario actualizado correctamente'
    });

  } catch (error) {
    console.error('Error en PUT usuario:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al actualizar usuario'
    }, { status: 500 });
  }
}

// DELETE - Eliminar un usuario
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. Verificar que no sea el último admin
    const { data: admins, error: countError } = await supabase
      .from('usuarios')
      .select('id', { count: 'exact' })
      .eq('rol', 'admin');

    if (countError) throw countError;

    // Obtener el usuario a eliminar para saber su rol
    const { data: usuario, error: userError } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', id)
      .single();

    if (userError) throw userError;

    // Si es admin y es el único, no permitir eliminar
    if (usuario.rol === 'admin' && admins && admins.length <= 1) {
      return NextResponse.json({
        success: false,
        error: 'No se puede eliminar el último administrador del sistema'
      }, { status: 400 });
    }

    // 2. Eliminar de tu tabla usuarios
    const { error: deleteError } = await supabase
      .from('usuarios')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    // 🔥 3. Eliminar de auth.users usando supabaseAdmin
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (authError) {
      console.error('Error eliminando usuario de auth:', authError);
      // No fallamos la operación porque el usuario ya fue eliminado de nuestra tabla
    }

    return NextResponse.json({
      success: true,
      message: 'Usuario eliminado correctamente'
    });

  } catch (error) {
    console.error('Error en DELETE usuario:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al eliminar usuario'
    }, { status: 500 });
  }
}