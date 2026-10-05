import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { CartItem, CouponDiscount } from '../types';
import { GIFT_WRAPPING_OPTIONS } from '../data/products';

const FREE_SHIPPING_THRESHOLD = 1200;
const STANDARD_SHIPPING_COST = 130;

interface FreeShippingProgress {
  message: string;
  percentage: number;
  amountRemaining: number;
  isQualified: boolean;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, delta: number) => Promise<void>;
  clearCart: () => Promise<void>;
  globalGiftWrap: boolean;
  setGlobalGiftWrap: (wrap: boolean) => void;
  globalGiftNote: string;
  setGlobalGiftNote: (note: string) => void;
  recipientName: string;
  setRecipientName: (name: string) => void;
  appliedCoupon: CouponDiscount | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountTotal: number;
  giftWrapTotal: number;
  shippingCost: number;
  total: number;
  freeShippingProgress: FreeShippingProgress;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gifti_cart');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [globalGiftWrap, setGlobalGiftWrap] = useState(false);
  const [globalGiftNote, setGlobalGiftNote] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponDiscount | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gifti_coupon');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { return null; }
      }
    }
    return null;
  });

  const applyCoupon = (rawCode: string): { success: boolean; message: string } => {
    const code = rawCode.trim().toUpperCase();
    if (!code) {
      return { success: false, message: 'Ingresa un código de cupón' };
    }

    if (code === 'GIFTI10') {
      const coupon: CouponDiscount = {
        code: 'GIFTI10',
        description: '10% de Descuento de Bienvenida en tu compra',
        type: 'percentage',
        value: 10
      };
      setAppliedCoupon(coupon);
      localStorage.setItem('gifti_coupon', JSON.stringify(coupon));
      return { success: true, message: '¡Cupón GIFTI10 aplicado! 10% de descuento activado.' };
    }

    if (code === 'ENVIOGRATIS') {
      const coupon: CouponDiscount = {
        code: 'ENVIOGRATIS',
        description: 'Envío Gratis sin mínimo de compra',
        type: 'shipping',
        value: 130
      };
      setAppliedCoupon(coupon);
      localStorage.setItem('gifti_coupon', JSON.stringify(coupon));
      return { success: true, message: '¡Cupón ENVIOGRATIS aplicado! Envío gratuito garantizado.' };
    }

    if (code === 'MICHIS20') {
      const coupon: CouponDiscount = {
        code: 'MICHIS20',
        description: '20% OFF en Regalos para Amantes de los Gatos',
        type: 'percentage',
        value: 20
      };
      setAppliedCoupon(coupon);
      localStorage.setItem('gifti_coupon', JSON.stringify(coupon));
      return { success: true, message: '¡Cupón MICHIS20 aplicado! 20% de descuento activado.' };
    }

    if (code === 'AMIGOGIFTI') {
      const coupon: CouponDiscount = {
        code: 'AMIGOGIFTI',
        description: '$100 MXN de regalo en tu orden',
        type: 'fixed',
        value: 100
      };
      setAppliedCoupon(coupon);
      localStorage.setItem('gifti_coupon', JSON.stringify(coupon));
      return { success: true, message: '¡Cupón AMIGOGIFTI aplicado! $100 MXN de descuento.' };
    }

    return { success: false, message: 'Código de cupón no válido o expirado.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('gifti_coupon');
  };

  // Persist locally for guests
  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem('gifti_cart', JSON.stringify(items));
    }
  }, [items, currentUser]);

  // Sync with Firestore in real-time when authenticated
  useEffect(() => {
    if (!currentUser) return;

    try {
      const cartColRef = collection(db, 'users', currentUser.uid, 'cart');
      const unsubscribe = onSnapshot(cartColRef, (snapshot) => {
        const cloudItems: CartItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          cloudItems.push({
            id: docSnap.id,
            productId: data.productId,
            title: data.title,
            price: Number(data.price),
            quantity: Number(data.quantity) || 1,
            image: data.image,
            customText: data.customText,
            selectedVariant: data.selectedVariant,
            giftWrap: data.giftWrap,
            giftNote: data.giftNote,
            recipientName: data.recipientName
          });
        });

        // If local items exist on initial login, upload them
        if (cloudItems.length === 0 && items.length > 0) {
          items.forEach(async (it) => {
            const itemRef = doc(db, 'users', currentUser.uid, 'cart', it.id);
            await setDoc(itemRef, {
              ...it,
              userId: currentUser.uid,
              updatedAt: new Date().toISOString()
            });
          });
        } else {
          setItems(cloudItems);
        }
      }, (error) => {
        console.warn('Error reading real-time cart:', error);
      });

      return () => unsubscribe();
    } catch (err) {
      console.warn('Could not bind cloud cart snapshot:', err);
    }
  }, [currentUser]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addItem = async (newItemData: Omit<CartItem, 'id'>) => {
    const existingIndex = items.findIndex(
      (it) => it.productId === newItemData.productId &&
              it.customText === newItemData.customText &&
              it.selectedVariant === newItemData.selectedVariant
    );

    let updatedList: CartItem[];

    if (existingIndex > -1) {
      updatedList = items.map((it, idx) =>
        idx === existingIndex ? { ...it, quantity: it.quantity + newItemData.quantity } : it
      );
      const existingItem = updatedList[existingIndex];
      if (currentUser) {
        try {
          const itemRef = doc(db, 'users', currentUser.uid, 'cart', existingItem.id);
          await setDoc(itemRef, {
            ...existingItem,
            userId: currentUser.uid,
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (e) {
          console.warn('Could not sync cart item update to cloud:', e);
        }
      }
    } else {
      const generatedId = `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      const cartItem: CartItem = {
        ...newItemData,
        id: generatedId
      };
      updatedList = [cartItem, ...items];

      if (currentUser) {
        try {
          const itemRef = doc(db, 'users', currentUser.uid, 'cart', generatedId);
          await setDoc(itemRef, {
            ...cartItem,
            userId: currentUser.uid,
            updatedAt: new Date().toISOString()
          });
        } catch (e) {
          console.warn('Could not sync new cart item to cloud:', e);
        }
      }
    }

    setItems(updatedList);
    setIsCartOpen(true);
  };

  const removeItem = async (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    if (currentUser) {
      try {
        const itemRef = doc(db, 'users', currentUser.uid, 'cart', id);
        await deleteDoc(itemRef);
      } catch (e) {
        console.warn('Could not delete cart item from cloud:', e);
      }
    }
  };

  const updateQuantity = async (id: string, delta: number) => {
    const target = items.find((it) => it.id === id);
    if (!target) return;

    const newQty = target.quantity + delta;
    if (newQty <= 0) {
      await removeItem(id);
      return;
    }

    const updated = items.map((it) => (it.id === id ? { ...it, quantity: newQty } : it));
    setItems(updated);

    if (currentUser) {
      try {
        const itemRef = doc(db, 'users', currentUser.uid, 'cart', id);
        await setDoc(itemRef, { quantity: newQty, updatedAt: new Date().toISOString() }, { merge: true });
      } catch (e) {
        console.warn('Could not update quantity in cloud:', e);
      }
    }
  };

  const clearCart = async () => {
    const ids = items.map((i) => i.id);
    setItems([]);
    localStorage.removeItem('gifti_cart');

    if (currentUser) {
      for (const id of ids) {
        try {
          const itemRef = doc(db, 'users', currentUser.uid, 'cart', id);
          await deleteDoc(itemRef);
        } catch (e) {
          // ignore
        }
      }
    }
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const giftWrapTotal = globalGiftWrap ? GIFT_WRAPPING_OPTIONS.price : 0;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || appliedCoupon?.type === 'shipping';
  const shippingCost = items.length === 0 ? 0 : (isFreeShipping ? 0 : STANDARD_SHIPPING_COST);

  // Calculate coupon discount
  let discountTotal = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discountTotal = (subtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === 'fixed') {
      discountTotal = Math.min(subtotal, appliedCoupon.value);
    }
  }

  const total = Math.max(0, subtotal - discountTotal + giftWrapTotal + shippingCost);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Dynamic Free Shipping Progress Bar Algorithm from blueprint
  const amountRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const percentageComplete = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const freeShippingProgress: FreeShippingProgress = (amountRemaining > 0 && appliedCoupon?.type !== 'shipping')
    ? {
        message: `Te faltan $${amountRemaining.toFixed(2)} MXN para obtener ¡Envío Gratis!`,
        percentage: percentageComplete,
        amountRemaining,
        isQualified: false
      }
    : {
        message: '¡Felicidades! Tienes Envío Gratis garantizado 🎉',
        percentage: 100,
        amountRemaining: 0,
        isQualified: true
      };

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        globalGiftWrap,
        setGlobalGiftWrap,
        globalGiftNote,
        setGlobalGiftNote,
        recipientName,
        setRecipientName,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountTotal,
        giftWrapTotal,
        shippingCost,
        total,
        freeShippingProgress,
        totalCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
