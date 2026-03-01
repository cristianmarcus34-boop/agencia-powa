import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// 1. Estilos Globales Propios
import "./globals.css";

// 2. Estilos de Librerías
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// 3. Componentes
import { ToastContainer } from 'react-toastify';
import ChatPowa from "@/components/ChatPowa"; 
import NavbarPowa from "@/components/NavbarPowa";
import FooterPowa from "@/components/FooterPowa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Ayuda a que el texto sea visible mientras carga la fuente
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

// METADATA 100% OPTIMIZADA PARA SEO LOCAL (Quilmes, Florida, Solano)
export const metadata: Metadata = {
  title: {
    default: "Powa Digital | Agencia de Desarrollo Web en Quilmes",
    template: "%s | Powa Digital"
  },
  description: "Ingeniería de software y diseño web en Villa La Florida, San Francisco Solano y Quilmes. Expertos en Next.js, IA y soluciones tecnológicas de alto impacto en Zona Sur.",
  keywords: ["Desarrollo web Quilmes", "Software Villa La Florida", "Agencia Digital San Francisco Solano", "Programación Zona Sur", "Páginas Web Quilmes", "Next.js Argentina"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  verification: {
    google: "VvJGBIv8ZsOakwktbJC0PxehMBx4ZfTAxxZf_rSEreI",
  },
  // OpenGraph ayuda a que cuando compartas tu link en WhatsApp/LinkedIn se vea profesional
  openGraph: {
    title: "Powa Digital | Ingeniería de Software en Zona Sur",
    description: "Desarrollo de ecosistemas digitales en Quilmes, Solano y Florida.",
    url: "https://agencia-powa.vercel.app",
    siteName: "Powa Digital",
    locale: "es_AR",
    type: "website",
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
        <NavbarPowa />
        
        <main className="min-h-[80vh]">
          {children}
        </main>

        <ChatPowa />
        <FooterPowa />
        
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