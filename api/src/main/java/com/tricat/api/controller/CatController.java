package com.tricat.api.controller;

import com.tricat.api.dto.CatRequest;
import com.tricat.api.entity.Cat;
import com.tricat.api.service.CatService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/cats")
public class CatController {

    private final CatService catService;

    public CatController(CatService catService) {
        this.catService = catService;
    }

    @GetMapping
    public ResponseEntity<List<Cat>> getCats() {
        List<Cat> cats = catService.findAll();
        return ResponseEntity.ok(cats);
    }

    @PostMapping
    public ResponseEntity<Cat> createCat(@Valid @RequestBody CatRequest catRequest) {
        Cat savedCat = catService.create(new Cat(catRequest.getName(), catRequest.getBreed()));
        return ResponseEntity.created(URI.create("/cats/" + savedCat.getId())).body(savedCat);
    }
}
