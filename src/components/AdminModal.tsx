import React, { useState } from 'react';
import { Lock, X, CheckCircle, ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';
import { verifyAdminPasscode } from '../utils/adminManager';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMessage('Vui lòng nhập mật mã quản trị viên.');
      return;
    }

    const valid = verifyAdminPasscode(passcode);
    if (valid) {
      setIsSuccess(true);
      setErrorMessage('');
      setTimeout(() => {
        setIsSuccess(false);
        setPasscode('');
        if (onSuccess) onSuccess();
        onClose();
      }, 700);
    } else {
      setErrorMessage('Mật mã chưa chính xác. Mẹo: dùng mật mã "mai123" hoặc "maithinguyen".');
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#F5EFE0] rounded-3xl border border-[#3D2F1F]/20 shadow-2xl p-6 sm:p-8 overflow-hidden text-[#3D2F1F]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-white text-[#3D2F1F] shadow-sm transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 text-center pb-4 border-b border-[#3D2F1F]/10">
          <div className="w-12 h-12 rounded-2xl bg-[#4A7C59]/10 text-[#4A7C59] mx-auto flex items-center justify-center shadow-inner">
            <Lock className="w-6 h-6" />
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C4A3A]">
            Quản Trị Viên (Admin)
          </h3>

          <p className="text-xs sm:text-sm text-[#3D2F1F]/70">
            Khu vực dành riêng cho <strong>Mai Nguyễn</strong> để tải ảnh feedback khách hàng và quản trị nội dung.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#2C4A3A] flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Mật mã quản trị:</span>
            </label>
            <input
              type="password"
              placeholder="Nhập mật mã quản trị (VD: mai123)..."
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setErrorMessage('');
              }}
              autoFocus
              className="w-full px-4 py-3 rounded-xl border border-[#3D2F1F]/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
            />
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-start gap-2 border border-red-200">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-3 rounded-xl bg-[#4A7C59]/15 text-[#2C4A3A] text-xs flex items-center gap-2 border border-[#4A7C59]/30 font-medium">
              <CheckCircle className="w-4 h-4 text-[#4A7C59] shrink-0" />
              <span>Xác thực thành công! Đang kích hoạt quyền quản trị...</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full text-xs font-medium text-[#3D2F1F]/70 hover:bg-white/60 transition-all cursor-pointer"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4A7C59] hover:bg-[#3d6749] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <span>Mở Quyền Admin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Direct link tip */}
          <div className="pt-3 border-t border-[#3D2F1F]/10 text-center">
            <p className="text-[11px] text-[#3D2F1F]/60">
              💡 <em>Mẹo: Bạn có thể thêm <code>?admin=true</code> vào cuối link website để tự động bật chế độ Quản trị mà không cần nhập mã.</em>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
