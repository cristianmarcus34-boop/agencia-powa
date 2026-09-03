'use client';

import { useState, useRef } from 'react';
import { supabase } from '../app/lib/supabase';
import { FaUpload, FaTimes, FaImage, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';

interface ImageUploadProps {
    onUpload: (url: string) => void;
    currentImage?: string;
    folder?: string;
}

export default function ImageUpload({ onUpload, currentImage, folder = 'blog' }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar tipo
        const validTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            setError('Solo se permiten imágenes PNG, JPG, WEBP o GIF');
            return;
        }

        // Validar tamaño (10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('La imagen no puede superar los 10MB');
            return;
        }

        setError(null);
        setUploading(true);

        try {
            // Generar nombre único
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `${folder}/${fileName}`;

            console.log('📤 Subiendo imagen a:', filePath);

            // Subir a Supabase
            const { data, error: uploadError } = await supabase.storage
                .from('blog-images')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (uploadError) {
                console.error('❌ Error de upload:', uploadError);
                throw uploadError;
            }

            console.log('✅ Datos de upload:', data);

            // Obtener URL pública
            const { data: publicUrl } = supabase.storage
                .from('blog-images')
                .getPublicUrl(filePath);

            const imageUrl = publicUrl.publicUrl;
            console.log('✅ URL pública:', imageUrl);

            // Actualizar preview
            setPreview(imageUrl);
            onUpload(imageUrl);

        } catch (error: any) {
            console.error('❌ Error al subir imagen:', error);

            // Mostrar mensaje más específico
            if (error.message?.includes('row-level security')) {
                setError('Error de permisos. Asegurate de haber iniciado sesión como administrador.');
            } else if (error.message?.includes('bucket')) {
                setError('Error: El bucket "blog-images" no existe o no es público.');
            } else {
                setError('Error al subir la imagen. Intentá de nuevo.');
            }
        } finally {
            setUploading(false);
            // Limpiar input
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
        <div className="space-y-2">
            {/* Preview */}
            {preview && (
                <div className="relative w-40 h-40 rounded-lg overflow-hidden border-2 border-gray-200">
                    <Image
                        src={preview}
                        alt="Previsualización"
                        fill
                        className="object-cover"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                        <FaTimes size={12} />
                    </button>
                </div>
            )}

            {/* Botón de subida */}
            <div
                onClick={handleClick}
                className={`cursor-pointer border-2 border-dashed rounded-lg p-6 text-center transition-colors ${preview ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-orange-400'
                    } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    className="hidden"
                    disabled={uploading}
                />

                {uploading ? (
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                        <FaSpinner className="animate-spin" />
                        <span>Subiendo imagen...</span>
                    </div>
                ) : preview ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                        <FaImage size={24} />
                        <span>Imagen cargada</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                        <FaUpload size={24} />
                        <span>Hacé clic para subir una imagen</span>
                    </div>
                )}
            </div>

            {/* Error */}
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            {/* Instrucciones */}
            <p className="text-xs text-gray-400">
                Formatos: PNG, JPG, WEBP, GIF • Máximo 10MB
            </p>
        </div>
    );
}