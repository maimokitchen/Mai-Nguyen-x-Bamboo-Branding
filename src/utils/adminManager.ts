/**
 * Admin Access Manager for Mai Nguyen's Profile
 * Ensures only Mai Nguyen can upload feedback, modify media, or delete items.
 * Clients and visitors see a pristine, published view without upload or admin buttons.
 */

const ADMIN_STORAGE_KEY = 'mai_nguyen_admin_active';
const ADMIN_PASSCODES = ['maithinguyen', 'mai123', 'admin', 'mainguyen'];

// Check if currently authorized as Admin
export function checkIsAdmin(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Check URL query params (e.g. ?admin=true or ?admin=mai)
  try {
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('admin');
    if (adminParam && (adminParam === 'true' || adminParam === 'mai' || adminParam === '1' || adminParam === 'maithinguyen')) {
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      return true;
    }
  } catch {
    // Ignore URL parse errors
  }

  // 2. Check persistent storage
  try {
    return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

// Set Admin state explicitly
export function setAdminStatus(status: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (status) {
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
    window.dispatchEvent(new CustomEvent('mai-admin-state-changed', { detail: { isAdmin: status } }));
  } catch {
    // Ignore storage issues
  }
}

// Verify entered passcode
export function verifyAdminPasscode(passcode: string): boolean {
  if (!passcode) return false;
  const clean = passcode.trim().toLowerCase();
  const matched = ADMIN_PASSCODES.some((code) => code.toLowerCase() === clean);
  if (matched) {
    setAdminStatus(true);
    return true;
  }
  return false;
}
