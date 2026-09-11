/**
 * Utility to manage Mai Nguyen's portrait photo persistence
 * - IndexedDB for reliable high-res storage without 5MB quota errors
 * - Server filesystem storage via /api/upload-portrait
 * - Custom event listener so all components update immediately
 */

const DB_NAME = 'bamboo_branding_db';
const STORE_NAME = 'profile_assets';
const PORTRAIT_KEY = 'mai_nguyen_portrait';

// Open or create IndexedDB
function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Get portrait from IndexedDB
export async function getPortraitFromDb(): Promise<string | null> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(PORTRAIT_KEY);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// Save portrait to IndexedDB
export async function savePortraitToDb(dataUrl: string): Promise<void> {
  try {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(dataUrl, PORTRAIT_KEY);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to save to IndexedDB:', err);
  }
}

// Clear portrait from DB
export async function removePortraitFromDb(): Promise<void> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(PORTRAIT_KEY);
      tx.oncomplete = () => resolve();
    });
  } catch {
    // Ignore
  }
}

// Optimize image to high quality web format (max dimension 1600px)
export function optimizeImage(file: File, maxDim: number = 1600): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = maxDim;
        let { width, height } = img;

        if (width > height && width > MAX_DIM) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else if (height > MAX_DIM) {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Export as JPEG with 90% quality
        const optimized = canvas.toDataURL('image/jpeg', 0.9);
        resolve(optimized);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Save portrait everywhere (IndexedDB, Server, and LocalStorage)
export async function savePortrait(dataUrl: string): Promise<void> {
  // 1. Save to IndexedDB
  await savePortraitToDb(dataUrl);

  // 2. Try saving to localStorage as fallback
  try {
    localStorage.setItem('mai_nguyen_portrait_url', dataUrl);
  } catch {
    // LocalStorage quota may be exceeded, which is fine since IndexedDB has it
  }

  // 3. Upload to server
  try {
    await fetch('/api/upload-portrait', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: dataUrl }),
    });
  } catch (e) {
    console.warn('Server upload failed:', e);
  }

  // 4. Dispatch event to update all components in UI
  window.dispatchEvent(new CustomEvent('mai-portrait-updated', { detail: { url: dataUrl } }));
}

// Load current portrait URL
export async function loadCurrentPortrait(): Promise<string | null> {
  // 1. Check server status first
  try {
    const res = await fetch('/api/portrait-status');
    if (res.ok) {
      const data = await res.json();
      if (data.exists && data.url) {
        return data.url;
      }
    }
  } catch {
    // Fall back to client storage
  }

  // 2. Check IndexedDB
  const fromDb = await getPortraitFromDb();
  if (fromDb) return fromDb;

  // 3. Check LocalStorage
  if (typeof window !== 'undefined') {
    const fromLocal = localStorage.getItem('mai_nguyen_portrait_url');
    if (fromLocal) return fromLocal;
  }

  return null;
}
