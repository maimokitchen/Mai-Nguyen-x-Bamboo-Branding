import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle,
  PlusCircle,
  Trash2,
  UploadCloud,
  ShieldCheck,
  MessageSquareQuote,
  LayoutDashboard
} from 'lucide-react';
import { FeedbackItem } from '../types';
import {
  getStoredFeedbacks,
  initAndSyncFeedbacks,
  deleteFeedback,
  clearAllFeedbacks,
  addMultipleFeedbacks
} from '../utils/feedbackManager';
import { checkIsAdmin } from '../utils/adminManager';
import { AddFeedbackModal } from './AddFeedbackModal';
import { optimizeImage } from '../utils/portraitManager';

interface ProofResultsProps {
  onOpenDashboard?: () => void;
}

export const ProofResults: React.FC<ProofResultsProps> = ({ onOpenDashboard }) => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDraggingDirect, setIsDraggingDirect] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const directFileInputRef = useRef<HTMLInputElement>(null);

  // Initialize feedbacks and admin status
  useEffect(() => {
    // 1. Check Admin status
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

    // 2. Initial load from memory/cache
    setFeedbacks(getStoredFeedbacks());

    // 3. Asynchronously sync from server & IndexedDB
    initAndSyncFeedbacks().then((synced) => {
      if (synced && synced.length > 0) {
        setFeedbacks(synced);
      }
    });

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<{ feedbacks: FeedbackItem[] }>;
      if (customEvt.detail?.feedbacks) {
        setFeedbacks(customEvt.detail.feedbacks);
      }
    };

    window.addEventListener('mai-feedbacks-updated', handleUpdate);
    return () => {
      window.removeEventListener('mai-feedbacks-updated', handleUpdate);
      window.removeEventListener('mai-admin-state-changed', handleAdminChange);
    };
  }, []);

  // Direct fast upload from file picker or drop (Admin only)
  const handleDirectFiles = async (files: FileList | File[]) => {
    if (!isAdmin || !files || files.length === 0) return;
    const newItems: Array<Omit<FeedbackItem, 'id'>> = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;
      try {
        const optimized = await optimizeImage(file, 1400);
        newItems.push({
          type: 'image',
          mediaUrl: optimized,
          date: new Date().toLocaleDateString('vi-VN'),
        });
      } catch (err) {
        console.warn('Could not optimize image:', err);
      }
    }

    if (newItems.length > 0) {
      await addMultipleFeedbacks(newItems);
    }
  };

  const handleDelete = (id: string) => {
    if (!isAdmin) return;
    deleteFeedback(id);
  };

  const handleClearAll = () => {
    if (!isAdmin) return;
    if (window.confirm('Bạn có chắc muốn xóa tất cả ảnh feedback hiện tại không?')) {
      clearAllFeedbacks();
    }
  };

  return (
    <section
      id="minh-chung"
      className="py-16 sm:py-24 bg-white/75 border-b border-[#3D2F1F]/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Admin status indicator banner (Only visible to Admin) */}
        {isAdmin && (
          <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#2C4A3A]">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#4A7C59] shrink-0" />
              <span>
                <strong>Chế độ Quản trị viên (Mai Nguyễn):</strong> Bạn có toàn quyền tải thêm hoặc xóa ảnh feedback. Khách hàng truy cập sẽ <u>không</u> nhìn thấy các nút tải hay xóa này.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {onOpenDashboard && (
                <button
                  onClick={onOpenDashboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4A574] text-[#2C4A3A] font-bold text-xs shadow-sm hover:bg-[#c29362] transition-all shrink-0 cursor-pointer"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Mở Bảng Quản Trị</span>
                </button>
              )}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4A7C59] text-white font-bold text-xs shadow-sm hover:bg-[#3d6749] transition-all shrink-0 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Tải ảnh mới</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Header with Title and Admin Upload Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#3D2F1F]/10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] text-xs font-bold uppercase tracking-wider">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>MINH CHỨNG & KẾT QUẢ THỰC TẾ</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C4A3A] tracking-tight">
              ẢNH FEEDBACK TỪ KHÁCH HÀNG
            </h2>

            <p className="text-base sm:text-lg text-[#3D2F1F]/80 leading-relaxed">
              Toàn bộ hình ảnh phản hồi, tin nhắn Zalo và kết quả thực tế từ các học viên, chuyên gia và đối tác.
            </p>
          </div>

          {/* Action buttons (Admin only) */}
          {isAdmin && (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4A7C59] hover:bg-[#3d6749] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Tải Ảnh Feedback Của Khách Lên</span>
              </button>

              {feedbacks.length > 0 && (
                <button
                  onClick={handleClearAll}
                  title="Xóa tất cả ảnh feedback"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa tất cả</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Counter Banner */}
        {feedbacks.length > 0 && (
          <div className="mt-4 flex items-center justify-between text-xs text-[#3D2F1F]/70">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#4A7C59] animate-pulse" />
              <span>Đang hiển thị <strong>{feedbacks.length}</strong> ảnh feedback thực tế từ khách hàng</span>
            </div>
          </div>
        )}

        {/* Hidden Direct File Input (Admin only) */}
        {isAdmin && (
          <input
            ref={directFileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                handleDirectFiles(e.target.files);
                e.target.value = '';
              }
            }}
          />
        )}

        {/* Empty State when no photos exist */}
        {feedbacks.length === 0 ? (
          isAdmin ? (
            /* Admin view when empty: prominent upload trigger */
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingDirect(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDraggingDirect(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingDirect(false);
                if (e.dataTransfer.files) {
                  handleDirectFiles(e.dataTransfer.files);
                }
              }}
              onClick={() => directFileInputRef.current?.click()}
              className={`mt-8 rounded-3xl border-2 border-dashed p-12 sm:p-16 flex flex-col justify-center items-center text-center transition-all cursor-pointer space-y-4 ${
                isDraggingDirect
                  ? 'border-[#4A7C59] bg-[#4A7C59]/10 scale-[1.01]'
                  : 'border-[#4A7C59]/40 hover:border-[#4A7C59] bg-[#F5EFE0]/50 hover:bg-[#F5EFE0]'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] flex items-center justify-center shadow-inner">
                <UploadCloud className="w-8 h-8" />
              </div>

              <div className="space-y-1.5 max-w-md">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C4A3A]">
                  Tải Ảnh Feedback Của Khách Hàng Lên
                </h3>
                <p className="text-sm text-[#3D2F1F]/70 leading-relaxed">
                  Kéo thả hoặc nhấp vào đây để chọn ảnh chụp màn hình Zalo, tin nhắn cảm ơn hoặc kết quả thực tế từ điện thoại / máy tính của bạn.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4A7C59] hover:bg-[#3d6749] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Chọn ảnh từ thiết bị</span>
                </button>
              </div>
            </div>
          ) : (
            /* Client view when empty: clean publication state */
            <div className="mt-8 rounded-3xl bg-[#FAF6EE] border border-[#3D2F1F]/10 p-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] flex items-center justify-center">
                <MessageSquareQuote className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#2C4A3A]">
                Minh chứng & Kết quả thực tế
              </h4>
              <p className="text-sm text-[#3D2F1F]/70 max-w-md">
                Các hình ảnh phản hồi và kết quả triển khai thực chiến đang được Mai Nguyễn cập nhật liên tục.
              </p>
            </div>
          )
        ) : (
          /* Full Display Feedback Gallery - Masonry Layout Without Cropping or Explanations */
          <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            
            {/* Direct Drag & Drop / Click Upload Card (Admin only) */}
            {isAdmin && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingDirect(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDraggingDirect(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingDirect(false);
                  if (e.dataTransfer.files) {
                    handleDirectFiles(e.dataTransfer.files);
                  }
                }}
                onClick={() => directFileInputRef.current?.click()}
                className={`break-inside-avoid rounded-3xl border-2 border-dashed p-8 flex flex-col justify-center items-center text-center transition-all cursor-pointer space-y-3 ${
                  isDraggingDirect
                    ? 'border-[#4A7C59] bg-[#4A7C59]/10 scale-[1.01]'
                    : 'border-[#4A7C59]/40 hover:border-[#4A7C59] bg-[#F5EFE0]/50 hover:bg-[#F5EFE0]'
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <UploadCloud className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#2C4A3A]">
                    Tải Thêm Ảnh Feedback
                  </h4>
                  <p className="text-xs text-[#3D2F1F]/70 max-w-xs leading-relaxed">
                    Kéo thả hoặc nhấp để chọn thêm ảnh tin nhắn Zalo, kết quả của khách hàng.
                  </p>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4A7C59] text-white text-xs font-bold shadow-sm hover:bg-[#3d6749] transition-all">
                    <PlusCircle className="w-4 h-4" />
                    <span>Chọn thêm ảnh</span>
                  </span>
                </div>
              </div>
            )}

            {/* Render Each Customer Feedback Image Fully (No cropping, No explanation section) */}
            {feedbacks.map((item) => {
              return (
                <div
                  key={item.id}
                  className="break-inside-avoid relative group bg-white rounded-3xl border border-[#3D2F1F]/15 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Full Screenshot Display - entire image shown naturally */}
                  <img
                    src={item.mediaUrl}
                    alt="Ảnh feedback khách hàng"
                    className="w-full h-auto block rounded-3xl object-contain bg-[#FAF6EE]"
                    loading="lazy"
                  />

                  {/* Delete Button on Hover (Admin only) */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('Bạn có muốn xóa ảnh feedback này không?')) {
                            handleDelete(item.id);
                          }
                        }}
                        title="Xóa ảnh feedback này"
                        className="p-2 rounded-full bg-black/65 hover:bg-red-600 text-white shadow-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Modal To Add New Feedback Photos (Admin only) */}
        {isAdmin && (
          <AddFeedbackModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}

      </div>
    </section>
  );
};
