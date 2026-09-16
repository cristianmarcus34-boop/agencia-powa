'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NavbarPowa from '@/components/NavbarPowa';
import FooterPowa from '@/components/FooterPowa';
import ChatPowa from '@/components/ChatPowa';
import LoadingScreen from '@/components/LoadingScreen';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [navbarHeight, setNavbarHeight] = useState(80);
    const [isMounted, setIsMounted] = useState(false);

    // 🔥 RUTAS DONDE SE OCULTA EL NAVBAR Y FOOTER
    const hideNavbar =
        pathname?.startsWith('/login') ||
        pathname?.startsWith('/logout') ||
        pathname?.startsWith('/admin') ||
        pathname?.startsWith('/cliente');

    const showNavbar = !hideNavbar;

    // 🔥 Medir la altura del navbar
    useEffect(() => {
        setIsMounted(true);

        if (showNavbar) {
            const updateHeight = () => {
                const navbar =
                    document.querySelector('.navbar-fixed-top') ||
                    document.querySelector('nav.navbar');
                if (navbar) {
                    const height = navbar.getBoundingClientRect().height;
                    setNavbarHeight(height);
                } else {
                    setNavbarHeight(80);
                }
            };

            const timeoutId = setTimeout(updateHeight, 100);
            window.addEventListener('resize', updateHeight);

            return () => {
                clearTimeout(timeoutId);
                window.removeEventListener('resize', updateHeight);
            };
        }
    }, [showNavbar]);

    useEffect(() => {
        if (showNavbar && isMounted) {
            const navbar =
                document.querySelector('.navbar-fixed-top') ||
                document.querySelector('nav.navbar');
            if (navbar) {
                setNavbarHeight(navbar.getBoundingClientRect().height);
            }
        }
    }, [pathname, showNavbar, isMounted]);

    return (
        <>
            <LoadingScreen />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebSite',
                        name: 'Powa Digital',
                        url: 'https://www.agenciadigitalpowa.com.ar',
                    }),
                }}
            />

            {showNavbar && <NavbarPowa />}

            <main
                className={showNavbar ? 'min-h-[80vh]' : 'min-h-screen'}
                style={showNavbar ? { paddingTop: `${navbarHeight}px` } : {}}
            >
                {children}
            </main>

            {showNavbar && <ChatPowa />}
            {showNavbar && <FooterPowa />}

            <ToastContainer
                position="bottom-right"
                theme="dark"
                autoClose={4000}
                hideProgressBar={false}
                closeOnClick
            />

            <Analytics />
            <SpeedInsights />
        </>
    );
}