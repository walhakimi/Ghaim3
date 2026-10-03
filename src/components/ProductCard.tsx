import React, { useState } from 'react';
import { ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';
import { Perfume, PerfumeVariant } from '../types/perfume';

interface ProductCardProps {
  perfume: Perfume;
  onAddToCart: (perfume: Perfume, variant: PerfumeVariant) => void;
  onViewDetails: (perfume: Perfume) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  perfume,
  onAddToCart,
  onViewDetails,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<PerfumeVariant>(perfume.variants[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(perfume, selectedVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <article className="group flex flex-col bg-[#121110] rounded-2xl overflow-hidden gold-card-border transition-all duration-300 hover:-translate-y-1">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] sm:aspect-square bg-[#0c0b0a] overflow-hidden flex items-center justify-center cursor-pointer"
        onClick={() => onViewDetails(perfume)}
      >
        <img
          src={perfume.image}
          alt={perfume.nameAr}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
        />

        {/* Ambient subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-transparent opacity-80" />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {perfume.isBestseller && (
            <span className="text-[11px] font-semibold text-[#f8e7b9] bg-[#3a2f15]/90 border border-[#b89535]/60 px-2.5 py-0.5 rounded backdrop-blur-sm">
              الأكثر مبيعاً
            </span>
          )}
          {perfume.isNew && (
            <span className="text-[11px] font-semibold text-[#eae2d0] bg-[#22201c]/90 border border-[#4a4233] px-2.5 py-0.5 rounded backdrop-blur-sm">
              إصدار خاص
            </span>
          )}
        </div>

        {/* Quick View Button on Image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(perfume);
          }}
          className="absolute bottom-3 left-3 p-2 bg-[#1b1916]/80 hover:bg-[#d4af37] text-[#dfd7c8] hover:text-[#0b0a09] rounded-lg backdrop-blur-sm border border-[#3e372a] transition-colors cursor-pointer"
          title="معاينة تفاصيل العطر والنوتات"
          aria-label={`معاينة ${perfume.nameAr}`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Concentration & Category */}
          <div className="flex items-center justify-between text-xs text-[#9d9382] mb-1.5 font-medium">
            <span>{perfume.concentration}</span>
            <span className="text-[#c5a059]">{perfume.categoryNameAr}</span>
          </div>

          {/* Perfume Titles */}
          <h3
            onClick={() => onViewDetails(perfume)}
            className="text-lg font-bold text-[#faf7f0] group-hover:text-[#e5c378] transition-colors cursor-pointer"
          >
            {perfume.nameAr}
          </h3>
          <p className="text-xs text-[#8c8270] font-brand tracking-wider uppercase mb-2">
            {perfume.nameEn}
          </p>

          {/* Short olfactory description */}
          <p className="text-xs text-[#b8b0a2] line-clamp-2 leading-relaxed">
            {perfume.shortDescription}
          </p>
        </div>

        {/* Variant Selector (inspired by right phone in user reference image: "Choose Variant") */}
        <div className="space-y-2 pt-2 border-t border-[#23201a]">
          <div className="flex items-center justify-between text-[11px] text-[#938a7b]">
            <span>اختر الحجم (Variant):</span>
            <span className="text-[#d4af37] font-semibold">{selectedVariant.name}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {perfume.variants.map((variant) => {
              const isSelected = selectedVariant.id === variant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#2a2418] text-[#f7e6be] border-[#c5a059] shadow-sm'
                      : 'bg-[#171614] text-[#a09788] border-[#2e2a22] hover:border-[#4b4334]'
                  }`}
                >
                  <span>{variant.name}</span>
                  <span className="tabular-nums font-mono text-[11px]">{variant.priceSAR} ر.س</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price & Add to Bag CTA */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#8e8574]">السعر الإجمالي</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-[#f7e6be] tabular-nums font-mono">
                {selectedVariant.priceSAR}
              </span>
              <span className="text-xs text-[#c5a059] font-medium">ر.س</span>
              {selectedVariant.originalPriceSAR && (
                <span className="text-xs text-[#70685b] line-through tabular-nums">
                  {selectedVariant.originalPriceSAR} ر.س
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isAdded}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isAdded
                ? 'bg-[#2b593f] text-[#baf7d0] border border-[#3e8a5b]'
                : 'gold-button shadow-md'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>تمت الإضافة</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>أضف للسلة</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
