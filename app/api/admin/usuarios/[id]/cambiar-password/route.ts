import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../../lib/auth';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function PUT(
    request: Request,
    context: { params: { id: string } }
) {
    try {
        const { id } = await context.params;

        console.log('🔍 ===== INICIO CAMBIO CONTRASEÑA =====');
        console.log('📝 ID del usuario:', id);

        // 1. Verificar sesión
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: 'No autorizado' },
                { status: 401 }
            );
        }

        if (session.user.rol !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'No tienes permisos para esta acción' },
                { status: 403 }
            );
        }

        // 2. Obtener datos
        const { password } = await request.json();

        if (!password || password.length < 6) {
            return NextResponse.json(
                { success: false, error: 'La contraseña debe tener al menos 6 caracteres' },
                { status: 400 }
            );
        }

        // 3. Obtener el email del usuario
        console.log('🔍 Buscando usuario en la tabla...');
        const { data: usuario, error: findError } = await supabase
            .from('usuarios')
            .select('id, email')
            .eq('id', id)
            .single();

        if (findError || !usuario) {
            console.error('❌ Usuario no encontrado:', findError);
            return NextResponse.json(
                { success: false, error: 'Usuario no encontrado' },
                { status: 404 }
            );
        }
        console.log('✅ Usuario encontrado:', usuario.email);

        // 4. 🔥 ACTUALIZAR EN SUPABASE AUTH (IMPORTANTE)
        console.log('🔐 Actualizando contraseña en Supabase Auth...');

        // Primero, obtener el user_id de Supabase Auth
        const { data: authUser, error: authFindError } = await supabase.auth.admin.getUserById(id);

        if (authFindError || !authUser?.user) {
            console.log('⚠️ Usuario no encontrado en Supabase Auth, intentando crear/actualizar...');

            // Si el usuario no existe en Auth, no podemos actualizar la contraseña
            // Pero podemos actualizar la tabla usuarios y el admin deberá crear el usuario en Auth
            console.log('ℹ️ El usuario no existe en Supabase Auth. Solo se actualizará la tabla usuarios.');

            // Actualizar solo la tabla usuarios
            const { error: updateError } = await supabase
                .from('usuarios')
                .update({ password_hash: await bcrypt.hash(password, 10) })
                .eq('id', id);

            if (updateError) {
                console.error('❌ Error al actualizar:', updateError);
                return NextResponse.json(
                    { success: false, error: 'Error al actualizar la contraseña' },
                    { status: 500 }
                );
            }

            return NextResponse.json({
                success: true,
                message: 'Contraseña actualizada en la tabla de usuarios. NOTA: El usuario no existe en Supabase Auth, no podrá iniciar sesión con esta contraseña.',
                warning: 'Usuario no existe en Supabase Auth'
            });
        }

        console.log('✅ Usuario encontrado en Supabase Auth:', authUser.user.email);

        // 🔥 ACTUALIZAR CONTRASEÑA EN SUPABASE AUTH
        const { error: authUpdateError } = await supabase.auth.admin.updateUserById(
            id,
            { password: password }
        );

        if (authUpdateError) {
            console.error('❌ Error al actualizar en Supabase Auth:', authUpdateError);
            return NextResponse.json(
                { success: false, error: 'Error al actualizar la contraseña en Supabase Auth: ' + authUpdateError.message },
                { status: 500 }
            );
        }

        console.log('✅ Contraseña actualizada en Supabase Auth');

        // 5. También actualizar la tabla usuarios (por consistencia)
        console.log('💾 Actualizando tabla usuarios...');
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const { error: updateError } = await supabase
            .from('usuarios')
            .update({ password_hash: passwordHash })
            .eq('id', id);

        if (updateError) {
            console.error('⚠️ Error al actualizar tabla usuarios:', updateError);
            // No fallamos porque Auth ya se actualizó
        } else {
            console.log('✅ Tabla usuarios actualizada');
        }

        console.log('✅ ===== CAMBIO EXITOSO =====');
        return NextResponse.json({
            success: true,
            message: 'Contraseña actualizada correctamente en Supabase Auth y en la tabla de usuarios'
        });

    } catch (error) {
        console.error('❌ Error general en API:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}