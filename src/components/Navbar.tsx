import React from 'react';
import { ShoppingBag, Search, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateSection: (sectionId: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateSection,
  searchTerm,
  onSearchChange,
}) => {
  const [showSearchInput, setShowSearchInput] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-[#262420]">
      {/* Top micro-announcement banner: slim, luxury */}
      <div className="bg-[#121110] border-b border-[#23201a] py-1.5 px-4 text-center text-xs text-[#c5a059] flex items-center justify-center gap-2 font-medium tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        <span>توصيل ملكي مجاني لجميع مناطق المملكة مع كل طلب فوق 400 ر.س + عينات حصرية مجانية</span>
      </div>

      {/* Main Top Bar: 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('home');
          }}
          className="group flex flex-col text-right cursor-pointer"
        >
          <span className="font-brand text-2xl sm:text-3xl font-bold tracking-wider gold-gradient-text transition-opacity group-hover:opacity-90">
            GHAIM
          </span>
          <span className="text-[11px] font-serif-luxury tracking-widest text-[#a89f91] -mt-1">
            دار غيم للعطور الفاخرة | Maison Ghaim
          </span>
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#c8c2b5]">
          <button
            onClick={() => onNavigateSection('home')}
            className="hover:text-[#e5c378] transition-colors py-1 cursor-pointer"
          >
            الرئيسية
          </button>
          <button
            onClick={() => onNavigateSection('catalog')}
            className="hover:text-[#e5c378] transition-colors py-1 cursor-pointer"
          >
            كتالوج العطور
          </button>
          <button
            onClick={() => onNavigateSection('story')}
            className="hover:text-[#e5c378] transition-colors py-1 cursor-pointer"
          >
            فلسفة الدار
          </button>
          <button
            onClick={() => onNavigateSection('experience')}
            className="hover:text-[#e5c378] transition-colors py-1 cursor-pointer"
          >
            التجربة الملكية
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Search Toggle / Input */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-[#171615] border border-[#3e382d] rounded-lg px-2.5 py-1.5 transition-all">
                <input
                  type="text"
                  placeholder="ابحث عن عطر، عنبر، عود..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-xs text-[#f4efe6] placeholder-[#8a8274] focus:outline-none w-36 sm:w-48 text-right"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-xs text-[#8a8274] hover:text-[#d4af37] mr-1.5 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                aria-label="بحث في العطور"
                className="p-2.5 text-[#cfc8bc] hover:text-[#d4af37] transition-colors rounded-lg hover:bg-[#161514] cursor-pointer"
                title="بحث"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Luxury Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label="سلة المشتريات"
            className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#181715] hover:bg-[#22201c] border border-[#363025] hover:border-[#c5a059]/50 transition-all cursor-pointer text-[#e8e2d5]"
          >
            <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
            <span className="hidden sm:inline text-xs font-semibold tracking-wide">
              حقيبة العطور
            </span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-black bg-[#d4af37] rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
