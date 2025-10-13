<template>
  <teleport to="body">
    <transition name="schedule-modal">
      <div
        v-if="open && entry"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur"
        @click.self="emit('close')"
      >
        <div
          class="relative w-full max-w-md rounded-3xl border border-emerald-300/30 bg-slate-900/95 p-6 text-emerald-50 shadow-[0_25px_45px_rgba(15,23,42,0.65)]"
        >
          <button
            type="button"
            class="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-300/30 bg-slate-900/70 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200/60 hover:text-emerald-50"
            @click="emit('close')"
            aria-label="Modal schließen"
          >
            ✕
          </button>

          <div class="flex items-center gap-3">
            <span class="text-3xl">{{ typeInformation?.icon }}</span>
            <div>
              <p class="text-xs uppercase tracking-[0.25em] text-emerald-200/70">{{ typeInformation?.label }}</p>
              <h2 class="text-xl font-semibold text-emerald-50">{{ entry.title }}</h2>
            </div>
          </div>

          <dl class="mt-6 space-y-3 text-sm">
            <div class="flex items-center justify-between gap-4 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3">
              <dt class="flex items-center gap-2 font-semibold text-emerald-100">
                <span>⏰</span>
                Zeit
              </dt>
              <dd class="text-right text-emerald-100/80">{{ entry.startTime }} – {{ entry.endTime }}</dd>
            </div>
            <div class="flex items-center justify-between gap-4 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3">
              <dt class="flex items-center gap-2 font-semibold text-emerald-100">
                <span>📍</span>
                Raum
              </dt>
              <dd class="text-right text-emerald-100/80">{{ entry.room || '🐾 noch offen' }}</dd>
            </div>
            <div class="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100/80">
              <p class="font-semibold text-emerald-100">Beschreibung</p>
              <p class="mt-1 text-emerald-100/70">
                {{ typeInformation?.description }}
              </p>
            </div>
          </dl>

          <p class="mt-6 flex items-center gap-2 text-xs text-emerald-200/70">
            <span>🐈‍⬛</span>
            Tipp: Streichelzeiten zwischen den Terminen helfen dir, die Pfoten zu entspannen.
          </p>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { scheduleEntryTypeMeta, type ScheduleEntry } from '@/types/schedule';

const props = defineProps<{
  entry: ScheduleEntry | null;
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { entry, open } = toRefs(props);

const typeInformation = computed(() => (entry.value ? scheduleEntryTypeMeta[entry.value.type] : null));
</script>

<style scoped>
.schedule-modal-enter-active,
.schedule-modal-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.schedule-modal-enter-from,
.schedule-modal-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
