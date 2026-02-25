// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',     // Se aplica a todos los buscadores (Google, Bing, etc.)
      allow: '/',         // Permite rastrear todo el sitio
      disallow: [
        '/private/',      // Ejemplo: carpetas que no quieres que salgan en Google
        '/admin/',
      ],
    },
    // Muy importante: Le indica a Google dónde está tu mapa del sitio
    sitemap: 'https://agencia-powa.vercel.app/sitemap.xml',
  }
}