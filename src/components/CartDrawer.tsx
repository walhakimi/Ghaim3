import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Sparkles, Check } from 'lucide-react';
import { CartItem } from '../types/perfume';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  discountCode: string;
  discountPercent: number;
  onApplyDiscount: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountCode,
  discountPercent,
  onApplyDiscount,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  // Financial calculations
  const subtotal = items.reduce((acc, item) => acc + item.variant.priceSAR * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const freeShippingThreshold = 400;
  const isFreeShipping = subtotal >= freeShippingThreshold || items.length === 0;
  const shippingCost = isFreeShipping ? 0 : 35;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = onApplyDiscount(couponInput.trim());
    if (success) {
      setCouponMessage({ text: 'تم تطبيق كود الخصم الفاخر بنجاح!', isError: false });
    } else {
      setCouponMessage({ text: 'كود الخصم غير صالح. جرّب GHAIM10 أو GOLD', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#11100f] border-l border-[#2e2920] shadow-2xl flex flex-col text-right">
          {/* Header */}
          <div className="p-5 border-b border-[#26221a] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h2 className="text-base font-bold text-[#faf7f0]">
                حقيبة العطور الخاصة
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#201d16] text-[#c5a059] tabular-nums">
                {items.reduce((sum, item) => sum + item.quantity, 0)} قطعة
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9e9483] hover:text-[#faf7f0] hover:bg-[#1f1d19] transition-colors cursor-pointer"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          {items.length > 0 && (
            <div className="px-5 py-3 bg-[#171512] border-b border-[#25221b]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#a49b8c]">
                  {isFreeShipping ? (
                    <span className="text-[#96dfa4] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                      مبارك! مؤهل للشحن الملكي المجاني
                    </span>
                  ) : (
                    <span>
                      أضف بقيمة <strong className="text-[#d4af37] tabular-nums font-mono">{freeShippingThreshold - subtotal} ر.س</strong> للشحن المجاني
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-[#8e8574]">400 ر.س</span>
              </div>
              <div className="w-full h-1.5 bg-[#25221b] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-[#d4af37] to-[#aa7c11] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1c1a17] text-[#c5a059] flex items-center justify-center border border-[#302a20]">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#faf7f0]">حقيبة التسوق فارغة</h3>
                  <p className="text-xs text-[#8c8272] mt-1 max-w-xs">
                    استكشف توليفاتنا النادرة من العود والعنبر وأضف عطرك المفضل الآن.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="gold-button px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  تصفح كتالوج العطور
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-[#171614] border border-[#2b271f] relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#0c0b0a] flex-shrink-0 border border-[#332e24]">
                    <img
                      src={item.perfume.image}
                      alt={item.perfume.nameAr}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info & Controls */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-[#faf7f0] leading-snug">
                          {item.perfume.nameAr}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-[#7d7465] hover:text-[#f87171] p-1 transition-colors cursor-pointer"
                          title="حذف من السلة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#8e8574] mt-0.5 flex items-center gap-2">
                        <span>الحجم: {item.variant.name}</span>
                        <span>·</span>
                        <span>{item.perfume.concentration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-[#11100f] border border-[#332e24] rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 text-[#a59b8b] hover:text-[#faf7f0] cursor-pointer"
                          aria-label="إنقاص الكمية"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#faf7f0] tabular-nums font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 text-[#a59b8b] hover:text-[#faf7f0] cursor-pointer"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Item Total Price */}
                      <div className="text-left">
                        <span className="text-sm font-bold text-[#f7e6be] font-mono tabular-nums">
                          {item.variant.priceSAR * item.quantity}
                        </span>
                        <span className="text-[11px] text-[#c5a059] mr-1">ر.س</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 bg-[#141311] border-t border-[#26221b] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="كود الخصم (مثال: GHAIM10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-[#1a1917] border border-[#332e24] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-[#faf7f0] placeholder-[#7d7465] focus:outline-none"
                    />
                    <Tag className="w-3.5 h-3.5 text-[#7d7465] absolute left-3 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#25221b] hover:bg-[#342f24] text-xs font-bold text-[#d4af37] border border-[#443c2c] rounded-xl transition-colors cursor-pointer"
                  >
                    تطبيق
                  </button>
                </div>

                {couponMessage && (
                  <p
                    className={`text-[11px] ${
                      couponMessage.isError ? 'text-[#f87171]' : 'text-[#96dfa4]'
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}
              </form>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 text-xs pt-1 border-t border-[#23201a]">
                <div className="flex items-center justify-between text-[#a09787]">
                  <span>المجموع الفرعي</span>
                  <span className="font-mono tabular-nums font-semibold text-[#ded7c8]">
                    {subtotal} ر.س
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex items-center justify-between text-[#96dfa4]">
                    <span>خصم خاص ({discountCode}) - {discountPercent}%</span>
                    <span className="font-mono tabular-nums font-semibold">
                      -{discountAmount} ر.س
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[#a09787]">
                  <span>الشحن والتوصيل</span>
                  <span className="font-semibold">
                    {isFreeShipping ? (
                      <span className="text-[#96dfa4]">شحن ملكي مجاني</span>
                    ) : (
                      <span className="font-mono tabular-nums text-[#ded7c8]">35 ر.س</span>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm font-bold text-[#faf7f0] pt-2 border-t border-[#28241d]">
                  <span>المجموع الكلي النهائي</span>
                  <div className="text-left">
                    <span className="text-xl text-[#f8e7b9] font-mono tabular-nums">
                      {grandTotal}
                    </span>
                    <span className="text-xs text-[#c5a059] mr-1">ر.س</span>
                  </div>
                </div>
              </div>

              {/* Checkout Trigger Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 gold-button rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>متابعة إتمام الطلب والدفع</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
