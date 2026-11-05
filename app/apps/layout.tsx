// app/apps/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Apps Nativas Android en Quilmes | Powa Digital',
    description: 'Desarrollo de apps nativas Android para PYMES y empresas. Publicación en Google Play Store incluida. Desde $2.200.000 ARS. Cotizá tu app sin cargo en 24h.',
    keywords: [
        'apps android quilmes',
        'desarrollo apps android',
        'app nativa android',
        'google play store quilmes',
        'agencia apps android',
        'desarrollo mobile quilmes',
    ],
    openGraph: {
        title: 'Apps Nativas Android en Quilmes | Powa Digital',
        description: 'Desarrollo de apps nativas Android. Publicación en Google Play incluida. Desde $2.200.000 ARS.',
        url: 'https://www.agenciadigitalpowa.com.ar/apps',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Apps Nativas Android en Quilmes | Powa Digital',
        description: 'Desarrollo de apps nativas Android. Publicación en Google Play incluida.',
    },
    alternates: {
        canonical: 'https://www.agenciadigitalpowa.com.ar/apps',
    },
};

export default function AppsLayout({ children }: { children: React.ReactNode }) {
    return children;
}