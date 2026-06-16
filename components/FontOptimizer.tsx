'use client';

import React, { useState } from 'react';
import { FaCopy, FaCheck, FaCode, FaCloudDownloadAlt, FaSync } from 'react-icons/fa';
import styles from '../app/lab/lab.module.css';

export default function FontOptimizer() {
    const [fontFamilies, setFontFamilies] = useState('Inter, Roboto, Open Sans');
    const [fontWeights, setFontWeights] = useState('400,600,700');
    const [fontSubsets, setFontSubsets] = useState('latin,latin-ext');
    const [displayOption, setDisplayOption] = useState('swap');
    const [generatedCode, setGeneratedCode] = useState('');
    const [copied, setCopied] = useState(false);

    const generateFontCode = () => {
        const families = fontFamilies.split(',').map(f => f.trim()).filter(f => f);
        const weights = fontWeights.split(',').map(w => w.trim()).filter(w => w);
        const subsets = fontSubsets.split(',').map(s => s.trim()).filter(s => s);

        const fontQuery = families.map(f => {
            const w = weights.join(',');
            return `${f}:wght@${w}`;
        }).join('&family=');

        const url = `https://fonts.googleapis.com/css2?family=${fontQuery}&display=${displayOption}&subset=${subsets.join(',')}`;

        const htmlCode = `<link href="${url}" rel="stylesheet" />`;

        const cssCode = `/* Fuentes optimizadas */
@import url('${url}');

/* Font stack con fallback */
.font-primary {
  font-family: '${families[0] || 'Inter'}', -apple-system, BlinkMacSystemFont, 
               'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.font-secondary {
  font-family: '${families[1] || 'Roboto'}', '${families[0] || 'Inter'}', 
               -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Clase utilitaria para cargas rápidas */
.font-optimized {
  font-display: ${displayOption};
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;

        const combined = `<!-- ===== FUENTES OPTIMIZADAS ===== -->\n${htmlCode}\n\n${cssCode}`;
        setGeneratedCode(combined);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const displayOptions = [
        { value: 'swap', label: 'Swap (Recomendado)' },
        { value: 'block', label: 'Block' },
        { value: 'fallback', label: 'Fallback' },
        { value: 'optional', label: 'Optional' }
    ];

    return (
        <div className={styles.toolContainer}>
            <div className={styles.fontGrid}>
                {/* Configuración */}
                <div className={styles.toolSection}>
                    <div className={styles.toolSectionHeader}>
                        <FaCloudDownloadAlt className={styles.toolSectionIcon} />
                        <h4>Configuración de Fuentes</h4>
                    </div>

                    <div className={styles.fontForm}>
                        <div className={styles.formGroup}>
                            <label>Familia(s) de Fuentes</label>
                            <input
                                type="text"
                                className={styles.formControlPowa}
                                placeholder="Inter, Roboto, Open Sans"
                                value={fontFamilies}
                                onChange={(e) => setFontFamilies(e.target.value)}
                            />
                            <small className={styles.formHelper}>
                                Separadas por comas. Ej: Inter, Roboto, Open Sans
                            </small>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Pesos de Fuente</label>
                            <input
                                type="text"
                                className={styles.formControlPowa}
                                placeholder="400,600,700"
                                value={fontWeights}
                                onChange={(e) => setFontWeights(e.target.value)}
                            />
                            <small className={styles.formHelper}>
                                Separados por comas. Ej: 400,600,700,900
                            </small>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Subsets</label>
                                <input
                                    type="text"
                                    className={styles.formControlPowa}
                                    placeholder="latin,latin-ext"
                                    value={fontSubsets}
                                    onChange={(e) => setFontSubsets(e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Display</label>
                                <select
                                    className={styles.formControlPowa}
                                    value={displayOption}
                                    onChange={(e) => setDisplayOption(e.target.value)}
                                >
                                    {displayOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button onClick={generateFontCode} className={styles.btnPowaPrimary}>
                            <FaSync /> Generar Código
                        </button>
                    </div>
                </div>

                {/* Resultado */}
                <div className={styles.toolSection}>
                    <div className={styles.toolSectionHeader}>
                        <FaCode className={styles.toolSectionIcon} />
                        <h4>Código Generado</h4>
                        {generatedCode && (
                            <button onClick={handleCopy} className={styles.iconButton} title="Copiar">
                                {copied ? <FaCheck /> : <FaCopy />}
                            </button>
                        )}
                    </div>

                    <div className={styles.fontOutput}>
                        {generatedCode ? (
                            <>
                                <pre className={styles.codeBlock}>
                                    <code>{generatedCode}</code>
                                </pre>
                                <div className={styles.schemaActions}>
                                    <button onClick={handleCopy} className={styles.btnPowaOutlineSmall}>
                                        {copied ? <FaCheck /> : <FaCopy />} {copied ? '¡Copiado!' : 'Copiar Código'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={styles.emptyState}>
                                <FaCloudDownloadAlt className={styles.emptyIcon} />
                                <p>Configura tus fuentes y genera el código optimizado</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}