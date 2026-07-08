// app/api/admin/clientes/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

// GET - Listar todos los clientes
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('clientes')
      .select(`
        *,
        proyectos (
          id,
          nombre,
          estado,
          presupuesto
        )
      `)
      .order('nombre_empresa', { ascending: true });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('Error en GET clientes:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Error al cargar clientes' 
    }, { status: 500 });
  }
}

// POST - Crear un nuevo cliente
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      nombre_empresa, 
      nombre_contacto, 
      email, 
      telefono, 
      website,
      industria,
      tamaño_empresa,
      notas
    } = body;

    // Validar campos requeridos
    if (!nombre_empresa || !nombre_contacto || !email) {
      return NextResponse.json({
        success: false,
        error: 'Faltan campos requeridos: nombre_empresa, nombre_contacto, email'
      }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('clientes')
      .insert({
        nombre_empresa,
        nombre_contacto,
        email,
        telefono: telefono || '',
        website: website || '',
        industria: industria || '',
        tamaño_empresa: tamaño_empresa || '',
        notas: notas || '',
        activo: true,
        creado_en: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creando cliente:', error);
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Cliente creado correctamente'
    });

  } catch (error) {
    console.error('Error en POST clientes:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al crear cliente'
    }, { status: 500 });
  }
}