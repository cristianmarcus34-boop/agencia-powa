'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogForm() {
    const router = useRouter();
    const [titulo, setTitulo] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Formulario funcionando! Título: ' + titulo);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Crear nuevo post (TEST)</h1>
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Escribí un título..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            />
            <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg"
            >
                Probar
            </button>
            <button
                type="button"
                onClick={() => router.push('/admin/blog')}
                className="ml-4 px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg"
            >
                Cancelar
            </button>
        </form>
    );
}