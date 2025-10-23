<template>
  <section class="space-y-8">
    <ProgramOverview
      :program-name="programName"
      :total-ects="totalProgramEcts"
      :average="programAverage"
      @create-program="openProgramCreator"
    />

    <ProgramCreator
      v-if="showProgramCreator"
      v-model="programDraft"
      @submit="saveProgram"
      @cancel="closeProgramCreator"
    />

    <div
      v-if="loading"
      class="rounded-3xl border border-emerald-300/20 bg-slate-900/40 p-6 text-center text-sm text-emerald-200/80"
    >
      Lade deine Studienübersicht ...
    </div>

    <SemesterBoard
      v-else
      :semesters="semesters"
      @add-semester="addSemester"
      @remove-semester="removeSemester"
      @update-semester-title="updateSemesterTitle"
      @update-semester-courses="({ id, action }) => updateSemesterCourses(id, action)"
    />
  </section>
</template>

<script setup lang="ts">
import ProgramOverview from '../components/grades/ProgramOverview.vue';
import ProgramCreator from '../components/grades/ProgramCreator.vue';
import SemesterBoard from '../components/grades/SemesterBoard.vue';
import { useGradesView } from './grades/useGradesView';

const {
  loading,
  programName,
  semesters,
  totalProgramEcts,
  programAverage,
  showProgramCreator,
  programDraft,
  openProgramCreator,
  closeProgramCreator,
  saveProgram,
  addSemester,
  removeSemester,
  updateSemesterTitle,
  updateSemesterCourses,
} = useGradesView();
</script>

<style scoped>
section {
  animation: gentle-pulse 12s ease-in-out infinite;
}

@keyframes gentle-pulse {
  0%,
  100% {
    filter: drop-shadow(0 0 25px rgba(74, 222, 128, 0.15));
  }
  50% {
    filter: drop-shadow(0 0 35px rgba(20, 184, 166, 0.2));
  }
}
</style>
