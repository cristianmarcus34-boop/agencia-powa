import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// 1. Estilos Globales Propios
import "./globals.css";

// 2. Estilos de Librerías
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// 3. Componentes
import { ToastContainer } from 'react-toastify';
import ChatPowa from "@/components/ChatPowa"; // Asegúrate de que la ruta sea correcta
import NavbarPowa from "@/components/NavbarPowa";
import FooterPowa from "@/components/FooterPowa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

// METADATA ACTUALIZADA CON EL NUEVO FAVICON
export const metadata: Metadata = {
  title: "Powa Digital | Ingeniería de Software & Growth",
  description: "Desarrollo Full Stack, IA y soluciones tecnológicas de alto impacto.",
  icons: {
    icon: "/favicon.ico", // El archivo que pusiste en public
    shortcut: "/favicon.ico",
    apple: "/favicon.ico", // Para que se vea bien en dispositivos móviles
  },
  verification: {
    google: "VvJGBIv8ZsOakwktbJC0PxehMBx4ZfTAxxZf_rSEreI",
  },
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
        
        {/* Contenedor principal */}
        <main className="min-h-[80vh]">
          {children}
        </main>

        {/* El "Bot" de Chat inteligente de Powa con sonido y robot */}
        <ChatPowa />
        
        {/* Footer al final */}
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