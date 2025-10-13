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

    <div class="grid gap-6 lg:grid-cols-[20rem,1fr]">
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
import { computed, ref } from 'vue';
import { ListChecks, UtensilsCrossed } from 'lucide-vue-next';

import ShoppingListDetail from '@/components/shopping/ShoppingListDetail.vue';
import ShoppingListSelector from '@/components/shopping/ShoppingListSelector.vue';
import type { Dish, Ingredient, ShoppingList } from '@/types/shopping';

const createId = () => Math.random().toString(36).slice(2, 11);

const moodSnippets = [
  'Frisch geschnurrt und bereit zum Naschen',
  'Samtpfoten-tauglich für gemütliche Abende',
  'Glänzendes Fell garantiert leckere Momente',
  'Mit Liebe und Miau zusammengestellt',
  'Kuscheliger Vorrat für Regentage'
];

const lists = ref<ShoppingList[]>([
  {
    id: createId(),
    name: 'Wochenmarkt-Miaus',
    mood: 'Frische Schnurr-Gerichte für die ganze Woche',
    createdAt: new Date().toISOString(),
    dishes: [
      {
        id: createId(),
        name: 'Samtpfoten-Lachs mit Kräutern',
        ingredients: [
          { id: createId(), name: 'Lachsfilet', purchased: false },
          { id: createId(), name: 'Zitronenthymian', purchased: false },
          { id: createId(), name: 'Katzengerechte Sahne', purchased: true }
        ]
      },
      {
        id: createId(),
        name: 'Mondschein-Gemüsepfanne',
        ingredients: [
          { id: createId(), name: 'Süßkartoffel', purchased: false },
          { id: createId(), name: 'Zuckerschoten', purchased: false },
          { id: createId(), name: 'Sesamöl', purchased: false }
        ]
      }
    ]
  },
  {
    id: createId(),
    name: 'Picknick im Katzenpark',
    mood: 'Leichte Snacks für sonnige Kuschelstunden',
    createdAt: new Date().toISOString(),
    dishes: [
      {
        id: createId(),
        name: 'Frühlingshafte Thunfisch-Taschen',
        ingredients: [
          { id: createId(), name: 'Blätterteig', purchased: false },
          { id: createId(), name: 'Thunfisch in Wasser', purchased: true },
          { id: createId(), name: 'Frischer Dill', purchased: false }
        ]
      }
    ]
  }
]);

const activeListId = ref(lists.value[0]?.id ?? null);

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
  const date = new Date(activeList.value.createdAt);
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
});

const selectList = (id: string) => {
  activeListId.value = id;
};

const createList = () => {
  const newList: ShoppingList = {
    id: createId(),
    name: `Neue Miau-Liste ${lists.value.length + 1}`,
    mood: moodSnippets[Math.floor(Math.random() * moodSnippets.length)],
    createdAt: new Date().toISOString(),
    dishes: []
  };

  lists.value.unshift(newList);
  activeListId.value = newList.id;
};

const renameList = ({ id, name }: { id: string; name: string }) => {
  const list = lists.value.find((entry) => entry.id === id);
  if (list) {
    list.name = name;
  }
};

const addDish = ({ listId, name }: { listId: string; name: string }) => {
  const list = lists.value.find((entry) => entry.id === listId);
  if (!list) return;

  const dish: Dish = {
    id: createId(),
    name,
    ingredients: []
  };

  list.dishes.push(dish);
};

const addIngredient = ({ listId, dishId, name }: { listId: string; dishId: string; name: string }) => {
  const list = lists.value.find((entry) => entry.id === listId);
  if (!list) return;
  const dish = list.dishes.find((entry) => entry.id === dishId);
  if (!dish) return;

  const ingredient: Ingredient = {
    id: createId(),
    name,
    purchased: false
  };

  dish.ingredients.push(ingredient);
};

const toggleIngredient = ({
  listId,
  dishId,
  ingredientId
}: {
  listId: string;
  dishId: string;
  ingredientId: string;
}) => {
  const list = lists.value.find((entry) => entry.id === listId);
  if (!list) return;
  const dish = list.dishes.find((entry) => entry.id === dishId);
  if (!dish) return;
  const ingredient = dish.ingredients.find((entry) => entry.id === ingredientId);
  if (!ingredient) return;

  ingredient.purchased = !ingredient.purchased;
};

const removeIngredient = ({
  listId,
  dishId,
  ingredientId
}: {
  listId: string;
  dishId: string;
  ingredientId: string;
}) => {
  const list = lists.value.find((entry) => entry.id === listId);
  if (!list) return;
  const dish = list.dishes.find((entry) => entry.id === dishId);
  if (!dish) return;

  dish.ingredients = dish.ingredients.filter((entry) => entry.id !== ingredientId);
};

const removeDish = ({ listId, dishId }: { listId: string; dishId: string }) => {
  const list = lists.value.find((entry) => entry.id === listId);
  if (!list) return;

  list.dishes = list.dishes.filter((entry) => entry.id !== dishId);
};

const removeList = (id: string) => {
  const index = lists.value.findIndex((entry) => entry.id === id);
  if (index === -1) return;

  lists.value.splice(index, 1);

  if (activeListId.value === id) {
    activeListId.value = lists.value[0]?.id ?? null;
  }
};
</script>
