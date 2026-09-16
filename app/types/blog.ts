// types/blog.ts
export interface Post {
    id: string;
    titulo: string;
    slug: string;
    contenido: string;
    extracto: string | null;      // ✅ CAMBIAR A string | null
    imagen_url: string | null;    // ✅ CAMBIAR A string | null
    imagen_alt: string | null;    // ✅ CAMBIAR A string | null
    publicado: boolean;
    created_at: string;
    updated_at: string;
    autor_id: string | null;      // ✅ CAMBIAR A string | null
    proyecto_id: string | null;
    vistas: number;
    meta_descripcion: string | null;
    meta_keywords: string | null;
}