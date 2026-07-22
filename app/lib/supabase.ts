// lib/supabase.ts
// 🔥 Archivo legacy para mantener compatibilidad con código existente
// Se recomienda usar los nuevos archivos en lib/supabase/

import { createClient as createBrowserClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 🔥 Cliente público (para operaciones normales)
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// 🔥 Cliente de administración (para crear/editar/eliminar usuarios)
export const supabaseAdmin = createBrowserClient(supabaseUrl, supabaseServiceKey);