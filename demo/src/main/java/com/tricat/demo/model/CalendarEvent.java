package com.tricat.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class CalendarEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private LocalDate date;

    public CalendarEvent() {}

    public CalendarEvent(String title, LocalDate date) {
        this.title = title;
        this.date = date;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public LocalDate getDate() { return date; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDate(LocalDate date) { this.date = date; }
}

