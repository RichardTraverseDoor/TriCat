<template>
  <header class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
     <div>
        <h2 class="font-heading text-3xl text-emerald-200 sm:text-4xl">
          {{ monthLabel }}
        </h2>
        <p class="text-sm text-emerald-100/70">
          Tippe auf einen Tag, um einen neuen Termin zu schnurren.
        </p>
     </div>
     <div class="flex flex-wrap items-center gap-2">
      <button
        type="button"
        class="calendar-btn"
        @click="$emit('prev')"
      >
        ⬅️ Zurück
      </button>
      <button
        type="button"
        class="calendar-btn"
        @click="$emit('today')"
      >
        🐾 Heute
      </button>
      <button
        type="button"
        class="calendar-btn"
        @click="$emit('next')"
      >
        Weiter ➡️
      </button>
     </div>   
  </header>
</template>
<script setup lang="ts">

defineProps<{
    monthLabel: string
}>()

defineEmits(['prev', 'today', 'next'])
</script>
<style scoped>
.calendar-btn {
  @apply inline-flex items-center gap-1 rounded-full border border-emerald-300/30
         bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100
         transition hover:border-emerald-300/60 hover:bg-emerald-400/20;
}
</style>