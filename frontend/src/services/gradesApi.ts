import { apiRequest } from '@/services/apiClient';
import type { Course, Semester, StudyProgram } from '@/types/grades';

interface RawCourse {
  id: number;
  name?: string | null;
  ects?: number | null;
  grade?: number | null;
}

interface RawSemester {
  id: number;
  title?: string | null;
  courses?: RawCourse[] | null;
}

interface RawStudyProgram {
  id: number;
  name?: string | null;
  semesters?: RawSemester[] | null;
}

const normalizeCourse = (course: RawCourse): Course => ({
  id: course.id,
  name: course.name ?? '',
  ects: course.ects ?? null,
  grade: course.grade ?? null,
});

const normalizeSemester = (semester: RawSemester): Semester => ({
  id: semester.id,
  title: semester.title ?? '',
  courses: (semester.courses ?? []).map((course) => normalizeCourse(course)),
});

const normalizeStudyProgram = (program: RawStudyProgram): StudyProgram => ({
  id: program.id,
  name: program.name ?? '',
  semesters: (program.semesters ?? []).map((semester) => normalizeSemester(semester)),
});

export const fetchStudyPrograms = async (): Promise<StudyProgram[]> => {
  const programs = await apiRequest<RawStudyProgram[]>('/study-programs');
  return programs.map((program) => normalizeStudyProgram(program));
};

export const createStudyProgram = async (name: string): Promise<StudyProgram> => {
  const program = await apiRequest<RawStudyProgram>('/study-programs', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  return normalizeStudyProgram(program);
};

export const updateStudyProgram = async (id: number, name: string): Promise<StudyProgram> => {
  const program = await apiRequest<RawStudyProgram>(`/study-programs/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name }),
  });
  return normalizeStudyProgram(program);
};

export const createSemester = async (programId: number, title: string): Promise<Semester> => {
  const semester = await apiRequest<RawSemester>(`/study-programs/${programId}/semesters`, {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
  return normalizeSemester(semester);
};

export const updateSemester = async (semesterId: number, title: string): Promise<Semester> => {
  const semester = await apiRequest<RawSemester>(`/study-programs/semesters/${semesterId}`, {
    method: 'PUT',
    body: JSON.stringify({ title }),
  });
  return normalizeSemester(semester);
};

export const deleteSemester = async (semesterId: number): Promise<void> => {
  await apiRequest<void>(`/study-programs/semesters/${semesterId}`, { method: 'DELETE' });
};

interface CoursePayload {
  name: string;
  ects: number | null;
  grade: number | null;
}

export const createCourse = async (
  semesterId: number,
  payload: CoursePayload,
): Promise<Course> => {
  const course = await apiRequest<RawCourse>(`/study-programs/semesters/${semesterId}/courses`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return normalizeCourse(course);
};

export const updateCourse = async (courseId: number, payload: CoursePayload): Promise<Course> => {
  const course = await apiRequest<RawCourse>(`/study-programs/courses/${courseId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return normalizeCourse(course);
};

export const deleteCourse = async (courseId: number): Promise<void> => {
  await apiRequest<void>(`/study-programs/courses/${courseId}`, { method: 'DELETE' });
};
