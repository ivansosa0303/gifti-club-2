import React, { useState, useMemo } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { NotificationProvider } from './context/NotificationContext';
import { FreeShippingBar } from './components/FreeShippingBar';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ValueProps } from './components/ValueProps';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { GiftCustomizerModal } from './components/GiftCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { UserAccountModal } from './components/UserAccountModal';
import { WishlistModal } from './components/WishlistModal';
import { GiftBuilderSection } from './components/GiftBuilderSection';
import { PdfMockupsShowcase } from './components/PdfMockupsShowcase';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SizeChartModal } from './components/SizeChartModal';
import { OxxoPaySlipModal } from './components/OxxoPaySlipModal';
import { SocialProof } from './components/SocialProof';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, Order } from './types';
import { Sparkles, MessageCircle, Eye, Truck, Ruler, FileText } from 'lucide-react';

function GiftiApp() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // 5 Obvious & Mandatory Features Modals State
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | undefined>(undefined);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [sizeChartCategory, setSizeChartCategory] = useState<string | undefined>('hoodie');
  const [oxxoSlipOrder, setOxxoSlipOrder] = useState<Order | null>(null);

  // Handlers
  const handleOpenTracking = (orderId?: string) => {
    setTrackingOrderId(orderId);
    setIsTrackingOpen(true);
  };

  const handleOpenSizeChart = (category?: string) => {
    setSizeChartCategory(category || 'hoodie');
    setIsSizeChartOpen(true);
  };

  const handleOpenOxxoSlip = (order: Order) => {
    setOxxoSlipOrder(order);
  };

  const scrollToPdfMockups = () => {
    const el = document.getElementById('pdf-mockups');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'todos') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured default order
        break;
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const scrollToBuilder = () => {
    const el = document.getElementById('gift-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#0B1B3D]">
      {/* Dynamic Top Free Shipping Progress Bar */}
      <FreeShippingBar />

      {/* Main Sticky Navbar with fast links */}
      <Navbar
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenGiftBuilder={scrollToBuilder}
        onOpenTracking={() => handleOpenTracking()}
        onOpenSizeChart={() => handleOpenSizeChart()}
        onOpenPdfShowcase={scrollToPdfMockups}
      />

      {/* Main Hero Banner */}
      <HeroBanner
        onExplore={scrollToCatalog}
        onOpenGiftBuilder={scrollToBuilder}
      />

      {/* 4-Column Value Propositions */}
      <ValueProps />

      {/* Dynamic Product Catalog Section */}
      <main id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex-1 w-full space-y-8">
        {/* Category & Sorting Controls Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E06A55] animate-ping" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1B3D]">
                {selectedCategory === 'todos'
                  ? 'Colección Exclusiva de Regalos'
                  : PRODUCTS.find((p) => p.category === selectedCategory)?.categoryLabel || 'Regalos Curados'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Mostrando {filteredProducts.length} regalos con personalización artesanal y empaques de lujo
            </p>
          </div>

          {/* Category Pills & Sort dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'llaveros', label: 'Llaveros' },
                { id: 'termos', label: 'Vasos Stanley' },
                { id: 'ropa', label: 'Hoodies' },
                { id: 'cuadros', label: 'Ofrendas' },
                { id: 'gaming', label: 'Gamer' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all shrink-0 ${
                    selectedCategory === c.id
                      ? 'bg-[#0B1B3D] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-full px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#E06A55]"
              >
                <option value="featured">Destacados</option>
                <option value="price-low">Menor Precio</option>
                <option value="price-high">Mayor Precio</option>
                <option value="rating">Mejor Calificados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feature Banner: 5 Must-Haves & PDF Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            onClick={scrollToPdfMockups}
            className="cursor-pointer bg-gradient-to-r from-[#0B1B3D] to-[#162a56] text-white rounded-2xl p-3.5 px-4 flex items-center justify-between gap-3 shadow-md hover:scale-[1.01] transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-white/10 text-[#38FFD0] rounded-xl">
                <FileText className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-black">Visuales Oficiales de los PDF</h4>
                <p className="text-[11px] text-slate-300">Mockups Wolf Lovers, Stanley 40oz y Brand Board</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#38FFD0] bg-white/10 px-2.5 py-1 rounded-full border border-white/20 shrink-0">
              Ver Galería →
            </span>
          </div>

          <div
            onClick={() => handleOpenTracking()}
            className="cursor-pointer bg-white border border-slate-200 rounded-2xl p-3.5 px-4 flex items-center justify-between gap-3 shadow-xs hover:border-[#E06A55] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-orange-50 text-[#E06A55] rounded-xl">
                <Truck className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-black text-[#0B1B3D]">Rastreo en Tiempo Real</h4>
                <p className="text-[11px] text-slate-500">Sigue tu paquete con guía FedEx o DHL México</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#E06A55] bg-orange-50 px-2 py-0.5 rounded-full shrink-0">
              Rastrear
            </span>
          </div>

          <div
            onClick={() => handleOpenSizeChart()}
            className="cursor-pointer bg-white border border-slate-200 rounded-2xl p-3.5 px-4 flex items-center justify-between gap-3 shadow-xs hover:border-[#0B1B3D] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-slate-100 text-[#0B1B3D] rounded-xl">
                <Ruler className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-black text-[#0B1B3D]">Guía Oficial de Tallas</h4>
                <p className="text-[11px] text-slate-500">Medidas exactas en cm e in para Hoodies y Playeras</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
              Ver Guía
            </span>
          </div>
        </div>

        {/* Product Grid: 2x4 on mobile / 4x1 on desktop per blueprint */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <p className="text-sm font-bold text-[#0B1B3D]">No encontramos regalos que coincidan con tu búsqueda.</p>
            <p className="text-xs text-slate-500">Intenta buscando con otra palabra o revisa nuestras categorías completas.</p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="bg-[#0B1B3D] text-white text-xs font-bold py-2 px-5 rounded-full hover:bg-slate-800 transition-all"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onCustomize={(p) => setCustomizingProduct(p)}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </main>

      {/* OFFICIAL PDF MOCKUPS & VISUAL ASSETS SHOWCASE */}
      <PdfMockupsShowcase
        onQuickView={(p) => setQuickViewProduct(p)}
        onCustomize={(p) => setCustomizingProduct(p)}
        onOpenSizeChart={(cat) => handleOpenSizeChart(cat)}
      />

      {/* Gift Builder Step-by-Step Module */}
      <GiftBuilderSection />

      {/* Social Proof & Testimonials */}
      <SocialProof />

      {/* Footer with fast access links */}
      <Footer
        onOpenTracking={() => handleOpenTracking()}
        onOpenSizeChart={() => handleOpenSizeChart()}
        onOpenPdfShowcase={scrollToPdfMockups}
      />

      {/* Modals & Slide-outs */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenFullCustomizer={(p) => {
          setQuickViewProduct(null);
          setCustomizingProduct(p);
        }}
        onOpenSizeChart={(cat) => handleOpenSizeChart(cat)}
      />

      <GiftCustomizerModal
        product={customizingProduct}
        onClose={() => setCustomizingProduct(null)}
        onOpenSizeChart={(cat) => handleOpenSizeChart(cat)}
      />

      <CartDrawer
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOpenOxxoSlip={(order) => handleOpenOxxoSlip(order)}
        onOpenOrderTracking={(orderId) => handleOpenTracking(orderId)}
      />

      <NotificationCenterModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <UserAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onOpenOrderTracking={(orderId) => handleOpenTracking(orderId)}
        onOpenOxxoSlip={(order) => handleOpenOxxoSlip(order)}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onCustomize={(p) => setCustomizingProduct(p)}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrderId={trackingOrderId}
      />

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        category={sizeChartCategory}
      />

      {/* OXXO Pay Slip Modal */}
      <OxxoPaySlipModal
        isOpen={!!oxxoSlipOrder}
        onClose={() => setOxxoSlipOrder(null)}
        order={oxxoSlipOrder}
      />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/525512345678?text=Hola%20Gifti%20Club,%20quisiera%20ayuda%20para%20personalizar%20un%20regalo"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-30 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        title="¿Dudas con tu regalo? Escríbenos a WhatsApp"
        aria-label="WhatsApp Asistencia"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          ¿Ayuda con tu regalo?
        </span>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <WishlistProvider>
            <GiftiApp />
          </WishlistProvider>
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
