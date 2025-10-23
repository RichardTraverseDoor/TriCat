package com.tricat.demo.controller;

import com.tricat.demo.model.CalendarEvent;
import com.tricat.demo.repository.CalendarEventRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin(origins = "*")
public class CalendarEventController {

    private final CalendarEventRepository repo;

    public CalendarEventController(CalendarEventRepository repo) {
        this.repo = repo;
    }

    // Alle Events abrufen
    @GetMapping
    public List<CalendarEvent> getAll() {
        return repo.findAll();
    }

    // Nur kommende Events abrufen
    @GetMapping("/upcoming")
    public List<CalendarEvent> getUpcoming() {
        return repo.findByDateAfterOrderByDateAsc(LocalDate.now());
    }

    // Event erstellen
    @PostMapping
    public CalendarEvent create(@RequestBody CalendarEvent event) {
        return repo.save(event);
    }

    // Event löschen
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
