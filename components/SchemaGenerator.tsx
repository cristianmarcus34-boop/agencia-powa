'use client';

import React, { useState } from 'react';
import { FaCopy, FaCheck, FaCode, FaFileCode } from 'react-icons/fa';
import styles from '../app/lab/lab.module.css';



interface SchemaType {
    id: string;
    name: string;
    template: (data: any) => string;
}

export default function SchemaGenerator() {
    const [schemaType, setSchemaType] = useState('organization');
    const [schemaData, setSchemaData] = useState({
        name: '',
        description: '',
        url: '',
        logo: '',
        email: '',
        phone: ''
    });
    const [generatedSchema, setGeneratedSchema] = useState('');
    const [copied, setCopied] = useState(false);

    const schemaTypes: SchemaType[] = [
        {
            id: 'organization',
            name: 'Organización',
            template: (data: any) => JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": data.name || "Mi Empresa",
                "description": data.description || "Descripción de la empresa",
                "url": data.url || "https://tusitio.com",
                "logo": data.logo || "https://tusitio.com/logo.png",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "email": data.email || "contacto@tusitio.com",
                    "telephone": data.phone || "+54 9 11 1234-5678"
                }
            }, null, 2)
        },
        {
            id: 'localbusiness',
            name: 'Negocio Local',
            template: (data: any) => JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": data.name || "Mi Negocio",
                "description": data.description || "Descripción del negocio",
                "url": data.url || "https://tusitio.com",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Ciudad",
                    "addressRegion": "Provincia",
                    "postalCode": "1000"
                }
            }, null, 2)
        },
        {
            id: 'product',
            name: 'Producto',
            template: (data: any) => JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": data.name || "Nombre del Producto",
                "description": data.description || "Descripción del producto",
                "url": data.url || "https://tusitio.com/producto",
                "brand": {
                    "@type": "Brand",
                    "name": "Mi Marca"
                }
            }, null, 2)
        },
        {
            id: 'article',
            name: 'Artículo / Blog',
            template: (data: any) => JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": data.name || "Título del Artículo",
                "description": data.description || "Descripción del artículo",
                "url": data.url || "https://tusitio.com/articulo",
                "author": {
                    "@type": "Person",
                    "name": "Autor"
                }
            }, null, 2)
        }
    ];

    const handleGenerate = () => {
        const selected = schemaTypes.find(t => t.id === schemaType);
        if (selected) {
            const schema = selected.template(schemaData);
            setGeneratedSchema(schema);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedSchema);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleDownload = () => {
        const blob = new Blob([generatedSchema], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'schema-markup.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={styles.toolContainer}>
            <div className={styles.schemaGrid}>
                {/* Configuración */}
                <div className={styles.toolSection}>
                    <div className={styles.toolSectionHeader}>
                        <FaFileCode className={styles.toolSectionIcon} />
                        <h4>Configuración del Schema</h4>
                    </div>

                    <div className={styles.schemaForm}>
                        <div className={styles.formGroup}>
                            <label>Tipo de Schema</label>
                            <select
                                className={styles.formControlPowa}
                                value={schemaType}
                                onChange={(e) => setSchemaType(e.target.value)}
                            >
                                {schemaTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Nombre</label>
                            <input
                                type="text"
                                className={styles.formControlPowa}
                                placeholder="Nombre de la entidad"
                                value={schemaData.name}
                                onChange={(e) => setSchemaData({ ...schemaData, name: e.target.value })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Descripción</label>
                            <textarea
                                className={styles.formControlPowa}
                                placeholder="Descripción detallada"
                                rows={2}
                                value={schemaData.description}
                                onChange={(e) => setSchemaData({ ...schemaData, description: e.target.value })}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>URL</label>
                            <input
                                type="url"
                                className={styles.formControlPowa}
                                placeholder="https://tusitio.com"
                                value={schemaData.url}
                                onChange={(e) => setSchemaData({ ...schemaData, url: e.target.value })}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    className={styles.formControlPowa}
                                    placeholder="contacto@tusitio.com"
                                    value={schemaData.email}
                                    onChange={(e) => setSchemaData({ ...schemaData, email: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Teléfono</label>
                                <input
                                    type="text"
                                    className={styles.formControlPowa}
                                    placeholder="+54 9 11 1234-5678"
                                    value={schemaData.phone}
                                    onChange={(e) => setSchemaData({ ...schemaData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <button onClick={handleGenerate} className={styles.btnPowaPrimary}>
                            <FaCode /> Generar Schema
                        </button>
                    </div>
                </div>

                {/* Resultado */}
                <div className={styles.toolSection}>
                    <div className={styles.toolSectionHeader}>
                        <FaCode className={styles.toolSectionIcon} />
                        <h4>Schema Generado</h4>
                        {generatedSchema && (
                            <div className={styles.actionButtons}>
                                <button onClick={handleCopy} className={styles.iconButton} title="Copiar">
                                    {copied ? <FaCheck /> : <FaCopy />}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className={styles.schemaOutput}>
                        {generatedSchema ? (
                            <>
                                <pre className={styles.codeBlock}>
                                    <code>{generatedSchema}</code>
                                </pre>
                                <div className={styles.schemaActions}>
                                    <button onClick={handleCopy} className={styles.btnPowaOutlineSmall}>
                                        {copied ? <FaCheck /> : <FaCopy />} {copied ? '¡Copiado!' : 'Copiar JSON'}
                                    </button>
                                    <button onClick={handleDownload} className={styles.btnPowaPrimarySmall}>
                                        <FaFileCode /> Descargar
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={styles.emptyState}>
                                <FaCode className={styles.emptyIcon} />
                                <p>Completa los campos y genera tu schema JSON-LD</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}