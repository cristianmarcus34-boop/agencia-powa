import BlogForm from '@/components/BlogForm'

export default function NuevoPostPage() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Crear nuevo post</h1>
            <BlogForm />
        </div>
    )
}