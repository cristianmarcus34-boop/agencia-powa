import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
    try {
        console.log('🔍 ===== API /cliente/facturas =====');

        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            console.log('❌ No autorizado');
            return NextResponse.json(
                { success: false, error: 'No autorizado' },
                { status: 401 }
            );
        }

        console.log('📝 Usuario ID:', session.user.id);

        // 🔥 Obtener el cliente asociado al usuario
        const { data: cliente, error: clienteError } = await supabase
            .from('clientes')
            .select('id')
            .eq('usuario_id', session.user.id)
            .single();

        if (clienteError || !cliente) {
            console.log('❌ Cliente no encontrado:', clienteError);
            return NextResponse.json({
                success: true,
                data: [],
                message: 'No hay cliente asociado a este usuario'
            });
        }

        console.log('✅ Cliente ID:', cliente.id);

        // 🔥 Obtener facturas del cliente (sin relación con proyectos)
        const { data: facturas, error } = await supabase
            .from('facturas')
            .select('*')
            .eq('cliente_id', cliente.id)
            .order('fecha_emision', { ascending: false });

        if (error) {
            console.error('❌ Error al obtener facturas:', error);
            return NextResponse.json({
                success: true,
                data: [],
                message: 'Error al obtener facturas'
            });
        }

        // 🔥 Formatear los datos para el frontend
        const facturasFormateadas = facturas?.map((f: any) => ({
            id: f.id,
            numero: f.numero_factura,           // ✅ Mapeo correcto
            monto: f.total || f.subtotal || 0,   // ✅ Usar total o subtotal
            estado: f.estado || 'pendiente',
            fecha_emision: f.fecha_emision,
            fecha_vencimiento: f.fecha_vencimiento,
            proyecto_nombre: 'Sin proyecto',     // ✅ No hay relación con proyectos
            subtotal: f.subtotal,
            tasa_impuesto: f.tasa_impuesto,
            monto_impuesto: f.monto_impuesto,
            total: f.total,
            fecha_pago: f.fecha_pago,
            notas: f.notas
        })) || [];

        console.log(`✅ ${facturasFormateadas.length} facturas encontradas`);
        return NextResponse.json({
            success: true,
            data: facturasFormateadas
        });

    } catch (error) {
        console.error('❌ Error en API:', error);
        return NextResponse.json({
            success: true,
            data: [],
            message: 'Error interno del servidor'
        });
    }
}