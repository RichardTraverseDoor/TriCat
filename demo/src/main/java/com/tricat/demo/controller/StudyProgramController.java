package com.tricat.demo.controller;

import com.tricat.demo.model.*;
import com.tricat.demo.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/study-programs")
@CrossOrigin(origins = "*")
public class StudyProgramController {

    private final StudyProgramRepository studyRepo;
    private final SemesterRepository semesterRepo;
    private final CourseRepository courseRepo;

    public StudyProgramController(
            StudyProgramRepository studyRepo,
            SemesterRepository semesterRepo,
            CourseRepository courseRepo
    ) {
        this.studyRepo = studyRepo;
        this.semesterRepo = semesterRepo;
        this.courseRepo = courseRepo;
    }

    // --- STUDY PROGRAMS ---
    @GetMapping
    public List<StudyProgramEntity> getAllPrograms() {
        return studyRepo.findAll();
    }

    @GetMapping("/{id}")
    public StudyProgramEntity getProgram(@PathVariable Long id) {
        return studyRepo.findById(id).orElseThrow();
    }

    @PostMapping
    public StudyProgramEntity createProgram(@RequestBody StudyProgramEntity program) {
        return studyRepo.save(program);
    }

    @PutMapping("/{id}")
    public StudyProgramEntity updateProgram(@PathVariable Long id, @RequestBody StudyProgramEntity updated) {
        StudyProgramEntity program = studyRepo.findById(id).orElseThrow();
        program.setName(updated.getName());
        return studyRepo.save(program);
    }

    @DeleteMapping("/{id}")
    public void deleteProgram(@PathVariable Long id) {
        studyRepo.deleteById(id);
    }

    // --- SEMESTERS ---
    @PostMapping("/{programId}/semesters")
    public SemesterEntity addSemester(@PathVariable Long programId, @RequestBody SemesterEntity semester) {
        StudyProgramEntity program = studyRepo.findById(programId).orElseThrow();
        semester.setStudyProgram(program);
        return semesterRepo.save(semester);
    }

    @DeleteMapping("/semesters/{semesterId}")
    public void deleteSemester(@PathVariable Long semesterId) {
        semesterRepo.deleteById(semesterId);
    }

    @PutMapping("/semesters/{semesterId}")
    public SemesterEntity updateSemester(@PathVariable Long semesterId, @RequestBody SemesterEntity updated) {
        SemesterEntity semester = semesterRepo.findById(semesterId).orElseThrow();
        semester.setTitle(updated.getTitle());
        return semesterRepo.save(semester);
    }

    // --- COURSES ---
    @PostMapping("/semesters/{semesterId}/courses")
    public CourseEntity addCourse(@PathVariable Long semesterId, @RequestBody CourseEntity course) {
        SemesterEntity semester = semesterRepo.findById(semesterId).orElseThrow();
        course.setSemester(semester);
        return courseRepo.save(course);
    }

    @PutMapping("/courses/{courseId}")
    public CourseEntity updateCourse(@PathVariable Long courseId, @RequestBody CourseEntity updated) {
        CourseEntity course = courseRepo.findById(courseId).orElseThrow();
        course.setName(updated.getName());
        course.setEcts(updated.getEcts());
        course.setGrade(updated.getGrade());
        return courseRepo.save(course);
    }

    @DeleteMapping("/courses/{courseId}")
    public void deleteCourse(@PathVariable Long courseId) {
        courseRepo.deleteById(courseId);
    }
}
