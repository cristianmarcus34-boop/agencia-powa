'use client';

import React, { useState } from 'react';
import { FaCalculator, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import styles from './RoiCalculator.module.css';

// ============================================
// TIPOS
// ============================================
interface RoiData {
  businessType: string;
  dailySales: number;
  averageValue: number;
  lostSales: number;
}

type BusinessType =
  | 'barberia'
  | 'peluqueria'
  | 'spa'
  | 'gimnasio'
  | 'consultoria'
  | 'abogacia'
  | 'contabilidad'
  | 'restaurante'
  | 'cafeteria'
  | 'delivery'
  | 'foodtruck'
  | 'tienda'
  | 'dropshipping'
  | 'marketplace'
  | 'clinica'
  | 'odontologia'
  | 'psicologia'
  | 'nutricion'
  | 'academia'
  | 'cursos'
  | 'tutorias'
  | 'inmobiliaria'
  | 'alquileres'
  | 'propiedades'
  | 'taller'
  | 'lavadero'
  | 'concesionaria'
  | 'otro';

interface BusinessTypeOption {
  id: BusinessType;
  label: string;
  icon: string;
  category: string;
}

// ============================================
// TEXTOS DINÁMICOS SEGÚN TIPO DE NEGOCIO
// ============================================
const getBusinessTexts = (type: string) => {
  const texts: Record<string, any> = {
    // ===== SERVICIOS PERSONALES =====
    barberia: {
      salesLabel: 'turnos',
      salesLabelPlural: 'turnos',
      salesPlaceholder: 'Ej: 10',
      valueLabel: 'servicio',
      valuePlaceholder: 'Ej: 12000',
      lostLabel: 'turnos perdés',
      lostPlaceholder: 'Ej: 20',
      lostHelp: 'Por ausencias, doble reserva, falta de recordatorios, etc.',
      resultLabel: 'turnos'
    },
    peluqueria: {
      salesLabel: 'turnos',
      salesLabelPlural: 'turnos',
      salesPlaceholder: 'Ej: 15',
      valueLabel: 'servicio',
      valuePlaceholder: 'Ej: 8000',
      lostLabel: 'turnos perdés',
      lostPlaceholder: 'Ej: 25',
      lostHelp: 'Por ausencias, cancelaciones de última hora, etc.',
      resultLabel: 'turnos'
    },
    spa: {
      salesLabel: 'sesiones',
      salesLabelPlural: 'sesiones',
      salesPlaceholder: 'Ej: 8',
      valueLabel: 'sesión',
      valuePlaceholder: 'Ej: 25000',
      lostLabel: 'sesiones perdés',
      lostPlaceholder: 'Ej: 12',
      lostHelp: 'Por cancelaciones, falta de recordatorios, etc.',
      resultLabel: 'sesiones'
    },
    gimnasio: {
      salesLabel: 'socios',
      salesLabelPlural: 'socios',
      salesPlaceholder: 'Ej: 50',
      valueLabel: 'membresía',
      valuePlaceholder: 'Ej: 15000',
      lostLabel: 'socios perdés',
      lostPlaceholder: 'Ej: 10',
      lostHelp: 'Por falta de seguimiento, mala experiencia, etc.',
      resultLabel: 'socios'
    },
    consultoria: {
      salesLabel: 'consultas',
      salesLabelPlural: 'consultas',
      salesPlaceholder: 'Ej: 5',
      valueLabel: 'consulta',
      valuePlaceholder: 'Ej: 50000',
      lostLabel: 'consultas perdés',
      lostPlaceholder: 'Ej: 8',
      lostHelp: 'Por falta de seguimiento, mala atención, etc.',
      resultLabel: 'consultas'
    },
    abogacia: {
      salesLabel: 'consultas',
      salesLabelPlural: 'consultas',
      salesPlaceholder: 'Ej: 4',
      valueLabel: 'consulta',
      valuePlaceholder: 'Ej: 80000',
      lostLabel: 'consultas perdés',
      lostPlaceholder: 'Ej: 6',
      lostHelp: 'Por falta de seguimiento, mala atención, etc.',
      resultLabel: 'consultas'
    },
    contabilidad: {
      salesLabel: 'clientes',
      salesLabelPlural: 'clientes',
      salesPlaceholder: 'Ej: 20',
      valueLabel: 'cliente',
      valuePlaceholder: 'Ej: 30000',
      lostLabel: 'clientes perdés',
      lostPlaceholder: 'Ej: 5',
      lostHelp: 'Por falta de seguimiento, mala atención, etc.',
      resultLabel: 'clientes'
    },

    // ===== GASTRONOMÍA =====
    restaurante: {
      salesLabel: 'ventas',
      salesLabelPlural: 'ventas',
      salesPlaceholder: 'Ej: 50',
      valueLabel: 'pedido',
      valuePlaceholder: 'Ej: 8000',
      lostLabel: 'ventas perdés',
      lostPlaceholder: 'Ej: 30',
      lostHelp: 'Por cancelaciones, falta de reservas, etc.',
      resultLabel: 'ventas'
    },
    cafeteria: {
      salesLabel: 'ventas',
      salesLabelPlural: 'ventas',
      salesPlaceholder: 'Ej: 80',
      valueLabel: 'pedido',
      valuePlaceholder: 'Ej: 4000',
      lostLabel: 'ventas perdés',
      lostPlaceholder: 'Ej: 40',
      lostHelp: 'Por falta de promociones, mala atención, etc.',
      resultLabel: 'ventas'
    },
    delivery: {
      salesLabel: 'pedidos',
      salesLabelPlural: 'pedidos',
      salesPlaceholder: 'Ej: 30',
      valueLabel: 'pedido',
      valuePlaceholder: 'Ej: 12000',
      lostLabel: 'pedidos perdés',
      lostPlaceholder: 'Ej: 20',
      lostHelp: 'Por demoras, falta de seguimiento, etc.',
      resultLabel: 'pedidos'
    },
    foodtruck: {
      salesLabel: 'ventas',
      salesLabelPlural: 'ventas',
      salesPlaceholder: 'Ej: 40',
      valueLabel: 'venta',
      valuePlaceholder: 'Ej: 6000',
      lostLabel: 'ventas perdés',
      lostPlaceholder: 'Ej: 25',
      lostHelp: 'Por falta de promociones, mala ubicación, etc.',
      resultLabel: 'ventas'
    },

    // ===== E-COMMERCE =====
    tienda: {
      salesLabel: 'ventas',
      salesLabelPlural: 'ventas',
      salesPlaceholder: 'Ej: 20',
      valueLabel: 'producto',
      valuePlaceholder: 'Ej: 15000',
      lostLabel: 'ventas perdés',
      lostPlaceholder: 'Ej: 15',
      lostHelp: 'Por carritos abandonados, falta de stock, etc.',
      resultLabel: 'ventas'
    },
    dropshipping: {
      salesLabel: 'ventas',
      salesLabelPlural: 'ventas',
      salesPlaceholder: 'Ej: 15',
      valueLabel: 'producto',
      valuePlaceholder: 'Ej: 20000',
      lostLabel: 'ventas perdés',
      lostPlaceholder: 'Ej: 10',
      lostHelp: 'Por falta de stock, envíos lentos, etc.',
      resultLabel: 'ventas'
    },
    marketplace: {
      salesLabel: 'ventas',
      salesLabelPlural: 'ventas',
      salesPlaceholder: 'Ej: 100',
      valueLabel: 'producto',
      valuePlaceholder: 'Ej: 8000',
      lostLabel: 'ventas perdés',
      lostPlaceholder: 'Ej: 30',
      lostHelp: 'Por falta de optimización, mala reputación, etc.',
      resultLabel: 'ventas'
    },

    // ===== SALUD =====
    clinica: {
      salesLabel: 'turnos',
      salesLabelPlural: 'turnos',
      salesPlaceholder: 'Ej: 30',
      valueLabel: 'consulta',
      valuePlaceholder: 'Ej: 35000',
      lostLabel: 'turnos perdés',
      lostPlaceholder: 'Ej: 15',
      lostHelp: 'Por ausencias, falta de recordatorios, etc.',
      resultLabel: 'turnos'
    },
    odontologia: {
      salesLabel: 'turnos',
      salesLabelPlural: 'turnos',
      salesPlaceholder: 'Ej: 15',
      valueLabel: 'consulta',
      valuePlaceholder: 'Ej: 45000',
      lostLabel: 'turnos perdés',
      lostPlaceholder: 'Ej: 8',
      lostHelp: 'Por ausencias, cancelaciones, etc.',
      resultLabel: 'turnos'
    },
    psicologia: {
      salesLabel: 'sesiones',
      salesLabelPlural: 'sesiones',
      salesPlaceholder: 'Ej: 20',
      valueLabel: 'sesión',
      valuePlaceholder: 'Ej: 25000',
      lostLabel: 'sesiones perdés',
      lostPlaceholder: 'Ej: 10',
      lostHelp: 'Por ausencias, cancelaciones, etc.',
      resultLabel: 'sesiones'
    },
    nutricion: {
      salesLabel: 'consultas',
      salesLabelPlural: 'consultas',
      salesPlaceholder: 'Ej: 12',
      valueLabel: 'consulta',
      valuePlaceholder: 'Ej: 20000',
      lostLabel: 'consultas perdés',
      lostPlaceholder: 'Ej: 6',
      lostHelp: 'Por falta de seguimiento, mala atención, etc.',
      resultLabel: 'consultas'
    },

    // ===== EDUCACIÓN =====
    academia: {
      salesLabel: 'alumnos',
      salesLabelPlural: 'alumnos',
      salesPlaceholder: 'Ej: 40',
      valueLabel: 'alumno',
      valuePlaceholder: 'Ej: 20000',
      lostLabel: 'alumnos perdés',
      lostPlaceholder: 'Ej: 10',
      lostHelp: 'Por falta de seguimiento, mala experiencia, etc.',
      resultLabel: 'alumnos'
    },
    cursos: {
      salesLabel: 'inscripciones',
      salesLabelPlural: 'inscripciones',
      salesPlaceholder: 'Ej: 25',
      valueLabel: 'curso',
      valuePlaceholder: 'Ej: 30000',
      lostLabel: 'inscripciones perdés',
      lostPlaceholder: 'Ej: 8',
      lostHelp: 'Por falta de promoción, mala experiencia, etc.',
      resultLabel: 'inscripciones'
    },
    tutorias: {
      salesLabel: 'sesiones',
      salesLabelPlural: 'sesiones',
      salesPlaceholder: 'Ej: 15',
      valueLabel: 'sesión',
      valuePlaceholder: 'Ej: 15000',
      lostLabel: 'sesiones perdés',
      lostPlaceholder: 'Ej: 5',
      lostHelp: 'Por falta de seguimiento, mala atención, etc.',
      resultLabel: 'sesiones'
    },

    // ===== INMOBILIARIO =====
    inmobiliaria: {
      salesLabel: 'operaciones',
      salesLabelPlural: 'operaciones',
      salesPlaceholder: 'Ej: 5',
      valueLabel: 'operación',
      valuePlaceholder: 'Ej: 500000',
      lostLabel: 'operaciones perdés',
      lostPlaceholder: 'Ej: 3',
      lostHelp: 'Por falta de seguimiento, mala atención, etc.',
      resultLabel: 'operaciones'
    },
    alquileres: {
      salesLabel: 'alquileres',
      salesLabelPlural: 'alquileres',
      salesPlaceholder: 'Ej: 10',
      valueLabel: 'alquiler',
      valuePlaceholder: 'Ej: 200000',
      lostLabel: 'alquileres perdés',
      lostPlaceholder: 'Ej: 4',
      lostHelp: 'Por falta de promoción, mala atención, etc.',
      resultLabel: 'alquileres'
    },
    propiedades: {
      salesLabel: 'ventas',
      salesLabelPlural: 'ventas',
      salesPlaceholder: 'Ej: 3',
      valueLabel: 'propiedad',
      valuePlaceholder: 'Ej: 1000000',
      lostLabel: 'ventas perdés',
      lostPlaceholder: 'Ej: 2',
      lostHelp: 'Por falta de seguimiento, mala atención, etc.',
      resultLabel: 'ventas'
    },

    // ===== AUTOMOTRIZ =====
    taller: {
      salesLabel: 'turnos',
      salesLabelPlural: 'turnos',
      salesPlaceholder: 'Ej: 15',
      valueLabel: 'reparación',
      valuePlaceholder: 'Ej: 30000',
      lostLabel: 'turnos perdés',
      lostPlaceholder: 'Ej: 10',
      lostHelp: 'Por falta de recordatorios, mala atención, etc.',
      resultLabel: 'turnos'
    },
    lavadero: {
      salesLabel: 'lavados',
      salesLabelPlural: 'lavados',
      salesPlaceholder: 'Ej: 30',
      valueLabel: 'lavado',
      valuePlaceholder: 'Ej: 8000',
      lostLabel: 'lavados perdés',
      lostPlaceholder: 'Ej: 15',
      lostHelp: 'Por falta de promociones, mala atención, etc.',
      resultLabel: 'lavados'
    },
    concesionaria: {
      salesLabel: 'ventas',
      salesLabelPlural: 'ventas',
      salesPlaceholder: 'Ej: 2',
      valueLabel: 'vehículo',
      valuePlaceholder: 'Ej: 1500000',
      lostLabel: 'ventas perdés',
      lostPlaceholder: 'Ej: 1',
      lostHelp: 'Por falta de seguimiento, mala atención, etc.',
      resultLabel: 'ventas'
    },

    // ===== OTRO =====
    otro: {
      salesLabel: 'transacciones',
      salesLabelPlural: 'transacciones',
      salesPlaceholder: 'Ej: 15',
      valueLabel: 'transacción',
      valuePlaceholder: 'Ej: 10000',
      lostLabel: 'transacciones perdés',
      lostPlaceholder: 'Ej: 12',
      lostHelp: 'Por ineficiencias operativas, falta de automatización, etc.',
      resultLabel: 'transacciones'
    }
  };

  return texts[type as keyof typeof texts] || texts.otro;
};

// ============================================
// OPCIONES DE NEGOCIO POR CATEGORÍA
// ============================================
const businessOptions: BusinessTypeOption[] = [
  // Servicios Personales
  { id: 'barberia', label: 'Barbería', icon: '✂️', category: 'Servicios Personales' },
  { id: 'peluqueria', label: 'Peluquería', icon: '💇', category: 'Servicios Personales' },
  { id: 'spa', label: 'Spa / Bienestar', icon: '🧖', category: 'Servicios Personales' },
  { id: 'gimnasio', label: 'Gimnasio / Fitness', icon: '🏋️', category: 'Servicios Personales' },
  { id: 'consultoria', label: 'Consultoría', icon: '📊', category: 'Servicios Personales' },
  { id: 'abogacia', label: 'Abogacía', icon: '⚖️', category: 'Servicios Personales' },
  { id: 'contabilidad', label: 'Contabilidad', icon: '📈', category: 'Servicios Personales' },

  // Gastronomía
  { id: 'restaurante', label: 'Restaurante', icon: '🍕', category: 'Gastronomía' },
  { id: 'cafeteria', label: 'Cafetería', icon: '☕', category: 'Gastronomía' },
  { id: 'delivery', label: 'Delivery / Takeaway', icon: '🛵', category: 'Gastronomía' },
  { id: 'foodtruck', label: 'Food Truck', icon: '🚚', category: 'Gastronomía' },

  // E-commerce
  { id: 'tienda', label: 'Tienda Online', icon: '🛒', category: 'E-commerce' },
  { id: 'dropshipping', label: 'Dropshipping', icon: '📦', category: 'E-commerce' },
  { id: 'marketplace', label: 'Marketplace', icon: '🏪', category: 'E-commerce' },

  // Salud
  { id: 'clinica', label: 'Clínica Médica', icon: '🏥', category: 'Salud' },
  { id: 'odontologia', label: 'Odontología', icon: '🦷', category: 'Salud' },
  { id: 'psicologia', label: 'Psicología', icon: '🧠', category: 'Salud' },
  { id: 'nutricion', label: 'Nutrición', icon: '🥗', category: 'Salud' },

  // Educación
  { id: 'academia', label: 'Academia / Instituto', icon: '📚', category: 'Educación' },
  { id: 'cursos', label: 'Cursos Online', icon: '💻', category: 'Educación' },
  { id: 'tutorias', label: 'Tutorías / Clases', icon: '✏️', category: 'Educación' },

  // Inmobiliario
  { id: 'inmobiliaria', label: 'Inmobiliaria', icon: '🏠', category: 'Inmobiliario' },
  { id: 'alquileres', label: 'Alquileres', icon: '🔑', category: 'Inmobiliario' },
  { id: 'propiedades', label: 'Venta de Propiedades', icon: '🏘️', category: 'Inmobiliario' },

  // Automotriz
  { id: 'taller', label: 'Taller Mecánico', icon: '🔧', category: 'Automotriz' },
  { id: 'lavadero', label: 'Lavadero de Autos', icon: '🚗', category: 'Automotriz' },
  { id: 'concesionaria', label: 'Concesionaria', icon: '🚘', category: 'Automotriz' },

  // Otro
  { id: 'otro', label: 'Otro tipo de negocio', icon: '📌', category: 'Otros' },
];

// ============================================
// AGRUPAR OPCIONES POR CATEGORÍA
// ============================================
const groupedOptions = businessOptions.reduce((acc, option) => {
  if (!acc[option.category]) {
    acc[option.category] = [];
  }
  acc[option.category].push(option);
  return acc;
}, {} as Record<string, BusinessTypeOption[]>);

export default function RoiCalculator() {
  // ===== STATE CON TIPOS =====
  const [roiData, setRoiData] = useState<RoiData>({
    businessType: '',
    dailySales: 0,
    averageValue: 0,
    lostSales: 0
  });

  const [calculated, setCalculated] = useState<boolean>(false);
  const [showAllOptions, setShowAllOptions] = useState<boolean>(false);

  // ===== HANDLERS CON TIPOS =====
  const handleCalculate = (): void => {
    if (roiData.dailySales > 0 && roiData.averageValue > 0) {
      setCalculated(true);
    }
  };

  const resetCalculator = (): void => {
    setRoiData({
      businessType: '',
      dailySales: 0,
      averageValue: 0,
      lostSales: 0
    });
    setCalculated(false);
  };

  const handleBusinessTypeSelect = (type: BusinessType): void => {
    setRoiData({ ...roiData, businessType: type });
    setShowAllOptions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setRoiData({
      ...roiData,
      [name]: parseInt(value) || 0
    });
  };

  // ===== TEXTOS DINÁMICOS =====
  const texts = getBusinessTexts(roiData.businessType);
  const selectedOption = businessOptions.find(opt => opt.id === roiData.businessType);

  // ===== CÁLCULOS =====
  const monthlyLoss: number = roiData.lostSales * roiData.averageValue;
  const monthlySaving: number = Math.round(monthlyLoss * 0.3);
  const roiMonths: number = monthlySaving > 0 ? Math.ceil(500000 / monthlySaving) : 0;
  const yearlySaving: number = monthlySaving * 12;

  return (
    <div className={styles.roiCalculatorContainer}>
      <div className={styles.roiCalculatorInner}>
        {!calculated ? (
          // ===== FORMULARIO =====
          <div className={styles.roiForm}>
            <div className={styles.roiFormHeader}>
              <FaCalculator className={styles.roiFormIcon} />
              <h4>Calculá tu ROI exacto</h4>
              <p className={styles.roiFormSubtitle}>
                Respondé estas preguntas y te mostramos cuánto podrías ahorrar.
              </p>
            </div>

            <div className={styles.roiFormBody}>
              {/* Tipo de negocio */}
              <div className={styles.roiQuestion}>
                <label className={styles.roiLabel}>¿Qué tipo de negocio tenés?</label>

                {/* Opciones rápidas (primeras 6) */}
                <div className={styles.roiOptions}>
                  {businessOptions.slice(0, 6).map((type) => (
                    <button
                      key={type.id}
                      className={`${styles.roiOption} ${roiData.businessType === type.id ? styles.roiOptionActive : ''}`}
                      onClick={() => handleBusinessTypeSelect(type.id)}
                    >
                      {type.icon} {type.label}
                    </button>
                  ))}
                  <button
                    className={`${styles.roiOption} ${styles.roiOptionMore}`}
                    onClick={() => setShowAllOptions(!showAllOptions)}
                  >
                    {showAllOptions ? '▲ Menos opciones' : '📋 Ver más...'}
                  </button>
                </div>

                {/* Todas las opciones (expandible) */}
                {showAllOptions && (
                  <div className={styles.roiAllOptions}>
                    {Object.entries(groupedOptions).map(([category, options]) => (
                      <div key={category} className={styles.roiCategoryGroup}>
                        <span className={styles.roiCategoryLabel}>{category}</span>
                        <div className={styles.roiOptions}>
                          {options.map((type) => (
                            <button
                              key={type.id}
                              className={`${styles.roiOption} ${roiData.businessType === type.id ? styles.roiOptionActive : ''}`}
                              onClick={() => handleBusinessTypeSelect(type.id)}
                            >
                              {type.icon} {type.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selección actual */}
                {selectedOption && (
                  <div className={styles.roiSelectedType}>
                    ✅ Seleccionado: <strong>{selectedOption.icon} {selectedOption.label}</strong>
                  </div>
                )}
              </div>

              {/* Turnos/ventas por día - DINÁMICO */}
              <div className={styles.roiQuestion}>
                <label className={styles.roiLabel}>
                  ¿Cuántos {texts.salesLabel} tenés por día?
                </label>
                <div className={styles.roiInputGroup}>
                  <input
                    type="number"
                    name="dailySales"
                    className={styles.roiInput}
                    value={roiData.dailySales || ''}
                    onChange={handleInputChange}
                    placeholder={texts.salesPlaceholder}
                    min="0"
                  />
                  <span className={styles.roiInputSuffix}>por día</span>
                </div>
              </div>

              {/* Valor promedio - DINÁMICO */}
              <div className={styles.roiQuestion}>
                <label className={styles.roiLabel}>
                  Valor promedio de cada {texts.valueLabel}
                </label>
                <div className={styles.roiInputGroup}>
                  <span className={styles.roiInputPrefix}>$</span>
                  <input
                    type="number"
                    name="averageValue"
                    className={styles.roiInput}
                    value={roiData.averageValue || ''}
                    onChange={handleInputChange}
                    placeholder={texts.valuePlaceholder}
                    min="0"
                  />
                </div>
              </div>

              {/* Pérdidas - DINÁMICO */}
              <div className={styles.roiQuestion}>
                <label className={styles.roiLabel}>
                  ¿Cuántos {texts.lostLabel} por mes?
                </label>
                <div className={styles.roiInputGroup}>
                  <input
                    type="number"
                    name="lostSales"
                    className={styles.roiInput}
                    value={roiData.lostSales || ''}
                    onChange={handleInputChange}
                    placeholder={texts.lostPlaceholder}
                    min="0"
                  />
                  <span className={styles.roiInputSuffix}>por mes</span>
                </div>
                <small className={styles.roiInputHelp}>
                  {texts.lostHelp}
                </small>
              </div>

              <button
                className={styles.roiCalculateButton}
                onClick={handleCalculate}
                disabled={!roiData.dailySales || !roiData.averageValue}
              >
                Calcular mi ROI
                <FaArrowRight className={styles.roiCalculateIcon} />
              </button>
            </div>
          </div>
        ) : (
          // ===== RESULTADO =====
          <div className={styles.roiResult}>
            <div className={styles.roiResultHeader}>
              <FaCheckCircle className={styles.roiResultIcon} />
              <h4>📊 Tu ROI estimado</h4>
              <button className={styles.roiResetButton} onClick={resetCalculator}>
                Volver a calcular
              </button>
            </div>

            <div className={styles.roiResultGrid}>
              <div className={styles.roiResultItem}>
                <span className={styles.roiResultLabel}>
                  Pérdida mensual actual ({texts.resultLabel})
                </span>
                <span className={styles.roiResultValue} style={{ color: '#ef4444' }}>
                  ${monthlyLoss.toLocaleString('es-AR')}
                </span>
              </div>
              <div className={styles.roiResultItem}>
                <span className={styles.roiResultLabel}>Ahorro mensual estimado</span>
                <span className={styles.roiResultValue} style={{ color: '#10b981' }}>
                  ${monthlySaving.toLocaleString('es-AR')}
                </span>
              </div>
              <div className={styles.roiResultItem}>
                <span className={styles.roiResultLabel}>Recuperás la inversión en</span>
                <span className={styles.roiResultValue} style={{ color: '#f59e0b' }}>
                  {roiMonths > 0 ? `${roiMonths} meses` : 'Menos de 1 mes'}
                </span>
              </div>
              <div className={styles.roiResultItem}>
                <span className={styles.roiResultLabel}>Ahorro anual</span>
                <span className={styles.roiResultValue} style={{ color: '#22d3ee' }}>
                  ${yearlySaving.toLocaleString('es-AR')}
                </span>
              </div>
            </div>

            <div className={styles.roiResultMessage}>
              <p>
                Con una inversión de <strong>$520.895/mes</strong>,
                estás ahorrando <strong>${monthlySaving.toLocaleString('es-AR')}/mes</strong>.
              </p>
              <p className={styles.roiResultHighlight}>
                🚀 ¡Se paga sola en {roiMonths > 0 ? `${roiMonths} meses` : 'menos de 1 mes'}!
              </p>
            </div>

            <div className={styles.roiResultFooter}>
              <a href="/contact" className={styles.roiResultButton}>
                Agendar consultoría
                <FaArrowRight className={styles.roiResultButtonIcon} />
              </a>
              <span className={styles.roiResultNote}>
                * Cálculo estimado. Los resultados pueden variar según tu negocio.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}