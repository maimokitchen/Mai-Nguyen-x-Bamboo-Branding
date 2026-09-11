import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ShieldCheck,
  Image as ImageIcon,
  Users,
  HardDrive,
  Download,
  UploadCloud,
  PlusCircle,
  Trash2,
  Phone,
  MessageCircle,
  CheckCircle2,
  Clock,
  ArrowUp,
  ArrowDown,
  Maximize2,
  RefreshCw,
  Eye,
  Settings,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { FeedbackItem } from '../types';
import {
  getStoredFeedbacks,
  initAndSyncFeedbacks,
  addMultipleFeedbacks,
  deleteFeedback,
  clearAllFeedbacks,
  saveFeedbacks
} from '../utils/feedbackManager';
import {
  ConsultationLead,
  getStoredLeads,
  syncLeadsFromServer,
  updateLeadStatus,
  deleteLead,
  clearAllLeads
} from '../utils/leadManager';
import {
  loadCurrentPortrait,
  savePortrait,
  optimizeImage,
  removePortraitFromDb
} from '../utils/portraitManager';
import { setAdminStatus } from '../utils/adminManager';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddFeedbackModal?: () => void;
}

type TabType = 'feedbacks' | 'portrait' | 'leads' | 'backup' | 'guide';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onOpenAddFeedbackModal,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('feedbacks');
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [leads, setLeads] = useState<ConsultationLead[]>([]);
  const [currentPortrait, setCurrentPortrait] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const feedbackFileInputRef = useRef<HTMLInputElement>(null);
  const portraitFileInputRef = useRef<HTMLInputElement>(null);
  const backupFileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Sync data on open
  useEffect(() => {
    if (!isOpen) return;

    // Load feedbacks
    setFeedbacks(getStoredFeedbacks());
    initAndSyncFeedbacks().then((items) => {
      if (items) setFeedbacks(items);
    });

    // Load leads
    setLeads(getStoredLeads());
    syncLeadsFromServer().then((items) => {
      if (items) setLeads(items);
    });

    // Load portrait
    loadCurrentPortrait().then((url) => {
      setCurrentPortrait(url);
    });

    // Listen to changes
    const handleFeedbackUpdate = (e: Event) => {
      const evt = e as CustomEvent<{ feedbacks: FeedbackItem[] }>;
      if (evt.detail?.feedbacks) setFeedbacks(evt.detail.feedbacks);
    };
    const handleLeadUpdate = (e: Event) => {
      const evt = e as CustomEvent<{ leads: ConsultationLead[] }>;
      if (evt.detail?.leads) setLeads(evt.detail.leads);
    };
    const handlePortraitUpdate = (e: Event) => {
      const evt = e as CustomEvent<{ url: string }>;
      if (evt.detail?.url) setCurrentPortrait(evt.detail.url);
    };

    window.addEventListener('mai-feedbacks-updated', handleFeedbackUpdate);
    window.addEventListener('mai-leads-updated', handleLeadUpdate);
    window.addEventListener('mai-portrait-updated', handlePortraitUpdate);

    return () => {
      window.removeEventListener('mai-feedbacks-updated', handleFeedbackUpdate);
      window.removeEventListener('mai-leads-updated', handleLeadUpdate);
      window.removeEventListener('mai-portrait-updated', handlePortraitUpdate);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Feedback Handlers
  const handleUploadFeedbacks = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);

    try {
      const newItems: Array<Omit<FeedbackItem, 'id'>> = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;
        const optimized = await optimizeImage(file, 1400);
        newItems.push({
          type: 'image',
          mediaUrl: optimized,
          title: file.name.replace(/\.[^/.]+$/, ''),
          date: new Date().toLocaleDateString('vi-VN'),
        });
      }

      if (newItems.length > 0) {
        await addMultipleFeedbacks(newItems);
        showNotification(`Đã tải lên thành công ${newItems.length} ảnh feedback!`);
      }
    } catch (err) {
      alert('Có lỗi khi tải ảnh lên: ' + String(err));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMoveFeedback = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= feedbacks.length) return;

    const reordered = [...feedbacks];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIdx, 0, moved);

    setFeedbacks(reordered);
    await saveFeedbacks(reordered);
    showNotification('Đã cập nhật thứ tự hiển thị ảnh!');
  };

  const handleDeleteFeedback = async (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa ảnh feedback này?')) {
      await deleteFeedback(id);
      showNotification('Đã xóa ảnh feedback.');
    }
  };

  const handleClearAllFeedbacks = async () => {
    if (window.confirm('CẢNH BÁO: Bạn có chắc muốn xóa TẤT CẢ ảnh feedback hiện có không?')) {
      await clearAllFeedbacks();
      showNotification('Đã xóa tất cả ảnh feedback.');
    }
  };

  // Portrait Handlers
  const handlePortraitChange = async (file: File) => {
    setIsProcessing(true);
    try {
      const optimized = await optimizeImage(file, 1600);
      await savePortrait(optimized);
      setCurrentPortrait(optimized);
      showNotification('Đã cập nhật ảnh đại diện Mai Nguyễn thành công!');
    } catch (err) {
      alert('Có lỗi khi tải ảnh đại diện: ' + String(err));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetPortrait = async () => {
    if (window.confirm('Khôi phục ảnh đại diện về mặc định ban đầu?')) {
      await removePortraitFromDb();
      try {
        localStorage.removeItem('mai_nguyen_portrait_url');
      } catch {
        // ignore
      }
      setCurrentPortrait(null);
      window.dispatchEvent(new CustomEvent('mai-portrait-updated', { detail: { url: null } }));
      showNotification('Đã đặt lại ảnh đại diện mặc định.');
    }
  };

  // Leads Handlers
  const handleLeadStatusChange = async (id: string, status: ConsultationLead['status']) => {
    await updateLeadStatus(id, status);
    showNotification('Đã cập nhật trạng thái liên hệ!');
  };

  const handleDeleteLead = async (id: string) => {
    if (window.confirm('Bạn có muốn xóa thông tin khách hàng này khỏi danh sách?')) {
      await deleteLead(id);
      showNotification('Đã xóa thông tin khách hàng.');
    }
  };

  // Backup & Restore Handlers
  const handleExportBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      feedbacks,
      leads,
      portrait: currentPortrait,
      version: '2.0',
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bamboo_backup_mai_nguyen_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('Đã xuất file sao lưu dữ liệu (.json) thành công!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (parsed.feedbacks && Array.isArray(parsed.feedbacks)) {
          await saveFeedbacks(parsed.feedbacks);
        }
        if (parsed.portrait) {
          await savePortrait(parsed.portrait);
        }
        showNotification('Đã khôi phục dữ liệu từ file sao lưu thành công!');
        window.location.reload();
      } catch (err) {
        alert('File sao lưu không hợp lệ hoặc bị lỗi: ' + String(err));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Export Leads to CSV
  const handleExportLeadsCsv = () => {
    if (leads.length === 0) {
      alert('Chưa có thông tin khách hàng nào để xuất.');
      return;
    }

    const headers = ['Thời gian', 'Họ tên', 'Số điện thoại / Zalo', 'Lĩnh vực', 'Gói giải pháp', 'Ghi chú', 'Trạng thái'];
    const rows = leads.map((l) => [
      `"${l.createdAt}"`,
      `"${l.name}"`,
      `"${l.contact}"`,
      `"${l.domain || ''}"`,
      `"${l.stage}"`,
      `"${l.note || ''}"`,
      `"${l.status === 'new' ? 'Mới' : l.status === 'contacted' ? 'Đã liên hệ' : 'Đã tư vấn'}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `danh_sach_khach_hang_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('Đã xuất danh sách khách hàng ra file Excel (CSV)!');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl my-4 sm:my-8 bg-[#F5EFE0] rounded-3xl border border-[#3D2F1F]/20 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#3D2F1F]"
      >
        {/* Header */}
        <div className="bg-[#2C4A3A] text-white p-4 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4A7C59]/40 text-[#A8D5BA] flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                  Bảng Quản Trị Website — Mai Nguyễn
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#4A7C59] text-[10px] font-mono uppercase tracking-wider text-white">
                  ADMIN PRO
                </span>
              </div>
              <p className="text-xs text-[#B8C5B0]">
                Quản lý ảnh feedback, ảnh đại diện, danh sách khách hàng và sao lưu dữ liệu.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAdminStatus(false);
                onClose();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-all cursor-pointer"
              title="Thoát quyền admin để xem website dưới góc nhìn của khách hàng"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem như khách</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#FAF6EE] px-4 sm:px-6 py-2.5 border-b border-[#3D2F1F]/10 flex flex-wrap gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('feedbacks')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'feedbacks'
                ? 'bg-[#4A7C59] text-white shadow-sm'
                : 'text-[#3D2F1F]/70 hover:bg-black/5'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Ảnh Feedback ({feedbacks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('portrait')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'portrait'
                ? 'bg-[#4A7C59] text-white shadow-sm'
                : 'text-[#3D2F1F]/70 hover:bg-black/5'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            <span>Ảnh Đại Diện Mai</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-[#4A7C59] text-white shadow-sm'
                : 'text-[#3D2F1F]/70 hover:bg-black/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Khách Đăng Ký ({leads.length})</span>
            {leads.filter((l) => l.status === 'new').length > 0 && (
              <span className="px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[10px] font-bold">
                {leads.filter((l) => l.status === 'new').length} mới
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-[#4A7C59] text-white shadow-sm'
                : 'text-[#3D2F1F]/70 hover:bg-black/5'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Sao Lưu & Phục Hồi</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-[#4A7C59] text-white shadow-sm'
                : 'text-[#3D2F1F]/70 hover:bg-black/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Cài Đặt & Hướng Dẫn</span>
          </button>
        </div>

        {/* Floating Notification Toast */}
        {notification && (
          <div className="bg-[#4A7C59] text-white px-4 py-2 text-xs font-medium text-center shadow-md animate-fade-in flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: FEEDBACKS MANAGEMENT */}
          {activeTab === 'feedbacks' && (
            <div className="space-y-6">
              {/* Actions row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#3D2F1F]/10">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2C4A3A]">
                    Quản Lý Hình Ảnh Phản Hồi Khách Hàng
                  </h4>
                  <p className="text-xs text-[#3D2F1F]/70">
                    Đang hiển thị <strong>{feedbacks.length}</strong> ảnh trên website. Khách hàng xem sẽ thấy đầy đủ không bị cắt xén.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <input
                    ref={feedbackFileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        handleUploadFeedbacks(e.target.files);
                        e.target.value = '';
                      }
                    }}
                  />

                  <button
                    onClick={() => feedbackFileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#4A7C59] hover:bg-[#3d6749] text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{isProcessing ? 'Đang tải lên...' : '+ Tải Thêm Ảnh Mới'}</span>
                  </button>

                  {feedbacks.length > 0 && (
                    <button
                      onClick={handleClearAllFeedbacks}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa tất cả</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Upload Drag & Drop Area */}
              <div
                onClick={() => feedbackFileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files) handleUploadFeedbacks(e.dataTransfer.files);
                }}
                className="rounded-2xl border-2 border-dashed border-[#4A7C59]/40 hover:border-[#4A7C59] p-6 text-center cursor-pointer bg-white/60 hover:bg-white transition-all space-y-2"
              >
                <UploadCloud className="w-8 h-8 mx-auto text-[#4A7C59]" />
                <p className="text-xs sm:text-sm font-semibold text-[#2C4A3A]">
                  Kéo thả hoặc nhấp vào đây để tải hàng loạt ảnh feedback (Zalo, tin nhắn, kết quả)
                </p>
                <p className="text-[11px] text-[#3D2F1F]/60">
                  Hệ thống tự động nén tối ưu dung lượng và lưu trữ vĩnh viễn trên máy chủ.
                </p>
              </div>

              {/* Feedbacks Grid List */}
              {feedbacks.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#3D2F1F]/60">
                  Chưa có ảnh feedback nào. Hãy bấm <strong>"+ Tải Thêm Ảnh Mới"</strong> ở trên để đưa ảnh của bạn lên.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {feedbacks.map((item, idx) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#3D2F1F]/15 overflow-hidden shadow-sm flex flex-col group relative"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[4/3] bg-[#FAF6EE] overflow-hidden">
                        <img
                          src={item.mediaUrl}
                          alt="Feedback"
                          className="w-full h-full object-contain p-2"
                        />

                        {/* Zoom button */}
                        <button
                          onClick={() => setPreviewImage(item.mediaUrl)}
                          className="absolute top-2 left-2 p-1.5 rounded-full bg-black/60 hover:bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Xem ảnh lớn"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDeleteFeedback(item.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Xóa ảnh này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Controls Bar */}
                      <div className="p-3 bg-white border-t border-[#3D2F1F]/10 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-[11px] text-[#3D2F1F]/60">
                          <span>Thứ tự #{idx + 1}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveFeedback(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded-lg hover:bg-black/5 disabled:opacity-30 cursor-pointer"
                            title="Chuyển lên đầu"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleMoveFeedback(idx, 'down')}
                            disabled={idx === feedbacks.length - 1}
                            className="p-1 rounded-lg hover:bg-black/5 disabled:opacity-30 cursor-pointer"
                            title="Chuyển xuống dưới"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PORTRAIT MANAGEMENT */}
          {activeTab === 'portrait' && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="p-6 rounded-3xl bg-white border border-[#3D2F1F]/15 space-y-5 text-center">
                <h4 className="font-serif text-lg font-bold text-[#2C4A3A]">
                  Ảnh Chân Dung Đại Diện Mai Nguyễn
                </h4>
                <p className="text-xs text-[#3D2F1F]/70 leading-relaxed">
                  Ảnh chân dung này sẽ xuất hiện trên phần Giới Thiệu (About Mai), Hero Banner và toàn bộ profile của bạn.
                </p>

                {/* Preview Portrait */}
                <div className="relative w-48 h-56 mx-auto rounded-3xl overflow-hidden border-2 border-[#4A7C59] shadow-lg bg-[#FAF6EE]">
                  <img
                    src={currentPortrait || '/EVT-51.JPG'}
                    alt="Mai Nguyễn Portrait"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/mai-nguyen.jpg';
                    }}
                  />
                </div>

                <input
                  ref={portraitFileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handlePortraitChange(e.target.files[0]);
                      e.target.value = '';
                    }
                  }}
                />

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => portraitFileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4A7C59] hover:bg-[#3d6749] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>{isProcessing ? 'Đang xử lý...' : 'Tải Ảnh Mới Thay Thế'}</span>
                  </button>

                  <button
                    onClick={handleResetPortrait}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-black/5 hover:bg-black/10 text-xs font-medium text-[#3D2F1F]/80 transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Đặt lại mặc định</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEADS & INQUIRIES */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#3D2F1F]/10">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2C4A3A]">
                    Khách Hàng Đăng Ký Tư Vấn & Thẩm Định
                  </h4>
                  <p className="text-xs text-[#3D2F1F]/70">
                    Tất cả thông tin khách gửi qua form liên hệ sẽ tự động lưu vào đây để bạn tiện kết nối và theo dõi.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportLeadsCsv}
                    disabled={leads.length === 0}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2C4A3A] hover:bg-[#1f3529] text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-40"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Xuất File Excel (CSV)</span>
                  </button>
                </div>
              </div>

              {leads.length === 0 ? (
                <div className="py-16 text-center text-xs text-[#3D2F1F]/60 bg-white rounded-2xl border border-[#3D2F1F]/10">
                  Chưa có khách hàng nào gửi thông tin đăng ký tư vấn. Khi có khách điền form, dữ liệu sẽ hiển thị ngay tại đây.
                </div>
              ) : (
                <div className="space-y-3">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-2xl bg-white border border-[#3D2F1F]/15 shadow-sm space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3D2F1F]/10 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-sm text-[#2C4A3A]">{lead.name}</h5>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                lead.status === 'new'
                                  ? 'bg-amber-100 text-amber-800'
                                  : lead.status === 'contacted'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {lead.status === 'new'
                                ? 'Chưa liên hệ'
                                : lead.status === 'contacted'
                                ? 'Đang trao đổi'
                                : 'Đã tư vấn'}
                            </span>
                          </div>
                          <p className="text-xs text-[#3D2F1F]/60 flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>Đăng ký: {lead.createdAt}</span>
                          </p>
                        </div>

                        {/* Quick Contact Buttons */}
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://zalo.me/${lead.contact.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0068FF] text-white text-xs font-bold hover:bg-[#0052cc] transition-all"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Zalo khách: {lead.contact}</span>
                          </a>

                          <a
                            href={`tel:${lead.contact.replace(/[^0-9]/g, '')}`}
                            className="p-2 rounded-xl bg-black/5 hover:bg-black/10 text-[#3D2F1F]"
                            title="Gọi điện"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600"
                            title="Xóa lead này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Detail fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[#3D2F1F]/60">Gói giải pháp quan tâm: </span>
                          <strong className="text-[#2C4A3A]">{lead.stage}</strong>
                        </div>
                        {lead.domain && (
                          <div>
                            <span className="text-[#3D2F1F]/60">Lĩnh vực: </span>
                            <strong>{lead.domain}</strong>
                          </div>
                        )}
                      </div>

                      {lead.note && (
                        <div className="p-3 rounded-xl bg-[#FAF6EE] text-xs text-[#3D2F1F]/80">
                          <span className="font-semibold text-[#2C4A3A]">Lời nhắn / Thách thức: </span>
                          <span>{lead.note}</span>
                        </div>
                      )}

                      {/* Status Toggle buttons */}
                      <div className="flex items-center gap-2 pt-1 text-xs">
                        <span className="text-[11px] text-[#3D2F1F]/60">Cập nhật trạng thái:</span>
                        <button
                          onClick={() => handleLeadStatusChange(lead.id, 'contacted')}
                          className="px-2.5 py-1 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 text-[11px] cursor-pointer"
                        >
                          Đã nhắn tin / gọi điện
                        </button>
                        <button
                          onClick={() => handleLeadStatusChange(lead.id, 'completed')}
                          className="px-2.5 py-1 rounded-lg border border-green-200 text-green-700 hover:bg-green-50 text-[11px] cursor-pointer"
                        >
                          Hoàn thành tư vấn
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="p-6 rounded-3xl bg-white border border-[#3D2F1F]/15 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#4A7C59]/10 text-[#4A7C59] flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#2C4A3A]">
                      Sao Lưu Toàn Bộ Dữ Liệu Website
                    </h4>
                    <p className="text-xs text-[#3D2F1F]/70">
                      Tải file sao lưu chứa toàn bộ ảnh feedback, ảnh chân dung và danh sách khách hàng về máy tính.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#3D2F1F]/70 leading-relaxed bg-[#FAF6EE] p-4 rounded-2xl border border-[#3D2F1F]/10">
                  💡 <strong>Khuyến nghị an toàn:</strong> Sau khi tải lên nhiều ảnh feedback quan trọng, bạn hãy bấm nút dưới đây để tải file dự phòng (.json) lưu vào máy tính hoặc Google Drive. Bất cứ khi nào cần, bạn chỉ cần nạp lại file này là khôi phục nguyên vẹn 100% dữ liệu.
                </p>

                <button
                  onClick={handleExportBackup}
                  className="w-full py-3 rounded-full bg-[#4A7C59] hover:bg-[#3d6749] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải File Sao Lưu (.JSON) Về Máy Tính</span>
                </button>
              </div>

              {/* Restore Section */}
              <div className="p-6 rounded-3xl bg-white border border-[#3D2F1F]/15 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#2C4A3A]">
                      Khôi Phục Dữ Liệu Từ File Sao Lưu
                    </h4>
                    <p className="text-xs text-[#3D2F1F]/70">
                      Nạp lại dữ liệu ảnh và cấu hình từ file .json đã tải về trước đó.
                    </p>
                  </div>
                </div>

                <input
                  ref={backupFileInputRef}
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImportBackup}
                />

                <button
                  onClick={() => backupFileInputRef.current?.click()}
                  className="w-full py-3 rounded-full border-2 border-dashed border-[#4A7C59] hover:bg-[#4A7C59]/10 text-[#2C4A3A] text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <UploadCloud className="w-4 h-4 text-[#4A7C59]" />
                  <span>Chọn File Sao Lưu Để Phục Hồi</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: GUIDE & SETTINGS */}
          {activeTab === 'guide' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="p-6 rounded-3xl bg-white border border-[#3D2F1F]/15 space-y-4">
                <h4 className="font-serif text-base font-bold text-[#2C4A3A]">
                  Hướng Dẫn Xuất Bản & Bảo Mật Quản Trị
                </h4>

                <div className="space-y-3 text-xs text-[#3D2F1F]/80 leading-relaxed">
                  <div className="p-3.5 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/20 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#2C4A3A]">Khi gửi link cho khách hàng:</strong>
                      <p className="mt-0.5">
                        Bạn chỉ cần gửi link trang web bình thường (không có đuôi <code>?admin=true</code>). Khách hàng truy cập sẽ hoàn toàn <strong>KHÔNG</strong> nhìn thấy nút tải ảnh, nút xóa ảnh hay thanh quản trị nào.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-900">Cách bạn đăng nhập quyền Quản trị:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-[#3D2F1F]/80">
                        <li>
                          <strong>Cách 1:</strong> Thêm <code>?admin=true</code> vào cuối link (VD: <code>domain.com/?admin=true</code>).
                        </li>
                        <li>
                          <strong>Cách 2:</strong> Cuộn xuống cuối trang (Footer), nhấp vào chữ <strong>"Quản trị"</strong> cạnh số Zalo và nhập mật khẩu: <code>mai123</code> (hoặc <code>maithinguyen</code>).
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-2.5">
                    <Eye className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-blue-900">Xem thử dưới góc nhìn của khách hàng:</strong>
                      <p className="mt-0.5">
                        Bất cứ lúc nào bạn có thể bấm nút <strong>"Xem như khách"</strong> trên thanh công cụ nổi để tắt chế độ Admin và kiểm tra lại trang web xem khách có thấy đúng như ý bạn không.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#FAF6EE] border-t border-[#3D2F1F]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#3D2F1F]/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4A7C59]" />
            <span>Hệ thống lưu trữ ảnh: <strong>Server Disk + IndexedDB Cache</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#4A7C59] text-white font-bold hover:bg-[#3d6749] transition-all cursor-pointer"
            >
              Đóng Bảng Quản Trị
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Photo Zoom */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer animate-fade-in"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={previewImage}
              alt="Preview Zoom"
              className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};
