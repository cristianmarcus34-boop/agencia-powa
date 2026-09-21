import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const { slug, previousSlug } = await request.json();

        // Siempre revalidar el listado del blog y el sitemap
        revalidatePath('/blog');
        revalidatePath('/sitemap.xml');

        const paths: string[] = ['/blog', '/sitemap.xml'];

        // Post nuevo o editado
        if (slug) {
            revalidatePath(`/blog/${slug}`);
            paths.push(`/blog/${slug}`);
        }

        // Si se editó y cambió el slug, revalidar también la URL vieja
        if (previousSlug && previousSlug !== slug) {
            revalidatePath(`/blog/${previousSlug}`);
            paths.push(`/blog/${previousSlug}`);
        }

        return NextResponse.json({
            success: true,
            revalidated: true,
            paths,
        });
    } catch (error) {
        console.error('❌ Error al revalidar:', error);
        return NextResponse.json(
            { error: 'Error al revalidar' },
            { status: 500 }
        );
    }
}