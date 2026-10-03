import React from 'react';
import { Sparkles, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="bg-[#08080a] border-t border-[#23201a] pt-14 pb-10 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-brand text-2xl font-bold tracking-wider gold-gradient-text block">
              GHAIM
            </span>
            <p className="text-xs text-[#a09787] max-w-sm leading-relaxed">
              دار عطور فاخرة تمزج بين عراقة التقاليد الشرقية في تقطير أندر أخشاب العود والعنبر، مع الحرفية الباريسية الرفيعة في ابتكار أرقى العطور النيش.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#8c8272] pt-1">
              <span>الرياض · باريس · دبي</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#faf7f0] uppercase tracking-wider">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-xs text-[#9d9484]">
              <li>
                <button
                  onClick={() => onNavigateSection('home')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  الصفحة الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalog')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  كتالوج العطور الملكية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('story')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  فلسفة الدار
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('experience')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  الضمان الذهبي والشحن
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#faf7f0] uppercase tracking-wider">
              خدمة العملاء والكونسيرج
            </h4>
            <ul className="space-y-2 text-xs text-[#9d9484]">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span dir="ltr">+966 800 124 9900</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>concierge@ghaimperfumes.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>برج المملكة، العليا، الرياض</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-[#1d1b17] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#786f60]">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} لدار غيم للعطور الفاخرة · Maison Ghaim Parfums.
          </div>
          <div className="flex items-center gap-4 text-[#8a8071]">
            <span>سياسة الخصوصية</span>
            <span>·</span>
            <span>الشروط والأحكام</span>
            <span>·</span>
            <span>الرقم الضريبي الموحد</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
