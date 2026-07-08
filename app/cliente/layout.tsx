// app/cliente/layout.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';

function ClienteLayoutContent({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div style={{ color: '#fff', padding: '40px', textAlign: 'center' }}>Cargando...</div>;
    }

    return (
        <div style={{ padding: '40px', color: '#fff', minHeight: '100vh', background: '#0a0f1a' }}>
            <h1>Panel del Cliente</h1>
            <p>Bienvenido, {session?.user?.name}</p>
            {children}
        </div>
    );
}

export default function ClienteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <ClienteLayoutContent>{children}</ClienteLayoutContent>
        </SessionProvider>
    );
}