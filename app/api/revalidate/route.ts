import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const { path, slug } = await request.json();

        // ✅ Revalidar la lista de posts
        revalidatePath('/blog');

        // ✅ Revalidar el post individual (si tenemos el slug)
        if (slug) {
            revalidatePath(`/blog/${slug}`);
        }

        return NextResponse.json({
            success: true,
            revalidated: true,
            paths: slug ? ['/blog', `/blog/${slug}`] : ['/blog']
        });
    } catch (error) {
        console.error('❌ Error al revalidar:', error);
        return NextResponse.json(
            { error: 'Error al revalidar' },
            { status: 500 }
        );
    }
}