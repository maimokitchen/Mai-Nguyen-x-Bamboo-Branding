import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, ShieldCheck, Sparkles, MessageCircle, ExternalLink, Copy, Check, Phone } from 'lucide-react';
import { BambooSymbol } from './BambooLogo';
import { ZALO_PHONE, ZALO_PHONE_DISPLAY, ZALO_LINK } from '../utils/zaloManager';
import { addLead } from '../utils/leadManager';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStage?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultStage,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [domain, setDomain] = useState('');
  const [stage, setStage] = useState(defaultStage || 'Mentoring Thiết Kế Giải Pháp 1:1');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (defaultStage) {
      setStage(defaultStage);
    }
  }, [defaultStage]);

  if (!isOpen) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(ZALO_PHONE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      name: name.trim(),
      contact: contact.trim(),
      domain: domain.trim() || undefined,
      stage: stage,
      note: note.trim() || undefined,
    }).catch((err) => console.warn('Could not save lead:', err));
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setContact('');
    setDomain('');
    setNote('');
    onClose();
  };

  const solutionOptions = [
    '01 — Khám Phá & Đóng Gói Tài Sản',
    '02 — Mentoring Thiết Kế Giải Pháp 1:1',
    '03 — Thiết Kế & Triển Khai Giải Pháp Số',
    '04 — Tư Duy Làm Chủ AI & Thiết Kế Giải Pháp Số',
    'Cần tư vấn định hướng chung từ vốn nghề hiện tại',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#3D2F1F]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#F5EFE0] rounded-3xl shadow-2xl border border-[#3D2F1F]/15 overflow-hidden z-10 my-8">
        
        {/* Modal Header */}
        <div className="bg-[#2C4A3A] text-white p-6 sm:p-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <BambooSymbol className="w-6 h-8" color="#F5EFE0" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F5EFE0]">
                Trao Đổi Cùng Mai Nguyễn
              </h3>
              <p className="text-xs text-[#B8C5B0]">
                Bamboo Branding • Đánh thức giá trị – Kiến tạo tài sản
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#4A7C59]/15 text-[#4A7C59] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="font-serif text-2xl font-bold text-[#2C4A3A]">
                Cảm ơn bạn đã kết nối!
              </h4>

              <p className="text-sm text-[#3D2F1F]/80 max-w-md mx-auto leading-relaxed">
                Thông tin và bài toán của bạn đã được ghi nhận. Mai Nguyễn sẽ trực tiếp xem xét hồ sơ và phản hồi lại qua thông tin liên lạc bạn đã để lại trong thời gian sớm nhất.
              </p>

              {/* Instant Zalo option */}
              <div className="p-4 rounded-2xl bg-white border border-[#0068FF]/20 max-w-md mx-auto text-left space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#0068FF] text-white flex items-center justify-center font-black text-[10px]">
                      Zalo
                    </div>
                    <span className="text-xs font-bold text-[#1e293b]">Cần trao đổi nhanh trực tiếp?</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0068FF]">{ZALO_PHONE_DISPLAY}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={ZALO_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0068FF] hover:bg-[#0052cc] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Nhắn Zalo ngay</span>
                  </a>
                  <a
                    href={`tel:${ZALO_PHONE}`}
                    className="py-2 px-3 rounded-xl bg-[#F5EFE0] hover:bg-[#F5EFE0]/80 text-[#2C4A3A] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#4A7C59]" />
                    <span>Gọi điện</span>
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-full bg-[#4A7C59] text-white text-sm font-semibold hover:bg-[#2C4A3A] transition-colors cursor-pointer"
                >
                  Hoàn tất & Đóng
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              
              {/* Direct Zalo Quick Banner */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#0068FF]/25 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#0068FF] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                      Zalo
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1e293b]">
                        Kênh hỗ trợ nhanh qua Zalo
                      </p>
                      <p className="text-[11px] text-[#64748b]">
                        Số điện thoại: <span className="font-mono font-bold text-[#0068FF]">{ZALO_PHONE_DISPLAY}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      title="Sao chép số điện thoại"
                      className="px-2.5 py-1.5 rounded-lg text-gray-600 hover:text-[#0068FF] hover:bg-gray-50 border border-gray-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[11px]">{copied ? 'Đã sao chép' : 'Sao chép'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={ZALO_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0068FF] hover:bg-[#0052cc] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Mở Chat Zalo Với Mai Nguyễn ({ZALO_PHONE_DISPLAY})</span>
                    <ExternalLink className="w-3 h-3 opacity-75" />
                  </a>
                </div>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#3D2F1F]/15"></div>
                <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-[#3D2F1F]/60 font-semibold">
                  Hoặc để lại thông tin bài toán bên dưới
                </span>
                <div className="flex-grow border-t border-[#3D2F1F]/15"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2C4A3A] mb-1">
                    Họ và tên của bạn *
                  </label>
                  <input
                    type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#3D2F1F]/20 text-sm text-[#3D2F1F] focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C4A3A] mb-1">
                  Số điện thoại / Zalo hoặc Email *
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Để Mai Nguyễn có thể gửi phản hồi trực tiếp"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#3D2F1F]/20 text-sm text-[#3D2F1F] focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C4A3A] mb-1">
                  Chuyên môn hoặc lĩnh vực bạn đã có kinh nghiệm
                </label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Ví dụ: Đào tạo nhân sự, Bán hàng B2B, Tư vấn tài chính, Dịch vụ..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#3D2F1F]/20 text-sm text-[#3D2F1F] focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C4A3A] mb-1">
                  Hình thức bạn đang quan tâm
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#3D2F1F]/20 text-sm text-[#3D2F1F] focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
                >
                  {solutionOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C4A3A] mb-1">
                  Điều bạn đang băn khoăn hoặc mong muốn đạt được
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Tôi có nhiều năm tài liệu nhưng chưa biết bắt đầu đóng gói từ đâu..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#3D2F1F]/20 text-sm text-[#3D2F1F] focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#4A7C59] text-white text-base font-bold hover:bg-[#2C4A3A] transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi lời mời trao đổi với Mai</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#3D2F1F]/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4A7C59]" />
                <span>Bảo mật 100% thông tin. Không chèo kéo, không spam.</span>
              </div>
            </form>
          </div>
          )}
        </div>

      </div>
    </div>
  );
};
