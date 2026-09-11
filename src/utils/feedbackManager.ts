import { FeedbackItem, CaseStudy } from '../types';

const FEEDBACK_STORE_KEY = 'mai_nguyen_feedbacks_v2';
const LEGACY_FEEDBACK_STORE_KEY = 'mai_nguyen_feedbacks_v1';
const CASE_STUDY_MEDIA_KEY = 'mai_nguyen_case_study_media_v1';
const DB_NAME = 'bamboo_branding_db';
const FEEDBACK_OBJ_STORE = 'profile_assets';
const IDB_FEEDBACK_KEY = 'mai_feedbacks_data';

export function parseVideoEmbedUrl(url: string): { embedUrl: string; isDirectVideo: boolean } {
  if (!url) return { embedUrl: '', isDirectVideo: false };
  const trimmed = url.trim();

  const ytWatchMatch = trimmed.match(
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/i
  );
  if (ytWatchMatch && ytWatchMatch[1]) {
    return {
      embedUrl: `https://www.youtube.com/embed/${ytWatchMatch[1]}?autoplay=0&rel=0`,
      isDirectVideo: false,
    };
  }

  const vimeoMatch = trimmed.match(/vimeo\.com\/(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      isDirectVideo: false,
    };
  }

  if (trimmed.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) || trimmed.startsWith('data:video/')) {
    return {
      embedUrl: trimmed,
      isDirectVideo: true,
    };
  }

  return {
    embedUrl: trimmed,
    isDirectVideo: false,
  };
}

export const DEFAULT_FEEDBACKS: FeedbackItem[] = [];

// Helper: Open IndexedDB
function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, 2);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(FEEDBACK_OBJ_STORE)) {
        db.createObjectStore(FEEDBACK_OBJ_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Get from IndexedDB
export async function getFeedbacksFromDb(): Promise<FeedbackItem[]> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const tx = db.transaction(FEEDBACK_OBJ_STORE, 'readonly');
      const store = tx.objectStore(FEEDBACK_OBJ_STORE);
      const request = store.get(IDB_FEEDBACK_KEY);
      request.onsuccess = () => {
        const res = request.result;
        resolve(Array.isArray(res) ? res : []);
      };
      request.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

// Save to IndexedDB
export async function saveFeedbacksToDb(feedbacks: FeedbackItem[]): Promise<void> {
  try {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(FEEDBACK_OBJ_STORE, 'readwrite');
      const store = tx.objectStore(FEEDBACK_OBJ_STORE);
      const request = store.put(feedbacks, IDB_FEEDBACK_KEY);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to save feedbacks to IndexedDB:', err);
  }
}

// Upload a single image file or base64 to server filesystem and return persistent server URL
export async function uploadImageToServer(dataBase64: string, filename?: string): Promise<string> {
  try {
    const res = await fetch('/api/upload-media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dataBase64,
        filename: filename || `feedback_${Date.now()}_${Math.random().toString(36).slice(2, 6)}.jpg`,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.url) {
        return data.url;
      }
    }
  } catch (err) {
    console.warn('Server upload-media error (using base64 fallback):', err);
  }
  return dataBase64; // fallback to base64 if server unavailable
}

// Memory cache for instantaneous sync
let memoryCache: FeedbackItem[] | null = null;

// Synchronous getter from cache or localStorage (for initial render)
export function getStoredFeedbacks(): FeedbackItem[] {
  if (memoryCache !== null) {
    return memoryCache;
  }
  if (typeof window === 'undefined') return [];

  // Try reading from current localStorage key
  try {
    const raw = localStorage.getItem(FEEDBACK_STORE_KEY) || localStorage.getItem(LEGACY_FEEDBACK_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Filter out any legacy unsplash mock images
        const userItems = parsed.filter(
          (item) =>
            !item.mediaUrl?.includes('images.unsplash.com') &&
            !['fb-01', 'fb-02', 'fb-03', 'fb-04', 'fb-05'].includes(item.id)
        );
        memoryCache = userItems;
        return userItems;
      }
    }
  } catch {
    // Ignore error
  }

  memoryCache = [];
  return [];
}

// Asynchronous initializer that checks Server and IndexedDB
export async function initAndSyncFeedbacks(): Promise<FeedbackItem[]> {
  // 1. Try fetching from server disk storage
  try {
    const res = await fetch('/api/feedbacks');
    if (res.ok) {
      const serverData = await res.json();
      if (Array.isArray(serverData) && serverData.length > 0) {
        const cleanServer = serverData.filter(
          (item) => !item.mediaUrl?.includes('images.unsplash.com')
        );
        memoryCache = cleanServer;
        saveToLocalCache(cleanServer);
        await saveFeedbacksToDb(cleanServer);
        window.dispatchEvent(new CustomEvent('mai-feedbacks-updated', { detail: { feedbacks: cleanServer } }));
        return cleanServer;
      }
    }
  } catch {
    // Fall back to client storage
  }

  // 2. Try IndexedDB
  try {
    const fromDb = await getFeedbacksFromDb();
    if (Array.isArray(fromDb) && fromDb.length > 0) {
      const cleanDb = fromDb.filter(
        (item) => !item.mediaUrl?.includes('images.unsplash.com')
      );
      memoryCache = cleanDb;
      saveToLocalCache(cleanDb);
      // Sync up to server
      syncToServer(cleanDb);
      window.dispatchEvent(new CustomEvent('mai-feedbacks-updated', { detail: { feedbacks: cleanDb } }));
      return cleanDb;
    }
  } catch {
    // Fall back to local storage
  }

  // 3. Fallback to localStorage
  const fromLocal = getStoredFeedbacks();
  if (fromLocal.length > 0) {
    saveFeedbacksToDb(fromLocal);
    syncToServer(fromLocal);
  }
  return fromLocal;
}

// Internal helper to update localStorage safely
function saveToLocalCache(feedbacks: FeedbackItem[]): void {
  try {
    localStorage.setItem(FEEDBACK_STORE_KEY, JSON.stringify(feedbacks));
  } catch {
    // If quota exceeded, store light metadata or rely on IndexedDB
    try {
      const lightweight = feedbacks.map((f) => ({
        ...f,
        // If mediaUrl is giant base64, truncate for local storage index only
        mediaUrl: f.mediaUrl.length > 500 ? f.mediaUrl.slice(0, 100) + '...' : f.mediaUrl,
      }));
      localStorage.setItem(FEEDBACK_STORE_KEY, JSON.stringify(lightweight));
    } catch {
      // Ignore
    }
  }
}

// Internal helper to push to server
async function syncToServer(feedbacks: FeedbackItem[]): Promise<void> {
  try {
    await fetch('/api/feedbacks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbacks),
    });
  } catch {
    // Ignore if server unreachable
  }
}

// Master save function
export async function saveFeedbacks(feedbacks: FeedbackItem[]): Promise<void> {
  memoryCache = feedbacks;

  // 1. Dispatch custom event immediately so React UI updates with zero latency
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mai-feedbacks-updated', { detail: { feedbacks } }));
  }

  // 2. Save to IndexedDB (safe for high-resolution images, no quota limits)
  await saveFeedbacksToDb(feedbacks);

  // 3. Save to localStorage as quick sync
  saveToLocalCache(feedbacks);

  // 4. Push to server for persistent disk storage
  await syncToServer(feedbacks);
}

// Add a single feedback item
export async function addFeedback(item: Omit<FeedbackItem, 'id'>): Promise<FeedbackItem> {
  const feedbacks = getStoredFeedbacks();
  const { embedUrl } = parseVideoEmbedUrl(item.mediaUrl);
  const newItem: FeedbackItem = {
    ...item,
    id: `fb-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    videoEmbedUrl: item.type === 'video' ? embedUrl : undefined,
  };
  const updated = [newItem, ...feedbacks];
  await saveFeedbacks(updated);
  return newItem;
}

// Add multiple feedback items (with automatic server upload conversion)
export async function addMultipleFeedbacks(newItems: Array<Omit<FeedbackItem, 'id'>>): Promise<FeedbackItem[]> {
  const currentFeedbacks = getStoredFeedbacks();

  // Process items: convert base64 to server file URL if possible
  const processedItems: FeedbackItem[] = await Promise.all(
    newItems.map(async (item, idx) => {
      let finalMediaUrl = item.mediaUrl;

      // If it's a base64 image, upload to server disk
      if (item.mediaUrl.startsWith('data:image/')) {
        const serverUrl = await uploadImageToServer(item.mediaUrl, `fb_${Date.now()}_${idx}.jpg`);
        if (serverUrl && !serverUrl.startsWith('data:')) {
          finalMediaUrl = serverUrl;
        }
      }

      const { embedUrl } = parseVideoEmbedUrl(finalMediaUrl);
      return {
        ...item,
        mediaUrl: finalMediaUrl,
        id: `fb-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        videoEmbedUrl: item.type === 'video' ? embedUrl : undefined,
      };
    })
  );

  const updated = [...processedItems, ...currentFeedbacks];
  await saveFeedbacks(updated);
  return processedItems;
}

// Delete a feedback item by ID
export async function deleteFeedback(id: string): Promise<void> {
  const feedbacks = getStoredFeedbacks();
  const updated = feedbacks.filter((f) => f.id !== id);
  await saveFeedbacks(updated);
}

// Clear all feedbacks
export async function clearAllFeedbacks(): Promise<void> {
  await saveFeedbacks([]);
}

// Case Study Proof Media Storage
export function getStoredCaseStudyMedia(): Record<string, CaseStudy['proofMedia']> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CASE_STUDY_MEDIA_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveCaseStudyProofMedia(caseId: string, proof: CaseStudy['proofMedia']): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredCaseStudyMedia();
    current[caseId] = proof;
    localStorage.setItem(CASE_STUDY_MEDIA_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('mai-case-study-media-updated', { detail: { caseId, proof } }));
  } catch (err) {
    console.warn('Could not save case study media:', err);
  }
}
