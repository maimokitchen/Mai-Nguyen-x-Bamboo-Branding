import React from 'react';
import { BambooLogo } from './BambooLogo';
import { ArrowUp, MessageCircle, Phone, Lock } from 'lucide-react';
import { ZALO_PHONE, ZALO_PHONE_DISPLAY, ZALO_LINK } from '../utils/zaloManager';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = [
    { label: 'Mai là ai', href: '#ve-mai' },
    { label: 'Phương pháp', href: '#phuong-phap' },
    { label: 'Giải pháp', href: '#giai-phap' },
    { label: 'Case Study', href: '#case-study' },
    { label: 'Minh chứng', href: '#minh-chung' },
    { label: 'Kết nối', href: '#ket-noi' },
  ];

  return (
    <footer className="bg-[#243d30] text-[#F5EFE0] border-t border-white/10 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10 items-start">
          {/* Brand */}
          <div className="md:col-span-5 space-y-3">
            <BambooLogo theme="white" />
            <p className="text-xs sm:text-sm text-[#B8C5B0] max-w-sm leading-relaxed">
              Đồng hành cùng người có chuyên môn và kinh nghiệm biến năng lực thành tài sản có thể bán, chuyển giao và nhân bản.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F5EFE0]">
                Hotline & Zalo: {ZALO_PHONE_DISPLAY}
              </span>
            </div>
          </div>

          {/* Direct Zalo Contact Card in Footer */}
          <div className="md:col-span-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0068FF] text-white flex items-center justify-center font-black text-xs shadow-sm">
                Zalo
              </div>
              <div>
                <p className="text-xs font-bold text-white">Liên hệ trực tiếp qua Zalo</p>
                <p className="text-[11px] text-[#B8C5B0]">Phản hồi nhanh trong ngày</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={ZALO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0068FF] hover:bg-[#0052cc] text-white text-xs font-bold transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat: {ZALO_PHONE_DISPLAY}</span>
              </a>

              <a
                href={`tel:${ZALO_PHONE}`}
                className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#F5EFE0] text-xs font-semibold transition-all cursor-pointer"
                title={`Gọi điện tới ${ZALO_PHONE_DISPLAY}`}
              >
                <Phone className="w-3.5 h-3.5 text-[#B8C5B0]" />
                <span>Gọi</span>
              </a>
            </div>
          </div>

          {/* Quick Nav & Back to Top */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between space-y-4">
            <div className="flex flex-wrap md:justify-end gap-x-4 gap-y-2 text-xs text-[#F5EFE0]/80">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs text-[#B8C5B0] hover:text-white transition-colors p-2.5 rounded-full bg-white/5 border border-white/10 cursor-pointer w-fit"
              aria-label="Về đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Lên đầu trang</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits & Integrity */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Mai Nguyễn × Bamboo Branding. Đánh thức giá trị – Kiến tạo tài sản.</p>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span>Zalo: <strong className="text-white/80 font-mono">{ZALO_PHONE_DISPLAY}</strong></span>
            <span>•</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-[#A8D5BA] transition-colors flex items-center gap-1 cursor-pointer"
                title="Dành riêng cho Mai Nguyễn đăng nhập quản trị ảnh feedback"
              >
                <Lock className="w-3 h-3" />
                <span>Quản trị</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
