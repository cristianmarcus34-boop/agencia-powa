// lib/supabase/admin.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createAdminClient = () => {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                async get(name: string) {
                    return (await cookieStore).get(name)?.value;
                },
                async set(name: string, value: string, options: any) {
                    try {
                        (await cookieStore).set({ name, value, ...options });
                    } catch (error) {
                        // Handle cookies in Server Components
                    }
                },
                async remove(name: string, options: any) {
                    try {
                        (await cookieStore).set({ name, value: '', ...options });
                    } catch (error) {
                        // Handle cookies in Server Components
                    }
                },
            },
        }
    );
};