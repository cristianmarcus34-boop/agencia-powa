// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// ============================================
// 🔥 VARIABLES DE ENTORNO CON VALIDACIÓN
// ============================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// ⚠️ IMPORTANTE: Validar que existan
if (!supabaseUrl) {
    throw new Error('❌ NEXT_PUBLIC_SUPABASE_URL no está definida')
}

if (!supabaseAnonKey) {
    throw new Error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY no está definida')
}

// ============================================
// 🔥 CLIENTE PÚBLICO (para el navegador)
// ============================================
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// 🔥 CLIENTE ADMIN (solo para server, NO exponer en cliente)
// ============================================
// ⚠️ Esta variable SOLO debe usarse en Server Components o API Routes
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabaseAdmin = supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null

// ============================================
// 📦 EXPORTACIONES PARA SERVER COMPONENTS
// ============================================
// Para usar en Server Components (app/blog/page.tsx, etc.)
export const createServerClient = () => {
    return createClient(supabaseUrl, supabaseAnonKey)
}