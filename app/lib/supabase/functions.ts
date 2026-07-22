// lib/supabase/functions.ts
import { supabase } from '../../lib/supabase';

// ============================================
// 📋 FUNCIONES PARA CONVERSACIONES
// ============================================

export async function crearConversacion(
    perfil: string,
    usuarioId?: string,
    esAdmin?: boolean
) {
    const { data, error } = await supabase
        .from('conversaciones')
        .insert({
            perfil,
            usuario_id: usuarioId || null,
            es_admin: esAdmin || false,
            estado: 'activo',
            origen: 'web',
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function obtenerConversacion(id: string) {
    const { data, error } = await supabase
        .from('conversaciones')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}

export async function actualizarEstadoConversacion(
    id: string,
    estado: 'activo' | 'cerrado' | 'archivado'
) {
    const { data, error } = await supabase
        .from('conversaciones')
        .update({ estado })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// ============================================
// 📋 FUNCIONES PARA MENSAJES
// ============================================

export async function guardarMensaje(
    conversacionId: string,
    rol: 'usuario' | 'asistente',
    contenido: string
) {
    const { data, error } = await supabase
        .from('mensajes')
        .insert({ conversacion_id: conversacionId, rol, contenido })
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function obtenerHistorial(
    conversacionId: string,
    limite: number = 20
) {
    const { data, error } = await supabase
        .from('mensajes')
        .select('*')
        .eq('conversacion_id', conversacionId)
        .order('creado_en', { ascending: true })
        .limit(limite);

    if (error) throw error;
    return data;
}

export async function obtenerUltimosMensajes(
    conversacionId: string,
    limite: number = 6
) {
    const { data, error } = await supabase
        .from('mensajes')
        .select('*')
        .eq('conversacion_id', conversacionId)
        .order('creado_en', { ascending: false })
        .limit(limite);

    if (error) throw error;
    return data.reverse();
}

// ============================================
// 📋 FUNCIONES PARA MÉTRICAS
// ============================================

export async function guardarMetrica(
    tipoEvento: string,
    conversacionId?: string,
    valor?: any
) {
    const { error } = await supabase
        .from('metricas')
        .insert({
            tipo_evento: tipoEvento,
            conversacion_id: conversacionId,
            valor: valor || null
        });

    if (error) console.error('Error guardando métrica:', error);
}

// ============================================
// 📋 FUNCIONES PARA CACHÉ
// ============================================

export async function guardarCache(
    clave: string,
    respuesta: string,
    segundos: number = 3600
) {
    const expiraEn = new Date(Date.now() + segundos * 1000);
    const { error } = await supabase
        .from('cache')
        .upsert({
            clave,
            respuesta,
            expira_en: expiraEn.toISOString(),
            cantidad_consultas: 0,
        });

    if (error) console.error('Error guardando caché:', error);
}

export async function obtenerCache(clave: string) {
    const { data, error } = await supabase
        .from('cache')
        .select('respuesta, cantidad_consultas')
        .eq('clave', clave)
        .gt('expira_en', new Date().toISOString())
        .single();

    if (error || !data) return null;

    await supabase
        .from('cache')
        .update({ cantidad_consultas: (data.cantidad_consultas || 0) + 1 })
        .eq('clave', clave);

    return data.respuesta;
}

// ============================================
// 📋 FUNCIONES PARA CLIENTES
// ============================================

export async function crearCliente(datos: {
    nombre_empresa: string;
    nombre_contacto: string;
    email: string;
    telefono?: string;
    industria?: string;
}) {
    const { data, error } = await supabase
        .from('clientes')
        .insert(datos)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function obtenerClientePorEmail(email: string) {
    const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('email', email)
        .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
}

// ============================================
// 📋 FUNCIONES PARA PROYECTOS
// ============================================

export async function crearProyecto(datos: {
    cliente_id: string;
    nombre: string;
    descripcion?: string;
    presupuesto?: number;
}) {
    const { data, error } = await supabase
        .from('proyectos')
        .insert(datos)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// ============================================
// 📋 FUNCIONES PARA BASE DE CONOCIMIENTO
// ============================================

export async function obtenerFAQs() {
    const { data, error } = await supabase
        .from('base_conocimiento')
        .select('*')
        .eq('categoria', 'faq')
        .eq('publicado', true)
        .order('creado_en', { ascending: false });

    if (error) throw error;
    return data;
}

// ============================================
// 📋 FUNCIONES PARA CALIFICACIONES
// ============================================

export async function guardarCalificacion(
    conversacionId: string,
    puntuacion: number,
    comentario?: string
) {
    const { data, error } = await supabase
        .from('calificaciones')
        .insert({ conversacion_id: conversacionId, puntuacion, comentario })
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function obtenerCalificaciones(conversacionId: string) {
    const { data, error } = await supabase
        .from('calificaciones')
        .select('*')
        .eq('conversacion_id', conversacionId)
        .order('creado_en', { ascending: false });

    if (error) throw error;
    return data;
}