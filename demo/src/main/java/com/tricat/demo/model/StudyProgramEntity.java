package com.tricat.demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class StudyProgramEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "studyProgram", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<SemesterEntity> semesters = new ArrayList<>();

    public StudyProgramEntity() {}

    public StudyProgramEntity(String name) {
        this.name = name;
    }

    // Getter & Setter
    public Long getId() { return id; }
    public String getName() { return name; }
    public List<SemesterEntity> getSemesters() { return semesters; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setSemesters(List<SemesterEntity> semesters) { this.semesters = semesters; }
}
