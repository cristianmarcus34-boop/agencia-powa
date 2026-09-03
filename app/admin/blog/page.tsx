'use client';

import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error) setPosts(data || []);
            setLoading(false);
        }
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('¿Eliminar este post?')) {
            await supabase.from('posts').delete().eq('id', id);
            setPosts(posts.filter(p => p.id !== id));
        }
    };

    if (loading) return <div className="p-6 text-center text-gray-400">Cargando...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Blog</h1>
                <Link
                    href="/admin/blog/nuevo"
                    className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
                >
                    + Nuevo Post
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    No hay posts aún. <Link href="/admin/blog/nuevo" className="text-orange-500 hover:underline">Creá el primero</Link>
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{post.titulo}</div>
                                        <div className="text-sm text-gray-500">/{post.slug}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${post.publicado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {post.publicado ? 'Publicado' : 'Borrador'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(post.created_at).toLocaleDateString('es-AR')}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link href={`/blog/${post.slug}`} target="_blank" className="inline-flex p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                            <Eye size={18} />
                                        </Link>
                                        <Link href={`/admin/blog/${post.id}`} className="inline-flex p-2 text-blue-400 hover:text-blue-600 transition-colors">
                                            <Pencil size={18} />
                                        </Link>
                                        <button className="inline-flex p-2 text-red-400 hover:text-red-600 transition-colors" onClick={() => handleDelete(post.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}