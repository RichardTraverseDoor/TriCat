package com.tricat.demo.controller;

import com.tricat.demo.model.ScheduleEntry;
import com.tricat.demo.repository.ScheduleEntryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
public class ScheduleEntryController {

    private final ScheduleEntryRepository repo;

    public ScheduleEntryController(ScheduleEntryRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<ScheduleEntry> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{day}")
    public List<ScheduleEntry> getByDay(@PathVariable String day) {
        return repo.findByDay(day);
    }

    @PostMapping
    public ScheduleEntry create(@RequestBody ScheduleEntry entry) {
        return repo.save(entry);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
