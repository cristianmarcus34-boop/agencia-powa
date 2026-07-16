// components/FacturaPDF.tsx
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer';
import { FaDownload } from 'react-icons/fa';

// 🔥 Registrar fuente de emojis (opcional, si querés emojis)
Font.registerEmojiSource({
    format: 'png',
    url: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@15.0.1/img/apple/64/',
});

// Estilos del PDF
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        borderBottom: '2px solid #22d3ee',
        paddingBottom: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    titleContainer: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    subtitle: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 4,
    },
    companyInfo: {
        alignItems: 'flex-end',
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#22d3ee',
    },
    companyData: {
        fontSize: 10,
        color: '#64748b',
        marginTop: 2,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 8,
        paddingBottom: 4,
        borderBottom: '1px solid #e2e8f0',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
        paddingVertical: 4,
        borderBottom: '1px solid #e2e8f0',
    },
    rowNoBorder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
        paddingVertical: 4,
    },
    label: {
        fontSize: 12,
        color: '#64748b',
        width: '40%',
    },
    value: {
        fontSize: 12,
        color: '#0f172a',
        width: '60%',
        textAlign: 'right',
    },
    paymentInfo: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderStyle: 'solid',
    },
    paymentText: {
        fontSize: 11,
        color: '#0f172a',
        marginBottom: 4,
    },
    paymentLabel: {
        fontSize: 11,
        color: '#64748b',
        marginBottom: 4,
    },
    total: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        paddingTop: 10,
        borderTop: '2px solid #22d3ee',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0f172a',
        marginRight: 40,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#22d3ee',
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        right: 40,
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        paddingTop: 10,
    },
    footerLink: {
        fontSize: 9,
        color: '#64748b',
        marginHorizontal: 6,
    },
    footerSeparator: {
        fontSize: 9,
        color: '#94a3b8',
        marginHorizontal: 4,
    },
    footerText: {
        fontSize: 10,
        color: '#64748b',
        marginBottom: 2,
    },
    footerSmall: {
        fontSize: 8,
        color: '#94a3b8',
    },
});

interface FacturaPDFProps {
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
}

export const FacturaPDFDocument = ({ factura }: FacturaPDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header con Logo */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        src="/logo-agenciadigitalpowa-redondo.png"
                        style={styles.logo}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>FACTURA</Text>
                        <Text style={styles.subtitle}>N° {factura.numero_factura}</Text>
                    </View>
                </View>
                <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>Agencia Digital Powa</Text>
                    <Text style={styles.subtitle}>Agencia Digital</Text>
                    <Text style={styles.companyData}>CUIT: 30-12345678-9</Text>
                    <Text style={styles.companyData}>IVA: Responsable Inscripto</Text>
                    <Text style={styles.companyData}>agenciadigitalpowa@gmail.com</Text>
                    <Text style={styles.companyData}>+54 11 3830-5837</Text>
                </View>
            </View>

            {/* Info Cliente */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>DATOS DEL CLIENTE</Text>
                <Text style={[styles.label, { width: '100%', marginBottom: 4 }]}>
                    Empresa: {factura.clientes?.nombre_empresa || 'Sin cliente'}
                </Text>
                <Text style={[styles.label, { width: '100%', marginBottom: 4 }]}>
                    Contacto: {factura.clientes?.nombre_contacto || 'N/A'}
                </Text>
                <Text style={[styles.label, { width: '100%' }]}>
                    Email: {factura.clientes?.email || 'N/A'}
                </Text>
            </View>

            {/* Detalles */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>DETALLES DE LA FACTURA</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Fecha Emisión</Text>
                    <Text style={styles.value}>
                        {factura.fecha_emision ? new Date(factura.fecha_emision).toLocaleDateString() : '—'}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Fecha Vencimiento</Text>
                    <Text style={styles.value}>
                        {factura.fecha_vencimiento ? new Date(factura.fecha_vencimiento).toLocaleDateString() : '—'}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Estado</Text>
                    <Text style={[
                        styles.value,
                        {
                            color: factura.estado === 'pagada' ? '#22c55e' :
                                factura.estado === 'pendiente' ? '#eab308' :
                                    factura.estado === 'vencida' ? '#ef4444' : '#64748b',
                            fontWeight: 'bold'
                        }
                    ]}>
                        {factura.estado === 'pagada' ? '✅ Pagada' :
                            factura.estado === 'pendiente' ? '⏳ Pendiente' :
                                factura.estado === 'vencida' ? '❌ Vencida' : factura.estado}
                    </Text>
                </View>
            </View>

            {/* Montos */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>RESUMEN DE MONTOS</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Subtotal</Text>
                    <Text style={styles.value}>${factura.subtotal?.toLocaleString() || '0'}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Impuesto ({factura.tasa_impuesto || 0}%)</Text>
                    <Text style={styles.value}>${factura.monto_impuesto?.toLocaleString() || '0'}</Text>
                </View>
                <View style={styles.total}>
                    <Text style={styles.totalLabel}>TOTAL</Text>
                    <Text style={styles.totalValue}>${factura.total?.toLocaleString() || '0'}</Text>
                </View>
            </View>

            {/* Información de Pago */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>INFORMACIÓN DE PAGO</Text>
                <View style={styles.paymentInfo}>
                    <Text style={styles.paymentLabel}>Transferencia Bancaria</Text>
                    <Text style={styles.paymentText}>Banco: Banco Nación</Text>
                    <Text style={styles.paymentText}>CBU: 1234567890123456789012</Text>
                    <Text style={styles.paymentText}>Alias: powa.digital</Text>
                    <Text style={styles.paymentText}>Titular: Agencia Digital Powa SRL</Text>
                    <Text style={[styles.paymentText, { marginTop: 4, color: '#ef4444', fontWeight: 'bold' }]}>
                        ⚠️ Importante: La fecha de vencimiento es {factura.fecha_vencimiento ? new Date(factura.fecha_vencimiento).toLocaleDateString() : '—'}
                    </Text>
                </View>
            </View>

            {/* Notas */}
            {factura.notas && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>NOTAS</Text>
                    <Text style={[styles.value, { width: '100%', textAlign: 'left', fontSize: 11, color: '#64748b' }]}>
                        {factura.notas}
                    </Text>
                </View>
            )}

            {/* Footer - CON SÍMBOLOS UNICODE ✦ ✉ ✆ */}
            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                    <Text style={styles.footerLink}>✦ Web: https://agencia-powa.vercel.app</Text>
                    <Text style={styles.footerSeparator}>|</Text>
                    <Text style={styles.footerLink}>✉ Email: agenciadigitalpowa@gmail.com</Text>
                    <Text style={styles.footerSeparator}>|</Text>
                    <Text style={styles.footerLink}>✆ Tel: +54 11 3830-5837</Text>
                </View>
                <Text style={styles.footerText}>
                    Gracias por confiar en Agencia Digital Powa.
                </Text>
                <Text style={styles.footerSmall}>
                    * Este documento es una factura electrónica válida según Resolución General AFIP N° 1234
                </Text>
            </View>
        </Page>
    </Document>
);

// Botón de descarga
export const DownloadFacturaButton = ({ factura }: { factura: FacturaPDFProps['factura'] }) => (
    <PDFDownloadLink
        document={<FacturaPDFDocument factura={factura} />}
        fileName={`factura-${factura.numero_factura}.pdf`}
        className="btn-download-pdf"
        style={{
            background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
            border: 'none',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
        }}
    >
        {({ loading }) => (
            <>
                <FaDownload />
                {loading ? 'Generando...' : 'Descargar PDF'}
            </>
        )}
    </PDFDownloadLink>
);