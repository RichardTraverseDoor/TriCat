export interface Course {
  id: string;
  name: string;
  ects: number | null;
  grade: number | null;
}

export interface Semester {
  id: string;
  title: string;
  courses: Course[];
}

export interface StudyProgram {
  name: string;
  semesters: Semester[];
}

export function computeTotalEcts(courses: Course[]): number {
  return courses.reduce((total, course) => total + (course.ects ?? 0), 0);
}

export function computeWeightedAverage(courses: Course[]): number | null {
  let totalWeight = 0;
  let weightedSum = 0;

  for (const course of courses) {
    if (course.grade == null || course.ects == null) {
      continue;
    }

    totalWeight += course.ects;
    weightedSum += course.grade * course.ects;
  }

  if (!totalWeight) {
    return null;
  }

  const average = weightedSum / totalWeight;
  return Math.round(average * 100) / 100;
}

export function formatAverage(value: number | null): string {
  if (value == null || Number.isNaN(value)) {
    return '—';
  }
  return value.toFixed(2);
}
