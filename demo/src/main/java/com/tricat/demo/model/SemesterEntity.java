package com.tricat.demo.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class SemesterEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_program_id")
    private StudyProgramEntity studyProgram;

    @OneToMany(mappedBy = "semester", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseEntity> courses = new ArrayList<>();

    public SemesterEntity() {}

    public SemesterEntity(String title) {
        this.title = title;
    }

    // Getter & Setter
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public StudyProgramEntity getStudyProgram() { return studyProgram; }
    public List<CourseEntity> getCourses() { return courses; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setStudyProgram(StudyProgramEntity studyProgram) { this.studyProgram = studyProgram; }
    public void setCourses(List<CourseEntity> courses) { this.courses = courses; }
}
