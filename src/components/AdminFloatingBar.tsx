import React, { useState, useEffect } from 'react';
import { ShieldCheck, PlusCircle, Eye, LogOut, LayoutDashboard } from 'lucide-react';
import { checkIsAdmin, setAdminStatus } from '../utils/adminManager';

interface AdminFloatingBarProps {
  onOpenAddFeedback: () => void;
  onOpenDashboard: () => void;
}

export const AdminFloatingBar: React.FC<AdminFloatingBarProps> = ({
  onOpenAddFeedback,
  onOpenDashboard,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(checkIsAdmin());

    const handleAdminChange = (e: Event) => {
      const customEvt = e as CustomEvent<{ isAdmin: boolean }>;
      if (customEvt.detail !== undefined) {
        setIsAdmin(customEvt.detail.isAdmin);
      } else {
        setIsAdmin(checkIsAdmin());
      }
    };

    window.addEventListener('mai-admin-state-changed', handleAdminChange);
    return () => window.removeEventListener('mai-admin-state-changed', handleAdminChange);
  }, []);

  if (!isAdmin) return null;

  const handleExitAdmin = () => {
    setAdminStatus(false);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 animate-fade-in max-w-[90vw]">
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-[#2C4A3A]/95 text-white rounded-2xl sm:rounded-full shadow-2xl border border-white/20 backdrop-blur-md text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1 font-semibold text-[#D4A574]">
          <ShieldCheck className="w-4 h-4 text-[#A8D5BA]" />
          <span className="hidden md:inline">Admin: Mai Nguyễn</span>
          <span className="md:hidden">Admin</span>
        </div>

        {/* Open Full Dashboard button */}
        <button
          onClick={onOpenDashboard}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4A574] hover:bg-[#c29362] text-[#2C4A3A] font-bold transition-all cursor-pointer shadow-sm active:scale-95"
          title="Mở Bảng Điều Khiển Quản Trị Chi Tiết"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Bảng Quản Trị</span>
        </button>

        {/* Quick Add Feedback */}
        <button
          onClick={onOpenAddFeedback}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#4A7C59] hover:bg-[#3d6749] text-white font-bold transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tải ảnh feedback</span>
          <span className="sm:hidden">+ Ảnh</span>
        </button>

        {/* View as Client */}
        <button
          onClick={handleExitAdmin}
          title="Tắt chế độ Quản trị để xem website y hệt khách hàng nhìn thấy"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 font-medium transition-all cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Xem như khách</span>
        </button>

        {/* Logout */}
        <button
          onClick={handleExitAdmin}
          title="Đăng xuất quyền Quản trị"
          className="p-1.5 rounded-full hover:bg-red-600/60 text-white/80 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
