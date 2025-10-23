import { computed, onMounted, ref } from 'vue';
import { createScheduleEntry, deleteScheduleEntry, fetchScheduleEntries } from '@/services/scheduleApi';
import {
  scheduleDayEmojis,
  scheduleDayLabels,
  scheduleDayOrder,
  type CreateScheduleEntryPayload,
  type ScheduleDay,
  type ScheduleEntry,
  type ScheduleTimeSlot,
} from '@/types/schedule';

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map((value) => Number.parseInt(value, 10));
  return hours * 60 + minutes;
};

const fromMinutes = (value: number) => {
  const hours = Math.floor(value / 60)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor(value % 60)
    .toString()
    .padStart(2, '0');
  return `${hours}:${minutes}`;
};

const generateTimeSlots = (start: string, end: string, stepMinutes: number): ScheduleTimeSlot[] => {
  const slots: ScheduleTimeSlot[] = [];
  const startMinutes = toMinutes(start);
  const endMinutes = toMinutes(end);

  for (let current = startMinutes; current <= endMinutes; current += stepMinutes) {
    slots.push(fromMinutes(current));
  }

  return slots;
};

const initialTimeSlots: ScheduleTimeSlot[] = generateTimeSlots('08:00', '20:00', 15);

const entriesState = ref<ScheduleEntry[]>([]);

const loadEntries = async () => {
  try {
    const entries = await fetchScheduleEntries();
    entriesState.value = entries;
  } catch (error) {
    console.error('Fehler beim Laden der Stundenplaneinträge', error);
  }
};

onMounted(() => {
  void loadEntries();
});

const entries = computed(() =>
  entriesState.value
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

const addEntry = async (payload: CreateScheduleEntryPayload) => {
  try {
    const entry = await createScheduleEntry(payload);
    entriesState.value = [...entriesState.value, entry];
  } catch (error) {
    console.error('Fehler beim Anlegen eines Stundenplaneintrags', error);
  }
};

const removeEntry = async (id: number) => {
  try {
    await deleteScheduleEntry(id);
    entriesState.value = entriesState.value.filter((entry) => entry.id !== id);
  } catch (error) {
    console.error('Fehler beim Löschen eines Stundenplaneintrags', error);
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