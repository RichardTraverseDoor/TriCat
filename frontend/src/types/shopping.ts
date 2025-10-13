export interface Ingredient {
  id: string;
  name: string;
  purchased: boolean;
}

export interface Dish {
  id: string;
  name: string;
  note?: string;
  ingredients: Ingredient[];
}

export interface ShoppingList {
  id: string;
  name: string;
  mood: string;
  dishes: Dish[];
  createdAt: string;
}
