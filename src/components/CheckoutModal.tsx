import React, { useState } from 'react';
import {
  X,
  CreditCard,
  ShieldCheck,
  Truck,
  Gift,
  CheckCircle,
  Lock,
  ArrowRight,
  Smartphone,
  Banknote,
  Sparkles,
} from 'lucide-react';
import { CartItem, PaymentMethodType, OrderReceipt } from '../types/perfume';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shipping: number;
  total: number;
  onOrderCompleted: (receipt: OrderReceipt) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  discountCode,
  shipping,
  total,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  // Selected payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('credit_card');

  // Shipping details state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('الرياض');
  const [district, setDistrict] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [giftWrapping, setGiftWrapping] = useState(true);
  const [giftNote, setGiftNote] = useState('');

  // Credit card / Mada details state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 8892');
  const [cardHolder, setCardHolder] = useState('سلطان العتيبي');
  const [expiry, setExpiry] = useState('08/28');
  const [cvv, setCvv] = useState('892');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleFormatCard = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/[\s\S]{1,4}/g) || [];
    setCardNumber(parts.join(' '));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!fullName.trim()) errors.push('يرجى إدخال الاسم الكامل للمستلم.');
    if (!phone.trim() || phone.trim().length < 8) errors.push('يرجى إدخال رقم جوال صحيح للتواصل والتوصيل.');
    if (!district.trim()) errors.push('يرجى إدخال اسم الحي السكني.');

    if (paymentMethod === 'credit_card' || paymentMethod === 'mada') {
      if (!cardNumber.trim()) errors.push('يرجى إدخال رقم البطاقة.');
      if (!cardHolder.trim()) errors.push('يرجى إدخال اسم حامل البطاقة.');
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);
    setIsProcessing(true);

    // Realistic luxury payment simulation
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderNum = `VL-${Math.floor(10000 + Math.random() * 90000)}`;
      const paymentTitleMap: Record<PaymentMethodType, string> = {
        credit_card: 'بطاقة ائتمانية (Visa/Mastercard)',
        apple_pay: 'آبل باي (Apple Pay)',
        mada: 'مدى (mada السعودية)',
        google_pay: 'جوجل باي (Google Pay)',
        cod: 'الدفع عند الاستلام (COD)',
      };

      const receipt: OrderReceipt = {
        orderNumber: randomOrderNum,
        date: new Date().toLocaleDateString('ar-SA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        items,
        subtotal,
        discount,
        discountCode,
        shipping,
        tax: Math.round(total * 0.15),
        total,
        customerInfo: {
          fullName,
          phone,
          city,
          address: `${district}، ${streetAddress || 'العنوان الرئيسي'}`,
          paymentMethodTitle: paymentTitleMap[paymentMethod],
        },
        estimatedDelivery: 'خلال 24 إلى 48 ساعة بواسطة أسطول غيم الفاخر',
      };

      onOrderCompleted(receipt);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#11100f] border border-[#3b3427] rounded-3xl overflow-hidden shadow-2xl my-8 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-[#26221a] flex items-center justify-between bg-[#151412]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#221f18] text-[#d4af37] flex items-center justify-center border border-[#3a3325]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#faf7f0]">
                بوابة الدفع والتوصيل الملكية الآمنة
              </h2>
              <p className="text-xs text-[#9d9382]">
                مشفرة بنظام حماية 256-bit SSL · دار غيم للعطور الفاخرة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="p-2 rounded-xl text-[#948b7a] hover:text-[#faf7f0] hover:bg-[#201d18] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-8">
          {/* Order Snapshot Row */}
          <div className="p-4 rounded-2xl bg-[#161513] border border-[#2b271f] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs font-semibold text-[#ded7c8]">
                طلبك يشمل {items.reduce((s, i) => s + i.quantity, 0)} عطور فاخرة
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-[#9e9585]">المطلوب سداده:</span>
              <span className="text-xl font-bold text-[#f8e7b9] font-mono tabular-nums">
                {total}
              </span>
              <span className="text-xs text-[#c5a059] font-semibold">ر.س</span>
            </div>
          </div>

          {/* Error notifications */}
          {formErrors.length > 0 && (
            <div className="p-4 bg-[#2e1515] border border-[#752a2a] rounded-xl text-xs text-[#fca5a5] space-y-1">
              <strong className="block font-bold">يرجى استكمال البيانات المطلوبة:</strong>
              {formErrors.map((err, i) => (
                <div key={i}>• {err}</div>
              ))}
            </div>
          )}

          {/* Section 1: Customer & Delivery Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#f5eedf] flex items-center gap-2 border-b border-[#24211a] pb-2">
              <Truck className="w-4 h-4 text-[#d4af37]" />
              <span>1. بيانات الشحن والتوصيل الفاخر</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-[#a49a88] block">الاسم الكامل *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: تركي بن فهد آل سعود"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#181715] border border-[#332e24] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-xs text-[#faf7f0] focus:outline-none placeholder-[#6b6254]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#a49a88] block">رقم الجوال للتوصيل والتأكيد *</label>
                <div className="flex" dir="ltr">
                  <span className="bg-[#22201b] border border-r-0 border-[#332e24] text-[#a49a88] px-3 py-2.5 rounded-l-xl text-xs font-mono">
                    +966
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#181715] border border-[#332e24] focus:border-[#c5a059] rounded-r-xl px-3.5 py-2.5 text-xs text-[#faf7f0] focus:outline-none placeholder-[#6b6254]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#a49a88] block">المدينة *</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#181715] border border-[#332e24] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-xs text-[#faf7f0] focus:outline-none cursor-pointer"
                >
                  <option value="الرياض">الرياض (توصيل فوري نفس اليوم)</option>
                  <option value="جدة">جدة (توصيل خلال 24 ساعة)</option>
                  <option value="الدمام">الدمام والخبر (خلال 24 ساعة)</option>
                  <option value="مكة المكرمة">مكة المكرمة</option>
                  <option value="المدينة المنورة">المدينة المنورة</option>
                  <option value="أبها">أبها وخميس مشيط</option>
                  <option value="تبوك">تبوك</option>
                  <option value="دبي">دبي (الشحن الخليجي المبرد)</option>
                  <option value="أبوظبي">أبوظبي</option>
                  <option value="الكويت">الكويت</option>
                  <option value="الدوحة">الدوحة</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#a49a88] block">الحي السكني *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: حي النخيل / حي الملقا"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#181715] border border-[#332e24] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-xs text-[#faf7f0] focus:outline-none placeholder-[#6b6254]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs text-[#a49a88] block">تفاصيل العنوان والشارع</label>
                <input
                  type="text"
                  placeholder="اسم الشارع، رقم الفيلا أو المبنى، أو علامة مميزة"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full bg-[#181715] border border-[#332e24] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-xs text-[#faf7f0] focus:outline-none placeholder-[#6b6254]"
                />
              </div>
            </div>

            {/* Luxury Gift Packaging Option */}
            <div className="p-4 rounded-xl bg-[#171512] border border-[#2e281e] space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={(e) => setGiftWrapping(e.target.checked)}
                  className="w-4 h-4 accent-[#d4af37] rounded"
                />
                <span className="text-xs font-semibold text-[#ded7c8] flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-[#d4af37]" />
                  تغليف هدية ملكي مجاني في صندوق مخملي مذهب مع بطاقة إهداء
                </span>
              </label>

              {giftWrapping && (
                <input
                  type="text"
                  placeholder="اكتب رسالة الإهداء المراد طباعتها على البطاقة..."
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="w-full bg-[#131210] border border-[#312b21] rounded-lg px-3 py-2 text-xs text-[#faf7f0] focus:outline-none placeholder-[#635b4f]"
                />
              )}
            </div>
          </div>

          {/* Section 2: Payment Methods (Required in Prompt Step 4) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#f5eedf] flex items-center gap-2 border-b border-[#24211a] pb-2">
              <CreditCard className="w-4 h-4 text-[#d4af37]" />
              <span>2. اختيار وسيلة الدفع المفضلة</span>
            </h3>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {/* 1. Credit Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'credit_card'
                    ? 'bg-[#272218] border-[#d4af37] text-[#f7e8c1] shadow-md ring-1 ring-[#d4af37]/30'
                    : 'bg-[#161513] border-[#2e2920] text-[#9c9383] hover:border-[#4d4435]'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#d4af37]" />
                <span className="text-xs font-bold">بطاقة ائتمانية</span>
                <span className="text-[10px] text-[#7d7465]">Visa / Master</span>
              </button>

              {/* 2. Apple Pay */}
              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'apple_pay'
                    ? 'bg-[#272218] border-[#d4af37] text-[#f7e8c1] shadow-md ring-1 ring-[#d4af37]/30'
                    : 'bg-[#161513] border-[#2e2920] text-[#9c9383] hover:border-[#4d4435]'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center text-white font-bold text-sm">
                  Pay
                </div>
                <span className="text-xs font-bold">آبل باي</span>
                <span className="text-[10px] text-[#7d7465]">Face ID فوري</span>
              </button>

              {/* 3. Mada */}
              <button
                type="button"
                onClick={() => setPaymentMethod('mada')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'mada'
                    ? 'bg-[#272218] border-[#d4af37] text-[#f7e8c1] shadow-md ring-1 ring-[#d4af37]/30'
                    : 'bg-[#161513] border-[#2e2920] text-[#9c9383] hover:border-[#4d4435]'
                }`}
              >
                <div className="px-2 py-0.5 rounded bg-[#0b7f6c]/30 border border-[#0b7f6c] text-[11px] font-bold text-[#44e5be]">
                  mada
                </div>
                <span className="text-xs font-bold">مدى</span>
                <span className="text-[10px] text-[#7d7465]">بطاقات البنوك السعودية</span>
              </button>

              {/* 4. Google Pay */}
              <button
                type="button"
                onClick={() => setPaymentMethod('google_pay')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'google_pay'
                    ? 'bg-[#272218] border-[#d4af37] text-[#f7e8c1] shadow-md ring-1 ring-[#d4af37]/30'
                    : 'bg-[#161513] border-[#2e2920] text-[#9c9383] hover:border-[#4d4435]'
                }`}
              >
                <Smartphone className="w-5 h-5 text-[#5e96f8]" />
                <span className="text-xs font-bold">جوجل باي</span>
                <span className="text-[10px] text-[#7d7465]">G Pay آمن</span>
              </button>

              {/* 5. Cash on Delivery (COD) */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'bg-[#272218] border-[#d4af37] text-[#f7e8c1] shadow-md ring-1 ring-[#d4af37]/30'
                    : 'bg-[#161513] border-[#2e2920] text-[#9c9383] hover:border-[#4d4435]'
                }`}
              >
                <Banknote className="w-5 h-5 text-[#a8df8e]" />
                <span className="text-xs font-bold">عند الاستلام</span>
                <span className="text-[10px] text-[#7d7465]">كاش أو شبكة</span>
              </button>
            </div>

            {/* Dynamic Payment Interface per method */}
            <div className="p-5 rounded-2xl bg-[#161513] border border-[#2e2920]">
              {/* Credit Card / Mada Details */}
              {(paymentMethod === 'credit_card' || paymentMethod === 'mada') && (
                <div className="space-y-4">
                  {/* Luxury Card Mockup */}
                  <div className="max-w-sm mx-auto p-5 rounded-2xl bg-gradient-to-tr from-[#1a1917] via-[#2d281f] to-[#121110] border border-[#c5a059]/40 shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-brand tracking-widest text-[#d4af37]">
                        GHAIM VIP
                      </span>
                      <span className="text-xs font-bold text-[#faf7f0]">
                        {paymentMethod === 'mada' ? 'mada مدى' : 'VISA PLATINUM'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <div className="w-9 h-7 rounded bg-gradient-to-br from-[#e0bb53] to-[#997924] border border-[#ffeaa7]" />
                      <div className="w-4 h-4 rounded-full border border-[#d4af37]/60" />
                    </div>

                    <div className="text-lg font-mono tracking-widest text-[#faf7f0] text-center" dir="ltr">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#baa890] pt-1">
                      <div>
                        <span className="text-[9px] block text-[#827563]">حامل البطاقة</span>
                        <span className="font-semibold text-[#f8f5ee]">{cardHolder || 'NAME'}</span>
                      </div>
                      <div className="text-left" dir="ltr">
                        <span className="text-[9px] block text-[#827563]">EXP</span>
                        <span className="font-semibold font-mono text-[#f8f5ee]">{expiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Form Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs text-[#a49a88] block">رقم البطاقة</label>
                      <input
                        type="text"
                        placeholder="4242 0000 0000 8892"
                        value={cardNumber}
                        onChange={(e) => handleFormatCard(e.target.value)}
                        className="w-full bg-[#181715] border border-[#332e24] rounded-xl px-3 py-2 text-xs text-[#faf7f0] font-mono focus:outline-none focus:border-[#c5a059]"
                        dir="ltr"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-[#a49a88] block">الاسم المطبوع على البطاقة</label>
                      <input
                        type="text"
                        placeholder="كما يظهر على البطاقة"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full bg-[#181715] border border-[#332e24] rounded-xl px-3 py-2 text-xs text-[#faf7f0] focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs text-[#a49a88] block">تاريخ الانتهاء</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full bg-[#181715] border border-[#332e24] rounded-xl px-3 py-2 text-xs text-[#faf7f0] font-mono text-center focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-[#a49a88] block">رمز CVC</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full bg-[#181715] border border-[#332e24] rounded-xl px-3 py-2 text-xs text-[#faf7f0] font-mono text-center focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Apple Pay Method Screen */}
              {paymentMethod === 'apple_pay' && (
                <div className="text-center py-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black border border-[#3a352a] text-white text-2xl font-bold">
                    
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#faf7f0]">
                      الدفع الفوري السريع عبر آبل باي
                    </h4>
                    <p className="text-xs text-[#9d9382] mt-1 max-w-sm mx-auto">
                      انقر على زر الدفع أدناه لتأكيد الطلب فوراً باستخدام بصمة الوجه Face ID أو Touch ID.
                    </p>
                  </div>
                  <div className="p-3 bg-[#0a0a0c] rounded-xl max-w-xs mx-auto border border-[#2b271f] text-xs text-[#b8afa1]">
                    <span>البطاقة الافتراضية المرتبطة:</span>
                    <strong className="block text-[#faf7f0] font-mono mt-0.5">Al Rajhi mada (•• 4402)</strong>
                  </div>
                </div>
              )}

              {/* Google Pay Screen */}
              {paymentMethod === 'google_pay' && (
                <div className="text-center py-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1e2229] border border-[#3b4759] text-white">
                    <Smartphone className="w-7 h-7 text-[#60a5fa]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#faf7f0]">
                      الدفع بلمسة واحدة عبر Google Pay
                    </h4>
                    <p className="text-xs text-[#9d9382] mt-1 max-w-sm mx-auto">
                      سيتم سحب المبلغ بأمان عبر حساب Google المحفوظ على جهازك.
                    </p>
                  </div>
                </div>
              )}

              {/* Cash On Delivery (COD) Screen */}
              {paymentMethod === 'cod' && (
                <div className="text-center py-6 space-y-3">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1d271e] border border-[#375239] text-[#86efac]">
                    <Banknote className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#faf7f0]">
                      الدفع عند باب المنزل (كاش أو جهاز مدى المتنقل)
                    </h4>
                    <p className="text-xs text-[#9d9382] mt-1 max-w-md mx-auto">
                      مندوب دار غيم المعتمد سيتواصل معك قبل الوصول، وسيحمل جهاز دفع مدى لاسلكي إن فضلت الدفع بالبطاقة عند الاستلام.
                    </p>
                  </div>
                  <div className="inline-block px-3 py-1 bg-[#242b20] text-[#a7f3d0] rounded-full text-[11px] font-semibold">
                    ✓ رسوم الدفع عند الاستلام مجانية تقديراً لعملاء غيم
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Button & Secure Badges */}
          <div className="space-y-4 pt-4 border-t border-[#26221a]">
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 px-6 rounded-2xl text-base font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xl ${
                paymentMethod === 'apple_pay'
                  ? 'bg-black text-white hover:bg-neutral-900 border border-neutral-700'
                  : 'gold-button'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#09090b] border-t-transparent rounded-full animate-spin" />
                  <span>جاري تأكيد حجز العطور الملكية ومعالجة الدفع...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>
                    تأكيد الطلب وسداد {total} ر.س ({
                      paymentMethod === 'apple_pay'
                        ? 'عبر Pay'
                        : paymentMethod === 'cod'
                        ? 'الدفع عند الاستلام'
                        : paymentMethod === 'mada'
                        ? 'عبر مدى'
                        : paymentMethod === 'google_pay'
                        ? 'عبر GPay'
                        : 'بالبطاقة'
                    })
                  </span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-6 text-[11px] text-[#7d7363]">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                دفع آمن ومحمي 100%
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                شحن مبرد وفاخر
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                عينات مجانية مع كل طلب
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
