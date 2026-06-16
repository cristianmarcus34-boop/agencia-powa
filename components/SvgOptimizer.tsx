'use client';

import React, { useState } from 'react';
import { FaFileUpload, FaDownload, FaTrash, FaCheckCircle, FaCode } from 'react-icons/fa';
import styles from '../app/lab/lab.module.css'; // ✅ Ruta corregida

export default function SvgOptimizer() {
    const [svgInput, setSvgInput] = useState('');
    const [svgOutput, setSvgOutput] = useState('');
    const [isOptimized, setIsOptimized] = useState(false);
    const [originalSize, setOriginalSize] = useState(0);
    const [optimizedSize, setOptimizedSize] = useState(0);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setSvgInput(content);
            setOriginalSize(new Blob([content]).size);
            setIsOptimized(false);
            setSvgOutput('');
        };
        reader.readAsText(file);
    };

    const handlePaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value;
        setSvgInput(content);
        setOriginalSize(new Blob([content]).size);
        setIsOptimized(false);
        setSvgOutput('');
    };

    const optimizeSvg = () => {
        if (!svgInput) return;

        let optimized = svgInput
            .replace(/<!--[\s\S]*?-->/g, '')
            .replace(/>\s+</g, '><')
            .replace(/\s+[a-zA-Z-]+=["']\s*["']/g, '')
            .replace(/version="1\.1"/g, '')
            .replace(/fill="[^"]+"/g, (match) => {
                if (match.includes('#000000') || match.includes('black')) return 'fill="currentColor"';
                return match;
            })
            .replace(/<metadata[\s\S]*?<\/metadata>/g, '')
            .trim();

        setSvgOutput(optimized);
        setOptimizedSize(new Blob([optimized]).size);
        setIsOptimized(true);
    };

    const handleDownload = () => {
        if (!svgOutput) return;
        const blob = new Blob([svgOutput], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'optimized.svg';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleReset = () => {
        setSvgInput('');
        setSvgOutput('');
        setIsOptimized(false);
        setOriginalSize(0);
        setOptimizedSize(0);
    };

    const savings = originalSize > 0 && optimizedSize > 0
        ? Math.round((1 - optimizedSize / originalSize) * 100)
        : 0;

    return (
        <div className={styles.toolContainer}>
            <div className={styles.toolGrid}>
                <div className={styles.toolSection}>
                    <div className={styles.toolSectionHeader}>
                        <FaCode className={styles.toolSectionIcon} />
                        <h4>SVG Original</h4>
                    </div>

                    <div className={styles.uploadArea}>
                        <label className={styles.uploadButton}>
                            <FaFileUpload />
                            <span>Cargar SVG</span>
                            <input
                                type="file"
                                accept=".svg,image/svg+xml"
                                onChange={handleFileUpload}
                                className={styles.fileInput}
                            />
                        </label>
                        <span className={styles.uploadOr}>o</span>
                        <textarea
                            className={styles.codeEditor}
                            placeholder="Pega tu código SVG aquí..."
                            value={svgInput}
                            onChange={handlePaste}
                            rows={8}
                        />
                        {originalSize > 0 && (
                            <div className={styles.sizeInfo}>
                                Tamaño: {(originalSize / 1024).toFixed(1)} KB
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.toolSection}>
                    <div className={styles.toolSectionHeader}>
                        <FaCheckCircle className={styles.toolSectionIcon} />
                        <h4>SVG Optimizado</h4>
                        {isOptimized && (
                            <span className={styles.optimizedBadge}>
                                <FaCheckCircle /> Optimizado
                            </span>
                        )}
                    </div>

                    <div className={styles.uploadArea}>
                        <textarea
                            className={styles.codeEditor}
                            placeholder="El SVG optimizado aparecerá aquí..."
                            value={svgOutput}
                            readOnly
                            rows={8}
                        />

                        {isOptimized && (
                            <>
                                <div className={styles.statsRow}>
                                    <span className={styles.sizeInfo}>
                                        Tamaño: {(optimizedSize / 1024).toFixed(1)} KB
                                    </span>
                                    <span className={styles.savingBadge}>
                                        Ahorro: {savings}%
                                    </span>
                                </div>
                                <div className={styles.actionRow}>
                                    <button onClick={handleDownload} className={styles.btnPowaPrimarySmall}>
                                        <FaDownload /> Descargar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.toolActions}>
                <button
                    onClick={optimizeSvg}
                    className={styles.btnPowaPrimary}
                    disabled={!svgInput}
                >
                    Optimizar SVG
                </button>
                <button
                    onClick={handleReset}
                    className={styles.btnPowaOutline}
                >
                    <FaTrash /> Limpiar
                </button>
            </div>
        </div>
    );
}