<template>
  <div
    class="flex flex-col gap-6 rounded-3xl border border-emerald-300/20 bg-slate-800/70 p-6 shadow-lg shadow-emerald-900/40"
  >
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p class="text-sm uppercase tracking-[0.3em] text-emerald-300/80">Dein Studienbau</p>
        <h2 class="mt-2 text-3xl font-semibold text-emerald-100">
          {{ programName || 'Noch kein Studiengang 😺' }}
        </h2>
        <p class="mt-1 max-w-xl text-sm text-emerald-200/80">
          Verfolge deine Module und schnurre dich zum Abschluss! Ergänze Semester, Fächer und Noten,
          damit TriCat dir den Durchschnitt zuflüstert.
        </p>
      </div>
      <div class="flex flex-col items-end gap-2 text-right">
        <div class="flex items-center gap-2 rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
          <span class="text-xl">🎓</span>
          <span class="font-medium">ECTS gesamt</span>
          <span class="rounded-full bg-emerald-400/20 px-2 py-0.5 text-base font-semibold text-emerald-100">
            {{ totalEcts }}
          </span>
        </div>
        <div class="flex items-center gap-2 text-sm text-emerald-200/80">
          <span class="text-xl">🌟</span>
          <span>Durchschnitt</span>
          <span class="font-semibold text-emerald-100">{{ averageLabel }}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <button
        type="button"
        class="group flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:border-emerald-200 hover:bg-emerald-400/20"
        @click="emit('create-program')"
      >
        <span class="text-lg transition group-hover:-rotate-12">➕</span>
        <span>{{ programName ? 'Studiengang anpassen' : 'Studiengang schnurren' }}</span>
      </button>
      <p class="flex items-center gap-2 text-xs text-emerald-200/70">
        <span class="text-lg">🐾</span>
        <span>TriCats Tipp: Halte deine Module aktuell, damit der Noten-Miau stimmt!</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatAverage } from '../../types/grades';

const props = defineProps<{
  programName: string;
  totalEcts: number;
  average: number | null;
}>();

const emit = defineEmits<{
  'create-program': [];
}>();

const averageLabel = computed(() => formatAverage(props.average));
</script>
