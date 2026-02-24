import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// 1. Estilos de Librerías
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// 2. Estilos Globales Propios
import "./globals.css";

// 3. Componentes
import { ToastContainer } from 'react-toastify';
import ChatPowa from "@/components/ChatPowa";
import NavbarPowa from "@/components/NavbarPowa";
import FooterPowa from "@/components/FooterPowa"; // Importamos el nuevo Footer

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Powa Digital | Ingeniería de Software & Growth",
  description: "Desarrollo Full Stack, IA y soluciones tecnológicas de alto impacto.",
  icons: {
    icon: "/logo-agenciadigitalpowa-cuadrado.png", // Asegúrate de que el favicon apunte a tu logo
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navegación fija en la parte superior */}
        <NavbarPowa />
        
        {/* Contenedor principal: 
            Le damos un min-height para que el footer no flote en pantallas muy altas 
        */}
        <main style={{ minHeight: '80vh' }}>
          {children}
        </main>

        {/* El "Bot" de Chat siempre visible */}
        <ChatPowa />
        
        {/* Footer al final de todas las páginas */}
        <FooterPowa />
        
        {/* Notificaciones globales */}
        <ToastContainer 
          position="bottom-right" 
          theme="dark" 
          autoClose={4000}
        />
      </body>
    </html>
  );
}