<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pt-24"
  >
    <span
      class="pointer-events-none absolute left-[10vw] top-14 text-5xl text-emerald-200/70 opacity-30 drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)] sm:text-6xl lg:text-7xl animate-float"
      aria-hidden="true"
    >🐾</span>
    <span
      class="pointer-events-none absolute right-[12vw] top-24 text-5xl text-emerald-200/60 opacity-25 drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)] sm:text-6xl lg:text-7xl animate-float"
      style="animation-delay: -4s"
      aria-hidden="true"
    >🐱</span>
    <span
      class="pointer-events-none absolute bottom-16 left-[18vw] text-5xl text-emerald-200/60 opacity-25 drop-shadow-[0_6px_12px_rgba(74,222,128,0.4)] sm:text-6xl lg:text-7xl animate-float"
      style="animation-delay: -8s"
      aria-hidden="true"
    >🧶</span>

    <main class="relative z-10 flex w-full max-w-5xl flex-col gap-12 text-emerald-50">
      <header class="grid place-items-center gap-4 text-center">
        <span
          class="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-4 py-1.5 text-sm font-semibold text-emerald-100 shadow-[0_12px_28px_rgba(16,185,129,0.18)]"
        >
          📅 Dein schnurrender Terminhelfer
        </span>
        <h1 class="font-heading text-4xl drop-shadow-[0_1px_0_rgba(148,163,184,0.6)] sm:text-5xl lg:text-6xl">
          Kalender voller Katzenmagie
        </h1>
        <p class="max-w-2xl text-base text-emerald-100/85 sm:text-lg">
          Hier hat jeder Termin seine eigene Pfote. Behalte die nächsten Highlights im Blick und plane mit einem Klick neue Abenteuer.
        </p>
      </header>

      <section class="grid gap-10">
        <div
          class="rounded-3xl border border-slate-400/20 bg-slate-900/70 p-6 shadow-[0_25px_45px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8"
        >
          <header class="mb-6 flex flex-col gap-2 sm:mb-8">
            <h2 class="font-heading text-3xl text-emerald-200 sm:text-4xl">Bevorstehende Schnurr-Termine</h2>
            <p class="text-sm text-emerald-100/70 sm:text-base">
              Die drei nächsten Termine warten bereits auf dich – inklusive Countdown, wie viele Tage noch bis zum großen Miauen verbleiben.
            </p>
          </header>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="event in upcomingEvents"
              :key="event.id"
              class="group relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_25px_45px_rgba(16,185,129,0.25)]"
            >
              <span class="absolute right-4 top-4 text-3xl opacity-60 transition duration-300 group-hover:opacity-90">🐈</span>
              <div class="space-y-2">
                <h3 class="font-heading text-xl text-emerald-100">{{ event.title }}</h3>
                <p class="text-sm text-emerald-100/80">
                  {{ event.dateLabel }} · <strong class="font-semibold">{{ event.daysLabel }}</strong>
                </p>
                <p class="text-xs uppercase tracking-wider text-emerald-100/60">#{{ event.catCode }}</p>
              </div>
            </article>
            <article
              v-for="(placeholder, index) in placeholderCards"
              :key="`placeholder-${index}`"
              class="relative flex flex-col justify-center gap-2 overflow-hidden rounded-3xl border border-dashed border-emerald-400/30 bg-slate-900/60 p-5 text-emerald-100/70"
            >
              <span class="text-3xl">✨</span>
              <h3 class="font-heading text-xl text-emerald-100">{{ placeholder.title }}</h3>
              <p class="text-sm">{{ placeholder.description }}</p>
            </article>
          </div>
        </div>

        <div
          class="rounded-3xl border border-slate-400/20 bg-slate-900/70 p-6 shadow-[0_25px_45px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8"
        >
          <CalendarHeader 
            :monthLabel="monthLabel"
            @prev="gotToPreviousMonth"
            @today="goToToday"
            @next="goToNextMonth"
          />
          <CalendarGrid
            :days="calendarDays"
            :eventsByDate="eventsByDate"
            :selectedDateIso="selectedDateIso"
            :weekdays="weekdays"
            @select="handleDayClick"
          />

          <footer class="mt-6 flex flex-wrap items-center gap-2 text-xs text-emerald-100/70 sm:text-sm">
            <span class="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1">🐾</span>
            <p>Markiert Tage mit gebuchten Terminen. Sammle so viele Pfotenabdrücke wie möglich!</p>
          </footer>
        </div>
      </section>
    </main>

    <CalendarModal
      :isAddingEvent="isAddingEvent"
      :selectedDateLabel="selectedDateLabel"
      :eventsForSelectedDate="eventsForSelectedDate"
      v-model:newEventTitle="newEventTitle"
      @close="closeForm"
      @add="addEvent"
      @delete="deleteEvent"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import CalendarHeader from '@/components/calendar/CalendarHeader.vue'
import CalendarGrid from '@/components/calendar/CalendarGrid.vue'
import CalendarModal from '@/components/calendar/CalendarModal.vue'

interface StoredEvent {
  id: number;
  title: string;
  date: string; // ISO-8601 Datum (YYYY-MM-DD)
}

interface CalendarDay {
  date: Date;
  iso: string;
  key: string;
  label: string | number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

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

const weekdays = [
  { short: 'Mo', long: 'Montag' },
  { short: 'Di', long: 'Dienstag' },
  { short: 'Mi', long: 'Mittwoch' },
  { short: 'Do', long: 'Donnerstag' },
  { short: 'Fr', long: 'Freitag' },
  { short: 'Sa', long: 'Samstag' },
  { short: 'So', long: 'Sonntag' }
];

const msPerDay = 1000 * 60 * 60 * 24;
const today = new Date();
const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

const formatISODate = (date: Date) => {
  const local = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return local.toISOString().split('T')[0];
};

const addDays = (base: Date, days: number) => new Date(base.getFullYear(), base.getMonth(), base.getDate() + days);

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

const upcomingEvents = computed(() => {
  return events.value
    .map((event) => {
      const eventDate = new Date(event.date + 'T00:00:00');
      const diff = Math.round((eventDate.getTime() - startOfToday.getTime()) / msPerDay);
      return {
        ...event,
        eventDate,
        diff,
        daysLabel:
          diff === 0
            ? 'Heute'
            : diff === 1
            ? 'In 1 Tag'
            : diff > 1
            ? `In ${diff} Tagen`
            : 'Schon vorbei',
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

const placeholderMessages = [
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

const placeholderCards = computed(() => placeholderMessages.slice(0, Math.max(0, 3 - upcomingEvents.value.length)));

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
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
