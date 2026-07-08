// app/api/admin/proyectos/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

// GET - Listar todos los proyectos
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('proyectos')
      .select(`
        *,
        clientes (
          nombre_empresa,
          nombre_contacto,
          email
        )
      `)
      .order('creado_en', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('Error en GET proyectos:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Error al cargar proyectos' 
    }, { status: 500 });
  }
}

// POST - Crear un nuevo proyecto
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cliente_id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin } = body;

    // Validar campos requeridos
    if (!cliente_id || !nombre) {
      return NextResponse.json({
        success: false,
        error: 'Faltan campos requeridos: cliente_id y nombre'
      }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('proyectos')
      .insert({
        cliente_id,
        nombre,
        descripcion: descripcion || '',
        estado: estado || 'planificacion',
        presupuesto: presupuesto || 0,
        fecha_inicio: fecha_inicio || null,
        fecha_fin: fecha_fin || null,
        activo: true,
        creado_en: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Proyecto creado correctamente'
    });

  } catch (error) {
    console.error('Error en POST proyectos:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al crear proyecto'
    }, { status: 500 });
  }
}