<template>
  <section
    class="relative overflow-hidden rounded-3xl border border-emerald-300/20 bg-slate-900/70 shadow-[0_25px_45px_rgba(15,23,42,0.55)] backdrop-blur-xl"
  >
    <header
      class="flex flex-col gap-3 border-b border-emerald-300/20 bg-emerald-400/5 px-5 py-4 text-emerald-100 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6"
    >
      <div>
        <p class="text-sm uppercase tracking-[0.2em] text-emerald-200/70">Stundenplan</p>
        <h2 class="text-xl font-semibold">Deine schnurrige Wochenübersicht</h2>
      </div>
      <span class="text-3xl">📅</span>
    </header>

    <div class="relative">
      <div class="-mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
        <div class="relative grid min-w-[720px] text-emerald-50 sm:min-w-0" :style="gridStyle">
          <div
            class="flex items-center justify-between gap-2 bg-emerald-400/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100/90 sm:px-6 sm:py-4 sm:text-sm sm:tracking-widest"
            style="grid-column: 1 / 2; grid-row: 1 / 2"
          >
            <span class="text-emerald-200/80">Zeit</span>
          </div>

          <div
            v-for="(day, dayIndex) in dayOrder"
            :key="day"
            class="flex items-center justify-center gap-2 bg-emerald-400/10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100/90 sm:px-6 sm:py-4 sm:text-sm sm:tracking-widest"
            :style="{ gridColumn: `${dayIndex + 2} / ${dayIndex + 3}`, gridRow: '1 / 2' }"
          >
            <span aria-hidden="true">{{ scheduleDayEmojis[day] }}</span>
            <span class="hidden sm:inline">{{ scheduleDayLabels[day] }}</span>
            <span class="text-xs font-semibold uppercase tracking-[0.3em] sm:hidden">{{ scheduleDayLabels[day].slice(0, 2) }}</span>
          </div>

          <div
            v-for="(interval, intervalIndex) in timeIntervals"
            :key="interval.start"
            class="flex flex-col justify-center gap-1 border-b border-emerald-300/10 px-4 py-3 text-[11px] text-emerald-200/80 sm:px-6 sm:py-4 sm:text-sm"
            :style="{ gridColumn: '1 / 2', gridRow: `${intervalIndex + 2} / ${intervalIndex + 3}` }"
          >
            <span class="font-semibold">{{ interval.label }}</span>
            <span class="text-[9px] uppercase tracking-[0.25em] text-emerald-200/60 sm:text-[10px]">Schnurr-Zeit</span>
          </div>

          <div
            v-for="(day, dayIndex) in dayOrder"
            :key="`background-${day}`"
            class="contents"
          >
            <div
              v-for="(interval, intervalIndex) in timeIntervals"
              :key="`${day}-${interval.start}`"
              class="relative flex flex-col justify-center gap-2 border-b border-emerald-300/10 px-2 py-2 sm:px-3"
              :style="{ gridColumn: `${dayIndex + 2} / ${dayIndex + 3}`, gridRow: `${intervalIndex + 2} / ${intervalIndex + 3}` }"
            >
              <div
                v-if="!intervalHasEntry(day, interval)"
                class="flex flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-emerald-300/20 bg-emerald-400/5 px-2 py-3 text-[10px] text-emerald-200/70 sm:text-xs"
              >
                <span class="text-lg">🐾</span>
                Frei zum Kuscheln
              </div>
            </div>
          </div>

          <article
            v-for="entry in sortedEntries"
            :key="entry.id"
            class="group relative z-10 flex h-full cursor-pointer flex-col gap-2 rounded-3xl border px-3 py-3 text-xs shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-300/50 sm:px-4 sm:text-sm"
            :class="typeMeta(entry.type).cardClass"
            :style="entryPlacement(entry)"
            role="button"
            tabindex="0"
            @click="emit('inspect', entry)"
            @keydown.enter.prevent="emit('inspect', entry)"
            @keydown.space.prevent="emit('inspect', entry)"
          >
            <div class="flex items-start justify-between gap-2 text-[10px] uppercase tracking-[0.18em] sm:text-xs">
              <span class="inline-flex items-center gap-1 text-emerald-50/80">
                <span aria-hidden="true">{{ typeMeta(entry.type).icon }}</span>
                {{ typeMeta(entry.type).label }}
              </span>
              <button
                type="button"
                class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-slate-900/50 text-[10px] font-semibold text-emerald-100/80 transition sm:opacity-0 sm:group-hover:opacity-100"
                @click.stop="emit('remove', entry.id)"
                aria-label="Termin entfernen"
              >
                ✕
              </button>
            </div>

            <h3
              class="line-clamp-2 text-sm font-semibold text-emerald-50 sm:text-base"
              :title="entry.title"
            >
              {{ entry.title }}
            </h3>

            <dl class="mt-auto space-y-1 text-[10px] text-emerald-100/80 sm:text-xs">
              <div class="flex items-center justify-between gap-2">
                <dt class="font-medium">Zeit</dt>
                <dd>{{ entry.startTime }} – {{ entry.endTime }}</dd>
              </div>
              <div class="flex items-center justify-between gap-2">
                <dt class="font-medium">Raum</dt>
                <dd class="truncate" :title="entry.room || '🐾 noch offen'">{{ entry.room || '🐾 noch offen' }}</dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </div>

    <footer class="flex flex-wrap items-center gap-3 border-t border-emerald-300/20 bg-emerald-400/5 px-5 py-4 text-[11px] text-emerald-100/70 sm:px-6 sm:text-xs">
      <span class="inline-flex items-center gap-1 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1">
        🐱
      </span>
      <p>Ziehe deine Termine wie eine stolze Katze nach Farben – jede Art schnurrt in einem eigenen Ton.</p>
    </footer>

    <span class="pointer-events-none absolute -left-4 -top-4 text-5xl text-emerald-200/20">🐾</span>
    <span class="pointer-events-none absolute -right-6 bottom-6 text-6xl text-emerald-200/15">🧶</span>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  scheduleDayEmojis,
  scheduleDayLabels,
  scheduleEntryTypeMeta,
  type ScheduleDay,
  type ScheduleEntry,
  type ScheduleTimeSlot,
} from '@/types/schedule';

const props = defineProps<{
  dayOrder: ScheduleDay[];
  timeSlots: ScheduleTimeSlot[];
  entries: ScheduleEntry[];
}>();

const emit = defineEmits<{
  remove: [id: number];
  inspect: [entry: ScheduleEntry];
}>();

const toMinutes = (value: string) => {
  const [hours, minutes] = value.split(':').map((part) => Number.parseInt(part, 10));
  return hours * 60 + minutes;
};

const timeIntervals = computed(() =>
  props.timeSlots.slice(0, -1).map((start, index) => ({
    start,
    end: props.timeSlots[index + 1],
    label: start,
  })),
);

const gridStyle = computed(() => ({
  gridTemplateColumns: `minmax(80px, 0.8fr) repeat(${props.dayOrder.length}, minmax(0, 1fr))`,
  gridTemplateRows: `auto repeat(${timeIntervals.value.length}, minmax(56px, 1fr))`,
}));

const typeMeta = (type: ScheduleEntry['type']) => scheduleEntryTypeMeta[type];

const timeLineMap = computed(() => {
  const map = new Map<string, number>();
  props.timeSlots.forEach((time, index) => {
    map.set(time, index + 2);
  });
  return map;
});

const dayColumnMap = computed(() => {
  const map = new Map<ScheduleDay, number>();
  props.dayOrder.forEach((day, index) => {
    map.set(day, index + 2);
  });
  return map;
});

const sortedEntries = computed(() =>
  props.entries
    .slice()
    .sort((a, b) => {
      const dayDiff = props.dayOrder.indexOf(a.day) - props.dayOrder.indexOf(b.day);
      if (dayDiff !== 0) {
        return dayDiff;
      }
      const startDiff = toMinutes(a.startTime) - toMinutes(b.startTime);
      if (startDiff !== 0) {
        return startDiff;
      }
      return a.title.localeCompare(b.title, 'de');
    }),
);

const entryPlacement = (entry: ScheduleEntry) => {
  const columnStart = dayColumnMap.value.get(entry.day) ?? 2;
  const rowStart = timeLineMap.value.get(entry.startTime) ?? 2;
  const rowEnd = Math.max(rowStart + 1, timeLineMap.value.get(entry.endTime) ?? rowStart + 1);

  return {
    gridColumn: `${columnStart} / ${columnStart + 1}`,
    gridRow: `${rowStart} / ${rowEnd}`,
  };
};

const intervalHasEntry = (day: ScheduleDay, interval: { start: string; end: string }) => {
  const startMinutes = toMinutes(interval.start);
  const endMinutes = toMinutes(interval.end);

  return sortedEntries.value.some((entry) => {
    if (entry.day !== day) {
      return false;
    }
    const entryStart = toMinutes(entry.startTime);
    const entryEnd = toMinutes(entry.endTime);
    return entryStart < endMinutes && entryEnd > startMinutes;
  });
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
