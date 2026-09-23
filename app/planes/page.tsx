import React from 'react';
import PlanesGrid from './PlanesGrid';

// ============================================================
// CONSULTA DEL DÓLAR (server-side, con fallback)
// ============================================================
interface DolarData {
    rate: number;
    updatedAt: string;
    source: 'api' | 'fallback';
}

async function getDolarData(): Promise<DolarData> {
    try {
        const res = await fetch('https://dolarapi.com/v1/dolares/blue', {
            next: { revalidate: 3600 } // se actualiza cada 1 hora
        });

        if (!res.ok) throw new Error('Error consultando dólar');

        const data = await res.json();
        const venta = data?.venta;
        const fecha = data?.fechaActualizacion;

        if (typeof venta !== 'number' || venta <= 0) {
            throw new Error('Cotización inválida');
        }

        return {
            rate: venta,
            updatedAt: fecha || new Date().toISOString(),
            source: 'api',
        };
    } catch (error) {
        console.error('⚠️ No se pudo obtener la cotización del dólar:', error);

        const fallback = Number(process.env.DOLAR_FALLBACK) || 1800;

        return {
            rate: fallback,
            updatedAt: new Date().toISOString(),
            source: 'fallback',
        };
    }
}

export default async function PlanesPage() {
    const dolar = await getDolarData();

    return (
        <PlanesGrid
            usdToArs={dolar.rate}
            dolarUpdatedAt={dolar.updatedAt}
            dolarSource={dolar.source}
        />
    );
}