// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Si no hay token, redirigir al login
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Verificar roles
    const rol = token.rol as string;

    // Rutas de admin
    if (path.startsWith('/admin') && rol !== 'admin') {
      return NextResponse.redirect(new URL('/cliente', req.url));
    }

    // Rutas de cliente
    if (path.startsWith('/cliente') && rol === 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/cliente/:path*',
  ],
};