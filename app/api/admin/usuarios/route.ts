// app/api/admin/usuarios/route.ts
import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "../../../lib/supabase";

// GET - Listar todos los usuarios
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('creado_en', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('Error en GET usuarios:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Error al cargar usuarios' 
    }, { status: 500 });
  }
}

// POST - Crear un nuevo usuario
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('📦 POST /api/admin/usuarios - Body:', body);
    
    const { email, nombre_completo, rol, password } = body;

    // Validar campos requeridos
    if (!email || !nombre_completo || !rol || !password) {
      console.log('❌ Faltan campos:', { email, nombre_completo, rol, password });
      return NextResponse.json({
        success: false,
        error: 'Faltan campos requeridos: email, nombre_completo, rol, password'
      }, { status: 400 });
    }

    // 🔥 1. Crear usuario en auth.users usando supabaseAdmin
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: nombre_completo,
      }
    });

    if (authError) {
      console.error('❌ Error creando usuario en auth:', authError);
      return NextResponse.json({
        success: false,
        error: authError.message
      }, { status: 500 });
    }

    console.log('✅ Usuario creado en auth. ID:', authData.user.id);

    // 2. Crear usuario en tu tabla usuarios
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .insert({
        id: authData.user.id,
        email: email,
        nombre_completo: nombre_completo,
        rol: rol,
        activo: true,
        creado_en: new Date().toISOString(),
      })
      .select()
      .single();

    if (userError) {
      console.error('❌ Error creando usuario en tabla:', userError);
      // Si falla, eliminamos el usuario de auth para mantener consistencia
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json({
        success: false,
        error: userError.message
      }, { status: 500 });
    }

    console.log('✅ Usuario creado en tabla. ID:', userData.id);

    return NextResponse.json({
      success: true,
      data: userData,
      message: 'Usuario creado correctamente'
    });

  } catch (error: any) {
    console.error('❌ Error en POST usuarios:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Error al crear usuario'
    }, { status: 500 });
  }
}