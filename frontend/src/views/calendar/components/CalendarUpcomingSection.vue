<script setup lang="ts">
import type { PlaceholderCard, UpcomingEventCard } from '@/types/calendar';

const props = defineProps<{
  events: UpcomingEventCard[];
  placeholders: PlaceholderCard[];
}>();
</script>

<template>
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
        v-for="event in props.events"
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
        v-for="(placeholder, index) in props.placeholders"
        :key="`placeholder-${index}`"
        class="relative flex flex-col justify-center gap-2 overflow-hidden rounded-3xl border border-dashed border-emerald-400/30 bg-slate-900/60 p-5 text-emerald-100/70"
      >
        <span class="text-3xl">✨</span>
        <h3 class="font-heading text-xl text-emerald-100">{{ placeholder.title }}</h3>
        <p class="text-sm">{{ placeholder.description }}</p>
      </article>
    </div>
  </div>
</template>
