'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaPrint } from 'react-icons/fa';
import { FacturaPDFDocument } from './FacturaPDF';
import { PDFViewer } from '@react-pdf/renderer';

interface FacturaPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    factura: {
        numero_factura: string;
        fecha_emision: string;
        fecha_vencimiento: string;
        subtotal: number;
        tasa_impuesto: number;
        monto_impuesto: number;
        total: number;
        estado: string;
        notas?: string;
        clientes?: {
            nombre_empresa: string;
            nombre_contacto: string;
            email: string;
        };
    };
    onDownload: () => void;
}

export default function FacturaPreviewModal({
    isOpen,
    onClose,
    factura,
    onDownload
}: FacturaPreviewModalProps) {
    const [viewMode, setViewMode] = useState<'preview' | 'full'>('preview');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="factura-modal-overlay"
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 99999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: '#1a2333',
                        borderRadius: '20px',
                        maxWidth: '900px',
                        width: '100%',
                        maxHeight: '95vh',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 24px 80px rgba(0,0,0,0.6)'
                    }}
                >
                    {/* Header del modal */}
                    <div style={{
                        padding: '16px 24px',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexShrink: 0
                    }}>
                        <div>
                            <h2 style={{
                                color: '#ffffff',
                                fontSize: '18px',
                                fontWeight: 700,
                                margin: 0
                            }}>
                                🧾 Previsualización de Factura
                            </h2>
                            <p style={{
                                color: '#94a3b8',
                                fontSize: '13px',
                                margin: '4px 0 0'
                            }}>
                                N° {factura.numero_factura} • {factura.clientes?.nombre_empresa || 'Sin cliente'}
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <button
                                onClick={onDownload}
                                style={{
                                    background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                                    border: 'none',
                                    color: '#ffffff',
                                    padding: '8px 16px',
                                    borderRadius: '10px',
                                    fontWeight: 600,
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(34, 211, 238, 0.25)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <FaDownload /> Descargar PDF
                            </button>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: '#94a3b8',
                                    padding: '8px 12px',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontSize: '18px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                    e.currentTarget.style.color = '#94a3b8';
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    {/* Cuerpo del modal - Vista previa del PDF */}
                    <div style={{
                        flex: 1,
                        overflow: 'hidden',
                        background: '#0f172a',
                        position: 'relative',
                        minHeight: '400px'
                    }}>
                        <PDFViewer
                            style={{
                                width: '100%',
                                height: '100%',
                                minHeight: '500px',
                                border: 'none',
                                backgroundColor: '#0f172a'
                            }}
                        >
                            <FacturaPDFDocument factura={factura} />
                        </PDFViewer>
                    </div>

                    {/* Footer del modal */}
                    <div style={{
                        padding: '12px 24px',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexShrink: 0,
                        background: 'rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <span style={{
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: 600,
                                background: factura.estado === 'pagada' ? 'rgba(34, 197, 94, 0.15)' :
                                    factura.estado === 'pendiente' ? 'rgba(234, 179, 8, 0.15)' :
                                        'rgba(239, 68, 68, 0.15)',
                                color: factura.estado === 'pagada' ? '#22c55e' :
                                    factura.estado === 'pendiente' ? '#eab308' : '#ef4444'
                            }}>
                                {factura.estado === 'pagada' ? '✅ Pagada' :
                                    factura.estado === 'pendiente' ? '⏳ Pendiente' : '❌ Vencida'}
                            </span>
                            <span style={{ color: '#64748b', fontSize: '13px' }}>
                                Total: <strong style={{ color: '#ffffff' }}>${factura.total?.toLocaleString() || '0'}</strong>
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: '#94a3b8',
                                    padding: '6px 16px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                    e.currentTarget.style.color = '#94a3b8';
                                }}
                            >
                                Cerrar
                            </button>
                            <button
                                onClick={onDownload}
                                style={{
                                    background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                                    border: 'none',
                                    color: '#ffffff',
                                    padding: '6px 16px',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                <FaDownload /> Descargar
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}