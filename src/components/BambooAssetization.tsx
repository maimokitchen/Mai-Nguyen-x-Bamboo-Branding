import React, { useState } from 'react';
import { BambooSymbol } from './BambooLogo';
import { ArrowRight, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { BambooLayer } from '../types';

export const BambooAssetization: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers: BambooLayer[] = [
    {
      number: '01',
      code: 'ROOT / GỐC',
      name: 'Khởi nguồn từ nội lực vững chắc',
      question: 'Tôi thực sự có gì?',
      tag: 'Nền tảng',
      description:
        'Kiểm kê toàn diện vốn sống, vốn nghề, chuyên môn, kỹ năng, các mối quan hệ và những bài học xương máu đã tích lũy trong sự nghiệp. Không xây nhà trên cát, mọi tài sản bền vững đều bắt đầu từ gốc rễ thực chất.',
      deliverables: [
        'Bản đồ kiểm kê tri thức và kinh nghiệm (Knowledge Inventory)',
        'Xác định điểm mạnh lõi và thế mạnh tự nhiên',
        'Tổng hợp bài học, quy trình nội bộ và tài liệu phân tán',
      ],
    },
    {
      number: '02',
      code: 'VALUE / GIÁ TRỊ',
      name: 'Chuyển hóa sang góc nhìn thị trường',
      question: 'Điều gì trong đó hữu ích với người khác?',
      tag: 'Sàng lọc',
      description:
        'Không phải mọi thứ bạn biết đều có thể bán. Tầng này giúp bóc tách và định danh chính xác phần năng lực có khả năng giải quyết một nỗi đau có thật, cấp thiết mà người khác sẵn sàng trả tiền hoặc trân trọng tiếp nhận.',
      deliverables: [
        'Bộ lọc giá trị thương mại (Commercial Value Filter)',
        'Bản phân tích khoảng trống giá trị và nỗi đau khách hàng',
        'Định vị giá trị độc bản (Unique Value Proposition)',
      ],
    },
    {
      number: '03',
      code: 'ASSET / TÀI SẢN',
      name: 'Hệ thống hóa & Độc lập hóa',
      question: 'Điều gì có thể hệ thống hóa và sử dụng lại?',
      tag: 'Cấu trúc',
      description:
        'Biến kinh nghiệm trừu tượng thành tài sản hữu hình có thể tái sử dụng nhiều lần mà không hao tổn thời gian. Xây dựng công thức, quy trình, biểu mẫu, framework và tài liệu hóa tri thức.',
      deliverables: [
        'Framework độc quyền mang dấu ấn cá nhân',
        'Bộ quy trình chuẩn (SOP) & công cụ hướng dẫn',
        'Cơ sở dữ liệu tri thức có cấu trúc (Structured Knowledge Base)',
      ],
    },
    {
      number: '04',
      code: 'SOLUTION / GIẢI PHÁP',
      name: 'Định hình bài toán & đối tượng',
      question: 'Tôi giải quyết vấn đề gì và cho ai?',
      tag: 'Thiết kế',
      description:
        'Ráp nối tài sản đã đúc kết thành một lộ trình giải pháp hoàn chỉnh cho một phân khúc khách hàng xác định. Xác định rõ điểm bắt đầu (A) và đích đến (B) của người đồng hành.',
      deliverables: [
        'Lộ trình chuyển đổi của khách hàng (Transformation Roadmap)',
        'Chân dung đối tượng hưởng lợi tối đa từ giải pháp',
        'Cam kết chuẩn đầu ra rõ ràng và đo lường được',
      ],
    },
    {
      number: '05',
      code: 'PRODUCT / SẢN PHẨM',
      name: 'Đóng gói hình thái chuyển giao',
      question: 'Giải pháp nên được đóng gói dưới hình thức nào?',
      tag: 'Đóng gói',
      description:
        'Lựa chọn dạng thức sản phẩm phù hợp nhất với mô hình sống và năng lực: 1:1 Mentoring, Workshop, Khóa học tự học, Ebook chuyên sâu, Bộ công cụ thực chiến hay Web app/Custom AI Agent.',
      deliverables: [
        'Thiết kế kiến trúc sản phẩm (Product Architecture)',
        'Kịch bản chuyển giao và tài liệu hướng dẫn học viên/khách hàng',
        'Ứng dụng AI để số hóa và tăng tốc độ hoàn thiện',
      ],
    },
    {
      number: '06',
      code: 'BRAND / THƯƠNG HIỆU',
      name: 'Khắc sâu dấu ấn trong tâm trí',
      question: 'Thị trường sẽ nhớ tôi vì giá trị gì?',
      tag: 'Định vị',
      description:
        'Xây dựng personal authority thực chất, không màu mè. Định vị để khi ai đó gặp vấn đề trong ngách của bạn, bạn là cái tên đầu tiên xuất hiện với uy tín chuyên gia không thể nhầm lẫn.',
      deliverables: [
        'Hệ thống thông điệp cốt lõi & câu chuyện chuyển giao',
        'Chiến lược nội dung dựa trên tri thức thật (Thought Leadership)',
        'Bộ nhận diện profile cá nhân chuyên nghiệp và nhất quán',
      ],
    },
    {
      number: '07',
      code: 'BUSINESS / KINH DOANH',
      name: 'Thương mại hóa & Vận hành bền vững',
      question: 'Làm thế nào đưa tài sản ra thị trường và tạo doanh thu?',
      tag: 'Thương mại',
      description:
        'Thiết lập phễu tiếp cận, cơ chế trao đổi giá trị, báo giá, hệ thống thanh toán và chuyển giao tự động. Xây dựng nguồn thu nhập độc lập, bền bỉ và có khả năng mở rộng quy mô.',
      deliverables: [
        'Chiến lược giá và các nấc thang giá trị (Value Ladder)',
        'Quy trình tư vấn & chuyển đổi nhẹ nhàng, không chèo kéo',
        'Kế hoạch vận hành và nhân bản giải pháp số',
      ],
    },
  ];

  return (
    <section
      id="phuong-phap"
      className="py-16 sm:py-24 bg-[#F5EFE0] border-b border-[#3D2F1F]/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PHƯƠNG PHÁP ĐỘC QUYỀN</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C4A3A] tracking-tight">
            BAMBOO ASSETIZATION™
          </h2>

          <p className="font-serif text-xl sm:text-2xl text-[#C97B63] font-medium">
            7 tầng biến năng lực thành tài sản
          </p>

          <p className="text-sm sm:text-base text-[#3D2F1F]/80 max-w-2xl mx-auto leading-relaxed">
            Như loài tre dành nhiều năm cắm sâu bộ rễ kiên cố vào lòng đất trước khi vươn cao mạnh mẽ, hành trình kiến tạo tài sản của bạn cũng cần đi tuần tự qua 7 tầng cấu trúc chuẩn mực:
          </p>
        </div>

        {/* 7-Tier Interactive Structure Layout */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: The 7-tier bamboo ladder selector */}
          <div className="lg:col-span-5 space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#3D2F1F]/60 mb-3 px-1">
              7 TẦNG KIẾN TẠO TÀI SẢN (Chọn tầng để xem chi tiết)
            </p>

            {layers.map((layer, idx) => {
              const isActive = activeLayer === idx;
              return (
                <button
                  key={layer.number}
                  onClick={() => setActiveLayer(idx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#2C4A3A] text-white border-[#2C4A3A] shadow-md translate-x-1.5'
                      : 'bg-white/70 text-[#3D2F1F] border-[#3D2F1F]/10 hover:bg-white hover:border-[#4A7C59]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-[#F5EFE0]'
                          : 'bg-[#4A7C59]/10 text-[#4A7C59]'
                      }`}
                    >
                      {layer.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold tracking-wide uppercase ${
                            isActive ? 'text-[#B8C5B0]' : 'text-[#4A7C59]'
                          }`}
                        >
                          {layer.code}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            isActive
                              ? 'bg-white/10 text-white/80'
                              : 'bg-[#3D2F1F]/5 text-[#3D2F1F]/60'
                          }`}
                        >
                          {layer.tag}
                        </span>
                      </div>
                      <p
                        className={`text-sm font-semibold mt-0.5 line-clamp-1 ${
                          isActive ? 'text-[#F5EFE0]' : 'text-[#2C4A3A]'
                        }`}
                      >
                        {layer.question}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive
                        ? 'text-[#F5EFE0] translate-x-0.5'
                        : 'text-[#3D2F1F]/30 group-hover:text-[#4A7C59]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Active Tier Deep-Dive Visual Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#3D2F1F]/10 shadow-[0_8px_30px_rgba(61,47,31,0.06)] sticky top-28 space-y-6">
              
              {/* Header of the Active Layer */}
              <div className="flex items-start justify-between border-b border-[#3D2F1F]/10 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A7C59]">
                    <span>TẦNG {layers[activeLayer].number}</span>
                    <span>•</span>
                    <span>{layers[activeLayer].code}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C4A3A] mt-1.5">
                    {layers[activeLayer].question}
                  </h3>
                  <p className="text-sm font-medium text-[#C97B63] mt-1">
                    {layers[activeLayer].name}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#4A7C59]/10 flex items-center justify-center shrink-0">
                  <BambooSymbol className="w-7 h-9" color="#4A7C59" />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#3D2F1F]/85 leading-relaxed">
                {layers[activeLayer].description}
              </p>

              {/* Concrete Outcomes / Deliverables */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C4A3A]">
                  KẾT QUẢ ĐẦU RA CỦA TẦNG NÀY:
                </h4>
                <div className="space-y-2.5">
                  {layers[activeLayer].deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[#F5EFE0]/60 border border-[#3D2F1F]/10 flex items-start gap-3 text-xs sm:text-sm text-[#3D2F1F]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation between layers inside card */}
              <div className="pt-4 border-t border-[#3D2F1F]/10 flex items-center justify-between">
                <button
                  disabled={activeLayer === 0}
                  onClick={() => setActiveLayer(activeLayer - 1)}
                  className="text-xs font-semibold text-[#3D2F1F]/60 hover:text-[#2C4A3A] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  ← Tầng trước
                </button>

                <span className="text-xs text-[#3D2F1F]/40 font-mono">
                  {activeLayer + 1} / {layers.length}
                </span>

                <button
                  disabled={activeLayer === layers.length - 1}
                  onClick={() => setActiveLayer(activeLayer + 1)}
                  className="text-xs font-semibold text-[#4A7C59] hover:text-[#2C4A3A] disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1"
                >
                  <span>Tầng tiếp theo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Closing Core Axiom */}
        <div className="mt-14 max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#2C4A3A] text-[#F5EFE0] text-center space-y-2 shadow-md">
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white/60">
            NGUYÊN TẮC CỐT LÕI
          </p>
          <p className="font-serif text-lg sm:text-xl text-white/80 line-through decoration-white/40">
            ĐỪNG BẮT ĐẦU BẰNG: “Tôi nên làm sản phẩm gì?”
          </p>
          <p className="font-serif text-xl sm:text-2xl font-bold text-[#D4A574] pt-1">
            HÃY BẮT ĐẦU BẰNG: “TÔI ĐANG CÓ TÀI SẢN GÌ?”
          </p>
        </div>

      </div>
    </section>
  );
};
