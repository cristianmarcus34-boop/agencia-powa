'use client';

import React, { useState, FormEvent } from 'react';
import { Card, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaCalculator, FaUndo, FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';

interface RoiResult {
  roi: string;
  ganancia: string;
  esRentable: boolean;
}

const RoiCalculator: React.FC = () => {
  const [inversion, setInversion] = useState<string>('');
  const [ventas, setVentas] = useState<string>('');
  const [costos, setCostos] = useState<string>('');
  const [resultado, setResultado] = useState<RoiResult | null>(null);

  const renderTooltip = (text: string) => (props: any) => (
    <Tooltip id="button-tooltip" {...props}>{text}</Tooltip>
  );

  const calcularROI = (e: FormEvent) => {
    e.preventDefault();
    const inv = parseFloat(inversion);
    const vnt = parseFloat(ventas);
    const cst = parseFloat(costos);

    if (inv > 0) {
      const gananciaNeta = vnt - inv - cst;
      const roi = (gananciaNeta / inv) * 100;
      setResultado({
        roi: roi.toFixed(0),
        ganancia: gananciaNeta.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }),
        esRentable: roi > 0
      });
    }
  };

  const reset = () => {
    setResultado(null);
    setInversion('');
    setVentas('');
    setCostos('');
  };

  return (
    <Card className="glass-card p-4 border-0 shadow-lg text-start h-100">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div className="d-flex align-items-center">
          <div className="bg-blue-600/20 p-3 rounded-3 me-3">
            <FaCalculator className="text-blue-400" size={24} />
          </div>
          <div>
            <h3 className="mb-0 text-white fs-4 fw-bold">Calculadora ROI</h3>
            <small className="text-slate-400">Análisis de rentabilidad publicitaria</small>
          </div>
        </div>
        <OverlayTrigger placement="left" overlay={renderTooltip("El ROI mide el retorno sobre tu inversión publicitaria.")}>
          <div className="cursor-pointer text-slate-500"><FaQuestionCircle /></div>
        </OverlayTrigger>
      </div>

      <Form onSubmit={calcularROI}>
        <Form.Group className="mb-3">
          <Form.Label className="text-slate-300 small d-flex align-items-center">
            Inversión en Ads 
            <OverlayTrigger overlay={renderTooltip("Monto total pagado a Facebook/Google Ads.")}>
              <span className="ms-2"><FaInfoCircle size={12} className="text-blue-400" /></span>
            </OverlayTrigger>
          </Form.Label>
          <Form.Control 
            type="number" className="bg-white/5 border-white/10 text-white p-3" 
            placeholder="$ 0.00" value={inversion} onChange={(e) => setInversion(e.target.value)} required 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-slate-300 small">Ventas Totales</Form.Label>
          <Form.Control 
            type="number" className="bg-white/5 border-white/10 text-white p-3" 
            placeholder="$ 0.00" value={ventas} onChange={(e) => setVentas(e.target.value)} required 
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="text-slate-300 small">Costos Operativos (Envío, Producto)</Form.Label>
          <Form.Control 
            type="number" className="bg-white/5 border-white/10 text-white p-3" 
            placeholder="$ 0.00" value={costos} onChange={(e) => setCostos(e.target.value)} required 
          />
        </Form.Group>

        <Button type="submit" className="btn-powa-primary w-100 py-3 fw-bold">
          CALCULAR RENTABILIDAD
        </Button>
      </Form>

      {resultado && (
        <div className="mt-4 p-4 rounded-4 text-center border border-white/10 bg-black/40 animate-fade-in">
          <h2 className={resultado.esRentable ? 'text-green-400' : 'text-red-400'} style={{fontSize: '2.5rem', fontWeight: 900}}>
            {resultado.roi}%
          </h2>
          <p className="text-white mb-1 fw-bold">Neto: {resultado.ganancia}</p>
          <p className="small text-slate-400 italic mb-3">
             {resultado.esRentable ? "Tu campaña es saludable y genera beneficios." : "Atención: La campaña está operando a pérdida."}
          </p>
          <Button variant="link" className="text-slate-500 text-decoration-none small" onClick={reset}>
            <FaUndo className="me-2" /> REINICIAR
          </Button>
        </div>
      )}
    </Card>
  );
};

export default RoiCalculator;