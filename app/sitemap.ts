import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 86400; // 24 horas

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.agenciadigitalpowa.com.ar';
  const currentDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    // Páginas principales (prioridad alta)
    { url: `${baseUrl}/`, lastModified: currentDate, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/servicios`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },

    // Páginas de servicios (prioridad alta)
    { url: `${baseUrl}/apps`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 }, // 👈 NUEVO

    // Páginas secundarias
    { url: `${baseUrl}/planes`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/planes/servicios/desarrollo`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },

    // Herramientas (no indexables pero útiles)
    { url: `${baseUrl}/lab`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.4 },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data } = await supabase
        .from('posts')
        .select('slug, updated_at, created_at')
        .eq('publicado', true)
        .order('created_at', { ascending: false });

      if (data) {
        postRoutes = data.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || post.created_at),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }));
      }
    }
  } catch (error) {
    console.error('Error generando sitemap de posts:', error);
  }

  return [...staticRoutes, ...postRoutes];
}