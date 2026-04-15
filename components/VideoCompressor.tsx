"use client";

import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { Button, ProgressBar, Alert } from 'react-bootstrap';
import { FaVideo, FaDownload, FaBolt, FaFileVideo } from 'react-icons/fa';

export default function VideoCompressor() {
    const [loaded, setLoaded] = useState(false);
    const [compressing, setCompressing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [originalName, setOriginalName] = useState("");
    const ffmpegRef = useRef(new FFmpeg());

    const loadFFmpeg = async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        const ffmpeg = ffmpegRef.current;

        ffmpeg.on('log', ({ message }) => {
            console.log(message);
        });

        ffmpeg.on('progress', ({ progress }) => {
            setProgress(Math.round(progress * 100));
        });

        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        setLoaded(true);
    };

    const compressVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Guardamos el nombre original para el archivo de salida
        const fileName = file.name.split('.').slice(0, -1).join('.');
        setOriginalName(fileName);

        if (!loaded) await loadFFmpeg();

        setCompressing(true);
        const ffmpeg = ffmpegRef.current;
        
        // Detectamos la extensión original para que FFmpeg sepa qué está leyendo
        const inputExt = file.name.split('.').pop() || 'mp4';
        const inputName = `input.${inputExt}`;
        const outputName = 'output.mp4';

        await ffmpeg.writeFile(inputName, await fetchFile(file));

        // COMANDO PRO: 
        // -i: input
        // -vcodec libx264: El estándar más compatible
        // -crf 28: Calidad constante (23 es alta, 28 es el dulce punto entre peso y calidad)
        // -preset faster: Para que en el navegador no tarde una eternidad
        // -movflags +faststart: Optimiza el mp4 para streaming web inmediato
        await ffmpeg.exec([
            '-i', inputName, 
            '-vcodec', 'libx264', 
            '-crf', '28', 
            '-preset', 'faster', 
            '-movflags', '+faststart',
            outputName
        ]);

        const data = await ffmpeg.readFile(outputName);
        const url = URL.createObjectURL(new Blob([(data as any).buffer], { type: 'video/mp4' }));

        setVideoUrl(url);
        setCompressing(false);
        setProgress(0);
    };

    return (
        <div className="p-3 border rounded-4 bg-dark/50 border-white/5">
            {!compressing && !videoUrl && (
                <div className="text-center py-4">
                    <FaFileVideo className="mb-3 opacity-20" size={40} />
                    <h5 className="text-white mb-3">Compresor Multi-Formato</h5>
                    <p className="small text-white/50 mb-4">Soporta MP4, MOV, AVI, WEBM y MKV</p>
                    
                    <input
                        type="file"
                        // Aceptamos de todo para que sea Pro
                        accept="video/mp4,video/quicktime,video/x-msvideo,video/x-matroska,video/webm"
                        onChange={compressVideo}
                        id="video-upload"
                        hidden
                    />
                    
                    <label htmlFor="video-upload" className="btn btn-primary px-5 py-2 rounded-pill shadow-lg border-0">
                        <FaBolt className="me-2" /> Seleccionar Video
                    </label>
                    
                    <div className="mt-4 d-flex justify-content-center gap-3 opacity-50">
                        <span className="badge border border-white/20 fw-light">MOV</span>
                        <span className="badge border border-white/20 fw-light">MP4</span>
                        <span className="badge border border-white/20 fw-light">AVI</span>
                    </div>
                </div>
            )}

            {compressing && (
                <div className="py-4 text-center">
                    <div className="mb-3 animate-pulse">
                        <span className="badge bg-info text-dark">Procesando con Powa Engine</span>
                    </div>
                    <div className="d-flex justify-content-between text-white small mb-2 px-2">
                        <span>Optimizando resolución y bitrate...</span>
                        <span className="fw-bold">{progress}%</span>
                    </div>
                    <ProgressBar now={progress} variant="info" className="bg-white/10" style={{ height: '10px', borderRadius: '20px' }} animated />
                    <p className="mt-4 small text-white/40 italic">
                        Esto puede tardar según el tamaño del video. <br />
                        Mantené la pestaña activa para mayor velocidad.
                    </p>
                </div>
            )}

            {videoUrl && (
                <Alert variant="success" className="bg-success/10 border-success/20 text-white text-center py-4">
                    <div className="mb-3">
                        <div className="bg-success d-inline-flex p-3 rounded-circle mb-3 shadow-lg">
                            <FaDownload size={25} className="text-white" />
                        </div>
                        <h5 className="fw-bold">¡Optimización Completa!</h5>
                        <p className="small opacity-75">Tu video ahora es un MP4 ultra-liviano.</p>
                    </div>

                    <Button
                        as="a"
                        href={videoUrl}
                        download={`powa_${originalName}.mp4`}
                        variant="success"
                        className="mt-2 px-5 py-2 rounded-pill fw-bold shadow-sm border-0"
                    >
                        Descargar Video
                    </Button>

                    <div className="mt-4 pt-3 border-top border-white/10">
                        <Button 
                            variant="link" 
                            size="sm" 
                            className="text-white/40 text-decoration-none" 
                            onClick={() => {
                                setVideoUrl(null);
                                setOriginalName("");
                            }}
                        >
                            ← Procesar otro archivo
                        </Button>
                    </div>
                </Alert>
            )}
        </div>
    );
}