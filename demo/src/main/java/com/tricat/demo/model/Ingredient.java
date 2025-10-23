package com.tricat.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private boolean purchased;

    // Viele Zutaten gehören zu einem Gericht
    @ManyToOne
    @JoinColumn(name = "dish_id")
    @JsonBackReference   // 🔁 verhindert Endlosschleifen bei JSON-Ausgabe (Dish -> Ingredient -> Dish ...)
    private Dish dish;

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

    public boolean isPurchased() {
        return purchased;
    }

    public void setPurchased(boolean purchased) {
        this.purchased = purchased;
    }

    public Dish getDish() {
        return dish;
    }

    public void setDish(Dish dish) {
        this.dish = dish;
    }

    // --- Hilfsmethoden (optional, aber praktisch) ---

    @Override
    public String toString() {
        return "Ingredient{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", purchased=" + purchased +
                '}';
    }
}
