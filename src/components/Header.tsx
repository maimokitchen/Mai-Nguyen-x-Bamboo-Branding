import React, { useState, useEffect } from 'react';
import { BambooLogo } from './BambooLogo';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { loadCurrentPortrait } from '../utils/portraitManager';
import { ZALO_PHONE, ZALO_PHONE_DISPLAY, ZALO_LINK } from '../utils/zaloManager';

interface HeaderProps {
  onOpenContact: (defaultStage?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    loadCurrentPortrait().then((url) => {
      if (url) setPhotoUrl(url);
    });

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<{ url: string }>;
      if (customEvt.detail?.url) {
        setPhotoUrl(customEvt.detail.url);
      }
    };

    window.addEventListener('mai-portrait-updated', handleUpdate);
    return () => window.removeEventListener('mai-portrait-updated', handleUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Mai là ai', href: '#ve-mai' },
    { label: 'Phương pháp', href: '#phuong-phap' },
    { label: 'Giải pháp', href: '#giai-phap' },
    { label: 'Case Study', href: '#case-study' },
    { label: 'Kết nối', href: '#ket-noi' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5EFE0]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(61,47,31,0.06)] border-b border-[#3D2F1F]/10 py-3'
          : 'bg-[#F5EFE0]/80 backdrop-blur-sm py-4 sm:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Anchor */}
        <a
          href="#"
          id="header-brand-link"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7C59] rounded-md transition-opacity"
        >
          {photoUrl && (
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#4A7C59]/30 shadow-sm shrink-0">
              <img
                src={photoUrl}
                alt="Mai Nguyễn"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <BambooLogo showTagline={!isScrolled} />
        </a>

        {/* Desktop Navigation */}
        <nav
          id="desktop-nav"
          className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-[#3D2F1F]/[0.03] border border-[#3D2F1F]/[0.06]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-sm font-medium text-[#3D2F1F]/80 hover:text-[#2C4A3A] hover:bg-[#4A7C59]/10 rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={ZALO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            title="Nhắn tin Zalo trực tiếp với Mai Nguyễn"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-[#0068FF]/30 text-xs text-[#0068FF] font-semibold transition-all cursor-pointer shadow-2xs hover:border-[#0068FF]"
          >
            <div className="w-3.5 h-3.5 rounded-sm bg-[#0068FF] text-white flex items-center justify-center font-black text-[6px]">
              Zalo
            </div>
            <span>{ZALO_PHONE_DISPLAY}</span>
          </a>

          <button
            id="header-cta-btn"
            onClick={() => onOpenContact()}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#4A7C59] text-white text-sm font-medium hover:bg-[#2C4A3A] transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
          >
            <span>Trao đổi với Mai</span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </button>

          {/* Mobile menu hamburger button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full text-[#3D2F1F] hover:bg-[#3D2F1F]/5 md:hidden focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#F5EFE0] border-b border-[#3D2F1F]/10 px-6 py-5 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-medium text-[#3D2F1F] hover:text-[#4A7C59] hover:bg-[#4A7C59]/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-[#3D2F1F]/10 space-y-2">
            <button
              id="mobile-nav-cta-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#4A7C59] text-white text-sm font-medium hover:bg-[#2C4A3A] transition-colors cursor-pointer"
            >
              <span>Trao đổi với Mai</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={ZALO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0068FF] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Nhắn Zalo: {ZALO_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
