import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Sparkles, CheckCircle, AlertCircle, Trash2, Plus } from 'lucide-react';
import { FeedbackItem } from '../types';
import { addMultipleFeedbacks, addFeedback } from '../utils/feedbackManager';
import { optimizeImage } from '../utils/portraitManager';

interface AddFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded?: (items: FeedbackItem[]) => void;
}

interface PendingImage {
  id: string;
  dataUrl: string;
  fileName: string;
  caption?: string;
}

export const AddFeedbackModal: React.FC<AddFeedbackModalProps> = ({ isOpen, onClose, onAdded }) => {
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const processFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    setErrorMessage('');

    try {
      const newPending: PendingImage[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;
        const optimized = await optimizeImage(file);
        newPending.push({
          id: `temp-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
          dataUrl: optimized,
          fileName: file.name,
        });
      }

      if (newPending.length === 0) {
        setErrorMessage('Vui lòng chọn file hình ảnh hợp lệ (PNG, JPG, WebP).');
      } else {
        setPendingImages((prev) => [...prev, ...newPending]);
      }
    } catch (err) {
      setErrorMessage('Có lỗi xảy ra khi xử lý ảnh. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
    // Reset file input value so re-selecting same file works
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removePendingImage = (id: string) => {
    setPendingImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingImages.length === 0) {
      setErrorMessage('Vui lòng chọn hoặc kéo thả ít nhất một ảnh feedback.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const itemsToAdd = pendingImages.map((img) => ({
        type: 'image' as const,
        mediaUrl: img.dataUrl,
        title: img.caption || 'Ảnh feedback khách hàng',
        date: new Date().toLocaleDateString('vi-VN'),
      }));

      const added = await addMultipleFeedbacks(itemsToAdd);

      if (onAdded) onAdded(added);
      setPendingImages([]);
      onClose();
    } catch (err) {
      setErrorMessage('Có lỗi xảy ra khi lưu ảnh. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl my-6 bg-[#F5EFE0] rounded-3xl border border-[#3D2F1F]/15 shadow-2xl p-6 sm:p-8 overflow-hidden text-[#3D2F1F]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-white text-[#3D2F1F] shadow-sm transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 border-b border-[#3D2F1F]/10 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Minh Chứng & Phản Hồi Khách Hàng</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#2C4A3A]">
            Tải Ảnh Feedback Của Khách Lên
          </h3>
          <p className="text-xs text-[#3D2F1F]/70">
            Tải ảnh chụp màn hình Zalo, tin nhắn cảm ơn, lời khen hoặc hình ảnh kết quả thực tế. Bạn có thể chọn nhiều ảnh cùng một lúc.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* File Input (Hidden) */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all space-y-3 ${
              isDragging
                ? 'border-[#4A7C59] bg-[#4A7C59]/10 scale-[1.01]'
                : 'border-[#4A7C59]/40 hover:border-[#4A7C59] bg-white/60 hover:bg-white'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] flex items-center justify-center mx-auto transition-transform hover:scale-110">
              <Upload className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm font-bold text-[#2C4A3A]">
                {isProcessing
                  ? 'Đang tối ưu hóa hình ảnh...'
                  : 'Nhấp để chọn ảnh hoặc kéo thả ảnh vào đây'}
              </p>
              <p className="text-xs text-[#3D2F1F]/60 mt-1">
                Hỗ trợ chọn nhiều ảnh chụp Zalo, Messenger, SMS (PNG, JPG, WebP).
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#4A7C59] text-white text-xs font-semibold shadow-sm hover:bg-[#3d6749]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Chọn ảnh từ máy tính / điện thoại</span>
            </button>
          </div>

          {/* Selected Images Preview List */}
          {pendingImages.length > 0 && (
            <div className="space-y-3 bg-white/70 p-4 rounded-2xl border border-[#3D2F1F]/10">
              <div className="flex items-center justify-between text-xs font-bold text-[#2C4A3A]">
                <span>Đã chọn {pendingImages.length} ảnh feedback:</span>
                <button
                  type="button"
                  onClick={() => setPendingImages([])}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Xóa tất cả
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-56 overflow-y-auto p-1">
                {pendingImages.map((img, idx) => (
                  <div
                    key={img.id}
                    className="relative group rounded-xl overflow-hidden border border-[#3D2F1F]/15 bg-black/5 aspect-[4/3]"
                  >
                    <img
                      src={img.dataUrl}
                      alt={`Feedback ${idx + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                    <button
                      type="button"
                      onClick={() => removePendingImage(img.id)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600 text-white shadow-md hover:scale-110 transition-all cursor-pointer"
                      title="Bỏ ảnh này"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-white font-mono">
                      #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#3D2F1F]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#3D2F1F]/70 hover:bg-white/60 transition-all cursor-pointer"
            >
              Hủy
            </button>

            <button
              type="submit"
              disabled={pendingImages.length === 0 || isProcessing}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-xs sm:text-sm font-bold shadow transition-all cursor-pointer active:scale-95 ${
                pendingImages.length === 0 || isProcessing
                  ? 'bg-gray-400 opacity-60 cursor-not-allowed'
                  : 'bg-[#4A7C59] hover:bg-[#3d6749] shadow-md hover:shadow-lg'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>
                {pendingImages.length > 1
                  ? `Đăng ${pendingImages.length} ảnh lên website`
                  : 'Đăng ảnh lên website'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
