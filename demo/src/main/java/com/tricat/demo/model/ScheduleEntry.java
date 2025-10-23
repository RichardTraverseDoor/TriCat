package com.tricat.demo.model;

import jakarta.persistence.*;

@Entity
public class ScheduleEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String type;
    private String day;       // z.B. "monday"
    private String startTime; // "09:15"
    private String endTime;   // "10:45"
    private String room;

    public ScheduleEntry() {}

    public ScheduleEntry(String title, String type, String day, String startTime, String endTime, String room) {
        this.title = title;
        this.type = type;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.room = room;
    }

    // Getter & Setter
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getType() { return type; }
    public String getDay() { return day; }
    public String getStartTime() { return startTime; }
    public String getEndTime() { return endTime; }
    public String getRoom() { return room; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setType(String type) { this.type = type; }
    public void setDay(String day) { this.day = day; }
    public void setStartTime(String startTime) { this.startTime = startTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }
    public void setRoom(String room) { this.room = room; }
}
