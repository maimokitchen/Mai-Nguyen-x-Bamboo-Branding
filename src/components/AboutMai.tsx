import React, { useState, useEffect } from 'react';
import { BambooSymbol } from './BambooLogo';
import { Quote, Briefcase, Users, GraduationCap, Share2, Sparkles, Award, ShieldCheck } from 'lucide-react';
import { CareerMilestone } from '../types';
import { loadCurrentPortrait } from '../utils/portraitManager';

export const AboutMai: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    loadCurrentPortrait().then((url) => {
      if (url) setPhotoUrl(url);
    });

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<{ url: string }>;
      if (customEvt.detail?.url) {
        setPhotoUrl(customEvt.detail.url);
      }
    };

    window.addEventListener('mai-portrait-updated', handleUpdate);
    return () => window.removeEventListener('mai-portrait-updated', handleUpdate);
  }, []);

  const timeline: (CareerMilestone & { icon: React.ElementType })[] = [
    {
      stage: '01',
      title: 'SALES B2B',
      description: 'Kinh nghiệm làm việc và xây dựng quan hệ với hàng trăm đối tác doanh nghiệp.',
      icon: Briefcase,
    },
    {
      stage: '02',
      title: 'CUSTOMER EXPERIENCE',
      description: 'Kinh nghiệm xây dựng khung trải nghiệm dịch vụ và đào tạo đội ngũ chăm sóc khách hàng.',
      icon: Users,
    },
    {
      stage: '03',
      title: 'TRAINING & MENTORING',
      description: 'Thiết kế và triển khai các chương trình đào tạo, mentoring và đồng hành 1:1 thực chiến.',
      icon: GraduationCap,
    },
    {
      stage: '04',
      title: 'CONTENT & PERSONAL BRAND',
      description: 'Trực tiếp xây dựng nội dung chuyên sâu và phát triển các kênh truyền thông cá nhân đạt hàng triệu lượt xem.',
      icon: Share2,
    },
    {
      stage: '05',
      title: 'AI & DIGITAL SOLUTIONS',
      description: 'Ứng dụng AI và công nghệ để tạo trợ lý, nội dung, sản phẩm và các giải pháp số thực tế.',
      icon: Sparkles,
    },
    {
      stage: '06',
      title: 'BAMBOO ASSETIZATION™',
      description: 'Hệ thống hóa chính hành trình và năng lực đó thành một phương pháp giúp người khác khai thác tài sản từ chính vốn sống và vốn nghề của họ.',
      icon: Award,
    },
  ];

  return (
    <section
      id="ve-mai"
      className="py-16 sm:py-24 bg-[#F5EFE0] border-b border-[#3D2F1F]/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Photo Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          <div className={`${photoUrl ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4`}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] text-xs font-bold uppercase tracking-wider">
              <span>VỀ MAI NGUYỄN</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C4A3A] tracking-tight">
              HÀNH TRÌNH CỦA TÔI CŨNG LÀ MỘT QUÁ TRÌNH TÀI SẢN HÓA.
            </h2>

            <div className="space-y-4 text-[#3D2F1F]/85 text-base sm:text-lg leading-relaxed pt-2">
              <p>
                Tôi không bắt đầu với danh xưng “chuyên gia AI”.
              </p>
              <p>
                Hành trình nghề nghiệp của tôi đi qua nhiều lĩnh vực khác nhau: bán hàng B2B, dịch vụ, trải nghiệm khách hàng, đào tạo, mentoring, xây dựng nội dung và ứng dụng công nghệ.
              </p>
              <p>
                Nhìn lại, tôi nhận ra những trải nghiệm tưởng như rời rạc ấy thực chất đang hình thành một năng lực xuyên suốt:
              </p>
            </div>
          </div>

          {photoUrl && (
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border border-[#3D2F1F]/15 shadow-md bg-white p-2.5 max-w-xs w-full">
                <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
                  <img
                    src={photoUrl}
                    alt="Mai Nguyễn - Đồng hành & Cố vấn giải pháp số"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C4A3A]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                    <p className="text-xs font-serif font-bold text-[#F5EFE0]">Mai Nguyễn</p>
                    <p className="text-[10px] text-[#B8C5B0]">Bamboo Assetization™</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Core Meta-Capability Highlight */}
        <div className="my-8 p-6 sm:p-7 rounded-2xl bg-white border border-[#3D2F1F]/15 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[#4A7C59] mb-2">
            NĂNG LỰC CỐT LÕI XUYÊN SUỐT
          </p>
          <div className="flex flex-wrap items-center gap-2 text-base sm:text-xl font-serif font-bold text-[#2C4A3A]">
            <span>Nhìn một vấn đề phức tạp</span>
            <span className="text-[#C97B63]">→</span>
            <span>Tìm ra cấu trúc</span>
            <span className="text-[#C97B63]">→</span>
            <span>Thiết kế giải pháp</span>
            <span className="text-[#C97B63]">→</span>
            <span className="text-[#4A7C59]">Biến nó thành thứ người khác có thể hiểu, sử dụng và triển khai.</span>
          </div>
        </div>

        {/* Career Timeline */}
        <div className="mt-12">
          <p className="text-xs font-bold uppercase tracking-wider text-[#3D2F1F]/60 mb-6">
            6 CỘT MỐC ĐỊNH HÌNH PHƯƠNG PHÁP
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeline.map((item, idx) => {
              const Icon = item.icon;
              const isHighlight = idx === 5;
              return (
                <div
                  key={item.stage}
                  className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isHighlight
                      ? 'bg-[#2C4A3A] text-white border-[#2C4A3A] shadow-md md:col-span-2 lg:col-span-1'
                      : 'bg-white/80 text-[#3D2F1F] border-[#3D2F1F]/10 hover:bg-white hover:border-[#4A7C59]/30'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                          isHighlight
                            ? 'bg-white/15 text-[#F5EFE0]'
                            : 'bg-[#4A7C59]/10 text-[#4A7C59]'
                        }`}
                      >
                        GIAI ĐOẠN {item.stage}
                      </span>
                      <Icon
                        className={`w-5 h-5 ${
                          isHighlight ? 'text-[#B8C5B0]' : 'text-[#3D2F1F]/40'
                        }`}
                      />
                    </div>

                    <h3
                      className={`font-serif text-base sm:text-lg font-bold ${
                        isHighlight ? 'text-[#F5EFE0]' : 'text-[#2C4A3A]'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <p
                    className={`mt-4 text-xs sm:text-sm leading-relaxed pt-3 border-t ${
                      isHighlight
                        ? 'border-white/15 text-white/80'
                        : 'border-[#3D2F1F]/10 text-[#3D2F1F]/75'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlight Manifesto Quote */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-[#2C4A3A] text-white text-center relative overflow-hidden shadow-lg">
          <Quote className="w-12 h-12 text-[#4A7C59]/40 mx-auto mb-4" />
          <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#F5EFE0] max-w-3xl mx-auto leading-snug">
            “TÔI KHÔNG ĐỨNG NGOÀI VÀ DẠY BẠN CÁCH TẠO TÀI SẢN.
            <br />
            TÔI ĐANG LÀM CHÍNH QUÁ TRÌNH ĐÓ VỚI NĂNG LỰC CỦA MÌNH.”
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <BambooSymbol className="w-5 h-6" color="#B8C5B0" />
            <span className="text-xs tracking-wider uppercase text-[#B8C5B0] font-semibold">
              MAI NGUYỄN — BAMBOO BRANDING
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
