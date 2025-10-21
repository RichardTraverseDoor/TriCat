package com.tricat.api.service;

import com.tricat.api.entity.Cat;
import com.tricat.api.repository.CatRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatService {

    private final CatRepository catRepository;

    public CatService(CatRepository catRepository) {
        this.catRepository = catRepository;
    }

    public List<Cat> findAll() {
        return catRepository.findAll();
    }

    public Cat create(Cat cat) {
        return catRepository.save(cat);
    }
}
