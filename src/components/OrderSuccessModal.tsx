import React from 'react';
import { CheckCircle2, PackageCheck, Printer, ShoppingBag, Sparkles, MapPin, CreditCard } from 'lucide-react';
import { OrderReceipt } from '../types/perfume';

interface OrderSuccessModalProps {
  receipt: OrderReceipt | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ receipt, onClose }) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#121110] border border-[#c5a059]/40 rounded-3xl overflow-hidden shadow-2xl my-6 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Celebration Glow */}
        <div className="bg-gradient-to-b from-[#241f14] to-[#121110] p-8 text-center border-b border-[#2d281f] relative">
          <div className="w-16 h-16 rounded-full bg-[#2a2417] text-[#d4af37] border border-[#c5a059] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle2 className="w-8 h-8 text-[#d4af37]" />
          </div>

          <span className="inline-block text-xs font-bold text-[#c5a059] tracking-widest uppercase mb-1">
            تم استلام وتأكيد طلبكم بنجاح
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#faf7f0]">
            شكراً لانضمامكم إلى نخبة دار غيم
          </h2>
          <p className="text-xs text-[#a39a8a] mt-2 max-w-md mx-auto">
            يجري الآن تحضير عطوركم الفاخرة وتغليفها الملكي اليدوي بعناية فائقة لتصلكم في أبهى حلة.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1b1916] border border-[#3b3325] text-xs">
            <span className="text-[#8c8272]">رقم الفاتورة والطلب:</span>
            <strong className="text-[#f7e6be] font-mono tracking-wider">{receipt.orderNumber}</strong>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Delivery & Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#171614] border border-[#2b271f] text-xs">
            <div className="space-y-1">
              <span className="text-[#857b6d] flex items-center gap-1.5 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                عنوان التوصيل
              </span>
              <p className="text-[#e8e2d5] font-bold">{receipt.customerInfo.fullName}</p>
              <p className="text-[#a49a88]">{receipt.customerInfo.city} · {receipt.customerInfo.address}</p>
              <p className="text-[#857b6d] font-mono">{receipt.customerInfo.phone}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[#857b6d] flex items-center gap-1.5 font-semibold">
                <CreditCard className="w-3.5 h-3.5 text-[#d4af37]" />
                وسيلة الدفع والحالة
              </span>
              <p className="text-[#e8e2d5] font-bold">{receipt.customerInfo.paymentMethodTitle}</p>
              <p className="text-[#96dfa4] font-semibold">✓ تم التأكيد بنجاح</p>
              <p className="text-[#857b6d]">{receipt.estimatedDelivery}</p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#d4af37] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>محتويات الطرد الملكي ({receipt.items.length} عطور)</span>
            </h4>

            <div className="divide-y divide-[#221f19] max-h-48 overflow-y-auto pr-1">
              {receipt.items.map((item) => (
                <div key={item.cartItemId} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.perfume.image}
                      alt={item.perfume.nameAr}
                      className="w-10 h-10 rounded-lg object-cover bg-[#090807] border border-[#2e2920]"
                    />
                    <div>
                      <h5 className="font-bold text-[#faf7f0]">{item.perfume.nameAr}</h5>
                      <span className="text-[11px] text-[#8e8574]">
                        {item.variant.name} · الكمية: {item.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="text-left font-mono tabular-nums font-bold text-[#f7e6be]">
                    {item.variant.priceSAR * item.quantity} ر.س
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Summary */}
          <div className="pt-4 border-t border-[#26221b] space-y-1.5 text-xs">
            <div className="flex justify-between text-[#9a9182]">
              <span>المجموع الفرعي:</span>
              <span className="font-mono tabular-nums">{receipt.subtotal} ر.س</span>
            </div>
            {receipt.discount > 0 && (
              <div className="flex justify-between text-[#96dfa4]">
                <span>الخصم المطبق:</span>
                <span className="font-mono tabular-nums">-{receipt.discount} ر.س</span>
              </div>
            )}
            <div className="flex justify-between text-[#9a9182]">
              <span>الشحن والتوصيل:</span>
              <span>{receipt.shipping === 0 ? 'مجاني' : `${receipt.shipping} ر.س`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#faf7f0] pt-2 border-t border-[#2b271f]">
              <span>الإجمالي المدفوع:</span>
              <span className="font-mono tabular-nums text-[#f8e7b9] text-lg">
                {receipt.total} <span className="text-xs text-[#c5a059]">ر.س</span>
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 pt-3">
            <button
              onClick={handlePrint}
              className="px-4 py-3 rounded-xl bg-[#1b1916] hover:bg-[#25221b] border border-[#3b3427] text-xs font-semibold text-[#ded7c8] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#c5a059]" />
              <span>طباعة الإيصال</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 py-3 gold-button rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>العودة ومواصلة التسوق</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
