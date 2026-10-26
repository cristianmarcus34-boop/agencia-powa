// app/blog/[slug]/types.ts

export interface PostFromDB {
    id: string;
    titulo: string;
    slug: string;
    contenido: string;
    extracto: string;
    imagen_url: string | null;
    imagen_alt: string | null;
    created_at: string;
    meta_keywords: string | null;
    meta_descripcion: string | null;
    emoji: string | null;
    read_time: string | null;
}

export interface RelatedPost {
    id: string;
    titulo: string;
    slug: string;
    emoji: string | null;
}