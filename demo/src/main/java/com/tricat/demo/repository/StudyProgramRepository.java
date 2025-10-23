package com.tricat.demo.repository;

import com.tricat.demo.model.StudyProgramEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyProgramRepository extends JpaRepository<StudyProgramEntity, Long> {}
