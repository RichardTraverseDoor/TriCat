<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-semibold text-emerald-100">Semester-Übersicht</h3>
      <button
        type="button"
        class="group flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:border-emerald-200 hover:bg-emerald-400/20"
        @click="emit('add-semester')"
      >
        <span class="text-lg transition group-hover:rotate-12">🌱</span>
        <span>Neues Semester pflanzen</span>
      </button>
    </div>

    <p v-if="!semesters.length" class="rounded-3xl border border-dashed border-emerald-300/30 bg-slate-900/40 p-6 text-center text-sm text-emerald-200/70">
      Noch kein Semester angelegt. Klicke auf <span class="font-semibold text-emerald-100">„Neues Semester pflanzen“</span>,
      um deine Lernwiese zu gestalten.
    </p>

    <TransitionGroup name="cat-list" tag="div" class="flex flex-col gap-5">
      <SemesterCard
        v-for="semester in semesters"
        :key="semester.id"
        :semester="semester"
        @update-title="(value) => emit('update-semester-title', { id: semester.id, title: value })"
        @update-courses="(action) => emit('update-semester-courses', { id: semester.id, action })"
        @remove="() => emit('remove-semester', semester.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import SemesterCard from './SemesterCard.vue';
import type { Semester } from '../../types/grades';

defineProps<{
  semesters: Semester[];
}>();

const emit = defineEmits<{
  'add-semester': [];
  'remove-semester': [id: number];
  'update-semester-title': [payload: { id: number; title: string }];
  'update-semester-courses': [
    payload: {
      id: number;
      action:
        | { type: 'add' }
        | { type: 'remove'; id: number }
        | {
            type: 'update';
            courseId: number;
            field: 'name' | 'ects' | 'grade';
            value: string;
          };
    }
  ];
}>();
</script>

<style scoped>
.cat-list-enter-active,
.cat-list-leave-active {
  transition: all 0.25s ease;
}

.cat-list-enter-from,
.cat-list-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}
</style>
