// proxy.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================
// 🔐 NextAuth
// ============================================
const authMiddleware = withAuth(
  function proxy(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

// ============================================
// 📊 PostHog reverse proxy
// ============================================
// Ruta "camuflada" que los ad blockers no reconocen.
// NO usar /analytics, /tracking, /posthog, /stats
const POSTHOG_PROXY_PATH = "/ingest";
const POSTHOG_HOST = "us.i.posthog.com"; // cambialo a eu.i.posthog.com si elegiste EU

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔹 Si es una petición de PostHog → la redirigimos al servidor real
  if (pathname.startsWith(POSTHOG_PROXY_PATH)) {
    const url = req.nextUrl.clone();
    url.pathname = url.pathname.replace(POSTHOG_PROXY_PATH, "");
    url.hostname = POSTHOG_HOST;
    url.protocol = "https:";
    url.port = "";

    const requestHeaders = new Headers(req.headers);
    requestHeaders.delete("cookie");
    requestHeaders.delete("authorization");

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 🔹 Si es /admin o /cliente → NextAuth
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/cliente")
  ) {
    // @ts-expect-error - withAuth devuelve una función compatible
    return authMiddleware(req);
  }

  // 🔹 Resto → pasa normal
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/cliente/:path*",
    "/ingest/:path*", // 👈 ruta del proxy PostHog
  ],
};