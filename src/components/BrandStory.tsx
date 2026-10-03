import React from 'react';
import { Sparkles, Compass, Gem, Award } from 'lucide-react';
import { HERO_IMAGE } from '../data/perfumes';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-[#0d0c0b] border-t border-b border-[#23201a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Side */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden gold-card-border shadow-2xl">
              <img
                src={HERO_IMAGE}
                alt="حرفية تقطير العطور في دار غيم"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-75" />

              <div className="absolute bottom-6 right-6 left-6 p-4 rounded-xl bg-[#141210]/90 backdrop-blur-md border border-[#3e3627]">
                <span className="text-xs text-[#d4af37] font-semibold block mb-0.5">
                  حرفية باريسية · أصالة شرقية
                </span>
                <p className="text-xs text-[#cfc7b8] leading-relaxed">
                  نستخلص أندر الزيوت العطرية عبر تقطير نقي يدوي يمتد لأشهر لضمان عمق شمي لا يُضاهى.
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#c5a059] uppercase tracking-wider bg-[#171512] px-3.5 py-1.5 rounded-md border border-[#312b1f]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>فلسفة العطور الفاخرة</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#faf7f0] leading-tight">
              عندما تصبح الرائحة هيبة،
              <span className="block font-serif-luxury gold-gradient-text text-3xl sm:text-4xl mt-1">
                والعطر بصمة خالدة لا تُنسى
              </span>
            </h2>

            <p className="text-sm text-[#b2a99c] leading-relaxed">
              تأسست دار غيم (Maison Ghaim) لتكون ملاذاً للباحثين عن الاستثناء والتفرد. في كل زجاجة، ننسج حكاية مستلهمة من قصور الشرق الفخمة وشوارع باريس العتيقة، حيث تلتقي نفحات العود الكمبودي المعتق بأرقى خلاصات الزهور الفرنسية النادرة.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#141311] border border-[#2b261e] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#f7e6be]">
                  <Gem className="w-4 h-4 text-[#d4af37]" />
                  <span>مكونات نقية وغير مكررة</span>
                </div>
                <p className="text-xs text-[#8c8272] leading-relaxed">
                  ننتقي أنقى أخشاب العود الطبيعي ودهن الورد والكهرمان والعنبر من مصادرها الأصلية.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141311] border border-[#2b261e] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#f7e6be]">
                  <Award className="w-4 h-4 text-[#d4af37]" />
                  <span>تركيزات ملكية عالية الثبات</span>
                </div>
                <p className="text-xs text-[#8c8272] leading-relaxed">
                  تتراوح تركيزاتنا بين Eau de Parfum و Extrait de Parfum بثبات يدوم لأكثر من 14 ساعة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
