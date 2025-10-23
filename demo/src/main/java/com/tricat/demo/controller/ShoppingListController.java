package com.tricat.demo.controller;

import com.tricat.demo.model.Dish;
import com.tricat.demo.model.Ingredient;
import com.tricat.demo.model.ShoppingList;
import com.tricat.demo.repository.DishRepository;
import com.tricat.demo.repository.IngredientRepository;
import com.tricat.demo.repository.ShoppingListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
@CrossOrigin(origins = "*") // oder deine Domain
@RequiredArgsConstructor
public class ShoppingListController {

    private final ShoppingListRepository listRepo;
    private final DishRepository dishRepo;
    private final IngredientRepository ingredientRepo;

    // --- Alle Listen abrufen ---
    @GetMapping
    public List<ShoppingList> getAll() {
        return listRepo.findAll();
    }

    // --- Neue Liste erstellen ---
    @PostMapping
    public ShoppingList createList(@RequestBody ShoppingList list) {
        return listRepo.save(list);
    }

    // --- Liste löschen ---
    @DeleteMapping("/{id}")
    public void deleteList(@PathVariable Long id) {
        listRepo.deleteById(id);
    }

    // --- Gericht hinzufügen ---
    @PostMapping("/{listId}/dishes")
    public Dish addDish(@PathVariable Long listId, @RequestBody Dish dish) {
        ShoppingList list = listRepo.findById(listId)
                .orElseThrow(() -> new RuntimeException("List not found"));
        dish.setShoppingList(list);
        return dishRepo.save(dish);
    }

    // --- Gericht löschen ---
    @DeleteMapping("/{listId}/dishes/{dishId}")
    public void removeDish(@PathVariable Long dishId) {
        dishRepo.deleteById(dishId);
    }

    // --- Zutat hinzufügen ---
    @PostMapping("/{listId}/dishes/{dishId}/ingredients")
    public Ingredient addIngredient(@PathVariable Long dishId, @RequestBody Ingredient ing) {
        Dish dish = dishRepo.findById(dishId)
                .orElseThrow(() -> new RuntimeException("Dish not found"));
        ing.setDish(dish);
        return ingredientRepo.save(ing);
    }

    // --- Zutat löschen ---
    @DeleteMapping("/{listId}/dishes/{dishId}/ingredients/{ingId}")
    public void removeIngredient(@PathVariable Long ingId) {
        ingredientRepo.deleteById(ingId);
    }

    // --- Zutat toggeln (purchased) ---
    @PatchMapping("/{listId}/dishes/{dishId}/ingredients/{ingId}/toggle")
    public Ingredient togglePurchased(@PathVariable Long ingId) {
        Ingredient ing = ingredientRepo.findById(ingId)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));
        ing.setPurchased(!ing.isPurchased());
        return ingredientRepo.save(ing);
    }
}

