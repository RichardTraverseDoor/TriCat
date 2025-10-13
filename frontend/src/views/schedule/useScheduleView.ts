import { computed, reactive } from 'vue';
import {
  scheduleDayEmojis,
  scheduleDayLabels,
  scheduleDayOrder,
  type CreateScheduleEntryPayload,
  type ScheduleDay,
  type ScheduleEntry,
  type ScheduleTimeSlot,
} from '@/types/schedule';

interface ScheduleState {
  entries: ScheduleEntry[];
}

const initialTimeSlots: ScheduleTimeSlot[] = [
  '08:00',
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
];

let entryCounter = 1;

const createEntry = (payload: CreateScheduleEntryPayload): ScheduleEntry => ({
  id: `schedule-entry-${entryCounter++}`,
  ...payload,
});

const initialEntries: ScheduleEntry[] = [
  createEntry({
    title: 'Mathematische Schnurranalyse',
    type: 'lecture',
    day: 'monday',
    startTime: '09:00',
    endTime: '11:00',
    room: 'A2 Schnurrsaal',
  }),
  createEntry({
    title: 'Programmier-Übung: Flauschige Funktionen',
    type: 'exercise',
    day: 'wednesday',
    startTime: '10:00',
    endTime: '12:00',
    room: 'Lab 3 – Katzenkralle',
  }),
  createEntry({
    title: 'Labor: Sensorik für Katzenklappen',
    type: 'lab',
    day: 'friday',
    startTime: '14:00',
    endTime: '16:00',
    room: 'Labor Miauz 1',
  }),
];

const state = reactive<ScheduleState>({
  entries: initialEntries,
});

const entries = computed(() =>
  state.entries
    .slice()
    .sort((a, b) => {
      const dayComparison = scheduleDayOrder.indexOf(a.day) - scheduleDayOrder.indexOf(b.day);
      if (dayComparison !== 0) {
        return dayComparison;
      }
      return a.startTime.localeCompare(b.startTime, 'de');
    }),
);

const entriesByDay = computed(() => {
  const map = new Map<ScheduleDay, ScheduleEntry[]>();
  scheduleDayOrder.forEach((day) => {
    map.set(day, []);
  });

  entries.value.forEach((entry) => {
    if (!map.has(entry.day)) {
      map.set(entry.day, []);
    }
    map.get(entry.day)!.push(entry);
  });

  return map;
});

const busiestDay = computed(() => {
  let currentDay: ScheduleDay = 'monday';
  let maxEntries = -1;

  entriesByDay.value.forEach((value, key) => {
    if (value.length > maxEntries) {
      currentDay = key;
      maxEntries = value.length;
    }
  });

  return currentDay;
});

const addEntry = (payload: CreateScheduleEntryPayload) => {
  state.entries.push(createEntry(payload));
};

const removeEntry = (id: string) => {
  const index = state.entries.findIndex((entry) => entry.id === id);
  if (index !== -1) {
    state.entries.splice(index, 1);
  }
};

export const useScheduleView = () => {
  return {
    dayOrder: scheduleDayOrder,
    dayLabels: scheduleDayLabels,
    dayEmojis: scheduleDayEmojis,
    timeSlots: initialTimeSlots,
    entries,
    busiestDayLabel: computed(() => scheduleDayLabels[busiestDay.value]),
    busiestDayEmoji: computed(() => scheduleDayEmojis[busiestDay.value]),
    entryCount: computed(() => entries.value.length),
    addEntry,
    removeEntry,
  };
};
