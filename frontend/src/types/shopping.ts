export interface Ingredient {
  id: number;
  name: string;
  purchased: boolean;
}

export interface Dish {
  id: number;
  name: string;
  note?: string;
  ingredients: Ingredient[];
}

export interface ShoppingList {
  id: number;
  name: string;
  mood: string;
  dishes: Dish[];
  createdAt?: string;
}
