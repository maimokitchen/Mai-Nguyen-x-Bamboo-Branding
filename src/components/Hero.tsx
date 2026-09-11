import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, ShieldCheck, Upload, Camera, RefreshCw, Trash2, CheckCircle2, MessageCircle } from 'lucide-react';
import { BambooSymbol } from './BambooLogo';
import { loadCurrentPortrait, optimizeImage, savePortrait, removePortraitFromDb } from '../utils/portraitManager';
import { ZALO_PHONE_DISPLAY, ZALO_LINK } from '../utils/zaloManager';

interface HeroProps {
  onOpenContact: (defaultStage?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load photo on mount and listen to updates
  useEffect(() => {
    let isMounted = true;
    loadCurrentPortrait().then((url) => {
      if (isMounted && url) {
        setPhotoUrl(url);
      }
    });

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<{ url: string }>;
      if (customEvt.detail?.url) {
        setPhotoUrl(customEvt.detail.url);
      }
    };

    window.addEventListener('mai-portrait-updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('mai-portrait-updated', handleUpdate);
    };
  }, []);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsProcessing(true);
    try {
      const optimized = await optimizeImage(file);
      await savePortrait(optimized);
      setPhotoUrl(optimized);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error('Error processing photo:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemovePhoto = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await removePortraitFromDb();
    localStorage.removeItem('mai_nguyen_portrait_url');
    setPhotoUrl(null);
  };

  return (
    <section
      id="hero"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden border-b border-[#3D2F1F]/10"
    >
      {/* Background organic contour accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#B8C5B0]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -ml-24 w-80 h-80 rounded-full bg-[#D4A574]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Core Positioning & Copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#4A7C59]/10 border border-[#4A7C59]/20 text-[#2C4A3A]">
              <BambooSymbol className="w-4 h-5" color="#4A7C59" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">
                MAI NGUYỄN
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]"></span>
              <span className="text-xs sm:text-sm text-[#3D2F1F]/80 font-medium">
                Bamboo Branding
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#2C4A3A] leading-[1.15]">
              MENTOR THIẾT KẾ GIẢI PHÁP SỐ
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl font-medium text-[#3D2F1F] leading-relaxed max-w-2xl">
              Đồng hành cùng người có chuyên môn và kinh nghiệm biến năng lực thành tài sản có thể bán, chuyển giao và nhân bản.
            </p>

            {/* Supporting Copy */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/70 border border-[#3D2F1F]/10 space-y-3.5 text-[#3D2F1F]/90 text-sm sm:text-base leading-relaxed max-w-2xl shadow-sm">
              <p className="font-semibold text-[#2C4A3A]">
                Bạn không cần tạo thêm thật nhiều thứ mới.
              </p>
              <p>
                Có thể tài sản tiếp theo của bạn đang nằm ngay trong những năm tháng làm nghề, những kỹ năng bạn sử dụng mỗi ngày, những vấn đề bạn từng giải quyết và những bài học bạn đã trải qua.
              </p>
              <p className="border-l-2 border-[#4A7C59] pl-3 text-[#3D2F1F] font-medium">
                Tôi giúp bạn nhìn thấy, hệ thống hóa và biến những giá trị đó thành giải pháp có thể đưa ra thị trường.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <a
                href="#giai-phap"
                id="hero-primary-cta"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#4A7C59] text-white text-base font-semibold hover:bg-[#2C4A3A] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer text-center"
              >
                <span>Khám phá cách tôi đồng hành</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={() => onOpenContact()}
                id="hero-secondary-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/80 border border-[#3D2F1F]/20 text-[#3D2F1F] text-base font-medium hover:bg-white hover:border-[#4A7C59] hover:text-[#2C4A3A] transition-all duration-200 cursor-pointer text-center"
              >
                <span>Kết nối với Mai</span>
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </button>
            </div>

            {/* Quick Direct Zalo Connection */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={ZALO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white border border-[#0068FF]/30 text-xs text-[#1e293b] hover:text-[#0068FF] shadow-xs transition-all cursor-pointer"
              >
                <div className="w-4 h-4 rounded-md bg-[#0068FF] text-white flex items-center justify-center font-black text-[7px] leading-none">
                  Zalo
                </div>
                <span>Zalo trực tiếp:</span>
                <strong className="font-mono font-bold text-[#0068FF]">{ZALO_PHONE_DISPLAY}</strong>
              </a>
            </div>

            {/* Brand Signature */}
            <div className="pt-4 flex items-center gap-3 text-xs sm:text-sm text-[#3D2F1F]/70">
              <span className="font-semibold text-[#2C4A3A]">Bamboo Branding</span>
              <span>—</span>
              <span className="italic">Đánh thức giá trị – Kiến tạo tài sản.</span>
            </div>

          </div>

          {/* Right Column: Authentic Editorial Portrait Presentation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer decorative card frame */}
              <div className="relative rounded-3xl overflow-hidden bg-white border border-[#3D2F1F]/15 shadow-[0_12px_40px_rgba(61,47,31,0.08)] p-3 sm:p-4">
                
                {/* Photo container */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative aspect-[4/5] rounded-2xl overflow-hidden transition-all duration-300 flex items-center justify-center ${
                    isDragging
                      ? 'ring-4 ring-[#4A7C59] bg-[#4A7C59]/10'
                      : 'bg-gradient-to-b from-[#B8C5B0]/30 to-[#F5EFE0]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {photoUrl ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={photoUrl}
                        alt="Mai Nguyễn - Mentor Thiết kế Giải pháp Số"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Subtle gradient overlay for contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2C4A3A]/80 via-transparent to-black/20 pointer-events-none" />

                      {/* Top bar controls */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2C4A3A]/80 backdrop-blur-md text-xs text-[#F5EFE0] shadow-sm">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#B8C5B0]" />
                          <span>Mai Nguyễn Official</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            title="Thay đổi ảnh chân dung"
                            className="p-1.5 rounded-full bg-white/90 text-[#2C4A3A] hover:bg-white shadow hover:scale-105 transition-all cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={handleRemovePhoto}
                            title="Xóa ảnh và dùng layout mặc định"
                            className="p-1.5 rounded-full bg-white/90 text-red-600 hover:bg-white shadow hover:scale-105 transition-all cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Bottom Caption inside Photo */}
                      <div className="absolute bottom-4 inset-x-4 z-20 text-white space-y-1">
                        <div className="inline-flex items-center gap-1.5 text-xs text-[#B8C5B0] font-semibold tracking-wider uppercase">
                          <BambooSymbol className="w-3.5 h-4" color="#B8C5B0" />
                          <span>Bamboo Branding</span>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5EFE0] leading-tight drop-shadow-sm">
                          MAI NGUYỄN
                        </h3>
                        <p className="text-xs text-white/90 leading-snug">
                          Mentor Thiết Kế Giải Pháp Số & Tài Sản Tri Thức
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Interactive Drag & Drop Upload State */
                    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-7 bg-[#2C4A3A] text-white">
                      
                      {/* Top badge */}
                      <div className="flex items-center justify-between z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-[#F5EFE0]">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#B8C5B0]" />
                          <span>Profile Chính thức</span>
                        </div>
                        <BambooSymbol className="w-6 h-8 opacity-80" color="#F5EFE0" />
                      </div>

                      {/* Center Action Box */}
                      <div className="my-auto text-center space-y-4 py-4 z-10">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-[#F5EFE0]/10 border border-[#F5EFE0]/25 flex items-center justify-center p-3 transition-transform hover:scale-105">
                          <Camera className="w-10 h-10 text-[#F5EFE0]" />
                        </div>

                        <div className="space-y-1.5">
                          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#F5EFE0]">
                            ẢNH CHÂN DUNG MAI NGUYỄN
                          </h2>
                          <p className="text-xs text-[#B8C5B0] max-w-xs mx-auto">
                            Kéo thả file ảnh <span className="font-semibold text-white">EVT-51.JPG</span> vào đây hoặc nhấp nút bên dưới:
                          </p>
                        </div>

                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isProcessing}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4A7C59] hover:bg-[#3d6749] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                          >
                            <Upload className="w-4 h-4" />
                            <span>{isProcessing ? 'Đang xử lý ảnh...' : 'Chọn ảnh EVT-51.JPG'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Bottom note */}
                      <div className="z-10 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-[#F5EFE0]/75">
                        <span>EVT Conference & Mentoring</span>
                        <span className="italic">Tự động lưu & tối ưu</span>
                      </div>

                      {/* Subtle organic pattern */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F5EFE0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                    </div>
                  )}

                  {/* Upload Success Toast */}
                  {uploadSuccess && (
                    <div className="absolute top-4 inset-x-4 z-30 bg-[#2C4A3A] text-white p-2.5 rounded-xl shadow-lg border border-[#4A7C59] flex items-center justify-center gap-2 text-xs font-semibold animate-fade-in">
                      <CheckCircle2 className="w-4 h-4 text-[#B8C5B0]" />
                      <span>Đã cập nhật ảnh chân dung của Mai thành công!</span>
                    </div>
                  )}

                  {/* Floating badge bottom right */}
                  {!photoUrl && (
                    <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-[#3D2F1F]/10 shadow-md flex items-center gap-2.5 max-w-[210px]">
                      <div className="w-8 h-8 rounded-lg bg-[#4A7C59]/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-[#4A7C59]" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] text-[#3D2F1F]/60 font-semibold uppercase tracking-wider">
                          Phương pháp
                        </p>
                        <p className="text-xs font-bold text-[#2C4A3A] leading-tight">
                          Bamboo Assetization™
                        </p>
                      </div>
                    </div>
                  )}

                </div>

                {/* Card footer details */}
                <div className="mt-3.5 px-2 flex items-center justify-between text-xs text-[#3D2F1F]/80">
                  <span className="font-medium text-[#2C4A3A]">Mai Nguyễn × Bamboo Branding</span>
                  <span className="text-[11px] text-[#3D2F1F]/60">Hà Nội & Toàn quốc</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
