<template>
  <div class="relative min-h-screen overflow-hidden bg-slate-950">
    <span class="pointer-events-none absolute left-[8%] top-12 text-6xl text-emerald-300/20 blur-[1px]">🐾</span>
    <span class="pointer-events-none absolute right-[12%] top-24 text-7xl text-emerald-200/15">🧶</span>
    <span class="pointer-events-none absolute bottom-16 left-[15%] text-6xl text-emerald-200/10">🌙</span>

    <main class="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-16 sm:px-8 lg:px-12">
      <ScheduleHero
        :entry-count="entryCount"
        :busiest-day-label="busiestDayLabel"
        :busiest-day-emoji="busiestDayEmoji"
      />

      <section class="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <ScheduleGrid
          :day-order="dayOrder"
          :time-slots="timeSlots"
          :entries="entries"
          @remove="removeEntry"
        />

        <aside class="flex flex-col gap-6">
          <ScheduleForm :day-order="dayOrder" :time-slots="timeSlots" @submit="addEntry" />
          <ScheduleLegend />

          <div class="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5 text-emerald-100 shadow-inner">
            <h3 class="flex items-center gap-2 text-base font-semibold">
              <span class="text-xl">{{ busiestDayEmoji }}</span>
              Flauschige Erinnerung
            </h3>
            <p class="mt-2 text-sm text-emerald-100/80">
              {{ busiestDayLabel }} ist aktuell der vollste Katzentag. Gönn dir dort eine Pause mit einem warmen Kakao und einer
              schnurrigen Playlist.
            </p>
          </div>
        </aside>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import ScheduleForm from '@/components/schedule/ScheduleForm.vue';
import ScheduleGrid from '@/components/schedule/ScheduleGrid.vue';
import ScheduleLegend from '@/components/schedule/ScheduleLegend.vue';
import ScheduleHero from '@/views/schedule/components/ScheduleHero.vue';
import { useScheduleView } from '@/views/schedule/useScheduleView';

const { dayOrder, timeSlots, entries, entryCount, busiestDayLabel, busiestDayEmoji, addEntry, removeEntry } = useScheduleView();
</script>
