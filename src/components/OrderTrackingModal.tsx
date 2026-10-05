import React, { useState } from 'react';
import {
  X,
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  Gift,
  Sparkles,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { TrackingOrder } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

const MOCK_TRACKING_DATABASE: Record<string, TrackingOrder> = {
  'ORD-MX-849102': {
    orderId: 'ORD-MX-849102',
    trackingNumber: 'GFT-FEDEX-94820194',
    carrier: 'FedEx México',
    customerName: 'Mariana González',
    status: 'transito',
    currentStep: 4,
    estimatedDelivery: 'Mañana antes de las 18:00 hrs',
    origin: 'Centro Artesanal Gifti Club, Benito Juárez, CDMX',
    destination: 'Col. Providencia, Guadalajara, JAL (CP 44100)',
    itemsSummary: '1x Llavero Madera Axolotl Gamer ("ALEX") + Empaque de Regalo',
    history: [
      {
        title: 'Pedido Confirmado & Pago Aprobado',
        description: 'Pago procesado exitosamente vía Tarjeta de Crédito (MSI).',
        time: '04 Oct, 09:15 hrs',
        completed: true
      },
      {
        title: 'Grabado Láser en Taller Artesanal',
        description: 'La madera de haya fue calibrada e inspeccionada con grabado a 1200 DPI.',
        time: '04 Oct, 13:40 hrs',
        completed: true
      },
      {
        title: 'Empaque de Lujo & Tarjeta con Dedicatoria',
        description: 'Caja rígida azul noche, lazo coral satín y sello de cera isotipo Gifti.',
        time: '04 Oct, 16:20 hrs',
        completed: true
      },
      {
        title: 'En Tránsito con FedEx Express',
        description: 'Paquete recolectado y en ruta hacia el centro de distribución en Guadalajara.',
        time: '04 Oct, 19:10 hrs',
        completed: true
      },
      {
        title: 'Entregado en Domicilio',
        description: 'Entrega final con acuse de recibo y firma.',
        time: 'Estimado 05 Oct, 16:00 hrs',
        completed: false
      }
    ]
  },
  'ORD-MX-592810': {
    orderId: 'ORD-MX-592810',
    trackingNumber: 'GFT-DHL-38194012',
    carrier: 'DHL Express',
    customerName: 'Carlos Mendoza',
    status: 'taller',
    currentStep: 2,
    estimatedDelivery: 'Miércoles 07 de Octubre',
    origin: 'Centro Artesanal Gifti Club, CDMX',
    destination: 'San Pedro Garza García, Monterrey, NL (CP 66220)',
    itemsSummary: '1x Termo Stanley 40oz Día de los Muertos Husky ("KODA")',
    history: [
      {
        title: 'Pedido Confirmado & Pago OXXO Pay',
        description: 'Pago en efectivo confirmado en caja OXXO.',
        time: '04 Oct, 14:00 hrs',
        completed: true
      },
      {
        title: 'Grabado UV & Detallado en Taller',
        description: 'Artesano aplicando técnica de grabado permanente en vaso térmico 40oz.',
        time: '04 Oct, 17:30 hrs',
        completed: true
      },
      {
        title: 'Empaque de Lujo',
        description: 'Preparación de caja de regalo y protección acolchada.',
        time: 'Pendiente',
        completed: false
      },
      {
        title: 'En Tránsito',
        description: 'Recolección programada con DHL Express.',
        time: 'Pendiente',
        completed: false
      },
      {
        title: 'Entregado',
        description: 'Entrega a domicilio.',
        time: 'Pendiente',
        completed: false
      }
    ]
  }
};

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialOrderId
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderId || 'ORD-MX-849102');
  const [activeOrder, setActiveOrder] = useState<TrackingOrder | null>(
    MOCK_TRACKING_DATABASE[initialOrderId || 'ORD-MX-849102'] || null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const query = searchInput.trim().toUpperCase();

    // Check exact or match tracking
    const found = Object.values(MOCK_TRACKING_DATABASE).find(
      (o) => o.orderId.toUpperCase() === query || o.trackingNumber.toUpperCase() === query
    );

    if (found) {
      setActiveOrder(found);
    } else {
      // Dynamic fallback for any order ID the user typed (like one they just created)
      if (query.startsWith('ORD-') || query.startsWith('GFT-')) {
        setActiveOrder({
          orderId: query,
          trackingNumber: `GFT-FEDEX-${Math.floor(10000000 + Math.random() * 90000000)}`,
          carrier: 'FedEx México',
          customerName: 'Cliente Gifti',
          status: 'taller',
          currentStep: 2,
          estimatedDelivery: 'En 2 a 3 días hábiles',
          origin: 'Centro de Distribución Gifti Club México',
          destination: 'Dirección registrada en pedido',
          itemsSummary: 'Regalos Personalizados Curados Gifti Club',
          history: [
            {
              title: 'Pedido Confirmado & Pago Aprobado',
              description: 'Tu pedido ha entrado al sistema y se ha validado la transacción.',
              time: 'Hoy, Reciente',
              completed: true
            },
            {
              title: 'Personalización en Taller Artesanal',
              description: 'Nuestros grabadores preparan tu diseño en madera/metal.',
              time: 'En proceso',
              completed: true
            },
            {
              title: 'Empaque de Lujo con Listón y Sello',
              description: 'Control de calidad y embalaje protector.',
              time: 'Próximamente',
              completed: false
            },
            {
              title: 'En Tránsito con Paquetería',
              description: 'Asignación de guía y traslado.',
              time: 'Próximamente',
              completed: false
            },
            {
              title: 'Entrega en Domicilio',
              description: 'Entrega final.',
              time: 'Próximamente',
              completed: false
            }
          ]
        });
      } else {
        setErrorMsg('No encontramos un pedido con ese código. Prueba con ORD-MX-849102 o ORD-MX-592810.');
      }
    }
  };

  const steps = [
    { num: 1, label: 'Confirmado', icon: <CheckCircle2 className="w-4 h-4" /> },
    { num: 2, label: 'En Taller', icon: <Sparkles className="w-4 h-4" /> },
    { num: 3, label: 'Empaque', icon: <Gift className="w-4 h-4" /> },
    { num: 4, label: 'En Tránsito', icon: <Truck className="w-4 h-4" /> },
    { num: 5, label: 'Entregado', icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Click outside backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-transparent" />

      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-[#0B1B3D] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-2xl">
              <Truck className="w-6 h-6 text-[#38FFD0]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#38FFD0] tracking-widest">
                Seguimiento en Tiempo Real
              </span>
              <h2 className="text-lg font-black text-white">
                Rastreador de Pedidos Gifti Club
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Search Bar Form */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-bold text-[#0B1B3D]">
              Ingresa tu Número de Pedido o Guía de Envío:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  required
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Ej. ORD-MX-849102 o GFT-FEDEX-94820194"
                  className="w-full pl-10 pr-4 py-2.5 text-xs font-bold bg-[#F8F9FA] border border-slate-300 rounded-2xl focus:ring-2 focus:ring-[#E06A55] text-[#0B1B3D]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="bg-[#E06A55] hover:bg-[#c95844] text-white text-xs font-bold px-5 py-2.5 rounded-2xl shadow-xs hover:shadow-md transition-all shrink-0"
              >
                Rastrear
              </button>
            </div>

            {/* Quick Demo Chips */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
              <span>Probar órdenes demo:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchInput('ORD-MX-849102');
                  setActiveOrder(MOCK_TRACKING_DATABASE['ORD-MX-849102']);
                  setErrorMsg(null);
                }}
                className="text-[#E06A55] hover:underline font-bold"
              >
                ORD-MX-849102 (En Tránsito)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setSearchInput('ORD-MX-592810');
                  setActiveOrder(MOCK_TRACKING_DATABASE['ORD-MX-592810']);
                  setErrorMsg(null);
                }}
                className="text-[#E06A55] hover:underline font-bold"
              >
                ORD-MX-592810 (En Taller)
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 font-medium">
                {errorMsg}
              </p>
            )}
          </form>

          {activeOrder && (
            <div className="space-y-6 animate-fadeIn">
              {/* Status Header Card */}
              <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Paquetería Asignada:
                    </span>
                    <p className="text-sm font-extrabold text-[#0B1B3D] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#E06A55]" />
                      <span>{activeOrder.carrier}</span>
                      <span className="font-mono text-xs font-normal text-slate-500">
                        ({activeOrder.trackingNumber})
                      </span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Entrega Estimada:
                    </span>
                    <p className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                      {activeOrder.estimatedDelivery}
                    </p>
                  </div>
                </div>

                {/* 5-Stage Step Bar */}
                <div>
                  <div className="grid grid-cols-5 gap-1 text-center relative mb-2">
                    {steps.map((st) => {
                      const isDone = st.num <= activeOrder.currentStep;
                      const isCurrent = st.num === activeOrder.currentStep;
                      return (
                        <div key={st.num} className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                              isDone
                                ? 'bg-[#0B1B3D] text-[#38FFD0]'
                                : 'bg-slate-200 text-slate-400'
                            } ${isCurrent ? 'ring-4 ring-[#E06A55]/30 bg-[#E06A55] text-white scale-110' : ''}`}
                          >
                            {st.icon}
                          </div>
                          <span
                            className={`text-[10px] mt-1 font-bold ${
                              isDone ? 'text-[#0B1B3D]' : 'text-slate-400'
                            }`}
                          >
                            {st.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress Line */}
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#0B1B3D] via-[#E06A55] to-emerald-500 h-full transition-all duration-700"
                      style={{ width: `${(activeOrder.currentStep / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Items & Route Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Destino:</span>
                  <p className="font-semibold text-slate-800 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#E06A55] shrink-0 mt-0.5" />
                    <span>{activeOrder.destination}</span>
                  </p>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Artículos del Pedido:</span>
                  <p className="font-semibold text-slate-800 flex items-start gap-1">
                    <Package className="w-3.5 h-3.5 text-[#0B1B3D] shrink-0 mt-0.5" />
                    <span>{activeOrder.itemsSummary}</span>
                  </p>
                </div>
              </div>

              {/* Detailed Timeline History */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider">
                  Historial de Movimientos de Taller y Envíos:
                </h4>
                <div className="border-l-2 border-slate-200 pl-4 space-y-4 ml-2">
                  {activeOrder.history.map((h, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className={`absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                          h.completed ? 'bg-emerald-500 shadow-xs' : 'bg-slate-300'
                        }`}
                      />
                      <div className="flex items-baseline justify-between text-xs">
                        <span className={`font-bold ${h.completed ? 'text-[#0B1B3D]' : 'text-slate-400'}`}>
                          {h.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {h.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {h.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-[#F8F9FA] flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href="https://wa.me/525512345678?text=Hola%20Gifti%20Club,%20tengo%20una%20consulta%20sobre%20mi%20pedido"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 hover:underline"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>¿Dudas con la entrega? Escríbenos por WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#0B1B3D] text-white text-xs font-bold py-2.5 px-6 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Cerrar Rastreo
          </button>
        </div>
      </div>
    </div>
  );
};
