import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ✅ Cliente con SERVICE_ROLE_KEY (permisos totales, solo en el servidor)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = (formData.get('folder') as string) || 'blog';

        if (!file) {
            return NextResponse.json(
                { error: 'No se envió ningún archivo' },
                { status: 400 }
            );
        }

        // Validar tipo de archivo
        const validTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Solo se permiten imágenes PNG, JPG, WEBP o GIF' },
                { status: 400 }
            );
        }

        // Validar tamaño (10MB)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'La imagen no puede superar los 10MB' },
                { status: 400 }
            );
        }

        // Generar nombre único
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        // ✅ Subir a Supabase con SERVICE_ROLE (sin RLS)
        const { data, error } = await supabaseAdmin.storage
            .from('blog-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            console.error('❌ Error al subir:', error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        // Obtener URL pública
        const { data: publicUrl } = supabaseAdmin.storage
            .from('blog-images')
            .getPublicUrl(filePath);

        return NextResponse.json({
            success: true,
            url: publicUrl.publicUrl,
            path: filePath,
        });

    } catch (error) {
        console.error('❌ Error en upload:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}