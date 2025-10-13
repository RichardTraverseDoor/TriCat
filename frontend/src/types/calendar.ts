export interface StoredEvent {
  id: number;
  title: string;
  date: string; // ISO-8601 (YYYY-MM-DD)
}

export interface CalendarDay {
  date: Date;
  iso: string;
  key: string;
  label: string | number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export interface CalendarWeekday {
  short: string;
  long: string;
}

export interface UpcomingEventCard extends StoredEvent {
  eventDate: Date;
  diff: number;
  daysLabel: string;
  dateLabel: string;
  catCode: string;
}

export interface PlaceholderCard {
  title: string;
  description: string;
}
