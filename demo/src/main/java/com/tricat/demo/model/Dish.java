package com.tricat.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Dish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Viele Gerichte gehören zu einer Einkaufsliste
    @ManyToOne
    @JoinColumn(name = "shopping_list_id")
    @JsonBackReference  // 🔁 Gegenstück zu @JsonManagedReference in ShoppingList
    private ShoppingList shoppingList;

    // Ein Gericht hat viele Zutaten
    @OneToMany(mappedBy = "dish", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference  // 🔁 Gegenstück zu @JsonBackReference in Ingredient
    private List<Ingredient> ingredients = new ArrayList<>();

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

    public ShoppingList getShoppingList() {
        return shoppingList;
    }

    public void setShoppingList(ShoppingList shoppingList) {
        this.shoppingList = shoppingList;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    // --- Hilfsmethoden (praktisch, aber optional) ---

    public void addIngredient(Ingredient ingredient) {
        ingredients.add(ingredient);
        ingredient.setDish(this);
    }

    public void removeIngredient(Ingredient ingredient) {
        ingredients.remove(ingredient);
        ingredient.setDish(null);
    }

    @Override
    public String toString() {
        return "Dish{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", ingredients=" + ingredients.size() +
                '}';
    }
}
