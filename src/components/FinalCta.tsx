import React from 'react';
import { ArrowUpRight, ArrowDown, MessageCircle, Phone } from 'lucide-react';
import { BambooSymbol } from './BambooLogo';
import { ZALO_PHONE, ZALO_PHONE_DISPLAY, ZALO_LINK } from '../utils/zaloManager';

interface FinalCtaProps {
  onOpenContact: (defaultStage?: string) => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenContact }) => {
  return (
    <section
      id="ket-noi"
      className="py-20 sm:py-28 bg-[#2C4A3A] text-white relative overflow-hidden"
    >
      {/* Subtle organic light accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#4A7C59]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#3D2F1F]/40 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Brand Symbol */}
        <div className="w-16 h-20 mx-auto rounded-2xl bg-white/10 flex items-center justify-center p-3">
          <BambooSymbol className="w-10 h-14" color="#F5EFE0" />
        </div>

        {/* Main Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EFE0] tracking-tight leading-tight max-w-3xl mx-auto">
          BẠN ĐÃ CÓ NGUYÊN LIỆU.
          <br />
          HÃY XEM CHÚNG CÓ THỂ TRỞ THÀNH TÀI SẢN GÌ.
        </h2>

        {/* Body Copy */}
        <p className="text-base sm:text-lg text-[#F5EFE0]/85 max-w-2xl mx-auto leading-relaxed">
          Nếu bạn đã có nhiều năm chuyên môn, kinh nghiệm, một kỹ năng, một phương pháp hoặc những kết quả thực tế nhưng chưa biết nên đóng gói và đưa chúng ra thị trường như thế nào, chúng ta có thể bắt đầu bằng một cuộc trò chuyện.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenContact()}
            id="final-cta-primary-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#4A7C59] text-white text-base font-bold hover:bg-[#3b6547] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer active:scale-95"
          >
            <span>TRAO ĐỔI VỚI MAI</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>

          <a
            href="#phuong-phap"
            id="final-cta-secondary-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-[#F5EFE0] text-base font-medium hover:bg-white/20 transition-all duration-200 cursor-pointer"
          >
            <span>Khám phá phương pháp Bamboo Assetization™</span>
            <ArrowDown className="w-4 h-4 opacity-70" />
          </a>
        </div>

        {/* Direct Zalo Connect Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs text-[#F5EFE0]">
            <div className="w-5 h-5 rounded-md bg-[#0068FF] text-white flex items-center justify-center font-black text-[8px]">
              Zalo
            </div>
            <span>Kết nối nhanh qua Zalo:</span>
            <span className="font-mono font-bold text-white">{ZALO_PHONE_DISPLAY}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={ZALO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0068FF] hover:bg-[#0052cc] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Nhắn Zalo</span>
            </a>

            <a
              href={`tel:${ZALO_PHONE}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F5EFE0] text-xs font-medium transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Gọi điện</span>
            </a>
          </div>
        </div>

        {/* Official Signature */}
        <div className="pt-8 border-t border-white/15 max-w-md mx-auto space-y-2">
          <p className="text-sm font-semibold tracking-wider uppercase text-[#B8C5B0]">
            MAI NGUYỄN — MENTOR THIẾT KẾ GIẢI PHÁP SỐ
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-white/70 italic">
            <span>Bamboo Branding</span>
            <span>•</span>
            <span>Đánh thức giá trị – Kiến tạo tài sản.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
