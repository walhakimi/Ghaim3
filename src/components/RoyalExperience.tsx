import React from 'react';
import { Package, ShieldCheck, HeartHandshake, Sparkles, RefreshCw } from 'lucide-react';

export const RoyalExperience: React.FC = () => {
  return (
    <section id="experience" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#c5a059] uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>خدمة النخبة والضمان الذهبي</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#faf7f0]">
          تجربة تسوق تليق بضيوف دار غيم
        </h2>
        <p className="text-xs text-[#9d9382] mt-2">
          نحرص على أن تبدأ متعتكم بالعطر من لحظة استلام الطرد الفاخر.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-[#131210] border border-[#2b261e] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#221e16] text-[#d4af37] flex items-center justify-center border border-[#3e3425]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#f5eedf]">عينات تجربة مجانية</h3>
          <p className="text-xs text-[#8c8272] leading-relaxed">
            مع كل عطر، نرسل عينة تجربة صغيرة مجاناً لتجربة الرائحة قبل فتح الغلاف الخارجي.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#131210] border border-[#2b261e] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#221e16] text-[#d4af37] flex items-center justify-center border border-[#3e3425]">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#f5eedf]">تغليف هدايا ملكي</h3>
          <p className="text-xs text-[#8c8272] leading-relaxed">
            صناديق مبطنة بالمخمل الأسود، أشرطة حريرية مذهبة، وبطاقة إهداء مخصصة بخط عربي فاخر.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#131210] border border-[#2b261e] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#221e16] text-[#d4af37] flex items-center justify-center border border-[#3e3425]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#f5eedf]">أصالة مضمونة 100%</h3>
          <p className="text-xs text-[#8c8272] leading-relaxed">
            شهادة منشأ معتمدة لكل دفعة زيوت عطرية ومكونات مسجلة ومفحوصة مخبرياً.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#131210] border border-[#2b261e] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#221e16] text-[#d4af37] flex items-center justify-center border border-[#3e3425]">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#f5eedf]">استبدال وإرجاع ميسر</h3>
          <p className="text-xs text-[#8c8272] leading-relaxed">
            إن لم يناسبك العطر عبر العينة التجريبية المرفقة، يمكنك إرجاع الزجاجة المغلفة واسترداد المبلغ فوراً.
          </p>
        </div>
      </div>
    </section>
  );
};
