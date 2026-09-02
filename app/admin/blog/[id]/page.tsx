import { supabase } from '../../../lib/supabase'
import BlogForm from '@/components/BlogForm'
import { notFound } from 'next/navigation'

async function getPost(id: string) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return null
    return data
}

export default async function EditarPostPage({ params }: { params: { id: string } }) {
    const post = await getPost(params.id)

    if (!post) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Editar post</h1>
            <BlogForm post={post} isEditing />
        </div>
    )
}