"use client";

import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Check,
  Clock,
  MapPin,
  Video,
} from "lucide-react";
import type {
  BookingFormData,
  CalendarEvent,
  MeetingFormat,
  TimeSlot,
} from "@/types/booking";

const timeSlots: TimeSlot[] = [
  { label: "09:00 AM", value: "09:00" },
  { label: "10:30 AM", value: "10:30" },
  { label: "01:00 PM", value: "13:00" },
  { label: "02:30 PM", value: "14:30" },
  { label: "04:00 PM", value: "16:00" },
  { label: "05:30 PM", value: "17:30" },
];

const presetEvents: CalendarEvent[] = [
  {
    id: "evt-1",
    title: "Skyline Penthouse Tour",
    date: format(addDays(new Date(), 2), "yyyy-MM-dd"),
    time: "10:30",
    meetingFormat: "in-person",
    advisor: "Jordan Lee",
  },
  {
    id: "evt-2",
    title: "Investment Portfolio Review",
    date: format(addDays(new Date(), 5), "yyyy-MM-dd"),
    time: "13:00",
    meetingFormat: "virtual",
    advisor: "Priya Desai",
  },
  {
    id: "evt-3",
    title: "Seaside Villa Inspection",
    date: format(addDays(new Date(), 9), "yyyy-MM-dd"),
    time: "09:00",
    meetingFormat: "in-person",
    advisor: "Alex Carter",
  },
];

const initialFormState: BookingFormData = {
  fullName: "",
  email: "",
  propertyInterest: "",
  date: format(new Date(), "yyyy-MM-dd"),
  timeSlot: "10:30",
  meetingFormat: "virtual",
  notes: "",
};

const meetingFormatCopy: Record<MeetingFormat, { label: string; icon: JSX.Element }> = {
  virtual: {
    label: "Virtual Consultation",
    icon: <Video className="h-4 w-4" />,
  },
  "in-person": {
    label: "On-site Meeting",
    icon: <MapPin className="h-4 w-4" />,
  },
};

export default function DashboardPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState<BookingFormData>(initialFormState);
  const [events, setEvents] = useState<CalendarEvent[]>(presetEvents);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const calendarMatrix = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    const weeks: Date[][] = [];
    let cursor = start;
    let currentWeek: Date[] = [];

    while (cursor <= end) {
      currentWeek.push(cursor);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      cursor = addDays(cursor, 1);
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  }, [currentMonth]);

  const upcomingEvents = useMemo(
    () =>
      [...events]
        .sort((a, b) =>
          parseISO(a.date) < parseISO(b.date)
            ? -1
            : parseISO(a.date) > parseISO(b.date)
              ? 1
              : a.time.localeCompare(b.time),
        )
        .slice(0, 6),
    [events],
  );

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => addMonths(prev, direction === "next" ? 1 : -1));
  };

  const handleDaySelect = (day: Date) => {
    setSelectedDate(day);
    setFormData((prev) => ({
      ...prev,
      date: format(day, "yyyy-MM-dd"),
    }));
  };

  const handleInputChange = (
    field: keyof BookingFormData,
    value: string | MeetingFormat,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBookingSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: formData.propertyInterest
        ? `Consultation: ${formData.propertyInterest}`
        : "Property Consultation",
      date: formData.date,
      time: formData.timeSlot,
      meetingFormat: formData.meetingFormat,
      advisor: "BluePeak Advisor",
    };

    setEvents((prev) => [...prev, newEvent]);
    setSuccessMessage(
      `Meeting booked for ${format(parseISO(formData.date), "MMMM d")} at ${formData.timeSlot}.`,
    );
    setFormData({
      ...initialFormState,
      date: formData.date,
      meetingFormat: formData.meetingFormat,
    });
  };

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeout = window.setTimeout(() => setSuccessMessage(null), 4500);

    return () => window.clearTimeout(timeout);
  }, [successMessage]);

  return (
    <div className="min-h-screen bg-slate-950/95 pb-16">
      <header className="border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/30 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-white md:text-3xl">
                Scheduling Dashboard
              </h1>
              <p className="text-sm text-slate-300">
                Coordinate consultations, walkthroughs, and strategy sessions with ease.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-brand-500/40 bg-brand-500/10 px-4 py-3 text-sm text-brand-100">
              Next availability:{" "}
              <span className="font-semibold">
                {format(addDays(new Date(), 1), "EEEE, MMM d")}
              </span>
            </div>
            <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 md:block">
              Advisors online ·{" "}
              <span className="font-semibold text-white">3</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-10 grid max-w-6xl gap-8 px-6 lg:grid-cols-[360px_1fr]">
        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Book a Meeting</h2>
            <div className="flex items-center gap-2 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
              <CalendarIcon className="h-4 w-4 text-brand-300" />
              BluePeak Link
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleBookingSubmit}>
            <div className="grid gap-4">
              <label className="space-y-1.5 text-sm text-slate-200">
                Full name
                <input
                  required
                  value={formData.fullName}
                  onChange={(event) =>
                    handleInputChange("fullName", event.target.value)
                  }
                  placeholder="Claudia Rivera"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400/60 focus:ring-2 focus:ring-brand-500/30"
                />
              </label>
              <label className="space-y-1.5 text-sm text-slate-200">
                Email address
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    handleInputChange("email", event.target.value)
                  }
                  placeholder="claudia.rivera@email.com"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400/60 focus:ring-2 focus:ring-brand-500/30"
                />
              </label>
              <label className="space-y-1.5 text-sm text-slate-200">
                Property or goal
                <input
                  value={formData.propertyInterest}
                  onChange={(event) =>
                    handleInputChange("propertyInterest", event.target.value)
                  }
                  placeholder="e.g. Skyline Penthouse or portfolio strategy"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400/60 focus:ring-2 focus:ring-brand-500/30"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1.5 text-sm text-slate-200">
                Select date
                <input
                  required
                  type="date"
                  min={format(new Date(), "yyyy-MM-dd")}
                  value={formData.date}
                  onChange={(event) => {
                    const chosen = parseISO(event.target.value);
                    setSelectedDate(chosen);
                    handleInputChange("date", event.target.value);
                    setCurrentMonth(chosen);
                  }}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400/60 focus:ring-2 focus:ring-brand-500/30"
                />
              </label>
              <div className="space-y-1.5 text-sm text-slate-200">
                Preferred format
                <div className="grid grid-cols-2 gap-2">
                  {(["virtual", "in-person"] as MeetingFormat[]).map(
                    (formatKey) => {
                      const isActive = formData.meetingFormat === formatKey;
                      return (
                        <button
                          type="button"
                          key={formatKey}
                          onClick={() => handleInputChange("meetingFormat", formatKey)}
                          className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                            isActive
                              ? "border-brand-400/60 bg-brand-500/20 text-white shadow-glow"
                              : "border-white/10 bg-black/30 text-slate-300 hover:border-white/30 hover:bg-black/40"
                          }`}
                        >
                          {meetingFormatCopy[formatKey].icon}
                          {meetingFormatCopy[formatKey].label}
                        </button>
                      );
                    },
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-sm text-slate-200">
              Preferred time
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => {
                  const isActive = formData.timeSlot === slot.value;
                  return (
                    <button
                      type="button"
                      key={slot.value}
                      onClick={() => handleInputChange("timeSlot", slot.value)}
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "border-brand-400/60 bg-brand-500/20 text-white shadow-glow"
                          : "border-white/10 bg-black/30 text-slate-200 hover:border-white/30 hover:bg-black/40"
                      }`}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="space-y-1.5 text-sm text-slate-200">
              Notes for the advisor
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(event) =>
                  handleInputChange("notes", event.target.value)
                }
                placeholder="Share priorities, financing details, or timeline expectations."
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400/60 focus:ring-2 focus:ring-brand-500/30"
              />
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-400"
            >
              Confirm Booking
              <Check className="h-4 w-4" />
            </button>
          </form>

          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-brand-400/40 bg-brand-500/10 p-4 text-sm text-brand-100"
              >
                {successMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:grid-cols-[minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)_auto]">
          <div className="space-y-6 rounded-2xl border border-white/10 bg-black/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Availability
                </p>
                <h2 className="text-xl font-semibold text-white">
                  {format(currentMonth, "MMMM yyyy")}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleMonthChange("prev")}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-slate-200 transition hover:border-white/30 hover:bg-black/40"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => handleMonthChange("next")}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-slate-200 transition hover:border-white/30 hover:bg-black/40"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {calendarMatrix.flat().map((day) => {
                const dayEvents = events.filter((event) =>
                  isSameDay(parseISO(event.date), day),
                );
                const isSelected = isSameDay(day, selectedDate);
                const isMuted = !isSameMonth(day, currentMonth);
                const isToday = isSameDay(day, new Date());

                return (
                  <button
                    type="button"
                    key={day.toISOString()}
                    onClick={() => handleDaySelect(day)}
                    className={`relative flex aspect-square flex-col items-center justify-center rounded-2xl border text-sm transition ${
                      isSelected
                        ? "border-brand-400/60 bg-brand-500/20 text-white shadow-glow"
                        : "border-white/5 bg-black/30 text-slate-200 hover:border-white/30 hover:bg-black/40"
                    } ${isMuted ? "opacity-50" : ""}`}
                  >
                    <span className="text-base font-semibold">
                      {format(day, "d")}
                    </span>
                    {isToday && !isSelected && (
                      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-400" />
                    )}
                    {dayEvents.length > 0 && (
                      <span className="mt-1 text-[10px] font-medium text-brand-200">
                        {dayEvents.length} meeting
                        {dayEvents.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Upcoming bookings
              </h3>
              <div className="rounded-full border border-brand-400/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
                {upcomingEvents.length} scheduled
              </div>
            </div>
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {upcomingEvents.map((event) => (
                  <motion.div
                    layout
                    key={event.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-left sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {event.title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                        <span className="inline-flex items-center gap-1">
                          <CalendarIcon className="h-3.5 w-3.5 text-brand-300" />
                          {format(parseISO(event.date), "MMM d, yyyy")}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-brand-300" />
                          {event.time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          {meetingFormatCopy[event.meetingFormat].icon}
                          {meetingFormatCopy[event.meetingFormat].label}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      Advisor ·{" "}
                      <span className="font-semibold text-white">
                        {event.advisor}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
