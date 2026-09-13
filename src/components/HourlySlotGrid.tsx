import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Check, Ban, AlertCircle, RefreshCw, Moon, Sun, Sunset, CalendarDays } from 'lucide-react';

export const HOURLY_TIME_SLOTS = [
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

export type HourlySlot = (typeof HOURLY_TIME_SLOTS)[number];

interface HourlySlotGridProps {
  selectedDate: string; // YYYY-MM-DD
  onDateChange: (newDate: string) => void;
  selectedSlot: string;
  onSelectSlot: (slot: string) => void;
  disabled?: boolean;
}

interface SlotAvailabilityResponse {
  date: string;
  totalSlots: number;
  bookedCount: number;
  availableCount: number;
  bookedSlots: string[];
  slots: Array<{
    slot: string;
    isBooked: boolean;
    status: 'BOOKED' | 'AVAILABLE';
    displayLabel: string;
    period: 'day' | 'evening' | 'overnight';
  }>;
}

// Convert 24h slot string to human readable format (e.g. "18:00" -> "6:00 PM")
export function formatSlotLabel(slot: string): string {
  const [hourStr, minStr] = slot.split(':');
  const hour = parseInt(hourStr, 10);
  if (hour === 0) return '12:00 AM (Overnight)';
  if (hour < 12) return `${hour}:${minStr} AM`;
  if (hour === 12) return '12:00 PM (Noon)';
  return `${hour - 12}:${minStr} PM`;
}

// Generate next 7 days starting with Monday (or today)
export function getUpcomingDays(): Array<{ date: string; dayName: string; shortDate: string }> {
  const days: Array<{ date: string; dayName: string; shortDate: string }> = [];
  const now = new Date();
  
  // Find Monday of current week or upcoming days
  const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
    const shortDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    days.push({ date: dateStr, dayName, shortDate });
  }

  return days;
}

export const HourlySlotGrid: React.FC<HourlySlotGridProps> = ({
  selectedDate,
  onDateChange,
  selectedSlot,
  onSelectSlot,
  disabled = false,
}) => {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const upcomingDays = getUpcomingDays();

  // Fetch real-time availability from backend database
  const fetchAvailability = useCallback(async (date: string) => {
    if (!date) return;
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(`/api/availability?date=${encodeURIComponent(date)}`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error(`Failed to load availability: ${res.statusText}`);
      }
      const data: SlotAvailabilityResponse = await res.json();
      setBookedSlots(data.bookedSlots || []);
      setLastRefreshed(new Date());

      // If current selected slot is now booked, unselect it
      if (selectedSlot && (data.bookedSlots || []).includes(selectedSlot)) {
        onSelectSlot('');
      }
    } catch (err: any) {
      console.error('Error fetching slot availability:', err);
      setFetchError('Unable to connect to live reservation database.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedSlot, onSelectSlot]);

  // Initial fetch and on date change
  useEffect(() => {
    fetchAvailability(selectedDate);
  }, [selectedDate, fetchAvailability]);

  // Background polling every 12 seconds to keep multi-user view synchronized
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAvailability(selectedDate);
    }, 12000);
    return () => clearInterval(interval);
  }, [selectedDate, fetchAvailability]);

  // Format the current selected date display
  const selectedDateObj = selectedDate ? new Date(`${selectedDate}T00:00:00`) : null;
  const dayName = selectedDateObj
    ? selectedDateObj.toLocaleDateString('en-US', { weekday: 'long' })
    : 'Selected Day';
  const fullDateStr = selectedDateObj
    ? selectedDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  const totalSlots = HOURLY_TIME_SLOTS.length; // 20
  const availableCount = totalSlots - bookedSlots.length;

  // Split slots into 3 visual groups for clean scanning:
  const daytimeSlots = HOURLY_TIME_SLOTS.filter((s) => {
    const h = parseInt(s.split(':')[0], 10);
    return h >= 9 && h <= 17;
  }); // 09:00 - 17:00 (9 slots)

  const eveningSlots = HOURLY_TIME_SLOTS.filter((s) => {
    const h = parseInt(s.split(':')[0], 10);
    return h >= 18 && h <= 23;
  }); // 18:00 - 23:00 (6 slots)

  const overnightSlots = HOURLY_TIME_SLOTS.filter((s) => {
    const h = parseInt(s.split(':')[0], 10);
    return h >= 0 && h <= 4;
  }); // 00:00 - 04:00 (5 slots)

  const renderSlotButton = (slot: HourlySlot) => {
    const isBooked = bookedSlots.includes(slot);
    const isSelected = selectedSlot === slot;

    if (isBooked) {
      return (
        <button
          key={slot}
          type="button"
          disabled
          aria-disabled="true"
          title={`${dayName} ${slot} is already booked`}
          className="w-full py-2.5 px-2 rounded-xl bg-[#FDF2F2] border border-[#F87171]/40 text-[#991B1B] text-xs font-mono-custom flex flex-col items-center justify-center gap-0.5 cursor-not-allowed opacity-80 select-none shadow-2xs relative overflow-hidden"
        >
          <div className="flex items-center gap-1 font-bold text-[11px] sm:text-xs tracking-wider text-[#B91C1C]">
            <Ban className="w-3 h-3 text-[#DC2626] shrink-0" />
            <span>{slot} — BOOKED</span>
          </div>
          <span className="text-[10px] text-[#DC2626]/70 uppercase tracking-widest font-semibold">
            Unavailable
          </span>
        </button>
      );
    }

    return (
      <button
        key={slot}
        type="button"
        disabled={disabled}
        onClick={() => onSelectSlot(slot)}
        className={`w-full py-2.5 px-2 rounded-xl text-xs font-mono-custom flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer border ${
          isSelected
            ? 'bg-[#122E1C] text-white border-[#122E1C] shadow-md scale-[1.02] ring-2 ring-[#C4E894]'
            : 'bg-[#F8FAF8] hover:bg-[#EDF5EE] border-[#D1E2D4] hover:border-[#2E6F40] text-[#0F2A1A]'
        }`}
      >
        <div className="flex items-center gap-1 font-bold text-xs sm:text-sm">
          {isSelected && <Check className="w-3.5 h-3.5 text-[#C4E894] stroke-[3]" />}
          <span>{slot}</span>
        </div>
        <span
          className={`text-[10px] tracking-tight ${
            isSelected ? 'text-[#C4E894] font-bold' : 'text-[#4A7255]'
          }`}
        >
          {formatSlotLabel(slot)}
        </span>
      </button>
    );
  };

  return (
    <div className="space-y-4 pt-1">
      {/* Date Switcher Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-mono-custom text-[#456C51] uppercase font-bold flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-[#2E6F40]" />
            <span>1. Select Booking Day (Mon – Sun)</span>
          </label>
          <button
            type="button"
            onClick={() => fetchAvailability(selectedDate)}
            disabled={isLoading}
            className="text-[11px] font-mono-custom text-[#2E6F40] hover:text-[#122E1C] flex items-center gap-1 cursor-pointer transition-colors"
            title="Refresh live availability from database"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>

        {/* Quick Weekday Chips */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
          {upcomingDays.map((item) => {
            const isDaySelected = selectedDate === item.date;
            return (
              <button
                key={item.date}
                type="button"
                onClick={() => onDateChange(item.date)}
                className={`py-2 px-1 rounded-xl text-center font-mono-custom transition-all cursor-pointer border ${
                  isDaySelected
                    ? 'bg-[#122E1C] text-white border-[#122E1C] shadow-sm ring-1 ring-[#C4E894]'
                    : 'bg-[#F8FAF8] hover:bg-[#EDF5EE] border-[#D9E6DC] text-[#34583E]'
                }`}
              >
                <div className="text-[11px] font-bold">{item.dayName.slice(0, 3)}</div>
                <div className={`text-[9px] ${isDaySelected ? 'text-[#C4E894]' : 'text-[#5B8065]'}`}>
                  {item.shortDate}
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Calendar Date Input */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="date"
            required
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-[#0F2A1A] text-xs font-mono-custom focus:border-[#2E6F40] focus:bg-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Hourly Slots Availability Panel */}
      <div className="space-y-3 pt-2">
        {/* Availability Header Strip */}
        <div className="p-3 rounded-2xl bg-[#EDF5EE] border border-[#CFE4D2] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <h4 className="font-cinzel font-bold text-xs uppercase tracking-wider text-[#0F2A1A]">
                {dayName} Hourly Schedule ({fullDateStr || selectedDate})
              </h4>
            </div>
            <p className="text-[11px] text-[#426C4E] font-mono-custom mt-0.5">
              20 Continuous Slots: 09:00 AM through 04:00 AM Next Morning
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 font-mono-custom text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#CFE4D2] text-[#122E1C] font-bold">
              {availableCount} of {totalSlots} Available
            </span>
            {bookedSlots.length > 0 && (
              <span className="px-2 py-1 rounded-lg bg-[#FEE2E2] text-[#991B1B] font-bold text-[10px]">
                {bookedSlots.length} Booked
              </span>
            )}
          </div>
        </div>

        {fetchError && (
          <div className="p-2.5 rounded-xl bg-[#FEE2E2] text-[#991B1B] text-xs font-mono-custom flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{fetchError}</span>
          </div>
        )}

        {/* The 20 Slots Grid */}
        <div className="space-y-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-[#DCE8DE]">
          {/* Section 1: Daytime Hours (09:00 - 17:00) */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono-custom uppercase tracking-wider text-[#5B8065] font-bold">
              <Sun className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>Daytime Slots (09:00 – 17:00)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {daytimeSlots.map(renderSlotButton)}
            </div>
          </div>

          {/* Section 2: Evening Hours (18:00 - 23:00) */}
          <div className="space-y-1.5 pt-2 border-t border-[#EEF5EF]">
            <div className="flex items-center gap-1.5 text-[10px] font-mono-custom uppercase tracking-wider text-[#5B8065] font-bold">
              <Sunset className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Evening Slots (18:00 – 23:00)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {eveningSlots.map(renderSlotButton)}
            </div>
          </div>

          {/* Section 3: Overnight / Late Night (00:00 - 04:00) */}
          <div className="space-y-1.5 pt-2 border-t border-[#EEF5EF]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-mono-custom uppercase tracking-wider text-[#34583E] font-bold">
                <Moon className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Overnight Booking Period (00:00 – 04:00 Next Morning)</span>
              </div>
              <span className="text-[9px] font-mono-custom text-[#5B8065]">
                Continuously following 23:00
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {overnightSlots.map(renderSlotButton)}
            </div>
          </div>
        </div>

        {/* Selected Slot Confirmation Pill */}
        <div className="flex items-center justify-between text-xs font-mono-custom px-3 py-2 rounded-xl bg-[#F6FAF6] border border-[#DCE8DE]">
          <span className="text-[#456C51]">Selected Time Slot:</span>
          {selectedSlot ? (
            <span className="font-bold text-[#122E1C] flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#CDE3D1] shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-[#2E6F40]" />
              <span>
                {dayName} • {selectedSlot} ({formatSlotLabel(selectedSlot)})
              </span>
            </span>
          ) : (
            <span className="text-[#DC2626] font-semibold text-[11px]">
              Please choose an available hourly slot above
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
