import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Eye,
  Sliders,
  CheckCircle2,
  Box,
  Layers,
  Palette,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Gift
} from 'lucide-react';
import { PDF_PRODUCT_VISUALS, OFFICIAL_BRAND_BOARD, ProductVisualAssets } from '../data/productVisuals';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface PdfMockupsShowcaseProps {
  onQuickView: (product: Product) => void;
  onCustomize: (product: Product) => void;
  onOpenSizeChart: (category: string) => void;
}

export const PdfMockupsShowcase: React.FC<PdfMockupsShowcaseProps> = ({
  onQuickView,
  onCustomize,
  onOpenSizeChart
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'llaveros' | 'termos' | 'ropa' | 'brandboard'>('all');
  const [selectedMockupId, setSelectedMockupId] = useState<string>('prod-hoodie-wolf-lovers');
  const [viewMode, setViewMode] = useState<'render' | 'specs' | 'packaging'>('render');

  // Find product by ID
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedMockupId) || PRODUCTS[0];
  const selectedVisual = PDF_PRODUCT_VISUALS[selectedMockupId] || PDF_PRODUCT_VISUALS['prod-hoodie-wolf-lovers'];

  // Filter items
  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'all') return !!PDF_PRODUCT_VISUALS[p.id];
    if (activeCategory === 'llaveros') return p.category === 'llaveros';
    if (activeCategory === 'termos') return p.category === 'termos';
    if (activeCategory === 'ropa') return p.category === 'ropa';
    if (activeCategory === 'brandboard') {
      return ['prod-figura-accion-royal', 'prod-stickers-halloween-akame', 'prod-cojin-alebrije-dog', 'prod-playera-editorial-diademuertos'].includes(p.id);
    }
    return true;
  });

  return (
    <section id="pdf-mockups" className="py-16 bg-white border-y border-slate-200/90 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#0B1B3D] text-[#38FFD0] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Visuales Oficiales Extraídos de los PDF</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] tracking-tight">
              Galería de Mockups & Identidad Visual de Marca
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
              Modelos renderizados y especificaciones técnicas tomados directamente de los documentos{' '}
              <strong className="text-[#0B1B3D]">«gifti Club MUKUPS.pdf»</strong> y{' '}
              <strong className="text-[#0B1B3D]">«Guía de Marca e Identidad Visual (Pág. 32 Brand Board)»</strong>.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl self-start md:self-auto text-xs font-bold">
            {[
              { id: 'all', label: 'Todos los Mockups' },
              { id: 'llaveros', label: 'Llaveros (Págs. 2-4)' },
              { id: 'termos', label: 'Vasos Stanley (Págs. 5, 8)' },
              { id: 'ropa', label: 'Hoodies & Ropa (Págs. 1, 18)' },
              { id: 'brandboard', label: 'Brand Board (Pág. 32)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#0B1B3D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1B3D]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Board Banner Highlight (The uploaded image artifact from page 32) */}
        <div className="bg-gradient-to-br from-[#0B1B3D] via-[#112349] to-[#0B1B3D] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#E06A55]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-10 top-6 w-32 h-32 bg-[#38FFD0]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Brand Board description & color chips */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#38FFD0] border border-white/10">
                <Palette className="w-3.5 h-3.5" />
                <span>{OFFICIAL_BRAND_BOARD.subtitle}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                El Universo Visual de Gifti Club
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cada producto ha sido concebido para transmitir el lema de marca{' '}
                <em className="text-[#38FFD0] font-semibold">&ldquo;{OFFICIAL_BRAND_BOARD.tagline}&rdquo;</em>. Combinamos
                diseño contemporáneo, estética streetwear japonesa y tradiciones mexicanas.
              </p>

              {/* Color Swatches */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Paleta Cromática de Marca:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {OFFICIAL_BRAND_BOARD.colors.map((c, idx) => (
                    <div key={idx} className="bg-white/10 p-2 rounded-xl border border-white/10 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-4 h-4 rounded-full border border-white/20 shadow-xs" style={{ backgroundColor: c.hex }} />
                        <span className="font-mono text-[10px] font-bold text-white">{c.hex}</span>
                      </div>
                      <p className="text-[10px] text-slate-300 font-medium truncate">{c.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging System Checklist */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-[#E06A55] shrink-0" />
                  <span>Caja rígida azul noche</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#E06A55] shrink-0" />
                  <span>Listón satinado coral 25mm</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#38FFD0] shrink-0" />
                  <span>Sello de lacre Isotipo G</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#38FFD0] shrink-0" />
                  <span>Tarjeta algodón 300g</span>
                </div>
              </div>
            </div>

            {/* Right: Brand Board Mini Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {OFFICIAL_BRAND_BOARD.featuredMockups.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const match = PRODUCTS.find((p) => p.name.includes(m.name.split(' ')[0]) || p.id.includes(m.name.toLowerCase().split(' ')[0]));
                    if (match) {
                      setSelectedMockupId(match.id);
                    }
                  }}
                  className="group bg-white/5 hover:bg-white/15 border border-white/15 hover:border-[#E06A55] rounded-2xl p-2.5 transition-all cursor-pointer space-y-2 backdrop-blur-xs flex flex-col justify-between"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-black/40 relative">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 right-1.5 bg-[#E06A55] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs">
                      {m.badge}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#38FFD0] font-bold uppercase block">{m.category}</span>
                    <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#38FFD0] transition-colors">
                      {m.name}
                    </h4>
                    <span className="text-[9px] text-slate-400 block mt-0.5">{m.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Mockup Inspector Workstation */}
        <div className="bg-[#F8F9FA] rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E06A55]">
                Inspección Interactiva de Mockup
              </span>
              <h3 className="text-lg font-black text-[#0B1B3D]">
                {selectedProduct.name}
              </h3>
              <p className="text-xs text-slate-500">
                {selectedVisual?.pdfReference} • {selectedVisual?.artStyle}
              </p>
            </div>

            {/* Mode switch */}
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold self-start sm:self-auto">
              <button
                onClick={() => setViewMode('render')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'render'
                    ? 'bg-[#0B1B3D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1B3D]'
                }`}
              >
                Render & Mockup
              </button>
              <button
                onClick={() => setViewMode('specs')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'specs'
                    ? 'bg-[#0B1B3D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1B3D]'
                }`}
              >
                Técnica & Material
              </button>
              <button
                onClick={() => setViewMode('packaging')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'packaging'
                    ? 'bg-[#0B1B3D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1B3D]'
                }`}
              >
                Empaque de Regalo
              </button>
            </div>
          </div>

          {/* Inspector Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Big Mockup Display */}
            <div className="lg:col-span-6 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-md relative group overflow-hidden">
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <span className="absolute top-3 left-3 bg-[#0B1B3D] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {selectedProduct.categoryLabel}
                </span>

                <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#0B1B3D] text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-200 shadow-md">
                  📄 {selectedVisual?.pdfReference}
                </span>
              </div>
            </div>

            {/* Detailed Spec Panel */}
            <div className="lg:col-span-6 space-y-4">
              {viewMode === 'render' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Descripción del Diseño en Mockup:
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium mt-1">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-[#0B1B3D] block">
                      Especificaciones Destacadas del Blueprint:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {selectedVisual?.highlightSpecs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-black text-[#0B1B3D]">
                      ${selectedProduct.price} MXN
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ${selectedProduct.originalPrice} MXN
                      </span>
                    )}
                  </div>
                </div>
              )}

              {viewMode === 'specs' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Material de Fabricación:
                      </span>
                      <p className="text-sm font-bold text-[#0B1B3D] mt-0.5">
                        {selectedVisual?.material}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Técnica de Impresión o Grabado:
                      </span>
                      <p className="text-xs font-semibold text-[#E06A55] mt-0.5">
                        {selectedVisual?.artStyle}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Control de Calidad:
                      </span>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Cada pieza pasa por inspección óptica individual en el taller artesanal de Gifti Club antes de su embalaje.
                      </p>
                    </div>
                  </div>

                  {selectedProduct.category === 'ropa' && (
                    <button
                      type="button"
                      onClick={() => onOpenSizeChart(selectedProduct.category)}
                      className="w-full py-2.5 bg-orange-50 border border-orange-200 text-[#E06A55] rounded-xl text-xs font-bold hover:bg-orange-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Ver Tabla de Medidas Oficial (cm / in)</span>
                    </button>
                  )}
                </div>
              )}

              {viewMode === 'packaging' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0B1B3D]">
                      <Gift className="w-4 h-4 text-[#E06A55]" />
                      <span>Protocolo de Empaque de Lujo Gifti</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedVisual?.packagingDetails}
                    </p>

                    <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl text-xs space-y-1 text-[#0B1B3D]">
                      <p className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#E06A55]" />
                        <span>Experiencia Unboxing Inolvidable</span>
                      </p>
                      <p className="text-[11px] text-slate-600">
                        Listo para obsequiar a esa persona especial sin necesidad de envoltura adicional. Incluye tarjeta con tu dedicatoria personalizada.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions Button Row */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => onQuickView(selectedProduct)}
                  className="flex-1 bg-[#0B1B3D] hover:bg-slate-800 text-white font-extrabold text-xs py-3 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4 text-[#38FFD0]" />
                  <span>Vista Rápida Shopify</span>
                </button>

                <button
                  type="button"
                  onClick={() => onCustomize(selectedProduct)}
                  className="flex-1 bg-[#E06A55] hover:bg-[#c95844] text-white font-extrabold text-xs py-3 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Personalizar en Vivo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnails Carousel to switch mockups */}
          <div className="pt-4 border-t border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Explorar otros mockups del catálogo ({filteredProducts.length} disponibles):
            </span>
            <div className="flex gap-2.5 overflow-x-auto pb-2">
              {filteredProducts.map((p) => {
                const isSelected = p.id === selectedMockupId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedMockupId(p.id)}
                    className={`flex items-center gap-2.5 p-2 rounded-2xl border transition-all shrink-0 text-left ${
                      isSelected
                        ? 'border-[#0B1B3D] bg-white ring-2 ring-[#0B1B3D]/20 shadow-xs'
                        : 'border-slate-200 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="pr-2">
                      <h5 className="text-[11px] font-bold text-[#0B1B3D] max-w-[140px] truncate">
                        {p.name}
                      </h5>
                      <span className="text-[9px] text-[#E06A55] font-semibold block">
                        ${p.price} MXN
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
