import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// 1. Estilos Globales Propios (Prioridad para el motor de Next.js)
import "./globals.css";

// 2. Estilos de Librerías (Carga secundaria para evitar advertencias de preload)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// 3. Componentes
import { ToastContainer } from 'react-toastify';
import ChatPowa from "@/components/ChatPowa";
import NavbarPowa from "@/components/NavbarPowa";
import FooterPowa from "@/components/FooterPowa";

// Configuración de fuentes optimizada
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Evita bloqueos de renderizado
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', // Evita bloqueos de renderizado
});

export const metadata: Metadata = {
  title: "Powa Digital | Ingeniería de Software & Growth",
  description: "Desarrollo Full Stack, IA y soluciones tecnológicas de alto impacto.",
  icons: {
    icon: "/logo-agenciadigitalpowa-cuadrado.png",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navegación fija en la parte superior */}
        <NavbarPowa />
        
        {/* Contenedor principal con min-height optimizado */}
        <main className="min-h-[80vh]">
          {children}
        </main>

        {/* El "Bot" de Chat inteligente de Powa */}
        <ChatPowa />
        
        {/* Footer al final de todas las páginas */}
        <FooterPowa />
        
        {/* Notificaciones globales */}
        <ToastContainer 
          position="bottom-right" 
          theme="dark" 
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}