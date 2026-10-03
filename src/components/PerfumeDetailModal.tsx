import React, { useState } from 'react';
import { X, ShoppingBag, Check, Sparkles, Shield, Droplets, Wind } from 'lucide-react';
import { Perfume, PerfumeVariant } from '../types/perfume';

interface PerfumeDetailModalProps {
  perfume: Perfume | null;
  onClose: () => void;
  onAddToCart: (perfume: Perfume, variant: PerfumeVariant) => void;
}

export const PerfumeDetailModal: React.FC<PerfumeDetailModalProps> = ({
  perfume,
  onClose,
  onAddToCart,
}) => {
  if (!perfume) return null;

  const [selectedVariant, setSelectedVariant] = useState<PerfumeVariant>(perfume.variants[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(perfume, selectedVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#11100f] border border-[#3b3427] rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="إغلاق النافذة"
          className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-[#1b1916]/80 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#09090b] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media / Bottle Gallery (Left/Right depending on RTL) */}
        <div className="md:w-1/2 relative bg-[#090807] flex items-center justify-center p-6 border-b md:border-b-0 md:border-l border-[#27231c]">
          <div className="relative w-full aspect-square max-w-sm rounded-2xl overflow-hidden gold-card-border shadow-inner">
            <img
              src={perfume.image}
              alt={perfume.nameAr}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 right-4 bg-[#141210]/85 px-3 py-1 rounded-md border border-[#3f382a] text-[11px] text-[#c5a059] font-semibold">
              {perfume.concentration} · أصلي 100%
            </div>
          </div>
        </div>

        {/* Details & Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[85vh] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-[#c5a059] tracking-wider uppercase">
                {perfume.categoryNameAr} · {perfume.concentration}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#faf7f0] mt-1">
                {perfume.nameAr}
              </h2>
              <p className="text-sm font-brand text-[#8c8270] tracking-widest uppercase">
                {perfume.nameEn}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#b5aca0] leading-relaxed">
              {perfume.fullStory}
            </p>

            {/* Olfactory Pyramid (الهرم العطري) */}
            <div className="p-4 bg-[#161513] rounded-2xl border border-[#2b271f] space-y-3">
              <h4 className="text-xs font-bold text-[#e5c378] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>الهرم الشمي والمكونات العطرية</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-[#8e8574] min-w-[75px] font-semibold">قمة العطر:</span>
                  <span className="text-[#d8d0c2]">{perfume.notes.top.join(' · ')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#8e8574] min-w-[75px] font-semibold">قلب العطر:</span>
                  <span className="text-[#d8d0c2]">{perfume.notes.heart.join(' · ')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#8e8574] min-w-[75px] font-semibold">قاعدة العطر:</span>
                  <span className="text-[#d8d0c2]">{perfume.notes.base.join(' · ')}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#26221b] grid grid-cols-2 gap-2 text-[11px] text-[#938a79]">
                <div>
                  <span className="text-[#7d7568]">الثبات: </span>
                  <span className="text-[#e2dacb] font-medium">{perfume.longevity}</span>
                </div>
                <div>
                  <span className="text-[#7d7568]">الفوحان: </span>
                  <span className="text-[#e2dacb] font-medium">{perfume.sillage}</span>
                </div>
              </div>
            </div>

            {/* Choose Variant (matching reference screen) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#9d9382]">
                <span className="font-semibold">اختر السعة (Choose Variant):</span>
                <span className="text-[#d4af37] font-bold">{selectedVariant.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {perfume.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#292317] border-[#d4af37] text-[#faf6ee] shadow-sm'
                          : 'bg-[#151412] border-[#2c271f] text-[#a49b8c] hover:border-[#4d4435]'
                      }`}
                    >
                      <div className="text-xs font-bold">{v.name}</div>
                      <div className="text-sm font-bold text-[#d4af37] font-mono tabular-nums mt-0.5">
                        {v.priceSAR} ر.س
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Buy Bar */}
          <div className="pt-4 border-t border-[#26221c] flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-[#8a8171]">السعر الإجمالي</span>
              <span className="text-2xl font-bold text-[#faf7f0] font-mono tabular-nums">
                {selectedVariant.priceSAR} <span className="text-xs text-[#c5a059]">ر.س</span>
              </span>
            </div>

            <button
              onClick={handleAdd}
              disabled={isAdded}
              className={`flex-1 py-3.5 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                isAdded
                  ? 'bg-[#2b593f] text-[#baf7d0]'
                  : 'gold-button shadow-lg'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تمت الإضافة لحقيبة العطور</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>أضف للحقيبة الآن</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
