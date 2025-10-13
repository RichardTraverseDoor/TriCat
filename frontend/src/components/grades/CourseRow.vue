<template>
  <div class="group rounded-2xl border border-emerald-400/10 bg-slate-800/60 p-4 transition hover:border-emerald-300/40">
    <div class="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-center">
      <label class="flex flex-col text-sm text-emerald-100">
        <span class="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-200/60">
          <span class="text-lg">🐈‍⬛</span>
          Fachname
        </span>
        <input
          :value="course.name"
          type="text"
          placeholder="Katzenhafte Algorithmen"
          class="mt-1 rounded-xl border border-transparent bg-slate-900/80 px-3 py-2 text-base text-emerald-50 placeholder:text-emerald-200/40 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          @input="(event) => emit('update-course', { type: 'update', courseId: course.id, field: 'name', value: (event.target as HTMLInputElement).value })"
        />
      </label>

      <label class="flex flex-col text-sm text-emerald-100">
        <span class="text-xs uppercase tracking-widest text-emerald-200/60">ECTS</span>
        <input
          :value="course.ects ?? ''"
          type="number"
          min="0"
          step="0.5"
          placeholder="5"
          class="mt-1 rounded-xl border border-transparent bg-slate-900/80 px-3 py-2 text-base text-emerald-50 placeholder:text-emerald-200/40 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          @input="(event) => emit('update-course', { type: 'update', courseId: course.id, field: 'ects', value: (event.target as HTMLInputElement).value })"
        />
      </label>

      <label class="flex flex-col text-sm text-emerald-100">
        <span class="text-xs uppercase tracking-widest text-emerald-200/60">Note</span>
        <input
          :value="course.grade ?? ''"
          type="number"
          min="1"
          max="5"
          step="0.1"
          placeholder="1.7"
          class="mt-1 rounded-xl border border-transparent bg-slate-900/80 px-3 py-2 text-base text-emerald-50 placeholder:text-emerald-200/40 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          @input="(event) => emit('update-course', { type: 'update', courseId: course.id, field: 'grade', value: (event.target as HTMLInputElement).value })"
        />
      </label>

      <button
        type="button"
        class="mt-2 self-start rounded-xl bg-slate-900/70 px-3 py-2 text-xs text-emerald-200/80 transition hover:bg-rose-500/30 hover:text-rose-50 sm:mt-6"
        @click="emit('remove')"
      >
        entfernen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Course } from '../../types/grades';

const props = defineProps<{
  course: Course;
}>();

const course = computed(() => props.course);

const emit = defineEmits<{
  'update-course': [payload: {
    type: 'update';
    courseId: string;
    field: 'name' | 'ects' | 'grade';
    value: string;
  }];
  remove: [];
}>();
</script>
