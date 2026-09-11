import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { BambooSymbol } from './BambooLogo';

export const BigIdea: React.FC = () => {
  const [selectedMaterials, setSelectedMaterials] = useState<number[]>([0, 1, 2, 3]);

  const rawMaterials = [
    { title: 'Kinh nghiệm nghề nghiệp', desc: 'Những năm tháng thực chiến trong ngành của bạn' },
    { title: 'Chuyên môn sâu', desc: 'Tri thức nền tảng và hiểu biết chuyên ngành đã tích lũy' },
    { title: 'Kỹ năng thực thi', desc: 'Những thao tác, kỹ năng bạn xử lý trơn tru mỗi ngày' },
    { title: 'Kết quả & Thành tựu', desc: 'Những cột mốc thành công, dự án đã hoàn thành cho khách hàng' },
    { title: 'Va chạm & Thất bại', desc: 'Những bài học đắt giá phải trả bằng thời gian và tiền bạc' },
    { title: 'Phương pháp & Quy trình', desc: 'Các bước triển khai bạn đã đúc kết qua thực tiễn' },
    { title: 'Case Study & Câu chuyện', desc: 'Tình huống thực tế, góc nhìn phân tích từ người trong nghề' },
    { title: 'Mạng lưới & Khách hàng', desc: 'Sự thấu hiểu tâm lý, nỗi đau và nhu cầu của nhóm người cụ thể' },
  ];

  const toggleMaterial = (idx: number) => {
    if (selectedMaterials.includes(idx)) {
      setSelectedMaterials(selectedMaterials.filter((i) => i !== idx));
    } else {
      setSelectedMaterials([...selectedMaterials, idx]);
    }
  };

  return (
    <section
      id="niem-tin"
      className="py-16 sm:py-24 bg-[#F5EFE0] border-b border-[#3D2F1F]/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] text-xs font-bold uppercase tracking-wider">
            <span>TÔI TIN RẰNG</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C4A3A] tracking-tight">
            BẠN KHÔNG BẮT ĐẦU TỪ SỐ 0.
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-[#C97B63] font-medium">
            Bạn bắt đầu từ những gì mình đã có.
          </p>
        </div>

        {/* Narrative Split / Core Philosophy */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: The philosophical shift */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#3D2F1F]/10 shadow-sm space-y-4">
              <p className="text-base sm:text-lg text-[#3D2F1F] leading-relaxed">
                Bạn đã có kinh nghiệm. Bạn đã có chuyên môn. Bạn đã có kỹ năng. Bạn đã có những kết quả thực tế.
              </p>
              <p className="text-sm sm:text-base text-[#3D2F1F]/80 leading-relaxed">
                Bạn cũng có những thất bại, va chạm và bài học phải mất nhiều năm mới có được.
                <span className="font-semibold text-[#2C4A3A]"> Tất cả đều có thể trở thành nguyên liệu.</span>
              </p>

              {/* The Key Question Shift */}
              <div className="mt-6 pt-6 border-t border-[#3D2F1F]/10 space-y-4">
                <div className="p-4 rounded-xl bg-[#3D2F1F]/[0.03] border border-[#3D2F1F]/10 opacity-75">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#3D2F1F]/60">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Vấn đề không phải là:</span>
                  </div>
                  <p className="mt-1.5 font-serif italic text-base sm:text-lg text-[#3D2F1F]/70">
                    “Tôi có gì để bán?”
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#4A7C59]/10 border border-[#4A7C59]/25">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A7C59]">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>Mà là:</span>
                  </div>
                  <p className="mt-1.5 font-serif font-semibold text-lg sm:text-xl text-[#2C4A3A]">
                    “Trong những gì tôi đã có, đâu là giá trị có thể giải quyết vấn đề cho người khác?”
                  </p>
                </div>
              </div>

              {/* Concluding statement */}
              <div className="pt-3">
                <p className="text-sm font-semibold text-[#2C4A3A]">
                  Đó là nơi tôi bắt đầu đồng hành cùng bạn.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interactive Raw Material Inventory */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-[#2C4A3A] text-white rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F5EFE0]">
                    Kho Nguyên Liệu Bạn Đang Sở Hữu
                  </h3>
                  <p className="text-xs text-[#B8C5B0] mt-0.5">
                    Nhấp để kiểm kê những gì bạn đã tích lũy trong sự nghiệp:
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-xs text-[#F5EFE0] font-mono">
                  {selectedMaterials.length}/8 sẵn có
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {rawMaterials.map((item, idx) => {
                  const isChecked = selectedMaterials.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleMaterial(idx)}
                      className={`text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-2.5 ${
                        isChecked
                          ? 'bg-white/15 border-white/30 text-white'
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          isChecked ? 'text-[#B8C5B0]' : 'text-white/30'
                        }`}
                      />
                      <div>
                        <div className="text-xs font-semibold">{item.title}</div>
                        <div className="text-[11px] text-white/70 mt-0.5 leading-snug">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BambooSymbol className="w-5 h-6" color="#B8C5B0" />
                  <span className="text-xs tracking-wider uppercase text-[#B8C5B0] font-semibold">
                    ĐÁNH THỨC GIÁ TRỊ – KIẾN TẠO TÀI SẢN
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
