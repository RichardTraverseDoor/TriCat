import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type {
  CalendarDay,
  CalendarWeekday,
  PlaceholderCard,
  StoredEvent,
  UpcomingEventCard
} from '@/types/calendar'

const monthNames = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember'
];

const weekdays: CalendarWeekday[] = [
  { short: 'Mo', long: 'Montag' },
  { short: 'Di', long: 'Dienstag' },
  { short: 'Mi', long: 'Mittwoch' },
  { short: 'Do', long: 'Donnerstag' },
  { short: 'Fr', long: 'Freitag' },
  { short: 'Sa', long: 'Samstag' },
  { short: 'So', long: 'Sonntag' }
];

const msPerDay = 1000 * 60 * 60 * 24;

const placeholderMessages: PlaceholderCard[] = [
  {
    title: 'Füge deine nächste Mission hinzu',
    description: 'Plane einen neuen Termin – vielleicht eine gemütliche Lernrunde mit Katzenmusik?'
  },
  {
    title: 'Zeit für eine Pause',
    description: 'Trag dir eine bewusste Schnurr-Pause ein und tank neue Energie.'
  },
  {
    title: 'Verschenke Pfotenliebe',
    description: 'Verabrede dich mit deinen Study-Buddys für eine gemeinsame Session.'
  }
];

const formatISODate = (date: Date) => {
  const local = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return local.toISOString().split('T')[0];
};

const addDays = (base: Date, days: number) => new Date(base.getFullYear(), base.getMonth(), base.getDate() + days);

export function useCalendarView() {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const initialEvents: StoredEvent[] = [
    { id: 1, title: 'Mathe-Klausur', date: formatISODate(addDays(today, 2)) },
    { id: 2, title: 'Lernsnack mit Mieze', date: formatISODate(addDays(today, 5)) },
    { id: 3, title: 'Projektabgabe', date: formatISODate(addDays(today, 9)) },
    { id: 4, title: 'Katzenkaffee mit Study-Buddys', date: formatISODate(addDays(today, 14)) }
  ];

  const events = ref<StoredEvent[]>(initialEvents);
  let nextEventId = initialEvents.length + 1;

  const currentMonth = ref(new Date(today.getFullYear(), today.getMonth(), 1));
  const selectedDate = ref<Date | null>(null);
  const newEventTitle = ref('');

  const monthLabel = computed(() => `${monthNames[currentMonth.value.getMonth()]} ${currentMonth.value.getFullYear()}`);

  const calendarDays = computed<CalendarDay[]>(() => {
    const startDate = currentMonth.value;
    const baseYear = startDate.getFullYear();
    const baseMonth = startDate.getMonth();
    const firstDayOfMonth = new Date(baseYear, baseMonth, 1);
    const startWeekday = (firstDayOfMonth.getDay() + 6) % 7; // Montag als Wochenstart
    const totalDaysInMonth = new Date(baseYear, baseMonth + 1, 0).getDate();
    const totalCells = Math.ceil((startWeekday + totalDaysInMonth) / 7) * 7;

    return Array.from({ length: totalCells }, (_, index) => {
      const dayOffset = index - startWeekday;
      const cellDate = new Date(baseYear, baseMonth, dayOffset + 1);
      const iso = formatISODate(cellDate);
      const isCurrentMonth = cellDate.getMonth() === baseMonth;
      const isToday = isCurrentMonth && cellDate.getTime() === startOfToday.getTime();

      return {
        date: cellDate,
        iso,
        key: `${iso}-${index}`,
        label: isCurrentMonth ? cellDate.getDate() : '',
        isCurrentMonth,
        isToday
      };
    });
  });

  const eventsByDate = computed(() => {
    const map = new Map<string, StoredEvent[]>();
    for (const event of events.value) {
      if (!map.has(event.date)) {
        map.set(event.date, []);
      }
      map.get(event.date)!.push(event);
    }
    return map;
  });

  const upcomingEvents = computed<UpcomingEventCard[]>(() => {
    return events.value
      .map((event) => {
        const eventDate = new Date(`${event.date}T00:00:00`);
        const diff = Math.round((eventDate.getTime() - startOfToday.getTime()) / msPerDay);
        return {
          ...event,
          eventDate,
          diff,
          daysLabel:
            diff === 0 ? 'Heute' : diff === 1 ? 'In 1 Tag' : diff > 1 ? `In ${diff} Tagen` : 'Schon vorbei',
          dateLabel: eventDate.toLocaleDateString('de-DE', {
            weekday: 'short',
            day: '2-digit',
            month: 'long'
          }),
          catCode: `${eventDate.getDate().toString().padStart(2, '0')}${eventDate.getMonth() + 1}`
        };
      })
      .filter((event) => event.diff >= 0)
      .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime())
      .slice(0, 3);
  });

  const placeholderCards = computed<PlaceholderCard[]>(() =>
    placeholderMessages.slice(0, Math.max(0, 3 - upcomingEvents.value.length))
  );

  const selectedDateIso = computed(() => (selectedDate.value ? formatISODate(selectedDate.value) : ''));

  const selectedDateLabel = computed(() => {
    if (!selectedDate.value) return '';
    return selectedDate.value.toLocaleDateString('de-DE', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  });

  const isAddingEvent = computed(() => selectedDate.value !== null);

  const eventsForSelectedDate = computed(() => {
    if (!selectedDateIso.value) return [] as StoredEvent[];
    return eventsByDate.value.get(selectedDateIso.value) ?? [];
  });

  const originalBodyOverflow = ref<string | null>(null);

  const restoreBodyOverflow = () => {
    if (typeof window === 'undefined') return;
    if (originalBodyOverflow.value !== null) {
      document.body.style.overflow = originalBodyOverflow.value;
      originalBodyOverflow.value = null;
    }
  };

  watch(isAddingEvent, (isOpen) => {
    if (typeof window === 'undefined') return;

    const body = document.body;
    if (!body) return;

    if (isOpen) {
      if (originalBodyOverflow.value === null) {
        originalBodyOverflow.value = body.style.overflow || '';
      }
      body.style.overflow = 'hidden';
    } else {
      restoreBodyOverflow();
    }
  });

  onBeforeUnmount(() => {
    restoreBodyOverflow();
  });

  const goToPreviousMonth = () => {
    const next = new Date(currentMonth.value);
    next.setMonth(next.getMonth() - 1);
    currentMonth.value = new Date(next.getFullYear(), next.getMonth(), 1);
  };

  const goToNextMonth = () => {
    const next = new Date(currentMonth.value);
    next.setMonth(next.getMonth() + 1);
    currentMonth.value = new Date(next.getFullYear(), next.getMonth(), 1);
  };

  const goToToday = () => {
    currentMonth.value = new Date(today.getFullYear(), today.getMonth(), 1);
  };

  const handleDayClick = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return;
    selectedDate.value = day.date;
    newEventTitle.value = '';
    nextTick(() => {
      const input = document.querySelector<HTMLInputElement>('input[type="text"][required]');
      input?.focus();
    });
  };

  const closeForm = () => {
    selectedDate.value = null;
    newEventTitle.value = '';
  };

  const addEvent = () => {
    if (!selectedDate.value) return;
    const trimmed = newEventTitle.value.trim();
    if (!trimmed) return;

    const newEvent: StoredEvent = {
      id: nextEventId++,
      title: trimmed,
      date: formatISODate(selectedDate.value)
    };

    events.value = [...events.value, newEvent];
    closeForm();
  };

  const deleteEvent = (eventId: number) => {
    events.value = events.value.filter((event) => event.id !== eventId);
  };

  return {
    monthLabel,
    calendarDays,
    eventsByDate,
    selectedDateIso,
    weekdays,
    upcomingEvents,
    placeholderCards,
    isAddingEvent,
    selectedDateLabel,
    eventsForSelectedDate,
    newEventTitle,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    handleDayClick,
    closeForm,
    addEvent,
    deleteEvent
  };
}
