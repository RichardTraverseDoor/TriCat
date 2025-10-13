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

    <SemesterBoard
      :semesters="semesters"
      @add-semester="addSemester"
      @remove-semester="removeSemester"
      @update-semester-title="updateSemesterTitle"
      @update-semester-courses="updateSemesterCourses"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import ProgramOverview from '../components/grades/ProgramOverview.vue';
import ProgramCreator from '../components/grades/ProgramCreator.vue';
import SemesterBoard from '../components/grades/SemesterBoard.vue';
import type { Course, Semester } from '../types/grades';
import { computeTotalEcts, computeWeightedAverage } from '../types/grades';

interface GradeState {
  programName: string;
  semesters: Semester[];
}

let semesterCounter = 1;
let courseCounter = 1;

const createSemester = (title?: string): Semester => ({
  id: `semester-${semesterCounter++}`,
  title: title ?? `Semester ${semesterCounter - 1}`,
  courses: [],
});

const createCourse = (): Course => ({
  id: `course-${courseCounter++}`,
  name: '',
  ects: null,
  grade: null,
});

const state = reactive<GradeState>({
  programName: 'Schnurr-Informatik B.Sc.',
  semesters: [createSemester('Semester 1')],
});

const showProgramCreator = ref(false);
const programDraft = ref(state.programName);

const programName = computed(() => state.programName);
const semesters = computed(() => state.semesters);

const totalProgramEcts = computed(() =>
  state.semesters.reduce((total, semester) => total + computeTotalEcts(semester.courses), 0),
);

const programAverage = computed(() => {
  const courses = state.semesters.flatMap((semester) => semester.courses);
  return computeWeightedAverage(courses);
});

const openProgramCreator = () => {
  programDraft.value = state.programName;
  showProgramCreator.value = true;
};

const closeProgramCreator = () => {
  programDraft.value = state.programName;
  showProgramCreator.value = false;
};

const saveProgram = () => {
  if (!programDraft.value.trim()) {
    return;
  }
  state.programName = programDraft.value.trim();
  showProgramCreator.value = false;
};

const addSemester = () => {
  const nextIndex = state.semesters.length + 1;
  state.semesters.push(createSemester(`Semester ${nextIndex}`));
};

const removeSemester = (id: string) => {
  const index = state.semesters.findIndex((semester) => semester.id === id);
  if (index !== -1) {
    state.semesters.splice(index, 1);
  }
};

const updateSemesterTitle = ({ id, title }: { id: string; title: string }) => {
  const semester = state.semesters.find((item) => item.id === id);
  if (semester) {
    semester.title = title;
  }
};

const updateSemesterCourses = ({
  id,
  action,
}: {
  id: string;
  action:
    | { type: 'add' }
    | { type: 'remove'; id: string }
    | { type: 'update'; courseId: string; field: 'name' | 'ects' | 'grade'; value: string };
}) => {
  const semester = state.semesters.find((item) => item.id === id);
  if (!semester) {
    return;
  }

  if (action.type === 'add') {
    semester.courses.push(createCourse());
    return;
  }

  if (action.type === 'remove') {
    const index = semester.courses.findIndex((course) => course.id === action.id);
    if (index !== -1) {
      semester.courses.splice(index, 1);
    }
    return;
  }

  if (action.type === 'update') {
    const course = semester.courses.find((item) => item.id === action.courseId);
    if (!course) {
      return;
    }

    if (action.field === 'name') {
      course.name = action.value;
      return;
    }

    const numericValue = action.value === '' ? null : Number.parseFloat(action.value);
    if (action.field === 'ects') {
      course.ects = Number.isFinite(numericValue ?? NaN) ? numericValue : null;
    } else if (action.field === 'grade') {
      course.grade = Number.isFinite(numericValue ?? NaN) ? numericValue : null;
    }
  }
};
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
