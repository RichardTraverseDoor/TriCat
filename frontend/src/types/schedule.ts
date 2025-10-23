export type ScheduleDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export const scheduleDayLabels: Record<ScheduleDay, string> = {
  monday: 'Montag',
  tuesday: 'Dienstag',
  wednesday: 'Mittwoch',
  thursday: 'Donnerstag',
  friday: 'Freitag',
};

export const scheduleDayEmojis: Record<ScheduleDay, string> = {
  monday: '🌞',
  tuesday: '📚',
  wednesday: '🧶',
  thursday: '☕️',
  friday: '🎉',
};

export const scheduleDayOrder: ScheduleDay[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export type ScheduleEntryType = 'lecture' | 'exercise' | 'lab';

interface ScheduleEntryTypeMeta {
  label: string;
  description: string;
  icon: string;
  badgeClass: string;
  cardClass: string;
}

export const scheduleEntryTypeMeta: Record<ScheduleEntryType, ScheduleEntryTypeMeta> = {
  lecture: {
    label: 'Vorlesung',
    description: 'Theorie zum Schnurrverstehen',
    icon: '🎓',
    badgeClass: 'bg-emerald-400/15 text-emerald-200 border-emerald-300/40',
    cardClass: 'border-emerald-300/30 bg-emerald-400/10',
  },
  exercise: {
    label: 'Übung',
    description: 'Gemeinsam durch miauzige Aufgaben',
    icon: '🧩',
    badgeClass: 'bg-teal-400/15 text-teal-100 border-teal-300/40',
    cardClass: 'border-teal-300/30 bg-teal-400/10',
  },
  lab: {
    label: 'Praktikum/Labor',
    description: 'Pfoten-on Experimente im Labor',
    icon: '🔬',
    badgeClass: 'bg-sky-400/15 text-sky-100 border-sky-300/40',
    cardClass: 'border-sky-300/30 bg-sky-400/10',
  },
};

export interface ScheduleEntry {
  id: number;
  title: string;
  type: ScheduleEntryType;
  day: ScheduleDay;
  startTime: string;
  endTime: string;
  room: string;
}

export interface CreateScheduleEntryPayload {
  title: string;
  type: ScheduleEntryType;
  day: ScheduleDay;
  startTime: string;
  endTime: string;
  room: string;
}

export type ScheduleTimeSlot = string;
