import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
  Users,
  Compass,
  Laptop,
  Coffee,
  Shield,
  Zap,
  ArrowRight,
  Send,
  Building,
  Headphones,
  Check,
  MessageSquare,
  Phone,
  Instagram,
  Loader2,
  X,
  Database,
} from 'lucide-react';
import { sanitizeInput, isValidEmail, isValidPhone } from '../utils/security';
import { HourlySlotGrid, getUpcomingDays, formatSlotLabel } from './HourlySlotGrid';

const WHATSAPP_DISPLAY = '0300-1407991';
const WHATSAPP_INTL = '923001407991';

export const ConsultationSection: React.FC = () => {
  // Active view on mobile if user toggles tabs
  const [mobileTab, setMobileTab] = useState<'tour' | 'session'>('tour');

  const upcomingDays = getUpcomingDays();
  const defaultBookingDate = upcomingDays[0]?.date || new Date().toISOString().split('T')[0];

  // Tour Form State
  const [tourData, setTourData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    teamSize: '1–4 people',
    date: defaultBookingDate,
    timeSlot: '',
    interest: 'Private Executive Studio',
    notes: '',
  });
  const [tourSubmitted, setTourSubmitted] = useState<boolean>(false);
  const [tourWhatsappUrl, setTourWhatsappUrl] = useState<string>('');

  // Session Form State
  const [sessionData, setSessionData] = useState({
    name: '',
    email: '',
    phone: '',
    sessionType: 'Day Pass • Focus Alcove',
    duration: 'Full Day (9:00 AM – 7:00 PM)',
    date: defaultBookingDate,
    timeSlot: '',
    attendees: '1 Person (Solo Resident)',
    addons: ['High-Speed 10 Gbps Ethernet Drop', 'Unlimited Artisan Barista Espresso'],
    notes: '',
  });
  const [sessionSubmitted, setSessionSubmitted] = useState<boolean>(false);
  const [sessionWhatsappUrl, setSessionWhatsappUrl] = useState<string>('');
  const [tourError, setTourError] = useState<string>('');
  const [sessionError, setSessionError] = useState<string>('');
  const [isTourSubmitting, setIsTourSubmitting] = useState<boolean>(false);
  const [isSessionSubmitting, setIsSessionSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  const showNotification = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleTourSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isTourSubmitting) return;
    setTourError('');

    const cleanName = sanitizeInput(tourData.name, 80);
    const cleanEmail = sanitizeInput(tourData.email, 100);
    const cleanPhone = sanitizeInput(tourData.phone, 30);
    const cleanCompany = sanitizeInput(tourData.company, 100);
    const cleanNotes = sanitizeInput(tourData.notes, 500);

    if (!cleanName) {
      setTourError('Please provide a valid full name.');
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setTourError('Please provide a valid corporate or work email address.');
      return;
    }
    if (!isValidPhone(cleanPhone)) {
      setTourError('Please provide a valid phone or WhatsApp number.');
      return;
    }
    if (!tourData.date) {
      setTourError('Please choose a booking date.');
      return;
    }
    if (!tourData.timeSlot) {
      setTourError('Please select an available hourly time slot from the 20 available hours.');
      return;
    }

    setIsTourSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingType: 'tour',
          date: tourData.date,
          timeSlot: tourData.timeSlot,
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          company: cleanCompany,
          teamSize: tourData.teamSize,
          interest: tourData.interest,
          notes: cleanNotes,
        }),
      });

      const resData = await res.json();

      if (res.status === 409) {
        setTourError(resData.error || `Time slot ${tourData.timeSlot} on ${tourData.date} is already BOOKED. Please select an available slot.`);
        setIsTourSubmitting(false);
        setTourData((prev) => ({ ...prev, timeSlot: '' }));
        return;
      }

      if (!res.ok) {
        setTourError(resData.error || 'Unable to confirm reservation. Please try again.');
        setIsTourSubmitting(false);
        return;
      }

      setTourData((prev) => ({
        ...prev,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        company: cleanCompany,
        notes: cleanNotes,
      }));

      const lines = [
        '🏛️ *ALCOVE COWORKING CLIFTON — CAMPUS TOUR RESERVATION*',
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        `👤 *Name:* ${cleanName}`,
        `✉️ *Email:* ${cleanEmail}`,
        `📞 *Phone:* ${cleanPhone}`,
        cleanCompany ? `🏢 *Company / Studio:* ${cleanCompany}` : null,
        `👥 *Team Size:* ${tourData.teamSize}`,
        `📅 *Confirmed Date:* ${tourData.date}`,
        `⏰ *Hourly Slot:* ${tourData.timeSlot} (${formatSlotLabel(tourData.timeSlot)})`,
        `📍 *Space of Interest:* ${tourData.interest}`,
        cleanNotes ? `📝 *Requirements:* ${cleanNotes}` : null,
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        'Database Status: Confirmed & Locked',
        'Sent via Alcove Spaces Website'
      ].filter(Boolean);

      const waUrl = `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(lines.join('\n'))}`;
      setTourWhatsappUrl(waUrl);
      setTourSubmitted(true);
      setIsTourSubmitting(false);
      showNotification('Tour Slot Secured', `Slot ${tourData.timeSlot} on ${tourData.date} is booked and saved to backend.`);

      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch {
        // Handled via confirmation screen button
      }
    } catch (err) {
      console.error('Error recording booking:', err);
      setTourError('Network error connecting to booking database. Please try again.');
      setIsTourSubmitting(false);
    }
  };

  const handleSessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSessionSubmitting) return;
    setSessionError('');

    const cleanName = sanitizeInput(sessionData.name, 80);
    const cleanEmail = sanitizeInput(sessionData.email, 100);
    const cleanPhone = sanitizeInput(sessionData.phone, 30);
    const cleanNotes = sanitizeInput(sessionData.notes, 500);

    if (!cleanName) {
      setSessionError('Please provide a valid full name.');
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setSessionError('Please provide a valid email address.');
      return;
    }
    if (!isValidPhone(cleanPhone)) {
      setSessionError('Please provide a valid phone or WhatsApp number.');
      return;
    }
    if (!sessionData.date) {
      setSessionError('Please select a session booking date.');
      return;
    }
    if (!sessionData.timeSlot) {
      setSessionError('Please select an available hourly start slot from the 20 available hours.');
      return;
    }

    setIsSessionSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingType: 'session',
          date: sessionData.date,
          timeSlot: sessionData.timeSlot,
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          company: sessionData.sessionType,
          teamSize: sessionData.attendees,
          duration: sessionData.duration,
          addons: sessionData.addons,
          notes: cleanNotes,
        }),
      });

      const resData = await res.json();

      if (res.status === 409) {
        setSessionError(resData.error || `Time slot ${sessionData.timeSlot} on ${sessionData.date} is already BOOKED. Please select an available slot.`);
        setIsSessionSubmitting(false);
        setSessionData((prev) => ({ ...prev, timeSlot: '' }));
        return;
      }

      if (!res.ok) {
        setSessionError(resData.error || 'Unable to confirm session pass. Please try again.');
        setIsSessionSubmitting(false);
        return;
      }

      setSessionData((prev) => ({
        ...prev,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        notes: cleanNotes,
      }));

      const lines = [
        '⚡ *ALCOVE COWORKING CLIFTON — WORK SESSION / DAY PASS*',
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        `👤 *Name:* ${cleanName}`,
        `✉️ *Email:* ${cleanEmail}`,
        `📞 *Phone:* ${cleanPhone}`,
        `💼 *Session Type:* ${sessionData.sessionType}`,
        `📅 *Confirmed Date:* ${sessionData.date}`,
        `⏰ *Hourly Slot:* ${sessionData.timeSlot} (${formatSlotLabel(sessionData.timeSlot)})`,
        `⏳ *Duration:* ${sessionData.duration}`,
        `👥 *Attendees:* ${sessionData.attendees}`,
        `🛠️ *Add-ons:* ${sessionData.addons.length > 0 ? sessionData.addons.join(', ') : 'Standard Inclusions'}`,
        cleanNotes ? `📝 *Notes:* ${cleanNotes}` : null,
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        'Database Status: Confirmed & Locked',
        'Sent via Alcove Spaces Website'
      ].filter(Boolean);

      const waUrl = `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(lines.join('\n'))}`;
      setSessionWhatsappUrl(waUrl);
      setSessionSubmitted(true);
      setIsSessionSubmitting(false);
      showNotification('Session Pass Confirmed', `Slot ${sessionData.timeSlot} on ${sessionData.date} reserved in database.`);

      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch {
        // Handled via confirmation screen button
      }
    } catch (err) {
      console.error('Error recording session pass:', err);
      setSessionError('Network error connecting to booking database. Please try again.');
      setIsSessionSubmitting(false);
    }
  };

  const toggleSessionAddon = (addon: string) => {
    setSessionData((prev) => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter((a) => a !== addon)
        : [...prev.addons, addon],
    }));
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-[#F4F8F4] text-[#0F2A1A] relative border-t border-[#E1ECE3] overflow-hidden"
    >
      {/* Background Architectural Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(196,232,148,0.25),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(196,232,148,0.2),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E1EDE3_1px,transparent_1px),linear-gradient(to_bottom,#E1EDE3_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Toast Notification for Form Transmission */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-24 right-4 sm:right-8 z-50 max-w-md p-4 rounded-2xl bg-[#0C2415] text-white border border-[#C4E894]/40 shadow-2xl flex items-start gap-3 backdrop-blur-md"
              role="status"
              aria-live="polite"
            >
              <div className="p-2 rounded-xl bg-[#C4E894]/20 text-[#C4E894] shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-cinzel text-xs uppercase tracking-widest text-[#C4E894] font-bold">
                  {toastMessage.title}
                </p>
                <p className="text-xs text-[#CFE2D4] font-sans mt-0.5 leading-relaxed">
                  {toastMessage.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="text-[#CFE2D4]/60 hover:text-white transition-colors p-1"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDF6EF] border border-[#C6E2CA] text-xs font-mono-custom text-[#1D522F] uppercase tracking-wider font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#2E6F40]" />
            Flagship Campus Access • Karachi
          </div>

          <h2 className="font-cinzel font-black text-3xl sm:text-5xl lg:text-6xl text-[#0F2A1A] tracking-tight leading-tight uppercase">
            BOOK A TOUR / SESSION
          </h2>

          <p className="text-sm sm:text-base text-[#4A7055] font-normal leading-relaxed">
            Experience architectural silence and bespoke executive hospitality. Choose between a guided walkthrough of our Clifton campus or reserve a dedicated trial work session.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono-custom text-[#265335]">
              <MapPin className="w-4 h-4 text-[#2E6F40] shrink-0" />
              <span className="font-semibold">
                Plot # G, 25 Khayaban-e-Jami, Block 9 Clifton, Karachi, 75500, Pakistan
              </span>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_INTL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8EE] hover:bg-[#D5F2DF] border border-[#25D366]/40 text-[#124D28] text-xs font-mono-custom font-bold transition-all shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
            </a>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex lg:hidden p-1.5 bg-[#E2ECE4] rounded-2xl mb-8 border border-[#D1E0D4]">
          <button
            type="button"
            onClick={() => setMobileTab('tour')}
            className={`flex-1 py-3 rounded-xl text-xs font-mono-custom font-bold uppercase transition-all flex items-center justify-center gap-2 ${
              mobileTab === 'tour'
                ? 'bg-[#122E1C] text-white shadow-md'
                : 'text-[#3E6549] hover:text-[#122E1C]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#C4E894]" />
            <span>1. Book a Tour</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('session')}
            className={`flex-1 py-3 rounded-xl text-xs font-mono-custom font-bold uppercase transition-all flex items-center justify-center gap-2 ${
              mobileTab === 'session'
                ? 'bg-[#122E1C] text-white shadow-md'
                : 'text-[#3E6549] hover:text-[#122E1C]'
            }`}
          >
            <Laptop className="w-4 h-4 text-[#C4E894]" />
            <span>2. Book a Session</span>
          </button>
        </div>

        {/* Dual Two-Sided Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* ============================================================== */}
          {/* SIDE 1: BOOK A CAMPUS TOUR (WALKTHROUGH)                      */}
          {/* ============================================================== */}
          <div
            className={`rounded-3xl bg-white border border-[#DCE8DE] p-6 sm:p-9 shadow-xl shadow-[#0F2A1A]/5 flex flex-col justify-between relative overflow-hidden ${
              mobileTab === 'tour' ? 'block' : 'hidden lg:flex'
            }`}
          >
            {/* Top Badge */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EDF5EE] border border-[#D2E4D5] text-[11px] font-mono-custom text-[#245433] font-bold uppercase">
                  <Compass className="w-3.5 h-3.5 text-[#2E6F40]" />
                  <span>SIDE A • GUIDED WALKTHROUGH</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#EAF5EC] text-[#245734] text-[10px] font-mono-custom font-bold border border-[#C5E1CA]">
                  Complimentary
                </span>
              </div>

              <div>
                <h3 className="font-cinzel font-black text-2xl sm:text-3xl text-[#0F2A1A] leading-tight">
                  Book a Campus Tour
                </h3>
                <p className="text-xs sm:text-sm text-[#4E755B] mt-1.5 leading-relaxed">
                  Join our architectural director for an exclusive 30-minute walkthrough of our soundproof pods, private team studios, and executive atrium.
                </p>
              </div>

              {/* Tour Highlights */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono-custom text-[#2E583D]">
                <div className="flex items-center gap-1.5 bg-[#F6FAF6] px-2.5 py-2 rounded-xl border border-[#E3ECE4]">
                  <Check className="w-3.5 h-3.5 text-[#2E6F40]" />
                  <span>Acoustic Chamber Test</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F6FAF6] px-2.5 py-2 rounded-xl border border-[#E3ECE4]">
                  <Coffee className="w-3.5 h-3.5 text-[#2E6F40]" />
                  <span>Espresso Bar Tasting</span>
                </div>
              </div>
            </div>

            {/* Tour Form / Confirmation */}
            {tourSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 px-6 text-center space-y-4 bg-[#F5F9F5] rounded-2xl border border-[#CFE4D3] my-auto"
              >
                <div className="w-14 h-14 rounded-full bg-[#E2F2E5] text-[#245834] flex items-center justify-center mx-auto border border-[#BDE0C4] shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-cinzel font-black text-2xl text-[#0F2A1A]">
                    TOUR RESERVATION READY
                  </h4>
                  <p className="text-xs font-mono-custom text-[#2E6F40] font-bold">
                    Connected to WhatsApp Concierge ({WHATSAPP_DISPLAY})
                  </p>
                </div>
                <p className="text-xs text-[#4E735B] max-w-md mx-auto leading-relaxed">
                  We have prepared your tour booking details for <strong>{tourData.name || 'valued guest'}</strong>. Your WhatsApp chat should open automatically. If it didn't open, tap the button below:
                </p>

                <div className="p-3.5 bg-white rounded-xl border border-[#DCE8DE] text-left text-xs font-mono-custom space-y-1.5 max-w-sm mx-auto shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#558061] uppercase font-semibold">Scheduled Details:</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EDF5EE] text-[#122E1C] font-bold flex items-center gap-1">
                      <Database className="w-2.5 h-2.5 text-[#2E6F40]" />
                      <span>DB Locked</span>
                    </span>
                  </div>
                  <div className="text-[#0F2A1A] font-bold">{tourData.date} • {tourData.timeSlot} ({formatSlotLabel(tourData.timeSlot)})</div>
                  <div className="text-[#2B543A] text-[11px]">{tourData.interest} ({tourData.teamSize})</div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={tourWhatsappUrl || `https://wa.me/${WHATSAPP_INTL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5C] text-[#0A2612] font-mono-custom font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Open WhatsApp ({WHATSAPP_DISPLAY})</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setTourSubmitted(false)}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl border border-[#D1E0D4] hover:bg-[#EDF5EE] text-[#345A40] text-xs font-mono-custom font-semibold transition-all cursor-pointer"
                  >
                    Book Another Tour
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleTourSubmit} className="space-y-4">
                {tourError && (
                  <div className="p-3 rounded-xl bg-[#FEE2E2] border border-[#F87171] text-[#991B1B] text-xs font-mono-custom flex items-center gap-2">
                    <Shield className="w-4 h-4 shrink-0 text-[#DC2626]" />
                    <span>{tourError}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      maxLength={80}
                      placeholder="e.g. Asad Mansoor"
                      value={tourData.name}
                      onChange={(e) => setTourData({ ...tourData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] focus:border-[#2E6F40] focus:bg-white focus:outline-none text-xs transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold">
                      Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      maxLength={100}
                      placeholder="e.g. asad@venture.com"
                      value={tourData.email}
                      onChange={(e) => setTourData({ ...tourData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] focus:border-[#2E6F40] focus:bg-white focus:outline-none text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold">
                      Phone / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      maxLength={30}
                      placeholder="e.g. +92 300 1234567"
                      value={tourData.phone}
                      onChange={(e) => setTourData({ ...tourData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] focus:border-[#2E6F40] focus:bg-white focus:outline-none text-xs transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      maxLength={100}
                      placeholder="e.g. Clifton Capital"
                      value={tourData.company}
                      onChange={(e) => setTourData({ ...tourData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] focus:border-[#2E6F40] focus:bg-white focus:outline-none text-xs transition-colors"
                    />
                  </div>
                </div>

                {/* 20 Hourly Slots Booking Grid (09:00 - 04:00 Overnight) */}
                <HourlySlotGrid
                  selectedDate={tourData.date}
                  onDateChange={(d) => setTourData((prev) => ({ ...prev, date: d, timeSlot: '' }))}
                  selectedSlot={tourData.timeSlot}
                  onSelectSlot={(s) => setTourData((prev) => ({ ...prev, timeSlot: s }))}
                  disabled={isTourSubmitting}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold">
                      Primary Space Interest
                    </label>
                    <select
                      value={tourData.interest}
                      onChange={(e) => setTourData({ ...tourData, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] focus:border-[#2E6F40] focus:bg-white focus:outline-none text-xs transition-colors cursor-pointer"
                    >
                      <option value="Private Executive Studio">Private Executive Studio (4–15 Desks)</option>
                      <option value="Open-Air Sky Terrace & Work Garden">Open-Air Sky Terrace & Work Garden</option>
                      <option value="Dedicated Hot Desk Pod">Dedicated Hot Desk Pod</option>
                      <option value="Acoustic Boardroom & Lounge">Acoustic Boardroom & Lounge</option>
                      <option value="Full Floor Custom Enterprise Wing">Full Floor Custom Enterprise Wing</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold">
                      Estimated Team Size
                    </label>
                    <select
                      value={tourData.teamSize}
                      onChange={(e) => setTourData({ ...tourData, teamSize: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] focus:border-[#2E6F40] focus:bg-white focus:outline-none text-xs transition-colors cursor-pointer"
                    >
                      <option value="1 Person (Solo Executive)">1 Person (Solo Executive)</option>
                      <option value="2–5 people">2–5 people</option>
                      <option value="6–15 people">6–15 people</option>
                      <option value="16–40 people">16–40 people</option>
                      <option value="40+ Enterprise">40+ Enterprise Suite</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold">
                    Specific Requirements or Questions
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Need soundproof phone booths for remote Zoom calls, dedicated parking, fiber internet..."
                    value={tourData.notes}
                    onChange={(e) => setTourData({ ...tourData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] focus:border-[#2E6F40] focus:bg-white focus:outline-none text-xs resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isTourSubmitting}
                  className={`w-full py-3.5 rounded-xl font-cinzel font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#122E1C]/20 ${
                    isTourSubmitting
                      ? 'bg-[#1D4A2E] text-[#C4E894] cursor-wait opacity-85'
                      : 'bg-[#122E1C] hover:bg-[#1D4A2E] text-white cursor-pointer active:scale-[0.99]'
                  }`}
                >
                  {isTourSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-[#C4E894] animate-spin" />
                      <span>Transmitting Campus Tour Request...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 text-[#C4E894]" />
                      <span>Send Tour Request via WhatsApp ({WHATSAPP_DISPLAY})</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ============================================================== */}
          {/* SIDE 2: BOOK A WORK SESSION / TRIAL PASS                      */}
          {/* ============================================================== */}
          <div
            className={`rounded-3xl bg-white border border-[#DCE8DE] p-6 sm:p-9 shadow-xl shadow-[#0F2A1A]/5 flex flex-col justify-between relative overflow-hidden ${
              mobileTab === 'session' ? 'block' : 'hidden lg:flex'
            }`}
          >
            {/* Top Badge */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EDF5EE] border border-[#D2E4D5] text-[11px] font-mono-custom text-[#245433] font-bold uppercase">
                  <Laptop className="w-3.5 h-3.5 text-[#2E6F40]" />
                  <span>SIDE B • ACTIVE WORK SESSION</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#122E1C] text-[#C4E894] text-[10px] font-mono-custom font-bold border border-[#122E1C]">
                  Instant Confirmation
                </span>
              </div>

              <div>
                <h3 className="font-cinzel font-black text-2xl sm:text-3xl text-[#0F2A1A] leading-tight">
                  Book a Work Session
                </h3>
                <p className="text-xs sm:text-sm text-[#4E755B] mt-1.5 leading-relaxed">
                  Reserve a high-focus day pass, sound-isolated podcast studio, or executive boardroom slot with 10 Gbps symmetrical fiber.
                </p>
              </div>

              {/* Session Inclusions */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono-custom text-[#2E583D]">
                <div className="flex items-center gap-1.5 bg-[#F6FAF6] px-2.5 py-2 rounded-xl border border-[#E3ECE4]">
                  <Zap className="w-3.5 h-3.5 text-[#2E6F40]" />
                  <span>10 Gbps Symmetrical Net</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F6FAF6] px-2.5 py-2 rounded-xl border border-[#E3ECE4]">
                  <Shield className="w-3.5 h-3.5 text-[#2E6F40]" />
                  <span>NFC Biometric Credential</span>
                </div>
              </div>
            </div>

            {/* Session Form / Confirmation */}
            {sessionSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 px-6 text-center space-y-4 bg-[#F5F9F5] rounded-2xl border border-[#CFE4D3] my-auto"
              >
                <div className="w-14 h-14 rounded-full bg-[#E2F2E5] text-[#245834] flex items-center justify-center mx-auto border border-[#BDE0C4] shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-cinzel font-black text-2xl text-[#0F2A1A]">
                    WORK SESSION READY
                  </h4>
                  <p className="text-xs font-mono-custom text-[#2E6F40] font-bold">
                    Connected to WhatsApp Concierge ({WHATSAPP_DISPLAY})
                  </p>
                </div>
                <p className="text-xs text-[#4E735B] max-w-md mx-auto leading-relaxed">
                  Your work pass request for <strong>{sessionData.name || 'resident'}</strong> has been compiled. If your WhatsApp did not open automatically, click the button below:
                </p>

                <div className="p-3.5 bg-white rounded-xl border border-[#DCE8DE] text-left text-xs font-mono-custom space-y-1.5 max-w-sm mx-auto shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#558061] uppercase font-semibold">Session Summary:</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EDF5EE] text-[#122E1C] font-bold flex items-center gap-1">
                      <Database className="w-2.5 h-2.5 text-[#2E6F40]" />
                      <span>DB Locked</span>
                    </span>
                  </div>
                  <div className="text-[#0F2A1A] font-bold">{sessionData.sessionType}</div>
                  <div className="text-[#2B543A] text-[11px]">{sessionData.date} • {sessionData.timeSlot} ({formatSlotLabel(sessionData.timeSlot)}) • {sessionData.duration}</div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={sessionWhatsappUrl || `https://wa.me/${WHATSAPP_INTL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5C] text-[#0A2612] font-mono-custom font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Open WhatsApp ({WHATSAPP_DISPLAY})</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSessionSubmitted(false)}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl border border-[#D1E0D4] hover:bg-[#EDF5EE] text-[#345A40] text-xs font-mono-custom font-semibold transition-all cursor-pointer"
                  >
                    Reserve Another Session
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSessionSubmit} className="space-y-4">
                {sessionError && (
                  <div className="p-3 rounded-xl bg-[#FEE2E2] border border-[#F87171] text-[#991B1B] text-xs font-mono-custom flex items-center gap-2">
                    <Shield className="w-4 h-4 shrink-0 text-[#DC2626]" />
                    <span>{sessionError}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      maxLength={80}
                      placeholder="e.g. Fatima Tariq"
                      value={sessionData.name}
                      onChange={(e) => setSessionData({ ...sessionData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] focus:border-[#2E6F40] focus:bg-white focus:outline-none text-xs transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold">
                      Corporate / Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      maxLength={100}
                      placeholder="e.g. fatima@techlead.io"
                      value={sessionData.email}
                      onChange={(e) => setSessionData({ ...sessionData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] focus:border-[#2E6F40] focus:bg-white focus:outline-none text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      maxLength={30}
                      placeholder="e.g. +92 321 9876543"
                      value={sessionData.phone}
                      onChange={(e) => setSessionData({ ...sessionData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] focus:border-[#2E6F40] focus:bg-white focus:outline-none text-xs transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold">
                      Session Format
                    </label>
                    <select
                      value={sessionData.sessionType}
                      onChange={(e) => setSessionData({ ...sessionData, sessionType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] focus:border-[#2E6F40] focus:bg-white focus:outline-none text-xs transition-colors cursor-pointer"
                    >
                      <option value="Day Pass • Focus Alcove">Day Pass • Focus Alcove (Solo)</option>
                      <option value="Soundproof Podcast & Media Studio">Soundproof Podcast & Media Studio</option>
                      <option value="4-Person Sprint Pod">4-Person Sprint Pod (Team)</option>
                      <option value="12-Person Executive Boardroom">12-Person Executive Boardroom</option>
                    </select>
                  </div>
                </div>

                {/* 20 Hourly Slots Booking Grid (09:00 - 04:00 Overnight) */}
                <HourlySlotGrid
                  selectedDate={sessionData.date}
                  onDateChange={(d) => setSessionData((prev) => ({ ...prev, date: d, timeSlot: '' }))}
                  selectedSlot={sessionData.timeSlot}
                  onSelectSlot={(s) => setSessionData((prev) => ({ ...prev, timeSlot: s }))}
                  disabled={isSessionSubmitting}
                />

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold">
                    Pass Duration
                  </label>
                  <select
                    value={sessionData.duration}
                    onChange={(e) => setSessionData({ ...sessionData, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] focus:border-[#2E6F40] focus:bg-white focus:outline-none text-xs transition-colors cursor-pointer"
                  >
                    <option value="Single Hour (From Selected Slot)">Single Hour (From Selected Slot)</option>
                    <option value="Half Day Block (4 Hours)">Half Day Block (4 Hours)</option>
                    <option value="Full Day Access (8 Hours)">Full Day Access (8 Hours)</option>
                    <option value="Overnight Sprint (Continuous Access)">Overnight Sprint (Continuous Access)</option>
                  </select>
                </div>

                {/* Amenities / Addons Checklist */}
                <div className="space-y-2 pt-1">
                  <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold block">
                    Workspace Inclusions & Tech Needs
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'High-Speed 10 Gbps Ethernet Drop',
                      'Unlimited Artisan Barista Espresso',
                      '4K AI Video Conference Bar',
                      'Private Acoustic Phone Booth Access',
                    ].map((addon) => {
                      const isSelected = sessionData.addons.includes(addon);
                      return (
                        <button
                          key={addon}
                          type="button"
                          onClick={() => toggleSessionAddon(addon)}
                          className={`px-3 py-2 rounded-xl text-left text-[11px] font-mono-custom border transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[#EDF5EE] border-[#2E6F40] text-[#122E1C] font-bold'
                              : 'bg-[#F8FAF8] border-[#DCE8DE] text-[#558061]'
                          }`}
                        >
                          <span className="truncate pr-1">{addon}</span>
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? 'bg-[#2E6F40] border-[#2E6F40] text-white'
                                : 'border-[#C8DDCB] bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold">
                    Additional Notes
                  </label>
                  <input
                    type="text"
                    maxLength={500}
                    placeholder="e.g. Prefer quiet south window pod, bringing 2 external monitors..."
                    value={sessionData.notes}
                    onChange={(e) => setSessionData({ ...sessionData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] focus:border-[#2E6F40] focus:bg-white focus:outline-none text-xs transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSessionSubmitting}
                  className={`w-full py-3.5 rounded-xl font-cinzel font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#122E1C]/20 ${
                    isSessionSubmitting
                      ? 'bg-[#1D4A2E] text-[#C4E894] cursor-wait opacity-85'
                      : 'bg-[#122E1C] hover:bg-[#1D4A2E] text-white cursor-pointer active:scale-[0.99]'
                  }`}
                >
                  {isSessionSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-[#C4E894] animate-spin" />
                      <span>Transmitting Work Session Pass...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 text-[#C4E894]" />
                      <span>Confirm Session via WhatsApp ({WHATSAPP_DISPLAY})</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Trust Guarantee & Direct Contact Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#DCE8DE] flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm text-xs font-mono-custom text-[#3D6448]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#EDF6EF] text-[#2E6F40] border border-[#C6E2CA]">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#0F2A1A] block">Direct Concierge Hotline</span>
              <span>Need immediate assistance or same-day boardroom booking?</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <a
              href="https://www.instagram.com/alcove.pk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF0F3] hover:bg-[#FCE6EC] border border-[#E1306C]/30 text-[#0F2A1A] font-bold transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>Instagram: <strong>@alcove.pk</strong></span>
            </a>
            <a
              href="mailto:karachi@alcove-spaces.com"
              className="px-4 py-2 rounded-xl bg-[#F4F8F4] hover:bg-[#EDF5EE] border border-[#DCE8DE] text-[#0F2A1A] font-bold transition-colors"
            >
              karachi@alcove-spaces.com
            </a>
            <span className="text-[#2E6F40] font-bold">
              Mon–Sat: 8:00 AM – 9:00 PM PKT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
