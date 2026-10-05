import React, { useState } from 'react';
import { X, Ruler, Check, Info, Sparkles } from 'lucide-react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({
  isOpen,
  onClose,
  category = 'hoodie'
}) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [apparelType, setApparelType] = useState<'hoodie' | 'tshirt'>(
    category.includes('taza') || category.includes('llavero') ? 'tshirt' : 'hoodie'
  );

  if (!isOpen) return null;

  const toInches = (valCm: number) => (valCm / 2.54).toFixed(1);

  const hoodieSizes = [
    { size: 'CH (S)', chest: 54, length: 68, sleeve: 62 },
    { size: 'M (M)', chest: 57, length: 71, sleeve: 64 },
    { size: 'G (L)', chest: 60, length: 74, sleeve: 66 },
    { size: 'XG (XL)', chest: 64, length: 77, sleeve: 68 },
    { size: '2XG (XXL)', chest: 68, length: 80, sleeve: 70 },
  ];

  const tshirtSizes = [
    { size: 'CH (S)', chest: 48, length: 69, sleeve: 20 },
    { size: 'M (M)', chest: 52, length: 72, sleeve: 21 },
    { size: 'G (L)', chest: 56, length: 75, sleeve: 22 },
    { size: 'XG (XL)', chest: 60, length: 78, sleeve: 23 },
    { size: '2XG (XXL)', chest: 64, length: 81, sleeve: 24 },
  ];

  const activeSizes = apparelType === 'hoodie' ? hoodieSizes : tshirtSizes;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Click outside backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-transparent" />

      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 relative z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#0B1B3D] text-[#38FFD0] rounded-xl">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#0B1B3D]">
                Guía de Tallas & Medidas Oficiales
              </h2>
              <p className="text-xs text-slate-500">
                Textiles Gifti Club México (Algodón 100% Peinado)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Garment Selector & Units Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setApparelType('hoodie')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  apparelType === 'hoodie'
                    ? 'bg-[#0B1B3D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1B3D]'
                }`}
              >
                Sudaderas & Hoodies (320g)
              </button>
              <button
                type="button"
                onClick={() => setApparelType('tshirt')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  apparelType === 'tshirt'
                    ? 'bg-[#0B1B3D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1B3D]'
                }`}
              >
                Playeras Streetwear (200g)
              </button>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  unit === 'cm' ? 'bg-white text-[#0B1B3D] shadow-xs' : 'text-slate-500'
                }`}
              >
                Centímetros (cm)
              </button>
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  unit === 'in' ? 'bg-white text-[#0B1B3D] shadow-xs' : 'text-slate-500'
                }`}
              >
                Pulgadas (in)
              </button>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0B1B3D] text-white font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Talla</th>
                  <th className="p-3">Ancho Pecho ({unit})</th>
                  <th className="p-3">Largo Total ({unit})</th>
                  <th className="p-3">Largo Manga ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {activeSizes.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-[#0B1B3D]">{row.size}</td>
                    <td className="p-3">{unit === 'cm' ? `${row.chest} cm` : `${toInches(row.chest)} in`}</td>
                    <td className="p-3">{unit === 'cm' ? `${row.length} cm` : `${toInches(row.length)} in`}</td>
                    <td className="p-3">{unit === 'cm' ? `${row.sleeve} cm` : `${toInches(row.sleeve)} in`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recommendation Box */}
          <div className="bg-orange-50/50 border border-orange-200 p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#0B1B3D]">
              <Sparkles className="w-4 h-4 text-[#E06A55]" />
              <span>¿Cómo elegir tu talla ideal?</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              • <strong>Hoodies:</strong> Tienen un calce holgado y relajado (*streetwear regular/oversize*). Si te gusta ajustado al cuerpo, pide una talla menos a tu habitual.
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              • <strong>Playeras:</strong> Algodón peinado pre-encogido de 200gsm. No encoge al lavarse con agua fría.
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              • <strong>¿Cómo medirte?</strong> Coloca tu playera o sudadera favorita extendida sobre una superficie plana y mide de axila a axila para obtener el ancho del pecho.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-[#F8F9FA] text-right">
          <button
            onClick={onClose}
            className="bg-[#0B1B3D] text-white text-xs font-bold py-2.5 px-6 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Entendido, volver a comprar
          </button>
        </div>
      </div>
    </div>
  );
};
