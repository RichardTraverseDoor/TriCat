package com.tricat.demo.repository;

import com.tricat.demo.model.SemesterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SemesterRepository extends JpaRepository<SemesterEntity, Long> {}
