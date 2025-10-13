<template>
  <section
    class="relative flex flex-col gap-4 rounded-3xl border border-emerald-300/20 bg-slate-900/70 p-6 text-emerald-100 shadow-[0_20px_35px_rgba(15,23,42,0.45)] backdrop-blur-xl"
  >
    <header class="flex items-start justify-between gap-3">
      <div>
        <p class="text-sm uppercase tracking-[0.3em] text-emerald-200/70">Farblegende</p>
        <h2 class="text-xl font-semibold">So schnurren deine Farben</h2>
      </div>
      <span class="text-3xl">🎨</span>
    </header>

    <ul class="space-y-3">
      <li
        v-for="option in typeOptions"
        :key="option.value"
        class="flex items-start gap-3 rounded-2xl border border-emerald-300/15 bg-emerald-400/5 px-4 py-3"
      >
        <span class="mt-1 text-xl">{{ option.meta.icon }}</span>
        <div class="flex flex-col gap-1">
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-200/80">
            {{ option.meta.label }}
          </p>
          <p class="text-sm text-emerald-100/80">{{ option.meta.description }}</p>
        </div>
      </li>
    </ul>

    <footer class="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100/80">
      <p>
        Tipp: Gib jedem Raum einen kleinen Katzennamen, so findest du ihn schneller wieder. 🐾
      </p>
    </footer>

    <span class="pointer-events-none absolute -right-5 top-3 text-5xl text-emerald-200/20">🧶</span>
  </section>
</template>

<script setup lang="ts">
import { scheduleEntryTypeMeta, type ScheduleEntryType } from '@/types/schedule';

const typeOptions = (Object.entries(scheduleEntryTypeMeta) as [ScheduleEntryType, typeof scheduleEntryTypeMeta[keyof typeof scheduleEntryTypeMeta]][]).map(
  ([value, meta]) => ({
    value,
    meta,
  }),
);
</script>
