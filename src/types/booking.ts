export type MeetingFormat = "virtual" | "in-person";

export interface TimeSlot {
  label: string;
  value: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  propertyInterest: string;
  date: string;
  timeSlot: string;
  meetingFormat: MeetingFormat;
  notes?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  meetingFormat: MeetingFormat;
  advisor: string;
}
