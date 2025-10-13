<template>
  <div>
    <!-- Wochentage -->
    <div
      class="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-emerald-200/80 sm:text-sm"
    >
      <span
        v-for="weekday in weekdays"
        :key="weekday.short"
        class="rounded-full bg-emerald-400/10 py-2"
      >
        <span class="hidden sm:inline">{{ weekday.long }}</span>
        <span class="sm:hidden">{{ weekday.short }}</span>
      </span>
    </div>

    <!-- Kalendertage -->
    <div class="mt-4 grid grid-cols-7 gap-2 text-sm">
      <button
        v-for="day in days"
        :key="day.key"
        type="button"
        class="relative flex h-24 flex-col rounded-2xl border border-transparent bg-slate-900/60 p-3 text-left transition duration-200 ease-out"
        :class="[ 
          day.isCurrentMonth
            ? 'text-emerald-50 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-slate-900/80 hover:shadow-[0_18px_32px_rgba(16,185,129,0.22)]'
            : 'text-slate-500/60 opacity-70',
          day.isToday ? 'border-emerald-400/60 bg-emerald-400/20 shadow-[0_18px_32px_rgba(16,185,129,0.25)]' : '',
          selectedDateIso === day.iso ? 'ring-2 ring-emerald-300/80 ring-offset-2 ring-offset-slate-950' : ''
        ]"
        :disabled="!day.isCurrentMonth"
        @click="$emit('select', day)"
      >
        <span class="text-lg font-semibold">{{ day.label }}</span>
        <span
          v-if="(eventsByDate.get(day.iso)?.length ?? 0) > 0"
          class="pointer-events-none absolute bottom-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/25 text-lg shadow-[0_12px_22px_rgba(16,185,129,0.28)]"
          aria-hidden="true"
        >
          🐾
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CalendarDay, StoredEvent } from '@/types/calendar'

defineProps<{
  days: CalendarDay[]
  eventsByDate: Map<string, StoredEvent[]>
  selectedDateIso: string
  weekdays: { short: string; long: string }[]
}>()

defineEmits(['select'])
</script>
