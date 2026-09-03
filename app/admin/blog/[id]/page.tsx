import { supabase } from '../../../lib/supabase'
import BlogForm from '@/components/BlogForm'
import { notFound } from 'next/navigation'
import styles from '../blog.module.css' // ✅ IMPORTAR ESTILOS

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
        <div className={styles.container}>
            <h1 className={styles.title}>✏️ Editar post</h1>
            <BlogForm post={post} isEditing />
        </div>
    )
}