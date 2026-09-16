'use client';

import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { FaUpload, FaTimes, FaImage, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';

interface ImageUploadProps {
    onUpload: (url: string) => void;
    currentImage?: string;
    folder?: string;
}

export default function ImageUpload({ onUpload, currentImage, folder = 'blog' }: ImageUploadProps) {
    const { data: session, status } = useSession();
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            setError('Solo se permiten imágenes PNG, JPG, WEBP o GIF');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('La imagen no puede superar los 10MB');
            return;
        }

        setError(null);
        setUploading(true);

        try {
            if (status === 'unauthenticated' || !session) {
                setError('No hay sesión activa. Iniciá sesión como administrador.');
                setUploading(false);
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Error al subir la imagen');
            }

            setPreview(result.url);
            onUpload(result.url);

        } catch (error: any) {
            console.error('❌ Error al subir imagen:', error);
            setError(error.message || 'Error al subir la imagen. Intentá de nuevo.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onUpload('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {/* Preview */}
            {preview && (
                <div style={{
                    position: 'relative',
                    width: '160px',
                    height: '160px',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    border: '2px solid #e5e7eb',
                }}>
                    <Image
                        src={preview}
                        alt="Previsualización"
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            padding: '4px',
                            background: '#ef4444',
                            color: '#ffffff',
                            borderRadius: '50%',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <FaTimes size={12} />
                    </button>
                </div>
            )}

            {/* Botón de subida */}
            <div
                onClick={handleClick}
                style={{
                    cursor: 'pointer',
                    border: `2px dashed ${preview ? '#4ade80' : '#d1d5db'}`,
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    textAlign: 'center',
                    backgroundColor: preview ? '#f0fdf4' : 'transparent',
                    transition: 'all 0.2s',
                    opacity: uploading ? 0.5 : 1,
                    pointerEvents: uploading ? 'none' : 'auto',
                }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    style={{ display: 'none' }}
                    disabled={uploading}
                />

                {uploading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#6b7280' }}>
                        <FaSpinner className="animate-spin" />
                        <span>Subiendo imagen...</span>
                    </div>
                ) : preview ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#16a34a' }}>
                        <FaImage size={24} />
                        <span>Imagen cargada</span>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#9ca3af' }}>
                        <FaUpload size={24} />
                        <span>Hacé clic para subir una imagen</span>
                    </div>
                )}
            </div>

            {/* Error */}
            {error && (
                <p style={{ fontSize: '0.875rem', color: '#ef4444' }}>{error}</p>
            )}

            {/* Instrucciones */}
            <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                Formatos: PNG, JPG, WEBP, GIF • Máximo 10MB
            </p>
        </div>
    );
}