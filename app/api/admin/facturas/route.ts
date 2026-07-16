import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id || session.user.rol !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'No autorizado' },
                { status: 401 }
            );
        }

        const { data: facturas, error } = await supabase
            .from('facturas')
            .select(`
        *,
        clientes (
          id,
          nombre_empresa,
          nombre_contacto,
          email
        )
      `)
            .order('fecha_emision', { ascending: false });

        if (error) {
            console.error('Error al obtener facturas:', error);
            return NextResponse.json(
                { success: false, error: 'Error al obtener facturas' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data: facturas });
    } catch (error) {
        console.error('Error en API:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id || session.user.rol !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'No autorizado' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const {
            cliente_id,
            numero_factura,
            fecha_emision,
            fecha_vencimiento,
            subtotal,
            tasa_impuesto,
            monto_impuesto,
            total,
            estado,
            notas
        } = body;

        if (!cliente_id || !numero_factura) {
            return NextResponse.json(
                { success: false, error: 'Faltan datos requeridos' },
                { status: 400 }
            );
        }

        const { data: factura, error } = await supabase
            .from('facturas')
            .insert({
                cliente_id,
                numero_factura,
                fecha_emision: fecha_emision || null,
                fecha_vencimiento: fecha_vencimiento || null,
                subtotal: subtotal || 0,
                tasa_impuesto: tasa_impuesto || 0,
                monto_impuesto: monto_impuesto || 0,
                total: total || 0,
                estado: estado || 'pendiente',
                notas: notas || null,
                creado_en: new Date().toISOString(),
                actualizado_en: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error('Error al crear factura:', error);
            return NextResponse.json(
                { success: false, error: 'Error al crear factura: ' + error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: factura,
            message: 'Factura creada correctamente'
        });
    } catch (error) {
        console.error('Error en API:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}