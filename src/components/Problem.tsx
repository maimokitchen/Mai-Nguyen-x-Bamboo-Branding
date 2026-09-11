import React from 'react';
import { HelpCircle, AlertCircle, Sparkles, Layers, Box, Cpu } from 'lucide-react';

export const Problem: React.FC = () => {
  const painPoints = [
    {
      id: '01',
      icon: Box,
      quote: '“Tôi biết rất nhiều nhưng không biết nên đóng gói cái gì.”',
      context: 'Kiến thức mênh mông, mỗi ngày tư vấn một kiểu khác nhau, thiếu khung chuẩn hóa để người khác dễ dàng hấp thu.',
    },
    {
      id: '02',
      icon: HelpCircle,
      quote: '“Kinh nghiệm của tôi liệu có ai sẵn sàng trả tiền không?”',
      context: 'Hoài nghi về giá trị thương mại vì những gì bạn làm tốt đã trở nên quá quen thuộc và hiển nhiên với chính bạn.',
    },
    {
      id: '03',
      icon: Sparkles,
      quote: '“Tôi muốn đưa chuyên môn lên môi trường số nhưng không biết bắt đầu từ đâu.”',
      context: 'Bị choáng ngợp giữa hàng loạt công cụ, nền tảng công nghệ, mô hình bán khóa học hay kênh truyền thông.',
    },
    {
      id: '04',
      icon: Layers,
      quote: '“Tôi có nhiều tài liệu và nội dung nhưng chúng vẫn nằm rời rạc.”',
      context: 'Tập tin lưu trong máy tính, slide thuyết trình, ghi chú kinh nghiệm chưa được kết nối thành một hệ sinh thái sản phẩm.',
    },
    {
      id: '05',
      icon: Cpu,
      quote: '“Tôi đã dùng AI nhưng chưa tạo ra được tài sản thực sự thuộc về mình.”',
      context: 'Thử viết prompt, tạo ảnh hay tóm tắt văn bản, nhưng AI chỉ dừng ở mức công cụ tiện ích chứ chưa thành tài sản kinh doanh.',
    },
  ];

  return (
    <section
      id="van-de"
      className="py-16 sm:py-24 bg-white/60 border-b border-[#3D2F1F]/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C97B63]/10 text-[#C97B63] text-xs font-bold uppercase tracking-wider">
            <span>VẤN ĐỀ TÔI NHÌN THẤY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C4A3A] tracking-tight">
            BẠN KHÔNG THIẾU GIÁ TRỊ.
          </h2>

          <p className="text-xl sm:text-2xl font-medium text-[#3D2F1F] leading-snug">
            Bạn đang thiếu một cấu trúc để biến giá trị thành tài sản.
          </p>

          <p className="text-base sm:text-lg text-[#3D2F1F]/80 leading-relaxed pt-2">
            Có thể bạn đã làm nghề nhiều năm. Bạn có rất nhiều kiến thức, kinh nghiệm, tài liệu, quy trình, phương pháp, case và bài học. Nhưng khi muốn tạo một sản phẩm từ chính năng lực của mình, bạn lại không biết nên bắt đầu từ đâu.
          </p>
        </div>

        {/* 5 Pain Points Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {painPoints.map((item, idx) => {
            const Icon = item.icon;
            const isFullWidth = idx === 4; // Make the 5th card stand out or span nicely on desktop
            return (
              <div
                key={item.id}
                className={`p-6 rounded-2xl bg-[#F5EFE0]/70 border border-[#3D2F1F]/10 hover:border-[#4A7C59]/40 hover:bg-white transition-all duration-200 flex flex-col justify-between shadow-sm group ${
                  isFullWidth ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#4A7C59] bg-[#4A7C59]/10 px-2.5 py-0.5 rounded-full">
                      VẤN ĐỀ {item.id}
                    </span>
                    <Icon className="w-5 h-5 text-[#3D2F1F]/40 group-hover:text-[#4A7C59] transition-colors" />
                  </div>

                  <p className="font-serif text-base sm:text-lg font-bold text-[#2C4A3A] leading-snug">
                    {item.quote}
                  </p>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-[#3D2F1F]/75 leading-relaxed pt-3 border-t border-[#3D2F1F]/10">
                  {item.context}
                </p>
              </div>
            );
          })}
        </div>

        {/* Core Diagnosis Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#2C4A3A] text-white shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-[#D4A574]" />
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-[#B8C5B0] font-semibold">
                BẢN CHẤT VẤN ĐỀ
              </p>
              <p className="font-serif text-lg sm:text-xl font-bold text-[#F5EFE0]">
                Đây không đơn thuần là bài toán công nghệ.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-sm sm:text-base font-semibold text-[#D4A574]">
                <span>Nhìn ra giá trị</span>
                <span>→</span>
                <span>Cấu trúc giá trị</span>
                <span>→</span>
                <span>Thương mại hóa giá trị</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
