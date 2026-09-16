// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // ✅ Solo verificar que haya token
    // El rol lo verificamos en el layout (admin/layout.tsx)
    // porque el middleware se ejecuta ANTES de que el token esté completamente cargado
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Solo requiere estar logueado
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/cliente/:path*',
  ],
};