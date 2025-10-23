<template>
  <section class="space-y-10">
    <header
      class="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-slate-950/70 px-6 py-10 shadow-lg shadow-emerald-900/30 sm:px-10"
    >
      <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.2),_rgba(15,23,42,0))]"></div>
      <div class="flex flex-wrap items-center justify-between gap-8">
        <div class="max-w-xl space-y-3">
          <p class="text-sm uppercase tracking-[0.45em] text-emerald-200/70">TriCats Einkaufs-Revier</p>
          <h1 class="font-heading text-4xl text-emerald-100 sm:text-5xl">
            Schnurrige Einkaufslisten für hungrige Fellnasen
          </h1>
          <p class="text-emerald-100/70">
            Sammle deine Gerichte, hake Zutaten ab und schnapp dir, was deine Katze glücklich macht. Jede Liste ist ein
            kleines Kuschelreich – ganz nach deinem Geschmack.
          </p>
        </div>
        <div class="flex flex-col items-end gap-4 text-right text-sm text-emerald-100/70">
          <div class="rounded-3xl border border-emerald-400/30 bg-slate-900/60 px-6 py-4">
            <p class="text-xs uppercase tracking-[0.45em] text-emerald-200/60">Aktive Liste</p>
            <p class="mt-2 text-lg font-semibold text-emerald-100">{{ activeList?.name ?? 'Noch kein Revier' }}</p>
            <p v-if="activeList" class="text-xs text-emerald-100/60">
              seit {{ formattedCreatedAt }}
            </p>
          </div>
          <div class="flex items-center gap-2 rounded-2xl bg-emerald-400/10 px-4 py-2 text-emerald-100">
            <ListChecks class="h-4 w-4" />
            <span>{{ openIngredients }} offene Zutaten</span>
          </div>
        </div>
      </div>
    </header>

    <div
      v-if="errorMessage"
      class="rounded-3xl border border-rose-400/40 bg-rose-500/10 px-6 py-4 text-sm text-rose-100"
    >
      {{ errorMessage }}
    </div>

    <div
      v-if="isLoading"
      class="rounded-3xl border border-dashed border-emerald-400/40 bg-slate-950/50 p-10 text-center text-sm text-emerald-100/70"
    >
      Lade schnurrende Einkaufslisten...
    </div>

    <div v-else class="grid gap-6 lg:grid-cols-[20rem,1fr]">
      <ShoppingListSelector
        :lists="lists"
        :active-list-id="activeListId"
        @select="selectList"
        @create="createList"
        @remove="removeList"
      />

      <ShoppingListDetail
        v-if="activeList"
        :list="activeList"
        @rename="renameList"
        @add-dish="addDish"
        @add-ingredient="addIngredient"
        @toggle-ingredient="toggleIngredient"
        @remove-ingredient="removeIngredient"
        @remove-dish="removeDish"
        @remove-list="removeList"
      />
      <div
        v-else
        class="flex min-h-[28rem] flex-col items-center justify-center rounded-3xl border border-dashed border-emerald-400/40 bg-slate-950/50 p-10 text-center text-sm text-emerald-100/70"
      >
        <UtensilsCrossed class="mb-4 h-10 w-10 text-emerald-300" aria-hidden="true" />
        <p class="max-w-sm">
          Erstelle deine erste schnurrige Einkaufsliste, um Gerichte zu planen und Zutaten abzuhaken. TriCat begleitet
          dich bei jedem Einkaufsmiau!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ListChecks, UtensilsCrossed } from 'lucide-vue-next';

import ShoppingListDetail from '@/components/shopping/ShoppingListDetail.vue';
import ShoppingListSelector from '@/components/shopping/ShoppingListSelector.vue';
import type { ShoppingList } from '@/types/shopping';
import {
  createDish,
  createIngredient,
  createShoppingList,
  deleteDish,
  deleteIngredient,
  deleteShoppingList,
  fetchShoppingLists,
  toggleIngredient as toggleIngredientRemote,
  updateShoppingList
} from '@/services/shoppingApi';

const moodSnippets = [
  'Frisch geschnurrt und bereit zum Naschen',
  'Samtpfoten-tauglich für gemütliche Abende',
  'Glänzendes Fell garantiert leckere Momente',
  'Mit Liebe und Miau zusammengestellt',
  'Kuscheliger Vorrat für Regentage'
];

const lists = ref<ShoppingList[]>([]);
const activeListId = ref<number | null>(null);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

const activeList = computed(() => lists.value.find((list) => list.id === activeListId.value) ?? null);

const openIngredients = computed(() =>
  lists.value.reduce(
    (sum, list) =>
      sum +
      list.dishes.reduce(
        (dishSum, dish) => dishSum + dish.ingredients.filter((ingredient) => !ingredient.purchased).length,
        0
      ),
    0
  )
);

const formattedCreatedAt = computed(() => {
  if (!activeList.value) return '';
  if (!activeList.value.createdAt) {
    return 'gerade eben';
  }
  const date = new Date(activeList.value.createdAt);
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
});

const handleError = (error: unknown) => {
  console.error(error);
  errorMessage.value = error instanceof Error ? error.message : 'Es ist ein unbekannter Fehler aufgetreten.';
};

const enhanceList = (list: ShoppingList, fallbackCreatedAt?: string): ShoppingList => ({
  ...list,
  createdAt: list.createdAt ?? fallbackCreatedAt,
  dishes: list.dishes.map((dish) => ({
    ...dish,
    ingredients: dish.ingredients.map((ingredient) => ({ ...ingredient }))
  }))
});

const loadLists = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  try {
    const remoteLists = await fetchShoppingLists();
    const now = new Date().toISOString();
    lists.value = remoteLists.map((entry) => enhanceList(entry, now));
    activeListId.value = lists.value[0]?.id ?? null;
  } catch (error) {
    handleError(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadLists();
});

const selectList = (id: number) => {
  activeListId.value = id;
};

const createList = async () => {
  const name = `Neue Miau-Liste ${lists.value.length + 1}`;
  const mood = moodSnippets[Math.floor(Math.random() * moodSnippets.length)];
  errorMessage.value = null;
  try {
    const created = await createShoppingList({ name, mood });
    const enhanced = enhanceList(created, new Date().toISOString());
    lists.value.unshift(enhanced);
    activeListId.value = enhanced.id;
  } catch (error) {
    handleError(error);
  }
};

const renameList = async ({ id, name }: { id: number; name: string }) => {
  const list = lists.value.find((entry) => entry.id === id);
  if (!list) return;
  const previousName = list.name;
  list.name = name;
  errorMessage.value = null;
  try {
    const updated = await updateShoppingList(id, { name });
    list.name = updated.name;
    list.mood = updated.mood;
  } catch (error) {
    list.name = previousName;
    handleError(error);
  }
};

const addDish = async ({ listId, name }: { listId: number; name: string }) => {
  const list = lists.value.find((entry) => entry.id === listId);
  if (!list) return;
  errorMessage.value = null;
  try {
    const dish = await createDish(listId, { name });
    list.dishes.push({ ...dish, ingredients: [...dish.ingredients] });
  } catch (error) {
    handleError(error);
  }
};

const addIngredient = async ({ listId, dishId, name }: { listId: number; dishId: number; name: string }) => {
  const list = lists.value.find((entry) => entry.id === listId);
  if (!list) return;
  const dish = list.dishes.find((entry) => entry.id === dishId);
  if (!dish) return;
  errorMessage.value = null;
  try {
    const ingredient = await createIngredient(listId, dishId, { name });
    dish.ingredients.push({ ...ingredient });
  } catch (error) {
    handleError(error);
  }
};

const toggleIngredient = async ({
  listId,
  dishId,
  ingredientId
}: {
  listId: number;
  dishId: number;
  ingredientId: number;
}) => {
  const list = lists.value.find((entry) => entry.id === listId);
  if (!list) return;
  const dish = list.dishes.find((entry) => entry.id === dishId);
  if (!dish) return;
  const ingredient = dish.ingredients.find((entry) => entry.id === ingredientId);
  if (!ingredient) return;

  const previousState = ingredient.purchased;
  ingredient.purchased = !previousState;
  errorMessage.value = null;
  try {
    const updated = await toggleIngredientRemote(listId, dishId, ingredientId);
    ingredient.purchased = updated.purchased;
  } catch (error) {
    ingredient.purchased = previousState;
    handleError(error);
  }
};

const removeIngredient = async ({
  listId,
  dishId,
  ingredientId
}: {
  listId: number;
  dishId: number;
  ingredientId: number;
}) => {
  const list = lists.value.find((entry) => entry.id === listId);
  if (!list) return;
  const dish = list.dishes.find((entry) => entry.id === dishId);
  if (!dish) return;
  errorMessage.value = null;
  try {
    await deleteIngredient(listId, dishId, ingredientId);
    dish.ingredients = dish.ingredients.filter((entry) => entry.id !== ingredientId);
  } catch (error) {
    handleError(error);
  }
};

const removeDish = async ({ listId, dishId }: { listId: number; dishId: number }) => {
  const list = lists.value.find((entry) => entry.id === listId);
  if (!list) return;
  errorMessage.value = null;
  try {
    await deleteDish(listId, dishId);
    list.dishes = list.dishes.filter((entry) => entry.id !== dishId);
  } catch (error) {
    handleError(error);
  }
};

const removeList = async (id: number) => {
  errorMessage.value = null;
  try {
    await deleteShoppingList(id);
    lists.value = lists.value.filter((entry) => entry.id !== id);
    if (activeListId.value === id) {
      activeListId.value = lists.value[0]?.id ?? null;
    }
  } catch (error) {
    handleError(error);
  }
};
</script>