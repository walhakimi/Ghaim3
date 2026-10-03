import React from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Droplet, Clock } from 'lucide-react';
import { HERO_IMAGE } from '../data/perfumes';

interface HeroProps {
  onExploreCatalog: () => void;
  onSelectFeatured: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onSelectFeatured }) => {
  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#23201a]">
      {/* Background ambient gold glows */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-24 w-96 h-96 bg-[#93732d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content Zone */}
          <div className="lg:col-span-6 text-right space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] tracking-wider uppercase bg-[#181613] px-3.5 py-1.5 rounded-md border border-[#3e3626]">
              <Sparkles className="w-3.5 h-3.5 text-[#e5c378]" />
              <span>الإصدار الملكي المحدود · دار غيم 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f7f4ee] leading-[1.3] text-balance">
              توقيعك العطري الفاخر
              <span className="block mt-2 font-serif-luxury font-normal gold-gradient-text text-4xl sm:text-5xl lg:text-6xl">
                بين أسرار الشرق وسحر باريس
              </span>
            </h1>

            <p className="text-[#b5ada0] text-base sm:text-lg leading-relaxed max-w-xl">
              توليفات شمية نادرة من أثمن أخشاب العود الطبيعي المعتق، وقطرات العنبر المتبلور، والورد الأسود المخملي. تجربة حسية فريدة تجسد الهيبة والأناقة في كل قطرة.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="gold-button px-7 py-3.5 rounded-lg text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>استكشف كتالوج العطور</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onSelectFeatured}
                className="px-6 py-3.5 rounded-lg text-sm font-medium text-[#eae4d5] hover:text-[#d4af37] bg-[#171615] hover:bg-[#201e1a] border border-[#383329] transition-all cursor-pointer"
              >
                العطر الأيقوني: عنبر بريفيه
              </button>
            </div>

            {/* Luxury Trust Indicators */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-[#23201a]">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold">
                  <Droplet className="w-3.5 h-3.5" />
                  <span>زيوت نقية 100%</span>
                </span>
                <span className="text-[11px] text-[#8e8678]">مستخلصات نادرة غير ممددة</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>ثبات 14+ ساعة</span>
                </span>
                <span className="text-[11px] text-[#8e8678]">تركيز عالي جداً وفواح</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ضمان غيم الذهبي</span>
                </span>
                <span className="text-[11px] text-[#8e8678]">عينة تجربة مع إرجاع سهل</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase (inspired by the mobile reference image) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden gold-card-border bg-[#131211] shadow-2xl group">
              <img
                src={HERO_IMAGE}
                alt="تشكيلة عطور دار فيلون الفاخرة"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/20" />
              
              {/* Floating spotlight tag */}
              <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-[#0e0d0c]/85 backdrop-blur-md border border-[#3e372a] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#c5a059] font-medium tracking-wide">
                    المجموعة التأسيسية · Signature Trio
                  </span>
                  <h4 className="text-sm font-bold text-[#faf7f0]">
                    عنبر بريفيه · عود إمبيريال · روز نوار
                  </h4>
                </div>
                <button
                  onClick={onSelectFeatured}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#09090b] bg-[#d4af37] hover:bg-[#e5c378] rounded-md transition-colors cursor-pointer"
                >
                  اكتشف الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
