import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Sparkles, Search } from 'lucide-react';
import { Perfume, PerfumeVariant } from '../types/perfume';
import { CATEGORIES } from '../data/perfumes';
import { ProductCard } from './ProductCard';

interface CatalogProps {
  perfumes: Perfume[];
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onAddToCart: (perfume: Perfume, variant: PerfumeVariant) => void;
  onViewDetails: (perfume: Perfume) => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  perfumes,
  searchTerm,
  onSearchChange,
  onAddToCart,
  onViewDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Filtered and sorted perfumes
  const filteredPerfumes = useMemo(() => {
    return perfumes
      .filter((p) => {
        // Category match
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Search term match
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = p.nameAr.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q);
          const matchDesc = p.shortDescription.toLowerCase().includes(q);
          const matchNotes = [
            ...p.notes.top,
            ...p.notes.heart,
            ...p.notes.base,
          ].some((note) => note.toLowerCase().includes(q));
          return matchName || matchDesc || matchNotes;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.variants[0].priceSAR - b.variants[0].priceSAR;
        }
        if (sortBy === 'price-desc') {
          return b.variants[0].priceSAR - a.variants[0].priceSAR;
        }
        // Featured
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return 0;
      });
  }, [perfumes, selectedCategory, searchTerm, sortBy]);

  return (
    <section id="catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#23201a]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c5a059] tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>كتالوج عطور الدار الحصرية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#faf7f0]">
            المجموعة الملكية الكاملة
          </h2>
          <p className="text-sm text-[#9c9384] mt-2 max-w-xl">
            مقطرات عطرية نقية صُممت بأدق المعايير الباريسية مع روح العود والعنبر الشرقي الأصيل.
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-[#8a8171]" />
          <span className="text-xs text-[#8a8171]">الترتيب:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#171614] border border-[#332e24] text-xs text-[#ded7c8] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#c5a059] cursor-pointer"
          >
            <option value="featured">المميز والأكثر طلباً</option>
            <option value="price-asc">السعر: من الأقل للأعلى</option>
            <option value="price-desc">السعر: من الأعلى للأقل</option>
          </select>
        </div>
      </div>

      {/* Categories & Filter Bar (Functional Buttons / Segmented Controls) */}
      <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#d4af37] text-[#09090b] shadow-md font-bold'
                  : 'bg-[#151412] text-[#b0a797] border border-[#2d2922] hover:border-[#4f4738] hover:text-[#f2ece1]'
              }`}
            >
              {cat.nameAr}
            </button>
          );
        })}
      </div>

      {/* Active Search Notification Banner if searching */}
      {searchTerm && (
        <div className="mb-6 p-3 bg-[#191816] rounded-xl border border-[#383226] flex items-center justify-between text-xs text-[#cfc7b9]">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#c5a059]" />
            <span>
              نتائج البحث عن: <strong className="text-[#f7e6be]">"{searchTerm}"</strong> ({filteredPerfumes.length} عطر)
            </span>
          </div>
          <button
            onClick={() => onSearchChange('')}
            className="text-xs text-[#c5a059] hover:underline cursor-pointer"
          >
            مسح البحث
          </button>
        </div>
      )}

      {/* Perfumes Grid */}
      {filteredPerfumes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPerfumes.map((perfume) => (
            <ProductCard
              key={perfume.id}
              perfume={perfume}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-[#141311] rounded-2xl border border-[#2b271f] max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#201d17] text-[#c5a059] flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#faf7f0] mb-1">
            لم نجد عطراً يطابق بحثك
          </h3>
          <p className="text-xs text-[#8c8272] mb-5">
            جرّب البحث باسم مكون كـ (عنبر، عود، ورد، صندل) أو أعد ضبط تصنيفات العطور.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              onSearchChange('');
            }}
            className="gold-button px-5 py-2 text-xs rounded-lg cursor-pointer font-bold"
          >
            عرض كافة العطور
          </button>
        </div>
      )}
    </section>
  );
};
