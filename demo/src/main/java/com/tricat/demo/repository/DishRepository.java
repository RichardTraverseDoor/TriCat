package com.tricat.demo.repository;

import com.tricat.demo.model.Dish;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DishRepository extends JpaRepository<Dish, Long> {}
