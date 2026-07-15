// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "./supabase";

declare module "next-auth" {
  interface User {
    id: string;
    rol: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      rol: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        console.log('========================================');
        console.log('🔍 INTENTANDO LOGIN CON SUPABASE AUTH');
        console.log('📧 Email:', credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Faltan credenciales');
          return null;
        }

        try {
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (authError || !authData.user) {
            console.log('❌ Error de autenticación en Supabase:', authError);
            return null;
          }

          console.log('✅ Autenticación exitosa en Supabase');
          console.log('👤 User ID:', authData.user.id);

          const { data: usuario, error: usuarioError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('id', authData.user.id)
            .single();

          if (usuarioError || !usuario) {
            console.log('❌ Usuario no encontrado en tabla usuarios');
            console.log('Error:', usuarioError);
            return null;
          }

          console.log('✅ Usuario encontrado en tabla usuarios');
          console.log('📦 Rol:', usuario.rol);
          console.log('📦 Nombre:', usuario.nombre_completo);

          return {
            id: authData.user.id,
            email: authData.user.email,
            name: usuario.nombre_completo,
            rol: usuario.rol,
          };

        } catch (error) {
          console.log('❌ Error:', error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.rol = user.rol;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.rol = token.rol as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',  // ← 🔥 AGREGAR ESTA LÍNEA
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};