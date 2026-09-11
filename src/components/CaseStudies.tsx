import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FolderCheck,
  Sparkles,
  Image as ImageIcon,
  Video,
  Play,
  Maximize2,
  PlusCircle,
  UploadCloud,
  ShieldCheck,
  Eye,
  Trash2
} from 'lucide-react';
import { BambooSymbol } from './BambooLogo';
import { CaseStudy } from '../types';
import {
  getStoredCaseStudyMedia,
  saveCaseStudyProofMedia,
  parseVideoEmbedUrl
} from '../utils/feedbackManager';
import { AddCaseStudyProofModal } from './AddCaseStudyProofModal';

export const CaseStudies: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<number>(0);
  const [customMedia, setCustomMedia] = useState<Record<string, CaseStudy['proofMedia']>>({});
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  useEffect(() => {
    setCustomMedia(getStoredCaseStudyMedia());

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<{ caseId: string; proof: CaseStudy['proofMedia'] }>;
      if (customEvt.detail) {
        setCustomMedia(getStoredCaseStudyMedia());
      }
    };

    window.addEventListener('mai-case-study-media-updated', handleUpdate);
    return () => window.removeEventListener('mai-case-study-media-updated', handleUpdate);
  }, []);

  const defaultCases: CaseStudy[] = [
    {
      id: '01',
      tag: 'Chuyên gia Đào tạo & Nhân sự',
      title: 'Đóng gói 8 năm kinh nghiệm vận hành nhân sự thành Bộ Toolkit Chuyển giao & Trợ lý AI',
      hasWhat:
        'Hơn 8 năm kinh nghiệm tư vấn nhân sự, quản lý vận hành, hàng chục file Word quy trình tuyển dụng và đánh giá KPI lưu rải rác.',
      problem:
        'Mỗi lần tư vấn doanh nghiệp mới đều phải làm lại từ đầu, tiêu tốn rất nhiều thời gian giải thích; không có sản phẩm đóng gói để bán độc lập.',
      solution:
        'Ứng dụng phương pháp Bamboo Assetization™ bóc tách 3 quy trình lõi, hệ thống hóa thành Framework chuẩn và sử dụng AI để số hóa tài liệu tương tác.',
      assetCreated: [
        '01 Framework tuyển dụng chuẩn hóa 4 bước (Audit → Profile → Interview → Onboard)',
        '01 Bộ Toolkit tài liệu số & biểu mẫu đánh giá tự động hóa',
        '01 Custom GPT trợ lý phỏng vấn nhân sự hỗ trợ nhà quản lý',
      ],
      result:
        'Giảm 65% thời gian tư vấn ban đầu, có sản phẩm số đầu tiên bán kèm các gói dịch vụ doanh nghiệp với phản hồi tích cực.',
      proofMedia: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
        caption: 'Minh chứng: Bộ Toolkit quy trình tuyển dụng 4 bước và Custom GPT trợ lý phỏng vấn nhân sự đã bàn giao',
      },
    },
    {
      id: '02',
      tag: 'Quản lý Dịch vụ & CSKH',
      title: 'Chuyển đổi kinh nghiệm chăm sóc khách hàng B2B thành Khóa đào tạo nội bộ & Cẩm nang số',
      hasWhat:
        'Kinh nghiệm xử lý khiếu nại, giữ chân khách hàng lớn và xây dựng văn hóa dịch vụ khách hàng trong doanh nghiệp bán buôn.',
      problem:
        'Nhân viên mới mất 3-4 tháng mới nắm bắt được cách ứng xử với đối tác lớn; kinh nghiệm chỉ truyền miệng, phụ thuộc hoàn toàn vào một cá nhân.',
      solution:
        'Định vị lại toàn bộ case xử lý thành Cẩm nang trải nghiệm khách hàng (Customer Playbook) và thiết kế lộ trình đào tạo nội bộ 14 ngày.',
      assetCreated: [
        '01 Khung trải nghiệm dịch vụ B2B (Service Blueprint chuẩn)',
        '01 Trợ lý AI phản hồi tình huống khiếu nại cho nhân viên mới luyện tập',
        '01 Khóa đào tạo video ngắn gọn cho toàn bộ đội ngũ',
      ],
      result:
        'Rút ngắn thời gian đào tạo hội nhập từ 3 tháng xuống còn 2 tuần, chuẩn hóa chất lượng phục vụ trên toàn hệ thống.',
      proofMedia: {
        type: 'video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'Video feedback: Đại diện quản lý chia sẻ về hiệu quả rút ngắn thời gian đào tạo từ 3 tháng xuống 2 tuần',
      },
    },
    {
      id: '03',
      tag: 'Chuyên viên Tư vấn & Người làm nghề tự do',
      title: 'Hệ thống hóa vốn tư vấn cá nhân thành Website Profile chuyển đổi & Trợ lý sàng lọc nhu cầu',
      hasWhat:
        'Năng lực tư vấn giải pháp tài chính cá nhân, tệp bài viết chuyên môn chất lượng nhưng chia sẻ rải rác trên trang cá nhân.',
      problem:
        'Khách hàng nhắn tin rải rác, mất nhiều thời gian trả lời những câu hỏi lặp lại; khách hàng tiềm năng khó nhìn thấy toàn diện năng lực.',
      solution:
        'Xây dựng cấu trúc một trang profile chuẩn chuyên gia, tích hợp bảng câu hỏi sàng lọc sơ bộ và tài liệu hướng dẫn miễn phí tự động.',
      assetCreated: [
        '01 Website Profile cá nhân chuyên nghiệp định vị rõ ràng personal authority',
        '01 Ebook cẩm nang tài chính số phân tầng theo nhu cầu',
        '01 Hệ thống tiếp nhận và sàng lọc lịch hẹn tự động',
      ],
      result:
        'Khách hàng liên hệ với sự tin cậy cao hơn hẳn, chất lượng các cuộc trao đổi 1:1 tăng rõ rệt vì khách hàng đã hiểu trước phương pháp.',
      proofMedia: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
        caption: 'Minh chứng: Bản thiết kế kiến trúc Website Profile chuyển đổi và phễu sàng lọc khách hàng tự động',
      },
    },
  ];

  const currentCase = defaultCases[selectedCase];
  const activeProofMedia = customMedia[currentCase.id] || currentCase.proofMedia;
  const { embedUrl, isDirectVideo } = activeProofMedia?.type === 'video'
    ? parseVideoEmbedUrl(activeProofMedia.url)
    : { embedUrl: '', isDirectVideo: false };

  const handleRemoveProofMedia = () => {
    saveCaseStudyProofMedia(currentCase.id, undefined);
  };

  return (
    <section
      id="case-study"
      className="py-16 sm:py-24 bg-white/70 border-b border-[#3D2F1F]/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TỪ NĂNG LỰC → TÀI SẢN THỰC TẾ</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C4A3A] tracking-tight">
              KHÔNG CHỈ NÓI VỀ Ý TƯỞNG.
              <br />
              HÃY NHÌN VÀO THỨ ĐƯỢC TẠO RA.
            </h2>

            <p className="text-base sm:text-lg text-[#3D2F1F]/80 leading-relaxed">
              Mỗi case study là một hành trình biến năng lực vô hình thành sản phẩm hữu hình. Không có lý thuyết suông, chỉ có những bài toán thực tế được cấu trúc, giải quyết và kèm theo hình ảnh / video minh chứng rõ ràng:
            </p>
          </div>

          <button
            onClick={() => setIsProofModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C4A3A] hover:bg-[#1f3529] text-white text-xs sm:text-sm font-bold shadow hover:shadow-md transition-all cursor-pointer self-start lg:self-auto"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Đưa Ảnh / Video Minh Chứng Cho Case Này</span>
          </button>
        </div>

        {/* Case Navigation Tabs */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {defaultCases.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setSelectedCase(idx)}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                selectedCase === idx
                  ? 'bg-[#2C4A3A] text-white shadow-sm'
                  : 'bg-[#F5EFE0] text-[#3D2F1F]/80 hover:bg-[#3D2F1F]/10'
              }`}
            >
              <span>Case 0{c.id}</span>
              <span className="opacity-60">•</span>
              <span>{c.tag}</span>
            </button>
          ))}
        </div>

        {/* Active Case Deep Dive (5-Point Transformation Blueprint + Real Proof Media) */}
        <div className="mt-8 bg-[#F5EFE0] rounded-3xl p-6 sm:p-10 border border-[#3D2F1F]/10 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3D2F1F]/10 pb-5">
            <div>
              <span className="text-xs font-mono font-bold text-[#4A7C59] uppercase tracking-wider">
                CASE STUDY 0{currentCase.id} — {currentCase.tag}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C4A3A] mt-1.5 leading-snug">
                {currentCase.title}
              </h3>
            </div>

            <button
              onClick={() => setIsProofModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-white/90 text-[#2C4A3A] text-xs font-bold border border-[#3D2F1F]/15 shadow-sm transition-all cursor-pointer shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#4A7C59]" />
              <span>Đổi ảnh / video minh chứng</span>
            </button>
          </div>

          {/* Tangible Proof Media Preview Row */}
          {activeProofMedia ? (
            <div className="rounded-3xl bg-white p-5 sm:p-6 border border-[#4A7C59]/30 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A7C59]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Hình Ảnh Sản Phẩm Hữu Hình & Video Khách Hàng Thực Tế</span>
                </div>

                <button
                  onClick={handleRemoveProofMedia}
                  title="Xóa minh chứng này"
                  className="p-1 rounded-full text-[#3D2F1F]/40 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Media viewer */}
              <div className="rounded-2xl overflow-hidden border border-[#3D2F1F]/10 bg-black/5 relative">
                {activeProofMedia.type === 'video' ? (
                  <div className="aspect-video w-full bg-black">
                    {isDirectVideo ? (
                      <video src={embedUrl} controls className="w-full h-full object-contain" />
                    ) : (
                      <iframe
                        src={embedUrl}
                        title={currentCase.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => setLightboxUrl(activeProofMedia.url)}
                    className="relative aspect-video sm:aspect-[21/9] flex items-center justify-center cursor-pointer group bg-[#3D2F1F]/5 overflow-hidden"
                  >
                    <img
                      src={activeProofMedia.url}
                      alt={activeProofMedia.caption}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                      <Maximize2 className="w-4 h-4" />
                      <span>Nhấp để phóng to minh chứng</span>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#3D2F1F]/80 italic pt-1">
                💬 {activeProofMedia.caption}
              </p>
            </div>
          ) : (
            <div
              onClick={() => setIsProofModalOpen(true)}
              className="rounded-2xl border-2 border-dashed border-[#4A7C59]/30 hover:border-[#4A7C59] bg-white/60 hover:bg-white p-6 text-center cursor-pointer transition-all space-y-2"
            >
              <div className="w-10 h-10 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] flex items-center justify-center mx-auto">
                <UploadCloud className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#2C4A3A]">
                Chưa có ảnh hoặc video minh chứng cho Case Study này
              </p>
              <p className="text-[11px] text-[#3D2F1F]/60">
                Nhấp vào đây để tải ảnh chụp màn hình sản phẩm, slide tài liệu hoặc dán link video cảm nhận của khách hàng.
              </p>
            </div>
          )}

          {/* 5-Point Blueprint Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Khách hàng có gì? */}
            <div className="p-5 rounded-2xl bg-white/80 border border-[#3D2F1F]/10 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#3D2F1F]/60">
                1. NGUYÊN LIỆU BAN ĐẦU:
              </span>
              <p className="text-sm font-medium text-[#2C4A3A] leading-relaxed">
                {currentCase.hasWhat}
              </p>
            </div>

            {/* 2. Vấn đề */}
            <div className="p-5 rounded-2xl bg-white/80 border border-[#3D2F1F]/10 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C97B63]">
                2. ĐIỂM NGHẼN / VẤN ĐỀ:
              </span>
              <p className="text-sm font-medium text-[#3D2F1F] leading-relaxed">
                {currentCase.problem}
              </p>
            </div>

            {/* 3. Giải pháp */}
            <div className="p-5 rounded-2xl bg-white/80 border border-[#3D2F1F]/10 space-y-1.5 md:col-span-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A7C59]">
                3. GIẢI PHÁP ĐỒNG HÀNH:
              </span>
              <p className="text-sm font-medium text-[#2C4A3A] leading-relaxed">
                {currentCase.solution}
              </p>
            </div>

            {/* 4. Tài sản được tạo ra */}
            <div className="p-5 rounded-2xl bg-[#2C4A3A] text-white md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <FolderCheck className="w-4 h-4 text-[#B8C5B0]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#B8C5B0]">
                  4. CÁC TÀI SẢN SỐ ĐƯỢC TẠO RA:
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {currentCase.assetCreated.map((asset, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/10 border border-white/10 text-xs sm:text-sm text-[#F5EFE0] leading-snug flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A574] shrink-0 mt-0.5" />
                    <span>{asset}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Kết quả */}
            <div className="p-5 rounded-2xl bg-white border border-[#4A7C59]/30 md:col-span-2 space-y-1.5 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A7C59]">
                5. KẾT QUẢ THỰC TẾ:
              </span>
              <p className="text-sm sm:text-base font-serif font-bold text-[#2C4A3A] leading-relaxed">
                {currentCase.result}
              </p>
            </div>

          </div>

        </div>

        {/* Modal for adding proof media */}
        <AddCaseStudyProofModal
          isOpen={isProofModalOpen}
          caseId={currentCase.id}
          caseTitle={currentCase.title}
          onClose={() => setIsProofModalOpen(false)}
          onSaved={() => setCustomMedia(getStoredCaseStudyMedia())}
        />

        {/* Lightbox Preview */}
        {lightboxUrl && (
          <div
            onClick={() => setLightboxUrl(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm cursor-zoom-out"
          >
            <img
              src={lightboxUrl}
              alt="Minh chứng chi tiết"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        )}

      </div>
    </section>
  );
};
