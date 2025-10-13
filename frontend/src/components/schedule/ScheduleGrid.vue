<template>
  <section
    class="relative overflow-hidden rounded-3xl border border-emerald-300/20 bg-slate-900/70 shadow-[0_25px_45px_rgba(15,23,42,0.55)] backdrop-blur-xl"
  >
    <header
      class="flex items-center justify-between gap-3 border-b border-emerald-300/20 bg-emerald-400/5 px-6 py-4 text-emerald-100"
    >
      <div>
        <p class="text-sm uppercase tracking-[0.2em] text-emerald-200/70">Stundenplan</p>
        <h2 class="text-xl font-semibold">Deine schnurrige Wochenübersicht</h2>
      </div>
      <span class="text-3xl">📅</span>
    </header>

    <div
      class="grid divide-y divide-emerald-300/10 text-emerald-50"
      :style="{ gridTemplateRows: `auto repeat(${timeSlots.length}, minmax(72px, 1fr))` }"
    >
      <div
        class="grid divide-x divide-emerald-300/10 bg-emerald-400/10 px-6 py-4 text-sm font-semibold uppercase tracking-widest"
        :style="{ gridTemplateColumns }">
        <span class="text-emerald-200/80">Zeit</span>
        <span
          v-for="day in dayOrder"
          :key="day"
          class="flex items-center justify-center gap-2 text-center"
        >
          <span aria-hidden="true">{{ scheduleDayEmojis[day] }}</span>
          {{ scheduleDayLabels[day] }}
        </span>
      </div>

      <template v-for="slot in timeSlots" :key="slot">
        <div
          class="grid divide-x divide-emerald-300/10 px-6 py-4 text-sm"
          :style="{ gridTemplateColumns }"
        >
          <div class="flex flex-col justify-center gap-1 text-emerald-200/80">
            <span class="font-semibold">{{ slot }}</span>
            <span class="text-xs text-emerald-200/60">Schnurr-Zeit</span>
          </div>

          <div
            v-for="day in dayOrder"
            :key="`${day}-${slot}`"
            class="flex h-full flex-col gap-2"
          >
            <article
              v-for="entry in cellEntries(day, slot)"
              :key="entry.id"
              class="group relative flex h-full flex-col gap-2 rounded-2xl border px-3 py-2 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              :class="typeMeta(entry.type).cardClass"
            >
              <div class="flex items-start justify-between gap-2 text-xs uppercase tracking-[0.18em]">
                <span class="inline-flex items-center gap-1 text-emerald-50/80">
                  <span aria-hidden="true">{{ typeMeta(entry.type).icon }}</span>
                  {{ typeMeta(entry.type).label }}
                </span>
                <button
                  type="button"
                  class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-slate-900/50 text-[10px] font-semibold text-emerald-100/80 opacity-0 transition group-hover:opacity-100"
                  @click="emit('remove', entry.id)"
                  aria-label="Termin entfernen"
                >
                  ✕
                </button>
              </div>

              <h3 class="text-base font-semibold text-emerald-50">{{ entry.title }}</h3>

              <dl class="mt-auto space-y-1 text-xs text-emerald-100/80">
                <div class="flex items-center justify-between">
                  <dt class="font-medium">Zeit</dt>
                  <dd>{{ entry.startTime }} – {{ entry.endTime }}</dd>
                </div>
                <div class="flex items-center justify-between">
                  <dt class="font-medium">Raum</dt>
                  <dd>{{ entry.room || '🐾 noch offen' }}</dd>
                </div>
              </dl>
            </article>

            <div
              v-if="cellEntries(day, slot).length === 0"
              class="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-300/20 bg-emerald-400/5 px-3 py-4 text-xs text-emerald-200/70"
            >
              <span class="text-lg">🐾</span>
              Frei zum Kuscheln
            </div>
          </div>
        </div>
      </template>
    </div>

    <footer class="flex flex-wrap items-center gap-3 border-t border-emerald-300/20 bg-emerald-400/5 px-6 py-4 text-xs text-emerald-100/70">
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
  remove: [id: string];
}>();

const entriesByKey = computed(() => {
  const map = new Map<string, ScheduleEntry[]>();
  props.entries.forEach((entry) => {
    const key = `${entry.day}-${entry.startTime}`;
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(entry);
  });

  props.dayOrder.forEach((day) => {
    props.timeSlots.forEach((slot) => {
      const key = `${day}-${slot}`;
      if (!map.has(key)) {
        map.set(key, []);
      }
    });
  });

  props.timeSlots.forEach((slot) => {
    props.dayOrder.forEach((day) => {
      const key = `${day}-${slot}`;
      if (map.has(key)) {
        map.set(
          key,
          map
            .get(key)!
            .slice()
            .sort((a, b) => a.title.localeCompare(b.title, 'de')),
        );
      }
    });
  });

  return map;
});

const gridTemplateColumns = computed(() => `minmax(96px, 0.85fr) repeat(${props.dayOrder.length}, minmax(0, 1fr))`);

const typeMeta = (type: ScheduleEntry['type']) => scheduleEntryTypeMeta[type];

const cellEntries = (day: ScheduleDay, slot: ScheduleTimeSlot) => entriesByKey.value.get(`${day}-${slot}`) ?? [];
</script>
