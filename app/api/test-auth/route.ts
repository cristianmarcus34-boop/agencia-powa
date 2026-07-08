// app/api/test-auth/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase"; // ← RUTA RELATIVA
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    console.log('🔍 TEST: Buscando usuario:', email);

    // Buscar usuario en Supabase
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !usuario) {
      console.log('❌ TEST: Usuario NO encontrado');
      return NextResponse.json({ 
        success: false, 
        error: 'Usuario no encontrado',
        details: error 
      });
    }

    console.log('✅ TEST: Usuario encontrado:', usuario.email);
    console.log('📦 TEST: Hash en DB:', usuario.password_hash);

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password_hash);

    console.log('✅ TEST: Contraseña válida?', passwordValida);

    return NextResponse.json({
      success: true,
      usuario_encontrado: !!usuario,
      contraseña_valida: passwordValida,
      email: usuario.email,
      rol: usuario.rol
    });

  } catch (error: any) {
    console.error('❌ TEST Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}