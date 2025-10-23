package com.tricat.demo.repository;

import com.tricat.demo.model.CalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {
    List<CalendarEvent> findByDateAfterOrderByDateAsc(LocalDate date);
}
