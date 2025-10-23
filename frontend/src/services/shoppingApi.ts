import type { Dish, Ingredient, ShoppingList } from '@/types/shopping';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '');

type RawIngredient = Partial<Ingredient> & { id: number };
type RawDish = Partial<Dish> & { id: number; ingredients?: RawIngredient[] };
type RawShoppingList = Partial<ShoppingList> & { id: number; dishes?: RawDish[] };

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

const normalizeIngredient = (ingredient: RawIngredient): Ingredient => ({
  id: ingredient.id,
  name: ingredient.name ?? '',
  purchased: Boolean(ingredient.purchased)
});

const normalizeDish = (dish: RawDish): Dish => ({
  id: dish.id,
  name: dish.name ?? '',
  note: dish.note,
  ingredients: Array.isArray(dish.ingredients)
    ? dish.ingredients.map((entry) => normalizeIngredient(entry))
    : []
});

const normalizeShoppingList = (list: RawShoppingList): ShoppingList => ({
  id: list.id,
  name: list.name ?? 'Unbenannte Liste',
  mood: list.mood ?? '',
  createdAt: list.createdAt,
  dishes: Array.isArray(list.dishes) ? list.dishes.map((entry) => normalizeDish(entry)) : []
});

export const fetchShoppingLists = async (): Promise<ShoppingList[]> => {
  const lists = await request<RawShoppingList[]>('/lists');
  return lists.map((entry) => normalizeShoppingList(entry));
};

export const createShoppingList = async (payload: { name: string; mood: string }): Promise<ShoppingList> => {
  const list = await request<RawShoppingList>('/lists', {
    method: 'POST',
    body: JSON.stringify({ ...payload })
  });
  return normalizeShoppingList(list);
};

export const updateShoppingList = async (
  id: number,
  payload: Partial<Pick<ShoppingList, 'name' | 'mood'>>
): Promise<ShoppingList> => {
  const list = await request<RawShoppingList>(`/lists/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  });
  return normalizeShoppingList(list);
};

export const deleteShoppingList = async (id: number): Promise<void> => {
  await request<void>(`/lists/${id}`, { method: 'DELETE' });
};

export const createDish = async (listId: number, payload: { name: string }): Promise<Dish> => {
  const dish = await request<RawDish>(`/lists/${listId}/dishes`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return normalizeDish(dish);
};

export const deleteDish = async (listId: number, dishId: number): Promise<void> => {
  await request<void>(`/lists/${listId}/dishes/${dishId}`, { method: 'DELETE' });
};

export const createIngredient = async (
  listId: number,
  dishId: number,
  payload: { name: string }
): Promise<Ingredient> => {
  const ingredient = await request<RawIngredient>(`/lists/${listId}/dishes/${dishId}/ingredients`, {
    method: 'POST',
    body: JSON.stringify({ ...payload, purchased: false })
  });
  return normalizeIngredient(ingredient);
};

export const deleteIngredient = async (
  listId: number,
  dishId: number,
  ingredientId: number
): Promise<void> => {
  await request<void>(`/lists/${listId}/dishes/${dishId}/ingredients/${ingredientId}`, { method: 'DELETE' });
};

export const toggleIngredient = async (
  listId: number,
  dishId: number,
  ingredientId: number
): Promise<Ingredient> => {
  const ingredient = await request<RawIngredient>(
    `/lists/${listId}/dishes/${dishId}/ingredients/${ingredientId}/toggle`,
    { method: 'PATCH' }
  );
  return normalizeIngredient(ingredient);
};