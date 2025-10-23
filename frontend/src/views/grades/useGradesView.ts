import { computed, onMounted, ref } from 'vue';
import {
  createCourse,
  createSemester,
  createStudyProgram,
  deleteCourse,
  deleteSemester,
  fetchStudyPrograms,
  updateCourse,
  updateSemester,
  updateStudyProgram,
} from '@/services/gradesApi';
import { computeTotalEcts, computeWeightedAverage } from '@/types/grades';
import type { Course, StudyProgram } from '@/types/grades';

const createEmptyCoursePayload = (): { name: string; ects: number | null; grade: number | null } => ({
  name: '',
  ects: null,
  grade: null,
});

export const useGradesView = () => {
  const programState = ref<StudyProgram | null>(null);
  const loading = ref(true);
  const showProgramCreator = ref(false);
  const programDraft = ref('');

  const loadProgram = async () => {
    loading.value = true;
    try {
      const programs = await fetchStudyPrograms();
      programState.value = programs.length ? programs[0] : null;
      if (!programState.value) {
        programDraft.value = '';
        showProgramCreator.value = true;
      } else {
        programDraft.value = programState.value.name;
      }
    } catch (error) {
      console.error('Fehler beim Laden des Studienprogramms', error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    void loadProgram();
  });

  const programName = computed(() => programState.value?.name ?? '');
  const semesters = computed(() => programState.value?.semesters ?? []);

  const totalProgramEcts = computed(() =>
    semesters.value.reduce((total, semester) => total + computeTotalEcts(semester.courses), 0),
  );

  const programAverage = computed(() => {
    const courses = semesters.value.flatMap((semester) => semester.courses);
    return computeWeightedAverage(courses);
  });

  const openProgramCreator = () => {
    programDraft.value = programName.value;
    showProgramCreator.value = true;
  };

  const closeProgramCreator = () => {
    programDraft.value = programName.value;
    showProgramCreator.value = false;
  };

  const saveProgram = async () => {
    const trimmed = programDraft.value.trim();
    if (!trimmed) {
      return;
    }

    try {
      if (programState.value) {
        const updated = await updateStudyProgram(programState.value.id, trimmed);
        programState.value = {
          ...programState.value,
          name: updated.name,
        };
      } else {
        const created = await createStudyProgram(trimmed);
        programState.value = created;
      }
      programDraft.value = trimmed;
      showProgramCreator.value = false;
    } catch (error) {
      console.error('Fehler beim Speichern des Studienprogramms', error);
    }
  };

  const addSemester = async () => {
    if (!programState.value) {
      showProgramCreator.value = true;
      return;
    }

    const defaultTitle = `Semester ${programState.value.semesters.length + 1}`;

    try {
      const semester = await createSemester(programState.value.id, defaultTitle);
      programState.value = {
        ...programState.value,
        semesters: [...programState.value.semesters, semester],
      };
    } catch (error) {
      console.error('Fehler beim Anlegen eines Semesters', error);
    }
  };

  const removeSemester = async (id: number) => {
    if (!programState.value) {
      return;
    }

    const previousSemesters = programState.value.semesters;
    programState.value = {
      ...programState.value,
      semesters: programState.value.semesters.filter((semester) => semester.id !== id),
    };

    try {
      await deleteSemester(id);
    } catch (error) {
      console.error('Fehler beim Löschen eines Semesters', error);
      programState.value = {
        ...programState.value,
        semesters: previousSemesters,
      };
    }
  };

  const updateSemesterTitle = async ({ id, title }: { id: number; title: string }) => {
    if (!programState.value) {
      return;
    }

    const previousSemester = programState.value.semesters.find((semester) => semester.id === id);
    if (!previousSemester) {
      return;
    }

    const previousTitle = previousSemester.title;

    programState.value = {
      ...programState.value,
      semesters: programState.value.semesters.map((semester) =>
        semester.id === id ? { ...semester, title } : semester,
      ),
    };

    try {
      const updated = await updateSemester(id, title);
      programState.value = {
        ...programState.value,
        semesters: programState.value.semesters.map((semester) =>
          semester.id === id ? { ...semester, title: updated.title } : semester,
        ),
      };
    } catch (error) {
      console.error('Fehler beim Aktualisieren eines Semesters', error);
      programState.value = {
        ...programState.value,
        semesters: programState.value.semesters.map((semester) =>
          semester.id === id ? { ...semester, title: previousTitle } : semester,
        ),
      };
    }
  };

  const updateCourses = async (
    semesterId: number,
    action:
      | { type: 'add' }
      | { type: 'remove'; id: number }
      | { type: 'update'; courseId: number; field: 'name' | 'ects' | 'grade'; value: string },
  ) => {
    if (!programState.value) {
      return;
    }

    const semester = programState.value.semesters.find((item) => item.id === semesterId);
    if (!semester) {
      return;
    }

    if (action.type === 'add') {
      try {
        const course = await createCourse(semesterId, createEmptyCoursePayload());
        programState.value = {
          ...programState.value,
          semesters: programState.value.semesters.map((item) =>
            item.id === semesterId
              ? { ...item, courses: [...item.courses, course] }
              : item,
          ),
        };
      } catch (error) {
        console.error('Fehler beim Anlegen eines Kurses', error);
      }
      return;
    }

    if (action.type === 'remove') {
      const previousCourses = semester.courses;
      programState.value = {
        ...programState.value,
        semesters: programState.value.semesters.map((item) =>
          item.id === semesterId
            ? { ...item, courses: item.courses.filter((course) => course.id !== action.id) }
            : item,
        ),
      };

      try {
        await deleteCourse(action.id);
      } catch (error) {
        console.error('Fehler beim Löschen eines Kurses', error);
        programState.value = {
          ...programState.value!,
          semesters: programState.value!.semesters.map((item) =>
            item.id === semesterId ? { ...item, courses: previousCourses } : item,
          ),
        };
      }
      return;
    }

    const course = semester.courses.find((item) => item.id === action.courseId);
    if (!course) {
      return;
    }

    const previousCourse: Course = { ...course };
    const updatedCourse: Course = { ...course };

    if (action.field === 'name') {
      updatedCourse.name = action.value;
    } else {
      const numericValue = action.value.trim() === '' ? null : Number.parseFloat(action.value);
      const sanitizedValue = Number.isFinite(numericValue ?? NaN) ? numericValue : null;
      if (action.field === 'ects') {
        updatedCourse.ects = sanitizedValue;
      } else {
        updatedCourse.grade = sanitizedValue;
      }
    }

    programState.value = {
      ...programState.value,
      semesters: programState.value.semesters.map((item) =>
        item.id === semesterId
          ? {
              ...item,
              courses: item.courses.map((existing) =>
                existing.id === updatedCourse.id ? updatedCourse : existing,
              ),
            }
          : item,
      ),
    };

    try {
      const saved = await updateCourse(updatedCourse.id, {
        name: updatedCourse.name,
        ects: updatedCourse.ects,
        grade: updatedCourse.grade,
      });
      programState.value = {
        ...programState.value!,
        semesters: programState.value!.semesters.map((item) =>
          item.id === semesterId
            ? {
                ...item,
                courses: item.courses.map((existing) =>
                  existing.id === saved.id ? saved : existing,
                ),
              }
            : item,
        ),
      };
    } catch (error) {
      console.error('Fehler beim Aktualisieren eines Kurses', error);
      programState.value = {
        ...programState.value!,
        semesters: programState.value!.semesters.map((item) =>
          item.id === semesterId
            ? {
                ...item,
                courses: item.courses.map((existing) =>
                  existing.id === previousCourse.id ? previousCourse : existing,
                ),
              }
            : item,
        ),
      };
    }
  };

  return {
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
    updateSemesterCourses: updateCourses,
  };
};