export interface Post {
    id: string
    titulo: string
    slug: string
    contenido: string
    extracto: string
    imagen_url: string
    imagen_alt: string
    publicado: boolean
    created_at: string
    updated_at: string
    autor_id: string
    proyecto_id: string | null
    vistas: number
    meta_descripcion: string | null
    meta_keywords: string | null
}