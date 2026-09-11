import React from 'react';
import { ArrowDown, Check, Sparkles } from 'lucide-react';
import { BambooSymbol } from './BambooLogo';

export const Transformation: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'KINH NGHIỆM / CHUYÊN MÔN',
      subtitle: 'Vốn sống, nghề nghiệp & tri thức tích lũy',
      desc: 'Những gì đang nằm phân tán trong đầu bạn, trong công việc hàng ngày hoặc tài liệu cũ.',
    },
    {
      num: '02',
      title: 'NHÌN RA GIÁ TRỊ',
      subtitle: 'Bóc tách & định danh điểm mạnh giải quyết vấn đề',
      desc: 'Phát hiện đâu là giá trị cốt lõi giải quyết nỗi đau cụ thể của thị trường mục tiêu.',
    },
    {
      num: '03',
      title: 'THIẾT KẾ GIẢI PHÁP',
      subtitle: 'Cấu trúc thành phương pháp rõ ràng',
      desc: 'Xây dựng lộ trình, framework từng bước giúp người khác dễ dàng làm theo và đạt kết quả.',
    },
    {
      num: '04',
      title: 'ĐÓNG GÓI SẢN PHẨM',
      subtitle: 'Định hình dạng thức chuyển giao',
      desc: 'Quyết định hình thái sản phẩm: workshop, mentoring 1:1, khóa học, tài liệu hay bộ công cụ.',
    },
    {
      num: '05',
      title: 'SỐ HÓA TÀI SẢN',
      subtitle: 'Đòn bẩy AI & công nghệ',
      desc: 'Tạo trợ lý AI chuyên biệt, web app, tài liệu số và hệ thống quản lý nội dung thông minh.',
    },
    {
      num: '06',
      title: 'ĐƯA RA THỊ TRƯỜNG',
      subtitle: 'Định vị thương hiệu & kênh tiếp cận',
      desc: 'Kênh truyền thông, thông điệp truyền tải chuẩn xác và chiến lược tiếp cận đối tượng mục tiêu.',
    },
    {
      num: '07',
      title: 'TẠO KHẢ NĂNG SINH THU NHẬP',
      subtitle: 'Bán, chuyển giao & nhân bản bền vững',
      desc: 'Tạo dòng doanh thu độc lập từ năng lực cá nhân mà không bị giới hạn bởi thời gian trực tiếp.',
    },
  ];

  return (
    <section
      id="chuyen-hoa"
      className="py-16 sm:py-24 bg-[#F5EFE0] border-b border-[#3D2F1F]/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TỪ NĂNG LỰC → TÀI SẢN</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C4A3A] tracking-tight leading-tight">
            TÔI GIÚP BẠN ĐI TỪ NHỮNG GÌ ĐANG NẰM TRONG ĐẦU ĐẾN MỘT TÀI SẢN CÓ THỂ ĐƯA RA THỊ TRƯỜNG.
          </h2>

          <p className="text-xs sm:text-sm tracking-[0.25em] uppercase font-bold text-[#3D2F1F]/60">
            FROM EXPERIENCE → TO ASSET
          </p>
        </div>

        {/* Visual Transformation Flow Pipeline */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="space-y-3">
            {steps.map((step, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === steps.length - 1;
              return (
                <div key={step.num} className="relative">
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isLast
                        ? 'bg-[#2C4A3A] text-white border-[#2C4A3A] shadow-md'
                        : isFirst
                        ? 'bg-white text-[#3D2F1F] border-[#3D2F1F]/15 shadow-sm'
                        : 'bg-white/80 text-[#3D2F1F] border-[#3D2F1F]/10'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-sm font-bold shrink-0 ${
                          isLast
                            ? 'bg-white/20 text-[#F5EFE0]'
                            : 'bg-[#4A7C59]/10 text-[#4A7C59]'
                        }`}
                      >
                        {step.num}
                      </span>
                      <div>
                        <h3
                          className={`font-serif text-base sm:text-lg font-bold tracking-tight ${
                            isLast ? 'text-[#F5EFE0]' : 'text-[#2C4A3A]'
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm font-medium ${
                            isLast ? 'text-[#B8C5B0]' : 'text-[#3D2F1F]/70'
                          }`}
                        >
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`text-xs sm:text-sm max-w-sm text-left sm:text-right ${
                        isLast ? 'text-white/80' : 'text-[#3D2F1F]/70'
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>

                  {!isLast && (
                    <div className="flex justify-center my-1">
                      <div className="w-6 h-6 rounded-full bg-[#B8C5B0]/40 flex items-center justify-center">
                        <ArrowDown className="w-3.5 h-3.5 text-[#4A7C59]" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing Highlight Banner */}
        <div className="mt-12 text-center p-6 sm:p-8 rounded-2xl bg-white border border-[#3D2F1F]/10 max-w-3xl mx-auto shadow-sm">
          <div className="w-8 h-8 rounded-full bg-[#4A7C59]/10 flex items-center justify-center mx-auto mb-3">
            <Check className="w-4 h-4 text-[#4A7C59]" />
          </div>
          <p className="font-serif text-lg sm:text-xl font-bold text-[#2C4A3A] leading-snug">
            “Tôi không giúp bạn tạo thêm một sản phẩm ngẫu nhiên.
            <br />
            Tôi giúp bạn tài sản hóa những gì mình đã có.”
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#3D2F1F]/60">
            <BambooSymbol className="w-4 h-5" color="#4A7C59" />
            <span>Cam kết đồng hành cùng Mai Nguyễn</span>
          </div>
        </div>

      </div>
    </section>
  );
};
