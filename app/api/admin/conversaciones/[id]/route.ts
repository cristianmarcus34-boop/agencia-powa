// app/api/admin/conversaciones/[id]/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('🔵 GET conversación ID:', id);

    if (!id || id === 'undefined') {
      return NextResponse.json({
        success: false,
        error: 'ID inválido'
      }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('conversaciones')
      .select(`
        *,
        cliente:clientes (
          nombre_empresa,
          nombre_contacto,
          email
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al cargar conversación'
    }, { status: 500 });
  }
}