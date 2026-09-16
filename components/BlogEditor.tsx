'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {
    Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon,
    Heading2, Heading3, Quote, Undo, Redo, Code, Smile, Upload
} from 'lucide-react';
import { useRef, useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface BlogEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function BlogEditor({ content, onChange }: BlogEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [uploading, setUploading] = useState(false);

    const editor = useEditor({
        extensions: [
            // ✅ StarterKit SIN Link (para evitar duplicado)
            StarterKit.configure({
                link: false,
            }),
            Image,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content,
        immediatelyRender: false, // ✅ Evitar hydration mismatch
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    // ============================================
    // 📤 SUBIR IMAGEN DESDE ARCHIVO
    // ============================================
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            alert('Solo se permiten imágenes PNG, JPG, WEBP o GIF');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert('La imagen no puede superar los 10MB');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'blog/content');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Error al subir la imagen');
            }

            editor.chain().focus().setImage({ src: result.url }).run();

        } catch (error: any) {
            console.error('❌ Error al subir imagen:', error);
            alert(error.message || 'Error al subir la imagen');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    // ============================================
    // 😀 INSERTAR EMOJI
    // ============================================
    const handleEmojiClick = (emojiData: EmojiClickData) => {
        editor.chain().focus().insertContent(emojiData.emoji).run();
        setShowEmojiPicker(false);
    };

    return (
        <div style={{ border: '1px solid #d1d5db', borderRadius: '0.5rem', overflow: 'visible', position: 'relative' }}>
            {/* Toolbar */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.25rem',
                padding: '0.5rem',
                background: '#f9fafb',
                borderBottom: '1px solid #e5e7eb',
                position: 'relative',
            }}>
                {/* Negrita */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: editor.isActive('bold') ? '#e5e7eb' : 'transparent',
                        cursor: 'pointer',
                        color: '#374151',
                    }}
                    title="Negrita"
                >
                    <Bold size={16} />
                </button>

                {/* Cursiva */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: editor.isActive('italic') ? '#e5e7eb' : 'transparent',
                        cursor: 'pointer',
                        color: '#374151',
                    }}
                    title="Cursiva"
                >
                    <Italic size={16} />
                </button>

                {/* Título H2 */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: editor.isActive('heading', { level: 2 }) ? '#e5e7eb' : 'transparent',
                        cursor: 'pointer',
                        color: '#374151',
                    }}
                    title="Título"
                >
                    <Heading2 size={16} />
                </button>

                {/* Subtítulo H3 */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: editor.isActive('heading', { level: 3 }) ? '#e5e7eb' : 'transparent',
                        cursor: 'pointer',
                        color: '#374151',
                    }}
                    title="Subtítulo"
                >
                    <Heading3 size={16} />
                </button>

                {/* Lista con viñetas */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: editor.isActive('bulletList') ? '#e5e7eb' : 'transparent',
                        cursor: 'pointer',
                        color: '#374151',
                    }}
                    title="Lista"
                >
                    <List size={16} />
                </button>

                {/* Lista numerada */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: editor.isActive('orderedList') ? '#e5e7eb' : 'transparent',
                        cursor: 'pointer',
                        color: '#374151',
                    }}
                    title="Lista numerada"
                >
                    <ListOrdered size={16} />
                </button>

                {/* Cita */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: editor.isActive('blockquote') ? '#e5e7eb' : 'transparent',
                        cursor: 'pointer',
                        color: '#374151',
                    }}
                    title="Cita"
                >
                    <Quote size={16} />
                </button>

                {/* Código */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: editor.isActive('codeBlock') ? '#e5e7eb' : 'transparent',
                        cursor: 'pointer',
                        color: '#374151',
                    }}
                    title="Código"
                >
                    <Code size={16} />
                </button>

                {/* Separador */}
                <div style={{ width: '1px', background: '#e5e7eb', margin: '0 0.25rem' }} />

                {/* Enlace */}
                <button
                    type="button"
                    onClick={() => {
                        const url = prompt('URL del enlace:');
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run();
                        }
                    }}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: editor.isActive('link') ? '#e5e7eb' : 'transparent',
                        cursor: 'pointer',
                        color: '#374151',
                    }}
                    title="Enlace"
                >
                    <LinkIcon size={16} />
                </button>

                {/* Subir imagen desde archivo */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: 'transparent',
                        cursor: uploading ? 'not-allowed' : 'pointer',
                        color: uploading ? '#9ca3af' : '#374151',
                    }}
                    title="Subir imagen"
                >
                    {uploading ? (
                        <span style={{ fontSize: '12px' }}>Subiendo...</span>
                    ) : (
                        <Upload size={16} />
                    )}
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    style={{ display: 'none' }}
                />

                {/* Insertar imagen por URL */}
                <button
                    type="button"
                    onClick={() => {
                        const url = prompt('URL de la imagen:');
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run();
                        }
                    }}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        color: '#374151',
                    }}
                    title="Insertar imagen por URL"
                >
                    <ImageIcon size={16} />
                </button>

                {/* Selector de emojis */}
                <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: showEmojiPicker ? '#e5e7eb' : 'transparent',
                        cursor: 'pointer',
                        color: '#374151',
                    }}
                    title="Emojis"
                >
                    <Smile size={16} />
                </button>

                {/* Separador */}
                <div style={{ width: '1px', background: '#e5e7eb', margin: '0 0.25rem' }} />

                {/* Deshacer */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        color: '#374151',
                    }}
                    title="Deshacer"
                >
                    <Undo size={16} />
                </button>

                {/* Rehacer */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        color: '#374151',
                    }}
                    title="Rehacer"
                >
                    <Redo size={16} />
                </button>

                {/* Panel de emojis */}
                {showEmojiPicker && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        marginTop: '0.5rem',
                        zIndex: 50,
                    }}>
                        <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            searchPlaceHolder="Buscar emoji..."
                            width={350}
                            height={400}
                            previewConfig={{ showPreview: false }}
                        />
                    </div>
                )}
            </div>

            {/* Editor con estilos forzados */}
            <div
                className="tiptap-editor-wrapper"
                style={{
                    padding: '1rem',
                    minHeight: '300px',
                    color: '#111827',
                    backgroundColor: '#ffffff',
                }}
            >
                <EditorContent
                    editor={editor}
                    style={{
                        color: '#111827',
                        fontSize: '1rem',
                        lineHeight: '1.6',
                    }}
                />
            </div>

            {/* Estilos globales para el editor */}
            <style jsx global>{`
                .tiptap-editor-wrapper .tiptap {
                    color: #111827 !important;
                    outline: none;
                }
                .tiptap-editor-wrapper .tiptap p {
                    color: #111827 !important;
                    margin-bottom: 1rem;
                }
                .tiptap-editor-wrapper .tiptap h2 {
                    color: #111827 !important;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                }
                .tiptap-editor-wrapper .tiptap h3 {
                    color: #111827 !important;
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-top: 1.25rem;
                    margin-bottom: 0.5rem;
                }
                .tiptap-editor-wrapper .tiptap ul {
                    color: #111827 !important;
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin-bottom: 1rem;
                }
                .tiptap-editor-wrapper .tiptap ol {
                    color: #111827 !important;
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin-bottom: 1rem;
                }
                .tiptap-editor-wrapper .tiptap li {
                    color: #111827 !important;
                    margin-bottom: 0.25rem;
                }
                .tiptap-editor-wrapper .tiptap blockquote {
                    border-left: 4px solid #f97316;
                    padding-left: 1rem;
                    color: #4b5563 !important;
                    font-style: italic;
                    margin: 1rem 0;
                }
                .tiptap-editor-wrapper .tiptap pre {
                    background: #1f2937;
                    color: #f9fafb;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    font-family: monospace;
                    margin: 1rem 0;
                }
                .tiptap-editor-wrapper .tiptap a {
                    color: #f97316;
                    text-decoration: underline;
                }
                .tiptap-editor-wrapper .tiptap strong {
                    color: #111827 !important;
                    font-weight: 700;
                }
                .tiptap-editor-wrapper .tiptap em {
                    color: #111827 !important;
                    font-style: italic;
                }
                .tiptap-editor-wrapper .tiptap img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }
                .tiptap-editor-wrapper .tiptap p.is-editor-empty:first-child::before {
                    color: #9ca3af;
                    content: attr(data-placeholder);
                    float: left;
                    height: 0;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}