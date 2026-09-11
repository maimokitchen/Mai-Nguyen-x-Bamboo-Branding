import React, { useState, useRef } from 'react';
import { X, Upload, Video, Image as ImageIcon, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { FeedbackMediaType } from '../types';
import { parseVideoEmbedUrl, saveCaseStudyProofMedia } from '../utils/feedbackManager';
import { optimizeImage } from '../utils/portraitManager';

interface AddCaseStudyProofModalProps {
  isOpen: boolean;
  caseId: string;
  caseTitle: string;
  onClose: () => void;
  onSaved?: () => void;
}

export const AddCaseStudyProofModal: React.FC<AddCaseStudyProofModalProps> = ({
  isOpen,
  caseId,
  caseTitle,
  onClose,
  onSaved,
}) => {
  const [type, setType] = useState<FeedbackMediaType>('image');
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setErrorMessage('');
    try {
      const optimized = await optimizeImage(file);
      setUrl(optimized);
    } catch (err) {
      setErrorMessage('Không thể tải ảnh. Vui lòng chọn định dạng JPG/PNG khác.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setErrorMessage(type === 'image' ? 'Vui lòng chọn ảnh chụp minh chứng.' : 'Vui lòng nhập link video.');
      return;
    }

    const { embedUrl } = type === 'video' ? parseVideoEmbedUrl(url) : { embedUrl: '' };

    saveCaseStudyProofMedia(caseId, {
      type,
      url: url.trim(),
      caption: caption.trim() || 'Minh chứng sản phẩm & phản hồi thực tế từ khách hàng',
      embedUrl: type === 'video' ? embedUrl : undefined,
    });

    if (type === 'image' && url.startsWith('data:image/')) {
      fetch('/api/upload-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataBase64: url,
          filename: `case_${caseId}_proof_${Date.now()}.jpg`,
        }),
      }).catch(() => {});
    }

    if (onSaved) onSaved();
    onClose();
  };

  const { embedUrl, isDirectVideo } = type === 'video' ? parseVideoEmbedUrl(url) : { embedUrl: '', isDirectVideo: false };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-[#F5EFE0] rounded-3xl border border-[#3D2F1F]/15 shadow-2xl p-6 sm:p-7 overflow-hidden text-[#3D2F1F]">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#3D2F1F] shadow-sm transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 border-b border-[#3D2F1F]/10 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Minh Chứng Cho Case Study #{caseId}</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C4A3A] line-clamp-2">
            Thêm Ảnh Sản Phẩm / Video Khách Hàng
          </h3>
          <p className="text-xs text-[#3D2F1F]/70">
            {caseTitle}
          </p>
        </div>

        {/* Type Toggle */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => { setType('image'); setUrl(''); }}
            className={`p-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm border transition-all cursor-pointer ${
              type === 'image'
                ? 'bg-[#2C4A3A] text-white border-[#2C4A3A]'
                : 'bg-white text-[#3D2F1F]/80 border-[#3D2F1F]/15'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Ảnh Chụp Sản Phẩm / Feedback</span>
          </button>

          <button
            type="button"
            onClick={() => { setType('video'); setUrl(''); }}
            className={`p-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm border transition-all cursor-pointer ${
              type === 'video'
                ? 'bg-[#2C4A3A] text-white border-[#2C4A3A]'
                : 'bg-white text-[#3D2F1F]/80 border-[#3D2F1F]/15'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Review Khách Hàng</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          <div className="p-4 rounded-2xl bg-white border border-[#3D2F1F]/10 space-y-3">
            <label className="text-xs font-bold text-[#2C4A3A] uppercase tracking-wider block">
              {type === 'image' ? '1. Chọn file ảnh minh chứng:' : '1. Link video YouTube / Shorts / MP4:'}
            </label>

            {type === 'image' ? (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="hidden"
                />

                {url ? (
                  <div className="relative rounded-xl overflow-hidden border border-[#4A7C59]/40 aspect-video flex items-center justify-center bg-black/5 group">
                    <img src={url} alt="Preview" className="max-h-48 w-auto object-contain mx-auto" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-full bg-white text-[#2C4A3A] text-xs font-semibold"
                      >
                        Đổi ảnh
                      </button>
                      <button
                        type="button"
                        onClick={() => setUrl('')}
                        className="px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-semibold"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#4A7C59]/40 hover:border-[#4A7C59] rounded-xl p-5 text-center cursor-pointer bg-[#F5EFE0]/40 hover:bg-[#F5EFE0] transition-all space-y-1.5"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] flex items-center justify-center mx-auto">
                      <Upload className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-semibold text-[#2C4A3A]">
                      {isUploading ? 'Đang xử lý...' : 'Nhấp để chọn ảnh chụp sản phẩm hoặc ảnh feedback'}
                    </p>
                    <p className="text-[10px] text-[#3D2F1F]/60">Hỗ trợ JPG, PNG, WebP</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#3D2F1F]/20 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
                />

                {embedUrl && (
                  <div className="rounded-xl overflow-hidden aspect-video bg-black">
                    {isDirectVideo ? (
                      <video src={embedUrl} controls className="w-full h-full object-contain" />
                    ) : (
                      <iframe src={embedUrl} title="Video" className="w-full h-full border-0" allowFullScreen />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#2C4A3A]">Mô tả ngắn / Chú thích minh chứng</label>
            <input
              type="text"
              placeholder="VD: Giao diện Bộ Toolkit 4 bước và Custom GPT thực tế đang hoạt động"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#3D2F1F]/20 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
            />
          </div>

          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#3D2F1F]/70 hover:bg-white/60"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#4A7C59] hover:bg-[#3d6749] text-white text-xs sm:text-sm font-bold shadow"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Lưu Minh Chứng</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
