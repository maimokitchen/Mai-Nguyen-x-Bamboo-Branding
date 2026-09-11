import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { BambooSymbol } from './BambooLogo';

export const AiAsLeverage: React.FC = () => {
  const processSteps = [
    {
      num: '01',
      title: 'BÓC TÁCH',
      focus: 'Kinh nghiệm & tri thức ẩn',
      desc: 'Phỏng vấn chuyên sâu, khai phóng những điều bạn làm theo trực giác thành dữ liệu rõ ràng.',
    },
    {
      num: '02',
      title: 'HỆ THỐNG HÓA',
      focus: 'Phương pháp & quy trình chuẩn',
      desc: 'Tổ chức các bài học thành framework mạch lạc, logic và chuẩn hóa từng bước.',
    },
    {
      num: '03',
      title: 'ĐÓNG GÓI',
      focus: 'Nội dung & cấu trúc giải pháp',
      desc: 'Biến khung tri thức thành tài liệu, bài giảng, biểu mẫu hoặc kịch bản chuyển giao.',
    },
    {
      num: '04',
      title: 'SỐ HÓA',
      focus: 'Tri thức thành tài sản số',
      desc: 'Thiết kế trợ lý AI, tài liệu tương tác và website giúp khách hàng tự trải nghiệm.',
    },
    {
      num: '05',
      title: 'NHÂN BẢN',
      focus: 'Khả năng phục vụ rộng lớn',
      desc: 'Giải phóng thời gian cá nhân nhưng vẫn đảm bảo chất lượng chuyển giao chính xác.',
    },
  ];

  const assetFormats = [
    { name: 'Workshop Thực chiến', category: 'Chuyển giao trực tiếp' },
    { name: 'Ebook & Cẩm nang chuyên sâu', category: 'Tài liệu số' },
    { name: 'Chương trình Mentoring 1:1', category: 'Đồng hành cao cấp' },
    { name: 'Khóa học Video có cấu trúc', category: 'Sản phẩm tự học' },
    { name: 'Bộ công cụ & Biểu mẫu chuẩn', category: 'Toolkits & SOP' },
    { name: 'Custom GPT / Trợ lý Gem', category: 'Trợ lý AI chuyên biệt' },
    { name: 'Website Profile Cá nhân', category: 'Hiện diện số uy tín' },
    { name: 'Landing Page Chuyển đổi', category: 'Trang giới thiệu giải pháp' },
    { name: 'Web App / Công cụ giải pháp', category: 'Ứng dụng số hóa' },
    { name: 'AI Agent Tự động hóa', category: 'Tự động quy trình' },
    { name: 'Hệ thống Nội dung Đa kênh', category: 'Tài sản truyền thông' },
  ];

  return (
    <section
      id="ai-don-bay"
      className="py-16 sm:py-24 bg-white/70 border-b border-[#3D2F1F]/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI & CÔNG NGHỆ</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C4A3A] tracking-tight">
            AI KHÔNG PHẢI ĐÍCH ĐẾN.
            <br />
            AI LÀ ĐÒN BẨY.
          </h2>

          <p className="text-base sm:text-lg text-[#3D2F1F]/85 leading-relaxed">
            Tôi sử dụng AI và công nghệ để giúp quá trình tài sản hóa diễn ra nhanh hơn, có cấu trúc hơn và dễ nhân bản hơn. Không chạy theo trào lưu, không công nghệ hóa hời hợt, mà dùng AI để phụng sự giá trị con người.
          </p>
        </div>

        {/* 5-Step Leverage Process */}
        <div className="mt-12">
          <p className="text-xs font-bold uppercase tracking-wider text-[#3D2F1F]/60 mb-4">
            QUY TRÌNH ĐÒN BẨY TÀI SẢN HÓA CÙNG AI
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {processSteps.map((step, idx) => (
              <div
                key={step.num}
                className="p-5 rounded-2xl bg-[#F5EFE0]/80 border border-[#3D2F1F]/10 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#4A7C59] bg-[#4A7C59]/10 px-2.5 py-0.5 rounded-md">
                      {step.num}
                    </span>
                    {idx < processSteps.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#3D2F1F]/30 hidden lg:block" />
                    )}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C4A3A] mt-3">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#C97B63] mt-0.5">
                    {step.focus}
                  </p>
                </div>
                <p className="text-xs text-[#3D2F1F]/75 leading-relaxed pt-2 border-t border-[#3D2F1F]/10">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Formats Grid */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#F5EFE0] border border-[#3D2F1F]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#3D2F1F]/10">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C4A3A]">
                Các Dạng Thức Tài Sản Số Có Thể Đóng Gói
              </h3>
              <p className="text-xs text-[#3D2F1F]/70 mt-0.5">
                Tùy thuộc vào năng lực cốt lõi và mục tiêu của bạn:
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#4A7C59] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Độc quyền theo phong cách của bạn</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {assetFormats.map((format, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/80 border border-[#3D2F1F]/10 hover:border-[#4A7C59]/40 hover:bg-white transition-colors"
              >
                <p className="text-xs sm:text-sm font-bold text-[#2C4A3A]">
                  {format.name}
                </p>
                <p className="text-[11px] text-[#3D2F1F]/60 mt-0.5">
                  {format.category}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Axiom */}
        <div className="mt-10 text-center p-6 rounded-2xl bg-[#2C4A3A] text-white shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-1">
            <BambooSymbol className="w-5 h-6" color="#B8C5B0" />
            <span className="text-xs tracking-wider uppercase text-[#B8C5B0] font-semibold">
              TRIẾT LÝ VỮNG VÀNG
            </span>
          </div>
          <p className="font-serif text-lg sm:text-2xl font-bold text-[#F5EFE0]">
            CÔNG NGHỆ THAY ĐỔI. GIÁ TRỊ CỐT LÕI CỦA BẠN THÌ KHÔNG.
          </p>
        </div>

      </div>
    </section>
  );
};
