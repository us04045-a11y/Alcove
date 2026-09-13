import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { DatabaseSync } = require('node:sqlite');

export const VALID_HOURLY_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
] as const;

export type HourlySlot = (typeof VALID_HOURLY_SLOTS)[number];

export interface Booking {
  id: string;
  bookingType: 'tour' | 'session';
  date: string; // YYYY-MM-DD
  timeSlot: HourlySlot;
  name: string;
  email: string;
  phone: string;
  company?: string;
  teamSize?: string;
  interest?: string;
  duration?: string;
  addons?: string[];
  notes?: string;
  createdAt: string;
}

export interface BookingInput {
  bookingType?: 'tour' | 'session';
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  teamSize?: string;
  interest?: string;
  duration?: string;
  addons?: string[];
  notes?: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const SQLITE_DB_PATH = path.join(DATA_DIR, 'alcove_bookings.db');
const JSON_BACKUP_PATH = path.join(DATA_DIR, 'bookings.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize SQLite database instance with WAL mode for high concurrency
const db = new DatabaseSync(SQLITE_DB_PATH);

// Initialize schema with strict UNIQUE constraint on (date, time_slot)
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA synchronous = NORMAL;

  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    booking_type TEXT NOT NULL,
    date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    team_size TEXT,
    interest TEXT,
    duration TEXT,
    addons TEXT,
    notes TEXT,
    created_at TEXT NOT NULL,
    UNIQUE(date, time_slot)
  );

  CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
`);

// Prepared statement caches
const stmtInsert = db.prepare(`
  INSERT INTO bookings (
    id, booking_type, date, time_slot, name, email, phone, company, team_size, interest, duration, addons, notes, created_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const stmtSelectByDate = db.prepare(`
  SELECT * FROM bookings WHERE date = ? ORDER BY time_slot ASC
`);

const stmtSelectAll = db.prepare(`
  SELECT * FROM bookings ORDER BY date ASC, time_slot ASC
`);

const stmtDeleteById = db.prepare(`
  DELETE FROM bookings WHERE id = ?
`);

const stmtDeleteAll = db.prepare(`
  DELETE FROM bookings
`);

const stmtCountSlotsForDate = db.prepare(`
  SELECT time_slot FROM bookings WHERE date = ?
`);

/**
 * Migration helper: If legacy JSON file exists, migrate into SQLite without duplicates
 */
function migrateLegacyJson(): void {
  try {
    if (fs.existsSync(JSON_BACKUP_PATH)) {
      const raw = fs.readFileSync(JSON_BACKUP_PATH, 'utf8');
      const items = JSON.parse(raw);
      if (Array.isArray(items)) {
        const stmtMigrate = db.prepare(`
          INSERT OR IGNORE INTO bookings (
            id, booking_type, date, time_slot, name, email, phone, company, team_size, interest, duration, addons, notes, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        for (const b of items) {
          if (b.id && b.date && b.timeSlot && isValidSlot(b.timeSlot)) {
            stmtMigrate.run(
              b.id,
              b.bookingType || 'tour',
              b.date,
              b.timeSlot,
              b.name || 'Anonymous',
              b.email || 'guest@example.com',
              b.phone || '',
              b.company || '',
              b.teamSize || '',
              b.interest || '',
              b.duration || '',
              JSON.stringify(b.addons || []),
              b.notes || '',
              b.createdAt || new Date().toISOString()
            );
          }
        }
      }
    }
  } catch (err) {
    console.warn('Legacy JSON migration warning:', err);
  }
}

migrateLegacyJson();

/**
 * Persist current state to JSON backup mirror
 */
function syncJsonMirror(): void {
  try {
    const allRows = stmtSelectAll.all() as any[];
    const bookings = allRows.map(rowToBooking);
    const tempFile = `${JSON_BACKUP_PATH}.tmp.${Date.now()}.${Math.random().toString(36).substring(2, 6)}`;
    fs.writeFileSync(tempFile, JSON.stringify(bookings, null, 2), 'utf8');
    fs.renameSync(tempFile, JSON_BACKUP_PATH);
  } catch (err) {
    console.error('Failed to sync JSON mirror:', err);
  }
}

function rowToBooking(row: any): Booking {
  let addons: string[] = [];
  try {
    addons = row.addons ? JSON.parse(row.addons) : [];
  } catch {
    addons = [];
  }

  return {
    id: row.id,
    bookingType: row.booking_type as 'tour' | 'session',
    date: row.date,
    timeSlot: row.time_slot as HourlySlot,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company || '',
    teamSize: row.team_size || '',
    interest: row.interest || '',
    duration: row.duration || '',
    addons,
    notes: row.notes || '',
    createdAt: row.created_at,
  };
}

/**
 * Get current time and date in Asia/Karachi timezone
 */
export function getKarachiNow(): {
  dateStr: string; // YYYY-MM-DD
  timeStr: string; // HH:mm
  fullDate: Date;
} {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Karachi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '00';
  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  const hour = getPart('hour');
  const minute = getPart('minute');

  return {
    dateStr: `${year}-${month}-${day}`,
    timeStr: `${hour}:${minute}`,
    fullDate: now,
  };
}

/**
 * Sanitize string input: strip control characters, HTML tags, angle brackets, enforce maxLength
 */
export function sanitizeString(val: unknown, maxLength: number = 255): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Normalize and strictly validate ISO date string (YYYY-MM-DD)
 */
export function normalizeDate(rawDate: string): string {
  if (!rawDate || typeof rawDate !== 'string') return '';
  const trimmed = rawDate.trim();
  const isoMatch = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.exec(trimmed);
  if (!isoMatch) return '';

  const y = parseInt(isoMatch[1], 10);
  const m = parseInt(isoMatch[2], 10);
  const d = parseInt(isoMatch[3], 10);

  const dateObj = new Date(Date.UTC(y, m - 1, d));
  if (
    dateObj.getUTCFullYear() !== y ||
    dateObj.getUTCMonth() !== m - 1 ||
    dateObj.getUTCDate() !== d
  ) {
    return '';
  }

  return trimmed;
}

/**
 * Validate whether slot is one of the 20 exact hourly slots
 */
export function isValidSlot(slot: string): slot is HourlySlot {
  return VALID_HOURLY_SLOTS.includes(slot as HourlySlot);
}

/**
 * Get all booked slots for a specific date from SQLite
 */
export function getBookedSlotsForDate(date: string): string[] {
  const normDate = normalizeDate(date);
  if (!normDate) return [];

  const rows = stmtCountSlotsForDate.all(normDate) as Array<{ time_slot: string }>;
  return rows.map((r) => r.time_slot);
}

/**
 * Get complete availability details for a given date
 */
export function getAvailability(date: string) {
  const normDate = normalizeDate(date) || getKarachiNow().dateStr;
  const bookedSlots = getBookedSlotsForDate(normDate);

  const slotDetails = VALID_HOURLY_SLOTS.map((slot) => {
    const isBooked = bookedSlots.includes(slot);
    return {
      slot,
      isBooked,
      status: isBooked ? 'BOOKED' : 'AVAILABLE',
      displayLabel: isBooked ? `${slot} — BOOKED` : slot,
      period: getSlotPeriod(slot),
    };
  });

  return {
    date: normDate,
    totalSlots: VALID_HOURLY_SLOTS.length, // 20
    bookedCount: bookedSlots.length,
    availableCount: VALID_HOURLY_SLOTS.length - bookedSlots.length,
    bookedSlots,
    slots: slotDetails,
  };
}

function getSlotPeriod(slot: string): 'day' | 'evening' | 'overnight' {
  const hour = parseInt(slot.split(':')[0], 10);
  if (hour >= 9 && hour <= 17) return 'day';
  if (hour >= 18 && hour <= 23) return 'evening';
  return 'overnight'; // 00:00 through 04:00
}

/**
 * Retrieve bookings from SQLite (optionally filtered by date)
 */
export function getBookings(dateFilter?: string): Booking[] {
  if (dateFilter) {
    const norm = normalizeDate(dateFilter);
    if (!norm) return [];
    const rows = stmtSelectByDate.all(norm) as any[];
    return rows.map(rowToBooking);
  }
  const rows = stmtSelectAll.all() as any[];
  return rows.map(rowToBooking);
}

/**
 * Create a new booking with ACID atomic uniqueness guarantee
 */
export function createBooking(input: BookingInput): {
  success: boolean;
  booking?: Booking;
  error?: string;
  status: number;
} {
  // 1. Validate Date
  const rawDate = typeof input.date === 'string' ? input.date.trim() : '';
  const normDate = normalizeDate(rawDate);

  if (!normDate) {
    return {
      success: false,
      error: 'A valid calendar date in YYYY-MM-DD format is required.',
      status: 400,
    };
  }

  // 2. Validate Timezone Constraint (Asia/Karachi)
  const karachi = getKarachiNow();
  if (normDate < karachi.dateStr) {
    return {
      success: false,
      error: `Cannot reserve a time slot in the past. Current date in Asia/Karachi is ${karachi.dateStr}.`,
      status: 400,
    };
  }

  // Maximum 90-day booking horizon
  const maxAllowedDate = new Date(karachi.fullDate);
  maxAllowedDate.setDate(maxAllowedDate.getDate() + 90);
  const maxDateStr = maxAllowedDate.toISOString().slice(0, 10);
  if (normDate > maxDateStr) {
    return {
      success: false,
      error: 'Bookings cannot be scheduled more than 90 days in advance.',
      status: 400,
    };
  }

  // 3. Validate Time Slot (Strictly one of the 20 hourly slots)
  const timeSlot = typeof input.timeSlot === 'string' ? input.timeSlot.trim() : '';
  if (!timeSlot || !isValidSlot(timeSlot)) {
    return {
      success: false,
      error: `Invalid time slot "${timeSlot}". Allowed slots are 09:00 through 04:00 (20 hourly slots).`,
      status: 400,
    };
  }

  // 4. Validate Booking Type
  const rawType = input.bookingType || 'tour';
  const bookingType: 'tour' | 'session' = rawType === 'session' ? 'session' : 'tour';

  // 5. Sanitize & Validate Name
  const cleanName = sanitizeString(input.name, 100);
  if (!cleanName || cleanName.length < 2) {
    return {
      success: false,
      error: 'Full name is required (minimum 2 characters).',
      status: 400,
    };
  }

  // 6. Validate Email
  const cleanEmail = sanitizeString(input.email, 120).toLowerCase();
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return {
      success: false,
      error: 'A valid email address is required.',
      status: 400,
    };
  }

  // 7. Validate Phone
  const cleanPhone = sanitizeString(input.phone, 30);
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{5,20}$/;
  if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
    return {
      success: false,
      error: 'A valid phone or WhatsApp number is required.',
      status: 400,
    };
  }

  // 8. Sanitize Optional Fields
  const cleanCompany = sanitizeString(input.company, 100);
  const cleanTeamSize = sanitizeString(input.teamSize, 50);
  const cleanInterest = sanitizeString(input.interest, 100);
  const cleanDuration = sanitizeString(input.duration, 100);
  const cleanNotes = sanitizeString(input.notes, 500);

  let cleanAddons: string[] = [];
  if (Array.isArray(input.addons)) {
    cleanAddons = input.addons
      .slice(0, 10)
      .map((a) => sanitizeString(a, 100))
      .filter(Boolean);
  }

  const bookingId = `alcove_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  const createdAt = new Date().toISOString();

  // 9. ATOMIC DATABASE INSERTION WITH UNIQUE CONSTRAINT
  // This guarantees that even with simultaneous concurrent requests for Monday 18:00,
  // SQLite's native atomic constraint will permit ONLY ONE to succeed, rejecting the second.
  try {
    stmtInsert.run(
      bookingId,
      bookingType,
      normDate,
      timeSlot,
      cleanName,
      cleanEmail,
      cleanPhone,
      cleanCompany,
      cleanTeamSize,
      cleanInterest,
      cleanDuration,
      JSON.stringify(cleanAddons),
      cleanNotes,
      createdAt
    );

    // Sync backup JSON asynchronously
    syncJsonMirror();

    const createdBooking: Booking = {
      id: bookingId,
      bookingType,
      date: normDate,
      timeSlot,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      company: cleanCompany,
      teamSize: cleanTeamSize,
      interest: cleanInterest,
      duration: cleanDuration,
      addons: cleanAddons,
      notes: cleanNotes,
      createdAt,
    };

    return {
      success: true,
      booking: createdBooking,
      status: 201,
    };
  } catch (err: any) {
    // Check if error is SQLite unique constraint violation
    const errMsg = String(err?.message || '');
    if (errMsg.includes('UNIQUE constraint failed') || errMsg.includes('constraint failed')) {
      return {
        success: false,
        error: `Time slot ${timeSlot} on ${normDate} is already BOOKED. Please select an available slot.`,
        status: 409, // Conflict
      };
    }

    console.error('Critical database error during booking creation:', err);
    return {
      success: false,
      error: 'An internal error occurred while securing your reservation. Please try again.',
      status: 500,
    };
  }
}

/**
 * Cancel / Delete booking by ID
 */
export function deleteBooking(id: string): boolean {
  if (!id || typeof id !== 'string') return false;
  try {
    const res = stmtDeleteById.run(id);
    if (res.changes > 0) {
      syncJsonMirror();
      return true;
    }
    return false;
  } catch (err) {
    console.error('Error deleting booking:', err);
    return false;
  }
}

/**
 * Clear all bookings (administrative reset)
 */
export function clearAllBookings(): void {
  try {
    stmtDeleteAll.run();
    syncJsonMirror();
  } catch (err) {
    console.error('Error clearing bookings database:', err);
  }
}
