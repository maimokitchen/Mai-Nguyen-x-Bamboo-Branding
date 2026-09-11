import React from 'react';
import { ArrowUpRight, Check, Compass, PenTool, Wrench, BookOpen } from 'lucide-react';
import { SolutionTrack } from '../types';

interface WaysToWorkProps {
  onOpenContact: (defaultStage?: string) => void;
}

export const WaysToWork: React.FC<WaysToWorkProps> = ({ onOpenContact }) => {
  const tracks: (SolutionTrack & { icon: React.ElementType; badge: string })[] = [
    {
      id: 'discover',
      code: '01 — DISCOVER',
      stage: 'Giai đoạn Khởi động',
      title: 'Khám Phá & Đóng Gói Tài Sản',
      badge: 'Sàng lọc',
      forWhom: 'Dành cho người có chuyên môn nhưng chưa biết nên đóng gói cái gì và bắt đầu từ đâu.',
      outcome: 'Bản đồ tài sản cá nhân rõ ràng, xác định chính xác năng lực cốt lõi có giá trị thương mại.',
      ctaText: 'Tôi muốn bắt đầu từ đây',
      icon: Compass,
      scopeList: [
        'Audit toàn bộ kho nguyên liệu tri thức & kinh nghiệm hiện có',
        'Phân tích đối tượng khách hàng mục tiêu phù hợp nhất',
        'Xác định bài toán và giá trị có thể thương mại hóa',
      ],
    },
    {
      id: 'design',
      code: '02 — DESIGN',
      stage: 'Đồng hành 1:1 Chuyên sâu',
      title: 'Mentoring Thiết Kế Giải Pháp 1:1',
      badge: 'Chuyên sâu',
      forWhom: 'Dành cho chuyên gia, quản lý, người làm nghề muốn có một người đồng hành trực tiếp đi qua từng tầng phương pháp.',
      outcome: 'Một framework hoàn chỉnh, cấu trúc sản phẩm rõ ràng và lộ trình đưa ra thị trường khả thi.',
      ctaText: 'Tìm hiểu Mentoring 1:1',
      icon: PenTool,
      scopeList: [
        'Đồng hành 1:1 thiết kế lộ trình chuyển đổi và framework',
        'Xây dựng cấu trúc sản phẩm (Workshop, Khóa học, Tài liệu)',
        'Định vị thương hiệu chuyên gia và chiến lược truyền thông',
      ],
    },
    {
      id: 'build',
      code: '03 — BUILD',
      stage: 'Triển khai Thực chiến',
      title: 'Thiết Kế & Triển Khai Giải Pháp Số',
      badge: 'Công nghệ',
      forWhom: 'Dành cho người đã có nội dung/giải pháp nhưng cần số hóa: tạo trợ lý AI, website profile, landing page hoặc ứng dụng số.',
      outcome: 'Tài sản số hoàn thiện, sẵn sàng vận hành, tiếp nhận người dùng và tạo ra dòng chuyển đổi.',
      ctaText: 'Trao đổi về giải pháp của tôi',
      icon: Wrench,
      scopeList: [
        'Xây dựng Custom AI Agent / Trợ lý chuyên môn hóa',
        'Thiết kế Website profile & Landing page chuyển đổi',
        'Tích hợp công cụ số hóa quy trình tư vấn và bàn giao',
      ],
    },
    {
      id: 'master',
      code: '04 — MASTER',
      stage: 'Chương trình Đào tạo',
      title: 'Tư Duy Làm Chủ AI & Thiết Kế Giải Pháp Số',
      badge: 'Học tập & Thực hành',
      forWhom: 'Dành cho cá nhân, nhóm chuyên môn muốn tự trang bị tư duy bóc tách, hệ thống hóa và làm chủ công cụ AI.',
      outcome: 'Năng lực tự khai thác vốn nghề, tự thiết kế trợ lý AI và tự tạo ra các tài sản số cho chính mình.',
      ctaText: 'Tìm hiểu chương trình',
      icon: BookOpen,
      scopeList: [
        'Khung tư duy bóc tách năng lực cá nhân với AI đòn bẩy',
        'Thực hành tạo trợ lý AI phục vụ công việc hàng ngày',
        'Tham gia cộng đồng học viên cùng chia sẻ và phát triển tài sản',
      ],
    },
  ];

  return (
    <section
      id="giai-phap"
      className="py-16 sm:py-24 bg-[#F5EFE0] border-b border-[#3D2F1F]/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] text-xs font-bold uppercase tracking-wider">
            <span>CÁCH CHÚNG TA CÓ THỂ ĐỒNG HÀNH</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C4A3A] tracking-tight">
            BẠN ĐANG Ở GIAI ĐOẠN NÀO?
          </h2>

          <p className="text-base sm:text-lg text-[#3D2F1F]/80 leading-relaxed">
            Mỗi người bắt đầu với một kho nguyên liệu và mục tiêu khác nhau. Hãy lựa chọn hình thức đồng hành phù hợp nhất với nhu cầu hiện tại của bạn:
          </p>
        </div>

        {/* 4 Solution Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#3D2F1F]/10 hover:border-[#4A7C59]/50 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md group"
              >
                <div className="space-y-4">
                  {/* Top Track Identifier */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-wider text-[#4A7C59]">
                      {track.code}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#3D2F1F]/5 text-[#3D2F1F]/70">
                      {track.badge}
                    </span>
                  </div>

                  {/* Title & Stage */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#C97B63]">
                      <Icon className="w-4 h-4" />
                      <span>{track.stage}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C4A3A] mt-1">
                      {track.title}
                    </h3>
                  </div>

                  {/* For Whom */}
                  <div className="p-4 rounded-xl bg-[#F5EFE0]/60 border border-[#3D2F1F]/5 space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#3D2F1F]/60">
                      DÀNH CHO AI:
                    </p>
                    <p className="text-xs sm:text-sm text-[#3D2F1F]/85 leading-relaxed">
                      {track.forWhom}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#4A7C59]">
                      KẾT QUẢ ĐẠT ĐƯỢC:
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-[#2C4A3A] leading-relaxed">
                      {track.outcome}
                    </p>
                  </div>

                  {/* Scope bullets */}
                  {track.scopeList && (
                    <div className="pt-2 space-y-2 border-t border-[#3D2F1F]/10">
                      {track.scopeList.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#3D2F1F]/80">
                          <Check className="w-3.5 h-3.5 text-[#4A7C59] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action */}
                <div className="pt-6 mt-6 border-t border-[#3D2F1F]/10">
                  <button
                    onClick={() => onOpenContact(track.title)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#4A7C59]/10 text-[#2C4A3A] font-semibold text-sm hover:bg-[#4A7C59] hover:text-white transition-all duration-200 cursor-pointer group-hover:bg-[#4A7C59] group-hover:text-white"
                  >
                    <span>{track.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-80" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
