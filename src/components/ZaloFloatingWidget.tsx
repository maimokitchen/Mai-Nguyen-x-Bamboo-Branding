import React, { useState } from 'react';
import { MessageCircle, Phone, X, ExternalLink, Copy, Check } from 'lucide-react';
import { ZALO_PHONE, ZALO_PHONE_DISPLAY, ZALO_LINK } from '../utils/zaloManager';

export const ZaloFloatingWidget: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ZALO_PHONE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      
      {/* Quick Action Popup Menu */}
      {isOpenMenu && (
        <div className="w-64 bg-white rounded-2xl shadow-2xl border border-[#3D2F1F]/15 p-4 space-y-3 animate-fade-in text-[#3D2F1F]">
          
          <div className="flex items-center justify-between border-b border-[#3D2F1F]/10 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0068FF] text-white flex items-center justify-center font-black text-[10px]">
                Zalo
              </div>
              <div>
                <p className="text-xs font-bold text-[#2C4A3A]">Mai Nguyễn</p>
                <p className="text-[10px] text-[#3D2F1F]/60">{ZALO_PHONE_DISPLAY}</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpenMenu(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <a
              href={ZALO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpenMenu(false)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Mở Chat Zalo ngay</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              type="button"
              onClick={handleCopyPhone}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#F5EFE0] hover:bg-[#F5EFE0]/80 text-[#2C4A3A] font-semibold text-xs transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#4A7C59]" />}
                <span>{copied ? 'Đã chép số điện thoại!' : `Sao chép: ${ZALO_PHONE_DISPLAY}`}</span>
              </div>
            </button>

            <a
              href={`tel:${ZALO_PHONE}`}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F5EFE0] hover:bg-[#F5EFE0]/80 text-[#2C4A3A] font-semibold text-xs transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#4A7C59]" />
              <span>Gọi điện: {ZALO_PHONE_DISPLAY}</span>
            </a>
          </div>

        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="flex items-center gap-2 group">
        
        {/* Desktop Direct Chat Link Badge */}
        <a
          href={ZALO_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-[#3D2F1F]/10 text-xs font-bold text-[#2C4A3A] hover:text-[#0068FF] hover:border-[#0068FF]/40 transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Nhắn Zalo: {ZALO_PHONE_DISPLAY}</span>
        </a>

        {/* Main Floating Zalo Button */}
        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          id="floating-zalo-btn"
          aria-label="Liên hệ qua Zalo 0814458686"
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0068FF] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(0,104,255,0.4)] hover:shadow-[0_10px_30px_rgba(0,104,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          {/* Subtle radiating ring */}
          <span className="absolute inset-0 rounded-full bg-[#0068FF] animate-ping opacity-25 pointer-events-none" />

          {/* Zalo official text logo */}
          <span className="font-black text-sm sm:text-base tracking-tighter uppercase select-none z-10">
            Zalo
          </span>
        </button>

      </div>

    </div>
  );
};
