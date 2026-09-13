/**
 * Security & Sanitization Utilities
 * Protects against XSS, Prototype Pollution, Insecure Storage, and Injection Vulnerabilities
 */

// Allowed domains for external imagery
const TRUSTED_IMAGE_HOSTS = [
  'images.unsplash.com',
  'lh3.googleusercontent.com',
];

/**
 * Validates whether a given URL string is safe to be rendered in an <img> tag or CSS background.
 * Blocks javascript:, vbscript:, data:text/html, SVG script injections, and path traversals.
 */
export function isSafeImageUrl(url: unknown): boolean {
  if (typeof url !== 'string' || !url.trim()) return false;
  const trimmed = url.trim();

  // Reject malicious schemes
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('data:text/') ||
    lower.startsWith('data:application/') ||
    lower.includes('<script') ||
    lower.includes('%3cscript')
  ) {
    return false;
  }

  // Safe relative paths starting with /images/ or /assets/ without path traversal
  if (trimmed.startsWith('/') && !trimmed.startsWith('//') && !trimmed.includes('..')) {
    return true;
  }

  // Safe data URIs for common raster images only
  if (lower.startsWith('data:image/')) {
    // Only allow standard safe image formats (no SVG which could contain embedded scripts)
    const safeDataUriRegex = /^data:image\/(jpeg|jpg|png|webp|gif);base64,[A-Za-z0-9+/=]+$/i;
    return safeDataUriRegex.test(trimmed);
  }

  // Safe HTTPS URLs from trusted domains
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') return false;
    return TRUSTED_IMAGE_HOSTS.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
    );
  } catch {
    return false;
  }
}

/**
 * Returns a validated safe image URL or falls back to a secure default.
 */
export function getSafeImageUrl(url: unknown, fallback: string): string {
  if (isSafeImageUrl(url)) {
    return url as string;
  }
  return fallback;
}

/**
 * Sanitizes user text input: strips HTML/script tags, control characters, and enforces length limits.
 */
export function sanitizeInput(input: string, maxLength: number = 255): string {
  if (typeof input !== 'string') return '';
  // Remove control characters, HTML tags, angle brackets
  const cleaned = input
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .replace(/[<>]/g, '')
    .trim();
  return cleaned.slice(0, maxLength);
}

/**
 * Validates email structure against common injection payloads.
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 100) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Validates international phone strings.
 */
export function isValidPhone(phone: string): boolean {
  if (typeof phone !== 'string') return false;
  const trimmed = phone.trim();
  if (trimmed.length < 5 || trimmed.length > 30) return false;
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{4,20}$/;
  return phoneRegex.test(trimmed);
}

/**
 * Validates file upload for security before reading into memory.
 */
export function validateUploadFile(
  file: File,
  maxSizeBytes: number = 10 * 1024 * 1024 // 10MB default
): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided.' };
  }

  // Size validation
  if (file.size > maxSizeBytes) {
    const maxMb = Math.round(maxSizeBytes / (1024 * 1024));
    return { valid: false, error: `File size exceeds the ${maxMb}MB security limit.` };
  }

  // MIME type validation
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedMimes.includes(file.type.toLowerCase())) {
    return { valid: false, error: 'Invalid file type. Only JPG, PNG, and WebP images are permitted.' };
  }

  // Extension validation
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (!ext || !['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
    return { valid: false, error: 'Invalid file extension.' };
  }

  return { valid: true };
}

/**
 * Safe wrapper around localStorage that gracefully handles QuotaExceededError,
 * disabled storage in private/incognito mode, and iframe restrictions.
 */
export const safeLocalStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem(key: string, value: string): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      window.localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  removeItem(key: string): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      window.localStorage.removeItem(key);
    } catch {
      // Ignored
    }
  },
};

/**
 * Safe wrapper around sessionStorage that gracefully handles restrictions.
 */
export const safeSessionStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window === 'undefined' || !window.sessionStorage) return null;
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem(key: string, value: string): boolean {
    try {
      if (typeof window === 'undefined' || !window.sessionStorage) return false;
      window.sessionStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  removeItem(key: string): void {
    try {
      if (typeof window === 'undefined' || !window.sessionStorage) return;
      window.sessionStorage.removeItem(key);
    } catch {
      // Ignored
    }
  },
};
