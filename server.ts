import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import {
  getAvailability,
  getBookings,
  createBooking,
  deleteBooking,
  clearAllBookings,
  normalizeDate,
  getKarachiNow,
  VALID_HOURLY_SLOTS,
} from './server/db.js';

// Admin API Key configuration (server-only secret, never exposed to client)
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'alcove_admin_sec_991823';

/**
 * In-Memory Sliding Window Rate Limiter
 */
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

function createRateLimiter(options: {
  windowMs: number;
  maxRequests: number;
  message: string;
}) {
  const store = new Map<string, RateLimitRecord>();

  // Cleanup expired IPs every 60s
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of store.entries()) {
      if (now > record.resetTime) {
        store.delete(ip);
      }
    }
  }, 60000);

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const rawIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'anonymous-client';
    const ip = rawIp.slice(0, 64);

    const now = Date.now();
    const record = store.get(ip);

    if (!record || now > record.resetTime) {
      store.set(ip, {
        count: 1,
        resetTime: now + options.windowMs,
      });
      res.setHeader('X-RateLimit-Limit', options.maxRequests);
      res.setHeader('X-RateLimit-Remaining', options.maxRequests - 1);
      next();
      return;
    }

    record.count += 1;
    const remaining = Math.max(0, options.maxRequests - record.count);
    res.setHeader('X-RateLimit-Limit', options.maxRequests);
    res.setHeader('X-RateLimit-Remaining', remaining);

    if (record.count > options.maxRequests) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      res.status(429).json({
        error: options.message,
        retryAfter: retryAfterSeconds,
      });
      return;
    }

    next();
  };
}

/**
 * Admin Authentication Middleware
 * Protects privileged endpoints from unauthorized access, scraping, and PII leaks
 */
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const adminHeader = req.headers['x-admin-key'];
  const authHeader = req.headers['authorization'];

  let token = '';
  if (typeof adminHeader === 'string') {
    token = adminHeader.trim();
  } else if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  }

  if (!token || token !== ADMIN_API_KEY) {
    res.status(401).json({
      error: 'Unauthorized. Valid administrative credentials required to access this endpoint.',
    });
    return;
  }

  next();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global Security Headers Middleware
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '0');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
    );
    // Content Security Policy permitting Vite development, Google Fonts, and preview iframe
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self' https: data: blob:; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com data:; " +
      "img-src 'self' data: blob: https:; " +
      "connect-src 'self' https:; " +
      "frame-ancestors 'self' https://ai.studio https://*.google.com https://*.run.app; " +
      "base-uri 'self';"
    );
    next();
  });

  // Standard JSON Parser with strict 64KB size limit for public API routes (prevents memory DoS)
  const jsonParserStandard = express.json({ limit: '64kb' });
  app.use('/api', (req, res, next) => {
    if (req.path === '/upload-space-photo') {
      next(); // Handled separately with image parser
    } else {
      jsonParserStandard(req, res, next);
    }
  });

  // Rate Limiting Instances
  const availabilityRateLimiter = createRateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 240, // 4 requests/sec per IP max
    message: 'Too many availability requests. Please slow down.',
  });

  const bookingRateLimiter = createRateLimiter({
    windowMs: 5 * 60 * 1000, // 5 minutes
    maxRequests: 20, // max 20 reservations per 5 mins per IP
    message: 'Too many booking attempts. Please wait 5 minutes before submitting again.',
  });

  // 1. Health Check
  app.get('/api/health', (_req, res) => {
    const karachi = getKarachiNow();
    res.json({
      status: 'ok',
      service: 'Alcove Spaces Booking & Spatial Architecture Engine',
      timestampUtc: new Date().toISOString(),
      timezone: 'Asia/Karachi',
      karachiDate: karachi.dateStr,
      karachiTime: karachi.timeStr,
      slotsCount: VALID_HOURLY_SLOTS.length,
    });
  });

  // 2. Query Availability for a specific date (Publicly accessible, ZERO PII returned)
  app.get('/api/availability', availabilityRateLimiter, (req, res) => {
    const karachi = getKarachiNow();
    const dateParam = (req.query.date as string) || karachi.dateStr;
    const normDate = normalizeDate(dateParam) || karachi.dateStr;
    const availability = getAvailability(normDate);
    res.json(availability);
  });

  // 3. Create a new booking (Public with Rate Limiting & ACID Unique Constraint)
  app.post('/api/bookings', bookingRateLimiter, (req, res) => {
    try {
      const result = createBooking(req.body);
      if (!result.success) {
        res.status(result.status).json({
          error: result.error,
          date: req.body?.date,
          timeSlot: req.body?.timeSlot,
        });
        return;
      }

      res.status(201).json({
        success: true,
        message: `Reservation confirmed for ${result.booking?.timeSlot} on ${result.booking?.date}.`,
        booking: result.booking,
      });
    } catch (err) {
      console.error('Unhandled error in POST /api/bookings:', err);
      res.status(500).json({
        error: 'An internal server error occurred while processing your booking.',
      });
    }
  });

  // 4. Query All Bookings (PROTECTED: Requires Admin Key to prevent PII Leak)
  app.get('/api/bookings', requireAdminAuth, (req, res) => {
    const dateParam = req.query.date as string | undefined;
    const bookings = getBookings(dateParam);
    res.json({
      count: bookings.length,
      bookings,
    });
  });

  // 5. Cancel / Delete a booking (PROTECTED: Requires Admin Key)
  app.delete('/api/bookings/:id', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const deleted = deleteBooking(id);
    if (deleted) {
      res.json({ success: true, message: `Booking ${id} released.` });
    } else {
      res.status(404).json({ error: `Booking ${id} not found.` });
    }
  });

  // 6. Reset bookings database (PROTECTED: Requires Admin Key)
  app.post('/api/bookings/reset', requireAdminAuth, (_req, res) => {
    clearAllBookings();
    res.json({ success: true, message: 'All booking slots reset to available.' });
  });

  // 7. Image Upload Endpoint (PROTECTED: Requires Admin Key, strictly validated format & path)
  const imageUploadParser = express.json({ limit: '10mb' });
  app.post('/api/upload-space-photo', requireAdminAuth, imageUploadParser, (req, res) => {
    try {
      const { filename, base64Data } = req.body;
      const allowedFilenames = ['003.jpg', '033.jpg', '076.jpg', '0111.jpg'];
      const sanitizedFilename = path.basename(filename || '');

      if (!allowedFilenames.includes(sanitizedFilename)) {
        res.status(400).json({
          error: 'Invalid filename. Must be one of: ' + allowedFilenames.join(', '),
        });
        return;
      }

      if (typeof base64Data !== 'string' || !base64Data) {
        res.status(400).json({ error: 'Missing or invalid base64 image data.' });
        return;
      }

      const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(cleanBase64, 'base64');

      // Magic Bytes Binary Verification
      const isJpeg = buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
      const isPng =
        buffer.length > 4 &&
        buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4e &&
        buffer[3] === 0x47;
      const isWebp =
        buffer.length > 12 &&
        buffer[0] === 0x52 &&
        buffer[1] === 0x49 &&
        buffer[2] === 0x46 &&
        buffer[3] === 0x46 &&
        buffer[8] === 0x57 &&
        buffer[9] === 0x45 &&
        buffer[10] === 0x42 &&
        buffer[11] === 0x50;

      if (!isJpeg && !isPng && !isWebp) {
        res.status(400).json({
          error: 'Invalid image format. Only authentic JPEG, PNG, or WebP binary streams are permitted.',
        });
        return;
      }

      const publicDir = path.resolve(process.cwd(), 'public/images');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

      const targetPath = path.join(publicDir, sanitizedFilename);
      fs.writeFileSync(targetPath, buffer);

      const distDir = path.resolve(process.cwd(), 'dist/images');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, sanitizedFilename), buffer);
      }

      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      res.json({
        success: true,
        filename: sanitizedFilename,
        url: `/images/${sanitizedFilename}?t=${Date.now()}`,
      });
    } catch {
      res.status(500).json({ error: 'Internal server error processing photo upload.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Alcove Spatial Backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
