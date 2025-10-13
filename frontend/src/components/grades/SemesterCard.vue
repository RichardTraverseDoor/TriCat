<template>
  <article class="rounded-3xl border border-emerald-400/20 bg-slate-900/70 p-5 shadow-lg shadow-slate-900/30">
    <header class="flex flex-wrap items-start justify-between gap-3">
      <div class="flex flex-col">
        <label class="text-xs uppercase tracking-widest text-emerald-300/60">Semestername</label>
        <input
          :value="semester.title"
          type="text"
          class="mt-1 w-full rounded-2xl border border-emerald-400/30 bg-slate-800/80 px-4 py-2 text-base text-emerald-50 placeholder:text-emerald-200/50 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          placeholder="z.B. Flausch-Semester 3"
          @input="(event) => emit('update-title', (event.target as HTMLInputElement).value)"
        />
      </div>
      <div class="flex flex-wrap items-center gap-3 text-sm text-emerald-200">
        <span class="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1">
          <span class="text-lg">📚</span>
          <span class="font-semibold">{{ ectsLabel }} ECTS</span>
        </span>
        <span class="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1">
          <span class="text-lg">💫</span>
          <span class="font-semibold">Ø {{ averageLabel }}</span>
        </span>
        <button
          type="button"
          class="rounded-full bg-slate-800/80 px-3 py-1 text-xs text-emerald-200/70 transition hover:bg-rose-500/20 hover:text-rose-100"
          @click="emit('remove')"
        >
          Semester entfernen
        </button>
      </div>
    </header>

    <div class="mt-6 flex flex-col gap-3">
      <CourseRow
        v-for="course in semester.courses"
        :key="course.id"
        :course="course"
        @update-course="(payload) => emit('update-courses', payload)"
        @remove="() => emit('update-courses', { type: 'remove', id: course.id })"
      />

      <button
        type="button"
        class="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-emerald-400/30 bg-slate-800/60 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/60 hover:bg-emerald-500/10"
        @click="emit('update-courses', { type: 'add' })"
      >
        <span class="text-lg">➕</span>
        <span>Fach hinzufügen</span>
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CourseRow from './CourseRow.vue';
import { computeTotalEcts, computeWeightedAverage, formatAverage } from '../../types/grades';
import type { Semester } from '../../types/grades';

const props = defineProps<{
  semester: Semester;
}>();

const semester = computed(() => props.semester);

const emit = defineEmits<{
  'update-title': [value: string];
  'update-courses': [
    payload:
      | { type: 'add' }
      | { type: 'remove'; id: string }
      | {
          type: 'update';
          courseId: string;
          field: 'name' | 'ects' | 'grade';
          value: string;
        }
  ];
  remove: [];
}>();

const ectsLabel = computed(() => computeTotalEcts(semester.value.courses));
const averageLabel = computed(() => formatAverage(computeWeightedAverage(semester.value.courses)));
</script>
