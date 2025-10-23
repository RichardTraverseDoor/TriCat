package com.tricat.demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ShoppingList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String mood;

    // Eine Einkaufsliste hat viele Gerichte
    @OneToMany(mappedBy = "shoppingList", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference   // 🔁 Gegenstück zu @JsonBackReference in Dish
    private List<Dish> dishes = new ArrayList<>();

    // --- Getter & Setter ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public List<Dish> getDishes() {
        return dishes;
    }

    public void setDishes(List<Dish> dishes) {
        this.dishes = dishes;
    }

    // --- Hilfsmethoden (optional, aber hilfreich) ---

    public void addDish(Dish dish) {
        dishes.add(dish);
        dish.setShoppingList(this);
    }

    public void removeDish(Dish dish) {
        dishes.remove(dish);
        dish.setShoppingList(null);
    }

    @Override
    public String toString() {
        return "ShoppingList{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", mood='" + mood + '\'' +
                ", dishes=" + dishes.size() +
                '}';
    }
}
