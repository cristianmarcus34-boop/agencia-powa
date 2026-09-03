// scripts/migrar-posts.ts
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { blogPosts } from '../data/posts'

// Cargar variables de entorno
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
    throw new Error('❌ NEXT_PUBLIC_SUPABASE_URL no está definida en .env.local')
}
if (!supabaseServiceKey) {
    throw new Error('❌ SUPABASE_SERVICE_ROLE_KEY no está definida en .env.local')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// 🔥 Función para convertir fechas como "27 ene, 2026" a ISO
function parseFecha(fechaStr: string): string {
    try {
        // Mapeo de meses en español a números
        const meses: Record<string, string> = {
            'ene': '01', 'feb': '02', 'mar': '03', 'abr': '04',
            'may': '05', 'jun': '06', 'jul': '07', 'ago': '08',
            'sep': '09', 'oct': '10', 'nov': '11', 'dic': '12'
        }

        // Limpiar la fecha: "27 ene, 2026" → ["27", "ene", "2026"]
        const partes = fechaStr.replace(',', '').split(' ')
        const dia = partes[0].padStart(2, '0')
        const mes = meses[partes[1].toLowerCase()] || '01'
        const año = partes[2] || '2026'

        return `${año}-${mes}-${dia}T00:00:00.000Z`
    } catch {
        return new Date().toISOString()
    }
}

async function migrarPosts() {
    console.log(`📦 Preparando migración de ${blogPosts.length} posts...`)

    let migrados = 0
    let errores = 0
    let saltados = 0

    for (const post of blogPosts) {
        try {
            // Verificar si ya existe
            const { data: existing } = await supabase
                .from('posts')
                .select('id')
                .eq('slug', post.id)
                .single()

            if (existing) {
                console.log(`⏩ El post "${post.title}" ya existe. Saltando...`)
                saltados++
                continue
            }

            // Preparar datos SIN usar 'categoria' (porque no existe en tu tabla)
            const nuevoPost = {
                titulo: post.title,
                slug: post.id,
                contenido: post.content,
                extracto: post.excerpt || '',
                imagen_url: '', // Podés agregar imágenes después
                imagen_alt: '',
                publicado: true,
                created_at: parseFecha(post.date),
                updated_at: new Date().toISOString(),
                meta_descripcion: post.excerpt?.substring(0, 160) || '',
                meta_keywords: post.category || '',
                vistas: 0,
                autor_id: null, // Opcional
                proyecto_id: null, // Opcional
            }

            const { error } = await supabase.from('posts').insert([nuevoPost])

            if (error) {
                console.error(`❌ Error al migrar "${post.title}":`, error.message)
                errores++
            } else {
                console.log(`✅ Migrado: "${post.title}"`)
                migrados++
            }
        } catch (error) {
            console.error(`❌ Error inesperado con "${post.title}":`, error)
            errores++
        }
    }

    console.log(`
    ============================
    📊 RESULTADO DE LA MIGRACIÓN
    ============================
    ✅ Migrados: ${migrados}
    ⏩ Saltados (ya existen): ${saltados}
    ❌ Errores: ${errores}
    ============================
  `)
}

migrarPosts()