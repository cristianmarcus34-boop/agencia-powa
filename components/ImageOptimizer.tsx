'use client';

import React, { useState, ChangeEvent } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { FaDownload, FaUpload, FaRegFileImage } from 'react-icons/fa';

interface Stats {
  originalSize: number;
  newSize: number;
  reduction: string;
}

const ImageOptimizer: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [optimizedImage, setOptimizedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(0.7);
  const [stats, setStats] = useState<Stats>({ originalSize: 0, newSize: 0, reduction: "0" });
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalImage(file);
      setOptimizedImage(null);
      setStats({ originalSize: parseFloat((file.size / 1024).toFixed(2)), newSize: 0, reduction: "0" });
    }
  };

  const optimizeImage = () => {
    if (!originalImage) return;
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(originalImage);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const head = 'data:image/jpeg;base64,';
        const newSizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);
        const newSizeKb = parseFloat((newSizeInBytes / 1024).toFixed(2));
        const reduction = (((stats.originalSize - newSizeKb) / stats.originalSize) * 100).toFixed(1);
        
        setTimeout(() => { // Simulamos proceso para ver el loading
          setOptimizedImage(dataUrl);
          setStats(prev => ({ ...prev, newSize: newSizeKb, reduction }));
          setLoading(false);
        }, 800);
      };
    };
  };

  return (
    <div className="glass-card p-4 rounded-4 border border-white/10 shadow-lg mb-5">
      <Row className="g-4">
        <Col md={6}>
          <div className="upload-zone text-center p-4 border-dashed rounded-3 mb-4 bg-white/5 hover:bg-white/10 transition-all">
            <input type="file" accept="image/*" onChange={handleImageUpload} id="fileInput" hidden />
            <label htmlFor="fileInput" className="w-100 mb-0 cursor-pointer">
              <FaUpload className="mb-2 text-blue-400" size={30} />
              <p className="small text-slate-300 mb-0">
                {originalImage ? originalImage.name : "Subí tu imagen (JPG/PNG)"}
              </p>
            </label>
          </div>

          <Form.Group className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="text-white small fw-bold uppercase">Calidad</label>
              <span className="badge bg-blue-600 rounded-pill">{Math.round(quality * 100)}%</span>
            </div>
            <Form.Range 
              min="0.05" max="1.0" step="0.05" value={quality} 
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="custom-range-powa"
            />
          </Form.Group>

          <Button 
            className="btn-powa-primary w-100 py-3 font-bold" 
            onClick={optimizeImage}
            disabled={!originalImage || loading}
          >
            {loading ? "PROCESANDO..." : "OPTIMIZAR PARA WEB"}
          </Button>
        </Col>

        <Col md={6}>
          {optimizedImage ? (
            <div className="animate-fade-in">
              <div className="d-flex gap-2 mb-3">
                <div className="flex-fill bg-white/5 p-2 rounded border border-white/10 text-center">
                  <span className="d-block small text-muted">Ahorro</span>
                  <strong className="text-green-400">-{stats.reduction}%</strong>
                </div>
                <div className="flex-fill bg-white/5 p-2 rounded border border-white/10 text-center">
                  <span className="d-block small text-muted">Peso</span>
                  <strong className="text-white">{stats.newSize} KB</strong>
                </div>
              </div>
              <div className="preview-container mb-3 border border-white/10 rounded p-1 bg-black/40 text-center">
                <img src={optimizedImage} alt="preview" className="img-fluid rounded" style={{maxHeight: '160px'}} />
              </div>
              <Button as="a" href={optimizedImage} download="powa-optimized.jpg" className="btn-powa-outline-glow w-100 py-2 text-decoration-none">
                <FaDownload className="me-2" /> DESCARGAR
              </Button>
            </div>
          ) : (
            <div className={`preview-placeholder d-flex flex-column align-items-center justify-content-center h-100 border-dashed rounded bg-white/5 ${loading ? 'animate-pulse' : ''}`} style={{minHeight: '250px'}}>
              <FaRegFileImage size={40} className="mb-2 opacity-20 text-white" />
              <p className="small text-slate-500">{loading ? "Comprimiendo assets..." : "Previsualización"}</p>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ImageOptimizer;