import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Cliente admin para Supabase Auth
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GET: Obtener todos los usuarios
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    if (session.user.rol !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'No tienes permisos' },
        { status: 403 }
      );
    }

    const { data: usuarios, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('creado_en', { ascending: false });

    if (error) {
      console.error('Error al obtener usuarios:', error);
      return NextResponse.json(
        { success: false, error: 'Error al obtener usuarios' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: usuarios });
  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST: Crear un nuevo usuario
export async function POST(request: Request) {
  try {
    console.log('🔍 ===== CREANDO NUEVO USUARIO =====');

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      );
    }

    if (session.user.rol !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'No tienes permisos' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { email, nombre_completo, rol, activo, password } = body;

    console.log('📝 Creando usuario:', email);

    // Validaciones
    if (!email || !nombre_completo || !password) {
      return NextResponse.json(
        { success: false, error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // 🔥 PRIMERO: Verificar si el usuario ya existe en Supabase Auth
    console.log('🔍 Verificando si el usuario existe en Auth...');
    let userId: string | null = null;
    let userExistsInAuth = false;

    try {
      // Listar todos los usuarios y buscar por email
      const { data: authUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();

      if (!listError && authUsers?.users) {
        const existingUser = authUsers.users.find((u: any) => u.email === email);
        if (existingUser) {
          userId = existingUser.id;
          userExistsInAuth = true;
          console.log('ℹ️ El usuario ya existe en Auth con ID:', userId);
        }
      }
    } catch (listError) {
      console.log('⚠️ Error al listar usuarios, continuando con creación...');
    }

    // 2. CREAR O ACTUALIZAR EN SUPABASE AUTH
    if (!userExistsInAuth) {
      // Crear nuevo usuario en Auth
      console.log('🔐 Creando usuario en Supabase Auth...');
      try {
        const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true,
          user_metadata: {
            name: nombre_completo,
            rol: rol || 'cliente'
          }
        });

        if (authError) {
          console.error('❌ Error en Supabase Auth:', authError);
          return NextResponse.json(
            { success: false, error: 'Error al crear usuario en Supabase Auth: ' + authError.message },
            { status: 500 }
          );
        }

        userId = authUser.user?.id || null;
        console.log('✅ Usuario creado en Supabase Auth:', userId);
      } catch (authError) {
        console.error('❌ Error en Supabase Auth:', authError);
        return NextResponse.json(
          { success: false, error: 'Error al crear el usuario en Auth' },
          { status: 500 }
        );
      }
    } else {
      // Actualizar usuario existente en Auth
      console.log('🔄 Actualizando usuario existente en Auth...');

      // 🔥 VERIFICAR QUE userId NO SEA NULL
      if (!userId) {
        return NextResponse.json(
          { success: false, error: 'ID de usuario no encontrado' },
          { status: 404 }
        );
      }

      try {
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
          userId, // ✅ AHORA ES string, no null
          {
            password: password,
            user_metadata: {
              name: nombre_completo,
              rol: rol || 'cliente'
            }
          }
        );

        if (updateError) {
          console.error('❌ Error al actualizar usuario en Auth:', updateError);
          return NextResponse.json(
            { success: false, error: 'Error al actualizar usuario en Auth' },
            { status: 500 }
          );
        }
        console.log('✅ Usuario actualizado en Auth');
      } catch (updateError) {
        console.error('❌ Error al actualizar usuario en Auth:', updateError);
        return NextResponse.json(
          { success: false, error: 'Error al actualizar usuario en Auth' },
          { status: 500 }
        );
      }
    }

    // 3. GUARDAR EN LA TABLA usuarios
    console.log('💾 Guardando en tabla usuarios...');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Verificar si ya existe en la tabla
    const { data: existingUser, error: checkError } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .single();

    let usuario;

    if (existingUser) {
      // Actualizar usuario existente en la tabla
      console.log('🔄 Actualizando usuario en tabla...');
      const { data, error: updateDbError } = await supabase
        .from('usuarios')
        .update({
          nombre_completo: nombre_completo,
          rol: rol || 'cliente',
          activo: activo !== undefined ? activo : true,
          password_hash: passwordHash,
          actualizado_en: new Date().toISOString()
        })
        .eq('email', email)
        .select()
        .single();

      if (updateDbError) {
        console.error('❌ Error al actualizar en tabla:', updateDbError);
        return NextResponse.json(
          { success: false, error: 'Error al actualizar en la base de datos: ' + updateDbError.message },
          { status: 500 }
        );
      }
      usuario = data;
    } else {
      // 🔥 VERIFICAR QUE userId NO SEA NULL ANTES DE INSERTAR
      if (!userId) {
        return NextResponse.json(
          { success: false, error: 'Error: No se pudo obtener el ID del usuario' },
          { status: 500 }
        );
      }

      // Insertar nuevo usuario en la tabla
      const { data, error: insertError } = await supabase
        .from('usuarios')
        .insert({
          id: userId, // ✅ AHORA ES string, no null
          email: email,
          nombre_completo: nombre_completo,
          rol: rol || 'cliente',
          activo: activo !== undefined ? activo : true,
          password_hash: passwordHash,
          creado_en: new Date().toISOString()
        })
        .select()
        .single();

      if (insertError) {
        console.error('❌ Error al insertar en tabla:', insertError);
        // Si falla la inserción, eliminamos el usuario de Auth
        if (userId) {
          await supabaseAdmin.auth.admin.deleteUser(userId);
        }
        return NextResponse.json(
          { success: false, error: 'Error al guardar en la base de datos: ' + insertError.message },
          { status: 500 }
        );
      }
      usuario = data;
    }

    console.log('✅ Usuario guardado correctamente:', usuario.email);
    console.log('✅ ===== USUARIO CREADO =====');

    return NextResponse.json({
      success: true,
      data: usuario,
      message: userExistsInAuth ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente'
    });

  } catch (error) {
    console.error('❌ Error en API:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor: ' + (error as Error).message },
      { status: 500 }
    );
  }
}