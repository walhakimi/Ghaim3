/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { CartDrawer } from './components/CartDrawer';
import { PerfumeDetailModal } from './components/PerfumeDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { BrandStory } from './components/BrandStory';
import { RoyalExperience } from './components/RoyalExperience';
import { Footer } from './components/Footer';

import { PERFUMES } from './data/perfumes';
import { Perfume, PerfumeVariant, CartItem, OrderReceipt } from './types/perfume';

const CART_STORAGE_KEY = 'ghaim_perfumes_cart';

export default function App() {
  // Cart items state with persistent local storage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    // Default initial cart: Amber Privée 50ml to immediately show an engaging experience
    const initialPerfume = PERFUMES[0];
    return [
      {
        cartItemId: `${initialPerfume.id}-${initialPerfume.variants[0].id}`,
        perfume: initialPerfume,
        variant: initialPerfume.variants[0],
        quantity: 1,
      },
    ];
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // UI Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPerfumeForDetail, setSelectedPerfumeForDetail] = useState<Perfume | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState<OrderReceipt | null>(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Discount / Coupon state
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Handlers for cart
  const handleAddToCart = (perfume: Perfume, variant: PerfumeVariant) => {
    const cartItemId = `${perfume.id}-${variant.id}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { cartItemId, perfume, variant, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleApplyDiscount = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GHAIM10' || clean === 'GHAIM' || clean === 'GHIAM' || clean === 'GHIAM10' || clean === 'VELUNE10') {
      setDiscountCode('GHAIM10');
      setDiscountPercent(10);
      return true;
    }
    if (clean === 'GOLD' || clean === 'VIP') {
      setDiscountCode('GOLD');
      setDiscountPercent(15);
      return true;
    }
    return false;
  };

  const handleNavigateSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (receipt: OrderReceipt) => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setDiscountCode('');
    setDiscountPercent(0);
    setCompletedReceipt(receipt);
  };

  // Calculations for checkout
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.variant.priceSAR * item.quantity,
    0
  );
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shipping = subtotal >= 400 || cartItems.length === 0 ? 0 : 35;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#eae5d9] selection:bg-[#c5a059]/30 selection:text-[#f8f5ee]">
      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateSection={handleNavigateSection}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Step 1: Visual Identity & Hero Banner */}
        <Hero
          onExploreCatalog={() => handleNavigateSection('catalog')}
          onSelectFeatured={() => setSelectedPerfumeForDetail(PERFUMES[0])}
        />

        {/* Step 2: Perfumes Catalog & Filters */}
        <Catalog
          perfumes={PERFUMES}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddToCart={handleAddToCart}
          onViewDetails={(p) => setSelectedPerfumeForDetail(p)}
        />

        {/* Brand Story & Philosophy */}
        <BrandStory />

        {/* Royal Guarantees & Experience */}
        <RoyalExperience />
      </main>

      {/* Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Step 3: Interactive Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        discountCode={discountCode}
        discountPercent={discountPercent}
        onApplyDiscount={handleApplyDiscount}
      />

      {/* Product Detail Modal */}
      <PerfumeDetailModal
        perfume={selectedPerfumeForDetail}
        onClose={() => setSelectedPerfumeForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Step 4: Multi-Payment Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discount={discountAmount}
        discountCode={discountCode}
        shipping={shipping}
        total={grandTotal}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Success & Invoice Modal */}
      <OrderSuccessModal
        receipt={completedReceipt}
        onClose={() => setCompletedReceipt(null)}
      />
    </div>
  );
}
