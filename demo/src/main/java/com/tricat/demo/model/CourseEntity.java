package com.tricat.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double ects;
    private Double grade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "semester_id")
    @JsonBackReference
    private SemesterEntity semester;

    public CourseEntity() {}

    public CourseEntity(String name, Double ects, Double grade) {
        this.name = name;
        this.ects = ects;
        this.grade = grade;
    }

    // Getter & Setter
    public Long getId() { return id; }
    public String getName() { return name; }
    public Double getEcts() { return ects; }
    public Double getGrade() { return grade; }
    public SemesterEntity getSemester() { return semester; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEcts(Double ects) { this.ects = ects; }
    public void setGrade(Double grade) { this.grade = grade; }
    public void setSemester(SemesterEntity semester) { this.semester = semester; }
}
